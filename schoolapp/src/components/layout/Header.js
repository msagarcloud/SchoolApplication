import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Header = ({ currentUser, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMyProfile = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  const handleChangePassword = () => {
    setShowUserMenu(false);
    navigate('/change-password');
  };

  const handleLogoutClick = async () => {
    console.log('Header logout button clicked');
    setIsLoggingOut(true);
    try {
      if (onLogout) {
        onLogout();
      } else {
        await authService.logout();
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/dashboard">
          <i className="bi bi-mortarboard-fill me-2"></i>
          School Demo
        </a>

        <div className="d-flex align-items-center ms-auto">
          {currentUser ? (
            <>
              <div className="nav-item d-flex align-items-center me-3 position-relative" ref={menuRef}>
                <span 
                  className="nav-link d-flex align-items-center text-white mb-0"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="me-2">Welcome, {currentUser?.userName || 'User'}</span>
                  <i className="bi bi-person-circle me-2"></i>
                  <i className="bi bi-chevron-down"></i>
                </span>
                
                {showUserMenu && (
                  <div className="position-absolute end-0 top-100 mt-2 bg-white text-dark rounded shadow-lg"
                       style={{ minWidth: '200px', zIndex: 1000 }}>
                    <div className="py-1">
                      <button 
                        className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent"
                        onClick={handleMyProfile}
                      >
                        <i className="bi bi-person me-2"></i>My Profile
                      </button>
                      <button 
                        className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent"
                        onClick={handleChangePassword}
                      >
                        <i className="bi bi-key me-2"></i>Change Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center">
                <span className="nav-link d-flex align-items-center text-white mb-0 me-3">
                  <span className="me-2">{currentUser?.userRole || 'User'}</span>
                </span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogoutClick}
                  type="button"
                  disabled={isLoggingOut}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-item">
              <a href="/login" className="nav-link btn btn-primary text-white px-4">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;