import { Router } from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const userRouter: Router = Router();

// middleware
userRouter.use(authMiddleware);

// user
userRouter.put("/user", userController.logout);
userRouter.get("/user/current", userController.get);
userRouter.put("/user/current", userController.update);
userRouter.put("/user/current/profile", userController.updateProfile);
