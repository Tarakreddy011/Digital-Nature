package com.edgeservices.paymentservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
public class PaymentController {

	@Autowired
	private ThirdPartyPaymentService paymentService;

	@PostMapping
	public PaymentResponse processPayment(@RequestBody PaymentRequest request) {
		return paymentService.processPayment(request);
	}

}
