import Joi from "joi";
import { getCategoryValidation } from "./category-validation";

const createMenuValiadation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.string().max(250).required(),
  category: getCategoryValidation,
  description: Joi.string().max(250).optional(),
});

const imageMenuValidation = Joi.string().max(100).optional();

export { createMenuValiadation, imageMenuValidation };
