import supertest from "supertest";
import { prisma } from "../src/app/database";
import { app } from "../src/app/app";

export const removeUser = async (name?: string) => {
  return prisma.user.deleteMany({
    where: {
      username: name || "test",
    },
  });
};

export const createUser = async (name?: String) => {
  return supertest(app)
    .post("/user/register")
    .send({
      username: name || "test",
      email: "john@example.com",
      password: "password",
      full_name: "John Doe",
      phone_number: "123-456-7890",
      address: "123 Main Street, City, Country",
    });
};

export const loginUserToken = async () => {
  const token = await supertest(app).post("/user").send({
    email: "john@example.com",
    password: "password",
  });
  if (token.error) console.log(token.error.message);
  return token.body.data.token;
};

export const ShowUser = (token: string) => {
  return prisma.user.findFirst({
    where: { token },
  });
};

export const createAdmin = (name?: string) => {
  return supertest(app)
    .post("/admin/register")
    .send({
      username: name || "test",
      email: "john@example.com",
      password: "password",
    });
};
