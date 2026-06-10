import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Header from './Header';
import Footer from './Footer';
import LeftNavigationBar from './LeftNavigationBar';
import TopNavigationMenu from './TopNavigationMenu';

const MainTemplate = ({ 
  children, 
  navigationMode = 'left', // 'left', 'top', or 'both'
  showTopSearch = false,
  topNavVariant = 'primary',
  useGrouping = true // New prop to enable/disable grouping
}) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const userRole = currentUser?.UserRole || currentUser?.userRole || 'User';
  
  console.log('MainTemplate - Current user:', currentUser);
  console.log('MainTemplate - User role:', userRole);

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      await authService.logout();
      console.log('AuthService logout completed, navigating to login');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to login even if there's an error
      navigate('/login');
    }
  };

  const showLeftNav = navigationMode === 'left' || navigationMode === 'both';
  const showTopNav = navigationMode === 'top' || navigationMode === 'both';

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navigation */}
      {showTopNav && (
        <TopNavigationMenu
          userRole={userRole}
          showSearch={showTopSearch}
          variant={topNavVariant}
          useGrouping={useGrouping}
        />
      )}
      
      {/* Original Header (only shown if not using top navigation) */}
      {!showTopNav && (
        <Header currentUser={currentUser} onLogout={handleLogout} />
      )}
      
      <div className="d-flex flex-grow-1 min-vh-0" style={{ minHeight: 0 }}>
        {/* Left Navigation */}
        {showLeftNav && (
          <LeftNavigationBar userRole={userRole} />
        )}
        
        <main className={`flex-grow-1 bg-light ${showLeftNav ? 'min-vh-0' : 'p-0'}`} style={{ minHeight: 0 }}>
          <div className={`${showLeftNav ? 'container-fluid p-4 h-100' : ''}`} style={{ minHeight: 0 }}>
            {/* User info and logout (only when using top nav) */}
            {showTopNav && (
              <div className="d-flex justify-content-end align-items-center p-3 bg-white border-bottom">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {currentUser?.userName || 'User'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><h6 className="dropdown-header">{currentUser?.userRole || 'User'}</h6></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => navigate('/profile')}
                      >
                        <i className="bi bi-person me-2"></i>
                        My Profile
                      </button>
                    </li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => navigate('/change-password')}
                      >
                        <i className="bi bi-key me-2"></i>
                        Change Password
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {children}
          </div>
        </main>
      </div>
      
      <Footer currentUser={currentUser} />
    </div>
  );
};

export default MainTemplate;
