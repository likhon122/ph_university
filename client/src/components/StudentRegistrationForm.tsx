import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStudentValidation } from '../validation/studentValidation';
import type { StudentFormData } from '../validation/studentValidation';
import { studentService } from '../services/studentService';

const StudentRegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(createStudentValidation),
    defaultValues: {
      name: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
      gender: 'male',
      dateOfBirth: '',
      email: '',
      contactNo: '',
      emergencyContactNo: '',
      presentAddress: '',
      permanentAddress: '',
      bloodGroup: 'A+',
      guardian: {
        name: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        email: '',
        contactNo: '',
        relation: '',
        address: {
          presentAddress: '',
          permanentAddress: '',
        },
      },
      localGuardian: {
        name: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        email: '',
        contactNo: '',
        relation: '',
        address: {
          presentAddress: '',
          permanentAddress: '',
        },
      },
      designation: '',
      academicDepartment: '',
      admissionSemester: '',
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await studentService.createStudent({
        password: '123456', // Default password
        student: data,
      });
      
      setSubmitMessage({
        type: 'success',
        message: 'Student registered successfully!',
      });
      reset(); // Reset form after successful submission
    } catch (error: any) {
      setSubmitMessage({
        type: 'error',
        message: error.response?.data?.message || 'Failed to register student. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    required = false,
    ...rest 
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    [key: string]: any;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name as any)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...rest}
      />
      {errors[name as keyof typeof errors] && (
        <p className="mt-1 text-sm text-red-600">
          {(errors[name as keyof typeof errors] as any)?.message}
        </p>
      )}
    </div>
  );

  const SelectField = ({ 
    label, 
    name, 
    options, 
    required = false 
  }: {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    required?: boolean;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name as any)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name as keyof typeof errors] && (
        <p className="mt-1 text-sm text-red-600">
          {(errors[name as keyof typeof errors] as any)?.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Student Registration Form
      </h1>

      {submitMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitMessage.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {submitMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="First Name"
              name="name.firstName"
              required
            />
            <InputField
              label="Middle Name"
              name="name.middleName"
              required
            />
            <InputField
              label="Last Name"
              name="name.lastName"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Gender"
              name="gender"
              required
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              required
            />
            <SelectField
              label="Blood Group"
              name="bloodGroup"
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
              ]}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Contact Number"
              name="contactNo"
              required
            />
            <InputField
              label="Emergency Contact Number"
              name="emergencyContactNo"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Present Address"
              name="presentAddress"
              required
            />
            <InputField
              label="Permanent Address"
              name="permanentAddress"
              required
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Designation"
              name="designation"
              required
            />
            <InputField
              label="Academic Department"
              name="academicDepartment"
              required
            />
            <InputField
              label="Admission Semester"
              name="admissionSemester"
              placeholder="e.g., Fall 2024"
              required
            />
          </div>
        </div>

        {/* Guardian Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Guardian Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Guardian First Name"
              name="guardian.name.firstName"
              required
            />
            <InputField
              label="Guardian Middle Name"
              name="guardian.name.middleName"
              required
            />
            <InputField
              label="Guardian Last Name"
              name="guardian.name.lastName"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Guardian Email"
              name="guardian.email"
              type="email"
            />
            <InputField
              label="Guardian Contact"
              name="guardian.contactNo"
              required
            />
            <InputField
              label="Relation"
              name="guardian.relation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Guardian Present Address"
              name="guardian.address.presentAddress"
              required
            />
            <InputField
              label="Guardian Permanent Address"
              name="guardian.address.permanentAddress"
              required
            />
          </div>
        </div>

        {/* Local Guardian Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Local Guardian Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Local Guardian First Name"
              name="localGuardian.name.firstName"
              required
            />
            <InputField
              label="Local Guardian Middle Name"
              name="localGuardian.name.middleName"
              required
            />
            <InputField
              label="Local Guardian Last Name"
              name="localGuardian.name.lastName"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Local Guardian Email"
              name="localGuardian.email"
              type="email"
            />
            <InputField
              label="Local Guardian Contact"
              name="localGuardian.contactNo"
              required
            />
            <InputField
              label="Relation"
              name="localGuardian.relation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Local Guardian Present Address"
              name="localGuardian.address.presentAddress"
              required
            />
            <InputField
              label="Local Guardian Permanent Address"
              name="localGuardian.address.permanentAddress"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isSubmitting ? 'Registering...' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;