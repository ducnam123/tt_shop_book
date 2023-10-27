import joi from "joi";

export const bookSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  original_price: joi.number().required(),
  images: joi.array().required(),
  title: joi.string().required(),
  author: joi.string().required(),
  description: joi.string().required(),
  categoryId: joi.string().required(),
});