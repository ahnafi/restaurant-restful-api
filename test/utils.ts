import supertest from "supertest";
import { prisma } from "../src/app/database";
import { app } from "../src/app/app";

export const removeUser = async () => {
  return prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createUser = async () => {
  return supertest(app).post("/user/register").send({
    username: "test",
    email: "john@example.com",
    password: "password123",
    full_name: "John Doe",
    phone_number: "123-456-7890",
    address: "123 Main Street, City, Country",
  });
};
