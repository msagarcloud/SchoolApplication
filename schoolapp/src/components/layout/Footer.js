import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Footer = ({ currentUser }) => {
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

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const handleMyProfile = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  const handleChangePassword = () => {
    setShowUserMenu(false);
    navigate('/change-password');
  };

  return (
    <footer className="bg-dark text-white py-3" style={{ marginTop: 'auto', flexShrink: 0 }}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h6 className="h6 mb-0">School Demo Management System</h6>
          </div>
          <div className="col-md-6 text-end">
            {currentUser && (
              <div className="d-inline-block position-relative" ref={menuRef}>
                <span 
                  className="text-white-50 cursor-pointer user-menu-trigger"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{ cursor: 'pointer' }}
                >
                  Welcome, <span className="text-white fw-semibold">{currentUser.userName || currentUser.username || 'User'}</span>
                  <i className="bi bi-chevron-up ms-1"></i>
                </span>
                
                {showUserMenu && (
                  <div className="position-absolute end-0 bottom-100 mb-2 bg-white text-dark rounded shadow-lg"
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
                      <hr className="my-1" />
                      <button 
                        className="dropdown-item w-100 text-start px-3 py-2 border-0 bg-transparent text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
