const Joi = require("joi");

const schema = Joi.object({
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  role: Joi.string().min(1).max(20).default("student"),
}).required();

module.exports = schema;
