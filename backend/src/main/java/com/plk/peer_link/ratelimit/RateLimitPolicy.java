package com.plk.peer_link.ratelimit;

import java.time.Duration;
import java.util.List;

public record RateLimitPolicy(KeyType keyType, List<Window> windows) {
    public enum KeyType { IP, USER }

    public record Window(long capacity, Duration period) {}
}
