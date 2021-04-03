const Joi = require("joi");

const createSchema = Joi.object({
  createdAt: Joi.date().required(),
  deadline: Joi.date().required(),
  description: Joi.string().min(1).max(500).required(),
  studentId: Joi.string().length(36).required(),
  teacherId: Joi.string().length(36).required(),
}).required();

const updateSchema = Joi.object({
  createdAt: Joi.date(),
  deadline: Joi.date(),
  description: Joi.string().min(1).max(500),
  studentId: Joi.string().length(36),
  teacherId: Joi.string().length(36),
}).required();

module.exports = { createSchema, updateSchema };
