import React, { useState } from "react";
import axios from "axios";

function AddFoodItems() {
  const [foodItem, setFoodItem] = useState({
    CategoryName: "",
    name: "",
    img: "",
    options: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({
      ...foodItem,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/api/fooditems", {
        ...foodItem,
        options: foodItem.options.split(",").map((option) => option.trim()), // convert comma-separated options to array
      });
      alert("Food item added successfully!");
      console.log(response.data);
      setFoodItem({
        CategoryName: "",
        name: "",
        img: "",
        options: "",
        description: "",
      }); // reset form
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Failed to add food item.");
    }
  };

  return (
    <>
      <>{/* <h1 className="text-white">Hello foodItems</h1> */}</>
      
      <div className="container mt-4">
        <h2 className="text-white text-center">Add Food Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-white">Category Name</label>
            <select
              className="form-control"
              name="CategoryName"
              value={foodItem.CategoryName}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Biryani/Rice">Biryani/Rice</option>
              <option value="Starter">Starter</option>
              <option value="Pizza">Pizza</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-white">Food Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={foodItem.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="img"
              value={foodItem.img}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white">Options (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              name="options"
              value={foodItem.options}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={foodItem.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddFoodItems;
