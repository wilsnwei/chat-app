import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import MessageController from '../controllers/message.controller.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, MessageController.getUsersForSidebar)

messageRouter.get('/:id', protectRoute, MessageController.getMessages)

messageRouter.post('/send/:id', protectRoute, MessageController.sendMessage)

export default messageRouter;
