import Joi from "joi";

const registerAdminValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(8).max(100).required(),
  email: Joi.string().email().max(100).required(),
});

export { registerAdminValidation };
