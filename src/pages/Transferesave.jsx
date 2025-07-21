import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/EsaveBankLogo.jpeg'


const Transferesave = () => {

  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);
  const [amount, setamount] = useState(0);
  const [message, setmessage] = useState('')
  const [description, setdescription] = useState("");

  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  let navigate = useNavigate();


  const handleAccountChange = async (e) => {
    const value = e.target.value;
    setAccountNumber(value);

    if (value.length === 11) {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.post(
          "https://bankappbackend-1.onrender.com/user/resolveAccount",
          { accountNumber: value }
        );
        setAccountInfo(response.data);
      } catch (error) {
        setError("Failed to resolve account");
        console.error("Account resolution error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sendMoney = async () => {
    try {
      let response = await axios.post(
        `https://bankappbackend-1.onrender.com/user/transferfunds/${id}`,
        {
          amount,
          receipientAc: accountNumber,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setmessage(response.data.message)

      if (response.data.status) {
          setTimeout(() => {
          navigate(`/dashboard/${id}`);
        }, 4000);

        // navigate(`/dashboard/${id}`);
      }
    }catch (error) {
      setmessage(error.response?.data?.message || "Transfer failed");
      console.log(error);
    }
  };


  return (
    <div className="bg-light min-vh-100">

      <header className="bg-primary py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <img 
            src={logo} 
            alt="Esave MFB" 
            style={{ height: '40px' }}
          />
          <button 
            className="btn btn-outline-light"
            onClick={() => navigate(`/dashboard/${id}`)}
          >
            Back to Dashboard
          </button>
        </div>
      </header>
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="text-primary mb-4">Transfer Funds</h2>
                
               
                {message && (
                  <div className={`alert ${message.toLowerCase().includes('success') ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {message}
                    <button 
                      className="btn-close float-end" 
                      onClick={() => setmessage('')}
                    ></button>
                  </div>
                )}

       
                <div className="mb-4">
                  <label className="form-label fw-bold">Recipient Account Number</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter 11-digit account number"
                    value={accountNumber}
                    onChange={handleAccountChange}
                    maxLength={11}
                  />
                </div>

          
                {isLoading && (
                  <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Verifying account details...</p>
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger mb-4">
                    {error}
                  </div>
                )}

       
                {accountInfo ? (
                  <div className="mb-4 p-3 bg-light rounded d-flex align-items-center">
                    <img 
                      src={accountInfo.profileImage} 
                      alt="Recipient" 
                      width={60}
                      height={60}
                      className="rounded-circle me-3 border border-primary"
                    />
                    <div>
                      <h5 className="mb-1">{accountInfo.firstName} {accountInfo.lastName}</h5>
                      <p className="text-muted mb-0">Account Verified</p>
                    </div>
                  </div>
                ): ''}

                <div className="mb-4">
                  <label className="form-label fw-bold">Amount to Transfer</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="0.00"
                      onChange={(e) => setamount(e.target.value)}
                    />
                  </div>
                </div>

    
                <div className="mb-4">
                  <label className="form-label fw-bold">Description (Optional)</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="e.g. Rent payment"
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>

              
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={sendMoney}
                    disabled={!accountInfo || !amount || amount <= 0}
                  >
                    Transfer Funds
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-3 border-top">
        <div className="container text-center text-muted small">
          Easysave MFB, BY ABK. © {new Date().getFullYear()} Easysave MFB.
        </div>
      </footer>
    </div>
  );
};

export default Transferesave;