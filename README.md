🔐 Authentication MERN Stack App
A full-stack authentication system built with MongoDB, Express.js, React, and Node.js. It allows users to sign up, log in, and access protected routes securely using JWT tokens.

📁 Project Structure
bash
Copy
Edit
authantication_mernStack/
│
├── frontend/ # React frontend
│ ├── pages/ # Login, Signup, Home
│ ├── App.jsx # Frontend routes and authentication logic
│ └── ...
│
├── backend/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── .env
│ └── ...
│
├── README.md
└── package.json

🔧 Technologies Used

Frontend (React):
React Router DOM
Axios
LocalStorage (for token)
React Hooks (useState, useEffect)

Backend (Node.js + Express):
JWT (JSON Web Tokens)
Bcrypt (password hashing)
Mongoose (MongoDB ORM)
Express.js

Database:
MongoDB (Cloud or Local)

🚀 Features
✅ User Registration (Sign Up)
✅ User Login with JWT Authentication
✅ Protected Routes (e.g., /home)
✅ Auto Redirect Based on Login Status
✅ Logout Functionality
✅ Password hashing using Bcrypt

📦 Installation

1. Clone the repository
   git clone https://github.com/hardiklakum20/authantication_mernStack.git
   cd authantication_mernStack

2. Setup Backend
   cd backend
   npm install

Create a .env file inside /backend:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Then run the server:
npm start

3. Setup Frontend
   cd ../frontend
   npm install
   npm start
