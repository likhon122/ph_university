import React from 'react';

interface NavigationProps {
  activeTab: 'register' | 'list';
  onTabChange: (tab: 'register' | 'list') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">PH University</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onTabChange('register')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              Register Student
            </button>
            <button
              onClick={() => onTabChange('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              View Students
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;