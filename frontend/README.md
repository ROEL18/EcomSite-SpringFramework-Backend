# SpringEcom React Frontend

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Backend integration
Keep the Spring Boot backend running on `http://localhost:8080`.

The frontend talks to these endpoints:
- `POST /login`
- `POST /logout`
- `GET /products`
- `GET /product/search?keyword=...`
- `GET /api/orders`
- `POST /api/orders/place`

## Demo login
- Email: `roel@gmail.com`
- Password: `123456`

## How login works
This frontend posts `application/x-www-form-urlencoded` data to Spring Security's `/login` endpoint and keeps the session cookie with `credentials: 'include'`.
