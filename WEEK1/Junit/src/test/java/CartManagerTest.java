import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;
import com.ecommerce.CartManager;

/**
 * CartManagerTest - JUnit 4 test class for CartManager.
 * Tests all business logic with the @Before and @After annotations
 * and follows the Arrange-Act-Assert (AAA) pattern strictly.
 */
public class CartManagerTest {

    private CartManager cartManager;

    /**
     * @Before - Setup method executed before each test.
     * Initializes a fresh CartManager instance for each test.
     */
    @Before
    public void setUp() {
        cartManager = new CartManager();
    }

    /**
     * @After - Teardown method executed after each test.
     * Cleans up resources and resets the cart.
     */
    @After
    public void tearDown() {
        cartManager.clearCart();
        cartManager = null;
    }

    // ===== Test using assertEquals =====

    /**
     * Test 1: addItem() and getItemCount() using assertEquals
     * Verifies that adding items correctly increments the item count.
     */
    @Test
    public void testAddItemAndGetItemCount() {
        // Arrange - Set up test data
        String itemId = "ITEM001";
        String itemName = "Laptop";
        double price = 999.99;
        int quantity = 1;

        // Act - Add item to cart
        cartManager.addItem(itemId, itemName, price, quantity);

        // Assert - Verify the count equals 1
        assertEquals("Item count should be 1 after adding one item", 1, cartManager.getItemCount());
    }

