package com.edgeservices.orderservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserServiceClient userServiceClient;

	@GetMapping
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@GetMapping("/{id}")
	public Order getOrderById(@PathVariable Long id) {
		return orderRepository.findById(id).orElse(null);
	}

	@PostMapping
	public Order createOrder(@RequestBody Order order) {
		UserResponse user = userServiceClient.getUser(order.getUserId());
		if (user != null) {
			order.setStatus("CREATED");
			return orderRepository.save(order);
		}
		return null;
	}

	@PutMapping("/{id}")
	public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
		order.setId(id);
		return orderRepository.save(order);
	}

	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable Long id) {
		orderRepository.deleteById(id);
	}

}
