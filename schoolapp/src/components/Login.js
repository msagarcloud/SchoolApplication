import React, { useReducer, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authServiceOptimized } from '../services/authServiceOptimized';
import LoginHeader from './layout/LoginHeader';
import LoginFooter from './layout/LoginFooter';

// Use useReducer for atomic state updates
const initialState = {
  credentials: { UserName: '', Password: '' },
  error: '',
  loading: false,
  loginAttempts: 0,
  showPassword: false,
  isSubmitting: false
};

function loginReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_CREDENTIALS':
      return {
        ...state,
        credentials: { ...state.credentials, ...action.payload },
        error: action.payload.UserName || action.payload.Password ? '' : state.error
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'INCREMENT_ATTEMPTS':
      return { ...state, loginAttempts: state.loginAttempts + 1 };
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'RESET_FORM':
      return { ...initialState, loginAttempts: state.loginAttempts };
    default:
      return state;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // Check if user is already authenticated
  const checkExistingAuth = useCallback(() => {
    try {
      return authServiceOptimized.isAuthenticated();
    } catch (err) {
      console.error('Error checking authentication:', err);
      return false;
    }
  }, []);

  React.useEffect(() => {
    const isAuth = checkExistingAuth();
    if (isAuth) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, checkExistingAuth]);

  // Stable event handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_CREDENTIALS', payload: { [name]: value } });
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    dispatch({ type: 'TOGGLE_PASSWORD' });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (state.isSubmitting) return;
    
    // Basic validation
    if (!state.credentials.UserName.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Username is required' });
      return;
    }
    
    if (!state.credentials.Password.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Password is required' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_SUBMITTING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });

    try {
      const response = await authServiceOptimized.login(state.credentials);
      
      if (response.token && response.user) {
        authServiceOptimized.setAuthData(response.token, response.user, response.expiresIn);
        
        navigate('/dashboard', { replace: true });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid login response from server' });
      }
    } catch (err) {
      dispatch({ type: 'INCREMENT_ATTEMPTS' });
      
      let errorMessage = err.message || 'Login failed. Please try again.';
      
      if (err.message.includes('timed out')) {
        errorMessage = 'Login request timed out. Please check your connection and try again.';
      } else if (err.message.includes('Unable to connect')) {
        errorMessage = 'Cannot connect to server. Please ensure the backend service is running.';
      } else if (err.message.includes('No response from server')) {
        errorMessage = 'Server is not responding. Please try again in a moment.';
      }
      
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  }, [state.credentials, state.isSubmitting, navigate]);

  // Memoize expensive calculations
  const buttonClass = useMemo(() => {
    let baseClass = 'btn btn-lg w-100 ';
    
    if (state.loading) {
      baseClass += 'btn-secondary';
    } else if (state.loginAttempts >= 3) {
      baseClass += 'btn-warning';
    } else {
      baseClass += 'btn-primary';
    }
    
    return baseClass;
  }, [state.loading, state.loginAttempts]);

  const buttonText = useMemo(() => {
    if (state.loading) {
      return (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Signing in...
        </>
      );
    }
    
    if (state.loginAttempts >= 3) {
      return 'Try Again';
    }
    
    return 'Sign In';
  }, [state.loading, state.loginAttempts]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Login Header */}
      <LoginHeader />

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">School Demo</h2>
                    <p className="text-muted">Sign in to your account</p>
                    {state.loginAttempts > 0 && (
                      <small className="text-info">
                        Attempts: {state.loginAttempts}
                      </small>
                    )}
                  </div>

                  {state.error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      <div>{state.error}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label fw-semibold">
                        Username
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person"></i>
                        </span>
                        <input
                          type="text"
                          className={`form-control ${state.error && !state.credentials.UserName ? 'is-invalid' : ''}`}
                          id="UserName"
                          name="UserName"
                          value={state.credentials.UserName}
                          onChange={handleChange}
                          required
                          autoFocus
                          placeholder="Enter your username"
                          disabled={state.loading}
                          autoComplete="username"
                        />
                      </div>
                      {state.error && !state.credentials.UserName && (
                        <div className="invalid-feedback d-block">
                          Username is required
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-semibold">
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-lock"></i>
                        </span>
                        <input
                          type={state.showPassword ? 'text' : 'password'}
                          className={`form-control ${state.error && !state.credentials.Password ? 'is-invalid' : ''}`}
                          id="Password"
                          name="Password"
                          value={state.credentials.Password}
                          onChange={handleChange}
                          required
                          placeholder="Enter your password"
                          disabled={state.loading}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                          disabled={state.loading}
                          tabIndex="-1"
                        >
                          <i className={`bi ${state.showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                      </div>
                      {state.error && !state.credentials.Password && (
                        <div className="invalid-feedback d-block">
                          Password is required
                        </div>
                      )}
                    </div>

                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        className={buttonClass}
                        disabled={state.loading || state.isSubmitting}
                      >
                        {buttonText}
                      </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        Secure login
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-speedometer2 me-1"></i>
                        Optimized
                      </small>
                    </div>
                  </form>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      Demo: Use your registered credentials
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Login Footer */}
      <LoginFooter />
    </div>
  );
};

export default Login;
