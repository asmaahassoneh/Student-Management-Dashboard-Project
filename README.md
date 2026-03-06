# Student Management Dashboard

A full-stack **Student Management Dashboard** built with **React (Frontend)** and **Flask (Backend)**.

This project was created as part of training to practice building a full-stack application with authentication, protected routes, form validation, and deployment.

---

# 🚀 Features

- User authentication (Login / Logout)
- User registration
- Protected routes
- Role-based access control
- Admin-only student management
- Add, view, update, and delete students
- Search students
- Filter students by major
- Pagination for student list
- Form validation using **react-hook-form** and **Yup**
- Reusable UI components
- Error handling and loading states
- Deployed frontend and backend
---
## 🔐 Access Control

- Regular users can **register and log in**, but they cannot access admin pages.
- Only **admin users** can access the student dashboard and manage students.
---
## 👤 Default Admin Login

For training purposes, a default admin account was created:

- **Email:** admin@gmail.com  
- **Password:** 123456  

This account allows access to the **admin student dashboard**.

---
## 🌐 Live Demo

- **Frontend:** https://student-management-dashboard-projec.vercel.app  
- **Backend:** https://student-management-dashboard-project.onrender.com 

---

## 📝 Notes

- Only **admin users** can access the student dashboard.
- Students are managed through the **Flask backend API**.
- Axios interceptors automatically attach **JWT tokens** to requests.
---

# 🧰 Tech Stack

## Frontend

- React
- React Router
- Context API
- Axios
- React Hook Form
- Yup
- React Toastify

## Backend

- Flask
- Flask SQLAlchemy
- Flask Migrate
- JWT Authentication
- SQLite / PostgreSQL

---

# 📁 Project Structure

```text
project-root/
│
├── client/
│   ├── src/
│   ├── package.json
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── app.py
│   ├── requirements.txt
│
├── screenshots/
│
└── README.md
```
---

# ⚙️ Setup Instructions
## 1️⃣ Clone the Repository
```bash
git clone https://github.com/asmaahassoneh/Student-Management-Dashboard-Project.git 
cd student-management-dashboard
```
---
## 💻 Frontend Setup

Navigate to the client folder:
```bash
cd client
```

Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
---
## 🖥 Backend Setup

Navigate to the server folder:
```bash
cd server
```

Create a virtual environment:
```bash
python -m venv venv
```
Activate the environment (Windows):
```bash
venv\Scripts\activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```
Run the backend server:
```bash
python app.py
```
---
## 🔐 Environment Variables
### Frontend

Create a `.env` file inside **client/**
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_FALLBACK_API_BASE_URL=http://localhost:3001
```
### Backend

Create a `.env` file inside **server/**
```bash
SECRET_KEY=dev_super_secret_key_32_chars_minimum!!!
DATABASE_URL=postgresql+psycopg2://postgresUserName:postgresPass@localhost:5433/DBname
JWT_EXPIRES_SECONDS=3600
```
---

