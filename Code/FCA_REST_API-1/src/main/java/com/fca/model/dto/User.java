package com.fca.model.dto;

import java.util.Date;

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
@Schema(description = "User DTO")
public class User {
	private int userId;
	private String email;
	private String password;
	private String name;
	private boolean gender;
	private Date birth;
	private String intro;
	private String profile;
}
