# WEEK4 Microservices Project - Complete Structure

## Project Organization

```
week4/
├── eureka-server/                      # Service Discovery Server
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/eurekaserver/
│       │   └── EurekaServerApplication.java
│       └── resources/
│           └── application.properties
│
├── account-service/                    # Account Microservice (Port 8080)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/accountservice/
│       │   ├── AccountServiceApplication.java
│       │   └── AccountController.java
│       └── resources/
│           └── application.properties
│
├── loan-service/                       # Loan Microservice (Port 8081)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/loanservice/
│       │   ├── LoanServiceApplication.java
│       │   └── LoanController.java
│       └── resources/
│           └── application.properties
│
├── greet-service/                      # Greet Microservice (Port 8082)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/greetservice/
│       │   ├── GreetServiceApplication.java
│       │   └── GreetController.java
│       └── resources/
│           └── application.properties
│
├── user-service/                       # User Management Service (Port 8083)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/userservice/
│       │   ├── UserServiceApplication.java
│       │   ├── User.java (JPA Entity)
│       │   ├── UserRepository.java (JPA Repository)
│       │   └── UserController.java (REST Controller)
│       └── resources/
│           └── application.properties
│
├── order-service/                      # Order Management Service (Port 8084)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/orderservice/
│       │   ├── OrderServiceApplication.java
│       │   ├── Order.java (JPA Entity)
│       │   ├── OrderRepository.java (JPA Repository)
│       │   ├── OrderController.java (REST Controller)
│       │   ├── UserServiceClient.java (OpenFeign Client)
│       │   └── UserResponse.java (DTO)
│       └── resources/
│           └── application.properties
│
├── inventory-service/                  # Inventory Management Service (Port 8085)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/inventoryservice/
│       │   ├── InventoryServiceApplication.java
│       │   ├── Inventory.java (JPA Entity)
│       │   ├── InventoryRepository.java (JPA Repository)
│       │   └── InventoryController.java (REST Controller)
│       └── resources/
│           └── application.properties
│
├── payment-service/                    # Payment Service with Circuit Breaker (Port 8086)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/paymentservice/
│       │   ├── PaymentServiceApplication.java
│       │   ├── PaymentRequest.java (DTO)
│       │   ├── PaymentResponse.java (DTO)
│       │   ├── ThirdPartyPaymentService.java (Circuit Breaker)
│       │   └── PaymentController.java (REST Controller)
│       └── resources/
│           └── application.properties
│
├── config-server/                      # Spring Cloud Config Server (Port 8888)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/configserver/
│       │   └── ConfigServerApplication.java
│       └── resources/
│           ├── application.properties
│           └── application-local.properties
│
├── api-gateway/                        # API Gateway with Advanced Features (Port 9090)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/edgeservices/apigateway/
│       │   ├── ApiGatewayApplication.java
│       │   └── GatewayConfig.java (GlobalFilters)
│       └── resources/
│           └── application.properties
│
├── README.md                           # Complete documentation
└── PROJECT_STRUCTURE.md                # This file
```

## Service Topology Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         API GATEWAY (9090)                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Global Filters:                                            │ │
│  │  - Request Logging                                         │ │
│  │  - Rate Limiting (100 req/min per IP)                      │ │
│  │  - Path Rewriting                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────┬───────────────────────────────────────────────────────┘
           │
    ┌──────┴────────┬────────────────┬──────────────────┬──────────┐
    │               │                │                  │          │
    ▼               ▼                ▼                  ▼          ▼
┌─────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────┐
│ Account │  │  Loan    │  │  Greet       │  │ User Service │  │ Order  │
│Service  │  │Service   │  │Service       │  │(Port 8083)   │  │Service │
│(8080)   │  │(8081)    │  │(Port 8082)   │  │ ┌──────────┐ │  │(8084)  │
│         │  │          │  │              │  │ │  H2 DB   │ │  │ ┌────┐ │
└─────────┘  └──────────┘  └──────────────┘  │ └──────────┘ │  │ │H2DB│ │
                                              └──────────────┘  │ └────┘ │
                    ▲                             │              └────────┘
                    │                             │ (OpenFeign)
                    │                             │
                    │                         (reads)
                    │
