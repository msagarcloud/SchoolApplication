import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import studyMaterialService from '../../services/studyMaterialService';

const StudyMaterialDetail = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMaterial();
  }, [id]);

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

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    try {
      await studyMaterialService.downloadMaterial(
        material.id,
        material.fileName || material.title
      );
    } catch (err) {
      setError(err.message || 'Failed to download material');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">{error}</div>
        <Link to="/materials" className="btn btn-outline-primary">
          Back
        </Link>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">Material not found</div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between mb-4">
        <h2>Study Material Details</h2>

        <div>
          <Link to="/materials" className="btn btn-secondary me-2">
            Back
          </Link>
          <button className="btn btn-info me-2" onClick={handlePrint}>
            Print
          </button>
          <Link to={`/materials/${id}/edit`} className="btn btn-warning">
            Edit
          </Link>
        </div>
      </div>

      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">Material Info</div>

            <div className="card-body">
              <p><strong>Title:</strong> {material.title}</p>
              <p><strong>File:</strong> {material.fileName}</p>
              <p><strong>Description:</strong> {material.description}</p>
              <p><strong>Class:</strong> {material.className}</p>
              <p><strong>Subject:</strong> {material.subject}</p>
              <p><strong>Teacher:</strong> {material.teacherName}</p>
              <p><strong>Upload Date:</strong> {material.uploadDate}</p>

              <p>
                <strong>Tags:</strong>{' '}
                {material.tags?.length
                  ? material.tags.map((tag, i) => (
                      <span key={i} className="badge bg-secondary me-1">
                        {tag}
                      </span>
                    ))
                  : 'No tags'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">Actions</div>
            <div className="card-body d-grid gap-2">
              <button className="btn btn-success" onClick={handleDownload}>
                Download
              </button>
              <button className="btn btn-info" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Stats</div>
            <div className="card-body">
              <p><strong>Downloads:</strong> {material.downloadCount}</p>
              <p><strong>File Size:</strong> {material.fileSize}</p>
              <p><strong>Type:</strong> {material.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialDetail;