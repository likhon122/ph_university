import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import CreateStudentForm from '../../../components/forms/CreateStudentForm';
import CreateFacultyForm from '../../../components/forms/CreateFacultyForm';
import CreateAdminForm from '../../../components/forms/CreateAdminForm';

const UserManagement: React.FC = () => {
  const location = useLocation();
  const isCreatePath = location.pathname.includes('/create');

  const userTypes = [
    { name: 'Students', count: 1247, href: '/dashboard/admin/users/students', color: 'text-blue-600' },
    { name: 'Faculty', count: 89, href: '/dashboard/admin/users/faculty', color: 'text-green-600' },
    { name: 'Admins', count: 12, href: '/dashboard/admin/users/admins', color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        {!isCreatePath && (
          <div className="flex space-x-3">
            <Link
              to="/dashboard/admin/users/create-student"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Student
            </Link>
            <Link
              to="/dashboard/admin/users/create-faculty"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Faculty
            </Link>
            <Link
              to="/dashboard/admin/users/create-admin"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Admin
            </Link>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={
          <div>
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {userTypes.map((type) => (
                <Link
                  key={type.name}
                  to={type.href}
                  className="bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserGroupIcon className={`h-8 w-8 ${type.color}`} />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{type.name}</dt>
                          <dd className="text-2xl font-semibold text-gray-900">{type.count}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Users */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample data - would be replaced with real data */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">JD</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                            <div className="text-sm text-gray-500">john.doe@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Student
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 days ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        } />
        <Route path="/create-student" element={<CreateStudentForm />} />
        <Route path="/create-faculty" element={<CreateFacultyForm />} />
        <Route path="/create-admin" element={<CreateAdminForm />} />
      </Routes>
    </div>
  );
};

export default UserManagement;