#  E-Commerce Management System

### A Full Stack E-Commerce application built with Spring Boot, React, Redux Toolkit, and MySQL for managing products and shopping cart operations through a responsive user interface and RESTful APIs.

---

#  Overview

The E-Commerce Management System is a full-stack web application that allows users to browse products, manage shopping carts, and perform complete product management operations. The backend is built using Spring Boot and exposes REST APIs, while the frontend is developed using React, Redux Toolkit, and Tailwind CSS to provide a modern and responsive user experience.

The application follows a layered architecture with proper separation of concerns using Controllers, Services, Repositories, DTOs, and Entities, making the project scalable and easy to maintain.

---

#  Problem Statement

Managing products and shopping carts manually can become inefficient as the application grows. This project demonstrates how modern web technologies can be combined to build a scalable e-commerce platform with efficient state management, RESTful APIs, and responsive UI components.

---

#  Features

-  Browse available products
-  Add new products
-  Update existing products
-  Delete products
-  Shopping Cart Management
-  Add products to cart
-  Remove products from cart
-  Product Details Page
-  Product Pagination
-  Real-time UI updates using Redux Toolkit
-  Toast Notifications
-  Responsive Design
-  RESTful API Integration
-  Global Exception Handling
-  Form Validation

---

#  Tech Stack

## Frontend

- React 19
- Vite
- JavaScript (ES6+)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

---

## Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- ModelMapper
- Bean Validation
- REST APIs

---

## Database

- MySQL

---

## Development Tools

- Git & GitHub
- IntelliJ IDEA
- VS Code
- Maven
- Postman

---

#  Project Structure

```
Ecommerce
│
├── ecommerce (Spring Boot Backend)
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── DTO
│   ├── Exception
│   └── Config
│
└── frontend (React Frontend)
    ├── Components
    ├── Pages
    ├── Redux
    ├── Services
    ├── Routes
    └── Utils
```

---

#  Backend Architecture

- Controller Layer
- Service Layer
- Repository Layer
- DTO Layer
- Entity Layer
- Global Exception Handling
- ModelMapper Configuration
- CORS Configuration

---

#  Frontend Highlights

- Component-based Architecture
- Redux Toolkit State Management
- Async API Calls
- Pagination
- Reusable UI Components
- Responsive Layout
- Loading Skeletons
- Error Handling
- Confirmation Modals
- Toast Notifications

---

#  Key Concepts Implemented

- CRUD Operations
- RESTful API Design
- DTO Pattern
- Repository Pattern
- Layered Architecture
- Redux Store
- Redux Slice
- createAsyncThunk
- React Hooks
- React Router
- Axios API Integration
- Form Validation
- Exception Handling

---

#  How to Run the Project

## Clone Repository

```bash
git clone https://github.com/Sham1718/E_Commerce.git
```

---

## Backend Setup

Navigate to backend

```bash
cd ecommerce
```

Configure MySQL in

```
application.properties
```

Run

```bash
mvn spring-boot:run
```

Backend will start on

```
http://localhost:8080
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

#  Application Modules

- Home
- Products
- Product Details
- Add Product
- Edit Product
- Shopping Cart
- Pagination
- Responsive Navigation

---

#  Learning Outcomes

This project helped strengthen practical knowledge of:

- Spring Boot REST APIs
- Spring Data JPA
- Hibernate ORM
- React Component Architecture
- Redux Toolkit
- Async State Management
- API Integration using Axios
- Layered Backend Architecture
- DTO Mapping using ModelMapper
- Exception Handling
- MySQL Database Design
- Responsive UI Development

---

#  Future Improvements

- JWT Authentication
- User Login & Registration
- Role-Based Access Control
- Order Management
- Payment Gateway Integration
- Wishlist
- Product Categories
- Product Search & Filters
- Image Upload
- Docker Deployment
- Cloud Deployment

---

#  Author

**Shyam Bharaskar**

 Email: **sbharaskar8485@gmail.com**

 Portfolio: **https://shyam-neon.vercel.app**

 GitHub: **https://github.com/Sham1718**

---

> **"Building scalable applications through clean architecture, modern technologies, and continuous learning."**