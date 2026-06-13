import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { designationService } from '../../services/designationService';

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    code: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const designationData = await designationService.getAll();

        setDesignations(
          Array.isArray(designationData) ? designationData : []
        );
      } catch (err) {
        setError(err.message || 'Failed to load designations');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDesignationName = (designation) => {
    return (
      designation.designationName ||
      designation.name ||
      designation.DesignationName ||
      designation.Name ||
      'Untitled'
    );
  };

  const getDesignationCode = (designation) => {
    return (
      designation.designationCode ||
      designation.code ||
      designation.DesignationCode ||
      designation.Code ||
      ''
    );
  };

  const filteredDesignations = useMemo(() => {
    return designations.filter((designation) => {
      const name = getDesignationName(designation).toLowerCase();
      const code = getDesignationCode(designation).toLowerCase();

      if (
        filters.name &&
        !name.includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.code &&
        !code.includes(filters.code.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [designations, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDesignations.length / itemsPerPage)
  );

  const pageDesignations = filteredDesignations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this designation?'
      )
    ) {
      return;
    }

    try {
      await designationService.delete(id);

      setDesignations((prev) =>
        prev.filter((item) => (item.id || item.Id) !== id)
      );
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
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Designation Management</h2>

        <Link
          to="/designations/create"
          className="btn btn-primary"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Designation
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>

        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label small">
                Designation Name
              </label>

              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.name}
                onChange={(e) =>
                  handleFilterChange(
                    'name',
                    e.target.value
                  )
                }
                placeholder="Search by designation name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small">
                Designation Code
              </label>

              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.code}
                onChange={(e) =>
                  handleFilterChange(
                    'code',
                    e.target.value
                  )
                }
                placeholder="Search by designation code"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Designation Name</th>
              <th>Designation Code</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pageDesignations.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4"
                >
                  No designations found.
                </td>
              </tr>
            ) : (
              pageDesignations.map((designation) => {
                const id =
                  designation.id || designation.Id;

                return (
                  <tr key={id}>
                    <td>
                      {getDesignationName(designation)}
                    </td>

                    <td>
                      {getDesignationCode(designation)}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          designation.isActive === false
                            ? 'bg-danger'
                            : 'bg-success'
                        }`}
                      >
                        {designation.isActive === false
                          ? 'Inactive'
                          : 'Active'}
                      </span>
                    </td>

                    <td className="text-end">
                      <Link
                        to={`/designations/${id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                      >
                        View
                      </Link>

                      <Link
                        to={`/designations/${id}/edit`}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(id)
                        }
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Designation pagination">
          <ul className="pagination justify-content-center mt-3">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <li
                key={page}
                className={`page-item ${
                  page === currentPage
                    ? 'active'
                    : ''
                }`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
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