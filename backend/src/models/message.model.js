import mongoose from "mongoose";
import User from "./user.model.js";
const messageSchema = new mongoose.Schema({
  sender: {
    type: User,
    required: true,
  },
});
