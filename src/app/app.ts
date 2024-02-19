import express, { Application } from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { userRouter } from "../routes/user-routes";
import { publicRouter } from "../routes/public-routes";
import cors from "cors";
import { adminRouter } from "../routes/admin-routes";

export const app: Application = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(adminRouter);
app.use(publicRouter);
app.use(userRouter);

// error handling
app.use(errorMiddleware);
