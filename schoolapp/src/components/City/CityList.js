import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import AlertMessage from '../common/AlertMessage';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCities();
    fetchStates();
    fetchCountries();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await cityService.getAll();
      setCities(data);
      setFilteredCities(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const data = await stateService.getAll();
      setStates(data);
    } catch (err) {
      console.error('Failed to fetch states:', err);
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
    let filtered = cities;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(city =>
        city.cityName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(city => 
        statusFilter === 'active' ? city.isActive : !city.isActive
      );
    }

    // Apply state filter
    if (stateFilter !== 'all') {
      filtered = filtered.filter(city => city.cityStateId === stateFilter);
    }

    // Apply country filter (filter by state's country)
    if (countryFilter !== 'all') {
      const countryStateIds = states
        .filter(state => state.countryId === countryFilter)
        .map(state => state.id);
      filtered = filtered.filter(city => countryStateIds.includes(city.cityStateId));
    }

    filtered = [...filtered].sort((a, b) =>
      (a.cityName || '').localeCompare(b.cityName || '', undefined, { sensitivity: 'base' })
    );

    setFilteredCities(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [cities, searchTerm, statusFilter, stateFilter, countryFilter, states]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredCities.slice(startIndex, endIndex);

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
        await cityService.delete(id);
        setCities(cities.filter(city => city.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete city');
      }
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setStateFilter('all');
    setCountryFilter('all');
    setCurrentPage(1);
  };

  const getStateName = (stateId) => {
    const state = states.find(s => s.id === stateId);
    return state ? state.stateName : 'N/A';
  };

  const getCountryName = (stateId) => {
    const state = states.find(s => s.id === stateId);
    if (state) {
      const country = countries.find(c => c.id === state.countryId);
      return country ? country.countryName : 'N/A';
    }
    return 'N/A';
  };

  const formatCreatedDate = (value) => {
    if (value == null || value === '') return '—';
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString();
  };

  if (loading) {
    return <LoadingSpinner message="Loading cities..." />;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>City Management</h2>
        <Link to="/cities/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New City
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
              <label htmlFor="search" className="form-label">Search City</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Enter city name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <label htmlFor="country" className="form-label">Country</label>
              <select
                className="form-select"
                id="country"
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setStateFilter('all'); // Reset state filter when country changes
                }}
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
              <label htmlFor="state" className="form-label">State</label>
              <select
                className="form-select"
                id="state"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                disabled={countryFilter !== 'all' && states.filter(s => s.countryId === countryFilter).length === 0}
              >
                <option value="all">All States</option>
                {states
                  .filter(state => countryFilter === 'all' || state.countryId === countryFilter)
                  .map(state => (
                    <option key={state.id} value={state.id}>
                      {state.stateName}
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
            <div className="col-md-1 d-flex align-items-end">
              <div className="text-muted small">
                <i className="bi bi-info-circle me-1"></i>
                {filteredCities.length} of {cities.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertMessage message={error} type="danger" dismissible onClose={() => setError('')} />

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">All Cities</h5>
        </div>
        <div className="card-body">
          {currentItems.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-building display-4 text-muted"></i>
              <p className="text-muted mt-3">
                {filteredCities.length === 0 ? 'No cities found' : 'No cities match your filters'}
              </p>
              <div>
                {cities.length === 0 ? (
                  <Link to="/cities/create" className="btn btn-outline-primary">
                    Create First City
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
                      <th>City Name</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((city) => (
                    <tr key={city.id}>
                      <td>
                        <Link to={`/cities/${city.id}`} className="text-decoration-none">
                          {city.cityName || 'N/A'}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/states/${city.cityStateId}`} className="text-decoration-none">
                          {getStateName(city.cityStateId)}
                        </Link>
                      </td>
                      <td>
                        {getCountryName(city.cityStateId)}
                      </td>
                      <td>
                        <span className={`badge ${city.isActive ? 'bg-success' : 'bg-danger'}`}>
                          {city.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        {formatCreatedDate(city.createdDate)}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link 
                            to={`/cities/${city.id}`} 
                            className="btn btn-sm btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link 
                            to={`/cities/${city.id}/edit`} 
                            className="btn btn-sm btn-outline-warning"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(city.id, city.cityName)}
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
              totalItems={filteredCities.length}
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

export default CityList;
