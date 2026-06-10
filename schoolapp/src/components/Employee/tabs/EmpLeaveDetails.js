import React, { useState } from 'react';

const EmpLeaveDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});
  const [leaveRecords, setLeaveRecords] = useState(employeeData.leaveRecords || []);
  const [leaveBalances, setLeaveBalances] = useState(employeeData.leaveBalances || {
    casualLeave: { total: 12, used: 0, balance: 12 },
    sickLeave: { total: 10, used: 0, balance: 10 },
    earnedLeave: { total: 15, used: 0, balance: 15 },
    maternityLeave: { total: 180, used: 0, balance: 180 },
    paternityLeave: { total: 15, used: 0, balance: 15 },
    specialLeave: { total: 5, used: 0, balance: 5 }
  });

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('leaveType') && !value) {
      error = 'Leave type is required';
    } else if (name.includes('startDate') && !value) {
      error = 'Start date is required';
    } else if (name.includes('endDate') && !value) {
      error = 'End date is required';
    } else if (name.includes('reason') && !value.trim()) {
      error = 'Reason is required';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleLeaveRecordChange = (e, index) => {
    const { name, value } = e.target;
    
    // Validate field
    validateField(name, value);
    
    // Update leave records array
    const updatedRecords = [...leaveRecords];
    updatedRecords[index] = {
      ...updatedRecords[index],
      [name]: value
    };
    
    // Calculate days if both dates are provided
    if (name === 'startDate' || name === 'endDate') {
      const startDate = updatedRecords[index].startDate;
      const endDate = updatedRecords[index].endDate;
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        updatedRecords[index].days = days;
      }
    }
    
    setLeaveRecords(updatedRecords);
    
    // Update parent data
    const updatedEmployeeData = {
      ...employeeData,
      leaveRecords: updatedRecords
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'leaveRecords', value: updatedRecords } });
  };

  const handleLeaveBalanceChange = (leaveType, field, value) => {
    const updatedBalances = {
      ...leaveBalances,
      [leaveType]: {
        ...leaveBalances[leaveType],
        [field]: Number(value) || 0
      }
    };
    
    // Recalculate balance
    if (field === 'total' || field === 'used') {
      updatedBalances[leaveType].balance = 
        updatedBalances[leaveType].total - updatedBalances[leaveType].used;
    }
    
    setLeaveBalances(updatedBalances);
    
    // Update parent data
    const updatedEmployeeData = {
      ...employeeData,
      leaveBalances: updatedBalances
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'leaveBalances', value: updatedBalances } });
  };

  const addLeaveRecord = () => {
    const newRecord = {
      leaveType: '',
      startDate: '',
      endDate: '',
      days: 0,
      reason: '',
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedBy: '',
      approvedDate: '',
      remarks: ''
    };
    
    const updatedRecords = [...leaveRecords, newRecord];
    setLeaveRecords(updatedRecords);
    
    const updatedEmployeeData = {
      ...employeeData,
      leaveRecords: updatedRecords
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'leaveRecords', value: updatedRecords } });
  };

  const removeLeaveRecord = (index) => {
    const updatedRecords = leaveRecords.filter((_, i) => i !== index);
    setLeaveRecords(updatedRecords);
    
    const updatedEmployeeData = {
      ...employeeData,
      leaveRecords: updatedRecords
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'leaveRecords', value: updatedRecords } });
  };

  const getLeaveStatusBadge = (status) => {
    const statusClasses = {
      'Approved': 'success',
      'Rejected': 'danger',
      'Pending': 'warning',
      'Cancelled': 'secondary'
    };
    
    return (
      <span className={`badge bg-${statusClasses[status] || 'secondary'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-md-6">
          <h5 className="mb-3">Leave Balances</h5>
          
          <div className="card">
            <div className="card-body">
              {Object.entries(leaveBalances).map(([leaveType, balance]) => (
                <div key={leaveType} className="mb-3">
                  <label className="form-label text-capitalize">
                    {leaveType.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="row g-2">
                    <div className="col-4">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Total"
                        value={balance.total}
                        onChange={(e) => handleLeaveBalanceChange(leaveType, 'total', e.target.value)}
                        min="0"
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Used"
                        value={balance.used}
                        onChange={(e) => handleLeaveBalanceChange(leaveType, 'used', e.target.value)}
                        min="0"
                        max={balance.total}
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Balance"
                        value={balance.balance}
                        readOnly
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Leave Records</h5>
            <button type="button" className="btn btn-primary btn-sm" onClick={addLeaveRecord}>
              <i className="bi bi-plus-circle me-2"></i>
              Add Leave
            </button>
          </div>

          {leaveRecords.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x display-4 text-muted"></i>
              <p className="text-muted mt-3">No leave records found</p>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={addLeaveRecord}>
                Add First Leave Record
              </button>
            </div>
          ) : (
            <div className="card" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <div className="card-body p-2">
                {leaveRecords.map((record, index) => (
                  <div key={index} className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0">Leave {index + 1}</h6>
                      <div className="d-flex align-items-center gap-2">
                        {getLeaveStatusBadge(record.status)}
                        {leaveRecords.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeLeaveRecord(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="row g-2">
                      <div className="col-6">
                        <select
                          className={`form-select form-select-sm ${errors[`leaveType_${index}`] ? 'is-invalid' : ''}`}
                          name="leaveType"
                          value={record.leaveType || ''}
                          onChange={(e) => handleLeaveRecordChange(e, index)}
                        >
                          <option value="">Select Type</option>
                          <option value="casualLeave">Casual Leave</option>
                          <option value="sickLeave">Sick Leave</option>
                          <option value="earnedLeave">Earned Leave</option>
                          <option value="maternityLeave">Maternity Leave</option>
                          <option value="paternityLeave">Paternity Leave</option>
                          <option value="specialLeave">Special Leave</option>
                        </select>
                        {errors[`leaveType_${index}`] && (
                          <div className="invalid-feedback">{errors[`leaveType_${index}`]}</div>
                        )}
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Days"
                          value={record.days || 0}
                          readOnly
                          style={{ backgroundColor: '#f8f9fa' }}
                        />
                      </div>
                    </div>

                    <div className="row g-2 mt-2">
                      <div className="col-6">
                        <input
                          type="date"
                          className={`form-control form-control-sm ${errors[`startDate_${index}`] ? 'is-invalid' : ''}`}
                          name="startDate"
                          value={record.startDate || ''}
                          onChange={(e) => handleLeaveRecordChange(e, index)}
                        />
                        {errors[`startDate_${index}`] && (
                          <div className="invalid-feedback">{errors[`startDate_${index}`]}</div>
                        )}
                      </div>
                      <div className="col-6">
                        <input
                          type="date"
                          className={`form-control form-control-sm ${errors[`endDate_${index}`] ? 'is-invalid' : ''}`}
                          name="endDate"
                          value={record.endDate || ''}
                          onChange={(e) => handleLeaveRecordChange(e, index)}
                          min={record.startDate}
                        />
                        {errors[`endDate_${index}`] && (
                          <div className="invalid-feedback">{errors[`endDate_${index}`]}</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2">
                      <textarea
                        className={`form-control form-control-sm ${errors[`reason_${index}`] ? 'is-invalid' : ''}`}
                        name="reason"
                        value={record.reason || ''}
                        onChange={(e) => handleLeaveRecordChange(e, index)}
                        rows={2}
                        placeholder="Reason for leave"
                      />
                      {errors[`reason_${index}`] && (
                        <div className="invalid-feedback">{errors[`reason_${index}`]}</div>
                      )}
                    </div>

                    <div className="row g-2 mt-2">
                      <div className="col-6">
                        <select
                          className="form-select form-select-sm"
                          name="status"
                          value={record.status || 'Pending'}
                          onChange={(e) => handleLeaveRecordChange(e, index)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name="approvedDate"
                          value={record.approvedDate || ''}
                          onChange={(e) => handleLeaveRecordChange(e, index)}
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="approvedBy"
                        value={record.approvedBy || ''}
                        onChange={(e) => handleLeaveRecordChange(e, index)}
                        placeholder="Approved by"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h6 className="mb-0">Leave Summary</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <strong>Total Leave Requests:</strong> {leaveRecords.length}
            </div>
            <div className="col-md-3">
              <strong>Approved:</strong> {leaveRecords.filter(r => r.status === 'Approved').length}
            </div>
            <div className="col-md-3">
              <strong>Pending:</strong> {leaveRecords.filter(r => r.status === 'Pending').length}
            </div>
            <div className="col-md-3">
              <strong>Total Days Used:</strong> {leaveRecords.reduce((sum, r) => sum + (r.days || 0), 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLeaveDetails;
