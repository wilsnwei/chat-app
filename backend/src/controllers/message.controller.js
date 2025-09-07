import { getReceiverSocketId, io } from "../lib/socket.js";
import { Message } from "../models/message.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export default class MessageController {
  static getUsersForSidebar = async (req, res) => {
    try {
      const currentUserId = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: currentUserId },
      }).select("-password");

      res.status(200).json(filteredUsers);
    } catch (error) {
      console.log("Error in getUsersForSidebar", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const currentUserId = req.user._id;
      const messages = await Message.find({
        $or: [
          { senderId: currentUserId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: currentUserId },
        ],
      });
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const receiverId = req.params.id;
      const senderId = req.user._id;

      if (!receiverId) {
        return res.status(400).json({ message: "Receiver ID is required" });
      }
      
      let imageUrl;

      if (image) {
        //upload to cloudindary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in MessageController", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
