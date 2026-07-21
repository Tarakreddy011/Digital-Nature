package com.edgeservices.apigateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import reactor.core.publisher.Mono;

import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class GatewayConfig {

	private static final Logger log = LoggerFactory.getLogger(GatewayConfig.class);

	private final ConcurrentHashMap<String, Long> requestCounts = new ConcurrentHashMap<>();
	private static final long RATE_LIMIT_PER_MINUTE = 100;

	@Bean
	public GlobalFilter customGlobalFilter() {
		return (exchange, chain) -> {
			String method = exchange.getRequest().getMethod().name();
			String path = exchange.getRequest().getURI().getRawPath();
			String query = exchange.getRequest().getURI().getRawQuery();
			String clientIp = exchange.getRequest().getRemoteAddress() != null
					? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
					: "unknown";
			String userAgent = exchange.getRequest().getHeaders().getFirst("User-Agent");

			log.info("Gateway request method={} path={} query={} clientIp={} userAgent={}",
					method, path, query, clientIp, userAgent);
			
			exchange.getAttributes().put("startTime", System.currentTimeMillis());
			
			return chain.filter(exchange).then(Mono.fromRunnable(() -> {
				Long startTime = exchange.getAttribute("startTime");
				if (startTime != null) {
					long duration = System.currentTimeMillis() - startTime;
					log.info("Gateway response method={} path={} status={} durationMs={}",
							method, path, exchange.getResponse().getStatusCode(), duration);
				}
			}));
		};
	}

	@Bean
	public GlobalFilter rateLimitingFilter() {
		return (exchange, chain) -> {
			String clientId = exchange.getRequest().getRemoteAddress() != null 
				? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress() 
				: "unknown";
			
			// Simple rate limiting by client IP
			long currentCount = requestCounts.getOrDefault(clientId, 0L);
			if (currentCount >= RATE_LIMIT_PER_MINUTE) {
				log.warn("Rate limit exceeded for client: {}", clientId);
				exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
				return exchange.getResponse().setComplete();
			}
			
			requestCounts.put(clientId, currentCount + 1);
			
			// Reset counters every minute (simplified for demo)
			if (System.currentTimeMillis() % 60000 < 100) {
				requestCounts.clear();
			}
			
			return chain.filter(exchange);
		};
	}

	@Bean
	public GlobalFilter pathRewritingFilter() {
		return (exchange, chain) -> {
			String path = exchange.getRequest().getURI().getPath();
			
			// Path rewriting examples
			if (path.startsWith("/api/accounts")) {
				exchange.getAttributes().put("rewritten_path", path.replace("/api/accounts", ""));
				log.info("Rewritten path from {} to /account", path);
			} else if (path.startsWith("/api/loans")) {
				exchange.getAttributes().put("rewritten_path", path.replace("/api/loans", ""));
				log.info("Rewritten path from {} to /loan", path);
			}
			
			return chain.filter(exchange);
		};
	}

}
