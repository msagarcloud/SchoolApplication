import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const [formData, setFormData] = useState({
    userName: currentUser?.UserName || currentUser?.userName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const passwordValidation = useMemo(() => {
    const newPassword = formData.newPassword || '';
    return {
      minLength: newPassword.length >= 6,
      hasNumber: /\d/.test(newPassword),
      hasLetter: /[A-Za-z]/.test(newPassword)
    };
  }, [formData.newPassword]);

  const isPasswordStrong =
    passwordValidation.minLength &&
    passwordValidation.hasNumber &&
    passwordValidation.hasLetter;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.userName.trim()) return 'Username is required.';
    if (!formData.currentPassword) return 'Current password is required.';
    if (!formData.newPassword) return 'New password is required.';
    if (!isPasswordStrong) return 'New password must be at least 6 characters and include letters and numbers.';
    if (formData.newPassword === formData.currentPassword) return 'New password must be different from current password.';
    if (formData.newPassword !== formData.confirmPassword) return 'New password and confirm password do not match.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      await authService.changePassword({
        userName: formData.userName.trim(),
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setSuccessMessage('Password changed successfully. Please use your new password next time.');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-xl-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-key me-2"></i>
                Change Password
              </h5>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                  />
                  <div className="form-text">
                    Must be 6+ characters and include letters and numbers.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/profile')}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
