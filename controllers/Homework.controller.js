const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ash = require("express-async-handler");
const homeworkPreparator = require("../preparators/Homework.preparator");

// ~> Get all homeworks
module.exports.getAllHomeworks = ash(async (req, res) => {
  const result = await prisma.homework.findMany();

  res.json(result);

  await prisma.$disconnect();
});

// ~> Get specified homework
module.exports.getHomeworkById = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.homework.findFirst({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Add homework
module.exports.addHomework = ash(async (req, res) => {
  const preparedHomework = await homeworkPreparator(req.body);

  const result = await prisma.homework.create(preparedHomework);

  res.json(result);

  await prisma.$disconnect();
});

// ~> Update single homework
module.exports.updateHomework = ash(async (req, res) => {
  const { id } = req.params;

  const preparedHomework = await homeworkPreparator(
    req.body,
    (type = "update")
  );

  const result = await prisma.homework.update({
    where: {
      id,
    },
    ...preparedHomework,
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Remove homework
module.exports.removeHomework = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.homework.delete({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});
