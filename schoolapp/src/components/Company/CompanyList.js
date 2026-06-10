import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    companyName: '',
    email: '',
    cityId: '',
    stateId: '',
    countryId: '',
    establishmentYear: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Create lookup maps using useMemo to ensure they update when data changes
  const cityMap = useMemo(() => {
    return cities.reduce((map, city) => {
      map[city.id] = city.cityName;
      return map;
    }, {});
  }, [cities]);

  const stateMap = useMemo(() => {
    return states.reduce((map, state) => {
      map[state.id] = state.stateName;
      return map;
    }, {});
  }, [states]);

  const countryMap = useMemo(() => {
    return countries.reduce((map, country) => {
      map[country.id] = country.countryName;
      return map;
    }, {});
  }, [countries]);

  // Helper function to get jurisdiction area display
  const getJurisdictionAreaDisplay = (jurisdictionAreaId) => {
    if (!jurisdictionAreaId || jurisdictionAreaId === '00000000-0000-0000-0000-000000000000') {
      return 'Not Set';
    }
    
    const cityName = cityMap[jurisdictionAreaId];
    if (cityName) {
      return cityName;
    }
    
    return `ID: ${jurisdictionAreaId}`;
  };

  useEffect(() => {
    fetchLocationData().then(() => {
      fetchCompanies();
    });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [companies, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const applyFilters = () => {
    let filtered = companies;

    if (filters.companyName) {
      filtered = filtered.filter(company =>
        company.companyName?.toLowerCase().includes(filters.companyName.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(company =>
        company.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.cityId) {
      filtered = filtered.filter(company => company.cityId === filters.cityId);
    }

    if (filters.stateId) {
      filtered = filtered.filter(company => company.stateId === filters.stateId);
    }

    if (filters.countryId) {
      filtered = filtered.filter(company => company.countryId === filters.countryId);
    }

    if (filters.establishmentYear) {
      filtered = filtered.filter(company =>
        company.establishmentYear?.includes(filters.establishmentYear)
      );
    }

    setFilteredCompanies(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      companyName: '',
      email: '',
      cityId: '',
      stateId: '',
      countryId: '',
      establishmentYear: ''
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
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
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const fetchLocationData = async () => {
    try {
      const [citiesData, statesData, countriesData] = await Promise.all([
        cityService.getAll(),
        stateService.getAll(),
        countryService.getAll()
      ]);
      console.log('Cities data:', citiesData);
      console.log('City IDs:', citiesData.map(c => c.id));
      setCities(citiesData);
      setStates(statesData);
      setCountries(countriesData);
      return Promise.resolve();
    } catch (err) {
      console.error('Failed to fetch location data:', err);
      return Promise.reject(err);
    }
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getAll();
      console.log('Companies data:', data);
      if (data && data.length > 0) {
        console.log('Sample company jurisdiction area:', data[0]?.JudistrictionArea);
        console.log('Available city IDs:', cities.map(c => c.id));
        console.log('City map:', cityMap);
        console.log('Jurisdiction area mapping:', data[0]?.JudistrictionArea ? cityMap[data[0].JudistrictionArea] : 'No jurisdiction area');
        
        // Check all companies for jurisdiction areas
        data.forEach((company, index) => {
          console.log(`Company ${index + 1}: ${company.companyName}, JurisdictionArea: ${company.JudistrictionArea}, Display: ${getJurisdictionAreaDisplay(company.JudistrictionArea)}`);
        });
      }
      setCompanies(data);
      setFilteredCompanies(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, companyName) => {
    if (window.confirm(`Are you sure you want to delete "${companyName}"?`)) {
      try {
        await companyService.delete(id);
        setCompanies(companies.filter(company => company.id !== id));
        setFilteredCompanies(filteredCompanies.filter(company => company.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete company');
      }
    }
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
        <h2>Company Management</h2>
        <Link to="/companies/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Company
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Filters Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col">
              <label className="form-label small">Company Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search company..."
                value={filters.companyName}
                onChange={(e) => handleFilterChange('companyName', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search email..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label small">Country</label>
              <select
                className="form-select form-select-sm"
                value={filters.countryId}
                onChange={(e) => handleFilterChange('countryId', e.target.value)}
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">State</label>
              <select
                className="form-select form-select-sm"
                value={filters.stateId}
                onChange={(e) => handleFilterChange('stateId', e.target.value)}
                disabled={!filters.countryId}
              >
                <option value="">All States</option>
                {states
                  .filter(state => !filters.countryId || state.countryId === filters.countryId)
                  .map(state => (
                    <option key={state.id} value={state.id}>
                      {state.stateName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">City</label>
              <select
                className="form-select form-select-sm"
                value={filters.cityId}
                onChange={(e) => handleFilterChange('cityId', e.target.value)}
                disabled={!filters.stateId}
              >
                <option value="">All Cities</option>
                {cities
                  .filter(city => !filters.stateId || city.stateId === filters.stateId)
                  .map(city => (
                    <option key={city.id} value={city.id}>
                      {city.cityName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col">
              <label className="form-label small">Year</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Year..."
                value={filters.establishmentYear}
                onChange={(e) => handleFilterChange('establishmentYear', e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Companies</h5>
          <span className="badge bg-secondary">
            Showing {paginatedCompanies.length} of {filteredCompanies.length} companies
          </span>
        </div>
        <div className="card-body">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-building display-4 text-muted"></i>
              <p className="text-muted mt-3">No companies found</p>
              <Link to="/companies/create" className="btn btn-outline-primary">
                Create First Company
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Establishment Year</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Jurisdiction Area</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>
                          <Link to={`/companies/${company.id}`} className="text-decoration-none">
                            {company.companyName || 'N/A'}
                          </Link>
                        </td>
                        <td>{company.establishmentYear || 'N/A'}</td>
                        <td>{company.address || 'N/A'}</td>
                        <td>{cityMap[company.cityId] || 'N/A'}</td>
                        <td>{stateMap[company.stateId] || 'N/A'}</td>
                        <td>{countryMap[company.countryId] || 'N/A'}</td>
                        <td>
                          {getJurisdictionAreaDisplay(company.JudistrictionArea)}
                        </td>
                        <td>{company.email || 'N/A'}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/companies/${company.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/companies/${company.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(company.id, company.companyName)}
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
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <label className="form-label mb-0 me-2">Items per page:</label>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 'auto' }}
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
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
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {getPaginationNumbers().map((page, index) => (
                        <li
                          key={index}
                          className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                        >
                          {page === '...' ? (
                            <span className="page-link">...</span>
                          ) : (
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          )}
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
