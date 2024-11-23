import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); 
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest('.avatar-container')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener('click', closeDropdown);
    } else {
      window.removeEventListener('click', closeDropdown);
    }
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownOpen]);

  const handleCreateClick = () => {
    if (user) {
      navigate("/create"); // Navigate to the Create Employee page if the user is logged in
    } else {
      alert("You need to log in first!"); // Show alert if the user is not logged in
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-10 py-3 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">
            MyApp
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <button
            onClick={handleCreateClick} 
            className="hover:text-gray-300 transition duration-300"
          >
            Create Employee
          </button>
          <Link to="/emp_list" className="hover:text-gray-300 transition duration-300">
            Employee List
          </Link>
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative avatar-container cursor-pointer">
          {user ? (
            <>
              <img
                src={user.profile_pic || 'https://via.placeholder.com/150'} 
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-48 z-50"
                  style={{ top: '100%' }}
                >
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold">{user.fullName || 'Guest'}</p>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setUser(null);
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/" className="hover:text-gray-300 transition duration-300">
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Icon */}
        <button onClick={toggleSidebar} className="sm:hidden text-2xl focus:outline-none">
          {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">MyApp</h2>
          <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/" onClick={toggleSidebar} className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <button
            onClick={() => {
              handleCreateClick();
              toggleSidebar();
            }}
            className="hover:text-gray-300 transition duration-300"
          >
            Create Employee
          </button>
          <Link to="/emp_list" onClick={toggleSidebar} className="hover:text-gray-300 transition duration-300">
            Employee List
          </Link>
        </div>
      </div>

      {/* Overlay to close sidebar on outside click */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
