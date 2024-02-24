import categoryServices from "../src/services/category-services";
import { logger } from "../src/app/logging";
import { prisma } from "../src/app/database";
describe("create category", () => {
  afterEach(() => {});
  it("should can create and remove", async () => {
    const category = await categoryServices.create("makanan");

    logger.info(category);

    await categoryServices.remove(category.id);
  });
  it("should can create and remove with uppercase", async () => {
    const category = await categoryServices.create("makanan".toUpperCase());

    logger.info(category);
    expect(category.name).toBe("makanan");
    await categoryServices.remove(category.id);
  });
});

describe("menu", () => {
  it("should ", async () => {
    const category = await categoryServices.create("makanan");

    logger.info(category);

    const menu = await prisma.menu.create({
      data: {
        name: "bugrges",
        price: "123",
        description: "Asdad",
        categoryId: category.id,
        image: "/asda/asdad",
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

    console.log({ menu });
    await prisma.menu.delete({ where: { id: menu.id } });
    await categoryServices.remove(category.id);
  });
});
