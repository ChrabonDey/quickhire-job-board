# QuickHire - Simple Job Board Application

QuickHire is a modern, premium job board application built with **Next.js 15**, **Node.js/Express**, and **MongoDB**. It features a stunning responsive UI, real-time job filtering, and a powerful admin dashboard.

## 🚀 Features

### Frontend (Next.js)
- **Dynamic Job Listings**: Search by keyword and filter by category or location.
- **Premium UI/UX**: Designed with a high-end SaaS aesthetic using Tailwind CSS.
- **Smooth Navigation**: Server-side rendering and client-side transitions for a snappy feel.
- **"Apply Now" System**: Fully functional application form with real-time validation.
- **Admin Dashboard**: Manage job listings (Create/Delete) and view incoming applications.
- **Authentication**: JWT-based Login/Signup system with role-based access control.

### Backend (Node.js/Express)
- **RESTful API**: Cleanly organized endpoints for Jobs, Applications, and Auth.
- **Database**: Mongoose for data persistence and population.
- **Security**: Password hashing with `bcryptjs` and protected routes with `jsonwebtoken`.
- **Validation**: Sanitized inputs and server-side validation for emails and URLs.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express, TypeScript, Mongoose.
- **Database**: MongoDB (Local or Atlas).

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a URI from Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd new-task
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/quickhire
   JWT_SECRET=your_super_secret_key
   ```
4. Seed the database with premium AI data:
   ```bash
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the Next.js app:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application!

---

## 🔑 Admin Access
To access the Admin Dashboard:
1. Sign up as a regular user.
2. Manually change the `role` to `'admin'` in your MongoDB collection (for local dev) OR use the provided seed data if an admin was included.
3. Access `/admin` from the navigation bar.

## 📁 Folder Structure
```text
.
├── client/              # Next.js Frontend
│   ├── src/app/        # Pages and Layouts
│   ├── src/components/ # Reusable UI Components
│   └── src/services/   # API logic
└── server/              # Node.js/Express Backend
    ├── src/models/     # Mongoose Schemas
    ├── src/controllers/# Route Handlers
    └── src/routes/     # API Endpoints
```

---

## ✅ Task Completion Checklist
- [x] Responsive Home Page (Figma match)
- [x] Dynamic Job Search & Filtering
- [x] Detailed Job View & Application Form
- [x] Admin Panel (Create/Delete Jobs)
- [x] JWT Authentication & Protected Routes
- [x] Backend Validation (Email, URL)
- [x] Premium AI-generated Assets
- [x] Clean, Modular Codebase

---
*Created with ❤️ by Antigravity*
