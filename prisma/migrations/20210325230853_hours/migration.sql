-- CreateTable
CREATE TABLE `hours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(6) NOT NULL,
    `to` VARCHAR(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
