import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import AlertMessage from '../common/AlertMessage';

const StateList = () => {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchStates();
    fetchCountries();
  }, []);

  const fetchStates = async () => {
    try {
      setLoading(true);
      const data = await stateService.getAll();
      setStates(data);
      setFilteredStates(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch states');
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const data = await countryService.getAll();
      setCountries(data);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
    }
  };

  useEffect(() => {
    let filtered = states;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(state =>
        state.stateName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(state => 
        statusFilter === 'active' ? state.isActive : !state.isActive
      );
    }

    // Apply country filter
    if (countryFilter !== 'all') {
      filtered = filtered.filter(state => state.countryId === countryFilter);
    }

    filtered = [...filtered].sort((a, b) =>
      (a.stateName || '').localeCompare(b.stateName || '', undefined, { sensitivity: 'base' })
    );

    setFilteredStates(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [states, searchTerm, statusFilter, countryFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredStates.slice(startIndex, endIndex);

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
        await stateService.delete(id);
        setStates(states.filter(state => state.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete state');
      }
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCountryFilter('all');
    setCurrentPage(1);
  };

  const getCountryName = (countryId) => {
    const country = countries.find(c => c.id === countryId);
    return country ? country.countryName : 'N/A';
  };

  if (loading) {
    return <LoadingSpinner message="Loading states..." />;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>State Management</h2>
        <Link to="/states/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New State
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
            <div className="col-md-3">
              <label htmlFor="search" className="form-label">Search State</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Enter state name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="country" className="form-label">Country</label>
              <select
                className="form-select"
                id="country"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
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
            <div className="col-md-2 d-flex align-items-end">
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
                {filteredStates.length} of {states.length} states
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertMessage message={error} type="danger" dismissible onClose={() => setError('')} />

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All States</h5>
        </div>
        <div className="card-body">
          {currentItems.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-geo-alt display-4 text-muted"></i>
              <p className="text-muted mt-3">
                {filteredStates.length === 0 ? 'No states found' : 'No states match your filters'}
              </p>
              <div>
                {states.length === 0 ? (
                  <Link to="/states/create" className="btn btn-outline-primary">
                    Create First State
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
                      <th>State Name</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((state) => (
                    <tr key={state.id}>
                      <td>
                        <Link to={`/states/${state.id}`} className="text-decoration-none">
                          {state.stateName || 'N/A'}
                        </Link>
                      </td>
                      <td>
                        {getCountryName(state.countryId)}
                      </td>
                      <td>
                        <span className={`badge ${state.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {state.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        {new Date(state.createdDate).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link 
                            to={`/states/${state.id}`} 
                            className="btn btn-sm btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link 
                            to={`/states/${state.id}/edit`} 
                            className="btn btn-sm btn-outline-warning"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(state.id, state.stateName)}
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
              totalItems={filteredStates.length}
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

export default StateList;
