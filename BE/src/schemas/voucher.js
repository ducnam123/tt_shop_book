import joi from "joi";

export const voucherSchema = joi.object({
  name: joi.string().required(),
  code: joi.string().required(),
  discount: joi.string().required(),
  limit: joi.number().min(0).required(),
  apply: joi
    .string()
    .required(),
  startDate: joi.string().required(),
  endDate: joi.string().required(),
});