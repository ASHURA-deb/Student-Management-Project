import { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "sonner";

export default function AddStudent({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    dob: '',
    photo: '',
    gender: 'Male',
    nationality: '',
    languages: '',
    enrolment_year: '',
    class: '',
    status: 'Active',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.student_id || !formData.name) {
        toast.error("Student ID and Name are required");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("http://localhost:5000/students", formData);
      
      // Reset form
      setFormData({
        student_id: "",
        name: "",
        dob: "",
        photo: "",
        gender: "Male",
        nationality: "",
        languages: "",
        enrolment_year: "",
        class: "",
        status: "Active",
      });
      
      // Show success message
      toast.success('Student added successfully!');
      
      // Call onStudentAdded if it's provided
      if (onStudentAdded && typeof onStudentAdded === 'function') {
        onStudentAdded();
      }
      
    } catch (err) {
      console.error("Error adding student:", err);
      toast.error(err.response?.data?.error || "Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  // The rest of your component remains the same...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Navbar />
      
      <div className="p-6 py-12 flex flex-col items-center justify-center">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Add New Student
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fill in the student information below to add them to the system
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-6xl w-full mx-auto">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Student Information
            </h2>
            <p className="text-blue-100 mt-1">Please provide accurate information for the new student</p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Student ID */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Student ID *
                </label>
                <input
                  type="text"
                  name="student_id"
                  placeholder="Enter unique student ID"
                  value={formData.student_id}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter student's full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Photo URL */}
<div className="space-y-2">
  <label className="text-sm font-semibold text-gray-700 flex items-center">
    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    Photo URL
  </label>
  <input
    type="text"
    name="photo"
    placeholder="Enter photo URL (optional)"
    value={formData.photo}
    onChange={handleChange}
    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
  />

  {/* ✅ Show preview if a photo URL exists */}
  {formData.photo && (
    <img
      src={formData.photo}
      alt="Preview"
      className="mt-3 w-24 h-24 rounded-full object-cover border shadow"
      onError={(e) => (e.target.style.display = "none")} // hide if URL is invalid
    />
  )}
</div>


              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 极 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 极 0 11-6 极 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Nationality */}
              <div className="space极y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2极h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  placeholder="Enter nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Languages
                </label>
                <input
                  type="text"
                  name="languages"
                  placeholder="Enter languages (comma separated)"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Enrolment Year */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="极 0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4极V3m-9 8h10M5 21极h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Enrolment Year
                </label>
                <input
                  type="number"
                  name="enrolment_year"
                  placeholder="Enter enrolment year"
                  value={formData.enrolment_year}
                  onChange={handleChange}
                  min="1900"
                  max="2030"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Class */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253极v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  placeholder="Enter class/grade"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0极z" />
                  </svg>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 transition-all duration-200 hover:border-gray-300 appearance-none bg-white"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Graduated</option>
                  <option>Dropped</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white px-8 py-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center text-lg min-w-[200px] justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Student...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" view极="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Student
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Fields marked with * are required. All information can be updated later from the manage students page.
          </p>
        </div>
      </div>
    </div>
  );
}