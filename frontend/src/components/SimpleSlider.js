// import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import { Link } from "react-router-dom";

function SimpleSlider() {
  const [p,setP]=useState('password');
  function myFunction() {
    if (p === "password") {
      setP('text');
    } else {
     setP('password');
    }
  }
  return (
    <div className="simple-slider">
      <div className="carousel-container d-flex justify-content-center">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-theme="dark"
          pause="true"
          data-bs-wrap="false"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* carousel content */}
          <div class="carousel-inner">
            {/* carousel slide 1 */}
            <div class="carousel-item active">
              <div className="input-container">
                <div className="input-content">
                  <label for="username">Username</label>
                  <br />
                  <input
                    className="register-user mb-2"
                    type="text"
                    placeholder="Username"
                  />
                  <br />
                  <label for="password">Password</label>
                  <br />
                  <input
                    className="register-password mb-2"
                    type={p}
                    placeholder="Password"
                  />
                  <input type="checkbox" onClick={myFunction}/>Show Password
                  <br />
                  <label for="email">Email</label>
                  <br />
                  <input
                    className="register-email mb-2"
                    type="text"
                    placeholder="Email"
                  /> 
                  </div>   
                  <br />
                  <p>already have an account?
                    <Link> click here.</Link></p>
                  
                </div>
            </div>
            {/* carousel slide 2 */}
            <div class="carousel-item">
              <div className="input-container">
                <div className="input-content">
                  <label for="first-name">First Name</label>
                  <br />
                  <input
                    className="register-first mb-2"
                    type="text"
                    placeholder="First Name"
                  />
                  <br />
                  <label for="date-of-birth">Date of Birth</label>
                  <br />
                  <input className="mb-2" type="date" />
                  <br />
                  <label for="gender">Gender</label>
                  <br />
                  <select class="custom-select">
                    <option value="" disabled selected>
                      Select your gender
                    </option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Non-Binary</option>
                    <option value="4">Other</option>
                  </select>
                </div>
              </div>
            </div>
            {/* carousel slide 3 */}
            <div class="carousel-item">
              <div className="input-container">
                <div className="input-content">
                  <label for="gender-preference">Gender Preference</label>
                  <br />
                  <div class="form-check mr-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Men
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Women
                    </label>
                  </div>
                  <br />
                  <div class="form-check mt-2 mr-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Non-Binary
                    </label>
                  </div>
                  <div class="form-check mt-2 mr-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Other
                    </label>
                  </div>
                  <br />
                  <label className="mt-2" for="age-preference">
                    Age Preference
                  </label>
                  <br />
                  <input
                    className="mb-2"
                    type="number"
                    min="18"
                    max="100"
                    placeholder="Min Age"
                  />
                  <br />
                  <input
                    className="mb-3"
                    type="number"
                    min="18"
                    max="100"
                    placeholder="Max Age"
                  />
                  <br />
                  <div className="d-flex justify-content-center">
                    <button className="register-form button-styled">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* carousel buttons */}
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default SimpleSlider;
