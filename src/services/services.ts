import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import { auth } from "../types/user-types";
import { tokenUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validate";

export const getUserByToken = async (
  token: string | null
): Promise<auth | null> => {
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

export const getAdminAuthorized = async (
  token: string | undefined
): Promise<auth> => {
  const validateToken: string = validate(tokenUserValidation, token);
  const isAdmin: auth | null = await getUserByToken(validateToken);
  if (!isAdmin) throw new ResponseError(401, "Unauthorized");
  if (isAdmin?.role == "ADMIN") {
    return isAdmin;
  } else throw new ResponseError(401, "not admin , unauthorized");
};
