const subjectSchema = require("../schemas/Subject.schema");

module.exports = async (subject) => {
  let valid = {
    name: null,
  };

  valid = await subjectSchema.validateAsync(subject);

  return valid;
};
