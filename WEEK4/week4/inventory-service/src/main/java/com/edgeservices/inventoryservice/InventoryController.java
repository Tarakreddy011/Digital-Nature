package com.edgeservices.inventoryservice;

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
@RequestMapping("/inventory")
public class InventoryController {

	@Autowired
	private InventoryRepository inventoryRepository;

	@GetMapping
	public List<Inventory> getAllItems() {
		return inventoryRepository.findAll();
	}

	@GetMapping("/{id}")
	public Inventory getItemById(@PathVariable Long id) {
		return inventoryRepository.findById(id).orElse(null);
	}

	@PostMapping
	public Inventory createItem(@RequestBody Inventory inventory) {
		return inventoryRepository.save(inventory);
	}

	@PutMapping("/{id}")
	public Inventory updateItem(@PathVariable Long id, @RequestBody Inventory inventory) {
		inventory.setId(id);
		return inventoryRepository.save(inventory);
	}

	@DeleteMapping("/{id}")
	public void deleteItem(@PathVariable Long id) {
		inventoryRepository.deleteById(id);
	}

}
