const { toMySQLDate } = require("../tools/Date.tools");
const { hash } = require("../tools/Password.tools");

const userCreateValidator = require("../validators/User.create.validator");

const userCreatePreparator = async (user, role = "student") => {
  const VALID_ROLES = [null, "student", "teacher"];

  if (!VALID_ROLES.includes(role))
    throw TypeError(
      "Invalid role supplied to preparator. Provide NULL to preparate data with no role."
    );

  // Validate incoming data from controller
  const valid = await userCreateValidator(user);

  // Hash password
  valid.credential = {
    ...valid.credential,
    password: await hash(valid.credential.password),
  };

  // Extract birth date partials
  const { birthYear, birthMonth, birthDay } = valid.personalInfo;

  // Get rid of partials for the further destruct use
  delete valid.personalInfo.birthYear;
  delete valid.personalInfo.birthMonth;
  delete valid.personalInfo.birthDay;

  // Combine date
  const combinedBirthDate = toMySQLDate(
    `${birthYear}-${birthMonth}-${birthDay}`
  );

  // Pretype personalInfo
  valid.personalInfo = {
    ...valid.personalInfo,
    dateOfBirth: combinedBirthDate,
    address: {
      create: valid.addresses,
    },
  };

  // Prepare Prisma-ready object
  const databaseReadyUser = {
    data: {
      credential: {
        create: {
          ...valid.credential,
        },
      },

      personalInfo: {
        create: {
          ...valid.personalInfo,
        },
      },
    },
  };

  if (role) databaseReadyUser.data[role] = { create: {} };

  return databaseReadyUser;
};

module.exports = userCreatePreparator;
