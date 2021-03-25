const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

// ~~> Mounted as /users
const controller = Router();

// ~> Get user credentials for
controller.get("/:login", async (req, res) => {
  const { login } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        credential: {
          login,
        },
      },
      include: {
        credential: true,
      },
    });

    res.json(user);
  } catch {
    res.json({ error: "Credentials error" });
  }
});

// ~~> Database disconnect
(async () => {
  await prisma.$disconnect();
})();

module.exports = controller;
