const Joi = require("joi");

const schema = Joi.object({
  firstname: Joi.string().max(150).min(2).required(),
  middlename: Joi.string().max(150),
  lastname: Joi.string().max(150).min(2).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "pl", "net"] } })
    .required(),
  birthYear: Joi.number().integer().min(1900).max(2013).required(),
  birthMonth: Joi.number().integer().min(1).max(12).required(),
  birthDay: Joi.number().integer().min(1).max(31).required(),
});

module.exports = schema;
