import { NextFunction, Request, Response } from "express";
import { auth } from "../types/user-types";
import { getUserByToken } from "../services/services";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined = req.get("Authorization");

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
    return;
  }

  const data: auth | null = await getUserByToken(token);

  if (!data) {
    res.status(404).json({
      status: "error",
      message: "Unauthorized ,User is not found",
    });
    return;
  }
  next();
};
