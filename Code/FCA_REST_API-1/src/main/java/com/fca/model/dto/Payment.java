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
@Schema(description = "Payment DTO")
public class Payment {
	private int paymentId;
	private Date payDate;
	private boolean status;
	private String comment;
	private int clubId;
	private int userId;
}
