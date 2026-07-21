package com.edgeservices.paymentservice;

import java.util.Random;

import org.springframework.stereotype.Service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ThirdPartyPaymentService {

	@CircuitBreaker(name = "paymentService", fallbackMethod = "processPaymentFallback")
	public PaymentResponse processPayment(PaymentRequest request) {
		log.info("Processing payment for order: {}", request.getOrderId());
		
		// Simulate slow third-party API call
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
		}
		
		// Simulate occasional failures
		if (Math.random() > 0.7) {
			throw new RuntimeException("Third-party payment API is temporarily unavailable");
		}
		
		PaymentResponse response = new PaymentResponse();
		response.setOrderId(request.getOrderId());
		response.setStatus("SUCCESS");
		response.setMessage("Payment processed successfully");
		response.setTransactionId(System.currentTimeMillis());
		
		return response;
	}

	public PaymentResponse processPaymentFallback(PaymentRequest request, Exception ex) {
		log.warn("Fallback: Payment processing failed for order: {}, error: {}", request.getOrderId(), ex.getMessage());
		
		PaymentResponse fallbackResponse = new PaymentResponse();
		fallbackResponse.setOrderId(request.getOrderId());
		fallbackResponse.setStatus("PENDING");
		fallbackResponse.setMessage("Payment is pending due to service unavailability. Will be retried.");
		fallbackResponse.setTransactionId(new Random().nextLong());
		
		return fallbackResponse;
	}

}
