const Joi = require("joi");

const schema = Joi.object({
  address1: Joi.string().max(150).required(),
  address2: Joi.string().max(150),
  address3: Joi.string().max(150),
  city: Joi.string().max(100).required(),
  state: Joi.string().max(50).required(),
  country: Joi.string().max(50).required(),
  postalCode: Joi.string().max(10).required(),
})
  .required()
  .messages({
    "object.base": "At least one address is required.",
  });

module.exports = schema;
