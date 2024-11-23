

# Employee Management System (MERN Stack)  

An authenticated MERN-based Employee Management System to **Create**, **Read**, **Update**, and **Delete** employee records. It includes user authentication and role-based access, built with **Vite**, **TailwindCSS**, and **Node.js**.

## Project Overview  

- **Frontend Repository**: [GitHub](https://github.com/techjmi/Deals_front)  
- **Frontend Deployed URL**: [deals-front.onrender.com](https://deals-front.onrender.com/)  
- **Backend Repository**: [GitHub](https://github.com/techjmi/Deals_Dray_Backend)  
- **Backend Deployed URL**: [deals-dray-backend.onrender.com](https://deals-dray-backend.onrender.com/)  

---

## Features  

1. **User Authentication**:
   - **Signup**, **Login**, and **Logout**.
   - Protected routes using JWT for secure access.
2. **Employee Management**:
   - Create, View, Update, and Delete employee records.
   - List all employees with role-based restrictions.
3. **Frontend**:
   - Built with **Vite** and **TailwindCSS** for fast development and beautiful UI.
4. **Backend**:
   - Node.js and Express.js for API handling.
   - MongoDB for database management.

---

## Folder Structure  

### **Frontend** (Deals_front)
```
Deals_front/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages (e.g., Login, Dashboard, etc.)
│   ├── services/      # API service functions
│   ├── context/       # Context API for global state management
│   └── main.jsx       # Main entry point for React
├── tailwind.config.js # TailwindCSS configuration
└── vite.config.js     # Vite configuration
```

### **Backend** (Deals_Dray_Backend)
```
Deals_Dray_Backend/
├── server/
│   ├── controller/    # Logic for authentication and employee operations
│   ├── model/         # Mongoose schemas for User and Employee
│   ├── routes/        # API route definitions
│   ├── database/      # MongoDB connection setup
│   ├── utils/         # Utility functions (e.g., auth.js for JWT verification)
│   └── index.js       # Entry point for the server
├── .env               # Environment variables (JWT_SECRET, MONGO_URI)
└── package.json       # Backend dependencies
```

---

## Installation Guide  

### Prerequisites  
- Node.js (v16+ recommended)  
- MongoDB (local or cloud, e.g., MongoDB Atlas)  
- Git  

### 1. Clone Repositories  

```bash
# Clone Frontend
git clone https://github.com/techjmi/Deals_front.git
cd Deals_front

# Clone Backend
git clone https://github.com/techjmi/Deals_Dray_Backend.git
cd Deals_Dray_Backend
```

---

### 2. Setup Backend  

#### Install Dependencies:  
```bash
cd Deals_Dray_Backend
npm install
```

#### Create `.env` File:  
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
```

#### Run Backend:  
```bash
node server/index.js
```

The backend will run on `http://localhost:5000` (or your defined port).

---

### 3. Setup Frontend  

#### Install Dependencies:  
```bash
cd Deals_front
npm install
```

#### Start Development Server:  
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## API Documentation  

### **Base URL**
- Local: `http://localhost:5000/api`
- Deployed: [deals-dray-backend.onrender.com/api](https://deals-dray-backend.onrender.com/api)

### **Authentication Endpoints**  

#### **POST /api/auth/signup**  
Create a new user.  

**Request Body**:  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**:  
```json
{
  "success": true,
  "message": "User registered successfully!"
}
```

---

#### **POST /api/auth/login**  
Authenticate a user.  

**Request Body**:  
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**:  
```json
{
  "success": true,
  "token": "<JWT_Token>",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### **POST /api/auth/logout**  
Log out the user (clears session).  

**Response**:  
```json
{
  "success": true,
  "message": "Logged out successfully!"
}
```

---

### **Employee Endpoints**  

#### **POST /api/employee/create**  
Create a new employee.  

**Headers**:  
`Authorization: Bearer <JWT_Token>`  

**Request Body**:  
```json
{
  "name": "Jane Doe",
  "position": "Software Engineer",
  "salary": 75000
}
```

**Response**:  
```json
{
  "success": true,
  "message": "Employee created successfully!",
  "employee": {
    "id": "employee_id",
    "name": "Jane Doe",
    "position": "Software Engineer",
    "salary": 75000
  }
}
```

---

#### **GET /api/employee/emp_list**  
Get all employees.  

**Headers**:  
`Authorization: Bearer <JWT_Token>`  

**Response**:  
```json
{
  "success": true,
  "employees": [
    {
      "id": "employee_id",
      "name": "Jane Doe",
      "position": "Software Engineer",
      "salary": 75000
    }
  ]
}
```

---

#### **GET /api/employee/employee/:id**  
Fetch employee details by ID.  

**Headers**:  
`Authorization: Bearer <JWT_Token>`  

**Response**:  
```json
{
  "success": true,
  "employee": {
    "id": "employee_id",
    "name": "Jane Doe",
    "position": "Software Engineer",
    "salary": 75000
  }
}
```

---

#### **PUT /api/employee/emp_edit/:id**  
Edit employee details by ID.  

**Headers**:  
`Authorization: Bearer <JWT_Token>`  

**Request Body**:  
```json
{
  "name": "Jane Smith",
  "position": "Senior Engineer",
  "salary": 85000
}
```

**Response**:  
```json
{
  "success": true,
  "message": "Employee updated successfully!"
}
```

---

#### **DELETE /api/employee/emp_delete/:id**  
Delete an employee by ID.  

**Headers**:  
`Authorization: Bearer <JWT_Token>`  

**Response**:  
```json
{
  "success": true,
  "message": "Employee deleted successfully!"
}
```

---

## Testing with Postman  

1. **Setup Authorization**:  
   - For protected routes, include the JWT token in the headers:  
     `Authorization: Bearer <JWT_Token>`.  

2. **API Collection**:  
   - Import the provided Postman collection file (if available) for faster testing.  

---

## Deployment  

### **Frontend**  
Deployed on Render: [https://deals-front.onrender.com](https://deals-front.onrender.com/)  

### **Backend**  
Deployed on Render: [https://deals-dray-backend.onrender.com](https://deals-dray-backend.onrender.com/)  

---

## Technologies Used  

- **Frontend**: React, Vite, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ORM)  
- **Authentication**: JWT  

---

