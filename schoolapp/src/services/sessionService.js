// Session initialization service
export const sessionService = {
  // Initialize all session variables
  initializeSession() {
    try {
      // Clear any existing session data to ensure clean start
      sessionStorage.clear();
      
      // Initialize basic session variables
      sessionStorage.setItem('sessionInitialized', 'true');
      sessionStorage.setItem('sessionStartTime', new Date().toISOString());
      sessionStorage.setItem('appVersion', '1.0.0');
      
      // Initialize user-related session variables (will be populated after login)
      // Set to null explicitly, not to any default user
      sessionStorage.setItem('currentUser', JSON.stringify(null));
      sessionStorage.setItem('userRole', '');
      sessionStorage.setItem('userPermissions', JSON.stringify([]));
      sessionStorage.setItem('lastActivity', new Date().toISOString());
      
      // Initialize application state
      sessionStorage.setItem('theme', 'light');
      sessionStorage.setItem('language', 'en');
      sessionStorage.setItem('currentPage', 'login');
      
      // Initialize tracking variables
      sessionStorage.setItem('loginAttempts', '0');
      sessionStorage.setItem('sessionTimeout', '30'); // minutes
      
      console.log('Session variables initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing session variables:', error);
      return false;
    }
  },

  // Check if session is initialized
  isSessionInitialized() {
    return sessionStorage.getItem('sessionInitialized') === 'true';
  },

  // Update last activity timestamp
  updateLastActivity() {
    sessionStorage.setItem('lastActivity', new Date().toISOString());
  },

  // Get session duration in minutes
  getSessionDuration() {
    const startTime = sessionStorage.getItem('sessionStartTime');
    if (startTime) {
      const duration = Date.now() - new Date(startTime).getTime();
      return Math.floor(duration / (1000 * 60));
    }
    return 0;
  },

  // Clear all session data
  clearSession() {
    sessionStorage.clear();
    console.log('Session data cleared');
  }
};
