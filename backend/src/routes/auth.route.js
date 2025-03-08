import express from "express";
import authControllers from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", authControllers.signUp);

authRouter.post("/login", authControllers.login);

authRouter.post("/logout", authControllers.logout);

authRouter.put("/logout", authControllers.updateProfile);

export default authRouter;
