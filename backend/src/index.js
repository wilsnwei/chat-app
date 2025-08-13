import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { cloudinaryConfig } from "./lib/cloudinary.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

cloudinaryConfig();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
