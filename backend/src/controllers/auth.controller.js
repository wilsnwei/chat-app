import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import { cloudinary } from "../lib/cloudinary.js";

export default class AuthController {
  static signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if (!fullName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields must be filled",
        });
      }
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPW = await bcrypt.hash(password, salt);

      const newUser = new User({ email, fullName, password: hashedPW });
      if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();
        return res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      }
    } catch (error) {
      console.log("Error occured in sign up controller", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `Invalid credentials` });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: `Invalid credentials` });
      }

      generateToken(user._id, res);

      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error logging in", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(200).json({
        message: "Log out successful",
      });
    } catch (error) {
      console.log("Error in log out controller", error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const file = req.file;
      const userId = req.user._id;

      if (!file)
        return res
          .status(400)
          .json({ message: "Profile picture not provided" });

      const uploadResponse = await cloudinary.uploader.upload(file.path);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: uploadResponse.secure_url,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error in log out controller", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  static check = (req, res) => {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in check controller", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
