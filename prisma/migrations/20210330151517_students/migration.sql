/*
  Warnings:

  - You are about to drop the column `firstName` on the `personalinfo` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `personalinfo` table. All the data in the column will be lost.
  - You are about to drop the column `lastNane` on the `personalinfo` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `personalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `personalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastnane` to the `personalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personalinfo` DROP COLUMN `firstName`,
    DROP COLUMN `middleName`,
    DROP COLUMN `lastNane`,
    ADD COLUMN     `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN     `middlename` VARCHAR(191) NOT NULL,
    ADD COLUMN     `lastnane` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `personel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `credential` ADD FOREIGN KEY (`userId`) REFERENCES `personel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personalInfo` ADD FOREIGN KEY (`userId`) REFERENCES `personel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
