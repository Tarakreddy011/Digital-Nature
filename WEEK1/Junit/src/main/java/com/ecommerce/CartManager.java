package com.ecommerce;

import java.util.HashMap;
import java.util.Map;

/**
 * CartManager - Manages an e-commerce shopping cart.
 * Provides functionality to add items, remove items, clear the cart,
 * and retrieve cart information.
 */
public class CartManager {
    
    /**
     * Inner class representing a cart item.
     */
    public static class CartItem {
        private String itemId;
        private String name;
        private double price;
        private int quantity;

        public CartItem(String itemId, String name, double price, int quantity) {
            this.itemId = itemId;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }

        public String getItemId() {
            return itemId;
        }

        public String getName() {
            return name;
        }

        public double getPrice() {
            return price;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getTotal() {
            return price * quantity;
        }
    }

    private Map<String, CartItem> items;

    /**
     * Constructor - Initializes an empty shopping cart.
     */
    public CartManager() {
        this.items = new HashMap<>();
    }

    /**
     * Adds an item to the cart.
     * If the item already exists, increases the quantity.
     *
     * @param itemId   Unique identifier for the item
     * @param name     Name of the item
     * @param price    Price of the item
     * @param quantity Quantity to add
     */
    public void addItem(String itemId, String name, double price, int quantity) {
        if (itemId == null || itemId.isEmpty()) {
            throw new IllegalArgumentException("Item ID cannot be null or empty");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        if (items.containsKey(itemId)) {
            CartItem existingItem = items.get(itemId);
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            items.put(itemId, new CartItem(itemId, name, price, quantity));
        }
    }

    /**
     * Removes an item from the cart.
     *
     * @param itemId The ID of the item to remove
     * @return true if the item was removed, false if item not found
     */
    public boolean removeItem(String itemId) {
        if (itemId == null) {
            return false;
        }
        return items.remove(itemId) != null;
    }

    /**
     * Updates the quantity of an existing item in the cart.
     *
     * @param itemId   The ID of the item to update
     * @param quantity The new quantity
     * @return true if the update was successful, false if item not found
     */
    public boolean updateItemQuantity(String itemId, int quantity) {
        if (itemId == null || !items.containsKey(itemId)) {
            return false;
        }
        if (quantity <= 0) {
            return false;
        }
        items.get(itemId).setQuantity(quantity);
        return true;
    }

    /**
     * Gets the number of unique items in the cart.
     *
     * @return Number of unique items
     */
    public int getItemCount() {
        return items.size();
    }

    /**
     * Gets the total quantity of all items in the cart.
     *
     * @return Total quantity
     */
    public int getTotalQuantity() {
        return items.values().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }

    /**
     * Gets the total cost of the cart.
     *
     * @return Total cost
     */
    public double getTotalCost() {
        return items.values().stream()
                .mapToDouble(CartItem::getTotal)
                .sum();
    }

    /**
     * Checks if a specific item is in the cart.
     *
     * @param itemId The ID of the item to check
     * @return true if the item is in the cart, false otherwise
     */
    public boolean containsItem(String itemId) {
        return itemId != null && items.containsKey(itemId);
    }

    /**
     * Gets a specific cart item.
     *
     * @param itemId The ID of the item to retrieve
     * @return The CartItem if found, null otherwise
     */
    public CartItem getItem(String itemId) {
        return items.get(itemId);
    }

    /**
     * Clears all items from the cart.
     */
    public void clearCart() {
        items.clear();
    }

    /**
     * Checks if the cart is empty.
     *
     * @return true if the cart is empty, false otherwise
     */
    public boolean isEmpty() {
        return items.isEmpty();
    }

    /**
     * Gets a copy of all items in the cart.
     *
     * @return A map of all items
     */
    public Map<String, CartItem> getAllItems() {
        return new HashMap<>(items);
    }
}
