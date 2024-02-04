import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Register.css";
import RegisterPassword from "../components/RegisterPassword";

let HOST;
if (process.env.REACT_APP_NODE_ENV === "dev") {
  console.log("Welcome to Dev mode");
  HOST = "http://localhost:5000";
} else {
  HOST = "http://127.0.0.1";
}

function Register() {
  const { ikey } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [preferences, setPreference] = useState([]);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(50);

  useEffect(() => {
    fetchInvite();
  }, []);

  async function fetchInvite() {
    const res = await fetch(HOST + `/api/user/invite/${ikey}`);
    const data = await res.json();
    console.log(data.username, data.email);
    if ("check to make sure it has not expired here") {
      setUsername(data.username);
      setEmail(data.email);
    } else {
      // redirect to login or signup here
    }
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function handleDOB(event) {
    const dateObject = new Date(event.target.value);
    setDOB(dateObject.toISOString());
  }

  function handleGender(event) {
    setGender(event.target.value);
    console.log(gender);
  }

  function handleMalePref(event) {
    let temp = preferences;
    if ("M" in temp) temp = temp.filter((item) => item !== "M");
    else temp.push(event.target.value);
    setPreference(temp);
    console.log(temp);
  }

  function handleMinAge(event) {
    setMinAge(event.target.value);
  }

  function handleMaxAge(event) {
    setMaxAge(event.target.value);
  }

  async function submit() {
    const res = await fetch(HOST + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        firstName: name,
        dob,
        gender,
        preferences,
        minAge,
        maxAge,
        pronoun: "Male",
        city: "Houston",
        state: "TX",
        ikey,
      }),
    });
    const data = await res.text();
    if (res.status === 400) {
      console.log(data);
    }
    // redirect to login
  }

  return (
    <div className="register">
      <div id="register-container" className="container">
        <div id="header-container" className="d-flex justify-content-center">
          <h1 id="register-header">Fill out your info</h1>
        </div>
        <div className="simple-slider">
          <div className="carousel-container d-flex justify-content-center">
            <div
              id="carouselExampleCaptions"
              class="carousel slide"
              pause="true"
              data-bs-wrap="false"
            >
              {/* carousel content */}
              <div class="carousel-inner">
                {/* carousel slide 1 */}
                <div class="carousel-item active">
                  <div className="input-container">
                    <RegisterPassword handlePassword={setPassword} />
                  </div>
                </div>
                {/* carousel slide 2 */}
                <div class="carousel-item">
                  <div className="input-container">
                    <div className="input-content">
                      <label id="register-label" for="first-name">
                        First Name
                      </label>
                      <br />
                      <input
                        id="register-firstname"
                        className="register-first mb-2"
                        type="text"
                        placeholder="First Name"
                        onChange={handleName}
                      />
                      <br />
                      <label id="register-label" for="date-of-birth">
                        Date of Birth
                      </label>
                      <br />
                      <input
                        id="register-dob"
                        className="mb-2"
                        type="date"
                        onChange={handleDOB}
                      />
                      <br />
                      <label id="register-label" for="gender">
                        Gender
                      </label>
                      <br />
                      <select
                        id="register-gender"
                        class="custom-select"
                        onChange={handleGender}
                      >
                        <option value="" disabled selected>
                          Select your gender
                        </option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="GN">Gender-Neutral</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* carousel slide 3 */}
                <div class="carousel-item">
                  <div className="input-container">
                    <div className="input-content">
                      <label id="register-label" for="gender-preference">
                        Gender Preference
                      </label>
                      <br />
                      <div class="form-check mr-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="M"
                          id="flexCheckDefault"
                          onChange={handleMalePref}
                        />
                        <label
                          id="register-label"
                          class="form-check-label"
                          for="flexCheckDefault"
                        >
                          Men
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="F"
                          id="flexCheckDefault"
                        />
                        <label
                          id="register-label"
                          class="form-check-label"
                          for="flexCheckDefault"
                        >
                          Women
                        </label>
                      </div>
                      <div class="form-check mt-2 mr-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="GN"
                          id="flexCheckDefault"
                        />
                        <label
                          id="register-label"
                          class="form-check-label"
                          for="flexCheckDefault"
                        >
                          Non-Binary
                        </label>
                      </div>
                      <div class="form-check mt-2 mr-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="O"
                          id="flexCheckDefault"
                        />
                        <label
                          id="register-label"
                          class="form-check-label"
                          for="flexCheckDefault"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* carousel slide 4 */}
                <div class="carousel-item">
                  <div className="input-container">
                    <div className="input-content">
                      <label
                        id="register-label"
                        className="mt-2"
                        for="age-preference"
                      >
                        Age Preference
                      </label>
                      <br />
                      <input
                        id="register-minage"
                        className="mb-2"
                        type="number"
                        min="18"
                        max="100"
                        placeholder="Min Age"
                        onChange={handleMinAge}
                      />
                      <br />
                      <input
                        id="register-maxage"
                        className="mb-3"
                        type="number"
                        min="18"
                        max="100"
                        placeholder="Max Age"
                        onChange={handleMaxAge}
                      />
                      <br />
                      <div className="d-flex justify-content-center">
                        <button
                          className="register-form button-styled"
                          onClick={submit}
                        >
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
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
