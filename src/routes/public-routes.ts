import { Router } from "express";
import userController from "../controller/user-controller";
import adminController from "../controller/admin-controller";

export const publicRouter: Router = Router();

// user
publicRouter.post("/user/register", userController.register);
publicRouter.post("/user", userController.login);

//admin
publicRouter.post("/admin/register", adminController.register);
