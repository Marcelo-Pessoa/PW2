import Joi from 'joi';

export const productSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).integer().required(),
  description: Joi.string().min(0).max(200),
  status: Joi.number().min(0).max(1).integer().required()
})

export default productSchema;