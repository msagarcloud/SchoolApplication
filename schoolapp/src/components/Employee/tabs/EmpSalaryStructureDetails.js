import React, { useState, useEffect, useRef } from 'react';

const EmpSalaryStructureDetails = ({ employeeData, onInputChange, onDataChange }) => {
  const [errors, setErrors] = useState({});
  
  // Normalize salary data to ensure all numeric values are properly parsed
  const normalizeEmployeeData = (data) => {
    const numericFields = [
      'basicSalary', 'hra', 'da', 'conveyance', 'medical', 'specialAllowance',
      'grossSalary', 'pfDeduction', 'esiDeduction', 'professionalTax', 
      'incomeTax', 'totalDeductions', 'totalEarnings', 'netSalary'
    ];
    
    const normalized = { ...data };
    numericFields.forEach(field => {
      if (normalized[field] !== undefined && normalized[field] !== null) {
        normalized[field] = parseFloat(normalized[field]) || 0;
      }
    });
    
    return normalized;
  };
  
  // Initialize local basic salary state after normalizeEmployeeData is defined
  const [localBasicSalary, setLocalBasicSalary] = useState(() => {
    const normalized = normalizeEmployeeData(employeeData);
    return normalized.basicSalary || 0;
  });
  
  const normalizedEmployeeData = normalizeEmployeeData({ ...employeeData, basicSalary: localBasicSalary });
  const prevBasicSalaryRef = useRef(localBasicSalary);
  
  const [salaryComponents, setSalaryComponents] = useState(() => {
    // Initialize with default components if not present
    const defaultComponents = [
      { name: 'Basic Salary', percentage: 100, isFixed: true, amount: normalizedEmployeeData.basicSalary || 0, type: 'Earning' },
      { name: 'HRA', percentage: 40, isFixed: false, amount: 0, type: 'Earning' },
      { name: 'DA', percentage: 20, isFixed: false, amount: 0, type: 'Earning' },
      { name: 'Conveyance', percentage: 0, isFixed: true, amount: 1600, type: 'Earning' },
      { name: 'Medical Allowance', percentage: 0, isFixed: true, amount: 1250, type: 'Earning' },
      { name: 'Special Allowance', percentage: 10, isFixed: false, amount: 0, type: 'Earning' },
      { name: 'PF Deduction', percentage: 12, isFixed: false, amount: 0, type: 'Deduction' },
      { name: 'ESI Deduction', percentage: 0.75, isFixed: false, amount: 0, type: 'Deduction' },
      { name: 'Professional Tax', percentage: 0, isFixed: true, amount: 200, type: 'Deduction' },
      { name: 'Income Tax', percentage: 0, isFixed: false, amount: 0, type: 'Deduction' }
    ];
    
    const existingComponents = normalizedEmployeeData.salaryComponents || [];
    
    // If we have existing components, use them and recalculate amounts
    if (existingComponents.length > 0) {
      return existingComponents.map(comp => {
        const basicSalary = parseFloat(normalizedEmployeeData.basicSalary) || 0;
        if (comp.isFixed) {
          return {
            ...comp,
            amount: comp.name === 'Basic Salary' ? basicSalary : (parseFloat(comp.amount) || 0)
          };
        } else {
          const percentage = parseFloat(comp.percentage) || 0;
          return {
            ...comp,
            amount: percentage > 0 ? Math.round(basicSalary * percentage / 100) : (parseFloat(comp.amount) || 0)
          };
        }
      });
    }
    
    // Initialize default components with calculated amounts
    const basicSalary = parseFloat(normalizedEmployeeData.basicSalary) || 0;
    return defaultComponents.map(comp => ({
      ...comp,
      amount: comp.isFixed ? comp.amount : (comp.percentage > 0 ? Math.round(basicSalary * comp.percentage / 100) : 0)
    }));
  });

  // Debug effect to track basic salary and component calculations
  useEffect(() => {
    console.log('Local Basic Salary:', localBasicSalary);
    console.log('Normalized Basic Salary:', normalizedEmployeeData.basicSalary);
    console.log('Salary Components:', salaryComponents);
    console.log('Component calculations:', salaryComponents.map(comp => ({
      name: comp.name,
      isFixed: comp.isFixed,
      percentage: comp.percentage,
      amount: comp.amount,
      calculatedAmount: calculateComponentAmount(comp)
    })));
  }, [localBasicSalary, salaryComponents]);

  // Recalculate percentage-based components when basic salary changes
  useEffect(() => {
    const currentBasicSalary = localBasicSalary;
    const prevBasicSalary = prevBasicSalaryRef.current;
    
    if (currentBasicSalary !== prevBasicSalary && currentBasicSalary > 0) {
      console.log('Recalculating components for basic salary:', currentBasicSalary);
      
      const updatedComponents = salaryComponents.map(component => {
        if (component.name === 'Basic Salary') {
          return {
            ...component,
            amount: parseFloat(currentBasicSalary) || 0
          };
        }
        if (!component.isFixed && component.percentage > 0) {
          const basicSalary = parseFloat(currentBasicSalary) || 0;
          const percentage = parseFloat(component.percentage) || 0;
          const calculatedAmount = Math.round(basicSalary * percentage / 100);
          console.log(`Calculating ${component.name}: ${basicSalary} * ${percentage}% = ${calculatedAmount}`);
          return {
            ...component,
            amount: calculatedAmount
          };
        }
        return component;
      });
      
      setSalaryComponents(updatedComponents);
      const updatedEmployeeData = {
        ...normalizedEmployeeData,
        salaryComponents: updatedComponents
      };
      onDataChange?.(updatedEmployeeData);
      
      prevBasicSalaryRef.current = currentBasicSalary;
    }
  }, [localBasicSalary]);
  
  // Initialize components if basic salary is available but components are empty
  useEffect(() => {
    if (normalizedEmployeeData.basicSalary > 0 && salaryComponents.length === 0) {
      const defaultComponents = [
        { name: 'Basic Salary', percentage: 100, isFixed: true, amount: normalizedEmployeeData.basicSalary, type: 'Earning' },
        { name: 'HRA', percentage: 40, isFixed: false, amount: Math.round(normalizedEmployeeData.basicSalary * 0.4), type: 'Earning' },
        { name: 'DA', percentage: 20, isFixed: false, amount: Math.round(normalizedEmployeeData.basicSalary * 0.2), type: 'Earning' },
        { name: 'Conveyance', percentage: 0, isFixed: true, amount: 1600, type: 'Earning' },
        { name: 'Medical Allowance', percentage: 0, isFixed: true, amount: 1250, type: 'Earning' },
        { name: 'Special Allowance', percentage: 10, isFixed: false, amount: Math.round(normalizedEmployeeData.basicSalary * 0.1), type: 'Earning' },
        { name: 'PF Deduction', percentage: 12, isFixed: false, amount: Math.round(normalizedEmployeeData.basicSalary * 0.12), type: 'Deduction' },
        { name: 'ESI Deduction', percentage: 0.75, isFixed: false, amount: Math.round(normalizedEmployeeData.basicSalary * 0.0075), type: 'Deduction' },
        { name: 'Professional Tax', percentage: 0, isFixed: true, amount: 200, type: 'Deduction' },
        { name: 'Income Tax', percentage: 0, isFixed: false, amount: 0, type: 'Deduction' }
      ];
      
      setSalaryComponents(defaultComponents);
      const updatedEmployeeData = {
        ...normalizedEmployeeData,
        salaryComponents: defaultComponents
      };
      onDataChange?.(updatedEmployeeData);
    }
  }, [normalizedEmployeeData.basicSalary, salaryComponents.length]);

  const validateField = (name, value) => {
    let error = '';
    
    if (name.includes('componentName') && !value.trim()) {
      error = 'Component name is required';
    } else if (name.includes('percentage') && (value < 0 || value > 100)) {
      error = 'Percentage must be between 0 and 100';
    } else if (name.includes('amount') && value < 0) {
      error = 'Amount cannot be negative';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleComponentChange = (e, index) => {
    const { name, value, type: inputType, checked } = e.target;
    const fieldValue = inputType === 'checkbox' ? checked : value;
    
    // Validate field
    validateField(name, fieldValue);
    
    // Update components array
    const updatedComponents = [...salaryComponents];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [name]: fieldValue
    };
    
    // Auto-calculate amount if percentage is changed and component is not fixed
    if (name === 'percentage' && !updatedComponents[index].isFixed) {
      const basicSalary = parseFloat(normalizedEmployeeData.basicSalary) || 0;
      const percentage = parseFloat(fieldValue) || 0;
      updatedComponents[index].amount = Math.round(basicSalary * percentage / 100);
    }
    
    setSalaryComponents(updatedComponents);
    
    // Update parent data
    const updatedEmployeeData = {
      ...normalizedEmployeeData,
      salaryComponents: updatedComponents
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'salaryComponents', value: updatedComponents } });
  };

  const addSalaryComponent = () => {
    const newComponent = {
      name: '',
      percentage: 0,
      isFixed: false,
      amount: 0,
      type: 'Earning',
      description: '',
      isTaxable: true,
      isActive: true
    };
    
    const updatedComponents = [...salaryComponents, newComponent];
    setSalaryComponents(updatedComponents);
    
    const updatedEmployeeData = {
      ...employeeData,
      salaryComponents: updatedComponents
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'salaryComponents', value: updatedComponents } });
  };

  const removeSalaryComponent = (index) => {
    const updatedComponents = salaryComponents.filter((_, i) => i !== index);
    setSalaryComponents(updatedComponents);
    
    const updatedEmployeeData = {
      ...employeeData,
      salaryComponents: updatedComponents
    };
    
    onDataChange?.(updatedEmployeeData);
    onInputChange({ target: { name: 'salaryComponents', value: updatedComponents } });
  };

  const calculateComponentAmount = (component) => {
    if (component.isFixed) {
      return parseFloat(component.amount) || 0;
    } else {
      const basicSalary = parseFloat(normalizedEmployeeData.basicSalary) || 0;
      const percentage = parseFloat(component.percentage) || 0;
      return Math.round(basicSalary * percentage / 100);
    }
  };

  const calculateTotals = () => {
    let totalEarnings = 0;
    let totalDeductions = 0;
    
    salaryComponents.forEach(component => {
      if (component.isActive !== false) {
        const amount = parseFloat(calculateComponentAmount(component)) || 0;
        if (component.type === 'Earning') {
          totalEarnings += amount;
        } else if (component.type === 'Deduction') {
          totalDeductions += amount;
        }
      }
    });
    
    return {
      totalEarnings: parseFloat(totalEarnings) || 0,
      totalDeductions: parseFloat(totalDeductions) || 0,
      netSalary: parseFloat(totalEarnings - totalDeductions) || 0
    };
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount) || 0;
    return '₹' + num.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const totals = calculateTotals();

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Salary Structure Components</h5>
        <button type="button" className="btn btn-primary" onClick={addSalaryComponent}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Component
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {salaryComponents.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-receipt display-4 text-muted"></i>
                  <p className="text-muted mt-3">No salary components defined</p>
                  <button type="button" className="btn btn-outline-primary" onClick={addSalaryComponent}>
                    Add First Component
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Component Name</th>
                        <th>Type</th>
                        <th>Calculation</th>
                        <th>Percentage</th>
                        <th>Amount</th>
                        <th>Calculated</th>
                        <th>Taxable</th>
                        <th>Active</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryComponents.map((component, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              className={`form-control form-control-sm ${errors[`componentName_${index}`] ? 'is-invalid' : ''}`}
                              name="name"
                              value={component.name || ''}
                              onChange={(e) => handleComponentChange(e, index)}
                              placeholder="Component name"
                              disabled={component.isFixed && index < 6} // Don't allow editing default components
                            />
                            {errors[`componentName_${index}`] && (
                              <div className="invalid-feedback">{errors[`componentName_${index}`]}</div>
                            )}
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              name="type"
                              value={component.type || 'Earning'}
                              onChange={(e) => handleComponentChange(e, index)}
                            >
                              <option value="Earning">Earning</option>
                              <option value="Deduction">Deduction</option>
                            </select>
                          </td>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="isFixed"
                                checked={component.isFixed || false}
                                onChange={(e) => handleComponentChange(e, index)}
                                disabled={component.isFixed && index < 6} // Don't allow editing default components
                              />
                              <label className="form-check-label">
                                {component.isFixed ? 'Fixed' : 'Percentage'}
                              </label>
                            </div>
                          </td>
                          <td>
                            <input
                              type="number"
                              className={`form-control form-control-sm ${errors[`percentage_${index}`] ? 'is-invalid' : ''}`}
                              name="percentage"
                              value={component.percentage || ''}
                              onChange={(e) => handleComponentChange(e, index)}
                              placeholder="%"
                              disabled={component.isFixed}
                              min="0"
                              max="100"
                              step="0.1"
                            />
                            {errors[`percentage_${index}`] && (
                              <div className="invalid-feedback">{errors[`percentage_${index}`]}</div>
                            )}
                          </td>
                          <td>
                            <input
                              type="number"
                              className={`form-control form-control-sm ${errors[`amount_${index}`] ? 'is-invalid' : ''}`}
                              name="amount"
                              value={component.amount || ''}
                              onChange={(e) => handleComponentChange(e, index)}
                              placeholder="Amount"
                              disabled={!component.isFixed}
                              min="0"
                              step="100"
                              style={{ 
                                backgroundColor: !component.isFixed ? '#f8f9fa' : 'white',
                                cursor: !component.isFixed ? 'not-allowed' : 'text'
                              }}
                              title={!component.isFixed ? 'Auto-calculated from percentage' : 'Enter fixed amount'}
                            />
                            {errors[`amount_${index}`] && (
                              <div className="invalid-feedback">{errors[`amount_${index}`]}</div>
                            )}
                          </td>
                          <td className="text-end fw-bold">
                            {formatCurrency(calculateComponentAmount(component))}
                          </td>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="isTaxable"
                                checked={component.isTaxable !== false}
                                onChange={(e) => handleComponentChange(e, index)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="isActive"
                                checked={component.isActive !== false}
                                onChange={(e) => handleComponentChange(e, index)}
                              />
                            </div>
                          </td>
                          <td>
                            {index >= 6 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeSalaryComponent(index)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Salary Summary</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Basic Salary</label>
                <input
                  type="number"
                  className="form-control fw-bold"
                  value={localBasicSalary || ''}
                  onChange={(e) => {
                    const newBasicSalary = parseFloat(e.target.value) || 0;
                    
                    // Update local state immediately
                    setLocalBasicSalary(newBasicSalary);
                    
                    // Update the ref to track previous value
                    prevBasicSalaryRef.current = localBasicSalary;
                    
                    // Call parent onChange
                    onInputChange({ target: { name: 'basicSalary', value: newBasicSalary } });
                    
                    // Manually trigger recalculation
                    const updatedComponents = salaryComponents.map(component => {
                      if (component.name === 'Basic Salary') {
                        return {
                          ...component,
                          amount: newBasicSalary
                        };
                      }
                      if (!component.isFixed && component.percentage > 0) {
                        const percentage = parseFloat(component.percentage) || 0;
                        const calculatedAmount = Math.round(newBasicSalary * percentage / 100);
                        return {
                          ...component,
                          amount: calculatedAmount
                        };
                      }
                      return component;
                    });
                    
                    setSalaryComponents(updatedComponents);
                    
                    // Update parent data with new values
                    const updatedEmployeeData = {
                      ...employeeData,
                      basicSalary: newBasicSalary,
                      salaryComponents: updatedComponents
                    };
                    onDataChange?.(updatedEmployeeData);
                  }}
                  placeholder="Enter basic salary"
                  min="0"
                  step="100"
                />
              </div>

              <hr />

              <h6 className="mb-3">Earnings</h6>
              {salaryComponents
                .filter(comp => comp.type === 'Earning' && comp.isActive !== false)
                .map((component, index) => (
                  <div key={`earning-${index}`} className="d-flex justify-content-between mb-2">
                    <span>{component.name}</span>
                    <span className="fw-bold">{formatCurrency(calculateComponentAmount(component))}</span>
                  </div>
                ))}

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total Earnings</span>
                <span className="fw-bold text-success">{formatCurrency(totals.totalEarnings)}</span>
              </div>

              <h6 className="mb-3">Deductions</h6>
              {salaryComponents
                .filter(comp => comp.type === 'Deduction' && comp.isActive !== false)
                .map((component, index) => (
                  <div key={`deduction-${index}`} className="d-flex justify-content-between mb-2">
                    <span>{component.name}</span>
                    <span className="fw-bold">{formatCurrency(calculateComponentAmount(component))}</span>
                  </div>
                ))}

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total Deductions</span>
                <span className="fw-bold text-danger">{formatCurrency(totals.totalDeductions)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-5">Net Salary</span>
                <span className="fw-bold fs-5 text-success">{formatCurrency(totals.netSalary)}</span>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h6 className="mb-0">Component Rules</h6>
            </div>
            <div className="card-body">
              <div className="small">
                <p className="mb-2"><strong>Calculation Types:</strong></p>
                <ul className="list-unstyled">
                  <li>• <strong>Fixed:</strong> Same amount every month</li>
                  <li>• <strong>Percentage:</strong> % of basic salary</li>
                </ul>
                <p className="mb-2"><strong>Taxable Components:</strong></p>
                <ul className="list-unstyled">
                  <li>• Checked components affect income tax</li>
                  <li>• Unchecked components are tax-free</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpSalaryStructureDetails;
