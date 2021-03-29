// *** Request interceptor
/*
 *   This middleware will intercept each request, fetch potential auth token if needed
 *
 *    Middleware is during development
 */

const { verify } = require("../tools/Token.tools");
const { setPermittedPaths } = require("../tools/Permission.tools");

const PrettyError = require("../tools/Errors.tools");
const { TOKEN_MISSING, TOKEN_INVALID } = require("../tools/Error.messages");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // *** Token hasn't been supplied
  if (!token) return PrettyError(res, TOKEN_MISSING);

  const result = verify(token);

  // *** Token is expired or invalid
  if (!result) return PrettyError(res, TOKEN_INVALID);

  const { login, role } = result.payload;

  req.login = login;
  req.role = role;

  // *** Setup path(s) for which user is permitted to request
  setPermittedPaths(req, result.payload);

  // *** Proceed when everything is fine
  next();
};
