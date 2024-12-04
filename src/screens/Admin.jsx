import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../Components/ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import RAS1 from '../img/RAS1.jpeg';
import './Admin.css';
import Footer from '../Components/Footer';

export default function Admin() {
  const [orders, setOrders] = useState([]); // State to hold order data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate();
  let data = useCart();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getAllOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include auth token if required
          },
        });
        const data = await response.json();
        setOrders(data); // Set fetched order data
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchOrders();
  }, []);

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



  return (
    <>
      {/* Navbar */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
          <img src={RAS1} alt="Logo" style={{height : "50px" , width : "auto" , marginLeft : '10px'}} />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item active">
                <Link className="nav-link active fs-5" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') && (
                <Link className="nav-link active fs-5" to="/">
                  My Orders
                </Link>
              )}
            </ul>
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/addFoodItem">
                Add Food Items
              </Link>
            </div>
            <div>
              {/* <div
                className="btn bg-white text-success mx-2"
                onClick={() => setCartView(true)}
              >
                My Cart{' '}
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div> */}
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

      {/* Orders Section */}
      {/* <div className="container mt-4">
        <h2 className="text-center text-white">All Orders</h2>
        {loading ? (
          <div className="text-center text-white">Loading orders...</div>
        ) : (
          <div className="row d-flex flex-wrap  justify-content-center">
            {orders.map((order) => (
              <div key={order._id.$oid} className="col-md-6 mb-4">
                <div className="card p-3 text-center border-0 shadow-sm">
                  <h5 className="card-title text-primary">Order by: {order.email}</h5>
                  {order.order_data.map((orderBatch, index) => (
                    <div key={index} className="mb-3">
                      <p className="text-muted">Order Date: {orderBatch[0].Order_date}</p>
                      <ul className="list-group">
                        {orderBatch.slice(1).map((item) => (
                          <li
                            key={item.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{item.name}</strong> - {item.size}
                              <br />
                              Quantity: {item.qty}
                            </div>
                            <span className="badge bg-success rounded-pill">
                              ₹{item.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Orders Section */}
<div className="container mt-4">
  <h2 className="text-center text-white mb-4">All Orders</h2>
  {loading ? (
    <div className="text-center text-white">Loading orders...</div>
  ) : (
    <div className="row">
      {orders.map((order) => (
        <div key={order._id.$oid} className="col-lg-6 col-md-12 mb-4">
          <div className="card order-card shadow-sm border-0 p-3">
            <h5 className="card-title text-primary mb-3">Order by: {order.email}</h5>
            {order.order_data.map((orderBatch, index) => (
              <div key={index} className="order-batch mb-4">
                <p className="text-muted">
                  <strong>Order Date:</strong> {orderBatch[0].Order_date}
                </p>
                <ul className="list-group">
                  {orderBatch.slice(1).map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      style={{ border: 'none', padding: '10px 15px' }}
                    >
                      <div>
                        <strong>{item.name}</strong> - {item.size}
                        <br />
                        <span className="text-muted">Quantity: {item.qty}</span>
                      </div>
                      <span className="badge bg-success rounded-pill">
                        ₹{item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
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

    <div>
      <Footer/>
    </div>



    </>
  );
}
