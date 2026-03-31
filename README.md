# 🛒 Spring E-Commerce Application (Full Stack)

A full-stack e-commerce application built using **Spring Boot (Backend)** and **React (Frontend)**.
The system supports product browsing, secure authentication, order placement, and order tracking.

---

## 🚀 Tech Stack

### Backend

* Spring Boot
* Spring Security (Session-based Authentication)
* Spring Data JPA (Hibernate)
* MySQL
* Spring AOP
* Maven

### Frontend

* React (Vite)
* Axios (API calls)
* CSS / Tailwind (optional styling)

---

## 📦 Features

### 🔧 Backend Responsibilities

* Store products in **MySQL database**
* Expose **public product APIs**
* Protect **order APIs using Spring Security**
* Handle **user login with session authentication**
* Create and fetch **orders**
* Seed **demo users at application startup**
* Log cross-cutting concerns using **Spring AOP**

---

### 💻 Frontend Responsibilities

* Display **product catalogue**
* Perform **user login**
* Allow users to **select products**
* Build an **order cart**
* Place orders via backend API
* Fetch and display **order history**

---

## 📂 Project Structure

```
SpringEcom/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repo/
│   ├── model/
│   ├── config/
│   └── aop/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/spring-ecom.git
cd spring-ecom
```

---

### 🔹 2. Backend Setup

#### Configure Database

Create MySQL database:

```sql
CREATE DATABASE e_com;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/e_com
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

#### Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Authentication

This project uses **Spring Security Session Authentication**.

### Demo Credentials

| Role  | Email                                     | Password |
| ----- | ----------------------------------------- | -------- |
| User  | [roel@gmail.com](mailto:roel@gmail.com)   | 123456   |
| Admin | [admin@gmail.com](mailto:admin@gmail.com) | 123456   |

---

## 🌐 API Endpoints

### Public APIs

```
GET /api/products
GET /api/products/{id}
```

### Authentication APIs

```
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Protected APIs (Require Login)

```
POST /api/orders/place
GET  /api/orders
```

---

## 🔁 Application Flow

1. User opens frontend
2. Products are fetched (public API)
3. User logs in via `/api/auth/login`
4. Session is created (Spring Security)
5. User selects products
6. Order is placed via `/api/orders/place`
7. Order history fetched via `/api/orders`

---

## 📊 AOP Logging

Spring AOP is used to:

* Log controller requests
* Measure service execution time
* Track exceptions

---

## 🧪 Testing

Use:

* **Postman** for backend API testing
* Browser for frontend interaction

---

## ⚠️ Important Notes

* Backend must run before frontend
* MySQL must be running
* Ensure correct DB credentials
* If authentication fails:

  * clear browser cookies
  * restart backend

---

## 📌 Future Improvements

* JWT Authentication
* Payment Integration
* Admin Dashboard
* Product Image Upload
* Deployment (Docker + Cloud)

---

## 👨‍💻 Author

Roel Christy
B.Tech CSBS
SRM University

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
