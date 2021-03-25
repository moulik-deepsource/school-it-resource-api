// *** Request interceptor
/*
 *   This middleware will intercept each request, fetch potential auth token if needed
 *
 *    Middleware is during development
 */

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  console.log("[TOKEN]: " + token || false);
  next();
};
