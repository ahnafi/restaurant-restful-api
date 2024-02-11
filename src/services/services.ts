import { prisma } from "../app/database";
import { auth } from "../types/user-types";

export const getUserByToken = async (token: string): Promise<auth | null> => {
  return prisma.user.findFirst({
    where: {
      token,
    },
  });
};
