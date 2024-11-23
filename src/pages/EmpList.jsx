import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { allEmp, Delete_Emp } from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfimModal";

const EmpList = ({fetchEmployees}) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await allEmp();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        const errMsg=error.response?.data?.message
        console.log(errMsg)
        setMessage(error.response?.data?.message || "Failed to fetch employees.");
      }
    };
    getEmployees();
  }, [fetchEmployees]);
  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.fullName.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.Designation.toLowerCase().includes(term)
      )
    );
  };

  // Handle delete action
  const handleDelete = (employeeId, employeeName) => {
    setEmployeeToDelete({ id: employeeId, name: employeeName });
    setModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        // Perform delete
        await Delete_Emp(employeeToDelete.id);
        // Re-fetch employees
        const data = await allEmp();
        setEmployees(data);
        setFilteredEmployees(data);

        // Set success message
        setMessage(`${employeeToDelete.name} deleted successfully.`);

        // Close modal
        setModalOpen(false);
        setEmployeeToDelete(null);

        // Clear the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to delete employee.");
      }
    }
  };

  // Close modal without action
  const closeModal = () => {
    setModalOpen(false);
    setEmployeeToDelete(null);
  };

  const onCreate = () => {
    navigate("/create"); // Replace '/create' with your desired route for creating an employee
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Employee Management
      </h1>

      {/* Success/Failure message */}
      {message && (
        <div className={`p-2 rounded-md mb-4 text-center ${message.includes("successfully") ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Top Section: Create Button and Search Bar */}
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <FaPlus /> Create Employee
        </button>
        <div>Total Employees <span className="font-bold">{filteredEmployees.length}</span></div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or designation"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Unique ID</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Courses</th>
              <th className="border border-gray-300 px-4 py-2">Created Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.empID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={employee.image || "https://cdn-icons-png.flaticon.com/512/1869/1869679.png"}
                      alt="Employee"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.fullName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.MobileNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.Designation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.Gender}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.course.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(employee.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/emp_edit/${employee._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id, employee.fullName)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 border border-gray-300 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        employeeName={employeeToDelete ? employeeToDelete.name : ""}
      />
    </div>
  );
};

export default EmpList;
