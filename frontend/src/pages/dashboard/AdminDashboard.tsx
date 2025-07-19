import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './admin/AdminHome';
import UserManagement from './admin/UserManagement';
import StudentManagement from './admin/StudentManagement';
import FacultyManagement from './admin/FacultyManagement';
import AcademicManagement from './admin/AcademicManagement';
import CourseManagement from './admin/CourseManagement';

const AdminDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/users/*" element={<UserManagement />} />
      <Route path="/students/*" element={<StudentManagement />} />
      <Route path="/faculty/*" element={<FacultyManagement />} />
      <Route path="/academic/*" element={<AcademicManagement />} />
      <Route path="/courses/*" element={<CourseManagement />} />
    </Routes>
  );
};

export default AdminDashboard;