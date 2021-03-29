// Default code
const code = 400;

module.exports.TOKEN_BLACKLISTED = {
  message: "Recieved token has been blacklisted.",
  code: 403,
};

module.exports.TOKEN_MISSING = {
  message: "Token is missing, supply request with proper auth header.",
  code,
};

module.exports.TOKEN_INVALID = {
  message: "Token is invalid.",
  code,
};

module.exports.UNPROCESSABLE_TOKEN = {
  message: "Server could not process your token.",
  code: 422,
};

module.exports.JSON_INVALID = {
  message: "Unproccessable JSON. Syntax Error.",
  code: 422,
};

module.exports.JSON_INVALID = {
  message: "Unproccessable JSON. Syntax Error.",
  code: 422,
};

module.exports.INSUFFICIENT_PERMISSIONS = {
  message:
    "Token's role has insufficient permission level to access this path.",
  code: 403,
};
