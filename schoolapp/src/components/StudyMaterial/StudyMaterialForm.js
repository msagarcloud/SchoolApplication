import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import studyMaterialService from '../../services/studyMaterialService';

const StudyMaterialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [material, setMaterial] = useState({
    title: '',
    description: '',
    className: '',
    subject: '',
    teacherName: '',
    type: '',
    file: null,
    uploadDate: new Date().toISOString().split('T')[0],
    isPublic: true,
    tags: []
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchTeachers();
    if (isEdit) {
      fetchMaterial();
    }
  }, [id, isEdit]);

  const fetchClasses = async () => {
    try {
      const data = await studyMaterialService.getClasses();
      setClasses(data);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await studyMaterialService.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await studyMaterialService.getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
    }
  };

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const data = await studyMaterialService.getMaterialById(id);
      setMaterial(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch material details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setMaterial(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      // Get file type
      const fileExtension = file.name.split('.').pop().toUpperCase();
      const allowedTypes = ['PDF', 'DOCX', 'XLSX', 'PPTX', 'MP4', 'ZIP'];
      
      if (!allowedTypes.includes(fileExtension)) {
        setError('File type not supported. Allowed types: PDF, DOCX, XLSX, PPTX, MP4, ZIP');
        return;
      }
      
      setMaterial(prev => ({
        ...prev,
        file: file,
        type: fileExtension
      }));
      setError('');
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setMaterial(prev => ({
      ...prev,
      tags
    }));
  };

  const simulateUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setUploadProgress(0);
      
      // Validate required fields
      if (!material.title || !material.className || !material.subject) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Check if file is selected (for new uploads)
      if (!isEdit && !material.file) {
        setError('Please select a file to upload');
        return;
      }
      
      // Call appropriate API method
      if (isEdit) {
        await studyMaterialService.updateMaterial(id, material);
      } else {
        await studyMaterialService.createMaterial(material, setUploadProgress);
      }
      
      navigate('/materials');
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'upload'} material`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (loading && isEdit) {
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
        <div>
          <h2>{isEdit ? 'Edit Study Material' : 'Upload Study Material'}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/materials">Study Materials</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEdit ? 'Edit' : 'Upload'}
              </li>
            </ol>
          </nav>
        </div>
        <div>
          <Link to="/materials" className="btn btn-outline-secondary me-2">
            <i className="bi bi-x-lg me-2"></i>
            Cancel
          </Link>
          <button 
            type="submit" 
            form="material-form"
            className="btn btn-primary"
            disabled={loading}
          >
            <i className="bi bi-check-lg me-2"></i>
            {loading ? 'Uploading...' : (isEdit ? 'Update' : 'Upload')}
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="alert alert-info" role="alert">
          <div className="d-flex justify-content-between align-items-center">
            <span>Uploading file...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="progress">
            <div 
              className="progress-bar" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="card">
        <form id="material-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row mb-4">
              <h5 className="col-12 mb-3">Basic Information</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Material Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={material.title}
                    onChange={handleInputChange}
                    placeholder="Enter material title"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="className" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="className"
                    name="className"
                    value={material.className}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={material.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="teacherName" className="form-label">
                    Teacher
                  </label>
                  <select
                    className="form-select"
                    id="teacherName"
                    name="teacherName"
                    value={material.teacherName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={material.description}
                    onChange={handleInputChange}
                    placeholder="Enter material description"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <h5 className="col-12 mb-3">File Upload</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Select File <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.xlsx,.pptx,.mp4,.zip"
                    required={!isEdit}
                  />
                  <div className="form-text">
                    Supported formats: PDF, DOCX, XLSX, PPTX, MP4, ZIP (Max 50MB)
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">File Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={material.type || 'Not selected'}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <h5 className="col-12 mb-3">Additional Settings</h5>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    value={material.tags.join(', ')}
                    onChange={handleTagsChange}
                    placeholder="Enter tags separated by commas"
                  />
                  <div className="form-text">
                    Separate tags with commas (e.g., mathematics, calculus, introduction)
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isPublic"
                      name="isPublic"
                      checked={material.isPublic}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isPublic">
                      Make material publicly available
                    </label>
                    <div className="form-text">
                      Public materials can be accessed by all students
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info" role="alert">
              <h6 className="alert-heading">
                <i className="bi bi-info-circle me-2"></i>
                Upload Guidelines
              </h6>
              <ul className="mb-0">
                <li>Ensure files are properly named and organized</li>
                <li>Use clear and descriptive titles for materials</li>
                <li>Add relevant tags for better searchability</li>
                <li>Check file size before uploading (Max 50MB)</li>
                <li>Verify content accuracy before making public</li>
                <li>Consider copyright and licensing requirements</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyMaterialForm;
