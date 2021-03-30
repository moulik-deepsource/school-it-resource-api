/*
  Warnings:

  - The migration will change the primary key for the `address` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `credential` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `grade` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `homework` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `mark` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `personalinfo` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `personel` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `student` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `subject` table. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_ibfk_1`;

-- DropForeignKey
ALTER TABLE `credential` DROP FOREIGN KEY `credential_ibfk_1`;

-- DropForeignKey
ALTER TABLE `credential` DROP FOREIGN KEY `credential_ibfk_2`;

-- DropForeignKey
ALTER TABLE `homework` DROP FOREIGN KEY `homework_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mark` DROP FOREIGN KEY `mark_ibfk_1`;

-- DropForeignKey
ALTER TABLE `personalinfo` DROP FOREIGN KEY `personalinfo_ibfk_1`;

-- DropForeignKey
ALTER TABLE `personalinfo` DROP FOREIGN KEY `personalinfo_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_gradetostudent` DROP FOREIGN KEY `_gradetostudent_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_gradetostudent` DROP FOREIGN KEY `_gradetostudent_ibfk_2`;

-- AlterTable
ALTER TABLE `address` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `personalInfoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `credential` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `grade` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `homework` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mark` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `mark` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `personalinfo` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `personel` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `subject` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_gradetostudent` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `address` ADD FOREIGN KEY (`personalInfoId`) REFERENCES `personalInfo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credential` ADD FOREIGN KEY (`userId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credential` ADD FOREIGN KEY (`userId`) REFERENCES `personel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homework` ADD FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mark` ADD FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personalInfo` ADD FOREIGN KEY (`userId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personalInfo` ADD FOREIGN KEY (`userId`) REFERENCES `personel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gradeTostudent` ADD FOREIGN KEY (`A`) REFERENCES `grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gradeTostudent` ADD FOREIGN KEY (`B`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
