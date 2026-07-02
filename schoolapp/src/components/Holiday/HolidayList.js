import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { holidayService } from '../../services/holidayService';
import { holidayTypeService } from '../../services/holidayTypeService';
import { sessionMasterService } from '../../services/sessionMasterService';

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [holidayTypes, setHolidayTypes] = useState({});
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchHolidays();
    fetchLookupData();
  }, []);

  useEffect(() => {
    const filter = holidays.filter((holiday) => {
      const term = searchTerm.toLowerCase();
      const name = holiday.name?.toLowerCase() || '';
      const description = holiday.description?.toLowerCase() || '';
      const fromDate = holiday.fromDate?.toLowerCase() || '';
      const toDate = holiday.toDate?.toLowerCase() || '';
      const typeLabel = getLookupLabel(
        holiday.typeId || holiday.TypeId || holiday.typeID || holiday.TypeID,
        holidayTypes,
        holiday.typeName || holiday.typeId || ''
      ).toLowerCase();
      const yearLabel = getLookupLabel(
        holiday.year || holiday.Year,
        sessions,
        holiday.year || ''
      ).toLowerCase();
      const sessionLabel = getLookupLabel(
        holiday.sessionId || holiday.SessionId || holiday.sessionID || holiday.SessionID,
        sessions,
        holiday.sessionName || holiday.sessionId || ''
      ).toLowerCase();

      return (
        name.includes(term) ||
        description.includes(term) ||
        fromDate.includes(term) ||
        toDate.includes(term) ||
        typeLabel.includes(term) ||
        yearLabel.includes(term) ||
        sessionLabel.includes(term)
      );
    });

    const statusFiltered =
      statusFilter === 'all'
        ? filter
        : filter.filter((holiday) =>
            statusFilter === 'active' ? holiday.isActive : !holiday.isActive
          );

    setFilteredHolidays(statusFiltered);
    setCurrentPage(1);
  }, [holidays, searchTerm, statusFilter, holidayTypes, sessions]);

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const data = await holidayService.getAll();
      setHolidays(data || []);
      setFilteredHolidays(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch holidays');
    } finally {
      setLoading(false);
    }
  };

  const fetchLookupData = async () => {
    try {
      const [holidayTypesData, sessionData] = await Promise.all([
        holidayTypeService.getAll(),
        sessionMasterService.getAll()
      ]);

      const holidayTypeMap = (holidayTypesData || []).reduce((acc, type) => {
        const id = type.id || type.Id || type.value || type.Value;
        if (id) {
          acc[id] = type;
        }
        return acc;
      }, {});

      const sessionMap = (sessionData || []).reduce((acc, session) => {
        const id = session.id || session.Id || session.value || session.Value;
        if (id) {
          acc[id] = session;
        }
        return acc;
      }, {});

      setHolidayTypes(holidayTypeMap);
      setSessions(sessionMap);
    } catch (err) {
      console.warn('Holiday lookup data unavailable:', err.message || err);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete holiday '${name}'?`)) {
      try {
        await holidayService.delete(id);
        setHolidays(holidays.filter((holiday) => holiday.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete holiday');
      }
    }
  };

  const getEntityLabel = (entity, fallback = '') => {
    if (!entity) return fallback;
    return (
      entity.HolidayTypeName ||
      entity.holidayTypeName ||
      entity.name ||
      entity.Name ||
      entity.value ||
      entity.Value ||
      entity.SessionName ||
      entity.sessionName ||
      entity.AcademicYear ||
      entity.academicYear ||
      fallback
    );
  };

  const getLookupLabel = (id, map, fallback = '') => {
    if (!id) return fallback;

    const entry = map[id];
    // Some APIs return keys as lower/upper-cased or nested fields; be defensive.
    if (entry) return getEntityLabel(entry, fallback);

    // If map lookup failed but the backend already includes a display field, use it.
    if (typeof id === 'string') {
      return fallback;
    }

    return fallback;
  };


  const formatDate = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  const totalPages = Math.ceil(filteredHolidays.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredHolidays.slice(startIndex, endIndex);

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
        <h2>Holiday Management</h2>
        <Link to="/holidays/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Holiday
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label htmlFor="search" className="form-label">Search</label>
              <input
                id="search"
                type="text"
                className="form-control"
                placeholder="Search holiday name, date or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="statusFilter" className="form-label">Status</label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <button
                type="button"
                className="btn btn-outline-secondary mt-2"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Holiday List</h5>
        </div>
        <div className="card-body p-0">
          {currentItems.length === 0 ? (
            <div className="p-4 text-center">
              <p className="mb-2">No holidays found.</p>
              <Link to="/holidays/create" className="btn btn-outline-primary">
                Add the first holiday
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Holiday Name</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Holiday Type</th>
                    <th>Academic Year</th>
                    <th>Session</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((holiday) => (
                    <tr key={holiday.id}>
                      <td>
                        <Link to={`/holidays/${holiday.id}`} className="text-decoration-none">
                          {holiday.name || 'N/A'}
                        </Link>
                      </td>
                      <td>{formatDate(holiday.fromDate)}</td>
                      <td>{formatDate(holiday.toDate)}</td>
                      <td>
                        {getLookupLabel(
                          holiday.typeId || holiday.TypeId || holiday.typeID || holiday.TypeID,
                          holidayTypes,
                          holiday.typeName || holiday.typeId || 'N/A'
                        )}
                      </td>
                      <td>
                        {getLookupLabel(
                          holiday.year || holiday.Year,
                          sessions,
                          holiday.year || 'N/A'
                        )}
                      </td>
                      <td>
                        {getLookupLabel(
                          holiday.sessionId || holiday.SessionId || holiday.sessionID || holiday.SessionID,
                          sessions,
                          holiday.sessionName || holiday.sessionId || 'N/A'
                        )}
                      </td>
                      <td>{holiday.description || '—'}</td>
                      <td>
                        <span className={`badge ${holiday.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {holiday.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group" role="group">
                          <Link to={`/holidays/${holiday.id}`} className="btn btn-sm btn-outline-primary" title="View">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link to={`/holidays/${holiday.id}/edit`} className="btn btn-sm btn-outline-warning" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(holiday.id, holiday.name)}
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
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredHolidays.length)} of {filteredHolidays.length}
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HolidayList;
