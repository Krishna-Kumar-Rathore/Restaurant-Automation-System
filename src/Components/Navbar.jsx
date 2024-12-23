import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cart from "../screens/Cart";
import Modal from "../Modal";
import { useCart } from "../Components/ContextReducer";
import RAS from '../img/RAS.png';
import RAS1 from '../img/RAS1.jpeg';

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <img src={RAS1} alt="Logo" style={{height : "50px" , width : "auto" , marginLeft : '10px'}} />
        {/* <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>{" "} */}
        {/* Change name to RAS later */}
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
                Home{" "}
              </Link>{" "}
              {/* <span className="sr-only">(current)</span> */}
            </li>
            {localStorage.getItem("authToken") ? (
              <Link className="nav-link active fs-5" to="/myOrder">
                My Orders{" "}
              </Link>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createUser">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {" "}
                  {data.length}{" "}
                </Badge>
              </div>
              {/* ({cartView}? <Modal onClose={() => {console.log("hi1"); setCartView(false)}} > <Cart/> </Modal> : null) */}
              {cartView && (
                <Modal
                  onClose={() => {
                    setCartView(false);
                  }}
                >
                  {" "}
                  <Cart />{" "}
                </Modal>
              )}
              {/* console.log("hi1"); */}

              <div
                className="btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

// 10 minutes : Error time
