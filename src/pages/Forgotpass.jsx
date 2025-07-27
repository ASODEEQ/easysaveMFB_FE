import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/EsaveBankLogo.jpeg'

const Forgotpass = () => {
 
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [status, setstatus] = useState("");
    const [resp, setresp] = useState("");

    let navigate = useNavigate();

    const reset = async() => {
        let resetit = {email, password};
        let endpoint = "https://bankappbackend-1.onrender.com/user/forgotpass";

        let response = await axios.post(endpoint, resetit);

        console.log(response.data);
        setstatus(response.data.status);
        setresp(response.data.message);

        if(response.data.status){
            navigate('/');
        }
        else{
            console.log({status: false, message: "try to reset again"});
        }
    };


    return (
        <div className="bg-light min-vh-100">
    
            <header className="bg-primary py-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <img 
                            src={logo}
                            alt="Esave MFB" 
                            style={{ height: '40px' }}
                        />
                        <span className="navbar-brand ms-3 text-white">Online Banking</span>
                    </div>
                </div>
            </header>

            <main className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white border-0 pt-4">
                                <h2 className="text-center text-primary mb-1">Reset Your Password</h2>
                                <p className="text-center text-muted mb-0">Enter your email and new password</p>
                            </div>
                            <div className="card-body px-4 px-md-5 py-4">
                         
                                {status ? (
                                    <div className="alert alert-success mb-4" role="alert">
                                        {resp}
                                    </div>
                                ) : resp ? (
                                    <div className="alert alert-danger mb-4" role="alert">
                                        {resp}
                                    </div>
                                ) : null}

                       
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg" 
                                        id="email" 
                                        placeholder="Enter your email address" 
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>

                   
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-bold">New Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control form-control-lg" 
                                        id="password" 
                                        placeholder="Create new password" 
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                    <small className="text-muted">Must be at least 8 characters</small>
                                </div>
                                
                         
                                <div className="d-grid gap-2 mb-4">
                                    <button 
                                        className="btn btn-primary btn-lg" 
                                        type="button"
                                        onClick={reset}
                                    >
                                        Reset Password
                                    </button>
                                </div>

                          
                                <div className="text-center">
                                    <Link 
                                        to={'/'} 
                                        className="text-decoration-none text-primary fw-medium"
                                    >
                                        ← Back to Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

          
            <footer className="bg-white py-3 border-top">
                <div className="container text-center text-muted small">
                    Easysave MFB, © ABK. {new Date().getFullYear()} Easysave MFB.
                </div>
            </footer>
        </div>
    );
};

export default Forgotpass;