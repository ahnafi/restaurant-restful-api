import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import {
  AdminRegisterRequest,
  AdminRegisterResult,
} from "../types/admin-types";
import { registerAdminValidation } from "../validation/admin-validation";
import { validate } from "../validation/validate";
import bcrypt from "bcrypt";

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

export default {
  register,
};
