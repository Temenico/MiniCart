package com.minicart.cartservice.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record CartResponse(
        Long id,
        LocalDateTime createdAt,
        BigDecimal total,
        List<CartItemResponse> items
) {
}
