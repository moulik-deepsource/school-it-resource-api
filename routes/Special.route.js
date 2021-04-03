const { Router } = require("express");

const { getCredentialsByLogin } = require("../controllers/Special.controller");

// ~~> Mounted as /auth
const route = Router();

// ~> Get user credentials for
route.get("/:login", getCredentialsByLogin);

module.exports = route;
