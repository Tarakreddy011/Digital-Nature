# Cart Manager - E-Commerce Shopping Cart Management System

## Project Overview
This is a complete Maven project for Java that demonstrates unit testing with JUnit 4. It includes a comprehensive e-commerce shopping cart management system with full test coverage.

## Project Structure
```
Junit/
├── pom.xml                                      # Maven configuration
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/ecommerce/
│   │           └── CartManager.java             # Main business logic
│   ├── test/
│   │   └── java/
│   │       └── CartManagerTest.java             # Comprehensive JUnit 4 tests
│   └── module-info.java                         # Java module definition
├── target/                                      # Build output directory
└── bin/                                         # Compiled binaries
```

## Technologies Used
- **Java**: 11+ (configured in pom.xml)
- **Maven**: Build and dependency management
- **JUnit**: Version 4.13.2 for unit testing

## Dependencies
All dependencies are declared in `pom.xml`:
- JUnit 4.13.2 (test scope)

## CartManager Class Features

### Core Business Logic
The `CartManager` class provides the following functionality:

1. **Add Items**: Add products to the cart with validation
   - `addItem(itemId, name, price, quantity)`
   
2. **Remove Items**: Remove products from the cart
   - `removeItem(itemId)`
   
3. **Update Quantity**: Modify item quantities
   - `updateItemQuantity(itemId, quantity)`
   
4. **Cart Information**:
   - `getItemCount()` - Get number of unique items
   - `getTotalQuantity()` - Get total quantity of all items
   - `getTotalCost()` - Get total cart value
   - `isEmpty()` - Check if cart is empty
   - `containsItem(itemId)` - Check if specific item exists
   
5. **Cart Management**:
   - `clearCart()` - Empty the cart
   - `getItem(itemId)` - Retrieve specific item details
   - `getAllItems()` - Get copy of all items

### Built-in Validations
- Item ID cannot be null or empty
- Price cannot be negative
- Quantity must be greater than zero
- Appropriate exceptions are thrown for invalid inputs

## CartManagerTest Class Features

### Test Setup and Teardown
- **@Before**: Initializes a fresh `CartManager` instance before each test
- **@After**: Cleans up resources and resets the cart after each test

### Test Coverage - 20 Comprehensive Tests

#### Tests using `assertEquals` (Tests 1-3)
1. Test adding items and counting them
2. Test total quantity calculation
3. Test total cost calculation

#### Tests using `assertTrue` (Tests 4-7)
4. Verify empty cart on initialization
5. Verify item exists in cart
6. Verify successful item removal
7. Verify successful quantity update

#### Tests using `assertFalse` (Tests 8-11)
8. Verify cart is not empty after adding items
9. Verify non-existent item is not contained
10. Verify removal of non-existent item returns false
11. Verify update with invalid quantity fails

#### Tests using `assertNull` (Tests 12-13)
12. Verify null returned for non-existent item
13. Verify null returned after item removal

#### Tests using `assertNotNull` (Tests 14-15)
14. Verify existing item is not null
15. Verify CartItem properties are not null

#### Additional Tests (Tests 16-20)
16. Test clear cart functionality
17. Test adding same item increases quantity
18. Test exception handling for null item ID
19. Test exception handling for negative price
20. Test exception handling for zero quantity

### Pattern Usage
All test methods strictly follow the **Arrange-Act-Assert (AAA) Pattern**:
- **Arrange**: Set up test data
- **Act**: Execute the method being tested
- **Assert**: Verify the results with appropriate assertions

## Building the Project

### Using Maven
```bash
# Compile the project
mvn clean compile

# Run tests
mvn test

# Build JAR
mvn package
```

### Using Eclipse
1. Import the project as an existing Maven project
2. Right-click project → Maven → Update Project
3. Run tests: Right-click → Run As → JUnit Test

## CartItem Inner Class
The `CartManager` contains an inner static class `CartItem` representing individual cart items with:
- Item ID (unique identifier)
- Item name
- Price
- Quantity
- Total cost calculation

## Key Features of the Test Suite
✅ Uses JUnit 4 annotations (@Before, @After, @Test)  
✅ Strict Arrange-Act-Assert pattern in all tests  
✅ Comprehensive assertion coverage:
   - assertEquals (value comparisons)
   - assertTrue (boolean true verification)
   - assertFalse (boolean false verification)
   - assertNull (null value verification)
   - assertNotNull (non-null value verification)  
✅ Exception testing with @Test(expected = ...)  
✅ Well-documented test methods with clear descriptions  
✅ Proper setup and teardown with @Before and @After  

## Running the Tests

### From Command Line
```bash
cd C:\Users\hp\Desktop\WEEKS\WEEK1\Junit
mvn test
```

### From Eclipse
1. Right-click on `CartManagerTest.java`
2. Select "Run As" → "JUnit Test"
3. Or use Ctrl+Alt+X, T shortcut

## Maven Build Output
- **Compiled classes**: `target/classes/`
- **Test classes**: `target/test-classes/`
- **Test reports**: `target/surefire-reports/`

## Notes
- The project uses Java 11 as the target version
- All source files use UTF-8 encoding
- Maven Surefire plugin is configured for test execution
- Maven Compiler plugin is configured for Java 11 compilation

## Author Notes
This project demonstrates best practices for:
- Maven project structure
- JUnit 4 testing framework
- Arrange-Act-Assert testing pattern
- Comprehensive assertion usage
- Professional Java code organization
