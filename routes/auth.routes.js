const express = require("express");
const IUser = require("../models/User");
const UserModel = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

// /api/auth/signup POST Request
router.post("/signup", async (req, res) => {
  try {
    //We receive 'Name, Surname, Email and Password'
    const { name, surname, email, password } = req.body;
    console.log(req.body);
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "User with the entered email is already exist" });
    }
    const username = name.toLowerCase() + surname.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
      name,
      surname,
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User has been successfully created",
      token,
      userId: user.id,
    });
  } catch (e) {
    res.status(500).json({ message: "Server encountered an error" });
  }
});

// /api/auth/login POST Request
router.post("/login", async (req, res) => {
  try {
    //We receive 'Email and Password'
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Password or email is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Password or email is incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    res.json({
      token,
      userId: user.id,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

module.exports = router;
