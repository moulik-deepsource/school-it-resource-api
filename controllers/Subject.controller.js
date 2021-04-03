const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ash = require("express-async-handler");

const subjectPreparator = require("../preparators/Subject.preparator");

// ~> All subjects
module.exports.getAllSubjects = ash(async (req, res) => {
  const result = await prisma.subject.findMany();
  res.json(result);

  await prisma.$disconnect();
});

// ~> Add subject
module.exports.addSubject = ash(async (req, res) => {
  const preparedSubject = await subjectPreparator(req.body);

  const result = await prisma.subject.create(preparedSubject);

  res.status(201).json(result);

  await prisma.$disconnect();
});

// ~> Remove subject
module.exports.removeSubject = ash(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.subject.delete({
    where: {
      id,
    },
  });

  res.json(result);

  await prisma.$disconnect();
});

// ~> Update subject
module.exports.updateSubject = ash(async (req, res) => {
  const { id } = req.params;

  const preparedSubject = await subjectPreparator(req.body);

  console.log(preparedSubject);

  const result = await prisma.subject.update({
    where: {
      id,
    },
    ...preparedSubject,
  });

  res.json(result);

  await prisma.$disconnect();
});
