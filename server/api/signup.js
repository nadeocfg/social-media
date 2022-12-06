import express from "express";
import UserModel from "../models/UserModel.js";
import ProfileModel from "../models/ProfileModel.js";
import FollowerModel from "../models/FollowerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail.js";

const router = express.Router();

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
  const { username, name, email, sex, password, about, photoUrl } =
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
      photoUrl: photoUrl || defaultAvatar,
    });

    newUser.password = await bcrypt.hash(password, 10);

    const created = await newUser.save();

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

        response.status(200).json({
          token,
          username: created.username,
          name: created.name,
          email: created.email,
          sex: created.sex,
          about: created.about,
          photo: created.photoUrl,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: error });
  }
});

export default router;
