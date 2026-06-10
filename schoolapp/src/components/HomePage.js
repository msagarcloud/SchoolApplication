import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { authService } from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Debug: Check what's in storage before clearing
    console.log('HomePage: Storage before clearing:', {
      localStorage: { ...localStorage },
      sessionStorage: { ...sessionStorage }
    });
    
    // Force clear all storage first
    console.log('HomePage: Clearing all storage...');
    localStorage.clear();
    sessionStorage.clear();
    
    // Debug: Check what's in storage after clearing
    console.log('HomePage: Storage after clearing:', {
      localStorage: { ...localStorage },
      sessionStorage: { ...sessionStorage }
    });
    
    // Check if user is authenticated
    const isAuth = authService.isAuthenticated();
    console.log('Is authenticated:', isAuth);
    
    if (isAuth) {
      const user = authService.getCurrentUser();
      console.log('Current user:', user);
      
      // Additional validation: ensure user object exists and has required fields
      if (user && user.userName && user.userRole) {
        setCurrentUser(user);
      } else {
        console.log('Invalid user data found, clearing authentication');
        // Clear invalid authentication data
        authService.logout();
        setCurrentUser(null);
      }
    } else {
      console.log('User not authenticated, setting currentUser to null');
      setCurrentUser(null);
    }
  }, []);

  // Sample images - replace with actual image paths
  const images = [
    { id: 1, src: '/images/school1.jpg', alt: 'School Building', title: 'Modern Infrastructure' },
    { id: 2, src: '/images/classroom1.jpg', alt: 'Classroom', title: 'Smart Classrooms' },
    { id: 3, src: '/images/library1.jpg', alt: 'Library', title: 'Well-stocked Library' },
    { id: 4, src: '/images/laboratory1.jpg', alt: 'Laboratory', title: 'Advanced Labs' },
    { id: 5, src: '/images/sports1.jpg', alt: 'Sports', title: 'Sports Facilities' },
    { id: 6, src: '/images/cafeteria1.jpg', alt: 'Cafeteria', title: 'Healthy Food Court' }
  ];

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header currentUser={currentUser} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          {/* Welcome Section */}
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold text-primary mb-3">
              Welcome to Our School
            </h1>
            <p className="lead text-muted">
              Excellence in Education, Building Tomorrow's Leaders
            </p>
          </div>

          {/* Images Grid - Two Rows */}
          <div className="row g-4 mb-4">
            {/* First Row */}
            {images.slice(0, 3).map((image) => (
              <div key={image.id} className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="position-relative overflow-hidden" style={{ height: '180px' }}>
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="card-img-top h-100 object-fit-cover"
                      style={{ transition: 'transform 0.3s ease' }}
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${image.id}/400/250.jpg`;
                      }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-opacity">
                      <h5 className="text-white fw-bold">{image.title}</h5>
                    </div>
                  </div>
                  <div className="card-body text-center py-2">
                    <h5 className="card-title fw-semibold small">{image.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4 mb-4">
            {/* Second Row */}
            {images.slice(3, 6).map((image) => (
              <div key={image.id} className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="position-relative overflow-hidden" style={{ height: '180px' }}>
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="card-img-top h-100 object-fit-cover"
                      style={{ transition: 'transform 0.3s ease' }}
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${image.id}/400/250.jpg`;
                      }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-opacity">
                      <h5 className="text-white fw-bold">{image.title}</h5>
                    </div>
                  </div>
                  <div className="card-body text-center py-2">
                    <h5 className="card-title fw-semibold small">{image.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mb-3">
            <Link to="/login" className="btn btn-lg btn-primary px-5 py-2">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Get Started - Login Now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Custom Styles */}
      <style>{`
        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
        .card:hover .card-img-top {
          transform: scale(1.05);
        }
        .card-body {
          padding: 0.5rem !important;
        }
        .card-title.small {
          font-size: 0.875rem !important;
        }
        footer {
          margin-top: auto !important;
          flex-shrink: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
