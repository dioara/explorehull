ALTER TABLE `blog_posts` MODIFY COLUMN `excerpt` text NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` MODIFY COLUMN `author` varchar(255) NOT NULL DEFAULT 'ExploreHull Editorial Team';--> statement-breakpoint
ALTER TABLE `blog_posts` MODIFY COLUMN `category` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `readingTime` int DEFAULT 5;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `published` boolean DEFAULT true;