┌─────────────────────────────────────────────────────────────────┐
│               EUREKA SERVICE DISCOVERY (8761)                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ All microservices register here for dynamic discovery      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┬──────────────────┬────────────────┐
    │                         │                  │                │
    ▼                         ▼                  ▼                ▼
┌────────────────┐  ┌──────────────┐  ┌───────────────┐  ┌────────────┐
│  Inventory     │  │ Payment      │  │ Config Server │  │ Centralized│
│  Service       │  │ Service      │  │  (Port 8888)  │  │Config Repo │
│  (Port 8085)   │  │ (Port 8086)  │  │               │  │(Git/Local) │
│  ┌──────────┐  │  │  ┌────────┐  │  └───────────────┘  └────────────┘
│  │  H2 DB   │  │  │  │ Circuit │  │
│  └──────────┘  │  │  │ Breaker │  │
│  Config Client │  │  │ Pattern │  │
└────────────────┘  │  └────────┘  │
                    │ (Resilience  │
                    │  4j)         │
                    └──────────────┘
```

## Data Flow Examples

### Example 1: Create Order via API Gateway

```
1. POST /api/orders
   (API Gateway)
       ↓
2. [Gateway Filters]
   - Log request: POST /api/orders (Rate Limit: 99/100)
   - Rewrite path: /api/orders → /orders
   - Check rate limit
       ↓
