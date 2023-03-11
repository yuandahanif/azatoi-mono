-- DropForeignKey
ALTER TABLE `Link` DROP FOREIGN KEY `Link_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `PostsOnTags` DROP FOREIGN KEY `PostsOnTags_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `PostsOnTags` DROP FOREIGN KEY `PostsOnTags_tag_id_fkey`;

-- AddForeignKey
ALTER TABLE `PostsOnTags` ADD CONSTRAINT `PostsOnTags_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostsOnTags` ADD CONSTRAINT `PostsOnTags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
