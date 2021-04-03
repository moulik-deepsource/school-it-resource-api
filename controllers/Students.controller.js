const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ash = require("express-async-handler");

const userCreatePreparator = require("../preparators/User.create.preparator");

// ~> All users
module.exports.getAllStudents = ash(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);

  await prisma.$disconnect();
});

// ~> Student by ID
module.exports.getStudentById = ash(async (req, res) => {
  let { id } = req.params;

  const user = await prisma.student.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      user: {
        select: {
          personalInfo: {
            select: {
              dateOfBirth: true,
              email: true,
              firstname: true,
              lastname: true,
              middlename: true,
            },
          },
        },
      },
      homework: {
        select: {
          id: true,
          createdAt: true,
          deadline: true,
          description: true,
          teacher: {
            select: {
              user: {
                select: {
                  personalInfo: {
                    select: {
                      firstname: true,
                      lastname: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      group: {
        select: {
          symbol: true,
        },
      },
      mark: {
        select: {
          id: true,
          createdAt: true,
          description: true,
          mark: true,
          weight: true,
          teacher: {
            select: {
              user: {
                select: {
                  personalInfo: {
                    select: {
                      firstname: true,
                      lastname: true,
                    },
                  },
                },
              },
            },
          },
          subject: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.json(user);
  await prisma.$disconnect();
});

// ~> Add student
module.exports.addStudent = ash(async (req, res) => {
  // Controller -> Preparator -> Validator -> Preparator -> Controller
  const preparedUser = await userCreatePreparator(req.body);

  // Insert new user to database
  const result = await prisma.user.create(preparedUser);

  // No errors have been thrown, proceed with response
  res.status(201).json(result);

  await prisma.$disconnect();
});
