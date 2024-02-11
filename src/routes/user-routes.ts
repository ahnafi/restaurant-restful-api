import { Router } from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const userRouter: Router = Router();

// middleware
userRouter.use(authMiddleware);

// user
userRouter.put("/user", userController.logout);
