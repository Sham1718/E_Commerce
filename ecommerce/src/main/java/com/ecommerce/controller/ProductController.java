package com.ecommerce.controller;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity<Page<ProductDto>> getAllProduct(
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="10") int size
    ){
        return ResponseEntity.ok(service.getAllProduct(page,size));
    }
    @PostMapping("/")
    public ResponseEntity<ProductDto> createProduct(
            @Valid @RequestBody ProductDto dto
    ){
        return ResponseEntity.ok(service.createProduct(dto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(
            @Valid @RequestBody ProductDto dto,
            @PathVariable long id
    ){
        return ResponseEntity.ok(service.updateProduct(id,dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable long id
    ){
        service.deleteProduct(id);
        return ResponseEntity.ok("product deleted");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(
            @PathVariable long id
    ){
        return ResponseEntity.ok(service.getProductById(id));
    }
    @GetMapping("/category")
    public ResponseEntity<Page<ProductDto>> findByCategory(
            @RequestParam String category,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="10") int size
    ){
        return ResponseEntity.ok(service.getProductByCategory(category,page,size));
    }
    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> findByName(
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue="10") int size,
            @RequestParam String name
    ){
        return ResponseEntity.ok(service.searchProductByName(name,page,size));
    }
}
