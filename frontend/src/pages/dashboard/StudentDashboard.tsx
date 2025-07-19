import React from 'react';

const StudentDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <p className="text-gray-600">View enrolled courses and academic progress</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Course Enrollment</h2>
          <p className="text-gray-600">Register for available courses</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <p className="text-gray-600">Update personal information</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;