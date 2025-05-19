# AuthScribe – A Secure Blog Authentication System (MERN Stack)

**AuthScribe** is a full-stack web application built with the MERN stack. It allows users to securely register, log in, and access protected blog content using JWT-based authentication. The project demonstrates robust user auth, route protection, and a clean separation of concerns between frontend and backend.

---

## Features

- User Signup and Login
- JWT-based Authentication
- Protected Blog Pages
- User Dashboard
- Frontend Route Protection
- Token Validation Middleware

---

## Project Structure

### Frontend – React

```

src/
├── App.jsx               // Main routing component
├── components/
│   ├── Login.jsx         // Login form
│   ├── SignUp.jsx        // Signup form
│   ├── NavBar.jsx        // Header with auth-based rendering
│   ├── PrivateRoute.jsx  // Protects routes using auth check
│   └── Dashboard.jsx     // User profile view
└── pages/
└── Blog.jsx          // Protected blog posts page

```

### Backend – Express

```

backend/
├── index.js              // Main server entry
├── routes/
│   ├── UserRoute.js      // Login & Signup APIs
│   └── BlogRoutes.js     // Protected blog content API
├── controllers/
│   └── UserController.js // Auth logic (register/login)
├── models/
│   └── User.js           // Mongoose user schema
└── middleware/
└── authMiddleware.js // JWT validation

```

---

## Authentication Explained

### What is Authentication?

Authentication is the process of verifying the identity of a user. This project uses token-based authentication via JSON Web Tokens (JWT).

### Types of Authentication

- **Session-Based** – Uses cookies and server-side sessions  
- **Token-Based (Used Here)** – Stateless JWT stored on the client  
- **OAuth** – Third-party providers like Google, Facebook  
- **Biometric** – Face ID, fingerprint  
- **2FA** – Two-step login (e.g., password + OTP)

---

## What is JWT?

JWT (JSON Web Token) is a compact token used to securely transmit user identity information.

**Structure:**
```

Header.Payload.Signature

```

**Benefits:**

- Stateless
- Portable
- Self-contained
- Secure (signed)
- Expirable

---

## Authentication Flow

### User Registration

1. User signs up with details
2. Password is hashed using bcrypt
3. User is saved to MongoDB
4. JWT is generated and returned
5. Token is stored in localStorage

### User Login

1. User submits credentials
2. Server verifies them
3. JWT token is issued
4. Stored in localStorage
5. Redirected to protected routes

### Accessing Protected Routes

- `PrivateRoute.jsx` checks for token
- Invalid or missing token redirects to login
- Valid token allows access to blog and dashboard

### API Request Authentication

- Token included in `Authorization` header
- Middleware validates the token
- Proceeds only if token is valid

### Logout

- Token is cleared from localStorage
- Redirects to login
- Auth state updated

---

## Data Flow

```

User Input → Frontend → API Request → Backend → Database → Response → UI Update

````

---

## Local Storage Items

- `token`: JWT token
- `isLoggedIn`: Boolean flag
- `user`: User profile data (JSON)

---

## Security Considerations

- Passwords hashed with bcrypt
- Sensitive routes protected by auth middleware
- Frontend and backend route protection
- JWT validation includes error handling

---

## Production Recommendations

- Use HTTPS
- Set appropriate JWT expiration times
- Implement token refresh flow
- Add rate limiting on login/signup
- Store tokens in HTTP-only cookies
- Consider implementing 2FA

---

## Tech Stack

| Technology     | Purpose                   |
|----------------|---------------------------|
| React          | Frontend UI               |
| Express.js     | Backend server            |
| MongoDB        | Database                  |
| Mongoose       | ODM for MongoDB           |
| bcrypt         | Password hashing          |
| jsonwebtoken   | JWT handling              |

---

## Running the Project

### Frontend

```bash
cd frontend
npm install
npm start
````

### Backend

```bash
cd backend
npm install
node index.js
```

> Note: Create a `.env` file for environment variables like MongoDB URI and JWT secret.

---
