const addressSchema = require("../schemas/Address.schema");
const credentialSchema = require("../schemas/Credential.schema");
const personalInfoSchema = require("../schemas/PersonalInfo.schema");
const userCreateSchema = require("../schemas/User.create.schema");

module.exports = async (user) => {
  let valid = {
    credential: null,
    personalInfo: null,
    addresses: [],
  };

  await userCreateSchema.validateAsync(user);

  const { credential, personalInfo, address } = user;

  valid.credential = await credentialSchema.validateAsync(credential);
  valid.personalInfo = await personalInfoSchema.validateAsync(personalInfo);

  for (const singleAddress of address) {
    valid.addresses.push(await addressSchema.validateAsync(singleAddress));
  }
  return valid;
};
