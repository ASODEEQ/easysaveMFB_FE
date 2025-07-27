import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../assets/EsaveBankLogo.jpeg'

const Deposit = () => {
  let navigate = useNavigate();
  const [amount, setamount] = useState(0);
  const [accountNumber, setaccountNumber] = useState("");
  const [accountInfo, setaccountInfo] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState("");
  const [message, setMessage] = useState('');
  let params = useParams();
  const { id } = params;
  let token = localStorage.getItem("token");

  const handleAccountChange = async (e) => {
    const value = e.target.value;
    setaccountNumber(value);

    if (value.length === 11) {
      try {
        setisLoading(true);
        seterror(null);
        const response = await axios.post(
          "https://bankappbackend-1.onrender.com/user/resolveAccount",
          { accountNumber: value }
        );
        if(response.data.firstName){
          setaccountInfo(response.data);
        }else{
          seterror('account not found');
          setaccountInfo(null)
        }
      } catch (error) {
        seterror("Failed to resolve account");
        console.error("Account resolution error:", error);
      } finally {
        setisLoading(false);
      }
    }
  };

  const depositMoney = async () => {
    if(error){
      seterror('cannot send money to invalid account')
      return
    }
    let number = Number(amount);
    try {
      let response = await axios.post(
        `https://bankappbackend-1.onrender.com/user/deposit/${id}`,
        { amount: number, accountNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      setMessage(response.data.message);
      
      if (response.data.status) {
        setTimeout(() => {
          navigate(`/dashboard/${id}`);
        }, 4000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Deposit failed");
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
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="text-primary mb-4">Make a Deposit</h2>
                
              
                {message && (
                  <div className={`alert ${message.toLowerCase().includes('success') ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {message}
                    <button 
                      className="btn-close float-end" 
                      onClick={() => setMessage('')}
                    ></button>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter 11-digit account number"
                    onChange={handleAccountChange} 
                    value={accountNumber} 
                  />
                </div>

                {isLoading && <div className="mb-3 text-center">Resolving account...</div>}
                {error && <div className="alert alert-danger mb-3">{error}</div>}

                {accountInfo && (
                  <div className="mb-3 p-3 bg-light rounded d-flex align-items-center">
                    <img 
                      src={accountInfo.profileImage} 
                      alt="" 
                      width={50} 
                      height={50}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <strong>{accountInfo.firstName} {accountInfo.lastName}</strong>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    onChange={(e) => setamount(e.target.value)} 
                  />
                </div>
                <button 
                  className="btn btn-primary w-100"
                  onClick={depositMoney} 
                >
                  Deposit Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-3 border-top">
        <div className="container text-center text-muted small">
          Easysave MFB, BY ABK.
        </div>
      </footer>
    </div>
  );
};

export default Deposit;