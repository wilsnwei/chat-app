import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.model.js";
export default class AuthControllers {
  static signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if (password.length() < 6) {
        return res.status(400).json({
          succes: false,
          message: "Password must be at least 6 characters",
        });
      }
      const user = await new User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPW = bcrypt.hash(password, salt);

      const newUser = new User({ email, fullName, password: hashedPW });
      await newUser.save();
    } catch (error) {}
  };

  static login = (req, res) => {
    res.send("logging in");
  };

  static logout = (req, res) => {
    res.send("logging out");
  };
}
