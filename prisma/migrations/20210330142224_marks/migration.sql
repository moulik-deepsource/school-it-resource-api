/*
  Warnings:

  - You are about to drop the `hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `plan` DROP FOREIGN KEY `plan_ibfk_1`;

-- DropTable
DROP TABLE `hours`;

-- DropTable
DROP TABLE `lesson`;

-- DropTable
DROP TABLE `plan`;

-- CreateTable
CREATE TABLE `subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `mark` INTEGER NOT NULL,
    `markWeight` INTEGER NOT NULL,
    `markDescription` VARCHAR(255) NOT NULL,
    `markDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mark` ADD FOREIGN KEY (`studentId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
