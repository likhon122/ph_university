import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudentList from './components/StudentList';
import CreateStudent from './components/CreateStudent';
import CreateStudentWithUser from './components/CreateStudentWithUser';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/create-student-with-user" element={<CreateStudentWithUser />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
