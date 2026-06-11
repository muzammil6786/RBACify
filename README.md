# Role-Based Task Management System (TaskFlow)

A full-stack task management application built with **Node.js, Express, MongoDB, and React.js** implementing **Role-Based Access Control (RBAC)**, **User Activity Tracking**, and an **Admin Dashboard** for monitoring users and tasks.

---
## Deployed Links

* **Frontend Live:**
  https://taskflow-two-hazel-38.vercel.app/

* **Backend Live:**
  https://rbacify.onrender.com

## Demo Credentials Admin Access

* Email: `khan@gmail.com`
* Password: `khan`

> Note: These credentials are provided only for testing and demonstration purposes.


## Features

### Backend (Node.js + MongoDB)

### Authentication & Authorization

* JWT-based authentication
* Protected routes using middleware
* Role-based access control (Admin / User)

### User Roles

* **Admin**

  * View all users
  * Delete users
  * Update user status (Active / Inactive)
  * View all tasks
  * Update tasks
  * Manage users

* **User**

  * Create own tasks
  * View own tasks only
  * Update own tasks
  * Delete own tasks

---

### Admin APIs

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | `/api/admin/users`            | View all users      |
| DELETE | `/api/admin/users/:id`        | Delete user         |
| PUT  | `/api/admin/users/:id/status` | Update user status  |
| GET    | `/api/admin/tasks`            | View all user tasks |

---

### Activity Log System

Tracks and stores the following activities:

* User Login
* Task Creation
* Task Update
* Task Deletion
* User Management Actions

Example Log:

```json
{
  "userId": "123",
  "action": "TASK_CREATED",
  "timestamp": "2026-06-11"
}
```

---

### Authorization Middleware

Implemented middleware for:

* Protected Routes
* Admin-only Access
* Ownership Validation

Example:

```javascript
router.use(authMiddleware);

router.delete(
  "/admin/users/:id",
  adminMiddleware,
  deleteUser
);
```

---

## Frontend (React.js)

### Admin Dashboard

Admin pages include:

* User Management
* Task Monitoring
* Activity Logs
* Analytics Dashboard

---

### Role-Based UI

Implemented:

* Admin menu visibility only for Admin users
* Unauthorized page protection
* Conditional rendering based on roles

---

### Analytics Section

Dashboard displays:

* Total Users
* Total Tasks
* Completed Tasks
* Pending Tasks

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Backend

```bash
cd backend
npm install
npm run dev
```

### Install Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

---

## Expected Deliverables

* Working Role-Based Authentication
* Admin Dashboard with Proper Access Control
* Proper API Integration
* Activity Tracking System

---

## Project Structure

```plaintext
backend/
│src--|
      ├── controllers/
      ├── routes/
      ├── middleware/
      ├── models/
      ├── utils/
      └── server.js

frontend/
│src--|
      ├── pages/
      ├── components/
      ├── services/
      ├── context/
      └── App.jsx
```

---

Built by Muzammil Raza Khan.
