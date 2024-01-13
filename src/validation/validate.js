import ResponseError from "./../error/response-error.js";

export const validate = (schema, request) => {
  const result = schema.validate(request);

  if (result.error) {
    throw new ResponseError(400, result.message);
  }

  return result.value;
};
