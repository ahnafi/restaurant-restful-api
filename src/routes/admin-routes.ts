import { Router } from "express";
import adminController from "../controller/admin-controller";
import menuController from "../controller/menu-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { menuImages } from "../middleware/multer-middleware";

export const adminRouter: Router = Router();

// middleware
adminRouter.use(authMiddleware);

// admin
adminRouter.put("/admin", adminController.logout);

// menu
adminRouter.post("/menu", menuImages.single("image") ,menuController.create);
