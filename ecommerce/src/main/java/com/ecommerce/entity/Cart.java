package com.ecommerce.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int quantity;

    private LocalDateTime addedAt;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @PrePersist
    public void createdAt(){
        addedAt=LocalDateTime.now();
    }





}
