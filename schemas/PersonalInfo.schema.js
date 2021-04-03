const Joi = require("joi");

const schema = Joi.object({
  firstname: Joi.string().max(150).min(2).required(),
  middlename: Joi.string().max(150),
  lastname: Joi.string().max(150).min(2).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "pl", "net"] } })
    .required(),
  dateOfBirth: Joi.date().required(),
});

module.exports = schema;
