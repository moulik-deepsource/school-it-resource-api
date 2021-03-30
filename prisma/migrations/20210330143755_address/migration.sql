/*
  Warnings:

  - You are about to drop the column `markDate` on the `mark` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user.email_unique` ON `user`;

-- AlterTable
ALTER TABLE `mark` DROP COLUMN `markDate`,
    ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    DROP COLUMN `email`;

-- CreateTable
CREATE TABLE `personalInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastNane` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
UNIQUE INDEX `personalInfo.email_unique`(`email`),
UNIQUE INDEX `personalInfo_userId_unique`(`userId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personalInfoId` INTEGER NOT NULL,
    `Address1` VARCHAR(191) NOT NULL,
    `Address2` VARCHAR(191) NOT NULL,
    `Address3` VARCHAR(191) NOT NULL,
    `City` VARCHAR(191) NOT NULL,
    `State` VARCHAR(191) NOT NULL,
    `Country` VARCHAR(191) NOT NULL,
    `PostalCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `homework` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `mark` INTEGER NOT NULL,
    `homeworkDescription` VARCHAR(255) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `personalInfo` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD FOREIGN KEY (`personalInfoId`) REFERENCES `personalInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homework` ADD FOREIGN KEY (`studentId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
