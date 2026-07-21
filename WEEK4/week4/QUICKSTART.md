# Quick Start Guide - Week4 Microservices

## 30-Second Overview

This is a complete Spring Boot 3.0 microservices architecture featuring:
- ✅ Service Discovery (Eureka)
- ✅ API Gateway with routing & rate limiting
- ✅ REST APIs with databases
- ✅ Inter-service communication (OpenFeign)
- ✅ Centralized configuration (Config Server)
- ✅ Circuit breaker for resilience (Resilience4j)

---

## Prerequisites

- **Java 21+** installed
- **Maven 3.6+** installed
- **Git** (optional)

Check versions:
```bash
java -version
mvn -v
```

---

## Running Services (Fastest Way)

### Step 1: Navigate to Project
```bash
cd C:\Users\hp\Desktop\WEEK\Digital-Nature\WEEK4\week4
```

### Step 2: Start Services in Order

**Terminal 1 - Eureka Server:**
```bash
cd eureka-server
mvn spring-boot:run
```
✅ Access dashboard: http://localhost:8761

**Terminal 2 - Config Server:**
```bash
cd config-server
mvn spring-boot:run
```

**Terminal 3-9 - Microservices (each in new terminal):**
```bash
# Account Service
cd account-service && mvn spring-boot:run

# Loan Service
cd loan-service && mvn spring-boot:run

# Greet Service
cd greet-service && mvn spring-boot:run

# User Service
cd user-service && mvn spring-boot:run

# Order Service
cd order-service && mvn spring-boot:run

# Inventory Service
cd inventory-service && mvn spring-boot:run

# Payment Service
cd payment-service && mvn spring-boot:run
```

**Terminal 10 - API Gateway (start last):**
```bash
cd api-gateway
mvn spring-boot:run
```
✅ Gateway ready: http://localhost:9090

---

## Quick API Tests

### Test 1: Basic Services (via Gateway)
```bash
# Should return "Account Service: Retrieved Account Details"
curl http://localhost:9090/account

# Should return "Loan Service: Retrieved Loan Details"
curl http://localhost:9090/loan

# Should return "Greet Service: Hello from Greet Service!"
curl http://localhost:9090/greet
```

### Test 2: User Service (CRUD Operations)
```bash
# Create a user
curl -X POST http://localhost:9090/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","phone":"1234567890"}'

# Get all users
curl http://localhost:9090/api/users

# Get user ID 1
curl http://localhost:9090/api/users/1

# Update user ID 1
curl -X PUT http://localhost:9090/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice.new@test.com","phone":"0987654321"}'

# Delete user ID 1
curl -X DELETE http://localhost:9090/api/users/1
```

### Test 3: Order Service (with OpenFeign)
```bash
# Create user first
curl -X POST http://localhost:9090/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","email":"bob@test.com","phone":"1111111111"}'

# Create order for user ID 1
curl -X POST http://localhost:9090/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"productName":"Laptop","amount":1299.99}'

# Get all orders
curl http://localhost:9090/api/orders
```

### Test 4: Inventory Service
```bash
# Create inventory item
curl -X POST http://localhost:9090/api/inventory \
  -H "Content-Type: application/json" \
  -d '{"productName":"Mouse","quantity":50,"price":25.99,"warehouseLocation":"Warehouse A-1"}'

# Get all inventory
curl http://localhost:9090/api/inventory
```

### Test 5: Payment Service with Circuit Breaker
```bash
# Process a payment (will randomly succeed or fail)
curl -X POST http://localhost:9090/api/payments \
  -H "Content-Type: application/json" \
  -d '{"orderId":1,"amount":100.00,"currency":"USD"}'

# Run multiple times to see circuit breaker in action!
# First few calls: SUCCESS
# After failures: Circuit opens, returns PENDING status

# Check circuit breaker health
curl http://localhost:8086/actuator/health
```

---

## What Each Service Does

