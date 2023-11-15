import joi from "joi";

export const paymentSchema = joi.object({
  orderId: joi.string().optional(),
  cardHolderName: joi
    .string()
    .required(),
  cardNumber: joi.number().required(),
  expirationDate: joi
    .string()
    .required(),
  cvv: joi.number().required()
});