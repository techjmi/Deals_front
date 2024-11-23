import React, { useState } from "react";
import { CreateEmpl } from "../service/api";
import ImageUpload from "../components/ImageUpload";
import { useNavigate } from "react-router-dom";

const CreateEmp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    MobileNo: "",
    Designation: "",
    Gender: "",
    course: [],
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate= useNavigate()

  const courses = ['BCA','BTECH', 'MCA','BCOM'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageUpload = (imageURL) => {
    setFormData((prevData) => ({ ...prevData, image: imageURL }));
  };


const validateForm = () => {
  if (!formData.fullName) return "Full Name is required.";
  if (!formData.email) return "Email is required.";
  if (!formData.MobileNo) return "Mobile Number is required.";
  if (!formData.Designation) return "Designation is required.";
  if (!formData.Gender) return "Gender is required.";
  if (formData.course.length === 0) return "At least one course must be selected.";
  if (!formData.image) return "Image is required.";
  return null; 
};
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const validationError = validateForm();
  if (validationError) {
    setMessage(validationError);
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const response = await CreateEmpl(formData);
    console.log(response);

    if (response.status === 201 && response.data.message === "Employee Created successfully") {
      setMessage(response.data.message);
      navigate("/emp_list");
    }
  } catch (error) {
    // Extract the message properly from the error
    setMessage(error || "Something went wrong!"); 
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      {message && <div className="text-red-500 text-sm">{message}</div>}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            name="MobileNo"
            value={formData.MobileNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter mobile number"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Designation</label>
          <input
            type="text"
            name="Designation"
            value={formData.Designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter designation"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Courses</label>
          <div className="flex flex-wrap gap-3">
            {courses.map((course) => (
              <label key={course} className="flex items-center">
                <input
                  type="checkbox"
                  name="course"
                  value={course}
                  checked={formData.course.includes(course)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {course}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Image</label>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating Employee..." : "Create Employee"}
        </button>
      </form>
      {message && <p className="text-center text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default CreateEmp;
