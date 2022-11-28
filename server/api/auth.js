const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  if (!isEmail(email)) {
    return response.status(400).send("Invalid email");
  }

  try {
    const foundUser = await UserModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!foundUser) {
      return response.status(400).send("User is not found");
    }

    const isPasswordValid = bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return response.status(401).send("Incorrect password");
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

        response.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(err);
    return response.status(500).send("Server error");
  }
});

module.exports = router;
