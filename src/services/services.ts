import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import { auth } from "../types/user-types";
import { tokenUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validate";

export const getUserByToken = async (token: string): Promise<auth | null> => {
  return prisma.user.findFirst({
    where: {
      token,
    },
  });
};

export const getUserAuthorized = async (
  token: string | undefined
): Promise<auth> => {
  const validateToken: string = validate(tokenUserValidation, token);
  const getUser: auth | null = await getUserByToken(validateToken);
  if (!getUser) throw new ResponseError(404, "Unauthorized");
  return getUser;
};
