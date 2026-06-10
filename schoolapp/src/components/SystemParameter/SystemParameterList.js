import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { systemParameterService } from '../../services/systemParameterService';

const SystemParameterList = () => {
  const [parameters, setParameters] = useState([]);
  const [filteredParameters, setFilteredParameters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchParameters();
  }, []);

  useEffect(() => {
    let filtered = parameters;

    if (searchTerm) {
      filtered = filtered.filter((param) => {
        const term = searchTerm.toLowerCase();
        return (
          param.parameterKey?.toLowerCase().includes(term) ||
          param.parameterValue?.toLowerCase().includes(term) ||
          param.description?.toLowerCase().includes(term)
        );
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((param) =>
        statusFilter === 'active' ? param.isActive : !param.isActive
      );
    }

    setFilteredParameters(filtered);
    setCurrentPage(1);
  }, [parameters, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredParameters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredParameters.slice(startIndex, endIndex);

  const fetchParameters = async () => {
    try {
      setLoading(true);
      const data = await systemParameterService.getAll();
      setParameters(data || []);
      setFilteredParameters(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch system parameters');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, key) => {
    if (window.confirm(`Delete system parameter '${key}'?`)) {
      try {
        await systemParameterService.delete(id);
        const next = parameters.filter((param) => param.id !== id);
        setParameters(next);
      } catch (err) {
        setError(err.message || 'Failed to delete system parameter');
      }
    }
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>System Parameters</h2>
        <Link to="/system-parameters/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Parameter
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label htmlFor="search" className="form-label">Search</label>
              <input
                id="search"
                type="text"
                className="form-control"
                placeholder="Search parameter key, value or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="statusFilter" className="form-label">Status</label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <button
                type="button"
                className="btn btn-outline-secondary mt-2"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Parameter List</h5>
        </div>
        <div className="card-body p-0">
          {currentItems.length === 0 ? (
            <div className="p-4 text-center">
              <p className="mb-2">No system parameters found.</p>
              <Link to="/system-parameters/create" className="btn btn-outline-primary">
                Add the first parameter
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((param) => (
                    <tr key={param.id}>
                      <td>
                        <Link to={`/system-parameters/${param.id}`} className="text-decoration-none">
                          {param.parameterName || param.parameterKey || 'N/A'}
                        </Link>
                      </td>
                      <td>{param.parameterValue || 'N/A'}</td>
                      <td>{param.description || '—'}</td>
                      <td>
                        <span className={`badge ${param.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {param.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{formatDate(param.createdDate)}</td>
                      <td className="text-end">
                        <div className="btn-group" role="group">
                          <Link to={`/system-parameters/${param.id}`} className="btn btn-sm btn-outline-primary" title="View">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link to={`/system-parameters/${param.id}/edit`} className="btn btn-sm btn-outline-warning" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(param.id, param.parameterName || param.parameterKey)}
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredParameters.length)} of {filteredParameters.length}
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default SystemParameterList;
