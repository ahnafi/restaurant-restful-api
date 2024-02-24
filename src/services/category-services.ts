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

const get = async (
  id: number
): Promise<{ id: number; name: string } | null> => {
  id = validate(removeCategoryValidation, id);

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) throw new ResponseError(404, "category is not found");
  return category;
};

export default {
  create,
  remove,
  get,
};
