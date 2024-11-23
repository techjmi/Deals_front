import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostSignIn } from '../service/api';
import { DataContext } from '../context.jsx/Dataprovider';
// import apiLogin from '../api/auth'; 

const Login = () => {
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { setUser } =useContext(DataContext); 
  const navigate = useNavigate();
  const{setIsLoggedIn}= useContext(DataContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const { status, data } = await PostSignIn(formData);
      if (status === 200 && data.message === "Signin successful") {
        const user = data.user;
        setIsLoggedIn(true); // User is logged in
  
        // Save user data and navigate
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); 
        navigate("/dashboard");
      } else {
        setMessage(data?.message || "Signin failed. Please try again.");
      }
    } catch (error) {
      // Display backend error message or fallback
      setMessage(error?.response?.data?.message || "An unexpected error occurred.");
      setIsLoggedIn(false)
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
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
              required
            />
          </div>
          <div className="mb-6">
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
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded-lg transition-all ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to='/signup'
              className="text-blue-500 underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
