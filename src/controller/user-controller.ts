import { Request, Response, NextFunction } from "express";
import userServices from "../services/user-services";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body;
    const result = await userServices.register(request);
    res.status(200).json({
      status: "success",
      message: "User successfully registered.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body;
    const token = await userServices.login(request);
    res.status(200).json({
      status: "success",
      message: "User successfully login.",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
