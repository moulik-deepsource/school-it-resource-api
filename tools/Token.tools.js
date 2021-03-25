const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

module.exports = {
  verify: async (token, type = "access") => {
    let verificationResult;

    try {
      verificationResult = jwt.verify(
        token,
        type ? process.env.JWT_ACCESS : process.env.JWT_ACCESS
      );
    } catch {
      verificationResult = false;
    }

    return verificationResult;
  },
};
