import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { classSectionService } from '../../services/classSectionService';
import { classService } from '../../services/classService';
import { sectionService } from '../../services/sectionService';
import { classRoomService } from '../../services/classRoomService';

const ClassSectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classSectionData, setClassSectionData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMasterData();
    fetchClassSectionDetails();
  }, [id]);

  const fetchMasterData = async () => {
    try {
      const [classesData, sectionsData, classRoomsData] = await Promise.all([
        classService.getAll(),
        sectionService.getAll(),
        classRoomService.getAll()
      ]);
      console.log('Classes data:', classesData);
      console.log('Sections data:', sectionsData);
      console.log('ClassRooms data:', classRoomsData);
      setClasses(classesData);
      setSections(sectionsData);
      setClassRooms(classRoomsData);
    } catch (err) {
      console.error('Failed to fetch master data:', err);
    }
  };

  const fetchClassSectionDetails = async () => {
    try {
      setLoading(true);
      const data = await classSectionService.getById(id);
      setClassSectionData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch class section details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this class section?')) {
      try {
        await classSectionService.delete(id);
        navigate('/classsections');
      } catch (err) {
        setError(err.message || 'Failed to delete class section');
      }
    }
  };

  const getClassNameById = (classMasterId) => {
    console.log('Looking for class ID:', classMasterId);
    console.log('Available classes:', classes);
    const classObj = classes.find(c => c.id === classMasterId);
    console.log('Found class object:', classObj);
    return classObj ? classObj.name : `Class ID: ${classMasterId}`;
  };

  const getSectionNameById = (sectionMasterId) => {
    console.log('Looking for section ID:', sectionMasterId);
    console.log('Available sections:', sections);
    const sectionObj = sections.find(s => s.id === sectionMasterId);
    console.log('Found section object:', sectionObj);
    return sectionObj ? sectionObj.name : `Section ID: ${sectionMasterId}`;
  };

  const getClassRoomNameById = (locationId) => {
    console.log('Looking for classroom ID:', locationId);
    console.log('Available classrooms:', classRooms);
    const classRoomObj = classRooms.find(c => c.id === locationId);
    console.log('Found classroom object:', classRoomObj);
    return classRoomObj ? classRoomObj.name : `ClassRoom ID: ${locationId}`;
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

  if (!classSectionData) {
    return (
      <Container className="py-5">
        <Alert variant="info">Class Section not found</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Class Section Details</h2>
            <div>
              <Button 
                variant="outline-primary" 
                as={Link} 
                to="/classsections" 
                className="me-2"
              >
                <BiArrowBack className="me-1" />
                Back to List
              </Button>
              <Button 
                variant="primary" 
                as={Link} 
                to={`/classsections/${id}/edit`}
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
            <Card.Header as="h5">Class Section Information</Card.Header>
            <Card.Body>
              <Row>
                <Col sm={3} className="fw-bold">Class:</Col>
                <Col sm={9}>{getClassNameById(classSectionData.classMasterId)}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Section:</Col>
                <Col sm={9}>{getSectionNameById(classSectionData.sectionMasterId)}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">ClassRoom:</Col>
                <Col sm={9}>{getClassRoomNameById(classSectionData.locationId)}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Status:</Col>
                <Col sm={9}>
                  <span className={`badge ${classSectionData.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {classSectionData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Created Date:</Col>
                <Col sm={9}>
                  {classSectionData.createdDate ? 
                    new Date(classSectionData.createdDate).toLocaleDateString() : 
                    'N/A'
                  }
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={3} className="fw-bold">Last Modified:</Col>
                <Col sm={9}>
                  {classSectionData.modifiedDate ? 
                    new Date(classSectionData.modifiedDate).toLocaleDateString() : 
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
                <Col sm={8}>{classSectionData.capacity || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Room Number:</Col>
                <Col sm={8}>{classSectionData.roomNumber || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Teacher:</Col>
                <Col sm={8}>{classSectionData.teacherName || 'N/A'}</Col>
              </Row>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Floor:</Col>
                <Col sm={8}>{classSectionData.floor || 'N/A'}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClassSectionDetail;
