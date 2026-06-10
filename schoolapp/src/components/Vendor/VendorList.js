import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import vendorService from '../../services/vendorService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { authService } from '../../services/authService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';

const STATUS_CONFIG = {
  'Active': { bg: 'success', icon: 'check-circle' },
  'Inactive': { bg: 'danger', icon: 'x-circle' },
  'Updated': { bg: 'warning', icon: 'pencil' },
  'Deleted': { bg: 'secondary', icon: 'trash' }
};

const ZERO_GUID = '00000000-0000-0000-0000-000000000000';

const getStatusBadge = (status) => {
  const config = STATUS_CONFIG[status] || { bg: 'secondary', icon: 'question-circle' };
  
  return (
    <span className={`badge bg-${config.bg}`}>
      <i className={`bi bi-${config.icon} me-1`}></i>
      {status}
    </span>
  );
};

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [companyMap, setCompanyMap] = useState({});
  const [schoolMap, setSchoolMap] = useState({});
  const [cityMap, setCityMap] = useState({});
  const [stateMap, setStateMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    vendorName: '',
    email: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchLookups();
    fetchCities();
    fetchStates();
    fetchVendors();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = vendors;

    if (filters.vendorName) {
      filtered = filtered.filter(vendor =>
        vendor.vendorName?.toLowerCase().includes(filters.vendorName.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(vendor =>
        vendor.emailId?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(vendor =>
        vendor.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredVendors(filtered);
  }, [vendors, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedVendors = filteredVendors.slice(startIndex, endIndex);
    return { totalPages, startIndex, endIndex, paginatedVendors };
  }, [filteredVendors, currentPage, itemsPerPage]);

  const { totalPages, paginatedVendors } = paginationData;



  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleVendorNameChange = useCallback((e) => {
    handleFilterChange('vendorName', e.target.value);
  }, [handleFilterChange]);

  const handleEmailChange = useCallback((e) => {
    handleFilterChange('email', e.target.value);
  }, [handleFilterChange]);

  const handleStatusChange = useCallback((e) => {
    handleFilterChange('status', e.target.value);
  }, [handleFilterChange]);

  const clearFilters = useCallback(() => {
    setFilters({
      vendorName: '',
      email: '',
      status: ''
    });
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  const paginationNumbers = useMemo(() => {
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
  }, [totalPages, currentPage]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const data = await vendorService.getVendors();
      setVendors(data);
      setFilteredVendors(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const fetchLookups = async () => {
    try {
      const [companyRes, schoolRes] = await Promise.allSettled([
        companyService.getAll(),
        schoolService.getAll()
      ]);

      const companies = companyRes.status === 'fulfilled' && Array.isArray(companyRes.value)
        ? companyRes.value
        : [];
      const cMap = companies.reduce((acc, c) => {
        const id = c.id || c.companyId || c.CompanyId;
        const name = c.companyName || c.name || c.CompanyName;
        if (id) acc[id] = name || 'Unknown Company';
        return acc;
      }, {});
      setCompanyMap(cMap);

      const schools = schoolRes.status === 'fulfilled' && Array.isArray(schoolRes.value)
        ? schoolRes.value
        : [];
      const sMap = schools.reduce((acc, s) => {
        const id = s.id || s.schoolId || s.SchoolId;
        const name = s.name || s.schoolName || s.SchoolName;
        if (id) acc[id] = name || 'Unknown School';
        return acc;
      }, {});
      setSchoolMap(sMap);
    } catch (err) {
      console.error('Failed to fetch company/school lookups:', err);
      setCompanyMap({});
      setSchoolMap({});
    }
  };

  const fetchCities = async () => {
    try {
      const cityData = await cityService.getAll();
      const cityList = Array.isArray(cityData) ? cityData : [];
      const map = cityList.reduce((acc, city) => {
        const cityId = city.id || city.cityId || city.CityId;
        const cityName = city.cityName || city.name || city.CityName;
        if (cityId) {
          acc[cityId] = cityName || 'Unknown City';
        }
        return acc;
      }, {});
      setCityMap(map);
    } catch (err) {
      console.error('Failed to load cities for vendor list:', err);
      setCityMap({});
    }
  };

  const fetchStates = async () => {
    try {
      const stateData = await stateService.getAll();
      const stateList = Array.isArray(stateData) ? stateData : [];
      const map = stateList.reduce((acc, state) => {
        const stateId = state.id || state.stateId || state.StateId;
        const stateName = state.stateName || state.name || state.StateName;
        if (stateId) {
          acc[stateId] = stateName || 'Unknown State';
        }
        return acc;
      }, {});
      setStateMap(map);
    } catch (err) {
      console.error('Failed to load states for vendor list:', err);
      setStateMap({});
    }
  };

  const handleDelete = async (id, vendorName) => {
    if (window.confirm(`Are you sure you want to delete vendor "${vendorName}"?`)) {
      try {
        await vendorService.deleteVendor(id);
        setVendors(vendors.filter(vendor => vendor.id !== id));
        setFilteredVendors(filteredVendors.filter(vendor => vendor.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete vendor');
      }
    }
  };

  const getVendorCompanyName = useCallback((vendor) => {
    const resolved = vendor.companyName || vendor.company?.companyName || companyMap[vendor.companyId];
    if (resolved) return resolved;
    if (vendor.companyId === ZERO_GUID) return authService.getCompanyName() || 'N/A';
    return vendor.companyId || 'N/A';
  }, [companyMap]);

  const getVendorSchoolName = useCallback((vendor) => {
    const resolved = vendor.schoolName || vendor.school?.name || schoolMap[vendor.schoolId];
    if (resolved) return resolved;
    if (vendor.schoolId === ZERO_GUID) return authService.getSchoolName() || 'N/A';
    return vendor.schoolId || 'N/A';
  }, [schoolMap]);

  const getCityName = useCallback((vendor) => {
    const resolvedName =
      vendor.cityName ||
      vendor.city?.cityName ||
      vendor.city?.name ||
      cityMap[vendor.cityId];

    return resolvedName || vendor.cityId || 'N/A';
  }, [cityMap]);

  const getStateName = useCallback((vendor) => {
    const resolvedName =
      vendor.stateName ||
      vendor.state?.stateName ||
      vendor.state?.name ||
      stateMap[vendor.stateId];

    return resolvedName || vendor.stateId || 'N/A';
  }, [stateMap]);

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
        <h2>Vendor Management</h2>
        <Link to="/vendors/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Vendor
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
              <label className="form-label small">Vendor Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search vendor name..."
                value={filters.vendorName}
                onChange={handleVendorNameChange}
              />
            </div>
            <div className="col">
              <label className="form-label small">Email</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search email..."
                value={filters.email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="col">
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={handleStatusChange}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Updated">Updated</option>
                <option value="Deleted">Deleted</option>
              </select>
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
          <h5 className="mb-0">All Vendors</h5>
          <span className="badge bg-secondary">
            Showing {paginatedVendors.length} of {filteredVendors.length} vendors
          </span>
        </div>
        <div className="card-body">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-shop display-4 text-muted"></i>
              <p className="text-muted mt-3">No vendors found</p>
              <Link to="/vendors/create" className="btn btn-outline-primary">
                Add First Vendor
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Vendor Name</th>
                      <th>Contact Info</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Zip Code</th>
                      <th>Email</th>
                      <th>School</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedVendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td>
                          <Link to={`/vendors/${vendor.id}`} className="text-decoration-none">
                            <strong>{vendor.vendorName}</strong>
                            <div className="small text-muted">{vendor.description}</div>
                          </Link>
                        </td>
                        <td>
                          <div>
                            <i className="bi bi-telephone me-1"></i>
                            {vendor.contactNumber || vendor.mobileNumber || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div>{vendor.address1}</div>
                          {vendor.address2 && <div className="small">{vendor.address2}</div>}
                        </td>
                        <td>{getCityName(vendor)}</td>
                        <td>{getStateName(vendor)}</td>
                        <td>{vendor.zipCode || 'N/A'}</td>
                        <td>
                          <i className="bi bi-envelope me-1"></i>
                          {vendor.emailId || 'N/A'}
                        </td>
                        <td>
                          <span className="badge bg-info">{getVendorSchoolName(vendor)}</span>
                        </td>
                        <td>
                          <span className="badge bg-info">{getVendorCompanyName(vendor)}</span>
                        </td>
                        <td>{getStatusBadge(vendor.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/vendors/${vendor.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/vendors/${vendor.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(vendor.id, vendor.vendorName)}
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
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {paginationNumbers.map((page, index) => (
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
                          onClick={handleNextPage}
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

export default VendorList;
