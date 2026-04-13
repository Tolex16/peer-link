package com.dcg.digi_cap_group.ratelimit;

import java.time.Duration;
import java.util.List;

public record RateLimitPolicy(KeyType keyType, List<Window> windows) {
    public enum KeyType { IP, USER }

    public record Window(long capacity, Duration period) {}
}
