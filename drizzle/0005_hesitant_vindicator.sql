CREATE TABLE `itinerary_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`item_type` varchar(50) NOT NULL,
	`item_id` int NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `itinerary_items_id` PRIMARY KEY(`id`)
);
