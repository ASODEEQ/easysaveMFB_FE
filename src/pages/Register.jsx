import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [file, setfile] = useState(null);
    const [password, setpassword] = useState('');
    let navigate = useNavigate();

    const handleFile = (e) => {
        let image = e.target.files[0];
        console.log(image);

        let fileUpload = new FileReader();
        fileUpload.readAsDataURL(image); 
        fileUpload.onloadend = () => {
            setfile(fileUpload.result);
            console.log(fileUpload.result);
        }
    };

    const handleRegister = async () => {
        try {
            let endpoint = 'https://bankappbackend-1.onrender.com/user/signup';
            let Registerit = {firstName, lastName, email, phoneNumber, password, profileImage: file};
            let response = await axios.post(endpoint, Registerit);
            
            console.log(response.data);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-light min-vh-100">

            <header className="bg-primary py-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <img 
                            // src="" 
                            alt="Esave MFB" 
                            style={{ height: '40px' }}
                        />
                        <span className="navbar-brand ms-3 text-white">Online Banking</span>
                    </div>
                </div>
            </header>

            <main className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white border-0 pt-4">
                                <h2 className="text-center text-primary mb-1">Create Your Account</h2>
                                <p className="text-center text-muted mb-0">Join Esave Online Banking</p>
                            </div>
                            <div className="card-body px-4 px-md-5 py-4">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            id="firstName" 
                                            placeholder="Enter first name" 
                                            onChange={(e) => setfirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            id="lastName" 
                                            placeholder="Enter last name" 
                                            onChange={(e) => setlastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg" 
                                        id="email" 
                                        placeholder="Enter your email" 
                                        onChange={(e) => setemail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        className="form-control form-control-lg" 
                                        id="phoneNumber" 
                                        placeholder="Enter phone number" 
                                        onChange={(e) => setphoneNumber(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control form-control-lg" 
                                        id="password" 
                                        placeholder="Create password" 
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                    />
                                    <small className="text-muted">Must be at least 8 characters</small>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="profileImage" className="form-label fw-bold">Profile Photo (Optional)</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        id="profileImage" 
                                        onChange={(e) => handleFile(e)}
                                        accept="image/*"
                                    />
                                </div>
                                
                                <div className="d-grid gap-2 mb-3">
                                    <button 
                                        className="btn btn-primary btn-lg" 
                                        type="button"
                                        onClick={handleRegister}
                                    >
                                        Create Account
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p className="mb-0">
                                        Already have an account?{' '}
                                        <a href="/" className="text-primary text-decoration-none fw-medium">
                                            Sign In
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

         
            <footer className="bg-white py-3 border-top">
                <div className="container text-center text-muted small">
                    Easysave MFB, BY ABK.. © {new Date().getFullYear()} Easysave MFB
                </div>
            </footer>
        </div>
    );
};

export default Register;