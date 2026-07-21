package com.edgeservices.greetservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetController {

	@GetMapping("/greet")
	public String greet() {
		return "Greet Service: Hello from Greet Service!";
	}

}
