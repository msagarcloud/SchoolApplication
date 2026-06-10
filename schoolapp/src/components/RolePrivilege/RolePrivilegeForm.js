import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { rolePrivilegeService } from '../../services/rolePrivilegeService';
import { roleService } from '../../services/roleService';
import { privilegeService } from '../../services/privilegeService';
import { authService } from '../../services/authService';

const RolePrivilegeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    roleId: '',
    privilegeIds: [],
    isActive: true,
    isDeleted: false,
    status: '',
    statusMessage: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [availableRoles, setAvailableRoles] = useState([]);
  const [availablePrivileges, setAvailablePrivileges] = useState([]);

  const normalizeRoles = useCallback((roles = []) => {
    return roles
      .map((role) => ({
        id: role.id || role.Id,
        name: role.name || role.roleName || role.Name || role.RoleName || role.role_name || ''
      }))
      .filter((role) => role.id && role.name);
  }, []);

  const fetchRolePrivilege = useCallback(async () => {
    try {
      setFetchLoading(true);
      const rolePrivilege = await rolePrivilegeService.getById(id);
      setFormData({
        roleId: rolePrivilege.roleId || '',
        privilegeIds: rolePrivilege.privilegeIds || (rolePrivilege.privilegeId ? [rolePrivilege.privilegeId] : []),
        isActive: rolePrivilege.isActive !== undefined ? rolePrivilege.isActive : true,
        isDeleted: rolePrivilege.isDeleted !== undefined ? rolePrivilege.isDeleted : false,
        status: rolePrivilege.status || '',
        statusMessage: rolePrivilege.statusMessage || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch role privilege details');
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  const fetchAvailableRoles = useCallback(async () => {
    try {
      const currentUser = authService.getCurrentUser();
      let roles = [];

      if (currentUser && currentUser.companyId && currentUser.schoolId) {
        roles = await roleService.getRolesByCompanyAndSchool(currentUser.companyId, currentUser.schoolId);

        // If scoped roles are empty or malformed, retry with full list.
        if (!Array.isArray(roles) || roles.length === 0) {
          roles = await roleService.getAll();
        }
      } else {
        roles = await roleService.getAll();
      }

      setAvailableRoles(normalizeRoles(roles));
    } catch (err) {
      console.error('Failed to fetch available roles:', err);
      // Fallback to getAll if filtered fetch fails
      try {
        const roles = await roleService.getAll();
        setAvailableRoles(normalizeRoles(roles));
      } catch (fallbackErr) {
        console.error('Failed to fetch all roles as fallback:', fallbackErr);
      }
    }
  }, [normalizeRoles]);

  const fetchAvailablePrivileges = useCallback(async () => {
    try {
      const privileges = await privilegeService.getAll();
      // Map the response to match the expected format (id, name)
      const mappedPrivileges = privileges.map(privilege => ({
        id: privilege.id,
        name: privilege.privilegeName || privilege.PrivilegeName
      }));
      setAvailablePrivileges(mappedPrivileges);
    } catch (err) {
      console.error('Failed to fetch available privileges:', err);
      // Fallback to mock privileges if service fails
      const mockPrivileges = [
        { id: '1', name: 'Create User' },
        { id: '2', name: 'Edit User' },
        { id: '3', name: 'Delete User' },
        { id: '4', name: 'View Reports' },
        { id: '5', name: 'Manage Roles' },
        { id: '6', name: 'Manage Privileges' }
      ];
      setAvailablePrivileges(mockPrivileges);
    }
  }, []);

  const loadPrivilegesForRole = useCallback(async (roleId) => {
    if (!roleId) {
      setFormData((prev) => ({
        ...prev,
        privilegeIds: []
      }));
      return;
    }

    try {
      const mappings = await rolePrivilegeService.getByRoleId(roleId);
      const existingPrivilegeIds = [...new Set(
        mappings
          .map((item) => item.privilegeId || item.PrivilegeId)
          .filter(Boolean)
      )];

      setFormData((prev) => ({
        ...prev,
        privilegeIds: existingPrivilegeIds
      }));
    } catch (err) {
      console.error('Failed to load existing privileges for role:', err);
    }
  }, []);

  useEffect(() => {
    fetchAvailableRoles();
    fetchAvailablePrivileges();
    if (isEditing) {
      fetchRolePrivilege();
    }
  }, [fetchAvailableRoles, fetchAvailablePrivileges, isEditing, fetchRolePrivilege]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    if (error) setError('');
  };

  const handleRoleChange = async (e) => {
    const selectedRoleId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      roleId: selectedRoleId,
      privilegeIds: []
    }));

    if (error) setError('');
    await loadPrivilegesForRole(selectedRoleId);
  };

  const handlePrivilegeChange = (privilegeId) => {
    setFormData(prev => {
      const currentPrivileges = prev.privilegeIds || [];
      const normalizedPrivilegeId = String(privilegeId).toLowerCase();
      const isSelected = currentPrivileges.some((id) => String(id).toLowerCase() === normalizedPrivilegeId);
      
      if (isSelected) {
        // Remove privilege if already selected
        return {
          ...prev,
          privilegeIds: currentPrivileges.filter((id) => String(id).toLowerCase() !== normalizedPrivilegeId)
        };
      } else {
        // Add privilege if not selected
        return {
          ...prev,
          privilegeIds: [...currentPrivileges, privilegeId]
        };
      }
    });
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.roleId.trim()) {
        setError('Role ID is required');
        setLoading(false);
        return;
      }

      if (!formData.privilegeIds || formData.privilegeIds.length === 0) {
        setError('At least one privilege must be selected');
        setLoading(false);
        return;
      }

      const rolePrivilegeData = {
        ...formData,
        roleId: formData.roleId
      };

      if (isEditing) {
        await rolePrivilegeService.update(id, rolePrivilegeData);
      } else {
        const results = await rolePrivilegeService.create(rolePrivilegeData);
        console.log('Created role privileges:', results);
        
        // Handle the new response format
        if (results && typeof results === 'object' && results.message) {
          // Show success message with information about skipped privileges
          if (results.skipped && results.skipped.length > 0) {
            console.log(`Note: ${results.skipped.length} privileges were already assigned and skipped`);
          }
        }
      }

      navigate('/roleprivileges');
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} role privilege`);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="row mb-3">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body py-2">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-link-45deg me-2"></i>
                    <strong>{authService.getSchoolName() || 'School Name'}</strong>
                  </h6>
                </div>
                <div className="col-md-6 text-md-end">
                  <h6 className="mb-0 text-secondary">
                    <i className="bi bi-briefcase me-2"></i>
                    {authService.getCompanyName() || 'Company Name'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Edit Role Privilege' : 'Assign New Role Privilege'}</h2>
        <Link to="/roleprivileges" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Role Privileges
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {isEditing ? 'Role Privilege Information' : 'New Role Privilege Assignment'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="roleId" className="form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="roleId"
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Select a role</option>
                    {availableRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Privileges <span className="text-danger">*</span>
                  </label>
                  <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {availablePrivileges.map((privilege) => {
                      const isSelected = (formData.privilegeIds || []).some(
                        (id) => String(id).toLowerCase() === String(privilege.id).toLowerCase()
                      );
                      return (
                        <div key={privilege.id} className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`privilege-${privilege.id}`}
                            checked={isSelected}
                            onChange={() => handlePrivilegeChange(privilege.id)}
                          />
                          <label className="form-check-label" htmlFor={`privilege-${privilege.id}`}>
                            {privilege.name}
                          </label>
                        </div>
                      );
                    })}
                    {availablePrivileges.length === 0 && (
                      <div className="text-muted">No privileges available</div>
                    )}
                  </div>
                  {formData.privilegeIds && formData.privilegeIds.length > 0 && (
                    <small className="text-muted">
                      {formData.privilegeIds.length} privilege{formData.privilegeIds.length > 1 ? 's' : ''} selected
                    </small>
                  )}
                </div>
              </div>
            </div>

            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">
                    Active Status
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Active
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="isDeleted" className="form-label">
                    Delete Status
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isDeleted"
                      name="isDeleted"
                      checked={formData.isDeleted}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isDeleted">
                      Deleted
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/roleprivileges" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Updating...' : 'Assigning...'}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEditing ? 'Update Role Privilege' : 'Assign Role Privilege'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RolePrivilegeForm;
