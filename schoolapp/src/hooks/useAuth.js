import { useState, useEffect, useCallback, useRef } from 'react';
import { authServiceOptimized } from '../services/authServiceOptimized';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authServiceOptimized.isAuthenticated()
  );
  const [user, setUser] = useState(() => authServiceOptimized.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [tokenRemainingTime, setTokenRemainingTime] = useState(() =>
    authServiceOptimized.getTokenRemainingTime()
  );
  const intervalRef = useRef(null);

  // Check authentication status
  const checkAuth = useCallback(() => {
    const isAuth = authServiceOptimized.isAuthenticated();
    const currentUser = authServiceOptimized.getCurrentUser();
    const remainingTime = authServiceOptimized.getTokenRemainingTime();

    setIsAuthenticated(isAuth);
    setUser(currentUser);
    setTokenRemainingTime(remainingTime);
    setLoading(false);

    return isAuth;
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auto-refresh auth status less frequently to prevent flickering
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only set up interval if authenticated
    if (isAuthenticated) {
      intervalRef.current = setInterval(() => {
        checkAuth();
      }, 300000); // Check every 5 minutes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, checkAuth]);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      const response = await authServiceOptimized.login(credentials);
      authServiceOptimized.setAuthData(response.token, response.user, response.expiresIn);

      setIsAuthenticated(true);
      setUser(response.user);
      setTokenRemainingTime(authServiceOptimized.getTokenRemainingTime());
      setLoading(false);
      
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    await authServiceOptimized.logout();
    setIsAuthenticated(false);
    setUser(null);
    setTokenRemainingTime(0);
    
    // Clear interval on logout
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Refresh token if needed
  const refreshTokenIfNeeded = useCallback(async () => {
    return await authServiceOptimized.refreshTokenIfNeeded();
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
    tokenRemainingTime,
    login,
    logout,
    refreshTokenIfNeeded,
    checkAuth
  };
};
