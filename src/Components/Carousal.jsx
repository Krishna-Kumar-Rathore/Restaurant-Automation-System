import React from 'react'

export default function Carousal() {
  return (
    <div>
     <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}} >
  <div className="carousel-inner" id='carousal'>
    <div className='carousal-caption' style={{zIndex: '10'}}>
    <form className="d-flex" id='searchBox'>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
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
    </div>
  )
}
