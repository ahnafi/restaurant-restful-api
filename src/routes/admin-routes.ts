import { Router } from "express";
import adminController from "../controller/admin-controller";

export const adminRouter: Router = Router();

// admin
adminRouter.put("/admin", adminController.logout);
