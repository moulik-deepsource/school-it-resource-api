const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const faker = require("faker");

const { hash } = require("../tools/Password.tools");

const chalk = require("chalk");

const DefaultUsers = require("../DefaultUsers");

const { toMySQLDate } = require("../tools/Date.tools");

const randomAddress = () => ({
  address1: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  state: faker.address.state(),
  postalCode: faker.address.zipCode(),
});

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomStudentId = async () => {
  const students = await prisma.student.findMany({
    select: {
      id: true,
    },
  });

  const student = students[Math.floor(Math.random() * students.length)];

  return student.id;
};

const randomTeacherId = async () => {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
    },
  });

  const teacher = teachers[Math.floor(Math.random() * teachers.length)];

  return teacher.id;
};

const randomSubjectId = async () => {
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
    },
  });

  const subject = subjects[Math.floor(Math.random() * subjects.length)];

  return subject.id;
};

const randomGroupId = async () => {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
    },
  });

  const group = groups[Math.floor(Math.random() * groups.length)];

  return group.id;
};

async function main() {
  for (const user of DefaultUsers) {
    const {
      firstname,
      lastname,
      dateOfBirth,
      email,
      login,
      password,
      role,
    } = user;

    const _date = toMySQLDate(dateOfBirth);

    const _hash = await hash(password);

    await prisma.user.create({
      data: {
        credential: {
          create: {
            login,
            password: _hash,
            role,
          },
        },
        personalInfo: {
          create: {
            firstname,
            lastname,
            email,
            dateOfBirth: _date,
            address: {
              create: {
                ...randomAddress(),
              },
            },
          },
        },
      },
    });

    console.log(
      chalk.cyan(
        `Added ${chalk.white.bold(
          "default"
        )} user '${login}' with rank '${role}' and password '${password}'`
      )
    );
  }

  // *** Random 1000 students
  console.log(chalk.cyan(`Seeding students...`));

  for (let index = 0; index < 1000; index++) {
    const _hash = await hash(faker.internet.password());
    const _date = toMySQLDate(faker.date.past());
    const login = (
      faker.name.firstName() +
      faker.name.lastName() +
      (await randomInt(1, 50))
    ).toLowerCase();

    await prisma.user.create({
      data: {
        credential: {
          create: {
            login,
            password: _hash,
            role: "student",
          },
        },

        personalInfo: {
          create: {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            dateOfBirth: _date,
            address: {
              create: {
                ...randomAddress(),
              },
            },
          },
        },
        student: {
          create: {},
        },
      },
    });
  }

  randomStudentId();

  // *** Random 150 teachers
  console.log(chalk.cyan(`Seeding teachers...`));

  for (let index = 0; index < 150; index++) {
    const _hash = await hash(faker.internet.password());
    const _date = toMySQLDate(faker.date.past());
    const login = (
      faker.name.firstName() +
      faker.name.lastName() +
      (await randomInt(1, 50))
    ).toLowerCase();

    await prisma.user.create({
      data: {
        credential: {
          create: {
            login,
            password: _hash,
            role: "teacher",
          },
        },

        personalInfo: {
          create: {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            dateOfBirth: _date,
            address: {
              create: {
                ...randomAddress(),
              },
            },
          },
        },
        teacher: {
          create: {},
        },
      },
    });
  }

  // *** Subjects
  console.log(chalk.cyan(`Seeding subjects...`));
  const subjects = [
    "Art",
    "Biology",
    "Chemistry",
    "English",
    "Foreign languages",
    "French",
    "Geography",
    "German",
    "History",
    "Humanities",
    "IT",
    "Italian",
    "Latin",
    "Literature",
    "Mathematics",
    "Music",
    "Natural Sciences",
    "PE",
    "Physics",
    "Religious",
    "Russian",
    "Science",
    "Technology",
  ];

  for (const subject of subjects) {
    await prisma.subject.create({
      data: {
        name: subject,
      },
    });
  }

  // *** Rooms
  console.log(chalk.cyan(`Seeding rooms...`));

  for (let index = 0; index < 250; index++) {
    await prisma.room.create({
      data: {
        number: index.toString(),
        type: "general",
      },
    });
  }

  // *** Hours
  console.log(chalk.cyan(`Seeding hours...`));

  const hours = [
    ["06:45", "07:30"],
    ["7:30", "8:15"],
    ["8:25", "9:10"],
    ["09:20", "10:05"],
    ["10:15", "11:00"],
    ["11:10", "11:55"],
    ["12:10", "12:55"],
    ["13:05", "13:50"],
    ["14:00", "14:45"],
    ["14:55", "15:40"],
    ["15:50", "16:35"],
    ["16:40", "17:25"],
  ];

  for (const hour of hours) {
    const [from, to] = hour;

    await prisma.hour.create({
      data: {
        from,
        to,
      },
    });
  }

  // *** Groups
  console.log(chalk.cyan(`Seeding groups...`));

  const symbols = [
    "AL",
    "BL",
    "CL",
    "DL",
    "EL",
    "AT",
    "BT",
    "CT",
    "DT",
    "ET",
    "FT",
  ];

  for (const symbol of symbols) {
    for (let index = 1; index < 5; index++) {
      await prisma.group.create({
        data: {
          symbol: index + symbol,
        },
      });
    }
  }

  // *** Marks (generate + asing teacher, subject, student)
  console.log(chalk.cyan(`Seeding marks...`));

  for (let index = 0; index < 200; index++) {
    await prisma.mark.create({
      data: {
        studentId: await randomStudentId(),
        teacherId: await randomTeacherId(),
        subjectId: await randomSubjectId(),
        mark: randomInt(1, 6).toString(),
        weight: randomInt(1, 10),
        description: faker.company.catchPhrase(),
      },
    });
  }

  // *** Assigning students to groups (Workaround, cannot set many to many inside bulk update!)
  console.log(chalk.cyan(`Assining students to groups...`));

  const studentsIds = await prisma.student.findMany({
    select: {
      id: true,
    },
  });

  for (const sid of studentsIds) {
    await prisma.student.update({
      where: {
        id: sid.id,
      },
      data: {
        group: {
          set: {
            id: await randomGroupId(),
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
