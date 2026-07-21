package com.edgeservices.paymentservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

	private Long orderId;
	private String status;
	private String message;
	private Long transactionId;

}
