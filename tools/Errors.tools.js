module.exports = function PrettyError(res, { code, message }) {
  res.status(code).json({ error: message });
  return;
};
