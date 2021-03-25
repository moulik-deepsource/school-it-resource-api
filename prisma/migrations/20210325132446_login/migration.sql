/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[login]` on the table `credential`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `credential.login_unique` ON `credential`(`login`);
