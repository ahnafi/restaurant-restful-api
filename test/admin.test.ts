import supertest from "supertest";
import { createAdmin, createUser, loginUserToken, removeUser } from "./utils";
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
    await createUser();
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

describe("login admin - POST /admin", () => {
  beforeEach(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await removeUser();
  });

  it("should can login admin", async () => {
    const admin = await supertest(app).post("/admin").send({
      email: "john@example.com",
      password: "password",
    });

    logger.info(admin.body);
    expect(admin.status).toBe(200);
  });
  it("should cant login admin because email or password is wrong", async () => {
    const admin = await supertest(app).post("/admin").send({
      email: "johna@example.com",
      password: "passworda",
    });

    logger.info(admin.body);
    expect(admin.status).toBe(404);
  });
  it("should cant login admin because  password is wrong", async () => {
    const admin = await supertest(app).post("/admin").send({
      email: "john@example.com",
      password: "passworda",
    });

    logger.info(admin.body);
    expect(admin.status).toBe(404);
  });
  it("should cant login admin because email is wrong", async () => {
    const admin = await supertest(app).post("/admin").send({
      email: "johna@example.com",
      password: "password",
    });

    logger.info(admin.body);
    expect(admin.status).toBe(404);
  });
  it("should cant login admin because email or password is required", async () => {
    const admin = await supertest(app).post("/admin").send({
      // email:"johna@example.com",
      // password:"password"
    });

    logger.info(admin.body);
    expect(admin.status).toBe(400);
  });
});

describe("logout admin - PUT /admin", () => {
  beforeEach(async () => {
    await createAdmin();
  });
  afterEach(async () => {
    await removeUser();
  });

  it("should can loggout", async () => {
    const token = await loginUserToken();
    const logout = await supertest(app)
      .put("/admin")
      .set("Authorization", token);

    logger.info(logout.error);
    logger.info(logout.body);
    expect(logout.status).toBe(200);
  });
  it("should cant loggout because not authorized", async () => {
    const token = await loginUserToken();
    const logout = await supertest(app)
      .put("/admin")
      // .set("Authorization", token);

    logger.info(logout.error);
    logger.info(logout.body);
    expect(logout.status).toBe(400);
  });
  it("should cant loggout because not authorized", async () => {
    const token = await loginUserToken();
    const logout = await supertest(app)
      .put("/admin")
      .set("Authorization", token+"A");

    logger.info(logout.error);
    logger.info(logout.body);
    expect(logout.status).toBe(401);
  });
  it("should cant loggout because not admin", async () => {
    await createUser("budi");
    const token = await loginUserToken("budi");
    const logout = await supertest(app)
      .put("/admin")
      .set("Authorization", token);

    logger.info(logout.error);
    logger.info(logout.body);
    expect(logout.status).toBe(401);
  });

});
