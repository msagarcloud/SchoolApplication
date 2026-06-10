import React, { useState } from 'react';
import MainTemplate from '../components/layout/MainTemplate';

const NavigationDemo = () => {
  const [navigationMode, setNavigationMode] = useState('left');
  const [showTopSearch, setShowTopSearch] = useState(false);
  const [topNavVariant, setTopNavVariant] = useState('primary');

  return (
    <MainTemplate 
      navigationMode={navigationMode}
      showTopSearch={showTopSearch}
      topNavVariant={topNavVariant}
      maxTopNavItems={6}
    >
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Navigation Configuration Demo
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Navigation Mode</label>
                    <div className="btn-group d-flex" role="group">
                      <button
                        type="button"
                        className={`btn ${navigationMode === 'left' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setNavigationMode('left')}
                      >
                        <i className="bi bi-list me-2"></i>
                        Left Only
                      </button>
                      <button
                        type="button"
                        className={`btn ${navigationMode === 'top' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setNavigationMode('top')}
                      >
                        <i className="bi bi-menu-button-wide me-2"></i>
                        Top Only
                      </button>
                      <button
                        type="button"
                        className={`btn ${navigationMode === 'both' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setNavigationMode('both')}
                      >
                        <i className="bi bi-layout-sidebar me-2"></i>
                        Both
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Show Search in Top Nav</label>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="showTopSearch"
                        checked={showTopSearch}
                        onChange={(e) => setShowTopSearch(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="showTopSearch">
                        {showTopSearch ? 'Enabled' : 'Disabled'}
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Top Nav Variant</label>
                    <select 
                      className="form-select"
                      value={topNavVariant}
                      onChange={(e) => setTopNavVariant(e.target.value)}
                    >
                      <option value="primary">Primary (Blue)</option>
                      <option value="light">Light (Gray)</option>
                      <option value="dark">Dark (Black)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <hr />
              
              <div className="row">
                <div className="col-12">
                  <h5>Current Configuration</h5>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Navigation Mode:</strong> {navigationMode}<br />
                    <strong>Search Enabled:</strong> {showTopSearch ? 'Yes' : 'No'}<br />
                    <strong>Top Nav Style:</strong> {topNavVariant}
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Features</h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li><i className="bi bi-check-circle text-success me-2"></i>Role-based menu items</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>Responsive design</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>Search functionality (top nav)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>Dropdown for overflow items (top nav)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>Active state indicators</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>Badge support</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>Collapse/expand (left nav)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Usage Examples</h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Left Navigation Only:</strong>
                        <pre className="bg-light p-2 mt-1 small">
{`<MainTemplate navigationMode="left">
  <YourContent />
</MainTemplate>`}
                        </pre>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Top Navigation Only:</strong>
                        <pre className="bg-light p-2 mt-1 small">
{`<MainTemplate 
  navigationMode="top"
  showTopSearch={true}
  topNavVariant="primary"
>
  <YourContent />
</MainTemplate>`}
                        </pre>
                      </div>
                      
                      <div>
                        <strong>Both Navigations:</strong>
                        <pre className="bg-light p-2 mt-1 small">
{`<MainTemplate navigationMode="both">
  <YourContent />
</MainTemplate>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
};

export default NavigationDemo;