| Service | Port | Example Endpoint | Purpose |
|---------|------|------------------|---------|
| Account | 8080 | `GET /account` | Dummy account service |
| Loan | 8081 | `GET /loan` | Dummy loan service |
| Greet | 8082 | `GET /greet` | Dummy greet service |
| User | 8083 | `POST /users` | Create/read users in H2 DB |
| Order | 8084 | `POST /orders` | Create/read orders, calls User via OpenFeign |
| Inventory | 8085 | `POST /inventory` | Manage inventory with Config Server |
| Payment | 8086 | `POST /payments` | Process payments with Circuit Breaker |
| Config | 8888 | `GET /inventory-service/default` | Centralized configuration |
| Eureka | 8761 | Dashboard | Service registry |
| **Gateway** | **9090** | **All above via /api/** | Routes to all services |

---

## Key Features to Try

### 1. Service Discovery
```bash
# View all registered services
curl http://localhost:8761/eureka/apps | grep -o 'name>[^<]*' | sort -u
```

### 2. Rate Limiting
```bash
# Run this script to test rate limiting (100 req/min)
for i in {1..105}; do
  echo "Request $i..."
  curl http://localhost:9090/greet
done
# Requests 101+ should return 429 Too Many Requests
```

### 3. API Gateway Logging
```bash
# Check gateway logs for incoming requests and response times
# Look for: "Incoming request URI: ..." in console output
```

### 4. Circuit Breaker
```bash
# Payment service simulates failures
# Run this multiple times rapidly:
for i in {1..20}; do
  echo "Payment $i..."
  curl -X POST http://localhost:9090/api/payments \
    -H "Content-Type: application/json" \
    -d '{"orderId":'$i',"amount":100.00,"currency":"USD"}'
  echo ""
  sleep 0.5
done

# Observe:
# - First few succeed
# - Circuit opens after failures
# - Returns fallback PENDING responses
# - After 5 seconds, tries again
```

### 5. Inter-Service Communication
```bash
# Order service calls User service via OpenFeign
# Create user first (get ID)
USER_ID=$(curl -s -X POST http://localhost:9090/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@test.com","phone":"2222222222"}' \
  | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

# Create order using that user ID
curl -X POST http://localhost:9090/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":'$USER_ID',"productName":"Phone","amount":799.99}'

# Order service validated the user exists!
```

---

## Stopping Services

Press `Ctrl+C` in each terminal to stop services gracefully.

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Port 8761 already in use" | Stop Eureka or change port in application.properties |
| "Cannot connect to Eureka" | Ensure Eureka started first on port 8761 |
| "Order cannot find User" | Check User service is running and registered in Eureka |
| "Circuit breaker stuck OPEN" | Wait 5 seconds or restart Payment service |
| "404 Not Found from Gateway" | Check service name in Eureka matches route config |
| "H2 database has no data" | H2 is in-memory; data resets on restart |

---

## Viewing Logs

Each service logs to console. Look for:

```
# Eureka registration
INFO ... : DiscoveryClient_USER-SERVICE/... registering service...

# Gateway logging
INFO ... : Incoming request URI: http://localhost:9090/api/users

# OpenFeign client
DEBUG ... : [UserServiceClient#getUser]

# Circuit breaker
WARN ... : Fallback: Payment processing failed...
```

---

## Architecture Diagram

```
Client (Postman/curl)
    ↓
API Gateway (9090)
    ├─ Rate Limiting Filter
    ├─ Request Logging Filter
    └─ Path Rewriting Filter
    ↓
Service Discovery (Eureka 8761)
    ↓
Microservices:
├─ Account/Loan/Greet (8080-8082)
├─ User Service (8083) + H2 DB
├─ Order Service (8084) ──OpenFeign──→ User Service
├─ Inventory (8085) ──Config Client──→ Config Server (8888)
└─ Payment Service (8086) ──Circuit Breaker──→ Third-party API
```

---

## Next Learning Steps

1. **Edit** a service's `application.properties` and restart to see auto-reload
2. **Add** a new endpoint to any controller and test via gateway
3. **Monitor** Eureka dashboard and watch services register/deregister
4. **Experiment** with Payment Service failure rate (in ThirdPartyPaymentService)
5. **Increase** circuit breaker threshold and observe state changes

---

## Documentation Files

- **README.md** - Complete feature documentation
- **PROJECT_STRUCTURE.md** - Detailed architecture and setup
- **QUICKSTART.md** - This file

---

## Tips

✅ Start Eureka first, then Config Server, then all microservices, then Gateway
✅ Use `-DskipTests` flag to build faster: `mvn clean install -DskipTests`
✅ Spring Boot's DevTools provides hot reload (auto-restart on code changes)
✅ Access H2 console: `http://localhost:8083/h2-console` (User Service)
✅ All services auto-register with Eureka - no manual configuration needed!

---

**Total Setup Time**: ~5 minutes (first build takes longer)
**Ready to Code**: After all 10 services are running
**Good Luck!** 🚀
