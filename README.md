# PH University Management System

A full-stack university management system built with Node.js, Express, React, TypeScript, and Tailwind CSS.

## Features

### Backend (Express + TypeScript)
- **RESTful API** with Express.js and TypeScript
- **MongoDB** database with Mongoose ODM
- **Zod validation** for request data validation
- **CORS** support for frontend integration
- **Error handling** with global error middleware

### Frontend (React + Tailwind CSS)
- **React + TypeScript** for type-safe frontend development
- **Tailwind CSS** for modern, responsive UI design
- **Client-side validation** using Zod schemas
- **Form management** with React Hook Form
- **API integration** with Axios
- **Responsive design** that works on all devices

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_ATLAS_URL=mongodb://localhost:27017/ph_university
FRONTEND_URL=http://localhost:3000
DEFAULT_PASSWORD=123456
BCRYPT_SALT_ROUNDS=12
```

3. Build and start the backend:
```bash
npm run build
npm start
```

For development:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

## API Endpoints

### Students
- `GET /api/v1/students/get-all-students` - Get all students
- `POST /api/v1/students/add-student` - Add a new student

### Users
- `POST /api/v1/users/create-student` - Create a new student with user account

## Project Structure

```
ph_university/
├── src/                    # Backend source code
│   ├── app/
│   │   ├── configs/        # Configuration files
│   │   ├── db/            # Database connection
│   │   ├── middleware/    # Express middleware
│   │   ├── modules/       # API modules (students, users)
│   │   ├── routes/        # Route definitions
│   │   └── utils/         # Utility functions
│   ├── app.ts             # Express app setup
│   └── server.ts          # Server entry point
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── validation/    # Zod validation schemas
│   │   └── ...
│   └── ...
├── dist/                  # Backend build output
└── ...
```

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Zod** - Schema validation
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **React Hook Form** - Form management
- **Zod** - Client-side validation
- **Axios** - HTTP client

## License

MIT License