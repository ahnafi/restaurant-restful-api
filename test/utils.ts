import { prisma } from "../src/app/database";

export const removeUser = async () => {
  return prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};
