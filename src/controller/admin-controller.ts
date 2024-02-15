import { NextFunction, Request, Response } from "express";
import adminServices from "../services/admin-services";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body;
    const admin = await adminServices.register(request);
    res.status(200).json({
      status: "success",
      message: "User successfully registered.",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
