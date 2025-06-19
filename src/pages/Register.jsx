import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [file, setfile] = useState(null)
    const [password, setpassword] = useState('')

    const handleFile = (e) => {
        let image = e.target.files[0]
        console.log(image);

        let fileUpload = new FileReader()
        fileUpload.readAsDataURL(image) 
        fileUpload.onloadend = () => {
            setfile(fileUpload.result)
            console.log(fileUpload.result);
        }
    }

    const handleRegister = async () => {
        let endpoint = 'http://localhost:5005/user/signup'
        let Registerit = {firstName, lastName, email, phoneNumber, password, profileImage: file}
        let response = await axios.post(endpoint, Registerit)
        console.log(response.data);
    }

    return (
        <div className="register-container" style={styles.container}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-lg" style={styles.card}>
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h2 style={styles.heading}>Create Account</h2>
                                <p className="text-muted">Fill in your details to register</p>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label" style={styles.label}>First Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="firstName" 
                                        placeholder="Enter first name" 
                                        onChange={(e) => setfirstName(e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label" style={styles.label}>Last Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="lastName" 
                                        placeholder="Enter last name" 
                                        onChange={(e) => setlastName(e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" style={styles.label}>Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="Enter your email" 
                                    onChange={(e) => setemail(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label" style={styles.label}>Phone Number</label>
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    id="phoneNumber" 
                                    placeholder="Enter phone number" 
                                    onChange={(e) => setphoneNumber(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Create password" 
                                    onChange={(e) => setpassword(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="profileImage" className="form-label" style={styles.label}>Profile Image</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    id="profileImage" 
                                    onChange={(e) => handleFile(e)}
                                    style={styles.fileInput}
                                />
                            </div>
                            
                            <div className="d-grid gap-2">
                                <button 
                                    className="btn" 
                                    type="button"
                                    onClick={handleRegister}
                                    style={styles.button}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        padding: '20px'
    },
    card: {
        border: 'none',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#ffffff'
    },
    heading: {
        color: '#ff6347',
        fontWeight: '600',
        marginBottom: '0.5rem'
    },
    label: {
        color: '#495057',
        fontWeight: '500',
        marginBottom: '0.5rem'
    },
    input: {
        padding: '12px 15px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '16px',
        transition: 'border-color 0.3s',
        ':focus': {
            borderColor: '#ff6347',
            boxShadow: '0 0 0 0.25rem rgba(255, 99, 71, 0.25)'
        }
    },
    fileInput: {
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '16px'
    },
    button: {
        backgroundColor: '#ff6347',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: '600',
        fontSize: '16px',
        transition: 'all 0.3s',
        ':hover': {
            backgroundColor: '#e5533d',
            transform: 'translateY(-2px)'
        },
        ':active': {
            transform: 'translateY(0)'
        }
    }
}

export default Register