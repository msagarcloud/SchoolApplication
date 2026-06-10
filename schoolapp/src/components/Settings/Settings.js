import React, { useState, useEffect } from 'react';
import settingsService from '../../services/settingsService';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const defaultSettings = {
    general: {
      schoolName: '',
      schoolAddress: '',
      schoolPhone: '',
      schoolEmail: '',
      schoolWebsite: '',
      academicYear: '',
      timezone: 'UTC-5:00',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour'
    },
    system: {
      sessionTimeout: '30',
      maxFileSize: '10',
      allowedFileTypes: 'pdf,doc,docx,xls,xlsx,png,jpg,jpeg',
      backupEnabled: false,
      backupFrequency: 'daily',
      maintenanceMode: false,
      debugMode: false,
      logLevel: 'info'
    },
    email: {
      smtpServer: '',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      smtpUseSSL: true,
      fromEmail: '',
      fromName: ''
    },
    security: {
      passwordMinLength: '8',
      passwordRequireUppercase: true,
      passwordRequireLowercase: true,
      passwordRequireNumbers: true,
      passwordRequireSpecialChars: true,
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      lockoutDuration: '15',
      twoFactorEnabled: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      lowAttendanceAlert: '80',
      feeDueReminder: '7',
      examResultNotification: true,
      parentMeetingReminder: '2'
    }
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();

      setSettings(prev => ({
        ...prev,
        ...data,
        general: { ...prev.general, ...(data?.general || {}) },
        system: { ...prev.system, ...(data?.system || {}) },
        email: { ...prev.email, ...(data?.email || {}) },
        security: { ...prev.security, ...(data?.security || {}) },
        notifications: { ...prev.notifications, ...(data?.notifications || {}) }
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSuccessMessage('');
    setError('');
  };

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async (category) => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      await settingsService.updateSettingsByCategory(category, settings[category]);

      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'gear' },
    { id: 'system', label: 'System', icon: 'cpu' },
    { id: 'email', label: 'Email', icon: 'envelope' },
    { id: 'security', label: 'Security', icon: 'shield-lock' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' }
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h2>Settings</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabs */}
      <div className="mb-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`btn me-2 ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* GENERAL TAB SAMPLE (apply same pattern to others) */}
      {activeTab === 'general' && (
        <div>
          <input
            className="form-control mb-2"
            placeholder="School Name"
            value={settings.general?.schoolName || ''}
            onChange={(e) => handleInputChange('general', 'schoolName', e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Academic Year"
            value={settings.general?.academicYear || ''}
            onChange={(e) => handleInputChange('general', 'academicYear', e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={() => handleSaveSettings('general')}
          >
            Save General Settings
          </button>
        </div>
      )}

      {/* EMAIL TEST BUTTON FIX */}
      {activeTab === 'email' && (
        <button
          className="btn btn-outline-primary mt-3"
          onClick={async () => {
            try {
              await settingsService.testEmailConfiguration(settings.email);
              setSuccessMessage('Test email sent successfully!');
            } catch (err) {
              setError(err.message || 'Failed to send test email');
            }
          }}
        >
          Test Email Configuration
        </button>
      )}
    </div>
  );
};

export default Settings;