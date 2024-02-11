import { createUser, loginUserToken, removeUser } from "./utils";
import supertest from "supertest";
import { app } from "../src/app/app";
import { logger } from "../src/app/logging.ts";
import { prisma } from "../src/app/database.ts";

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

describe("login user - POST /user/", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeUser();
  });

  it("should can login", async () => {
    const token = await supertest(app).post("/user").send({
      email: "john@example.com",
      password: "password123",
    });

    logger.info(token.body);
    expect(token.status).toBe(200);
    expect(token.body.data.token).toBeDefined();
    logger.info(token.body.data);
  });
  it("should cant login because password is wrong", async () => {
    const token = await supertest(app).post("/user").send({
      email: "john@example.com",
      password: "password12345",
    });

    logger.info(token.body);
    expect(token.status).toBe(404);
    // expect(token.body.data.token).toBeUndefined();
    logger.info(token.body.data);
  });
  it("should cant login because password and email is not correct", async () => {
    const token = await supertest(app).post("/user").send({
      email: "johnajahlaj",
      password: "pass",
    });

    logger.info(token.body);
    expect(token.status).toBe(400);
    // expect(token.body.data.token).toBeDefined();
    logger.info(token.body.data);
  });

  it("should cant login because email is wrong", async () => {
    const token = await supertest(app).post("/user").send({
      email: "john123@example.com",
      password: "password123",
    });

    logger.info(token.body);
    expect(token.status).toBe(404);
    // expect(token.body.data.token).toBeUndefined();
    logger.info(token.body.data);
  });
});

describe("logout user PUT /user", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeUser();
  });

  it("should can logout", async () => {
    const token = await loginUserToken();
    console.log(token);
    const logout = await supertest(app)
      .put("/user")
      .set("Authorization", token);

    logger.info(logout.body);
    logger.info(logout.error);
    expect(logout.status).toBe(200);
  });
  it("should cant logout because token is not valid", async () => {
    const token = await loginUserToken();
    console.log(token);
    const logout = await supertest(app)
      .put("/user")
      .set("Authorization", token + "not valid");

    logger.info(logout.body);
    logger.info(logout.error);
    expect(logout.status).toBe(404);
  });
  it("should cant logout because unauthorized", async () => {
    const token = await loginUserToken();
    console.log(token);
    const logout = await supertest(app).put("/user");
    // .set("Authorization", token + "not valid");

    logger.info(logout.body);
    logger.info(logout.error);
    expect(logout.status).toBe(401);
  });
  it("should cant logout because not registered", async () => {
    // const token = await loginUserToken();
    // console.log(token);
    await removeUser();
    const logout = await supertest(app)
      .put("/user")
      .set("Authorization", "not valid");

    logger.info(logout.body);
    logger.info(logout.error);
    expect(logout.status).toBe(404);
  });
});
