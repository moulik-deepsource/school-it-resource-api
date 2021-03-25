/*
  Warnings:

  - You are about to drop the `_lessontoplan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jsonPlan` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_lessontoplan` DROP FOREIGN KEY `_lessontoplan_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_lessontoplan` DROP FOREIGN KEY `_lessontoplan_ibfk_2`;

-- AlterTable
ALTER TABLE `plan` ADD COLUMN     `jsonPlan` MEDIUMTEXT NOT NULL;

-- DropTable
DROP TABLE `_lessontoplan`;
