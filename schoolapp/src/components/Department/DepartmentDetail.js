import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockDepartment = {
        id: 1,
        departmentName: 'Computer Science',
        departmentCode: 'CS',
        hodEmployeeId: 101,
        hodName: 'Dr. John Smith',
        hodEmployeeCode: 'EMP101',
        description: 'Department of Computer Science and Engineering offering undergraduate and postgraduate programs in computer science, artificial intelligence, and data science.',
        isActive: true,
        establishedDate: '2010-06-15',
        floorNumber: '2nd Floor',
        block: 'A Block',
        contactNumber: '+1-123-456-7890',
        emailId: 'cs.department@school.edu',
        totalSeats: 180,
        currentStrength: 150,
        totalEmployees: 25,
        totalStudents: 150,
        programs: [
          { name: 'B.Tech Computer Science', duration: '4 Years', seats: 60 },
          { name: 'M.Tech Computer Science', duration: '2 Years', seats: 24 },
          { name: 'B.Tech AI & ML', duration: '4 Years', seats: 60 },
          { name: 'Ph.D. Computer Science', duration: '3-5 Years', seats: 12 }
        ],
        facilities: [
          'Computer Lab with 100 systems',
          'AI Research Lab',
          'Cloud Computing Lab',
          'Seminar Hall',
          'Department Library'
        ],
        achievements: [
          '100% placement for 2023 batch',
          'Research grants worth $50,000',
          '15+ research publications in 2023',
          'Industry collaborations with 5 companies'
        ],
        addedDate: '2024-01-10',
        lastModified: '2024-01-15',
        addedBy: 'Admin User'
      };
      setDepartment(mockDepartment);
    } catch (err) {
      setError(err.message || 'Failed to fetch department details');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="badge bg-success fs-6">
        <i className="bi bi-check-circle me-1"></i>
        Active
      </span>
    ) : (
      <span className="badge bg-danger fs-6">
        <i className="bi bi-x-circle me-1"></i>
        Inactive
      </span>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/departments" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Departments
        </Link>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Department not found
        </div>
        <Link to="/departments" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Departments
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Department Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/departments">Departments</Link>
              </li>
              <li className="breadcrumb-item active">Department Details</li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/departments" className="btn btn-outline-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i>
            Back to List
          </Link>
          <button className="btn btn-outline-info me-2" onClick={handlePrint}>
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          <Link to={`/departments/${id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
        </div>
      </div>

      {/* Department Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h3 className="mb-0 me-3">{department.departmentName}</h3>
                <span className="badge bg-info fs-6">{department.departmentCode}</span>
                {getStatusBadge(department.isActive)}
              </div>
              <p className="text-muted mb-2">{department.description}</p>
              <div className="d-flex gap-3">
                <small><i className="bi bi-building me-1"></i> {department.floorNumber}, {department.block}</small>
                <small><i className="bi bi-calendar me-1"></i> Established: {department.establishedDate}</small>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="row g-2">
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-primary">{department.totalEmployees}</h5>
                      <small className="text-muted">Employees</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5 className="mb-0 text-success">{department.totalStudents}</h5>
                      <small className="text-muted">Students</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Basic Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Basic Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Department Code</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-info">{department.departmentCode}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p className="form-control-plaintext">
                      {getStatusBadge(department.isActive)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Established Date</label>
                    <p className="form-control-plaintext">{department.establishedDate}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Location</label>
                    <p className="form-control-plaintext">
                      {department.floorNumber}, {department.block}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Contact Number</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-telephone me-2"></i>
                      {department.contactNumber}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Email Address</label>
                    <p className="form-control-plaintext">
                      <i className="bi bi-envelope me-2"></i>
                      {department.emailId}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Total Seats</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-primary">{department.totalSeats}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Current Strength</label>
                    <p className="form-control-plaintext">
                      <span className="badge bg-success">{department.currentStrength}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HOD Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Head of Department</h5>
            </div>
            <div className="card-body">
              {department.hodName ? (
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">HOD Name</label>
                      <p className="form-control-plaintext">
                        <Link to={`/employees/${department.hodEmployeeId}`} className="text-decoration-none">
                          {department.hodName}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted">Employee Code</label>
                      <p className="form-control-plaintext">{department.hodEmployeeCode}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted">HOD not assigned yet</p>
              )}
            </div>
          </div>

          {/* Programs Offered */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Programs Offered</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Program Name</th>
                      <th>Duration</th>
                      <th>Seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.programs.map((program, index) => (
                      <tr key={index}>
                        <td>{program.name}</td>
                        <td>{program.duration}</td>
                        <td>
                          <span className="badge bg-info">{program.seats}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Facilities</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {department.facilities.map((facility, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      <span>{facility}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Achievements</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {department.achievements.map((achievement, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-trophy text-warning me-2"></i>
                      <span>{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Quick Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/departments/${id}/edit`} className="btn btn-warning">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Department
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this department?')) {
                      // Implement delete functionality
                      window.alert('Delete functionality to be implemented');
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete Department
                </button>
                <button className="btn btn-outline-info" onClick={handlePrint}>
                  <i className="bi bi-printer me-2"></i>
                  Print Details
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Statistics</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Occupancy Rate</span>
                  <strong>{Math.round((department.currentStrength / department.totalSeats) * 100)}%</strong>
                </div>
                <div className="progress mt-1">
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${(department.currentStrength / department.totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Available Seats</span>
                  <strong>{department.totalSeats - department.currentStrength}</strong>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Student-Faculty Ratio</span>
                  <strong>{Math.round(department.totalStudents / department.totalEmployees)}:1</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Timeline</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Added On</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-calendar-plus me-2"></i>
                  {department.addedDate}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Added By</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-person-plus me-2"></i>
                  {department.addedBy}
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Last Modified</label>
                <p className="form-control-plaintext">
                  <i className="bi bi-pencil-square me-2"></i>
                  {department.lastModified}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
