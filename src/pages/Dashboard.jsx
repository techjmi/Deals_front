import React, { useContext } from 'react';
import { DataContext } from '../context.jsx/Dataprovider';

const Dashboard = () => {
  // Accessing the user from the context
  const { user } = useContext(DataContext);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        {/* User Info */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Hello, {user.fullName}
          </h1>
        </div>

        {/* Profile Picture */}
        <img
          src={user.profile_pic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4 sm:mb-0 sm:ml-6 border-4 border-gray-300"
        />
      </div>

      {/* Additional User Info */}
      <div className="text-center sm:text-left mt-6">
        <p className="text-gray-600 text-lg">
          <strong>Username:</strong> <span className="font-medium text-gray-800">{user.userName}</span>
        </p>
        <p className="text-gray-600 text-lg mt-2">
          <strong>Email:</strong> <span className="font-medium text-gray-800">{user.email}</span>
        </p>
      </div>

      {/* Dashboard Content */}
      
    </div>
  );
};

export default Dashboard;
