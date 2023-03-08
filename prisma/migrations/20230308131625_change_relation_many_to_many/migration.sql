/*
  Warnings:

  - You are about to drop the column `post_id` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_post_id_fkey`;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `post_id`;

-- CreateTable
CREATE TABLE `_postTags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_postTags_AB_unique`(`A`, `B`),
    INDEX `_postTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_postTags` ADD CONSTRAINT `_postTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_postTags` ADD CONSTRAINT `_postTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
