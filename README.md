# 🔐 Authentication MERN Stack App

A full-stack authentication system built with **MongoDB**, **Express.js**, **React**, and **Node.js**. It allows users to **sign up**, **log in**, and **access protected routes securely** using **JWT tokens**.

---

## 📁 Project Structure

├── frontend/ # React frontend
│ ├── pages/ # Login, Signup, Home
│ ├── App.jsx # Frontend routes and authentication logic
│ └── ...
├── backend/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── .env
│ └── ...
├── README.md
└── package.json


---

## 🛠️ Technologies Used

### 🔹 Frontend (React):
- React Router DOM
- Axios
- LocalStorage (for storing JWT token)
- React Hooks (`useState`, `useEffect`)

### 🔹 Backend (Node.js + Express):
- JWT (JSON Web Tokens)
- Bcrypt (for password hashing)
- Mongoose (MongoDB ORM)
- Express.js

### 🔹 Database:
- MongoDB (Local or Cloud via MongoDB Atlas)

---

## 🚀 Features

- ✅ User Registration (Sign Up)
- ✅ User Login with JWT Authentication
- ✅ Protected Routes (e.g., `/home`)
- ✅ Auto Redirect Based on Login Status
- ✅ Logout Functionality
- ✅ Password Hashing using Bcrypt

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hardiklakum20/authantication_mernStack.git
cd authantication_mernStack
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
### .env
```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
npm start
```

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
npm start
```
