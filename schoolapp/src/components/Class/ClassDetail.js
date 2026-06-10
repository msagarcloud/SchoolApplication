import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { classService } from '../../services/classService';

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClassDetails = async () => {
    try {
      setLoading(true);
      const data = await classService.getById(id);
      setClassData(data);
    } catch (err) {
      console.log('Error in fetchClassDetails:', err);
      setError(err.message || 'Failed to fetch class details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classService.delete(id);
        navigate('/classes');
      } catch (err) {
        console.log('Delete Error:', err);
        setError(err.message || 'Failed to delete class');
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!classData) {
    return (
      <Container className="py-5">
        <Alert variant="info">Class not found</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Class Details</h2>
            <div>
              <Button 
                variant="outline-primary" 
                as={Link} 
                to="/classes" 
                className="me-2"
              >
                <BiArrowBack className="me-1" />
                Back to List
              </Button>
              <Button 
                variant="primary" 
                as={Link} 
                to={`/classes/${id}/edit`}
                className="me-2"
              >
                <BiEdit className="me-1" />
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Class Information</Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3} className="fw-bold">Class Name:</Col>
                <Col sm={9}>{classData.className || classData.name || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Class Code:</Col>
                <Col sm={9}>{classData.classCode || classData.code || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Description:</Col>
                <Col sm={9}>{classData.description || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Status:</Col>
                <Col sm={9}>
                  <span className={`badge ${classData.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {classData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Created Date:</Col>
                <Col sm={9}>
                  {classData.createdDate ? 
                    new Date(classData.createdDate).toLocaleDateString() : 
                    'N/A'
                  }
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Last Modified:</Col>
                <Col sm={9}>
                  {classData.modifiedDate ? 
                    new Date(classData.modifiedDate).toLocaleDateString() : 
                    'N/A'
                  }
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header as="h5">Additional Information</Card.Header>
            <Card.Body>
              <Row>
                <Col sm={4} className="fw-bold">Capacity:</Col>
                <Col sm={8}>{classData.capacity || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Grade Level:</Col>
                <Col sm={8}>{classData.gradeLevel || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Teacher:</Col>
                <Col sm={8}>{classData.teacherName || 'N/A'}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClassDetail;
