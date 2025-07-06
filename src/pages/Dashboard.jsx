import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({})
  let params = useParams();
  let token = localStorage.getItem("token");
  const { id } = params;
  let navigate = useNavigate();

  useEffect(() => {
    let endpoint = `http://localhost:5005/user/dashboard/${id}`;
    const fetchUser = async () => {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)

      setuser(response.data)

      if(response.data.status >= 401 && response.data.status <= 403){
          navigate('/')
      }
      setloading(false);



      console.log(response.status);
    };

    fetchUser();
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#ff6347" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            EASY SAVE MFB
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle me-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Transfers
                </button>
                <ul
                  className="dropdown-menu"
                  style={{ backgroundColor: "#ff6347", border: "none" }}
                >
                  <li>
                    <a className="dropdown-item text-white" href="#">
                      To esave mfb
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-white" href="#">
                      To other bank
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-white" href="#">
                      Transaction history
                    </a>
                  </li>
                </ul>
                <button
                  className="btn btn-outline-light"
                  onClick={Logout}
                  style={{ borderColor: "white", color: "white" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
              <h3>Welcome, {user.name} </h3>
              <img src={user.profile} alt="" width={50} height={50} style={{borderRadius: '100%'}}/>
              <h2>Your account number is : {user.accountnum}</h2>
              <p>Your account balance is : ${user.balance} </p>
              <button>Transfer to EsaveMFB</button> <br />
              <button>Transfer to other banks</button> <br />
              <button>Transaction history</button> <br />


        </div>
    
        
      )}
    </div>
  );
};

export default Dashboard;
