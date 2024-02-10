import { registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validate";
import { create, req } from "../types/user-types";
import { prisma } from "../app/database";
import ResponseError from "../error/response-error";

const checkUserInDatabase = async (username?: string, email?: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
        {
          email,
        },
      ],
    },
  });
};

const register = async (request: req): Promise<create> => {
  request = validate(registerUserValidation, request);

  if (await checkUserInDatabase(request.username, request.email))
    throw new ResponseError(409, "Username or email is already in use.");

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

export default {
  register,
};
