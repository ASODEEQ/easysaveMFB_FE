import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Forgotpass from "./Forgotpass";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);

  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setisloading(true);
      let endpoint = "https://bankappbackend-1.onrender.com/user/login";
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
    <div className="login-container bg-light" style={styles.container}>
      <header className="bg-primary py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <img 
              // src="" 
              alt="Esave MFB" 
              style={{ height: '40px' }}
            />
            <h5 className="text-white ms-3 mb-0">Online Banking</h5>
          </div>
        </div>
      </header>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm" style={styles.card}>
              <div className="card-header bg-white border-0 pt-4">
                <h2 className="text-center mb-1" style={styles.heading}>Sign In</h2>
                <p className="text-center text-muted mb-0">to your Online Banking account</p>
              </div>
              <div className="card-body px-4 px-md-5 py-4">
                <div className="mb-4">
                  <label htmlFor="email" className="form-label" style={styles.label}>
                    Online ID
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your Online ID"
                    onChange={(e) => setemail(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label" style={styles.label}>
                    Passcode
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your Passcode"
                    onChange={(e) => setpassword(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe" style={styles.label}>
                    Remember Online ID
                  </label>
                </div>

                <div className="d-grid gap-2 mb-3">
                  <button
                    className="btn"
                    type="button"
                    onClick={handleLogin}
                    style={styles.button}
                  >
                    {isloading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        {/* <Bars
                          height="20"
                          width="20"
                          color="#ffffff"
                          ariaLabel="bars-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        /> */}

                        loading...
                      </div>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <Link to={"/forgotpass"} style={styles.link}>
                    Forgot Online ID or Passcode?
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="mb-2">
                <Link to="/register" style={styles.smallLink}>Enroll in Online Banking</Link>
              </p>
              <p className="mb-0">
                <Link to="/help" style={styles.smallLink}>Need Help?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-4 border-top">
        <div className="container text-center">
          <p className="mb-1" style={styles.footerText}>Easysave MFB, BY ABK.</p>
          <p className="mb-1" style={styles.footerText}>© 2025 Esave MFB Corporation.</p>
          <div className="mt-2">
            <Link to="/privacy" style={styles.smallLink}>Privacy</Link>
            <span className="mx-2">•</span>
            <Link to="/security" style={styles.smallLink}>Security</Link>
            <span className="mx-2">•</span>
            <Link to="/agreements" style={styles.smallLink}>Agreements</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  heading: {
    color: "#2566AF", 
    fontWeight: "700",
    fontSize: "28px",
  },
  label: {
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "8px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    fontSize: "16px",
    transition: "border-color 0.3s",
    ":focus": {
      borderColor: "#2566AF",
      boxShadow: "0 0 0 0.25rem rgba(37, 102, 175, 0.25)",
    },
  },
  button: {
    backgroundColor: "#2566AF", 
    color: "white",
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s",
    ":hover": {
      backgroundColor: "#1a4d8c",
    },
  },
  link: {
    color: "#2566AF",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    transition: "color 0.3s",
    ":hover": {
      color: "#1a4d8c",
      textDecoration: "underline",
    },
  },
  smallLink: {
    color: "#2566AF",
    textDecoration: "none",
    fontSize: "14px",
    ":hover": {
      textDecoration: "underline",
    },
  },
  footerText: {
    color: "#666",
    fontSize: "12px",
    margin: "0",
  },
};

export default Login;