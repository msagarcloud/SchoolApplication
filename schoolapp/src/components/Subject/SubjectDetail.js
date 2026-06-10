import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import subjectService from '../../services/subjectService';

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubject();
  }, [id]);

  const fetchSubject = async () => {
    try {
      setLoading(true);
      const data = await subjectService.getById(id);
      setSubject(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch subject');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await subjectService.delete(id);
        navigate('/subjects');
      } catch (err) {
        setError(err.message || 'Failed to delete subject');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="alert alert-warning" role="alert">
        Subject not found.
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subject Details</h2>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/subjects')}>
            Back to Subjects
          </button>
          <button className="btn btn-outline-primary me-2" onClick={() => navigate(`/subjects/${id}/edit`)}>
            Edit
          </button>
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title">Subject Information</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{subject.subjectName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Type:</strong></td>
                    <td>{subject.isScholastic ? 'Scholastic' : 'Non-Scholastic'}</td>
                  </tr>
                  <tr>
                    <td><strong>Periods Per Week:</strong></td>
                    <td>{subject.periodsPerWeek || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>
                      <span className={`badge ${subject.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {subject.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h5 className="card-title">System Information</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>ID:</strong></td>
                    <td>{subject.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Created Date:</strong></td>
                    <td>{new Date(subject.createdDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Modified Date:</strong></td>
                    <td>{subject.modifiedDate ? new Date(subject.modifiedDate).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
