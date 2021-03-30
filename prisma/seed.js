const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("../tools/Password.tools");

const chalk = require("chalk");

const DefaultUsers = require("../DefaultUsers");

const { toMySQLDate } = require("../tools/Date.tools");

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
          },
        },
      },
    });

    console.log(
      chalk.cyan(
        `[SEED] Added ${chalk.white.bold(
          "default"
        )} user '${login}' with rank '${role}' and password '${password}'`
      )
    );
  }

  await prisma.subject.create({
    data: {
      name: "Phisics",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
