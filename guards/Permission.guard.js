// *** Request interceptor
/*
 *   This middleware will intercept each request, fetch potential auth token if needed
 *
 */

const { verify } = require("../tools/Token.tools");
const {
  generateRestrictions,
  isPermitted,
} = require("../tools/Permission.tools");

const { PrettyError } = require("../tools/Errors.tools");
const {
  TOKEN_MISSING,
  TOKEN_INVALID,
  INSUFFICIENT_PERMISSIONS,
} = require("../tools/Error.messages");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // *** Token hasn't been supplied
  if (!token) return PrettyError(res, TOKEN_MISSING);

  const result = verify(token);

  // *** Token is expired or invalid
  if (!result) return PrettyError(res, TOKEN_INVALID);

  const { login, role, id } = result.payload;

  // *** Assign payload values for potential further use
  req.id = id;
  req.login = login;
  req.role = role;

  // *** Setup path(s) for which user is permitted to request
  const restrictions = generateRestrictions(role, id);

  // *** Proceed when everything is fine or throw an error
  if (isPermitted(req, restrictions)) next();
  else return PrettyError(res, INSUFFICIENT_PERMISSIONS);
};
