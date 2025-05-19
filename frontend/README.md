# 📝 Blog Application – Full Stack Project

A full-stack web application that allows users to register, log in, and access protected blog content using **JWT-based authentication**. Built with **React (Frontend)** and **Express.js (Backend)**, this project demonstrates secure user authentication, route protection, and modular architecture.

---

## 🔍 Features

- ✅ User Signup & Login
- 🔐 JWT-based Secure Authentication
- 📄 Protected Blog Pages
- 👤 User Dashboard
- 🧠 Auth State Management with Token Validation
- ⚙️ RESTful API Architecture

---

## 🏗️ Project Structure

### 📦 Frontend – React

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

### 🚀 Backend – Express

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

## 🔐 Authentication Explained

### ✅ What is Authentication?

Authentication is verifying the identity of a user. This app uses **Token-Based Authentication** with **JWT**.

### 🔄 Types of Authentication

- **Session-Based** – Uses cookies and server-side storage  
- **Token-Based (Used Here)** – Stateless JWT stored on the client  
- **OAuth** – Login with Google/Facebook (not implemented yet)  
- **Biometric** – Face ID/Fingerprint (common in mobile apps)  
- **2FA** – Password + OTP for enhanced security  

### 📦 What is JWT?

**JWT (JSON Web Token)** is a compact, self-contained token for transmitting user identity securely.

**Structure:**
```

Header.Payload.Signature

```

**Advantages:**

- Stateless
- Self-contained user info
- Works across domains
- Expirable
- Secure (signed)

---

## 🔄 Authentication Flow

### 📝 User Registration

1. User signs up on frontend
2. Password is hashed with bcrypt
3. User is saved to MongoDB
4. JWT is issued and stored on client (localStorage)

### 🔐 User Login

1. User submits credentials
2. Server verifies against DB
3. JWT issued on success
4. Token stored in localStorage
5. User is redirected to protected routes

### 🔒 Accessing Protected Routes

- `PrivateRoute.jsx` checks for token
- Unauthorized users are redirected to login
- Valid token allows access to Blog/Dashboard

### 🔄 API Request Authentication

- Token added to `Authorization` header
- Middleware validates the token
- If valid: allow API call
- If invalid: return `401 Unauthorized`

### 🚪 Logout

- Clears token from localStorage
- Redirects to login
- Updates auth state

---

## 🔁 Data Flow

```

User Input → Frontend → API Request → Backend → Database → Response → UI Update

````

---

## 🗃️ Local Storage Items

- `token`: JWT Token
- `isLoggedIn`: Boolean auth flag
- `user`: JSON of user info (e.g., name, age)

---

## 🔐 Security Considerations

- Passwords are **bcrypt-hashed**
- All protected endpoints use **authMiddleware**
- Token-based route protection on **frontend + backend**
- Graceful handling of invalid/expired tokens

---

## 🚀 Production Recommendations

- Use **HTTPS**
- Set **JWT expiry**
- Implement **refresh tokens**
- Add **rate limiting** on auth routes
- Store tokens in **HTTP-only cookies** (for advanced security)
- Add **2FA** support

---

## 🧰 Tech Stack

| Technology     | Role                      |
|----------------|---------------------------|
| React          | Frontend UI               |
| React Router   | Routing/Protected Routes  |
| Express.js     | Backend server            |
| MongoDB        | Database                  |
| Mongoose       | ODM for MongoDB           |
| bcrypt         | Password hashing          |
| jsonwebtoken   | JWT creation/validation   |
| Axios/Fetch    | API communication         |

---

## 📂 How to Run the Project

### 🖥️ Frontend

```bash
cd frontend
npm install
npm start
````

### 🌐 Backend

```bash
cd backend
npm install
node index.js
```

> 🔑 Make sure to set your MongoDB URI and JWT secret in a `.env` file.

---

## 🤝 Contributing

Feel free to open issues, suggest improvements, or fork and build on it. Contributions are welcome!

---


