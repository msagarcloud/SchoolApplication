import React, { useState, useEffect, useMemo } from 'react';
import subjectService from '../../services/subjectService';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import AlertMessage from '../common/AlertMessage';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'scholastic', 'non-scholastic'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const data = await subjectService.getAll();
      setSubjects(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await subjectService.delete(id);
        fetchSubjects(); // Refresh the list
      } catch (err) {
        setError(err.message || 'Failed to delete subject');
      }
    }
  };

  // Filter and pagination logic
  const filteredSubjects = useMemo(() => {
    let filtered = subjects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(subject =>
        subject.subjectName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(subject =>
        filterType === 'scholastic' ? subject.isScholastic : !subject.isScholastic
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(subject =>
        filterStatus === 'active' ? subject.isActive : !subject.isActive
      );
    }

    return filtered;
  }, [subjects, searchTerm, filterType, filterStatus]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
  };

  if (loading) {
    return <LoadingSpinner message="Loading subjects..." />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subjects</h2>
        <button className="btn btn-primary" onClick={() => window.location.href = '/subjects/create'}>
          Add New Subject
        </button>
      </div>

      <AlertMessage message={error} type="danger" dismissible onClose={() => setError('')} />

      {/* Filters Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filters</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="search" className="form-label">Search by Name</label>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Enter subject name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="filterType" className="form-label">Type</label>
              <select
                className="form-select"
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="scholastic">Scholastic</option>
                <option value="non-scholastic">Non-Scholastic</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="filterStatus" className="form-label">Status</label>
              <select
                className="form-select"
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">&nbsp;</label>
              <div>
                <button className="btn btn-outline-secondary" onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="text-muted">
            Showing {currentSubjects.length} of {filteredSubjects.length} subjects
            {filteredSubjects.length !== subjects.length && ` (from ${subjects.length} total)`}
          </span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Periods/Week</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSubjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.subjectName || 'N/A'}</td>
                <td>{subject.isScholastic ? 'Scholastic' : 'Non-Scholastic'}</td>
                <td>{subject.periodsPerWeek !== null && subject.periodsPerWeek !== undefined ? subject.periodsPerWeek : 'N/A'}</td>
                <td>
                  <span className={`badge ${subject.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {subject.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => window.location.href = `/subjects/${subject.id}`}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => window.location.href = `/subjects/${subject.id}/edit`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentSubjects.length === 0 && !loading && (
        <div className="text-center text-muted py-4">
          <p>
            {subjects.length === 0 
              ? 'No subjects found. Click "Add New Subject" to create one.'
              : 'No subjects match the current filters. Try adjusting your search criteria.'
            }
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredSubjects.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
        }}
        align="center"
      />
    </div>
  );
};

export default SubjectList;
