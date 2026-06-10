import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import supplierService from '../../services/supplierService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { authService } from '../../services/authService';
import { cityService } from '../../services/cityService';
import { stateService } from '../../services/stateService';
import { countryService } from '../../services/countryService';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [companyMap, setCompanyMap] = useState({});
  const [schoolMap, setSchoolMap] = useState({});
  const [cityMap, setCityMap] = useState({});
  const [stateMap, setStateMap] = useState({});
  const [countryMap, setCountryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    status: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const applyFilters = useCallback(() => {
    let filtered = suppliers;

    if (filters.name) {
      filtered = filtered.filter(supplier =>
        supplier.name?.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(supplier =>
        supplier.emailId?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(supplier =>
        supplier.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredSuppliers(filtered);
  }, [suppliers, filters]);

  useEffect(() => {
    fetchCompanies();
    fetchCities();
    fetchStates();
    fetchCountries();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      email: '',
      status: ''
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

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await supplierService.getSuppliers();
      setSuppliers(data);
      setFilteredSuppliers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const [companyData, schoolData] = await Promise.allSettled([
        companyService.getAll(),
        schoolService.getAll()
      ]);

      const companyList = companyData.status === 'fulfilled' && Array.isArray(companyData.value)
        ? companyData.value
        : [];

      const map = companyList.reduce((acc, company) => {
        const companyId = company.id || company.companyId || company.CompanyId;
        const companyName = company.companyName || company.name || company.CompanyName;
        if (companyId) {
          acc[companyId] = companyName || 'Unknown Company';
        }
        return acc;
      }, {});
      setCompanyMap(map);

      const schoolList = schoolData.status === 'fulfilled' && Array.isArray(schoolData.value)
        ? schoolData.value
        : [];

      const sMap = schoolList.reduce((acc, school) => {
        const schoolId = school.id || school.schoolId || school.SchoolId;
        const schoolName = school.name || school.schoolName || school.SchoolName;
        if (schoolId) acc[schoolId] = schoolName || 'Unknown School';
        return acc;
      }, {});
      setSchoolMap(sMap);
    } catch (err) {
      console.error('Failed to load companies or schools for supplier list:', err);
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
      console.error('Failed to load cities for supplier list:', err);
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
      console.error('Failed to load states for supplier list:', err);
      setStateMap({});
    }
  };

  const fetchCountries = async () => {
    try {
      const countryData = await countryService.getAll();
      const countryList = Array.isArray(countryData) ? countryData : [];
      const map = countryList.reduce((acc, country) => {
        const countryId = country.id || country.countryId || country.CountryId;
        const countryName = country.countryName || country.name || country.CountryName;
        if (countryId) {
          acc[countryId] = countryName || 'Unknown Country';
        }
        return acc;
      }, {});
      setCountryMap(map);
    } catch (err) {
      console.error('Failed to load countries for supplier list:', err);
      setCountryMap({});
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete supplier "${name}"?`)) {
      try {
        await supplierService.deleteSupplier(id);
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        setFilteredSuppliers(filteredSuppliers.filter(supplier => supplier.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete supplier');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'success', icon: 'check-circle' },
      'Inactive': { bg: 'danger', icon: 'x-circle' },
      'Updated': { bg: 'warning', icon: 'pencil' },
      'Deleted': { bg: 'secondary', icon: 'trash' }
    };
    
    const config = statusConfig[status] || { bg: 'secondary', icon: 'question-circle' };
    
    return (
      <span className={`badge bg-${config.bg}`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getSupplierCompanyName = (supplier) => {
    const zeroGuid = '00000000-0000-0000-0000-000000000000';
    const resolvedName =
      supplier.companyName ||
      supplier.company?.companyName ||
      supplier.company?.name ||
      companyMap[supplier.companyId];

    if (resolvedName) {
      return resolvedName;
    }

    if (supplier.companyId === zeroGuid) {
      return authService.getCompanyName() || 'N/A';
    }

    return supplier.companyId || 'N/A';
  };

  const getCityName = (supplier) => {
    const resolvedName =
      supplier.cityName ||
      supplier.city?.cityName ||
      supplier.city?.name ||
      cityMap[supplier.cityId];

    return resolvedName || supplier.cityId || 'N/A';
  };

  const getStateName = (supplier) => {
    const resolvedName =
      supplier.stateName ||
      supplier.state?.stateName ||
      supplier.state?.name ||
      stateMap[supplier.stateId];

    return resolvedName || supplier.stateId || 'N/A';
  };

  const getCountryName = (supplier) => {
    const resolvedName =
      supplier.countryName ||
      supplier.country?.countryName ||
      supplier.country?.name ||
      countryMap[supplier.countryId];

    return resolvedName || supplier.countryId || 'N/A';
  };

  const getSupplierSchoolName = (supplier) => {
    const zeroGuid = '00000000-0000-0000-0000-000000000000';
    const resolvedName =
      supplier.schoolName ||
      supplier.school?.name ||
      supplier.school?.schoolName ||
      schoolMap[supplier.schoolId];

    if (resolvedName) return resolvedName;
    if (supplier.schoolId === zeroGuid) return authService.getSchoolName() || 'N/A';
    return supplier.schoolId || 'N/A';
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
        <h2>Supplier Management</h2>
        <Link to="/suppliers/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Supplier
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
              <label className="form-label small">Supplier Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search supplier name..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
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
              <label className="form-label small">Status</label>
              <select
                className="form-select form-select-sm"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
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
          <h5 className="mb-0">All Suppliers</h5>
          <span className="badge bg-secondary">
            Showing {paginatedSuppliers.length} of {filteredSuppliers.length} suppliers
          </span>
        </div>
        <div className="card-body">
          {filteredSuppliers.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-shop display-4 text-muted"></i>
              <p className="text-muted mt-3">No suppliers found</p>
              <Link to="/suppliers/create" className="btn btn-outline-primary">
                Add First Supplier
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Supplier Name</th>
                      <th>Contact Info</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Email</th>
                      <th>Zip Code</th>
                      <th>School</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSuppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>
                          <Link to={`/suppliers/${supplier.id}`} className="text-decoration-none">
                            <strong>{supplier.name}</strong>
                            <div className="small text-muted">{supplier.description}</div>
                          </Link>
                        </td>
                        <td>
                          <div>
                            <i className="bi bi-telephone me-1"></i>
                            {supplier.phoneNumber || supplier.mobileNumber || 'N/A'}
                          </div>
                        </td>
                        <td>
                          <div>{supplier.address1}</div>
                          {supplier.address2 && <div className="small">{supplier.address2}</div>}
                        </td>
                        <td>{getCityName(supplier)}</td>
                        <td>{getStateName(supplier)}</td>
                        <td>{getCountryName(supplier)}</td>
                        <td>
                          <i className="bi bi-envelope me-1"></i>
                          {supplier.emailId || 'N/A'}
                        </td>
                        <td>
                          {supplier.zipCode || 'N/A'}
                        </td>
                        <td>
                          <span className="badge bg-info">{getSupplierSchoolName(supplier)}</span>
                        </td>
                        <td>
                          <span className="badge bg-info">{getSupplierCompanyName(supplier)}</span>
                        </td>
                        <td>{getStatusBadge(supplier.status)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link 
                              to={`/suppliers/${supplier.id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link 
                              to={`/suppliers/${supplier.id}/edit`} 
                              className="btn btn-sm btn-outline-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(supplier.id, supplier.name)}
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

export default SupplierList;
