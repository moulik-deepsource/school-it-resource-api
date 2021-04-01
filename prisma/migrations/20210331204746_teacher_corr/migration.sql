-- DropForeignKey
ALTER TABLE `homeworks` DROP FOREIGN KEY `homeworks_ibfk_2`;

-- DropForeignKey
ALTER TABLE `marks` DROP FOREIGN KEY `marks_ibfk_2`;

-- CreateTable
CREATE TABLE `Teachers` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Teachers_user_id_unique`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teachers` ADD FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Homeworks` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Marks` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
