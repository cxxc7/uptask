# 🚀 MERN Task Manager 📝

A full-featured **Task Manager** app built with the powerful **MERN stack** — MongoDB, Express, React, Node.js — designed to help you stay productive and organized. 💼✨

---

## 🔥 Features

- 🔐 User registration & login (JWT authentication)
- ➕ Create, ✏️ edit, 🗑️ delete, and 🎯 filter tasks
- 📊 Priority levels: low 🟢, medium 🟡, high 🔴
- 📌 Status options: pending ⏳, completed ✅
- 💻 Responsive UI with 🌙 dark mode
- 🔔 Toast notifications for actions

---

## 📁 Folder Structure

```
/root
- backend: Express API, MongoDB models, routes, controllers
- client: React frontend (Redux Toolkit, React Router, Tailwind CSS)
```

---

## ⚙️ Getting Started

### 1️⃣ MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a new project and cluster.
3. Add a database named `taskmanager` with collections:
   - `users`
   - `tasks`
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Create a database user and password.
6. Copy the connection URI and set it in `/backend/.env` as `MONGODB_URI`.

---

### 2️⃣ Environment Variables

Create a `.env` file inside the `/backend` directory and add the following:

```
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

---

### 3️⃣ Running the App

#### ▶️ Backend

```
cd backend
npm install
node server.js
```

#### 💻 Frontend

```
cd client
npm install
npm run dev
```

---

### 4️⃣ Usage

- Register a new user 🔐
- Log in and manage your tasks 🗂️
- Filter by priority 🔴🟡🟢 or status ⏳✅
- Enjoy a responsive and themed UI 🌙☀️

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Frontend

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- react-toastify

---

## ✅ Best Practices

- 🧩 Modular code structure
- 🔒 Secure authentication (JWT, bcrypt)
- 📱 Responsive design
- 🌈 Color-coded task priorities
- 🌚 Dark mode support
- ♿ Accessible and semantic UI

---

## 📚 Notes

For more details, explore:

- Inline code comments
- Additional README files (if any) inside `/client` and `/backend`

---

Built with ❤️ using the MERN stack.
