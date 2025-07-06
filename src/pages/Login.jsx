import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Forgotpass from "./Forgotpass";
import { Bars } from "react-loader-spinner";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);

  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setisloading(true);
      let endpoint = "http://localhost:5005/user/login";
      let logitt = { email, password };

      let response = await axios.post(endpoint, logitt);
      console.log(response.data);
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate(`/dashboard/${response.data.id}`);
        setisloading(false);
      } else {
        console.log("try again");
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg" style={styles.card}>
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 style={styles.heading}>Welcome Back</h2>
                <p className="text-muted">Please enter your credentials</p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={styles.label}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setemail(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={styles.label}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setpassword(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div className="d-grid gap-2 mb-3" >
                <button
                  className="btn"
                  type="button"
                  onClick={handleLogin}
                  style={styles.button}
                >
                  {isloading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Bars
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                      </div>
                  ) : (
                    <p>Login</p>
                  )}
                </button>
              </div>

              <div className="text-center mt-3">
                <Link to={"/forgotpass"} style={styles.link}>
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "20px",
  },
  card: {
    border: "none",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  heading: {
    color: "#ff6347", // Tomato red
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  label: {
    color: "#495057",
    fontWeight: "500",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "16px",
    transition: "border-color 0.3s",
    ":focus": {
      borderColor: "#ff6347",
      boxShadow: "0 0 0 0.25rem rgba(255, 99, 71, 0.25)",
    },
  },
  button: {
    backgroundColor: "#ff6347", // Tomato red
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#e5533d",
      transform: "translateY(-2px)",
    },
    ":active": {
      transform: "translateY(0)",
    },
  },
  link: {
    color: "#ff6347",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s",
    ":hover": {
      color: "#e5533d",
      textDecoration: "underline",
    },
  },
};

export default Login;
