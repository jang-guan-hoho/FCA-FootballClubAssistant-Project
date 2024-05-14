package com.fca.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Club DTO")
public class Club {
	private int clubId;
	private String name;
	private int maxMember;
	private String content;
	private int fee;
	private String clubImg;
	private String logo;
	private int account;
	private String bank;
	private String region;
	private int money;
}
