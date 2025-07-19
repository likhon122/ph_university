import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFacultyForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Create New Faculty</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">Faculty creation form will be implemented here.</p>
          
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/dashboard/admin/users')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Create Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFacultyForm;