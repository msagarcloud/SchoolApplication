import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Header from './Header';
import Footer from './Footer';
import LeftNavigationBar from './LeftNavigationBar';
import TopNavigationMenu from './TopNavigationMenu';

const MainTemplateWithNavigation = ({
  children,
  initialNavigationMode = 'left', // 'left', 'top', or 'both'
  showTopSearch = false,
  topNavVariant = 'primary',
  maxTopNavItems = 8
}) => {
  const [navigationMode, setNavigationMode] = useState(initialNavigationMode);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const userRole = currentUser?.UserRole || currentUser?.userRole || 'User';
  
  console.log('MainTemplateWithNavigation - Current user:', currentUser);
  console.log('MainTemplateWithNavigation - User role:', userRole);

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

  const toggleNavigationMode = () => {
    setNavigationMode(prev => {
      if (prev === 'left') return 'top';
      if (prev === 'top') return 'both';
      return 'left';
    });
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
          maxVisibleItems={maxTopNavItems}
        />
      )}
      
      {/* Original Header (only shown if not using top navigation) */}
      {!showTopNav && (
        <Header currentUser={currentUser} onLogout={handleLogout} />
      )}
      
      {/* Main content area */}
      <div className="d-flex flex-grow-1 min-vh-0" style={{ minHeight: 0 }}>
        {/* Left Navigation */}
        {showLeftNav && (
          <LeftNavigationBar userRole={userRole} />
        )}
        
        {/* Main content */}
        <main className={`flex-grow-1 bg-light ${showLeftNav ? 'min-vh-0' : 'p-0'}`} style={{ minHeight: 0 }}>
          <div className={`${showLeftNav ? 'container-fluid p-4' : ''}`} style={{ minHeight: 0 }}>
            {/* Navigation mode toggle (for demo/testing) */}
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${navigationMode === 'left' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setNavigationMode('left')}
                  title="Left Navigation Only"
                >
                  <i className="bi bi-list"></i>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${navigationMode === 'top' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setNavigationMode('top')}
                  title="Top Navigation Only"
                >
                  <i className="bi bi-menu-button-wide"></i>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${navigationMode === 'both' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setNavigationMode('both')}
                  title="Both Navigations"
                >
                  <i className="bi bi-layout-sidebar"></i>
                </button>
              </div>
            </div>
            
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

export default MainTemplateWithNavigation;
