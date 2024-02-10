import ResponseError from "../error/response-error";
import { AnySchema } from "joi";

export const validate = (schema: AnySchema, request: any) => {
  const result = schema.validate(request,{
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  }

  return result.value;
};
