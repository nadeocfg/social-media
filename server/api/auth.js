import express from "express";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail.js";

const router = express.Router();

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  if (!email && !password) {
    return response.status(400).json({
      message: "Input email and password",
    });
  }

  if (!isEmail(email)) {
    return response.status(400).json({
      message: "Invalid email",
    });
  }

  try {
    const foundUser = await UserModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!foundUser) {
      return response.status(400).json({
        message: "User is not found",
      });
    }

    const isPasswordValid = bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return response.status(401).json({
        message: "Incorrect password",
      });
    }

    const payload = {
      userId: foundUser._id,
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
          username: foundUser.username,
          name: foundUser.name,
          email: foundUser.email,
          sex: foundUser.sex,
          about: foundUser.about,
          photo: foundUser.photoUrl,
          createdAt: foundUser.createdAt,
          updatedAt: foundUser.updatedAt,
        });
      }
    );
  } catch (error) {
    console.error(err);
    return response.status(500).send("Server error");
  }
});

export default router;
