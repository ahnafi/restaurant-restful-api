import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { userRouter } from "../routes/user-routes";

export const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(userRouter);

// error handling
app.use(errorMiddleware);
