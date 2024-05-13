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
@Schema(description = "Board DTO")
public class Board {
	private int boardId;
	private String title;
	private String content;
	private String category;
	private Date date;
	private int userId;
	private int clubId;
	private int viewCnt;
	private String file;
}
