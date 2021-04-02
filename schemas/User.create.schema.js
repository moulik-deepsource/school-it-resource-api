const Joi = require("joi");

const schema = Joi.object({
  credential: Joi.object().required(),
  personalInfo: Joi.object().required(),
  address: Joi.array().required(),
});

module.exports = schema;
