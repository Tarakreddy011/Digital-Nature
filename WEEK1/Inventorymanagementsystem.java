package WEEK1;

import java.util.HashMap;
import java.util.Map;

class Product {
    String productId;
    String productName;
    int quantity;
    double price;

    public Product(String productId, String productName, int quantity, double price) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return productName + " (ID: " + productId + ", Qty: " + quantity + ", Price: $" + price + ")";
    }
}


class Inventory {
    
    private Map<String, Product> products;

    public Inventory() {
        products = new HashMap<>();
    }

 
    public void addProduct(Product product) {
        products.put(product.productId, product);
    }

  
    public void updateProduct(String productId, int newQuantity, double newPrice) {
        if (products.containsKey(productId)) {
            Product product = products.get(productId);
            product.quantity = newQuantity;
            product.price = newPrice;
        } else {
            System.out.println("Product not found.");
        }
    }

  
    public void deleteProduct(String productId) {
        if (products.containsKey(productId)) {
            products.remove(productId);
        } else {
            System.out.println("Product not found.");
        }
    }
    
    public static void main(String[] args) {
        Inventory inventory = new Inventory();

        // 1. Create and add products
        Product p1 = new Product("101", "Laptop", 5, 1200.00);
        Product p2 = new Product("102", "Wireless Mouse", 20, 25.50);
        
        inventory.addProduct(p1);
        inventory.addProduct(p2);
        System.out.println("Added Laptop and Mouse.");

        // 2. Update a product
        inventory.updateProduct("101", 3, 1150.00);
        System.out.println("Updated Laptop quantity and price.");

        // 3. Delete a product
        inventory.deleteProduct("102");
        System.out.println("Deleted Wireless Mouse.");
        
        // 4. Try to update a deleted product to test the "not found" logic
        inventory.updateProduct("102", 10, 20.00); 
    }

}