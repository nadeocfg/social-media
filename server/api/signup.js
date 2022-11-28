const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const defaultAvatar = "/static/images/default-avatar.jpg";

const usernameRegexp = /^[a-zA-Z0-9]+$/;

router.get("/:username", async (request, response) => {
  const { username } = request.params;

  try {
    if (username.length < 1) {
      return response.status(400).json({ message: "Invalid username" });
    }

    if (!usernameRegexp.test(username)) {
      return response.status(400).json({ message: "Invalid username" });
    }

    const foundUser = await UserModel.findOne({
      username: username.toLowerCase(),
    });

    if (foundUser) {
      return response.status(400).json({ message: "Username already exist" });
    }

    return response.status(200).json({ message: "Username is available" });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (request, response) => {
  const { username, name, email, sex, password, about, photo } =
    request.body.user;

  if (!isEmail(email)) {
    return response.status(400).json({ message: "Invalid email" });
  }

  try {
    const checkUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (checkUser) {
      return response.status(400).json({ message: "Email is already exist" });
    }

    const newUser = new UserModel({
      username: username.toLowerCase(),
      name,
      email: email.toLowerCase(),
      sex,
      password,
      about,
      photo: photo || defaultAvatar,
    });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();

    await new ProfileModel({
      user: newUser._id,
    }).save();

    await new FollowerModel({
      user: newUser._id,
      followers: [],
      following: [],
    }).save();

    const payload = {
      userId: newUser._id,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          throw err;
        }

        response.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(err);
    return response.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
