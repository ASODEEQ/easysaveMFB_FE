import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Forgotpass = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [status, setstatus] = useState("")
    const [resp, setresp] = useState("")

    let navigate = useNavigate()

    const reset = async() => {
        let resetit = {email, password}
        let endpoint = "http://localhost:5005/user/forgotpass"

        let response = await axios.post(endpoint, resetit)

        console.log(response.data);
        setstatus(response.data.status)
        setresp(response.data.message)

        if(response.data.status){
            navigate('/login')
        }
        else{
            console.log({status: false, message: "try to reset again"});
        }
    }

    return (
        <div className="forgotpass-container" style={styles.container}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-lg" style={styles.card}>
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h2 style={styles.heading}>Reset Password</h2>
                                <p className="text-muted">Enter your email and new password</p>
                            </div>

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

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label" style={styles.label}>New Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Enter new password" 
                                    onChange={(e) => setpassword(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            
                            <div className="d-grid gap-2 mb-3">
                                <button 
                                    className="btn" 
                                    type="button"
                                    onClick={reset}
                                    style={styles.button}
                                >
                                    Update Password
                                </button>
                            </div>

                            {resp && (
                                <div className="text-center">
                                    <Link 
                                        to={'/login'} 
                                        style={styles.link}
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            )}
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
    },
    link: {
        color: '#ff6347',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s',
        ':hover': {
            color: '#e5533d',
            textDecoration: 'underline'
        }
    }
}

export default Forgotpass