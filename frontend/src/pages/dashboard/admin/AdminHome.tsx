import React from 'react';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  BookOpenIcon, 
  BuildingLibraryIcon,
  ChartBarIcon,
  CalendarDaysIcon 
} from '@heroicons/react/24/outline';

const AdminHome: React.FC = () => {
  const stats = [
    { name: 'Total Students', value: '1,247', icon: UserGroupIcon, color: 'bg-blue-500' },
    { name: 'Total Faculty', value: '89', icon: AcademicCapIcon, color: 'bg-green-500' },
    { name: 'Total Courses', value: '156', icon: BookOpenIcon, color: 'bg-purple-500' },
    { name: 'Departments', value: '12', icon: BuildingLibraryIcon, color: 'bg-orange-500' },
  ];

  const quickActions = [
    { name: 'Create New Student', href: '/dashboard/admin/users/create-student', color: 'bg-blue-600' },
    { name: 'Create New Faculty', href: '/dashboard/admin/users/create-faculty', color: 'bg-green-600' },
    { name: 'Add New Course', href: '/dashboard/admin/courses/create', color: 'bg-purple-600' },
    { name: 'Manage Semesters', href: '/dashboard/admin/academic/semesters', color: 'bg-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarDaysIcon className="h-4 w-4" />
          <span>Academic Year 2024-2025</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} rounded-md p-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className={`${action.color} text-white px-4 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity`}
              >
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserGroupIcon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900">New student registration completed</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900">Faculty member added to Computer Science department</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpenIcon className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900">New course "Advanced Algorithms" created</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Student Enrollment Trends</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Chart placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Faculty Distribution</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Chart placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;