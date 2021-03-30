/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_gradetouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_gradetouser` DROP FOREIGN KEY `_gradetouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_gradetouser` DROP FOREIGN KEY `_gradetouser_ibfk_2`;

-- DropForeignKey
ALTER TABLE `credential` DROP FOREIGN KEY `credential_ibfk_1`;

-- DropForeignKey
ALTER TABLE `homework` DROP FOREIGN KEY `homework_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mark` DROP FOREIGN KEY `mark_ibfk_1`;

-- DropForeignKey
ALTER TABLE `personalinfo` DROP FOREIGN KEY `personalinfo_ibfk_1`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `_gradetouser`;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_gradeTostudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_gradeTostudent_AB_unique`(`A`, `B`),
INDEX `_gradeTostudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_gradeTostudent` ADD FOREIGN KEY (`A`) REFERENCES `grade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_gradeTostudent` ADD FOREIGN KEY (`B`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credential` ADD FOREIGN KEY (`userId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homework` ADD FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mark` ADD FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personalInfo` ADD FOREIGN KEY (`userId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
