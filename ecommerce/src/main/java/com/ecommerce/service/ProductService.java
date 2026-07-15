package com.ecommerce.service;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.ProductNotFound;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;
    private final ModelMapper modelMapper;
    private final CartRepository cartRepository;

    public ProductService(ProductRepository repository, ModelMapper modelMapper, CartRepository cartRepository) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.cartRepository = cartRepository;
    }

    public Page<ProductDto> getAllProduct(int page, int size){
        Pageable pageable= PageRequest.of(page, size);
        Page<Product> products = repository.findAll(pageable);
        return products.map(product -> modelMapper.map(product,ProductDto.class));
    }

    public ProductDto createProduct(ProductDto productDto){
        Product p=modelMapper.map(productDto,Product.class);
        Product saved=repository.save(p);
        return modelMapper.map(saved,ProductDto.class);
    }

    public ProductDto updateProduct(long id, ProductDto productDto){
        Product product = findProduct(id);

        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategory(productDto.getCategory());
        product.setImageUrl(productDto.getImageUrl());

        Product saved = repository.save(product);

        return modelMapper.map(saved, ProductDto.class);
    }

    public void deleteProduct(long id){
        Cart cart=cartRepository.findByProductId(id).orElseThrow(()->new ProductNotFound("product not found"));
        if (cart!= null){
            cartRepository.delete(cart);
        }
        Product product=findProduct(id);
        repository.delete(product);
    }

    public ProductDto getProductById(long id){
        Product p=findProduct(id);
        return modelMapper.map(p,ProductDto.class);
    }

    public List<ProductDto> getProductByCategory(String category){
        List<Product> products= repository.findByCategory(category);
        if (products.isEmpty()){
            throw new ProductNotFound("No products found in category: " + category);
        }
        return products.stream().map(
                product -> modelMapper.map(product,ProductDto.class)
        ).toList();
    }

    public List<ProductDto> searchProductByName(String name){
        List<Product> products=repository.findByNameContainingIgnoreCase(name);
        if (products.isEmpty()){
            throw new ProductNotFound("No product found with name: " + name);
        }
        return products.stream().map(
                product -> modelMapper.map(product,ProductDto.class)
        ).toList();
    }

    private Product findProduct(long id){
        return repository.findById(id).orElseThrow(()->new ProductNotFound("Product Not Found..!"));
    }
}
