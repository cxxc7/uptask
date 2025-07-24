# MERN Task Manager

A full-featured Task Manager app built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User registration & login (JWT authentication)
- Create, edit, delete, and filter tasks
- Priority levels (low, medium, high)
- Status (pending, completed)
- Responsive UI with dark mode
- Toast notifications for actions

## Folder Structure
- `/backend` — Express API, MongoDB models, routes, controllers
- `/client` — React frontend (Redux Toolkit, React Router, Tailwind CSS)

## Getting Started

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a new project and cluster.
3. Add a database named `taskmanager` with collections `users` and `tasks`.
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Create a database user and password.
6. Copy the connection URI and set it in `/backend/.env` as `MONGODB_URI`.

### 2. Environment Variables
In `/backend/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

### 3. Running the App
#### Backend
```
cd backend
npm install
node server.js
```
#### Frontend
```
cd client
npm install
npm run dev
```

### 4. Usage
- Register a new user, log in, and manage your tasks!

---

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS, react-toastify

## Best Practices
- Modular code structure
- Secure password hashing & JWT
- Responsive, accessible UI
- Dark mode & color-coded priorities

---

For more details, see code comments and each folder's README (if present).
