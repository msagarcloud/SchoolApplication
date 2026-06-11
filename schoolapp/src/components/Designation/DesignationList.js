import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { designationService } from '../../services/designationService';
import { departmentService } from '../../services/departmentService';

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState({ name: '', departmentId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const departmentMap = useMemo(() => {
    return departments.reduce((map, department) => {
      map[department.id] = department.departmentName || department.name || department.DepartmentName || department.Name || 'N/A';
      return map;
    }, {});
  }, [departments]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [designationData, departmentData] = await Promise.all([
          designationService.getAll(),
          departmentService.getAll()
        ]);

        setDesignations(Array.isArray(designationData) ? designationData : []);
        setDepartments(Array.isArray(departmentData) ? departmentData : []);
      } catch (err) {
        setError(err.message || 'Failed to load designations');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDesignationName = (designation) => {
    return designation.designationName || designation.name || designation.DesignationName || designation.Name || 'Untitled';
  };

  const getDepartmentName = (designation) => {
    if (!designation) return 'N/A';
    if (designation.department) {
      return designation.department.departmentName || designation.department.name || 'N/A';
    }
    const id = designation.departmentId || designation.DepartmentId;
    return departmentMap[id] || 'N/A';
  };

  const filteredDesignations = useMemo(() => {
    return designations.filter((designation) => {
      const name = getDesignationName(designation).toLowerCase();
      if (filters.name && !name.includes(filters.name.toLowerCase())) {
        return false;
      }
      const departmentId = designation.departmentId || designation.DepartmentId;
      if (filters.departmentId && filters.departmentId !== departmentId) {
        return false;
      }
      return true;
    });
  }, [designations, filters, departmentMap]);

  const totalPages = Math.max(1, Math.ceil(filteredDesignations.length / itemsPerPage));
  const pageDesignations = filteredDesignations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this designation?')) {
      return;
    }

    try {
      await designationService.delete(id);
      setDesignations(designations.filter((item) => (item.id || item.Id) !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete designation');
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
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
        <h2>Designation Management</h2>
        <Link to="/designations/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Designation
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
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label small">Designation Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                placeholder="Search by name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small">Department</label>
              <select
                className="form-select form-select-sm"
                value={filters.departmentId}
                onChange={(e) => handleFilterChange('departmentId', e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.departmentName || department.name || department.DepartmentName || department.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageDesignations.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No designations found.
                </td>
              </tr>
            ) : (
              pageDesignations.map((designation) => {
                const id = designation.id || designation.Id;
                return (
                  <tr key={id || Math.random()}>
                    <td>{getDesignationName(designation)}</td>
                    <td>{getDepartmentName(designation)}</td>
                    <td>
                      <span className={`badge ${designation.isActive === false ? 'bg-danger' : 'bg-success'}`}>
                        {designation.isActive === false ? 'Inactive' : 'Active'}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link to={`/designations/${id}`} className="btn btn-sm btn-outline-secondary me-2">
                        View
                      </Link>
                      <Link to={`/designations/${id}/edit`} className="btn btn-sm btn-outline-warning me-2">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav aria-label="Designation pagination">
          <ul className="pagination justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button type="button" className="page-link" onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default DesignationList;
