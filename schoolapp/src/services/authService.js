import axios from 'axios';

//const API_BASE_URL = 'http://localhost:5260/api/';  //HTTP endpoint to avoid HTTPS issues
const API_BASE_URL = 'https://localhost:7200/api/';  //HTTPS endpoint
//const API_BASE_URL = 'http://localhost:65164/gateway';  // Ocelot End points

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Optimized to 15 seconds for faster login feedback
});

export const authService = {
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
        throw new Error(`Login request timed out after ${api.defaults.timeout / 1000}s. Check API server and database connectivity.`);
      }
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_CONNECTION_REFUSED') {
        throw new Error(`Unable to connect to API server at ${API_BASE_URL}. Please ensure the API is running.`);
      }
      
      if (error.response) {
        // Server responded with error status
        console.error('Server error response:', error.response.status, error.response.data);
        if (error.response.status === 401) {
          throw new Error('Invalid username or password');
        } else if (error.response.status === 400) {
          throw new Error('Invalid request format');
        } else {
          throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Login failed');
      }
    }
  },

  async logout() {
    try {
      console.log('Starting logout process...');
      
      // Clear ALL localStorage items to ensure no stale data remains
      localStorage.clear();
      
      // Clear sessionStorage as well
      sessionStorage.clear();
      
      console.log('All session and authentication data cleared successfully');
      
      // Force redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Continue with logout even if there's an error
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
    
    // Check if both token and valid user data exist
    if (!token || !user) {
      return false;
    }
    
    try {
      const parsedUser = JSON.parse(user);
      // Ensure user object has required fields (support both PascalCase and camelCase)
      const hasUserName = parsedUser && (parsedUser.userName || parsedUser.UserName);
      const hasUserRole = parsedUser && (parsedUser.userRole || parsedUser.UserRole);
      return hasUserName && hasUserRole;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return false;
    }
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      
      const parsedUser = JSON.parse(user);
      // Return user only if it has required fields (support both PascalCase and camelCase)
      const hasUserName = parsedUser && (parsedUser.userName || parsedUser.UserName);
      const hasUserRole = parsedUser && (parsedUser.userRole || parsedUser.UserRole);
      return (hasUserName && hasUserRole) ? parsedUser : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  setAuthData(token, user, schoolName = null, companyName = null, expiresInSeconds = 86400) {
    const loginTime = Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loginTime', loginTime.toString());
    localStorage.setItem('expiresIn', String(expiresInSeconds));
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
  }
};

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
