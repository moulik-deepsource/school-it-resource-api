/*
  Warnings:

  - Added the required column `subject_id` to the `Marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `marks` ADD COLUMN     `subject_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Marks` ADD FOREIGN KEY (`subject_id`) REFERENCES `Subjects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
