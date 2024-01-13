import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes

// error handling
app.use(errorMiddleware);
