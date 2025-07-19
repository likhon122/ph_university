import React from 'react';

const FacultyDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Faculty Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <p className="text-gray-600">Manage assigned courses and curriculum</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Students</h2>
          <p className="text-gray-600">View and manage enrolled students</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Schedule</h2>
          <p className="text-gray-600">View teaching schedule and assignments</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;