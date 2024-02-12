import { Request, Response, NextFunction } from "express";
import userServices from "../services/user-services";
import { GetUserResult, auth } from "../types/user-types";

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
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.get("Authorization");
    await userServices.logout(token);
    res.status(200).json({
      status: "success",
      message: "User successfully logout.",
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.get("Authorization");
    const userProfile: GetUserResult = await userServices.get(token);
    res.status(200).json({
      status: "success",
      message: "Get User and Profile",
      data: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  get,
};
