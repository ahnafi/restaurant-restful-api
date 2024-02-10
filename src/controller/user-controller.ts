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

export default {
  register,
};
