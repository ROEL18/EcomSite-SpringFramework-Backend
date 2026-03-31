# SpringEcom Study Notes

## 1. Project overview
This project is a Spring Boot ecommerce backend with a React frontend.

### Backend responsibilities
- store products in MySQL
- expose public product APIs
- protect order APIs with Spring Security session login
- create and fetch orders
- seed demo users at startup
- log cross-cutting behavior with Spring AOP

### Frontend responsibilities
- show product catalogue
- log in through Spring Security
- build an order from selected products
- place the order through the backend API
- fetch order history after login

---

## 2. Main backend layers

### Controller
Controllers receive HTTP requests and return HTTP responses.
Examples:
- `ProductController`
- `OrderController`
- `HomeController`

### Service
Services contain business logic.
Examples:
- `ProductService`
- `OrderService`
- `CustomUserDetailsService`

### Repository
Repositories talk to the database using Spring Data JPA.
Examples:
- `ProductRepo`
- `OrderRepo`
- `UserRepo`

### Model / Entity
Entities map Java classes to database tables.
Examples:
- `Product`
- `Order`
- `OrderItem`
- `User`

### DTO
DTOs are request and response shapes used in APIs.
Examples:
- `OrderRequest`
- `OrderResponse`
- `OrderItemRequest`
- `OrderItemResponse`

---

## 3. Security concepts used here

### User
The `User` entity stores:
- id
- name
- email
- password
- role

### UserDetails
`CustomUserDetails` wraps the user and tells Spring Security:
- what username is used for login
- what password should be checked
- what role the user has

### UserDetailsService
`CustomUserDetailsService` loads the user from the database by email.

### PasswordEncoder
`BCryptPasswordEncoder` hashes passwords securely.

### SecurityFilterChain
This class decides which routes are public and which routes need login.

In this project:
- `/`, `/hello`, product endpoints are public
- `/api/orders/**` needs login

### Session login
The frontend sends login data to `/login`.
If login works, Spring Security stores the session and sends a cookie.
The React frontend sends that cookie on future requests using `credentials: 'include'`.

---

## 4. Order flow
1. User logs in.
2. Frontend fetches products from `/products`.
3. User adds products to cart.
4. Frontend creates this payload:
```json
{
  "customerName": "Roel",
  "email": "roel@gmail.com",
  "items": [
    { "productId": 1, "quantity": 2 }
  ]
}
```
5. Frontend sends it to `POST /api/orders/place`.
6. Backend checks product existence and stock.
7. Backend reduces stock, creates `Order` and `OrderItem` objects, saves them, and returns `OrderResponse`.

---

## 5. Why DTOs are used

### Request DTO
Used for incoming client data.
Example: `OrderRequest`

### Response DTO
Used for outgoing API data.
Example: `OrderResponse`

### Why not return the entity directly
- avoids exposing internal table structure
- gives better control of response shape
- keeps API design clean

---

## 6. React integration notes

### Important frontend rule
Whenever the frontend talks to a secured backend endpoint, it must send:
```js
credentials: 'include'
```
Without this, the login session cookie will not be sent.

### Login request
The frontend sends:
- `username` = email
- `password` = password

with content type:
```text
application/x-www-form-urlencoded
```

### Why CORS config was needed
Frontend runs on `http://localhost:5173`
Backend runs on `http://localhost:8080`
These are different origins, so backend must allow CORS and credentials.

---

## 7. AOP concepts
AOP stands for Aspect Oriented Programming.
It handles repeated cross-cutting logic like logging.

### Key terms
- Aspect: class containing cross-cutting logic
- Advice: what should run
- Join point: where logic runs
- Pointcut: expression selecting methods

### In this project
The logging aspect can:
- log controller calls
- measure service execution time
- log errors thrown by services/controllers

---

## 8. How to run the whole project

### Backend
1. create MySQL database `e_com`
2. set your MySQL password in `src/main/resources/application.properties`
3. run backend:
```bash
mvnw.cmd spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5173`

Backend URL:
- `http://localhost:8080`

---

## 9. Demo login
- email: `roel@gmail.com`
- password: `123456`

---

## 10. Interview-style summary
This project follows layered architecture. The React frontend calls the Spring Boot backend. Public product APIs are available without login, while order APIs are protected by Spring Security. Session-based authentication is used, and the frontend keeps the session cookie with `credentials: 'include'`. Orders are created through DTOs, processed by the service layer, saved using JPA repositories, and returned as structured responses. AOP is used for logging and timing cross-cutting concerns.
