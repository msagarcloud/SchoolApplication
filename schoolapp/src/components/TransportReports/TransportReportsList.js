import React, { useState } from 'react';

const TransportReportsList = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [loading, setLoading] = useState(false);

  const reports = [
    {
      id: 'vehicle-occupancy',
      name: 'Vehicle Occupancy Report',
      description: 'Shows current vehicle capacity utilization and passenger count',
      icon: 'bi-truck'
    },
    {
      id: 'route-utilization',
      name: 'Route Utilization Report',
      description: 'Displays route usage statistics and popular routes',
      icon: 'bi-map'
    },
    {
      id: 'driver-performance',
      name: 'Driver Performance Report',
      description: 'Driver performance metrics and compliance records',
      icon: 'bi-person-badge'
    },
    {
      id: 'transport-revenue',
      name: 'Transport Revenue Report',
      description: 'Financial overview of transport operations',
      icon: 'bi-currency-dollar'
    },
    {
      id: 'summary',
      name: 'Transport Summary Report',
      description: 'Comprehensive overview of all transport operations',
      icon: 'bi-file-text'
    }
  ];

  const handleGenerateReport = async (reportId) => {
    setLoading(true);
    setSelectedReport(reportId);
    
    try {
      // Make API call to generate report
      const response = await fetch(`/api/TransportReports/${reportId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reports.find(r => r.id === reportId)?.name || 'Report'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert('Failed to generate report. Please try again.');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setLoading(false);
      setSelectedReport('');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Transport Reports</h4>
      </div>

      <div className="row">
        {reports.map((report) => (
          <div key={report.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className={`bi ${report.icon} display-4 text-primary`}></i>
                </div>
                <h6 className="card-title">{report.name}</h6>
                <p className="card-text text-muted small">{report.description}</p>
                <button
                  className={`btn btn-primary w-100 ${loading && selectedReport === report.id ? 'disabled' : ''}`}
                  onClick={() => handleGenerateReport(report.id)}
                  disabled={loading && selectedReport === report.id}
                >
                  {loading && selectedReport === report.id ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-download me-2"></i>
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Report Generation in Progress</strong>
              <p className="mb-0">Please wait while the {reports.find(r => r.id === selectedReport)?.name} is being generated...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportReportsList;
