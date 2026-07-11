package com.ecommerce.controller;

import com.ecommerce.dto.CartDto;
import com.ecommerce.dto.CartResponseDto;
import com.ecommerce.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<List<CartResponseDto>> getAllCartItems(){
        return ResponseEntity.ok(service.getCartItems());
    }

    @PostMapping("/")
    public ResponseEntity<CartDto> addToCart(
            @Valid @RequestBody CartDto dto
    ){
        return ResponseEntity.ok(service.addToCart(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartDto> updateCart(
            @PathVariable long id,
            @RequestBody CartDto dto
    ){
        return ResponseEntity.ok(service.updateQuantity(id,dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartItem(
            @PathVariable long id
    ){
        service.removeFromCart(id);
        return ResponseEntity.ok("product deleted");
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteCart(){
        service.clearCart();
        return ResponseEntity.ok("Delete All Cart Items");
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getCartTotal(){
        return ResponseEntity.ok(service.getCartTotal());
    }
}
