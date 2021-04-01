-- CreateTable
CREATE TABLE `plan` (
    `id` VARCHAR(191) NOT NULL,
    `monday` JSON NOT NULL,
    `tuesday` JSON NOT NULL,
    `wednesday` JSON NOT NULL,
    `thursday` JSON NOT NULL,
    `friday` JSON NOT NULL,
    `group_id` VARCHAR(191) NOT NULL,
UNIQUE INDEX `plan.group_id_unique`(`group_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plan` ADD FOREIGN KEY (`group_id`) REFERENCES `Groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
