import { Router } from "express";
import userController from "../controller/user-controller";

export const publicRouter: Router = Router();

// user
publicRouter.post("/user/register", userController.register);
publicRouter.post("/user", userController.login);
