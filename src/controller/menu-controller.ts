import { NextFunction, Request, Response } from "express";
import menuServices from "../services/menu-services";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = req.file?.filename ? "/public/img/" + req.file?.filename : "";
    const request = req.body;
    const tokenAdmin: string | undefined = req.get("Authorization");
    const result = await menuServices.create(request, image, tokenAdmin);
    res.status(200).json({
      status: "success",
      message: "Menu created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
