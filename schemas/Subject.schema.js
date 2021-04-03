const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().max(150).min(5).required(),
})
  .required()
  .messages({
    "object.base": "Supply valid subject data.",
  });

module.exports = schema;
