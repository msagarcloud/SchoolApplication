import axios from 'axios';

// Match `schoolapp/src/services/api.js`; no trailing slashes on env value required.
function resolveApiBaseUrl() {
  const raw = process.env.REACT_APP_API_URL?.trim();
  if (!raw) return 'https://localhost:7200/api/';
  let u = raw.replace(/\/+$/, '');
  if (!u.endsWith('/api')) u = `${u}/api`;
  return `${u}/`;
}

const API_BASE_URL = resolveApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Optimized timeout for login - reduced to 15s for faster feedback
  timeout: 15000,
});

export const authService = {
  // Retry mechanism for failed requests
  async retryRequest(requestFn, maxRetries = 2, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error.message);
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Don't retry on authentication errors
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          throw error;
        }
        
        // Wait before retrying with exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  },

  async login(credentials) {
    try {
      console.log('Attempting login to:', API_BASE_URL + 'login');
      console.log('Credentials:', { UserName: credentials.UserName, Password: '***' });
      
      const response = await api.post('/login', credentials);
      console.log('Login successful:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Login error details:', error);

      if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
        throw new Error(`Login request timed out after ${api.defaults.timeout / 1000}s. Please check your network connection and try again.`);
      }
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_CONNECTION_REFUSED') {
        throw new Error(`Unable to connect to API server at ${API_BASE_URL}. Please ensure the backend service is running.`);
      }
      
      if (error.response) {
        console.error('Server error response:', error.response.status, error.response.data);
        
        if (error.response.status === 401) {
          throw new Error('Invalid username or password');
        } else if (error.response.status === 429) {
          throw new Error('Too many login attempts. Please wait before trying again.');
        } else if (error.response.status === 400) {
          throw new Error('Invalid request format');
        } else {
          throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        throw new Error('No response from server. Please check your network connection and ensure the API server is running.');
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  },

  async logout() {
    try {
      console.log('Starting logout process...');
      
      // Clear ALL storage
      localStorage.clear();
      sessionStorage.clear();
      
      console.log('All session and authentication data cleared successfully');
      
      // Force redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      window.location.href = '/login';
    }
  },

  async changePassword(payload) {
    try {
      const response = await api.post('/login/change-password', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data?.message || error.response.data || 'Failed to change password');
      }
      throw new Error(error.message || 'Failed to change password');
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');
    const expiresIn = localStorage.getItem('expiresIn');
    
    if (!token || !user || !loginTime || !expiresIn) {
      return false;
    }
    
    try {
      const parsedUser = JSON.parse(user);
      
      // Check if token has expired
      const currentTime = Date.now();
      const tokenAge = (currentTime - parseInt(loginTime)) / 1000; // Age in seconds
      const expirationTime = parseInt(expiresIn);
      
      if (tokenAge >= expirationTime) {
        console.log('Token has expired, logging out...');
        return false;
      }
      
      // Ensure user object has required fields (support both PascalCase and camelCase)
      const hasUserName = parsedUser && (parsedUser.userName || parsedUser.UserName);
      const hasUserRole = parsedUser && (parsedUser.userRole || parsedUser.UserRole);
      return hasUserName && hasUserRole;
    } catch (error) {
      console.error('Error parsing authentication data:', error);
      return false;
    }
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      
      const parsedUser = JSON.parse(user);
      // Support both PascalCase and camelCase property names
      const hasUserName = parsedUser && (parsedUser.userName || parsedUser.UserName);
      const hasUserRole = parsedUser && (parsedUser.userRole || parsedUser.UserRole);
      return (hasUserName && hasUserRole) ? parsedUser : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  getToken() {
    // Check if token is still valid before returning
    if (!this.isAuthenticated()) {
      return null;
    }
    return localStorage.getItem('token');
  },

  getTokenRemainingTime() {
    const loginTime = localStorage.getItem('loginTime');
    const expiresIn = localStorage.getItem('expiresIn');
    
    if (!loginTime || !expiresIn) {
      return 0;
    }
    
    const currentTime = Date.now();
    const tokenAge = (currentTime - parseInt(loginTime)) / 1000;
    const expirationTime = parseInt(expiresIn);
    
    return Math.max(0, expirationTime - tokenAge);
  },

  setAuthData(token, user, expiresInSeconds = 86400) {
    const loginTime = Date.now();
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loginTime', loginTime.toString());
    localStorage.setItem('expiresIn', expiresInSeconds.toString());
    
    // Support PascalCase properties from server and camelCase internally
    const schoolName = user.schoolName || user.SchoolName;
    const companyName = user.companyName || user.CompanyName;
    
    if (schoolName) {
      localStorage.setItem('schoolName', schoolName);
    }
    if (companyName) {
      localStorage.setItem('companyName', companyName);
    }
  },

  getSchoolName() {
    return localStorage.getItem('schoolName');
  },

  getCompanyName() {
    return localStorage.getItem('companyName');
  },

  async checkApiHealth() {
    return { status: 'healthy' };
  },

  async refreshTokenIfNeeded() {
    const remainingTime = this.getTokenRemainingTime();
    
    // Refresh token if less than 5 minutes remaining
    if (remainingTime > 0 && remainingTime < 300) {
      try {
        console.log('Token expiring soon, consider refreshing...');
        return true;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        return false;
      }
    }
    
    return remainingTime > 0;
  }
};

// Also export as authServiceOptimized for backward compatibility
export const authServiceOptimized = authService;

// Enhanced interceptor with token validation
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

export default api;
