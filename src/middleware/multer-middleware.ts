import multer from "multer";
import { v4 as uuid } from "uuid";
import ResponseError from "../error/response-error";

const menuImageStorage = multer.diskStorage({
  destination: "./public/img",
  filename: (req, file, callback) => {
    if (!file) callback(null, "");
    const imageName = uuid();

    const allowedExtensions = ["jpeg", "jpg", "png", "webp", "heic"];

    const fileExtension = file.originalname.split(".").pop()?.toLowerCase();

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      const newFileName = `${imageName}.${fileExtension}`;
      callback(null, newFileName);
    } else {
      callback(new ResponseError(400, "File extension is not allowed"), "");
    }
  },
});

export const menuImages = multer({ storage: menuImageStorage });
