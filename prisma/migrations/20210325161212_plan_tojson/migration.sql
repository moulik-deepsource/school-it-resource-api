/*
  Warnings:

  - You are about to alter the column `jsonPlan` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `MediumText` to `Json`.

*/
-- AlterTable
ALTER TABLE `plan` MODIFY `jsonPlan` JSON NOT NULL;
