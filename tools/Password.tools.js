// *** Password.tools serves as facade between code and real salting

const bcrypt = require("bcrypt");

const salt = process.env.PASS_SALT;

async function hash(password) {
  return await bcrypt.hash(password.trim() + salt, 10);
}

async function verify(password, hash) {
  return await bcrypt.compare(password.trim() + salt, hash);
}

module.exports = { hash, verify };
