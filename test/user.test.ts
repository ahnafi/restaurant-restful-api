import { ShowUser, createUser, loginUserToken, removeUser } from "./utils";
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
      password: "password",
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

describe("can get user GET /user/current", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeUser();
  });

  it("should can get user ", async () => {
    const token = await loginUserToken();
    const userProfile = await supertest(app)
      .get("/user/current")
      .set("Authorization", token);

    logger.info(userProfile.body.data);
    expect(userProfile.status).toBe(200);
  });
  it("should cant logout because user isnt login", async () => {
    // const token = await loginUserToken();
    const userProfile = await supertest(app)
      .get("/user/current")
      .set("Authorization", "hallo");

    logger.info(userProfile.body.data);
    logger.info(userProfile.error);
    expect(userProfile.status).toBe(404);
  });
});

describe("update user PUT /user/current", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeUser("budi");
    await removeUser("test");
  });

  it("should can update user", async () => {
    const token = await loginUserToken();

    //
    console.log(await ShowUser(token));
    //
    const newUser = await supertest(app)
      .put("/user/current")
      .send({
        username: "budi",
        password: "konsol123",
      })
      .set("Authorization", token);
    logger.info(newUser.body.data);
    logger.info(newUser.error);
    console.log(await ShowUser(token));
    expect(newUser.status).toBe(200);
    expect(newUser.body.data.username).toBe("budi");
  });
  it("should can update user data username", async () => {
    const token = await loginUserToken();

    //
    console.log(await ShowUser(token));
    //
    const newUser = await supertest(app)
      .put("/user/current")
      .send({
        username: "budi",
      })
      .set("Authorization", token);
    logger.info(newUser.body.data);
    logger.info(newUser.error);
    console.log(await ShowUser(token));
    expect(newUser.status).toBe(200);
    expect(newUser.body.data.username).toBe("budi");
  });
  it("should can update user data password ", async () => {
    const token = await loginUserToken();

    //
    console.log(await ShowUser(token));
    //
    const newUser = await supertest(app)
      .put("/user/current")
      .send({
        password: "budi01geming",
      })
      .set("Authorization", token);
    logger.info(newUser.body.data);
    logger.info(newUser.error);
    expect(newUser.status).toBe(200);

    console.log(await ShowUser(token));
  });
  it("should cant update user because input inst valid ", async () => {
    const token = await loginUserToken();
    //
    console.log(await ShowUser(token));
    //
    const newUser = await supertest(app)
      .put("/user/current")
      .send({
        username: "abc",
        password: "abc",
      })
      .set("Authorization", token);
    logger.info(newUser.body.data);
    logger.info(newUser.error);
    expect(newUser.status).toBe(400);

    console.log(await ShowUser(token));
  });
  it("should cant update user because username is already used ", async () => {
    await supertest(app).post("/user/register").send({
      username: "budi",
      email: "johnbudi@example.com",
      password: "password",
      full_name: "John Doe",
      phone_number: "123-456-7890",
      address: "123 Main Street, City, Country",
    });
    const token = await loginUserToken();
    //
    console.log(await ShowUser(token));
    //
    const newUser = await supertest(app)
      .put("/user/current")
      .send({
        username: "budi",
        password: "abc1234543",
      })
      .set("Authorization", token);
    logger.info(newUser.body.data);
    logger.info(newUser.error);
    expect(newUser.status).toBe(409);

    console.log(await ShowUser(token));
  });
});

describe("update user profile PUT /user/current/profile", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await removeUser("test");
  });

  it("should can update user profile", async () => {
    const token = await loginUserToken();
    const profile = await supertest(app)
      .put("/user/current/profile")
      .set("Authorization", token)
      .send({
        full_name: "slebew",
        phone_number: "0812211221",
        address: "indonesia",
      });

    logger.info(profile.body.data);
    logger.info(profile.error);
    expect(profile.status).toBe(200);
  });
  it("should can update user profile data only full name", async () => {
    const token = await loginUserToken();
    const profile = await supertest(app)
      .put("/user/current/profile")
      .set("Authorization", token)
      .send({
        full_name: "slebew",
        // phone_number: "0812211221",
        // address: "indonesia",
      });

    logger.info(profile.body.data);
    logger.info(profile.error);
    expect(profile.status).toBe(200);
  });
  it("should cant update user profile because unauthorize", async () => {
    const token = await loginUserToken();
    const profile = await supertest(app)
      .put("/user/current/profile")
      // .set("Authorization", token)
      .send({
        full_name: "slebew",
        phone_number: "0812211221",
        address: "indonesia",
      });

    logger.info(profile.body.data);
    logger.info(profile.error);
    expect(profile.status).toBe(401);
  });
});
