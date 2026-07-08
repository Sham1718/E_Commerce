package com.ecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank
    private String name;
    @NotBlank
    @Column(length = 1000)
    private String description;
    @Positive
    private double price;
    @PositiveOrZero
    private int stock;
    @NotBlank
    private String category;
    @NotBlank
    private String imageUrl;
    private LocalDateTime createdAt;

    @PrePersist
    public void createdAt(){
        createdAt=LocalDateTime.now();
    }
}
