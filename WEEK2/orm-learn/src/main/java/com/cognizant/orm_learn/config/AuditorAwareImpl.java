package com.cognizant.orm_learn.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // For demo purposes return a static system user. Replace with real user lookup.
        return Optional.of("system");
    }
}
