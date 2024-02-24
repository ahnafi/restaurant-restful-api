import multer from "multer";
import express, { Request, Response, NextFunction } from "express";
import supertest from "supertest";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

describe("Testing multer", () => {
  const storage = multer.diskStorage({
    destination: "./test/uploads",
    filename: (req, file, callback) => {
      console.log(req)
      console.log(file)
      callback(null, `nama${Math.floor(Math.random() * 100)}.jpg`);
    },
  });
  const upload = multer({ storage }); // Menggunakan direktori sementara untuk menyimpan file

  const app = express();
  app.post(
    "/multer",
    upload.single("img"),
    (req: Request, res: Response, next: NextFunction) => {
      const data = req.file;
      console.log({ data: data?.filename });
      res.status(200).json({ filename: data?.filename }); // Menanggapi permintaan dengan status OK
    }
  );

  it("should save file", async () => {
    const image = fs.createReadStream(path.resolve(__dirname, "./images.jpg")); // Menggunakan path.resolve untuk mendapatkan path yang benar
    const response = await supertest(app).post("/multer").attach("img", image);

    // Verifikasi bahwa respons memiliki status OK
    expect(response.status).toBe(200);
    // Verifikasi bahwa file telah disimpan di direktori yang benar
    const filePath = path.resolve(
      __dirname,
      `./uploads/${response.body.filename}`
    );
    expect(fs.existsSync(filePath)).toBe(true);

    // Opsional: Membersihkan file yang diunggah setelah pengujian selesai
    fs.unlinkSync(filePath);
  });

  it('should test uuid', () => {
    console.log(uuid())
  });
});
