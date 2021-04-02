const { PrismaClient } = require("@prisma/client");

const userCreatePreparator = require("../preparators/User.create.preparator");

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

// ~> All users
module.exports.getAllStudents = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

// ~> Student by ID
module.exports.getStudentById = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

// ~> Add student
module.exports.addStudent = async (req, res) => {
  try {
    // Controller -> Preparator -> Validator -> Preparator -> Controller
    const preparedUser = await userCreatePreparator(req.body);

    // Insert new user to database
    const result = await prisma.user.create(preparedUser);

    // No errors have been thrown, proceed with response
    res.json(result);
  } catch (err) {
    console.log(err);

    res
      .status(400)
      // Filter validation errors apart from preparator errors
      .json(err.details && { error: err.details.map((e) => e.message) });
  } finally {
    await prisma.$disconnect();
  }
};
