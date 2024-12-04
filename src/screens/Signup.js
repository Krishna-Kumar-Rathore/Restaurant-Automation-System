import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert("Registration successful!");
      setCredentials({ name: "", email: "", password: "", geolocation: "" }); // Clear form fields
    } else {
      alert("Enter valid credentials.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4 text-primary">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="geolocation" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Signup</button>
          </form>
          <div className="text-center mt-3">
            <span className="text-muted">Already have an account?</span>
            <Link to="/login" className="btn btn-link">Login Here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
