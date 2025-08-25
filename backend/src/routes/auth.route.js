import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import multer from "multer";

const authRouter = express.Router();
const upload = multer({ dest: "uploads/" });

authRouter.post("/signup", AuthController.signUp);

authRouter.post("/login", AuthController.login);

authRouter.post("/logout", AuthController.logout);

authRouter.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  AuthController.updateProfile
);

authRouter.get("/check", protectRoute, AuthController.check);

export default authRouter;
