const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// App routes
const mainRoutes = require("./routes/main.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const dialogRoutes = require("./routes/dialog.routes");
const messageRoutes = require("./routes/message.routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const config = require("config");
const cors = require("cors");

// const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

app.use("", mainRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dialog", dialogRoutes);
app.use("/api/messages", messageRoutes);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    io.on("connection", (socket) => {
      console.log("Connect");
      socket.on("login", ({ userId }, callback) => {
        console.log(`Server socket: login - ${userId}`);
        // socket.broadcast.emit("changeStatus", { isActive: true });
      });
      socket.on("logout", ({ userId }, callback) => {
        console.log(`Server socket: logout - ${userId}`);
        // socket.broadcast.emit("changeStatus", { isActive: false });
      });
      socket.on("authenticated", ({ userId }, callback) => {
        console.log(`Server socket: user ${userId} has been authenticated`);
      });
      socket.on("disconnect", (socket) => {
        console.log("Disconnect");
      });
    });
    server.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();

// // io.on("connect", socket => {
// //   socket.on("join", ({ name, room }, callback) => {
// //     const { error, user } = addUser({ id: socket.id, name, room });

// //     if (error) return callback(error);

// //     socket.join(user.room);

// //     socket.emit("message", {
// //       user: "admin",
// //       text: `${user.name}, welcome to room "${user.room}".`,
// //       isInfo: true
// //     });
// //     socket.broadcast.to(user.room).emit("message", {
// //       user: "admin",
// //       text: `${user.name} has joined!`,
// //       isInfo: true
// //     });

// //     io.to(user.room).emit("roomData", {
// //       room: user.room,
// //       users: getUsersInRoom(user.room)
// //     });

// //     callback();
// //   });

// //   socket.on("sendMessage", (message, callback) => {
// //     const user = getUser(socket.id);

// //     io.to(user.room).emit("message", {
// //       user: user.name,
// //       text: message,
// //       isInfo: false
// //     });

// //     callback();
// //   });

// //   socket.on("disconnect", () => {
// //     const user = removeUser(socket.id);

// //     if (user) {
// //       io.to(user.room).emit("message", {
// //         user: "admin",
// //         text: `${user.name} has left.`,
// //         isInfo: true
// //       });
// //       io.to(user.room).emit("roomData", {
// //         room: user.room,
// //         users: getUsersInRoom(user.room)
// //       });
// //     }
// //   });
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server has been started on port ${PORT}`);
// // });
