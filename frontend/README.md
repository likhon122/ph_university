# PH University Frontend

A modern React TypeScript frontend application for PH University management system.

## Features

- **Student Management**: View, create, and manage student records
- **User Account Integration**: Create students with associated user accounts
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Type Safety**: Full TypeScript implementation with type checking
- **Modern UI**: Clean, professional interface with form validation

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Create React App** as build tool

## Available Endpoints

The frontend integrates with the following backend API endpoints:

### Students
- `GET /api/v1/students/get-all-students` - Fetch all students
- `POST /api/v1/students/add-student` - Add a new student directly

### Users
- `POST /api/v1/users/create-student` - Create a student with user account

## Pages

1. **Student List** (`/` or `/students`)
   - Displays all students in a responsive table
   - Shows student details, contact info, academic info, and guardian details
   - Includes refresh functionality and error handling

2. **Add Student** (`/create-student`)
   - Simple form to add a student directly to the student collection
   - Requires basic student information and academic details

3. **Create Student with User** (`/create-student-with-user`)
   - Comprehensive form to create a complete student profile
   - Includes user account creation with password
   - Captures full student details including guardian and local guardian information

## Setup and Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**
   - Set `REACT_APP_API_URL` in `.env` to your backend API URL (default: `http://localhost:3000/api/v1`)

3. **Start development server:**
   ```bash
   npm start
   ```
   The application will open at http://localhost:3000

4. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL (default: http://localhost:3000/api/v1)

## API Integration

The frontend uses Axios for HTTP requests with:
- Automatic request/response interceptors
- Error handling and user feedback
- TypeScript interfaces matching backend schemas
- Loading states and success notifications

## Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Collapsible navigation for mobile devices
- Responsive tables and forms
- Touch-friendly interface elements