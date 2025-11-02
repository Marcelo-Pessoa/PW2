import Joi from "joi"

export const productSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Nome precisa ter mais de 3 caracteres.'
  }),
  price: Joi.number().precision(2).min(0).required().messages({
    'number.min': 'O valor do preço precisa ser maior do que 0.'
  }),
  stock: Joi.number().min(0).integer().required().messages({
    'number.min': 'O valor do estoque precisa ser maior do que 0.'
  }),
  description: Joi.string().min(3).max(500).required().messages({
    'string.min': 'Descrição precisa ter mais de 3 caracteres.'
  }),
})

export default productSchema
