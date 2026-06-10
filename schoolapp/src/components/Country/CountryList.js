import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { countryService } from '../../services/countryService';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import AlertMessage from '../common/AlertMessage';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await countryService.getAll();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = countries;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(country => 
        statusFilter === 'active' ? country.isActive : !country.isActive
      );
    }

    setFilteredCountries(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [countries, searchTerm, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredCountries.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await countryService.delete(id);
        setCountries(countries.filter(country => country.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete country');
      }
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Helper function to format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading countries..." />;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Country Management</h2>
        <Link to="/countries/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Country
        </Link>
      </div>

      {/* Filters Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-funnel me-2"></i>
            Filters
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="search" className="form-label">Search Country</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Enter country name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary"
                onClick={handleClearFilters}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Clear Filters
              </button>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <div className="text-muted small">
                <i className="bi bi-info-circle me-1"></i>
                {filteredCountries.length} of {countries.length} countries
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertMessage message={error} type="danger" dismissible onClose={() => setError('')} />

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All Countries</h5>
        </div>
        <div className="card-body">
          {currentItems.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-globe display-4 text-muted"></i>
              <p className="text-muted mt-3">
                {filteredCountries.length === 0 ? 'No countries found' : 'No countries match your filters'}
              </p>
              <div>
                {countries.length === 0 ? (
                  <Link to="/countries/create" className="btn btn-outline-primary">
                    Create First Country
                  </Link>
                ) : (
                  <button className="btn btn-outline-secondary" onClick={handleClearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((country) => (
                    <tr key={country.id}>
                      <td>
                        <Link to={`/countries/${country.id}`} className="text-decoration-none">
                          {country.countryName || 'N/A'}
                        </Link>
                      </td>
                      <td>
                        <span className={`badge ${country.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {country.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        {formatDate(country.createdDate)}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link 
                            to={`/countries/${country.id}`} 
                            className="btn btn-sm btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link 
                            to={`/countries/${country.id}/edit`} 
                            className="btn btn-sm btn-outline-warning"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(country.id, country.countryName)}
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
            
            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredCountries.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryList;