3. Route to Order Service (lb://order-service)
       ↓
4. Order Service creates order
   - Validates user via OpenFeign client
       ↓
5. Call User Service (lb://user-service)
       ↓
6. User Service returns user data
       ↓
7. Order Service saves order to H2 DB
       ↓
8. Return order response to client
       ↓
9. Gateway logs response: 200 OK (Duration: 150ms)
```

### Example 2: Process Payment with Circuit Breaker

```
1. POST /api/payments
   (API Gateway)
       ↓
2. Route to Payment Service
       ↓
3. ThirdPartyPaymentService.processPayment()
   [@CircuitBreaker(name="paymentService", fallbackMethod="...")]
       ↓
4. Circuit Breaker State: CLOSED (normal operation)
       ↓
5. Try to call third-party API (2-second delay)
   
   Scenario A: Success
   └─→ Returns PaymentResponse with SUCCESS status
       └─→ Circuit remains CLOSED
   
   Scenario B: Timeout/Failure
   └─→ Failure count increases
   └─→ If failures > 50% of 10 calls
   └─→ Circuit transitions to OPEN
       └─→ Fallback method triggered
       └─→ Returns PaymentResponse with PENDING status
       └─→ After 5 seconds, transitions to HALF_OPEN
           └─→ Allows 3 test requests
           └─→ If succeed: CLOSED | If fail: OPEN
```

### Example 3: Service Registration Flow

```
1. Each microservice starts
       ↓
2. @EnableEurekaClient annotation activates
       ↓
3. Service registers with Eureka Server (http://localhost:8761/eureka)
       ↓
4. Registration includes:
   - Service name (e.g., "user-service")
   - Host/port (e.g., localhost:8083)
   - Health check endpoint
       ↓
5. Eureka Server maintains service registry
       ↓
6. API Gateway queries Eureka for service locations
       ↓
7. Gateway routes requests using service names
   - lb://user-service → Eureka resolves to localhost:8083
   - lb://order-service → Eureka resolves to localhost:8084
```

## Technology Stack Details

### Core Framework
- **Spring Boot 3.1.0**: Latest version with Java 21 support
- **Spring Cloud 2022.0.4**: Microservices ecosystem

### Service Communication
- **Spring Cloud Gateway**: API Gateway with routing
- **Spring Cloud Eureka**: Service discovery and registration
- **OpenFeign**: Declarative REST client (Order → User)
- **Spring Cloud Config Client**: Externalized configuration

### Data Persistence
- **Spring Data JPA**: Object-relational mapping
- **Hibernate**: ORM implementation
- **H2 Database**: In-memory relational database

### Resilience & Observability
- **Resilience4j**: Circuit breaker, retry, rate limiting
- **Spring Boot Actuator**: Health checks and metrics
- **SLF4J + Logback**: Logging framework

### Development Tools
- **Lombok**: Reduce boilerplate code
- **DevTools**: Hot reload during development
- **Maven**: Build and dependency management

## Configuration Highlights

### Ports Assignment
| Service | Port | Role |
|---------|------|------|
| Eureka Server | 8761 | Service Discovery |
| Account Service | 8080 | Basic Service |
| Loan Service | 8081 | Basic Service |
| Greet Service | 8082 | Basic Service |
| User Service | 8083 | REST API + Database |
| Order Service | 8084 | REST API + OpenFeign |
| Inventory Service | 8085 | REST API + Config Client |
| Payment Service | 8086 | Circuit Breaker Pattern |
| Config Server | 8888 | Configuration Management |
| API Gateway | 9090 | Request Router |

### Spring Cloud Properties
```properties
# Service Registration
eureka.client.service-url.defaultZone=http://localhost:8761/eureka

# Config Server
spring.config.import=configserver:http://localhost:8888

# Database (H2)
spring.datasource.url=jdbc:h2:mem:dbname
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

## Deployment Scenarios

### Single Machine (Development)
- All services on localhost with different ports
- H2 in-memory databases (data lost on restart)
- Suitable for development and testing

### Multi-Machine (Production)
- Services on different hosts
- Replace H2 with PostgreSQL/MySQL
- External Redis for caching
- Kubernetes orchestration recommended

## Security Considerations

1. **Service-to-Service Communication**
   - Current: No authentication (demo only)
   - Recommended: Spring Security with OAuth2

2. **API Gateway**
   - Current: Basic rate limiting per IP
   - Recommended: API key authentication, JWT validation

3. **Data Protection**
   - Current: No encryption
   - Recommended: TLS/SSL for all communication

4. **Database**
   - Current: No access control
   - Recommended: SQL authentication and row-level security

## Performance Optimization Tips

1. **Caching**
   - Use Redis for distributed caching
   - Implement @Cacheable on frequently accessed methods

2. **Load Balancing**
   - Spring Cloud LoadBalancer with custom strategies
   - Ribbon (legacy, now replaced by LoadBalancer)

3. **Async Processing**
   - Use CompletableFuture for non-blocking operations
   - Implement message queues (RabbitMQ/Kafka)

4. **Database Optimization**
   - Add database indexing on frequently queried columns
   - Implement pagination for large datasets

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Mock external dependencies (e.g., HTTP clients)

### Integration Tests
- Test service-to-service communication
- Test database interactions

### Contract Tests
- Verify API contracts between services
- Prevent breaking changes

### End-to-End Tests
- Test complete user workflows
- Verify all components work together

## Troubleshooting Commands

```bash
# Check if Eureka Server is running
curl http://localhost:8761

# Get service registry from Eureka
curl http://localhost:8761/eureka/apps

# Check service health
curl http://localhost:8083/actuator/health

# Test API Gateway routing
curl http://localhost:9090/api/users

# View Payment Service circuit breaker status
curl http://localhost:8086/actuator/health/circuitbreakers

# Check Config Server
curl http://localhost:8888/user-service/default
```

## Version History

- **v1.0**: Initial microservices architecture with basic services
- **v2.0**: Added User and Order Management System
- **v3.0**: Integrated Config Server and advanced API Gateway features
- **v4.0**: Implemented Resilience4j Circuit Breaker pattern

## Next Steps for Learning

1. Study the OpenFeign integration in Order Service
2. Experiment with circuit breaker thresholds in Payment Service
3. Configure centralized logging with ELK stack
4. Implement distributed tracing with Sleuth and Zipkin
5. Add API documentation with Springdoc OpenAPI
6. Implement custom metrics collection
7. Set up CI/CD pipeline with GitHub Actions

---

**Last Updated**: July 21, 2026
**Maintainer**: Development Team
