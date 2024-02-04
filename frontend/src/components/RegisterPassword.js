import React, { useState } from "react";

const RegisterPassword = ({ handlePassword }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[^A-Za-z0-9]).{8,50}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValid(validatePassword(newPassword));
    handlePassword(newPassword);
    setPasswordMatchError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if the confirm password matches the password
    const passwordsMatch = newConfirmPassword === password;
    setPasswordMatchError(!passwordsMatch);

    // Validate general password parameters
    setIsValid(validatePassword(password) && passwordsMatch);
  };

  return (
    <>
      <label id="register-label" htmlFor="password">
        PASSWORD
      </label>
      <br />
      <input
        id="register-password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        className="register-password mb-2"
      />
      <div className="d-flex justify-content-end">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label
            id="register-label"
            className="form-check-label"
            htmlFor="flexCheckPassword"
          >
            Show Password
          </label>
        </div>
      </div>

      <label id="register-label" htmlFor="confirmPassword">
        CONFIRM PASSWORD
      </label>
      <br />
      <input
        id="register-confirm-password"
        placeholder="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className="register-password mb-2"
      />
      <div className="d-flex justify-content-end">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckConfirmPassword"
            checked={showConfirmPassword}
            onChange={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <label
            id="register-label"
            className="form-check-label"
            htmlFor="flexCheckConfirmPassword"
          >
            Show Password
          </label>
        </div>
      </div>

      {!isValid && (
        <p id="pwd-params" style={{ color: "red" }}>
          {passwordMatchError && "Passwords do not match."}
          {!passwordMatchError && (
            <>
              Password must be 8-50 characters, contain at least one uppercase
              letter, one lowercase letter, one special symbol, and two digits.
              No spaces allowed.
            </>
          )}
        </p>
      )}
    </>
  );
};

export default RegisterPassword;
