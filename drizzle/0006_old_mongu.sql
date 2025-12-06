CREATE TABLE `advertising_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`ad_type` varchar(100) NOT NULL,
	`budget` varchar(100) NOT NULL,
	`message` text NOT NULL,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `advertising_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_listings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_name` varchar(255) NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`listing_type` varchar(100) NOT NULL,
	`business_description` text NOT NULL,
	`website` varchar(500) NOT NULL,
	`address` text NOT NULL,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partner_listings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partnership_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_name` varchar(255) NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`partnership_type` varchar(100) NOT NULL,
	`proposal` text NOT NULL,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partnership_inquiries_id` PRIMARY KEY(`id`)
);
