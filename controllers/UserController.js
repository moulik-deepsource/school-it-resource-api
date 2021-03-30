const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");

const { hash } = require("../tools/Password.tools");

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

// ~~> Mounted as /users
const controller = Router();

// ~> All users
controller.get("/", async (req, res) => {
  const { role } = req.query;

  const filter = role
    ? {
        where: {
          credential: {
            role,
          },
        },
      }
    : {};

  const users = await prisma.user.findMany(filter);
  res.json(users);
});

// ~> User by id
controller.get("/:id", async (req, res) => {
  let { id } = req.params;

  const _id = +id;
  const user = await prisma.user.findFirst({
    where: {
      id: _id,
    },
    include: {
      grade: true,
    },
  });
  res.json(user);
});

// ~> Add user
controller.post("/", async (req, res) => {
  const { firstname, surname, email, login, password } = req.body;

  const passwordHash = await hash(password);

  try {
    const newUser = await prisma.user.create({
      data: {
        address: {
          create: {
            firstName: name,
          },
        },
        credential: {
          create: {
            login: login.toLowerCase(),
            password: passwordHash,
            role: "student",
          },
        },
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(409).json(err.meta);
  }
});

// ~> Change grade
controller.put("/:id", async (req, res) => {
  let { id } = req.params;

  const _id = +id;

  let { symbol } = req.body;

  const grade = await prisma.grade.findFirst({
    where: {
      symbol: symbol,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: _id,
    },
    data: {
      grade: {
        set: {
          id: grade.id,
        },
      },
    },
  });

  res.json(result);
});

// ~> Remove user
controller.delete("/:id", async (req, res) => {
  let { id } = req.params;

  const _id = +id;

  try {
    const result = await prisma.$transaction([
      prisma.credential.delete({
        where: {
          userId: _id,
        },
      }),

      prisma.user.delete({
        where: {
          id: _id,
        },
      }),
    ]);

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: "Delete failed." });
  }
});
// ~~> Database disconnect
(async () => {
  await prisma.$disconnect();
})();

module.exports = controller;
