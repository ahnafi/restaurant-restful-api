import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(8).max(100).required(),
  full_name: Joi.string().min(1).max(100).required(),
  address: Joi.string().min(0).max(250).required(),
  email: Joi.string().email().max(100).required(),
  phone_number: Joi.string().min(0).max(20).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

const tokenUserValidation = Joi.string().max(100).required();

const UpdateRequestValidation = Joi.object({
  username: Joi.string().min(3).max(100).optional(),
  password: Joi.string().min(8).max(100).optional(),
  full_name: Joi.string().min(1).max(100).optional(),
  address: Joi.string().min(0).max(250).optional(),
  email: Joi.string().email().max(100).optional(),
  phone_number: Joi.string().min(0).max(20).optional(),
});

export {
  registerUserValidation,
  loginUserValidation,
  tokenUserValidation,
  UpdateRequestValidation,
};
