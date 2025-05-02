import express from "express";
import authControllers from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", authControllers.signUp);

authRouter.post("/login", authControllers.login);

authRouter.post("/logout", authControllers.logout);

authRouter.put("/update-profile", protectRoute, authControllers.updateProfile);

authRouter.get("check", protectRoute, authControllers.check);

export default authRouter;
