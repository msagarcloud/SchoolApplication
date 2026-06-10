import { useState, useCallback, useMemo } from 'react';
import { authService } from '../services/authService';

export const useSessionData = () => {
  const [sessionData, setSessionData] = useState(() => {
    const currentUser = authService.getCurrentUser();
    return {
      companyId: currentUser?.CompanyId || currentUser?.companyId || '',
      schoolId: currentUser?.SchoolId || currentUser?.schoolId || '',
      userId: currentUser?.Id || currentUser?.id || '',
      userName: currentUser?.UserName || currentUser?.userName || '',
      roleName: currentUser?.UserRole || currentUser?.userRole || currentUser?.roleName || '',
      email: currentUser?.EmailAddress || currentUser?.emailAddress || currentUser?.email || ''
    };
  });

  const updateSessionData = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    const newSessionData = {
      companyId: currentUser?.CompanyId || currentUser?.companyId || '',
      schoolId: currentUser?.SchoolId || currentUser?.schoolId || '',
      userId: currentUser?.Id || currentUser?.id || '',
      userName: currentUser?.UserName || currentUser?.userName || '',
      roleName: currentUser?.UserRole || currentUser?.userRole || currentUser?.roleName || '',
      email: currentUser?.EmailAddress || currentUser?.emailAddress || currentUser?.email || ''
    };
    setSessionData(newSessionData);
    return newSessionData;
  }, []);

  const isValidSession = useMemo(() => {
    return !!(sessionData.companyId === '' || 
              sessionData.schoolId === '' || 
              sessionData.companyId === '00000000-0000-0000-0000-000000000000' || 
              sessionData.schoolId === '00000000-0000-0000-0000-000000000000');
  }, [sessionData]);

  const getSessionHeaders = useCallback(() => {
    return {
      'Company-Id': sessionData.companyId,
      'School-Id': sessionData.schoolId,
      'User-Id': sessionData.userId
    };
  }, [sessionData]);

  const getApiParams = useCallback(() => {
    const params = {};
    if (sessionData.schoolId) {
      params.schoolId = sessionData.schoolId;
    }
    if (sessionData.companyId) {
      params.companyId = sessionData.companyId;
    }
    return params;
  }, [sessionData]);

  const hasPermission = useCallback((requiredRole) => {
    if (!sessionData.roleName) return false;
    
    // Role hierarchy (higher number = higher privilege)
    const roleHierarchy = {
      'Super Administrator': 100,
      'Administrator': 80,
      'Principal': 70,
      'Teacher': 50,
      'Student': 30,
      'Parent': 20
    };
    
    const userRoleLevel = roleHierarchy[sessionData.roleName] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0;
    
    return userRoleLevel >= requiredRoleLevel;
  }, [sessionData.roleName]);

  const isSuperAdmin = useMemo(() => {
    return sessionData.roleName === 'Super Administrator';
  }, [sessionData.roleName]);

  const isAdmin = useMemo(() => {
    return ['Super Administrator', 'Administrator'].includes(sessionData.roleName);
  }, [sessionData.roleName]);

  const isTeacher = useMemo(() => {
    return ['Super Administrator', 'Administrator', 'Principal', 'Teacher'].includes(sessionData.roleName);
  }, [sessionData.roleName]);

  // Filter data based on session
  const filterBySession = useCallback((data) => {
    if (!isValidSession) return data;
    
    return data.filter(item => {
      let matchesCompany = true;
      let matchesSchool = true;
      
      if (sessionData.companyId) {
        matchesCompany = item.companyId === sessionData.companyId;
      }
      
      if (sessionData.schoolId) {
        matchesSchool = item.schoolId === sessionData.schoolId;
      }
      
      return matchesCompany && matchesSchool;
    });
  }, [sessionData, isValidSession]);

  return {
    sessionData,
    updateSessionData,
    isValidSession,
    getSessionHeaders,
    getApiParams,
    hasPermission,
    isSuperAdmin,
    isAdmin,
    isTeacher,
    filterBySession
  };
};
