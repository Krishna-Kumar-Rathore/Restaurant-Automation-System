import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../Components/ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Admin() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    address: ''
  });
  const [employee, setEmployees] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Save employee data to the employees list or send it to the backend.
    setEmployees([...employees, employeeData]);
    setEmployeeData({ name: '', role: '', email: '', phone: '', address: '' });
  };


  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


  // code change here
  // Dummy data for restaurant employees
  const employees = [
    {
      id: 'EMP002',
      name: 'Sarah Smith',
      designation: 'Manager',
      contactNo: '+0987654321',
      img: 'https://ui-avatars.com/api/?name=Sarah+Smith&size=128',
    },
    {
      id: 'EMP001',
      name: 'John Doe',
      designation: 'Chef',
      contactNo: '+1234567890',
      img: 'https://ui-avatars.com/api/?name=John+Doe&size=128',
    },
    {
      id: 'EMP005',
      name: 'Liam Wilson',
      designation: 'Chef',
      contactNo: '+9988776655',
      img: 'https://ui-avatars.com/api/?name=Liam+Wilson&size=128',
    },
    {
      id: 'EMP006',
      name: 'Olivia Taylor',
      designation: 'Chef',
      contactNo: '+8877665544',
      img: 'https://ui-avatars.com/api/?name=Olivia+Taylor&size=128',
    },
    {
      id: 'EMP004',
      name: 'Emma Brown',
      designation: 'Cashier',
      contactNo: '+6677889900',
      img: 'https://ui-avatars.com/api/?name=Emma+Brown&size=128',
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      designation: 'Waiter',
      contactNo: '+1122334455',
      img: 'https://ui-avatars.com/api/?name=Mike+Johnson&size=128',
    },
    {
      id: 'EMP007',
      name: 'James Anderson',
      designation: 'Waiter',
      contactNo: '+3344556677',
      img: 'https://ui-avatars.com/api/?name=James+Anderson&size=128',
    },
    {
      id: 'EMP010',
      name: 'Emma Clark',
      designation: 'Cleaner',
      contactNo: '+6677882233',
      img: 'https://ui-avatars.com/api/?name=Emma+Clark&size=128',
    },
    // {
    //   id: 'EMP008',
    //   name: 'Sophia Martinez',
    //   designation: 'Waiter',
    //   contactNo: '+2233445566',
    //   img: 'https://ui-avatars.com/api/?name=Sophia+Martinez&size=128',
    // },
    // {
    //   id: 'EMP009',
    //   name: 'Lucas Brown',
    //   designation: 'Waiter',
    //   contactNo: '+1122443355',
    //   img: 'https://ui-avatars.com/api/?name=Lucas+Brown&size=128',
    // },
  ];
  

  // code changes upward

  return (
   
    <>
    {/* employee details */}
    


    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <Link className="nav-link active fs-5" to="/">
                My Orders
              </Link>
            )}
          </ul>
          
          {/* "Add Food Items" Button */}
          <div className="d-flex">
            <Link className="btn bg-white text-success mx-1" to="/addFoodItem">
              Add Food Items
            </Link>
          </div>

          {/* Cart and Logout Button */}
          <div>
            <div
              className="btn bg-white text-success mx-2"
              onClick={() => {
                setCartView(true);
              }}
            >
              My Cart{" "}
              <Badge pill bg="danger">
                {data.length}
              </Badge>
            </div>
            {cartView && (
              <Modal
                onClose={() => {
                  setCartView(false);
                }}
              >
                <Cart />
              </Modal>
            )}
            <div
              className="btn bg-white text-danger mx-2"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div className="container mt-4">
      <h2 className="text-center text-white mb-4">Restaurant Employees</h2>
      <div className="row d-flex justify-content-center">
        {employees.map((employee) => (
          <div key={employee.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card p-3 text-center border-0 shadow-sm">
              <img
                src={employee.img}
                alt={employee.name}
                className="rounded-circle mx-auto"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title mt-2">{employee.name}</h5>
                <p className="card-text mb-1">
                  <strong>Designation:</strong> {employee.designation}
                </p>
                <p className="card-text mb-1">
                  <strong>Contact No:</strong> {employee.contactNo}
                </p>
                <p className="card-text">
                  <strong>Employee ID:</strong> {employee.id}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/*  form */}
    <div className="container mt-5">
      <h2 className="text-center text-white">Add New Employee</h2>
      <form onSubmit={handleFormSubmit} className="p-4 bg-light rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={employeeData.role}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="Chef">Chef</option>
            <option value="Manager">Manager</option>
            <option value="Waiter">Waiter</option>
            <option value="Cashier">Cashier</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Host">Host</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={employeeData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="2"
            value={employeeData.address}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Add Employee
        </button>
      </form>

      {/* Display Added Employees */}
      <div className="mt-5">
        <h3 className="text-white">Employee List</h3>
        <ul className="list-group">
          {employees.map((employee, index) => (
            <li key={index} className="list-group-item">
              <strong>{employee.designation}</strong>: {employee.name} - {employee.email}, {employee.phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
