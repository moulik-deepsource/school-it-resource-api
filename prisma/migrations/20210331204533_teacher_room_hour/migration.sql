/*
  Warnings:

  - Added the required column `teacher_id` to the `Homeworks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `homeworks` ADD COLUMN     `teacher_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `marks` ADD COLUMN     `teacher_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Rooms` (
    `id` VARCHAR(191) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `type` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hours` (
    `id` VARCHAR(191) NOT NULL,
    `from` VARCHAR(255) NOT NULL,
    `to` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Homeworks` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Marks` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
