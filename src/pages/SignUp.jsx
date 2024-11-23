import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostSignUp } from "../service/api";
import ImageUpload from "../components/ImageUpload";
// import UploadImage from "..components/"; 

const SignUp = () => {
  // State for form data and UI feedback
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (imageURL) => {
    setFormData((prevData) => ({ ...prevData, profile_pic: imageURL }));
  };
  const validateForm = () => {
    if (!formData.fullName) return "Full Name is required.";
    if (!formData.email) return "Email is required.";
    if (!formData.userName) return "Username Number is required.";
    if (!formData.password) return "Gender is required.";
    return null; 
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }
    setLoading(true);
    setMessage("Creating your account...");

    try {
      const response = await PostSignUp(formData); // API call to sign up
      if (response.status === 201) {
        setMessage(response.data.message);
        setLoading(false);
        navigate("/"); // Redirect to login page
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "An error occurred. Please try again.";
      setMessage(errorMsg); 
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
      {message && <div className="text-red-500 text-sm text-center">{message}</div>}
        {/* Main Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              // required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="mb-4">
            <label
              htmlFor="profile_pic"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Profile Picture
            </label>
            {/* <ImageUpload onUploadSuccess={handleImageUpload} /> */}
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded-lg transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 underline cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
