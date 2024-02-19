import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import {
  AdminRegisterRequest,
  AdminRegisterResult,
} from "../types/admin-types";
import { LoginRequest } from "../types/user-types";
import { registerAdminValidation } from "../validation/admin-validation";
import { validate } from "../validation/validate";
import bcrypt from "bcrypt";
import userServices from "./user-services";
import {
  getAdminAuthorized,
  getUserAuthorized,
  getUserByToken,
} from "./services";

const register = async (
  request: AdminRegisterRequest
): Promise<AdminRegisterResult> => {
  request = validate(registerAdminValidation, request);

  const checkUserInDatabase = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: request.username,
        },
        {
          email: request.email,
        },
      ],
    },
  });

  if (checkUserInDatabase)
    throw new ResponseError(409, "Username or email is already in use.");

  request.password = await bcrypt.hash(request.password, 10);

  return prisma.user.create({
    data: {
      username: request.username,
      email: request.email,
      password: request.password,
      role: "ADMIN",
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

const login = async (request: LoginRequest): Promise<string | null> => {
  const token: string | null = await userServices.login(request);
  const isAdmin = await getUserByToken(token);

  if (isAdmin?.role == "ADMIN") {
    return token;
  } else throw new ResponseError(401, "your account is not admin");
};

const logout = async (token: string | undefined): Promise<void> => {
  const data = await getAdminAuthorized(token);

  await prisma.user.update({
    where: { id: data.id },
    data: {
      token: null,
    },
  });
};

export default {
  register,
  login,
  logout
};
