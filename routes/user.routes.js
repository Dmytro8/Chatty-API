const express = require("express");
const UserModel = require("../models/User");
const router = express.Router();

// /api/user/ GET Request to get all users
router.get("/all", async (req, res) => {
  try {
    const filter = {};
    await UserModel.find(
      filter,
      "is_active name surname username",
      (err, users) => {
        if (err) return res.status(500).json(err);
        if (!users)
          return res.status(400).json({ message: "Users doesn't found" });
        return res.status(200).json([...users]);
      }
    );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// /api/user/getuser/:username GET Request
router.get("/getuser/:username", async (req, res) => {
  try {
    // req.params.username
    const username = req.params.username;
    await UserModel.find(
      { username },
      "is_active name surname username email",
      (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user)
          return res.status(400).json({ message: "User doesn't found" });
        return res.status(200).json(user);
      }
    );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// // /api/user/:id GET Request
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.findById(
      id,
      "is_active name surname username email",
      (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user)
          return res.status(400).json({ message: "Users doesn't found" });
        return res.status(200).json(user);
      }
    );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// /api/user/search/:searchUser - route with parametr
router.get("/search/:searchUser?", async (req, res) => {
  const searchedUser = req.params.searchUser;
  try {
    if (searchedUser !== "") {
      const regex = new RegExp(`^${searchedUser}\w*`, "gi");
      const filter = {
        $or: [{ name: regex }, { surname: regex }, { username: regex }],
      };
      await UserModel.find(
        filter,
        "is_active name surname username last_seen",
        (err, users) => {
          if (err) return res.status(500).json(err);
          if (!users)
            return res.status(400).json({ message: "Users doesn't found" });
          return res.status(200).json(users);
        }
      );
    } else
      return (
        res
          .status(204)
          // .json({ message: "No account found with that email address" });
          .json({ message: "No results found" })
      );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// /api/user/:id PUT Request
router.put("/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(400).json({ message: "User doesn't found" });
      else
        return res
          .status(200)
          .json({ message: "User status has been successfully updated" });
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// /api/user/:id Delete Request
router.delete("/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id, req.body, (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(400).json({ message: "User doesn't found" });
      return res
        .status(200)
        .json({ message: "User has been successfully deleted" });
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

module.exports = router;
