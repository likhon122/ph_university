import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateStudentRequest } from '../types';
import { studentAPI } from '../services/api';

const CreateStudentWithUser: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateStudentRequest>({
    password: '',
    student: {
      name: {
        firstName: '',
        middleName: '',
        lastName: ''
      },
      gender: 'male',
      dateOfBirth: '',
      email: '',
      contactNo: '',
      emergencyContactNo: '',
      presentAddress: '',
      permanentAddress: '',
      bloodGroup: undefined,
      guardian: {
        name: {
          firstName: '',
          middleName: '',
          lastName: ''
        },
        email: '',
        contactNo: '',
        relation: '',
        address: {
          presentAddress: '',
          permanentAddress: ''
        }
      },
      localGuardian: {
        name: {
          firstName: '',
          middleName: '',
          lastName: ''
        },
        email: '',
        contactNo: '',
        relation: '',
        address: {
          presentAddress: '',
          permanentAddress: ''
        }
      },
      designation: '',
      academicDepartment: '',
      admissionSemester: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await studentAPI.createStudentWithUser(formData);
      setSuccess(`Student and user created successfully! User ID: ${response.data.newUser.id}`);
      setTimeout(() => {
        navigate('/students');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'password') {
      setFormData(prev => ({ ...prev, password: value }));
      return;
    }
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData(prev => {
        const updated = { ...prev };
        let current: any = updated.student;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        return updated;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        student: { ...prev.student, [name]: value }
      }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Student with User</h3>
            <p className="mt-1 text-sm text-gray-600">
              Create a complete student profile with user account. This includes all student information and guardian details.
            </p>
          </div>
        </div>
        
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-8 sm:p-6">
                
                {/* Success/Error Messages */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="text-sm text-green-700">{success}</div>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {/* User Account Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Account</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter password for the user account"
                      />
                    </div>
                  </div>
                </div>

                {/* Student Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="name.firstName" className="block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="name.firstName"
                        required
                        value={formData.student.name.firstName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="name.middleName" className="block text-sm font-medium text-gray-700">
                        Middle Name *
                      </label>
                      <input
                        type="text"
                        name="name.middleName"
                        required
                        value={formData.student.name.middleName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="name.lastName" className="block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="name.lastName"
                        required
                        value={formData.student.name.lastName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        required
                        value={formData.student.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={formData.student.dateOfBirth}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.student.bloodGroup || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.student.email}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="contactNo"
                        required
                        value={formData.student.contactNo}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="emergencyContactNo" className="block text-sm font-medium text-gray-700">
                        Emergency Contact *
                      </label>
                      <input
                        type="tel"
                        name="emergencyContactNo"
                        required
                        value={formData.student.emergencyContactNo}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="presentAddress" className="block text-sm font-medium text-gray-700">
                        Present Address *
                      </label>
                      <input
                        type="text"
                        name="presentAddress"
                        required
                        value={formData.student.presentAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700">
                        Permanent Address *
                      </label>
                      <input
                        type="text"
                        name="permanentAddress"
                        required
                        value={formData.student.permanentAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                        Designation *
                      </label>
                      <input
                        type="text"
                        name="designation"
                        required
                        value={formData.student.designation}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Undergraduate Student"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="academicDepartment" className="block text-sm font-medium text-gray-700">
                        Academic Department *
                      </label>
                      <input
                        type="text"
                        name="academicDepartment"
                        required
                        value={formData.student.academicDepartment}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="admissionSemester" className="block text-sm font-medium text-gray-700">
                        Admission Semester *
                      </label>
                      <input
                        type="text"
                        name="admissionSemester"
                        required
                        value={formData.student.admissionSemester}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Fall 2024"
                      />
                    </div>
                  </div>
                </div>

                {/* Guardian Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="guardian.name.firstName" className="block text-sm font-medium text-gray-700">
                        Guardian First Name *
                      </label>
                      <input
                        type="text"
                        name="guardian.name.firstName"
                        required
                        value={formData.student.guardian.name.firstName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="guardian.name.middleName" className="block text-sm font-medium text-gray-700">
                        Guardian Middle Name *
                      </label>
                      <input
                        type="text"
                        name="guardian.name.middleName"
                        required
                        value={formData.student.guardian.name.middleName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="guardian.name.lastName" className="block text-sm font-medium text-gray-700">
                        Guardian Last Name *
                      </label>
                      <input
                        type="text"
                        name="guardian.name.lastName"
                        required
                        value={formData.student.guardian.name.lastName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="guardian.email" className="block text-sm font-medium text-gray-700">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        name="guardian.email"
                        value={formData.student.guardian.email}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="guardian.contactNo" className="block text-sm font-medium text-gray-700">
                        Guardian Contact *
                      </label>
                      <input
                        type="tel"
                        name="guardian.contactNo"
                        required
                        value={formData.student.guardian.contactNo}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="guardian.relation" className="block text-sm font-medium text-gray-700">
                        Relation *
                      </label>
                      <input
                        type="text"
                        name="guardian.relation"
                        required
                        value={formData.student.guardian.relation}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Father, Mother"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="guardian.address.presentAddress" className="block text-sm font-medium text-gray-700">
                        Guardian Present Address *
                      </label>
                      <input
                        type="text"
                        name="guardian.address.presentAddress"
                        required
                        value={formData.student.guardian.address.presentAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="guardian.address.permanentAddress" className="block text-sm font-medium text-gray-700">
                        Guardian Permanent Address *
                      </label>
                      <input
                        type="text"
                        name="guardian.address.permanentAddress"
                        required
                        value={formData.student.guardian.address.permanentAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Local Guardian Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Local Guardian Information</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="localGuardian.name.firstName" className="block text-sm font-medium text-gray-700">
                        Local Guardian First Name *
                      </label>
                      <input
                        type="text"
                        name="localGuardian.name.firstName"
                        required
                        value={formData.student.localGuardian.name.firstName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="localGuardian.name.middleName" className="block text-sm font-medium text-gray-700">
                        Local Guardian Middle Name *
                      </label>
                      <input
                        type="text"
                        name="localGuardian.name.middleName"
                        required
                        value={formData.student.localGuardian.name.middleName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="localGuardian.name.lastName" className="block text-sm font-medium text-gray-700">
                        Local Guardian Last Name *
                      </label>
                      <input
                        type="text"
                        name="localGuardian.name.lastName"
                        required
                        value={formData.student.localGuardian.name.lastName}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="localGuardian.email" className="block text-sm font-medium text-gray-700">
                        Local Guardian Email
                      </label>
                      <input
                        type="email"
                        name="localGuardian.email"
                        value={formData.student.localGuardian.email}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="localGuardian.contactNo" className="block text-sm font-medium text-gray-700">
                        Local Guardian Contact *
                      </label>
                      <input
                        type="tel"
                        name="localGuardian.contactNo"
                        required
                        value={formData.student.localGuardian.contactNo}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="localGuardian.relation" className="block text-sm font-medium text-gray-700">
                        Local Guardian Relation *
                      </label>
                      <input
                        type="text"
                        name="localGuardian.relation"
                        required
                        value={formData.student.localGuardian.relation}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Uncle, Family Friend"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="localGuardian.address.presentAddress" className="block text-sm font-medium text-gray-700">
                        Local Guardian Present Address *
                      </label>
                      <input
                        type="text"
                        name="localGuardian.address.presentAddress"
                        required
                        value={formData.student.localGuardian.address.presentAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="localGuardian.address.permanentAddress" className="block text-sm font-medium text-gray-700">
                        Local Guardian Permanent Address *
                      </label>
                      <input
                        type="text"
                        name="localGuardian.address.permanentAddress"
                        required
                        value={formData.student.localGuardian.address.permanentAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => navigate('/students')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Student with User'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentWithUser;