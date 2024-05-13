CREATE SCHEMA IF NOT EXISTS FCA;
USE FCA;


CREATE TABLE `club` (
	`id` INT NOT NULL AUTO_INCREMENT,
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
	PRIMARY KEY (`id`)
);
CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(40) NOT NULL,
	`password` VARCHAR(20) NOT NULL,
	`name` VARCHAR(20) NOT NULL,
	`gender` ENUM('M', 'F') NOT NULL COMMENT '남 - M / 여 - F',
	`birth` DATE NOT NULL,
	`intro` TEXT NOT NULL COMMENT 'placehold',
	`profile` VARCHAR(40) NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE `place` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(40) NOT NULL,
	`address` VARCHAR(100) NOT NULL,
	`url` VARCHAR(100) NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `schedule` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`date` TIMESTAMP NOT NULL,
	`match` INT NULL,
	`equipment` VARCHAR(40) NULL,
	`p_id` INT NOT NULL,
	`c_id` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`c_id`) REFERENCES `club`(`id`),
    FOREIGN KEY (`p_id`) REFERENCES `place`(`id`)
);



CREATE TABLE `club_member` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`c_id` INT NOT NULL,
	`u_id` INT NOT NULL,
	`position` VARCHAR(20) NOT NULL,
	`billing_key` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`c_id`) REFERENCES `club`(`id`),
	FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `participant` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`s_id` INT NOT NULL,
	`u_id` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`s_id`) REFERENCES `schedule`(`id`),
	FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
);


CREATE TABLE `receipt` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`item` VARCHAR(40) NOT NULL,
	`price` INT NOT NULL,
	`s_id` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`s_id`) REFERENCES `schedule`(`id`)
);

CREATE TABLE `payment` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`pay_date` DATE NOT NULL,
	`status` BOOLEAN NOT NULL,
	`comment` VARCHAR(200) NOT NULL,
	`c_id` INT NOT NULL,
	`u_id` INT NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`c_id`) REFERENCES `club`(`id`),
	FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `board` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(40) NOT NULL,
	`content` TEXT NOT NULL COMMENT 'placehold',
	`category` ENUM('Notice', 'General') NOT NULL COMMENT '공지 - Notice / 일반 - General',
	`date` DATE NOT NULL,
	`u_id` INT NOT NULL,
	`c_id` INT NOT NULL,
	`viewCnt` INT NULL DEFAULT 0,
	`img` VARCHAR(40) NULL,
	`video` VARCHAR(40) NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
	FOREIGN KEY (`c_id`) REFERENCES `club`(`id`)
);

