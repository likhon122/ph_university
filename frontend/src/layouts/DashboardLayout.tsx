import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navigation = [
    ...(user?.role === 'admin' ? [
      { name: 'Dashboard', href: '/dashboard/admin', current: location.pathname === '/dashboard/admin' },
      { name: 'Users', href: '/dashboard/admin/users', current: location.pathname.includes('/users') },
      { name: 'Students', href: '/dashboard/admin/students', current: location.pathname.includes('/students') },
      { name: 'Faculty', href: '/dashboard/admin/faculty', current: location.pathname.includes('/faculty') },
      { name: 'Academic', href: '/dashboard/admin/academic', current: location.pathname.includes('/academic') },
      { name: 'Courses', href: '/dashboard/admin/courses', current: location.pathname.includes('/courses') },
    ] : []),
    ...(user?.role === 'faculty' ? [
      { name: 'Dashboard', href: '/dashboard/faculty', current: location.pathname === '/dashboard/faculty' },
      { name: 'My Courses', href: '/dashboard/faculty/courses', current: location.pathname.includes('/courses') },
      { name: 'Students', href: '/dashboard/faculty/students', current: location.pathname.includes('/students') },
    ] : []),
    ...(user?.role === 'student' ? [
      { name: 'Dashboard', href: '/dashboard/student', current: location.pathname === '/dashboard/student' },
      { name: 'My Courses', href: '/dashboard/student/courses', current: location.pathname.includes('/courses') },
      { name: 'Enrollment', href: '/dashboard/student/enrollment', current: location.pathname.includes('/enrollment') },
      { name: 'Profile', href: '/dashboard/student/profile', current: location.pathname.includes('/profile') },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">PH University</h1>
          </div>
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">PH University</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center gap-x-4 px-4">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1" />
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="flex items-center gap-x-2">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.email}</p>
                    <p className="text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;