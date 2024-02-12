import {
  loginUserValidation,
  registerUserValidation,
  tokenUserValidation,
} from "../validation/user-validation";
import { validate } from "../validation/validate";
import {
  RegistrationResult,
  RegisterRequest,
  LoginRequest,
  auth,
  GetUserResult,
} from "../types/user-types";
import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { getUserByToken } from "./services";

const register = async (
  request: RegisterRequest
): Promise<RegistrationResult> => {
  request = validate(registerUserValidation, request);

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

  const user = await prisma.user.create({
    data: {
      username: request.username,
      email: request.email,
      password: request.password,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  await prisma.profile.create({
    data: {
      userId: user.id,
      fullName: request.full_name,
      address: request.address,
      phone: request.phone_number,
    },
  });

  return user;
};

const login = async (
  request: LoginRequest
): Promise<{ token: string | null }> => {
  request = validate(loginUserValidation, request);

  const checkUserInDatabase = await prisma.user.findUnique({
    where: {
      email: request.email,
    },
  });

  if (!checkUserInDatabase)
    throw new ResponseError(404, "email or password is wrong");

  const checkPassword = await bcrypt.compare(
    request.password,
    checkUserInDatabase.password
  );

  if (!checkPassword)
    throw new ResponseError(404, "email or password is wrong");

  return prisma.user.update({
    where: {
      id: checkUserInDatabase.id,
    },
    data: {
      token: uuid(),
    },
    select: {
      token: true,
    },
  });
};

const logout = async (token: string | undefined): Promise<void> => {
  const validateToken: string = validate(tokenUserValidation, token);

  const data: auth | null = await getUserByToken(validateToken);

  if (!data) throw new ResponseError(404, "Unauthorized");

  await prisma.user.update({
    where: { id: data.id },
    data: {
      token: null,
    },
  });
};

const get = async (token: string | undefined): Promise<GetUserResult> => {
  const validateToken: string = validate(tokenUserValidation, token);

  const data: auth | null = await getUserByToken(validateToken);

  if (!data) throw new ResponseError(404, "Unauthorized");

  const profile = await prisma.profile.findUnique({
    where: {
      userId: data.id,
    },
    select: {
      address: true,
      fullName: true,
      phone: true,
    },
  });

  return {
    id: data.id,
    email: data.email,
    username: data.username,
    address: profile?.address,
    full_name: profile?.fullName,
    phone_number: profile?.phone,
  };
};

export default {
  register,
  login,
  logout,
  get,
};
