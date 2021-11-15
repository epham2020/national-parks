import React from "react";

function Home() {
  return (
    <div className="home">
      <div class="container">
        {/* top row that contains a picture on the left and tab header with small description on right */}
        <div class="row align-items-center my-5">
          {/* left column contains a picture with caption underneath */}
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://communityengagement.utk.edu/wp-content/uploads/sites/95/2085/03/900x400-mountain.jpg"
              alt=""
            />
            <figcaption>Great Smoky Mountains</figcaption>
          </div>
          {/* right column contains tab header with small description underneath */}
          <div class="col-lg-5">
            <h1 class="font-weight-light">Find Your Adventure</h1>
            <p>
            The National Park Service preserves unimpaired the natural and cultural resources and values of the National Park System 
            for the enjoyment, education, and inspiration of this and future generations. The Park Service cooperates with partners 
            to extend the benefits of natural and cultural resource conservation and outdoor recreation throughout this country and the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;