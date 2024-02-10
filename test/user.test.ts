import { removeUser } from "./utils";
import supertest from "supertest";
import { app } from "../src/app/app";
import { logger } from "../src/app/logging.ts";

describe("register user POST /user/register", () => {
  afterEach(async () => {
    await removeUser();
  });

  it("should can register user ", async () => {
    const user = await supertest(app).post("/user/register").send({
      username: "test",
      email: "john@example.com",
      password: "password123",
      full_name: "John Doe",
      phone_number: "123-456-7890",
      address: "123 Main Street, City, Country",
    });

    expect(user.status).toBe(200);
    logger.info(user.body.data);
  });

  it("should cant register because input wrong", async () => {
    const user = await supertest(app).post("/user/register").send({
      username: "test",
      email: "johnexam",
      password: "passw",
      full_name: "John Doe",
      phone_number: "123-456-7890111111111111111",
      address: "123 Main Street, City, Country",
    });

    expect(user.status).toBe(400);
    logger.info(user.body.message);
  });

  it("should cant register karena username atau email sudah dipakai", async () => {
    await supertest(app).post("/user/register").send({
      username: "test",
      email: "john@example.com",
      password: "password123",
      full_name: "John Doe",
      phone_number: "123-456-7890",
      address: "123 Main Street, City, Country",
    });
    const user = await supertest(app).post("/user/register").send({
      username: "test",
      email: "john@example.com",
      password: "password123",
      full_name: "John tole",
      phone_number: "123-456-anjdnbbduebd",
      address: "123 Main Street, City, Countasdadawdasdry",
    });

    expect(user.status).toBe(409);
    logger.info(user.body.message);
  });
});
