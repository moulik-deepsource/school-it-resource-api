const addressSchema = require("../schemas/Address.schema");
const credentialSchema = require("../schemas/Credential.schema");
const personalInfoSchema = require("../schemas/PersonalInfo.schema");
const studentCreateSchema = require("../schemas/Student.create.schema");

const { toMySQLDate } = require("../tools/Date.tools");
const { hash } = require("../tools/Password.tools");
// TODO: Write independent database preparator based on validator results

module.exports = async (student) => {
  let valid = {
    credential: null,
    personalInfo: null,
    addresses: [],
  };

  try {
    await studentCreateSchema.validateAsync(student);

    const { credential, personalInfo, address } = student;

    valid.credential = await credentialSchema.validateAsync(credential);
    valid.personalInfo = await personalInfoSchema.validateAsync(personalInfo);

    for (const singleAddress of address) {
      valid.addresses.push(await addressSchema.validateAsync(singleAddress));
    }
  } catch (err) {
    throw err;
  }

  // Hash password for database insert

  valid.credential = {
    ...valid.credential,
    password: await hash(valid.credential.password),
  };

  // TODO: Write data combiner

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

  // TODO: Write independent database preparator based on validator results

  // Prepare Prisma-ready object
  const databaseReadyStudent = {
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

      student: {
        create: {},
      },
    },
  };

  return databaseReadyStudent;
};
