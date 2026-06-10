import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Table, Button, Form, InputGroup, Pagination, Spinner, Alert } from 'react-bootstrap';
import optimizedDataService from '../../services/optimizedDataService';

// Memoized student row component to prevent unnecessary re-renders
const StudentRow = memo(({ student, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{student.rollNumber}</td>
      <td>{`${student.firstName} ${student.lastName}`}</td>
      <td>{student.email}</td>
      <td>{student.contactNumber}</td>
      <td>{student.class?.name || 'N/A'}</td>
      <td>{student.section?.name || 'N/A'}</td>
      <td>
        <span className={`badge ${student.isActive ? 'bg-success' : 'bg-danger'}`}>
          {student.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td>
        <Button variant="primary" size="sm" className="me-2" onClick={() => onEdit(student)}>
          <i className="bi bi-pencil"></i>
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(student)}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
});

StudentRow.propTypes = {
  student: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const OptimizedStudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [useMinimalView, setUseMinimalView] = useState(false);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      setCurrentPage(1);
      fetchStudents(term);
    }, 500),
    []
  );

  // Fetch students with caching
  const fetchStudents = useCallback(async (search = '', page = 1, size = pageSize, minimal = useMinimalView) => {
    setLoading(true);
    setError(null);
    
    try {
      const options = {
        page,
        pageSize: size,
        minimal,
      };
      
      if (search) {
        options.search = search;
      }

      const response = await optimizedDataService.getStudents(options);
      
      if (response.fromCache) {
        console.log('Data loaded from cache');
      }

      if (minimal) {
        setStudents(response.data);
        setTotalCount(response.data.length);
      } else {
        setStudents(response.data.data || response.data);
        setTotalCount(response.data.totalCount || response.data.length);
      }
    } catch (err) {
      setError('Failed to fetch students. Please try again.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, [pageSize, useMinimalView]);

  // Initial data load
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle search
  useEffect(() => {
    debouncedSearch(searchTerm);
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch]);

  // Memoized filtered students for search
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    
    return students.filter(student =>
      student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Handle pagination
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    fetchStudents(searchTerm, page, pageSize, useMinimalView);
  }, [fetchStudents, searchTerm, pageSize, useMinimalView]);

  // Handle page size change
  const handlePageSizeChange = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchStudents(searchTerm, 1, newSize, useMinimalView);
  }, [fetchStudents, searchTerm, useMinimalView]);

  // Handle edit
  const handleEdit = useCallback((student) => {
    // Navigate to edit page or open modal
    console.log('Edit student:', student);
  }, []);

  // Handle delete
  const handleDelete = useCallback(async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      try {
        await optimizedDataService.deleteStudent(student.id);
        fetchStudents(searchTerm, currentPage, pageSize, useMinimalView);
      } catch (err) {
        setError('Failed to delete student. Please try again.');
        console.error('Error deleting student:', err);
      }
    }
  }, [fetchStudents, searchTerm, currentPage, pageSize, useMinimalView]);

  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    const newMode = !useMinimalView;
    setUseMinimalView(newMode);
    fetchStudents(searchTerm, 1, pageSize, newMode);
  }, [fetchStudents, searchTerm, pageSize, useMinimalView]);

  // Preload data on component mount
  useEffect(() => {
    optimizedDataService.preloadCommonData();
  }, []);

  if (loading && students.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Students</h3>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={toggleViewMode}>
            {useMinimalView ? 'Full View' : 'Minimal View'}
          </Button>
          <Button variant="primary">Add Student</Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
      </div>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Class</th>
              <th>Section</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>

      {totalCount > pageSize && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span className="me-2">Items per page:</span>
            <Form.Select
              style={{ width: 'auto', display: 'inline-block' }}
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
          </div>
          
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(Math.ceil(totalCount / pageSize))].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === Math.ceil(totalCount / pageSize)}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}

      <div className="mt-3 text-muted small">
        Showing {filteredStudents.length} of {totalCount} students
        {optimizedDataService.getCacheStats().size > 0 && (
          <span className="ms-3">
            Cache: {optimizedDataService.getCacheStats().size} items
          </span>
        )}
      </div>
    </div>
  );
};

// Simple debounce utility
function debounce(func, wait) {
  let timeout;
  const debounced = function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
  };
  return debounced;
}

export default memo(OptimizedStudentList);
