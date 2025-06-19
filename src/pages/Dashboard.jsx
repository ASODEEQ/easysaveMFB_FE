import React from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    let navigate = useNavigate()
    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    
    return (
        <div className='dashboard'>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#ff6347' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">EASY SAVE MFB</a>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <button className="btn btn-outline-light dropdown-toggle me-2" 
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Transfers
                                </button>
                                <ul className="dropdown-menu" style={{ backgroundColor: '#ff6347', border: 'none' }}>
                                    <li><a className="dropdown-item text-white" href="#">To esave mfb</a></li>
                                    <li><a className="dropdown-item text-white" href="#">To other bank</a></li>
                                    <li><a className="dropdown-item text-white" href="#">Transaction history</a></li>
                                </ul>
                                <button 
                                    className="btn btn-outline-light" 
                                    onClick={Logout}
                                    style={{ borderColor: 'white', color: 'white' }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Dashboard