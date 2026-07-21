package com.edgeservices.accountservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

	@GetMapping("/account")
	public String getAccount() {
		return "Account Service: Retrieved Account Details";
	}

}
