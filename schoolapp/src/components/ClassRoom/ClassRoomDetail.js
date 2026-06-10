import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { classRoomService } from '../../services/classRoomService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';

const ClassRoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classRoom, setClassRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [schoolName, setSchoolName] = useState('');

  const fetchClassRoom = useCallback(async () => {
    try {
      setLoading(true);
      const data = await classRoomService.getById(id);
      setClassRoom(data);
      
      // Fetch company and school names
      if (data.companyId) {
        try {
          const company = await companyService.getById(data.companyId);
          setCompanyName(company.name);
        } catch (err) {
          console.error('Failed to fetch company:', err);
          setCompanyName('Unknown Company');
        }
      }
      
      if (data.schoolId) {
        try {
          const school = await schoolService.getById(data.schoolId);
          setSchoolName(school.name);
        } catch (err) {
          console.error('Failed to fetch school:', err);
          setSchoolName('Unknown School');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch classroom details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClassRoom();
  }, [fetchClassRoom]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${classRoom.name}"? This action cannot be undone.`)) {
      try {
        await classRoomService.delete(id);
        navigate('/classrooms');
      } catch (err) {
        setError(err.message || 'Failed to delete classroom');
      }
    }
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
        <Link to="/classrooms" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Classrooms
        </Link>
      </div>
    );
  }

  if (!classRoom) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          Classroom not found
        </div>
        <Link to="/classrooms" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Classrooms
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Classroom Details</h2>
        <div className="btn-group" role="group">
          <Link to="/classrooms" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Classrooms
          </Link>
          <Link to={`/classrooms/${classRoom.id}/edit`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Classroom Information</h5>
              <span className={`badge ${classRoom.isActive ? 'bg-success' : 'bg-danger'}`}>
                {classRoom.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Classroom Name:</div>
                <div className="col-sm-9">{classRoom.name || 'N/A'}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className="badge bg-info">{classRoom.status || 'N/A'}</span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-3 fw-bold">Status Message:</div>
                <div className="col-sm-9">{classRoom.statusMessage || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">System Information</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Classroom:</div>
                <div className="col-sm-8">
                  {classRoom.name}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Company:</div>
                <div className="col-sm-8">
                  {companyName || 'Loading...'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">School:</div>
                <div className="col-sm-8">
                  {schoolName || 'Loading...'}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 fw-bold">Created Date:</div>
                <div className="col-sm-8">
                  {new Date(classRoom.createdDate).toLocaleDateString()} at{' '}
                  {new Date(classRoom.createdDate).toLocaleTimeString()}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4 fw-bold">Modified Date:</div>
                <div className="col-sm-8">
                  {classRoom.modifiedDate ? (
                    <>
                      {new Date(classRoom.modifiedDate).toLocaleDateString()} at{' '}
                      {new Date(classRoom.modifiedDate).toLocaleTimeString()}
                    </>
                  ) : 'Not modified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoomDetail;
