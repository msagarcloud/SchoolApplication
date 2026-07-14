import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { empLeaveDetailsService } from '../../services/empLeaveDetailsService';

const EmpLeaveDetailsList = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    employeeName: '',
    leaveType: '',
    status: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = useMemo(() => {
    let filtered = records;

    if (filters.employeeName) {
      const q = filters.employeeName.toLowerCase();
      filtered = filtered.filter((r) => (r.employeeName || '').toLowerCase().includes(q));
    }

    if (filters.leaveType) {
      const q = filters.leaveType.toLowerCase();
      filtered = filtered.filter((r) => (r.leaveType || '').toLowerCase().includes(q));
    }

    if (filters.status) {
      const q = filters.status.toLowerCase();
      filtered = filtered.filter((r) => String(r.status || '').toLowerCase() === q);
    }

    return filtered;
  }, [records, filters]);

  useEffect(() => {
    setFilteredRecords(applyFilters);
    setCurrentPage(1);
  }, [applyFilters]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await empLeaveDetailsService.getAll();
      const list = Array.isArray(data) ? data : [];
      setRecords(list);
      setFilteredRecords(list);
    } catch (err) {
      setError(err.message || 'Failed to fetch employee leave details');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ employeeName: '', leaveType: '', status: '' });
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (id) => {
    const target = id;
    if (!window.confirm(`Are you sure you want to delete this record (${target})? This action cannot be undone.`)) return;

    try {
      await empLeaveDetailsService.delete(id);
      setRecords((prev) => prev.filter((r) => String(r.id || r.Id) !== String(id)));
      setFilteredRecords((prev) => prev.filter((r) => String(r.id || r.Id) !== String(id)));
    } catch (err) {
      setError(err.message || 'Failed to delete record');
    }
  };

  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
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

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Leave Details</h2>
        <Link to="/emp-leave-details/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Leave Detail
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col">
              <label className="form-label small">Employee Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.employeeName}
                onChange={(e) => handleFilterChange('employeeName', e.target.value)}
                placeholder="Search employee..."
              />
            </div>
            <div className="col">
              <label className="form-label small">Leave Type</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.leaveType}
                onChange={(e) => handleFilterChange('leaveType', e.target.value)}
                placeholder="Search leave type..."
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                placeholder="e.g. Approved / Pending"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Leave Details</h5>
          <span className="badge bg-secondary">
            Showing {paginatedRecords.length} of {filteredRecords.length} records
          </span>
        </div>

        <div className="card-body">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x display-4 text-muted"></i>
              <p className="text-muted mt-3">No leave details found</p>
              <Link to="/emp-leave-details/create" className="btn btn-outline-primary">
                Create First Record
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.map((r) => {
                    const id = r.id || r.Id;
                    return (
                      <tr key={id || `${r.employeeId}-${r.leaveType}-${r.fromDate}`}> 
                        <td>
                          {r.employeeName || r.employeeCode || 'N/A'}
                          {r.employeeCode ? <div className="small text-muted">{r.employeeCode}</div> : null}
                        </td>
                        <td>{r.leaveType || 'N/A'}</td>
                        <td>{r.fromDate || 'N/A'}</td>
                        <td>{r.toDate || 'N/A'}</td>
                        <td>
                          {r.status ? (
                            <span className={`badge ${
                              String(r.status).toLowerCase() === 'approved'
                                ? 'bg-success'
                                : String(r.status).toLowerCase() === 'rejected'
                                  ? 'bg-danger'
                                  : 'bg-warning'
                            }`}>
                              {r.status}
                            </span>
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link
                              to={`/emp-leave-details/${id}`}
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link
                              to={`/emp-leave-details/${id}/edit`}
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <label className="form-label mb-0 me-2">Items per page:</label>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {getPaginationNumbers().map((page, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                    >
                      {page === '...' ? (
                        <span className="page-link">...</span>
                      ) : (
                        <button className="page-link" onClick={() => setCurrentPage(page)}>
                          {page}
                        </button>
                      )}
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpLeaveDetailsList;

