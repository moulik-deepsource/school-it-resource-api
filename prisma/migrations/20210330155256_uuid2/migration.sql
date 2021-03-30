/*
  Warnings:

  - You are about to drop the `personel` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[userId]` on the table `student`. If there are existing duplicate values, the migration will fail.
  - Added the required column `userId` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `credential` DROP FOREIGN KEY `credential_ibfk_2`;

-- DropForeignKey
ALTER TABLE `credential` DROP FOREIGN KEY `credential_ibfk_1`;

-- DropForeignKey
ALTER TABLE `personalinfo` DROP FOREIGN KEY `personalinfo_ibfk_1`;

-- DropForeignKey
ALTER TABLE `personalinfo` DROP FOREIGN KEY `personalinfo_ibfk_2`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN     `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `personel`;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `student_userId_unique` ON `student`(`userId`);

-- AddForeignKey
ALTER TABLE `credential` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personalInfo` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
