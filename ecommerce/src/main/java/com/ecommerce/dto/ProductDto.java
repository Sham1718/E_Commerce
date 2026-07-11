package com.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProductDto {
    private long id;
    @NotBlank(message = "Product name is required")
    private String name;
    @NotBlank(message = "Description is required")
    @Size(min = 5,max = 100)
    private String description;
    @Positive(message = "Price Should be greater than 0")
    private double price;
    @PositiveOrZero(message = "Stock cannot be negative")
    private int stock;
    @NotBlank(message = "Category is required")
    private String category;
    @NotBlank(message = "Image Url is required")
    private String imageUrl;
}
