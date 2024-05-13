CREATE TABLE `club` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`name`	varchar(40)	NOT NULL,
	`max_member`	int	NOT NULL	COMMENT 'maximum 100',
	`content`	text	NOT NULL	COMMENT 'placehold',
	`fee`	int	NOT NULL	COMMENT '1000~',
	`deadline`	int	NOT NULL	COMMENT '1~28',
	`club_img`	varchar(40)	NULL	DEFAULT default_img,
	`logo`	varchar(40)	NULL	DEFAULT default_logo,
	`account`	int	NOT NULL,
	`bank`	varchar(20)	NOT NULL,
	`region`	varchar(40)	NOT NULL
);

CREATE TABLE `schedule` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`date`	timestamp	NOT NULL,
	`match`	int	NULL,
	`equipment`	varchar(40)	NULL,
	`p_id`	int	NOT NULL	COMMENT 'incresement',
	`c_id`	int	NOT NULL	COMMENT 'incresement'
);

CREATE TABLE `user` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`email`	varchar(40)	NOT NULL,
	`password`	varchar(20)	NOT NULL,
	`name`	varchar(20)	NOT NULL,
	`gender`	boolean	NOT NULL	COMMENT '남 - T / 여 - F',
	`birth`	date	NOT NULL,
	`intro`	text	NOT NULL	COMMENT 'placehold',
	`profile`	varchar(40)	NULL
);

CREATE TABLE `club_member` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`c_id`	int	NOT NULL	COMMENT 'incresement',
	`u_id`	int	NOT NULL	COMMENT 'incresement',
	`position`	varchar(20)	NOT NULL,
	`Field`	VARCHAR(255)	NOT NULL
);

CREATE TABLE `participant` (
	`id`	int	NOT NULL	COMMENT 'inscresement',
	`s_id`	int	NOT NULL	COMMENT 'incresement',
	`u_id`	int	NOT NULL	COMMENT 'incresement'
);

CREATE TABLE `place` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`name`	varchar(40)	NOT NULL,
	`address`	varchar(100)	NOT NULL,
	`url`	varchar(100)	NULL
);

CREATE TABLE `receipt` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`item`	varchar(40)	NOT NULL,
	`price`	int	NOT NULL,
	`s_id`	int	NOT NULL	COMMENT 'incresement'
);

CREATE TABLE `payment` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`pay_date`	date	NOT NULL,
	`status`	boolean	NOT NULL,
	`comment`	varchar(200)	NOT NULL,
	`c_id`	int	NOT NULL	COMMENT 'incresement',
	`u_id`	int	NOT NULL	COMMENT 'incresement'
);

CREATE TABLE `board` (
	`id`	int	NOT NULL	COMMENT 'incresement',
	`title`	varchar(40)	NOT NULL	COMMENT 'incresement',
	`content`	text	NOT NULL	COMMENT 'placehold',
	`category`	boolean	NOT NULL	COMMENT '공지 - T / 일반 - F',
	`date`	date	NOT NULL,
	`u_id`	int	NOT NULL	COMMENT 'incresement',
	`c_id`	int	NOT NULL	COMMENT 'incresement',
	`viewCnt`	int	NULL	DEFAULT 0,
	`img`	varchar(40)	NULL,
	`video`	varchar(40)	NULL
);

ALTER TABLE `club` ADD CONSTRAINT `PK_CLUB` PRIMARY KEY (
	`id`
);

ALTER TABLE `schedule` ADD CONSTRAINT `PK_SCHEDULE` PRIMARY KEY (
	`id`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `club_member` ADD CONSTRAINT `PK_CLUB_MEMBER` PRIMARY KEY (
	`id`
);

ALTER TABLE `participant` ADD CONSTRAINT `PK_PARTICIPANT` PRIMARY KEY (
	`id`
);

ALTER TABLE `place` ADD CONSTRAINT `PK_PLACE` PRIMARY KEY (
	`id`
);

ALTER TABLE `receipt` ADD CONSTRAINT `PK_RECEIPT` PRIMARY KEY (
	`id`
);

ALTER TABLE `payment` ADD CONSTRAINT `PK_PAYMENT` PRIMARY KEY (
	`id`
);

ALTER TABLE `board` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`id`
);

