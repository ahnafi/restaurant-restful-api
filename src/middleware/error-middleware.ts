import ResponseError from "../error/response-error";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        status: "error",
        message: err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        status: "error",
        message: err.message,
      })
      .end();
  }
};
