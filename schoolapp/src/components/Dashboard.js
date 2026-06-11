import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Dashboard = () => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Dashboard</h1>
          <p className="text-muted mb-0">Welcome back, {currentUser?.UserName || currentUser?.userName || 'User'}!</p>
        </div>
      </div>
      
      {currentUser && (
        <div className="alert alert-success" role="alert">
          <h5 className="alert-heading">Login Successful!</h5>
          <p className="mb-0">
            You are logged in as <strong>{currentUser.UserName || currentUser.userName}</strong>
            {(currentUser.EmailAddress || currentUser.emailAddress) && ` (${currentUser.EmailAddress || currentUser.emailAddress})`}
            {(currentUser.UserRole || currentUser.userRole) && ` - Role: ${currentUser.UserRole || currentUser.userRole}`}
          </p>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-primary h-100">
            <div className="card-body text-center">
              <i className="bi bi-people-fill text-primary fs-1 mb-3"></i>
              <h5 className="card-title">Employees</h5>
              <p className="card-text">Manage employee records</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/employees')}
              >
                View Employees
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-success h-100">
            <div className="card-body text-center">
              <i className="bi bi-building text-success fs-1 mb-3"></i>
              <h5 className="card-title">Classes</h5>
              <p className="card-text">Manage class information</p>
              <button 
                className="btn btn-success btn-sm"
                onClick={() => navigate('/classes')}
              >
                View Classes
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-info h-100">
            <div className="card-body text-center">
              <i className="bi bi-book text-info fs-1 mb-3"></i>
              <h5 className="card-title">Subjects</h5>
              <p className="card-text">Manage subject details</p>
              <button 
                className="btn btn-info btn-sm"
                onClick={() => navigate('/subjects')}
              >
                View Subjects
              </button>
            </div>
          </div>
        </div>
        

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-warning h-100">
            <div className="card-body text-center">
              <i className="bi bi-geo-alt text-warning fs-1 mb-3"></i>
              <h5 className="card-title">Locations</h5>
              <p className="card-text">Manage location data</p>
              <button 
                className="btn btn-warning btn-sm"
                onClick={() => navigate('/cities')}
              >
                View Locations
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-secondary h-100">
            <div className="card-body text-center">
              <i className="bi bi-mortarboard text-secondary fs-1 mb-3"></i>
              <h5 className="card-title">Teachers</h5>
              <p className="card-text">Manage teacher records</p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/teachers')}
              >
                View Teachers
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-dark h-100">
            <div className="card-body text-center">
              <i className="bi bi-briefcase text-dark fs-1 mb-3"></i>
              <h5 className="card-title">Non-Teaching</h5>
              <p className="card-text">Manage non-teaching staff</p>
              <button 
                className="btn btn-dark btn-sm"
                onClick={() => navigate('/non-teaching-staff')}
              >
                View Non-Teaching
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-info h-100">
            <div className="card-body text-center">
              <i className="bi bi-truck text-info fs-1 mb-3"></i>
              <h5 className="card-title">Drivers</h5>
              <p className="card-text">Manage driver records</p>
              <button 
                className="btn btn-info btn-sm"
                onClick={() => navigate('/drivers')}
              >
                View Drivers
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-success h-100">
            <div className="card-body text-center">
              <i className="bi bi-clean text-success fs-1 mb-3"></i>
              <h5 className="card-title">Cleaners</h5>
              <p className="card-text">Manage cleaner records</p>
              <button 
                className="btn btn-success btn-sm"
                onClick={() => navigate('/employees')}
              >
                View Cleaners
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-warning h-100">
            <div className="card-body text-center">
              <i className="bi bi-shop text-warning fs-1 mb-3"></i>
              <h5 className="card-title">Vendors</h5>
              <p className="card-text">Manage vendor records</p>
              <button 
                className="btn btn-warning btn-sm"
                onClick={() => navigate('/vendors')}
              >
                View Vendors
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-primary h-100">
            <div className="card-body text-center">
              <i className="bi bi-truck-front text-primary fs-1 mb-3"></i>
              <h5 className="card-title">Vehicles</h5>
              <p className="card-text">Manage vehicle records</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/vehicles')}
              >
                View Vehicles
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-info h-100">
            <div className="card-body text-center">
              <i className="bi bi-calendar-week text-info fs-1 mb-3"></i>
              <h5 className="card-title">TimeTable</h5>
              <p className="card-text">Manage timetable periods</p>
              <button 
                className="btn btn-info btn-sm"
                onClick={() => navigate('/timetableperiods')}
              >
                View TimeTable
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-secondary h-100">
            <div className="card-body text-center">
              <i className="bi bi-shop text-secondary fs-1 mb-3"></i>
              <h5 className="card-title">Suppliers</h5>
              <p className="card-text">Manage supplier records</p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/suppliers')}
              >
                View Suppliers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-4">
        <h5>Quick Actions</h5>
        <div className="d-flex gap-2 flex-wrap">
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate('/employees/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Employee
          </button>
          <button 
            className="btn btn-outline-success"
            onClick={() => navigate('/classes/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Class
          </button>
          <button 
            className="btn btn-outline-info"
            onClick={() => navigate('/subjects/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Subject
          </button>
          <button 
            className="btn btn-outline-warning"
            onClick={() => navigate('/cities/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Location
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/teachers/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Teacher
          </button>
          <button 
            className="btn btn-outline-dark"
            onClick={() => navigate('/employees/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Non-Teaching Staff
          </button>
          <button 
            className="btn btn-outline-info"
            onClick={() => navigate('/drivers/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Driver
          </button>
          <button 
            className="btn btn-outline-success"
            onClick={() => navigate('/employees/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Cleaner
          </button>
          <button 
            className="btn btn-outline-warning"
            onClick={() => navigate('/vendors/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Vendor
          </button>
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate('/vehicles/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Vehicle
          </button>
          <button 
            className="btn btn-outline-info"
            onClick={() => navigate('/timetableperiods/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add TimeTable Period
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/suppliers/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Supplier
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/routes/create')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Routes
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Dashboard;
