import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { EditEmpApi, SingleEmp } from "../service/api";

const EditEmp = ({ getEmployeeById, }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    MobileNo: "",
    Designation: "",
    Gender: "",
    course: [],
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // For backend messages

  // Fetch employee details by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await SingleEmp(id);
        setEmployee(response); // Populate the form with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setMessage(error.response?.data?.message || "Failed to update employees.")
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle course checkbox change
  const handleCourseChange = (e) => {
    const { value } = e.target;
    setEmployee((prev) => {
      const updatedCourses = prev.course.includes(value)
        ? prev.course.filter((course) => course !== value)
        : [...prev.course, value];
      return { ...prev, course: updatedCourses };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EditEmpApi(id, employee); // API function to update data
      setMessage(response.message || "Employee updated successfully!"); // Display backend message
      navigate("/emp_list"); // Redirect to employee list page
    } catch (error) {
      console.error("Error updating employee:", error);
      setMessage(error.response?.data?.message || "Failed to Edit Employee.");
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate("/emp_list");
  };

  // Display gender radio buttons
  const genderOptions = ["Male", "Female", "Other"];
  
  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Edit Employee</h1>
        <button
          onClick={handleCancel}
          className="flex items-center bg-gray-600 text-white px-3 py-1 rounded-md"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      {/* Display message */}
      {message && <div className="bg-yellow-200 p-2 rounded-md mb-4">{message}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={employee.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mobile No</label>
          <input
            type="text"
            name="MobileNo"
            value={employee.MobileNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Designation</label>
          <input
            type="text"
            name="Designation"
            value={employee.Designation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Gender Radio Buttons */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <div className="flex space-x-4">
            {genderOptions.map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="Gender"
                  value={gender}
                  checked={employee.Gender === gender}
                  onChange={handleChange}
                  className="mr-2"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Course Checkboxes */}
        <div>
          <label className="block text-sm font-medium">Course</label>
          <div className="flex space-x-4">
            {["React", "Node.js", "JavaScript", "MongoDB"].map((course) => (
              <label key={course} className="flex items-center">
                <input
                  type="checkbox"
                  value={course}
                  checked={employee.course.includes(course)}
                  onChange={handleCourseChange}
                  className="mr-2"
                />
                {course}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmp;
