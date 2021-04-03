const { createSchema, updateSchema } = require("../schemas/Homework.schema");

module.exports = async (homework, type) => {
  valid =
    type == "create"
      ? await createSchema.validateAsync(homework)
      : await updateSchema.validateAsync(homework);

  return valid;
};
