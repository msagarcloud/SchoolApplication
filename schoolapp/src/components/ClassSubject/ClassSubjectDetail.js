import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { classSubjectService } from '../../services/classSubjectService';
import { classService } from '../../services/classService';
import { subjectService } from '../../services/subjectService';

const ClassSubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classSubjectData, setClassSubjectData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassSubjectDetails();
  }, [id]);

  const fetchClassSubjectDetails = async () => {
    try {
      setLoading(true);
      const [classSubject, classesData, subjectsData] = await Promise.all([
        classSubjectService.getById(id),
        classService.getAll(),
        subjectService.getAll()
      ]);
      setClassSubjectData(classSubject);
      setClasses(classesData || []);
      setSubjects(subjectsData || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch class subject details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this class subject?')) {
      try {
        await classSubjectService.delete(id);
        navigate('/classsubjects');
      } catch (err) {
        setError(err.message || 'Failed to delete class subject');
      }
    }
  };

  const getClassName = (classId) => {
    const classItem = classes.find(cls => cls.id === classId);
    return classItem ? (classItem.name || classItem.Name || 'Unknown') : 'Unknown';
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject ? (subject.subjectName || subject.SubjectName || 'Unknown') : 'Unknown';
  };

  const getPeriodsPerWeekForSubject = (subjectId) => {
    if (!subjects || subjects.length === 0) {
      return 'N/A';
    }
    const subject = subjects.find(sub => sub.id === subjectId);
    return subject && subject.periodsPerWeek !== null && subject.periodsPerWeek !== undefined ? subject.periodsPerWeek : 'N/A';
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!classSubjectData) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">Class Subject not found</div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Class Subject Details</h2>
            <div>
              <Link 
                to="/classsubjects" 
                className="btn btn-outline-primary me-2"
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back to List
              </Link>
              <Link 
                to={`/classsubjects/${id}/edit`}
                className="btn btn-primary me-2"
              >
                <i className="bi bi-pencil me-1"></i>
                Edit
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Class Subject Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3 fw-bold">Subject:</div>
                <div className="col-sm-9">{getSubjectName(classSubjectData.subjectId)}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3 fw-bold">Periods Per Week:</div>
                <div className="col-sm-9">{getPeriodsPerWeekForSubject(classSubjectData.subjectId)}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3 fw-bold">Class:</div>
                <div className="col-sm-9">{getClassName(classSubjectData.classMasterId)}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3 fw-bold">Status:</div>
                <div className="col-sm-9">
                  <span className={`badge ${classSubjectData.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {classSubjectData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3 fw-bold">Created Date:</div>
                <div className="col-sm-9">
                  {classSubjectData.createdDate ? 
                    new Date(classSubjectData.createdDate).toLocaleDateString() : 
                    'N/A'
                  }
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3 fw-bold">Last Modified:</div>
                <div className="col-sm-9">
                  {classSubjectData.modifiedDate ? 
                    new Date(classSubjectData.modifiedDate).toLocaleDateString() : 
                    'N/A'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Additional Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4 fw-bold">Status:</div>
                <div className="col-sm-8">{classSubjectData.status || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSubjectDetail;
