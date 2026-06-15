import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { itemLocationService } from '../../services/itemLocationService';
import { companyService } from '../../services/companyService';
import { schoolService } from '../../services/schoolService';
import { useSessionData } from '../../hooks/useSessionData';

const ItemLocationList = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { sessionData, isSuperAdmin } = useSessionData();

  // Filters
  const [filters, setFilters] = useState({
    locationName: '',
    building: '',
    locationFloor: '',
    companyId: isSuperAdmin ? '' : sessionData.companyId,
    schoolId: isSuperAdmin ? '' : sessionData.schoolId,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const companyMap = useMemo(() => {
    return companies.reduce((map, c) => {
      map[c.id] = c.companyName;
      return map;
    }, {});
  }, [companies]);

  const schoolMap = useMemo(() => {
    return schools.reduce((map, s) => {
      map[s.id] = s.name || s.schoolName;
      return map;
    }, {});
  }, [schools]);

  const fetchDependencies = useCallback(async () => {
    try {
      const [companiesData, schoolsData] = await Promise.all([
        companyService.getAll(),
        schoolService.getAll()
      ]);
      setCompanies(companiesData || []);
      setSchools(schoolsData || []);
    } catch (err) {
      console.error('Failed to load companies or schools', err);
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await itemLocationService.getAll();
      
      // Filter out non-matching company/school if not superadmin
      let result = data;
      if (!isSuperAdmin) {
        result = data.filter(l => 
          l.companyId === sessionData.companyId && 
          l.schoolId === sessionData.schoolId
        );
      }
      setLocations(result);
      setFilteredLocations(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch item locations');
    } finally {
      setLoading(false);
    }
  }, [isSuperAdmin, sessionData]);

  useEffect(() => {
    fetchDependencies().then(() => {
      fetchLocations();
    });
  }, [fetchDependencies, fetchLocations]);

  // Apply filters client-side
  useEffect(() => {
    let result = locations;

    if (filters.locationName) {
      result = result.filter(l =>
        l.locationName?.toLowerCase().includes(filters.locationName.toLowerCase())
      );
    }

    if (filters.building) {
      result = result.filter(l =>
        l.building?.toLowerCase().includes(filters.building.toLowerCase())
      );
    }

    if (filters.locationFloor) {
      result = result.filter(l =>
        l.locationFloor?.toLowerCase().includes(filters.locationFloor.toLowerCase())
      );
    }

    if (filters.companyId) {
      result = result.filter(l => l.companyId === filters.companyId);
    }

    if (filters.schoolId) {
      result = result.filter(l => l.schoolId === filters.schoolId);
    }

    setFilteredLocations(result);
    setCurrentPage(1);
  }, [locations, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      locationName: '',
      building: '',
      locationFloor: '',
      companyId: isSuperAdmin ? '' : sessionData.companyId,
      schoolId: isSuperAdmin ? '' : sessionData.schoolId,
    });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the location "${name}"?`)) {
      try {
        await itemLocationService.delete(id);
        setLocations(prev => prev.filter(l => l.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete item location');
      }
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const paginatedLocations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLocations.slice(start, start + itemsPerPage);
  }, [filteredLocations, currentPage, itemsPerPage]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Item Locations</h2>
          <p className="text-muted mb-0">Manage physical inventory locations (rooms, buildings, warehouses, etc.)</p>
        </div>
        <Link to="/itemlocations/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Location
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      {/* Filters Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label small">Location Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search name..."
                value={filters.locationName}
                onChange={(e) => handleFilterChange('locationName', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small">Building</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search building..."
                value={filters.building}
                onChange={(e) => handleFilterChange('building', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small">Floor</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search floor..."
                value={filters.locationFloor}
                onChange={(e) => handleFilterChange('locationFloor', e.target.value)}
              />
            </div>
            {isSuperAdmin && (
              <>
                <div className="col-md-2">
                  <label className="form-label small">Company</label>
                  <select
                    className="form-select form-select-sm"
                    value={filters.companyId}
                    onChange={(e) => handleFilterChange('companyId', e.target.value)}
                  >
                    <option value="">All Companies</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.companyName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label small">School</label>
                  <select
                    className="form-select form-select-sm"
                    value={filters.schoolId}
                    onChange={(e) => handleFilterChange('schoolId', e.target.value)}
                  >
                    <option value="">All Schools</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name || s.schoolName}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="col-auto">
              <button className="btn btn-secondary btn-sm" onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Locations</h5>
          <span className="badge bg-secondary">
            Showing {paginatedLocations.length} of {filteredLocations.length} locations
          </span>
        </div>
        <div className="card-body">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-geo-alt display-4 text-muted"></i>
              <p className="text-muted mt-3">No locations found</p>
              <Link to="/itemlocations/create" className="btn btn-outline-primary">
                Create First Location
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Location Name</th>
                      <th>Building</th>
                      <th>Floor</th>
                      <th>Number</th>
                      <th>Capacity</th>
                      <th>Company</th>
                      <th>School</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLocations.map((loc) => (
                      <tr key={loc.id}>
                        <td>
                          <Link to={`/itemlocations/${loc.id}`} className="text-decoration-none fw-semibold">
                            {loc.locationName || 'N/A'}
                          </Link>
                        </td>
                        <td>{loc.building || 'N/A'}</td>
                        <td>{loc.locationFloor || 'N/A'}</td>
                        <td>{loc.locationNumber !== null ? loc.locationNumber : 'N/A'}</td>
                        <td>{loc.capacity !== null ? loc.capacity : 'N/A'}</td>
                        <td>{companyMap[loc.companyId] || 'N/A'}</td>
                        <td>{schoolMap[loc.schoolId] || 'N/A'}</td>
                        <td>
                          <span className={`badge ${loc.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {loc.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link to={`/itemlocations/${loc.id}`} className="btn btn-sm btn-outline-primary" title="View">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/itemlocations/${loc.id}/edit`} className="btn btn-sm btn-outline-warning" title="Edit">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(loc.id, loc.locationName)} title="Delete">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <label className="form-label mb-0 me-2 small text-muted">Rows per page:</label>
                    <select
                      className="form-select form-select-sm d-inline-block"
                      style={{ width: 'auto' }}
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                  </div>
                  <nav>
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>
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

export default ItemLocationList;
