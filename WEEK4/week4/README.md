# Spring Boot 3.0 Advanced Microservices Architecture

## Project Overview

This project demonstrates a complete microservices architecture with Spring Boot 3.0 and Spring Cloud, including:

- **Basic Microservices**: Account, Loan, and Greet services
- **User and Order Management System**: REST APIs with database persistence and inter-service communication
- **Service Discovery**: Eureka server for dynamic service registration
- **API Gateway**: Advanced routing with rate limiting, caching, and path rewriting
- **Config Management**: Spring Cloud Config Server for centralized configuration
- **Resilience Patterns**: Circuit breaker pattern using Resilience4j for fault tolerance

---

## Architecture Components

### 1. Eureka Discovery Server (Port 8761)
- **Location**: `eureka-server/`
- **Features**: 
  - Service registration and discovery
  - Self-registration disabled for server
  - UI dashboard at `http://localhost:8761`

### 2. Basic Microservices

#### Account Service (Port 8080)
- **Location**: `account-service/`
- **Endpoint**: `GET /account` - Returns account details
- **Features**: Eureka client, Spring Web

#### Loan Service (Port 8081)
- **Location**: `loan-service/`
- **Endpoint**: `GET /loan` - Returns loan details
- **Features**: Eureka client, Spring Web

#### Greet Service (Port 8082)
- **Location**: `greet-service/`
- **Endpoint**: `GET /greet` - Returns greeting message
- **Features**: Eureka client, Spring Web

### 3. User Management Service (Port 8083)
- **Location**: `user-service/`
- **Endpoints**:
  - `GET /users` - Get all users
  - `GET /users/{id}` - Get user by ID
  - `POST /users` - Create new user
  - `PUT /users/{id}` - Update user
  - `DELETE /users/{id}` - Delete user
- **Database**: H2 in-memory database
- **Features**: JPA/Hibernate, Spring Data REST, Eureka client

**Sample Payload**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

### 4. Order Management Service (Port 8084)
- **Location**: `order-service/`
- **Endpoints**:
  - `GET /orders` - Get all orders
  - `GET /orders/{id}` - Get order by ID
  - `POST /orders` - Create new order (validates user via OpenFeign)
  - `PUT /orders/{id}` - Update order
  - `DELETE /orders/{id}` - Delete order
- **Database**: H2 in-memory database
- **Features**: JPA/Hibernate, OpenFeign (calls User Service), Eureka client

**Sample Payload**:
```json
{
  "userId": 1,
  "productName": "Laptop",
  "amount": 999.99,
  "status": "PENDING"
}
```

### 5. Inventory Management Service (Port 8085)
- **Location**: `inventory-service/`
- **Endpoints**:
  - `GET /inventory` - Get all inventory items
  - `GET /inventory/{id}` - Get item by ID
  - `POST /inventory` - Create inventory item
  - `PUT /inventory/{id}` - Update inventory item
  - `DELETE /inventory/{id}` - Delete inventory item
- **Database**: H2 in-memory database
- **Features**: Spring Cloud Config Client, Eureka client, JPA

**Sample Payload**:
```json
{
  "productName": "Widget",
  "quantity": 100,
  "price": 29.99,
  "warehouseLocation": "Warehouse A, Shelf 3"
}
```

### 6. Payment Service with Resilience4j (Port 8086)
- **Location**: `payment-service/`
- **Endpoints**:
  - `POST /payments` - Process payment (with circuit breaker)
- **Features**: 
  - Resilience4j Circuit Breaker pattern
  - Fallback mechanism for failed payments
  - Simulates slow third-party API calls
  - Health metrics and actuator endpoints

**Circuit Breaker Configuration**:
- Sliding window size: 10 calls
- Minimum calls for evaluation: 5
- Failure rate threshold: 50%
- Slow call rate threshold: 50%
- Wait duration in open state: 5 seconds

**Sample Payload**:
```json
{
  "orderId": 1,
  "amount": 500.00,
  "currency": "USD"
}
```

**Response**:
```json
{
  "orderId": 1,
  "status": "SUCCESS",
  "message": "Payment processed successfully",
  "transactionId": 1234567890
}
```

When service is down (fallback):
```json
{
  "orderId": 1,
  "status": "PENDING",
  "message": "Payment is pending due to service unavailability. Will be retried.",
  "transactionId": 9876543210
}
```

