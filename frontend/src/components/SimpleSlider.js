import Carousel from "react-bootstrap/Carousel";

function SimpleSlider() {
  return (
    <div className="d-flex justify-content-center">
      <Carousel
        className="d-flex justify-content-center align-items-center"
        data-bs-theme="dark"
        interval={null}
      >
        <Carousel.Item className="panel">
          <div className="slider-item">
            <div>
              <input className="mb-2" type="text" placeholder="Username" />
              <input className="mb-2" type="text" placeholder="Password" />
              <input className="mb-2" type="text" placeholder="Email" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className="panel">
          <div className="slider-item d-flex justify-content-center">
            <div>
              <input className="mb-2" type="text" placeholder="First Name" />
              <input
                className="form-control mb-2"
                id="date"
                name="date"
                placeholder="MM/DD/YYY"
                type="date"
              />
              <select
                class="custom-select my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
              >
                <option selected>Choose...</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Non-binary</option>
                <option value="3">Other</option>
              </select>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item className="panel">
          <div className="slider-item d-flex justify-content-center">
            <div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineCheckbox1">
                  Men
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Women
                </label>
              </div>
              <input
                className="form-control mb-2"
                id=""
                name=""
                placeholder="Age"
                type="number"
                min="18"
                max="100"
              />
              <div>
                <input
                  className="form-control mb-2"
                  id=""
                  name=""
                  placeholder="Min"
                  type="number"
                  min="18"
                  max="100"
                />
                <input
                  className="form-control mb-2"
                  id=""
                  name=""
                  placeholder="Max"
                  type="number"
                  min="18"
                  max="100"
                />
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SimpleSlider;
