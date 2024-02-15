import supertest from "supertest";
import { createUser, removeUser } from "./utils";
import { app } from "../src/app/app";
import { logger } from "../src/app/logging";

describe("register admin api POST /admin/register", () => {
  afterEach(async () => {
    await removeUser("test");
  });

  it("should can register admin", async () => {
    const admin = await supertest(app).post("/admin/register").send({
      username: "test",
      password: "password",
      email: "example@example.com",
    });

    logger.info(admin.body.data);
    expect(admin.status).toBe(200);
  });

  it("should cant register admin no email is required", async () => {
    const admin = await supertest(app).post("/admin/register").send({
      username: "test",
      password: "password",
      // email: "example@example.com",
    });

    logger.info(admin.body);
    logger.info(admin.error);
    expect(admin.status).toBe(400);
  });
  it("should cant register admin because format is not valid", async () => {
    const admin = await supertest(app).post("/admin/register").send({
      username: "te",
      password: "passwo",
      email: "example",
    });

    logger.info(admin.body);
    logger.info(admin.error);
    expect(admin.status).toBe(400);
  });
  it("should cant register admin because user is already used", async () => {
    await createUser()
    const admin = await supertest(app).post("/admin/register").send({
      username: "test",
      password: "password",
      email: "example@example.com",
    });

    logger.info(admin.body);
    logger.info(admin.error);
    expect(admin.status).toBe(409);
  });
});
