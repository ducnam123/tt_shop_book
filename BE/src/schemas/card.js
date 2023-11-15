import joi from "joi";

export const cardSchema = joi.object({
  card_holder_name: joi
    .string()
    .required(),
  card_number: joi.string().required(),
  start_date: joi.string().required(),
  end_date: joi.string().required(),
  cvv: joi.number().required(),
  main: joi.boolean().optional(),
});