const { PrismaClient } = require("@prisma/client");

const studentCreateValidator = require("../validators/Student.create.validator");

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

// ~> All users
module.exports.getAllStudents = async (req, res) => {
  const users = await prisma.user.findMany({});
  res.json(users);
};

// ~> Student by ID
module.exports.getStudentById = async (req, res) => {
  let { id } = req.params;

  const user = await prisma.student.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          personalInfo: true,
        },
      },
      homework: true,
      group: true,
      mark: true,
    },
  });
  res.json(user);
};

// ~> Add student
module.exports.addStudent = async (req, res) => {
  try {
    const result = await studentCreateValidator(req.body);
    const insertResult = await prisma.user.create(result);
    res.json(insertResult);
  } catch (err) {
    console.log(err);
    res.json(err);
    //res.status(400).json({ error: err.details.map((e) => e.message) });
  }
};

// ~~> Database disconnect
(async () => {
  await prisma.$disconnect();
})();
