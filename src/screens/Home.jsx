import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
// import Carousal from '../Components/Carousal';

function Home() {
  const [search, setSearch] = useState(''); 
  const [foodCat, setFoodCat] = useState([]); // Corrected to useState
  const [foodItem, setFoodItem] = useState([]); // Corrected to useState

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", { // Added http:// to URL
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      {/* <div><Carousal /></div> */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}} >
  <div className="carousel-inner" id='carousal'>
    <div className='carousal-caption' style={{zIndex: '10'}}>
    <div className="d-flex justify-content-center" id='searchBox'>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) =>{setSearch(e.target.value)} } />
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div >
    
    <div className="carousel-item active"> 
      <img src="https://loremflickr.com/600/400/fruits" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://loremflickr.com/600/400/dessert" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" >
      <img src="https://picsum.photos/600/400?random" className="d-block w-100" alt="..."/>
      {/* https://source.unsplash.com/random/600×400?icecream */}
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


      <div className='container'>
        {
          foodCat.length > 0 
            ? foodCat.map((data) => {
              return ( <div className='row mb-3'>
                <div key={data._id}>
                  <div className='fs-3 m-3 text-white'>{data.CategoryName}</div>
                  </div>
                  <hr />
                  {
                    foodItem.length > 0 
                      ? foodItem
                          .filter((item) => (item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toLocaleLowerCase() )) )
                          .map((filterItems) => (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mx-2' >
                              <Card  foodItem = {filterItems}
                              // foodName = {filterItems.name} 
                              options= {filterItems.options[0]}
                              // imgSrc = {filterItems.img}
                              // description = {filterItems.description}
                              

                              ></Card>
                            </div>
                          ))
                      : <div>No such Data Found</div>
                  }
                </div>
              )
            })
            : "No Food Category "
        }
        {/* <Card /> */}
      </div>
      <div style={{ color: 'whitesmoke' }}><Footer /></div>
    </div>
  );
}

export default Home;
