/*
  Warnings:

  - You are about to drop the column `Address1` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `Address2` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `Address3` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `PostalCode` on the `address` table. All the data in the column will be lost.
  - Added the required column `address1` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `Address1`,
    DROP COLUMN `Address2`,
    DROP COLUMN `Address3`,
    DROP COLUMN `City`,
    DROP COLUMN `State`,
    DROP COLUMN `Country`,
    DROP COLUMN `PostalCode`,
    ADD COLUMN     `address1` VARCHAR(191) NOT NULL,
    ADD COLUMN     `address2` VARCHAR(191),
    ADD COLUMN     `address3` VARCHAR(191),
    ADD COLUMN     `city` VARCHAR(191),
    ADD COLUMN     `state` VARCHAR(191),
    ADD COLUMN     `country` VARCHAR(191),
    ADD COLUMN     `postalCode` VARCHAR(191);
