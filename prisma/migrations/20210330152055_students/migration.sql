/*
  Warnings:

  - You are about to drop the column `lastnane` on the `personalinfo` table. All the data in the column will be lost.
  - Added the required column `lastname` to the `personalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` MODIFY `Address2` VARCHAR(191),
    MODIFY `Address3` VARCHAR(191),
    MODIFY `City` VARCHAR(191),
    MODIFY `State` VARCHAR(191),
    MODIFY `Country` VARCHAR(191),
    MODIFY `PostalCode` VARCHAR(191);

-- AlterTable
ALTER TABLE `personalinfo` DROP COLUMN `lastnane`,
    ADD COLUMN     `lastname` VARCHAR(191) NOT NULL;
