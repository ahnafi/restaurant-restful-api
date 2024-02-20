import Joi from "joi";

const createCategoryValiadation = Joi.string().min(2).max(100).required();

export { createCategoryValiadation };
