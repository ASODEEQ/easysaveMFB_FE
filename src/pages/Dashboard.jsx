import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from '../assets/EsaveBankLogo.jpeg'

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState({});
  const [transactions, setTransactions] = useState([]);
  let params = useParams();
  let token = localStorage.getItem("token");
  const { id } = params;
  let navigate = useNavigate();

  useEffect(() => {
    let endpoint = `https://bankappbackend-1.onrender.com/user/dashboard/${id}`;
    const fetchUser = async () => {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)

      setuser(response.data)
      console.log(user)

      if(response.data.status >= 401 && response.data.status <= 403){
          navigate('/')
      }
      setloading(false);

      console.log(response.status);
    };

    const fetchTransactions = async () => {
      try {
        let response = await axios.get(`https://bankappbackend-1.onrender.com/user/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        
        setTransactions(response.data.data.splice(0,5));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchUser();
    fetchTransactions();
  }, [id, token, navigate]);

   const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  // const formatDate =(date)=>{
  //   let dateString  = new Date()
  //  return dateString.toLocaleDateString(date) 
  // }
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard bg-light" style={{ minHeight: "100vh" }}>
      <header className="bg-primary">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <img 
                  src={logo}
                  alt="Esave MFB" 
                  style={{ height: '40px' }}
                />
                <span className="navbar-brand ms-3">Online Banking</span>
              </div>
              
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item dropdown">
                    <button
                      className="btn btn-link nav-link dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Transaction
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link className="dropdown-item" to={`/transferfunds/${id}`}>
                          Transfer to Another Account
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={`/deposit/${id}`}>
                          Make a Deposit
                        </Link>
                      </li>
                      <li>
                        <Link to={`/transactions/${id}`} className="dropdown-item">
                          Transaction History
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link text-white"
                      onClick={Logout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h3 className="mb-0">Account Summary</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-4">
                    <img 
                      src={user.profile} 
                      alt="Profile" 
                      width={60} 
                      height={60} 
                      className="rounded-circle me-3 border border-primary"
                    />
                    <div>
                      <h4 className="mb-1">Welcome, {user.name}</h4>
                      <p className="text-muted mb-0">Member since {user.dateCreated.split('T')[0]}</p>
                    
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="p-3 bg-light rounded">
                        <h5 className="text-muted">Account Number</h5>
                        <h3 className="text-primary">{user.accountnum}</h3>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3 bg-light rounded">
                        <h5 className="text-muted">Available Balance</h5>
                        <h3 className="text-primary">${user.balance}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h3 className="mb-0">Quick Actions</h3>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-3">
                    <Link 
                      to={`/transferfunds/${id}`} 
                      className="btn btn-primary btn-lg"
                    >
                      Transfer Funds
                    </Link>
                    <Link 
                      to={`/deposit/${id}`} 
                      className="btn btn-outline-primary btn-lg"
                    >
                      Make a Deposit
                    </Link>
                    <Link 
                      to={`/transactions/${id}`} 
                      className="btn btn-outline-secondary btn-lg"
                    >
                      View Transactions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-12">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0">
                  <h3 className="mb-0">Recent Transactions</h3>
                </div>
                <div className="card-body">

                  
                  {transactions.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>{formatDate(transaction.created_at)}</td>
                              <td>{transaction.description || 'N/A'}</td>
                              <td>
                                <span className={`badge ${transaction.transactionType === 'received'|| transaction.transactionType === 'deposit' ? 'bg-success' : 'bg-danger'}`}>
                                  {transaction.transactionType}
                                </span>
                              </td>
                              <td>${transaction.amount}</td>
                              <td>
                                <span className="badge bg-success">Completed</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No recent Transaction</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-light py-4 border-top mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-1 small text-muted"> Easysave MFB, BY ABK.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="/privacy" className="small text-muted text-decoration-none me-3">Privacy</Link>
              <Link to="/security" className="small text-muted text-decoration-none me-3">Security</Link>
              <Link to="/agreements" className="small text-muted text-decoration-none">Agreements</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;