### 7. Spring Cloud Config Server (Port 8888)
- **Location**: `config-server/`
- **Features**:
  - Centralized configuration management
  - Git-based configuration repository
  - Config endpoints at `http://localhost:8888/{app-name}/{profile}`

### 8. API Gateway (Port 9090)
- **Location**: `api-gateway/`
- **Features**:
  - Spring Cloud Gateway routing
  - Dynamic service discovery via Eureka
  - **Global Filters**:
    1. **Request Logging Filter** - Logs all incoming request URIs and response times
    2. **Rate Limiting Filter** - Limits requests per client IP (100 per minute)
    3. **Path Rewriting Filter** - Rewrites paths for cleaner API design
  
- **Gateway Routes**:
  - `/account/**` → Account Service (Port 8080)
  - `/loan/**` → Loan Service (Port 8081)
  - `/greet/**` → Greet Service (Port 8082)
  - `/api/users/**` → User Service (Port 8083) with path rewrite to `/users`
  - `/api/orders/**` → Order Service (Port 8084) with path rewrite to `/orders`
  - `/api/inventory/**` → Inventory Service (Port 8085) with path rewrite to `/inventory`
  - `/api/payments/**` → Payment Service (Port 8086) with path rewrite to `/payments`

---

## Getting Started

### Prerequisites
- Java 21+
- Maven 3.6+
- Spring Boot 3.1.0

### Build All Services

```bash
cd week4

# Build Eureka Server
cd eureka-server && mvn clean install -DskipTests && cd ..

# Build Basic Services
cd account-service && mvn clean install -DskipTests && cd ..
cd loan-service && mvn clean install -DskipTests && cd ..
cd greet-service && mvn clean install -DskipTests && cd ..

# Build Advanced Services
cd user-service && mvn clean install -DskipTests && cd ..
cd order-service && mvn clean install -DskipTests && cd ..
cd inventory-service && mvn clean install -DskipTests && cd ..
cd config-server && mvn clean install -DskipTests && cd ..
cd payment-service && mvn clean install -DskipTests && cd ..

# Build API Gateway
cd api-gateway && mvn clean install -DskipTests && cd ..
```

### Run Services (in order)

1. **Start Eureka Server**
   ```bash
   cd eureka-server
   mvn spring-boot:run
   ```
   Access at: `http://localhost:8761`

2. **Start Config Server**
   ```bash
   cd config-server
   mvn spring-boot:run
   ```

3. **Start Microservices** (in separate terminals)
   ```bash
   # Account Service
   cd account-service && mvn spring-boot:run
   
   # Loan Service
   cd loan-service && mvn spring-boot:run
   
   # Greet Service
   cd greet-service && mvn spring-boot:run
   
   # User Service
   cd user-service && mvn spring-boot:run
   
   # Order Service (depends on User Service)
   cd order-service && mvn spring-boot:run
   
   # Inventory Service (depends on Config Server)
   cd inventory-service && mvn spring-boot:run
   
   # Payment Service
   cd payment-service && mvn spring-boot:run
   ```

4. **Start API Gateway** (last)
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

---

## API Testing Examples

### Test Basic Services via API Gateway

```bash
# Account Service
curl http://localhost:9090/account

# Loan Service
curl http://localhost:9090/loan

# Greet Service
curl http://localhost:9090/greet
```

### Test User Service via API Gateway

```bash
# Get all users
curl http://localhost:9090/api/users

# Create user
curl -X POST http://localhost:9090/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"+1234567890"}'

# Get user by ID
curl http://localhost:9090/api/users/1

# Update user
curl -X PUT http://localhost:9090/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"+0987654321"}'

# Delete user
curl -X DELETE http://localhost:9090/api/users/1
```

### Test Order Service via API Gateway

```bash
# Create order (calls User Service via OpenFeign)
curl -X POST http://localhost:9090/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"productName":"Laptop","amount":999.99}'

# Get all orders
curl http://localhost:9090/api/orders

# Get order by ID
curl http://localhost:9090/api/orders/1
```

### Test Inventory Service via API Gateway

```bash
# Create inventory item
curl -X POST http://localhost:9090/api/inventory \
  -H "Content-Type: application/json" \
  -d '{"productName":"Widget","quantity":100,"price":29.99,"warehouseLocation":"Warehouse A"}'

# Get all inventory
curl http://localhost:9090/api/inventory
```