    /**
     * Test 2: getTotalQuantity() using assertEquals
     * Verifies that total quantity is calculated correctly.
     */
    @Test
    public void testGetTotalQuantity() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 2);
        cartManager.addItem("ITEM002", "Mouse", 29.99, 3);

        // Act
        int totalQuantity = cartManager.getTotalQuantity();

        // Assert
        assertEquals("Total quantity should be 5", 5, totalQuantity);
    }

    /**
     * Test 3: getTotalCost() using assertEquals
     * Verifies that total cost is calculated correctly.
     */
    @Test
    public void testGetTotalCost() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 100.00, 2);
        cartManager.addItem("ITEM002", "Mouse", 50.00, 1);

        // Act
        double totalCost = cartManager.getTotalCost();

        // Assert
        assertEquals("Total cost should be 250.00", 250.00, totalCost, 0.01);
    }

    // ===== Test using assertTrue =====

    /**
     * Test 4: isEmpty() returns true when cart is empty using assertTrue
     */
    @Test
    public void testIsEmptyCartReturnsTrue() {
        // Arrange - No items added

        // Act
        boolean isEmpty = cartManager.isEmpty();

        // Assert
        assertTrue("Cart should be empty on initialization", isEmpty);
    }

    /**
     * Test 5: containsItem() returns true when item exists using assertTrue
     */
    @Test
    public void testContainsItemReturnsTrue() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean contains = cartManager.containsItem("ITEM001");

        // Assert
        assertTrue("Cart should contain ITEM001", contains);
    }

    /**
     * Test 6: removeItem() returns true when item successfully removed using assertTrue
     */
    @Test
    public void testRemoveItemReturnsTrue() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean removed = cartManager.removeItem("ITEM001");

        // Assert
        assertTrue("Remove item should return true for existing item", removed);
    }

    /**
     * Test 7: updateItemQuantity() returns true on successful update using assertTrue
     */
    @Test
    public void testUpdateItemQuantityReturnsTrue() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean updated = cartManager.updateItemQuantity("ITEM001", 5);

        // Assert
        assertTrue("Update quantity should return true for existing item", updated);
    }

    // ===== Test using assertFalse =====

    /**
     * Test 8: isEmpty() returns false when cart has items using assertFalse
     */
    @Test
    public void testIsEmptyReturnsFalse() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean isEmpty = cartManager.isEmpty();

        // Assert
        assertFalse("Cart should not be empty after adding an item", isEmpty);
    }

    /**
     * Test 9: containsItem() returns false for non-existent item using assertFalse
     */
    @Test
    public void testContainsItemReturnsFalse() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean contains = cartManager.containsItem("ITEM999");

        // Assert
        assertFalse("Cart should not contain ITEM999", contains);
    }

    /**
     * Test 10: removeItem() returns false for non-existent item using assertFalse
     */
    @Test
    public void testRemoveNonExistentItemReturnsFalse() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean removed = cartManager.removeItem("ITEM999");

        // Assert
        assertFalse("Remove non-existent item should return false", removed);
    }

    /**
     * Test 11: updateItemQuantity() returns false for invalid quantity using assertFalse
     */
    @Test
    public void testUpdateItemWithInvalidQuantityReturnsFalse() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        boolean updated = cartManager.updateItemQuantity("ITEM001", -5);

        // Assert
        assertFalse("Update with negative quantity should return false", updated);
    }

    // ===== Test using assertNull =====

    /**
     * Test 12: getItem() returns null for non-existent item using assertNull
     */
    @Test
    public void testGetNonExistentItemReturnsNull() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        CartManager.CartItem item = cartManager.getItem("ITEM999");

        // Assert
        assertNull("Get non-existent item should return null", item);
    }

    /**
     * Test 13: getItem() returns null after removing an item using assertNull
     */
    @Test
    public void testGetItemReturnsNullAfterRemoval() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);
        cartManager.removeItem("ITEM001");

        // Act
        CartManager.CartItem item = cartManager.getItem("ITEM001");

        // Assert
        assertNull("Get item should return null after removal", item);
    }

    // ===== Test using assertNotNull =====

    /**
     * Test 14: getItem() returns non-null CartItem for existing item using assertNotNull
     */
    @Test
    public void testGetExistingItemReturnsNotNull() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        CartManager.CartItem item = cartManager.getItem("ITEM001");

        // Assert
        assertNotNull("Get existing item should not return null", item);
    }

    /**
     * Test 15: Verify CartItem properties using assertNotNull
     */
    @Test
    public void testCartItemPropertiesAreNotNull() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);

        // Act
        CartManager.CartItem item = cartManager.getItem("ITEM001");

        // Assert
        assertNotNull("Item should not be null", item);
        assertNotNull("Item ID should not be null", item.getItemId());
        assertNotNull("Item name should not be null", item.getName());
        assertEquals("Item ID should match", "ITEM001", item.getItemId());
        assertEquals("Item name should match", "Laptop", item.getName());
    }

    // ===== Additional comprehensive tests =====

    /**
     * Test 16: Clear cart functionality
     * Tests that clearCart() properly empties the cart.
     */
    @Test
    public void testClearCart() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 1);
        cartManager.addItem("ITEM002", "Mouse", 29.99, 2);
        assertEquals("Cart should have 2 items before clear", 2, cartManager.getItemCount());

        // Act
        cartManager.clearCart();

        // Assert
        assertEquals("Cart should have 0 items after clear", 0, cartManager.getItemCount());
        assertTrue("Cart should be empty after clear", cartManager.isEmpty());
    }

    /**
     * Test 17: Adding same item increases quantity
     * Tests that adding an existing item increases its quantity.
     */
    @Test
    public void testAddingSameItemIncreasesQuantity() {
        // Arrange
        cartManager.addItem("ITEM001", "Laptop", 999.99, 2);

        // Act
        cartManager.addItem("ITEM001", "Laptop", 999.99, 3);

        // Assert
        assertEquals("Item count should still be 1", 1, cartManager.getItemCount());
        assertEquals("Total quantity should be 5", 5, cartManager.getTotalQuantity());
    }

    /**
     * Test 18: Exception handling for invalid item ID
     * Tests that adding item with null ID throws exception.
     */
    @Test(expected = IllegalArgumentException.class)
    public void testAddItemWithNullIdThrowsException() {
        // Arrange - No setup needed

        // Act
        cartManager.addItem(null, "Laptop", 999.99, 1);

        // Assert - Exception should be thrown
    }

    /**
     * Test 19: Exception handling for negative price
     * Tests that adding item with negative price throws exception.
     */
    @Test(expected = IllegalArgumentException.class)
    public void testAddItemWithNegativePriceThrowsException() {
        // Arrange - No setup needed

        // Act
        cartManager.addItem("ITEM001", "Laptop", -100.00, 1);

        // Assert - Exception should be thrown
    }

    /**
     * Test 20: Exception handling for zero quantity
     * Tests that adding item with zero quantity throws exception.
     */
    @Test(expected = IllegalArgumentException.class)
    public void testAddItemWithZeroQuantityThrowsException() {
        // Arrange - No setup needed

        // Act
        cartManager.addItem("ITEM001", "Laptop", 999.99, 0);

        // Assert - Exception should be thrown
    }
}
