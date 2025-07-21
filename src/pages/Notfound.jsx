import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-light min-vh-100">
      <header className="bg-primary py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <img 
            // src="" 
            alt="EASYSAVE MFB" 
            style={{ height: '40px' }}
          />
          <span className="text-white">Online Banking</span>
        </div>
      </header>

      {/* 404 Content */}
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <h1 className="display-1 text-primary mb-4">404</h1>
                <h2 className="mb-3">Page Not Found</h2>
                <p className="lead text-muted mb-4">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <Link 
                  to="/" 
                  className="btn btn-primary px-4 py-2"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-3 border-top">
        <div className="container text-center text-muted small">
          EASYSAVE MFB, N.A. Member FDIC. © {new Date().getFullYear()} ESAVE Corporation
        </div>
      </footer>
    </div>
  );
};

export default NotFound;