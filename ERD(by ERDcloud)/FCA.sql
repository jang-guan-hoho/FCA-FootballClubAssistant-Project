DROP SCHEMA IF EXISTS FCA;
CREATE SCHEMA IF NOT EXISTS FCA;
USE FCA;


CREATE TABLE `club` (
	`club_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(40) NOT NULL,
	`max_member` INT NOT NULL COMMENT 'maximum 100',
	`content` TEXT NOT NULL COMMENT 'placehold',
	`fee` INT NOT NULL COMMENT '1000~',
	`deadline` INT NOT NULL COMMENT '1~28',
	`club_img` VARCHAR(40) NULL DEFAULT 'default_img',
	`logo` VARCHAR(40) NULL DEFAULT 'default_logo',
	`account` INT NOT NULL,
	`bank` VARCHAR(20) NOT NULL,
	`region` VARCHAR(40) NOT NULL,
	PRIMARY KEY (`club_id`)
);
CREATE TABLE `user` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(40) NOT NULL,
	`password` VARCHAR(20) NOT NULL,
	`name` VARCHAR(20) NOT NULL,
	`gender` BOOLEAN NOT NULL COMMENT '남 - M / 여 - F',
	`birth` DATE NOT NULL,
	`intro` TEXT NOT NULL COMMENT 'placehold',
	`profile` VARCHAR(40) NULL,
	PRIMARY KEY (`user_id`)
);
CREATE TABLE `place` (
	`place_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(40) NOT NULL,
	`address` VARCHAR(100) NOT NULL,
	`url` VARCHAR(100) NULL,
	PRIMARY KEY (`place_id`)
);

CREATE TABLE `schedule` (
	`schedule_id` INT NOT NULL AUTO_INCREMENT,
	`date` TIMESTAMP NOT NULL,
	`match` INT NULL,
	`equipment` VARCHAR(40) NULL,
	`place_id` INT NOT NULL,
	`club_id` INT NOT NULL,
	PRIMARY KEY (`schedule_id`),
	FOREIGN KEY (`club_id`) REFERENCES `club`(`club_id`),
    FOREIGN KEY (`place_id`) REFERENCES `place`(`place_id`)
);



CREATE TABLE `member` (
	`member_id` INT NOT NULL AUTO_INCREMENT,
	`club_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`position` VARCHAR(20) NOT NULL,
	`billing_key` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`member_id`),
	FOREIGN KEY (`club_id`) REFERENCES `club`(`club_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `participant` (
	`participant_id` INT NOT NULL AUTO_INCREMENT,
	`schedule_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`participant_id`),
	FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`schedule_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);


CREATE TABLE `receipt` (
	`receipt_id` INT NOT NULL AUTO_INCREMENT,
	`item` VARCHAR(40) NOT NULL,
	`price` INT NOT NULL,
	`schedule_id` INT NOT NULL,
	PRIMARY KEY (`receipt_id`),
	FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`schedule_id`)
);

CREATE TABLE `payment` (
	`payment_id` INT NOT NULL AUTO_INCREMENT,
	`pay_date` DATE NOT NULL,
	`status` BOOLEAN NOT NULL,
	`comment` VARCHAR(200) NOT NULL,
	`club_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`payment_id`),
	FOREIGN KEY (`club_id`) REFERENCES `club`(`club_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `board` (
	`board_id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(40) NOT NULL,
	`content` TEXT NOT NULL COMMENT 'placehold',
	`category` VARCHAR(40) NOT NULL COMMENT '공지 - Notice / 일반 - General',
	`date` DATE NOT NULL,
	`user_id` INT NOT NULL,
	`club_id` INT NOT NULL,
	`view_cnt` INT NULL DEFAULT 0,
	`file` VARCHAR(100) NULL,
	PRIMARY KEY (`board_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
	FOREIGN KEY (`club_id`) REFERENCES `club`(`club_id`)
);

