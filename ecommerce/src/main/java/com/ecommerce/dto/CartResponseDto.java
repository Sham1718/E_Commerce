package com.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDto {
    private Long cartId;
    private Long productId;

    private String productName;
    private double price;
    private String imageUrl;

    private int quantity;

    private double subtotal;
}
