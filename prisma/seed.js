const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("../tools/Password.tools");

const chalk = require("chalk");

const DefaultUsers = require("../DefaultUsers");

async function main() {
  for (const user of DefaultUsers) {
    const { name, email, login, password, role } = user;

    const _hash = await hash(password);

    await prisma.user.create({
      data: {
        name,
        email,
        credential: {
          create: {
            login,
            password: _hash,
            role,
          },
        },
      },
    });

    console.log(
      chalk.cyan(
        `[SEED] Added ${chalk.white.bold(
          "default"
        )} user '${login}' with rank '${role}' and password ${password}`
      )
    );
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
