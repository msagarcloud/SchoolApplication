import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand fw-bold text-primary" to="/">
              <i className="bi bi-mortarboard-fill me-2"></i>
              School Management System
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link text-muted" to="/">
                    <i className="bi bi-house-door me-1"></i>
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LoginHeader;
