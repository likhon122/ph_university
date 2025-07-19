import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            
            {/* Protected Routes */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="student/*" element={<StudentDashboard />} />
                    <Route path="faculty/*" element={<FacultyDashboard />} />
                    <Route path="admin/*" element={<AdminDashboard />} />
                    <Route path="/" element={<Navigate to="/dashboard/admin" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
