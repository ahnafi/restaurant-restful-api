import { Category } from "@prisma/client";
import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import {
  createCategoryValiadation,
  removeCategoryValidation,
} from "../validation/category-validation";
import { validate } from "../validation/validate";

export const checkCategoryInDatabase = async (
  name: string | undefined
): Promise<Category | null> => {
  name = validate(createCategoryValiadation, name);
  return prisma.category.findUnique({
    where: {
      name,
    },
  });
};

const create = async (request: string): Promise<Category> => {
  request = validate(createCategoryValiadation, request);

  const checkCategory = await checkCategoryInDatabase(request);

  if (checkCategory)
    throw new ResponseError(400, "category is already created");

  return prisma.category.create({
    data: {
      name: request.toLowerCase(),
    },
  });
};

const remove = async (id: number): Promise<void> => {
  id = validate(removeCategoryValidation, id);

  await prisma.category.delete({
    where: {
      id,
    },
  });
};

export default {
  create,
  remove,
};
