const homeworkValidator = require("../validators/Homework.validator");

const homeworkPreparator = async (homework, type = "create") => {
  const VALID_TYPES = ["create", "update"];

  if (!VALID_TYPES.includes(type))
    throw TypeError(
      `Invalid type supplied for validator. Expected 'create' or 'update', '${type}' given. `
    );

  // Validate incoming data from controller
  const valid = await homeworkValidator(homework, type);

  const databaseReadyHomework = {
    data: {
      ...valid,
    },
  };

  return databaseReadyHomework;
};

module.exports = homeworkPreparator;
