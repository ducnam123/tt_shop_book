import joi from 'joi'

export const categoriSchema = joi.object({
  name: joi.string().required().min(6).messages({
    "string.empty": "Tên không được để trống",
    "string.min": "nhập ít nhất {#limit} ký tự",
    "any.required": "tên bắt buộc phải nhập"
  }),
})