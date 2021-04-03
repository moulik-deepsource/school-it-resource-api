const subjectValidator = require("../validators/Subject.validator");

const subjectPreparator = async (user) => {
  // Validate incoming data from controller
  const valid = await subjectValidator(user);

  const databaseReadySubject = {
    data: {
      ...valid,
    },
  };

  return databaseReadySubject;
};

module.exports = subjectPreparator;
