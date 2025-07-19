import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AppDispatch } from '../../store';
import { createStudent } from '../../store/slices/userSlice';

interface StudentFormData {
  id: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: string;
  guardianFirstName: string;
  guardianMiddleName: string;
  guardianLastName: string;
  guardianEmail?: string;
  guardianContactNo: string;
  guardianRelation: string;
  guardianPresentAddress: string;
  guardianPermanentAddress: string;
  localGuardianFirstName: string;
  localGuardianMiddleName: string;
  localGuardianLastName: string;
  localGuardianEmail?: string;
  localGuardianContactNo: string;
  localGuardianRelation: string;
  localGuardianPresentAddress: string;
  localGuardianPermanentAddress: string;
  designation: string;
  academicDepartment: string;
  admissionSemester: string;
}

const CreateStudentForm: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StudentFormData>();

  const onSubmit = async (data: StudentFormData) => {
    try {
      const formData = new FormData();
      
      // Prepare the student data object
      const studentData = {
        password: data.password,
        student: {
          id: data.id,
          name: {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
          },
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          contactNo: data.contactNo,
          emergencyContactNo: data.emergencyContactNo,
          presentAddress: data.presentAddress,
          permanentAddress: data.permanentAddress,
          bloodGroup: data.bloodGroup,
          guardian: {
            name: {
              firstName: data.guardianFirstName,
              middleName: data.guardianMiddleName,
              lastName: data.guardianLastName,
            },
            email: data.guardianEmail,
            contactNo: data.guardianContactNo,
            relation: data.guardianRelation,
            address: {
              presentAddress: data.guardianPresentAddress,
              permanentAddress: data.guardianPermanentAddress,
            },
          },
          localGuardian: {
            name: {
              firstName: data.localGuardianFirstName,
              middleName: data.localGuardianMiddleName,
              lastName: data.localGuardianLastName,
            },
            email: data.localGuardianEmail,
            contactNo: data.localGuardianContactNo,
            relation: data.localGuardianRelation,
            address: {
              presentAddress: data.localGuardianPresentAddress,
              permanentAddress: data.localGuardianPermanentAddress,
            },
          },
          designation: data.designation,
          academicDepartment: data.academicDepartment,
          admissionSemester: data.admissionSemester,
        },
      };

      formData.append('data', JSON.stringify(studentData));
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      await dispatch(createStudent(formData)).unwrap();
      toast.success('Student created successfully!');
      navigate('/dashboard/admin/users');
    } catch (error: any) {
      toast.error(error || 'Failed to create student');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Create New Student</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  {...register('id', { required: 'Student ID is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.id && <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  {...register('middleName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  {...register('contactNo', { required: 'Contact number is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.contactNo && <p className="mt-1 text-sm text-red-600">{errors.contactNo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  {...register('emergencyContactNo', { required: 'Emergency contact is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.emergencyContactNo && <p className="mt-1 text-sm text-red-600">{errors.emergencyContactNo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  {...register('bloodGroup')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Present Address
                </label>
                <textarea
                  {...register('presentAddress', { required: 'Present address is required' })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.presentAddress && <p className="mt-1 text-sm text-red-600">{errors.presentAddress.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Address
                </label>
                <textarea
                  {...register('permanentAddress', { required: 'Permanent address is required' })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.permanentAddress && <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.message}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  {...register('designation', { required: 'Designation is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Department
                </label>
                <select
                  {...register('academicDepartment', { required: 'Academic department is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="CS">Computer Science</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                </select>
                {errors.academicDepartment && <p className="mt-1 text-sm text-red-600">{errors.academicDepartment.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Semester
                </label>
                <select
                  {...register('admissionSemester', { required: 'Admission semester is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Semester</option>
                  <option value="Fall2024">Fall 2024</option>
                  <option value="Spring2024">Spring 2024</option>
                  <option value="Summer2024">Summer 2024</option>
                </select>
                {errors.admissionSemester && <p className="mt-1 text-sm text-red-600">{errors.admissionSemester.message}</p>}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian First Name
                </label>
                <input
                  type="text"
                  {...register('guardianFirstName', { required: 'Guardian first name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.guardianFirstName && <p className="mt-1 text-sm text-red-600">{errors.guardianFirstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian Last Name
                </label>
                <input
                  type="text"
                  {...register('guardianLastName', { required: 'Guardian last name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.guardianLastName && <p className="mt-1 text-sm text-red-600">{errors.guardianLastName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian Contact
                </label>
                <input
                  type="tel"
                  {...register('guardianContactNo', { required: 'Guardian contact is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.guardianContactNo && <p className="mt-1 text-sm text-red-600">{errors.guardianContactNo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relation
                </label>
                <input
                  type="text"
                  {...register('guardianRelation', { required: 'Relation is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.guardianRelation && <p className="mt-1 text-sm text-red-600">{errors.guardianRelation.message}</p>}
              </div>
            </div>
          </div>

          {/* Local Guardian Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Local Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Guardian First Name
                </label>
                <input
                  type="text"
                  {...register('localGuardianFirstName', { required: 'Local guardian first name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.localGuardianFirstName && <p className="mt-1 text-sm text-red-600">{errors.localGuardianFirstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Guardian Last Name
                </label>
                <input
                  type="text"
                  {...register('localGuardianLastName', { required: 'Local guardian last name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.localGuardianLastName && <p className="mt-1 text-sm text-red-600">{errors.localGuardianLastName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Guardian Contact
                </label>
                <input
                  type="tel"
                  {...register('localGuardianContactNo', { required: 'Local guardian contact is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.localGuardianContactNo && <p className="mt-1 text-sm text-red-600">{errors.localGuardianContactNo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relation
                </label>
                <input
                  type="text"
                  {...register('localGuardianRelation', { required: 'Relation is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.localGuardianRelation && <p className="mt-1 text-sm text-red-600">{errors.localGuardianRelation.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentForm;