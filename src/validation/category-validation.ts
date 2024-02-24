import Joi from "joi";

const createCategoryValiadation = Joi.string().min(2).max(100).required();

const getCategoryValidation = Joi.number().min(0).required().positive();

const removeCategoryValidation = Joi.number().min(0).required().positive();

export {
  createCategoryValiadation,
  removeCategoryValidation,
  getCategoryValidation,
};
