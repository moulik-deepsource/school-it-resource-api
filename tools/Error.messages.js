// Default code
const code = 400;

module.exports.USER_DOES_NOT_EXISTS = {
  message: "User does not exists.",
  code,
};

module.exports.TOKEN_BLACKLISTED = {
  message: "Recieved token has been blacklisted.",
  code: 403,
};

module.exports.PASSWORD_INVALID = { message: "Password is invalid.", code };

module.exports.TOKEN_ALREADY_ISSUED = {
  message: "Token has already been issued.",
  code,
};

module.exports.MISSING_PARAM = {
  message: "Some parameters are missing.",
  code,
};

module.exports.TOKEN_MISSING = {
  message: "Token is missing, supply request with proper auth header.",
  code,
};

module.exports.LOGOUT_FAILED = {
  message: "Server couldn't log you out.",
  code,
};

module.exports.UNPROCESSABLE_TOKEN = {
  message: "Server could not process your token.",
  code: 422,
};

module.exports.JSON_INVALID = {
  message: "Unproccessable JSON. Syntax Error",
  code: 422,
};
