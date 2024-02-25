import { prisma } from "../app/database";
import ResponseError from "../error/response-error";
import {
  createMenuValiadation,
  imageMenuValidation,
} from "../validation/menu-validation";
import { validate } from "../validation/validate";
import categoryServices from "./category-services";
import { getAdminAuthorized } from "./services";

export const checkMenuInDb = (name: string) => {
  return prisma.menu.findFirst({
    where: { name },
  });
};

const create = async (
  request: CreateMenuRequest,
  image: string,
  tokenAdmin: string | undefined
): Promise<CreateMenuResult> => {
  request = validate(createMenuValiadation, request);
  image = validate(imageMenuValidation, image);

  await getAdminAuthorized(tokenAdmin);

  const checkMenu = await checkMenuInDb(request.name);

  if (checkMenu) throw new ResponseError(409, "Menu already created");

  const getCategory = await categoryServices.get(request.category);

  return prisma.menu.create({
    data: {
      name: request.name,
      price: request.price,
      description: request.description,
      categoryId: getCategory?.id,
      image,
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      category: true,
    },
  });
};

export default {
  create,
};
