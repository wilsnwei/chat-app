import mongoose from "mongoose";
import User from "./user.model.js";
import e from "express";
const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

export const Message = new mongoose.model("Message", messageSchema)

