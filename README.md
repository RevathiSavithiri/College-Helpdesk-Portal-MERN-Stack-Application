# College Helpdesk Portal – MERN Stack Application

The College Helpdesk Portal is a full-stack MERN application that implements a helpdesk-style ticketing workflow inspired by real-world systems used in educational institutions.
It enables structured communication between students and administrators through secure authentication, role-based access control, and RESTful APIs.

This project was built to demonstrate end-to-end application design, secure backend architecture, and structured frontend routing using React Router.

---

## 🚀 Project Overview

In many colleges, student queries are handled informally through emails or messaging apps, leading to poor tracking and delayed responses.
This application solves that problem by introducing a centralized helpdesk system where:

- Students can raise and track support tickets

- Administrators can manage, respond to, and resolve issues efficiently

- Access is strictly controlled based on user roles

The system closely mirrors real-world helpdesk workflows used in organizations.

---

## 🔑 Core Features

### Student Module

- Secure login using roll number or email

- Raise tickets with detailed issue descriptions

- View submitted tickets and their current status

- Role-based access control (student-only routes)

### Admin Module

- Secure admin authentication

- Centralized dashboard to view all tickets

- Update ticket status (Open → In Progress → Resolved)

- Add and manage student accounts (admin-only access)

- Protected admin routes using JWT authentication

### System-Wide Features

- RESTful API design

- Clear separation of frontend and backend

- User feedback via notification system

- Admin-controlled email communication using EmailJS

- Email replies sent to students when admins compose and submit responses

- Acknowledgement emails are sent when queries are forwarded or require additional review

- Admin-side filtering by ticket ID, student name, and description

- Sorting tickets by newest and oldest

---

## 🧠 Technical Architecture

- Frontend handles UI, routing, and state management

- Backend exposes secured REST APIs

- Authentication is handled using JWT, with protected backend routes enforcing role-based access control

- Database layer persists users and ticket data using MongoDB

- Passwords are securely hashed using bcrypt before storage

This separation ensures maintainability, scalability, and clean responsibility boundaries.

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Context API
- Custom CSS

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication & authorization
- bcrypt for password hashing

### Database

- MongoDB (configured for local development)

## 📁 Project Structure

```text
client/
 ├── src/
 │   ├── components/      # Reusable UI components
 │   ├── pages/           # Page-level components
 │   ├── context/         # Global state (Auth, Notifications)
 │   ├── services/        # API calls
 │   └── utils/           # Helpers & constants

server/
 ├── controllers/         # Request handling logic
 ├── models/              # Mongoose schemas
 ├── routes/              # API route definitions
 ├── middleware/          # Auth & role-based protection
 └── config/              # DB & environment config

```

---

## ⚙️ Project Setup

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm start
```

⚠️ node_modules are excluded from the repository. Run `npm install` in both client and server before starting.

---

## 📷 Application Screenshots

### Login

![Login](client/src/screenshots/LoginPage.png)

### Student Dashboard

![Student Dashboard](client/src/screenshots/HomePage.png)

### Raise Ticket

![Raise Ticket](client/src/screenshots/RaiseTicketPage.png)

### My Tickets

![My Tickets](client/src/screenshots/MyTicketPage.png)

### Admin Dashboard

![Admin Dashboard](client/src/screenshots/AdminDashboardPage.png)

### Admin AddStudent

![Admin Dashboard](client/src/screenshots/AdminAddStudentPage.png)

---

## 👩‍💻 Author

**Revathi Savithiri**  
🔗 GitHub: https://github.com/RevathiSavithiri
