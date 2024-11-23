import axios from "axios";

// const url_user = "http://localhost:8000/api/auth";
// const url_emp = "http://localhost:8000/api/employee";
const url_user="https://deals-dray-backend.onrender.com/api/auth"
const url_emp='https://deals-dray-backend.onrender.com/api/employee'

// Post signup data
export const PostSignUp = async (data) => {
  try {
    const response = await axios.post(`${url_user}/signup`, data);
    return response;
  } catch (error) {
    console.error("Error while posting signup data:", error.message);
    throw error
  }
};

// Post signin data
export const PostSignIn = async (data) => {
  try {
    const response = await axios.post(`${url_user}/login`, data, {
      credentials: 'include',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error while posting login data:", error.message);
    throw error
  }
};

// Create employee
export const CreateEmpl = async (data) => {
  try {
    const response = await axios.post(`${url_emp}/create`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error while creating employee:", error.message);
    throw error.response?.data?.message || "Something went wrong!";
  }
};

// Fetch all employees
export const allEmp = async () => {
  try {
    const response = await axios.get(`${url_emp}/emp_list`, {
      credentials: 'include',
      withCredentials: true,
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching employees:", error.message, error.response?.data?.message);
    throw error; 
    // throw error.response?.message || "Something went wrong!";
  }
};

// Fetch employee by ID
export const SingleEmp = async (id) => {
  try {
    const response = await axios.get(`${url_emp}/employee/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching employee data:", error.message);
    throw error
  }
};

// Edit employee data
export const EditEmpApi = async (id, data) => {
  try {
    const response = await axios.put(`${url_emp}/emp_edit/${id}`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error while editing employee:", error.message);
    throw error
  }
};

// Delete employee
export const Delete_Emp = async (id) => {
  try {
    const response = await axios.delete(`${url_emp}/emp_delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error while deleting employee:", error.message);
    throw error
  }
};
export const UserLogout = async () => {
  console.log('logout called')
  try {
    const response = await axios.post(`${url_user}/logout`, null, {
    });
    return response;
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};