### Test Payment Service with Circuit Breaker

```bash
# Process payment
curl -X POST http://localhost:9090/api/payments \
  -H "Content-Type: application/json" \
  -d '{"orderId":1,"amount":500.00,"currency":"USD"}'

# Check payment service health (circuit breaker status)
curl http://localhost:8086/actuator/health
```

---

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| Spring Boot 3.1.0 | Application framework |
| Spring Cloud 2022.0.4 | Microservices patterns |
| Spring Cloud Gateway | API Gateway |
| Spring Cloud Eureka | Service discovery |
| Spring Cloud Config | Configuration management |
| Spring Cloud OpenFeign | Declarative REST client |
| Resilience4j | Fault tolerance (circuit breaker) |
| Spring Data JPA | ORM and database access |
| H2 Database | In-memory database |
| Lombok | Reduce boilerplate code |
| Maven | Build tool |
| Java 21 | Programming language |

---

## Circuit Breaker States

The Payment Service circuit breaker can be in three states:

1. **CLOSED** (Normal): Requests pass through normally
2. **OPEN** (Failing): Too many failures detected, requests are blocked
3. **HALF_OPEN** (Recovering): Limited requests allowed to test if service recovered

**Transition Logic**:
- CLOSED → OPEN: When failure rate exceeds 50% over 10 calls
- OPEN → HALF_OPEN: After 5 seconds (automatic transition enabled)
- HALF_OPEN → CLOSED: If 3 consecutive calls succeed
- HALF_OPEN → OPEN: If any call fails

---

## Rate Limiting

The API Gateway implements rate limiting per client IP address:
- **Limit**: 100 requests per minute per IP
- **Response**: `429 Too Many Requests` when exceeded
- **Reset**: Automatic reset every minute

---

## Path Rewriting Examples

The API Gateway rewrites paths for a cleaner external API design:

| External Path | Internal Service | Rewritten Path |
|-------------|------------------|----------------|
| `/api/users/1` | User Service | `/users/1` |
| `/api/orders` | Order Service | `/orders` |
| `/api/inventory/5` | Inventory Service | `/inventory/5` |
| `/api/payments` | Payment Service | `/payments` |

---

## Database Schemas

### User Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20)
);
```

### Order Table
```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  product_name VARCHAR(255),
  amount DOUBLE,
  status VARCHAR(50)
);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255),
  quantity INT,
  price DOUBLE,
  warehouse_location VARCHAR(255)
);
```

---

## Monitoring and Observability

### Actuator Endpoints

**Payment Service Health**:
```bash
curl http://localhost:8086/actuator/health
```

**Detailed Health with Circuit Breaker Status**:
```bash
curl http://localhost:8086/actuator/health/circuitbreakers
```

---

## Notes

- All services are configured to use H2 in-memory databases for simplicity
- The Config Server is set up to use a local git repository (in production, use GitHub/GitLab)
- Redis is optional for advanced caching; the gateway uses in-memory caching by default
- API Gateway logs all requests with URI and response time
- Payment Service intentionally includes failure simulation for demonstrating circuit breaker behavior

---

## Future Enhancements

1. **Distributed Tracing**: Add Spring Cloud Sleuth and Zipkin
2. **Metrics Collection**: Integrate Micrometer and Prometheus
3. **Security**: Add Spring Security and OAuth2
4. **API Documentation**: Add Springdoc OpenAPI (Swagger)
5. **Load Balancing**: Configure custom load balancing strategies
6. **Message Queue**: Add RabbitMQ or Kafka for async communication
7. **Persistent Database**: Replace H2 with PostgreSQL or MySQL
8. **Testing**: Add integration and contract tests

---

## Troubleshooting

**Issue**: Services not registering with Eureka
- **Solution**: Ensure Eureka Server is running on port 8761 and all services can reach it

**Issue**: Order Service cannot call User Service
- **Solution**: Verify User Service is running and registered with Eureka; check Feign configuration

**Issue**: API Gateway returns 404
- **Solution**: Verify service names match Eureka registration names; check gateway routes configuration

**Issue**: Circuit breaker always open
- **Solution**: Check Payment Service logs; circuit breaker needs successful calls to transition back to CLOSED

---

## Contact & Support

For questions or issues, refer to the individual service documentation or contact the development team.
