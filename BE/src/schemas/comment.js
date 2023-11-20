import joi from 'joi'


export const commentSchema = joi.object({
  book: joi.string().required().messages({
    "string.empty": "id sản phẩm không được để trống",
  }),
  stars: joi.number().required().messages({
    "string.empty": "sao không được để trống",
  }),
  comment: joi.string().required().messages({
    "string.empty": "phải nhập bình luận",
  }),
  user: joi.string().required().messages({
    "string.empty": "phải nhập bình luận",
  }),
});