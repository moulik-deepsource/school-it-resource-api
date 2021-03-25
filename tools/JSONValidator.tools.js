// *** Tool ensures that invalid JSON requst won't crash whole app

// *** Potential error handling
const { JSON_INVALID } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("[JSON Failsafe] Invalid JSON recieved.");
    return PrettyError(res, JSON_INVALID);
  }

  next();
};
