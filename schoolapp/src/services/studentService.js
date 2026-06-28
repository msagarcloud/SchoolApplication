import api from './authService';

// Simple in-memory cache for student API responses
const cache = new Map();
const pendingRequests = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCache = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  return cached.data;
};

const setCache = (key, data) => {
  if (cache.size >= 100) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, { data, timestamp: Date.now() });
};

const clearCache = () => {
  cache.clear();
};

const deduplicateRequest = async (key, requestFn) => {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  const promise = requestFn().finally(() => pendingRequests.delete(key));
  pendingRequests.set(key, promise);
  return promise;
};

const studentService = {
  // Get all students
  getAll: async (options = {}) => {
    const cacheKey = 'student_all';
    if (!options.skipCache) {
      const cached = getCache(cacheKey);
      if (cached) return cached;
    }
    return deduplicateRequest(cacheKey, async () => {
      try {
        const response = await api.get('/student');
        setCache(cacheKey, response.data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch students');
      }
    });
  },

  // Get student by ID
  getById: async (id, options = {}) => {
    const cacheKey = `student_${id}`;
    if (!options.skipCache) {
      const cached = getCache(cacheKey);
      if (cached) return cached;
    }
    return deduplicateRequest(cacheKey, async () => {
      try {
        const response = await api.get(`/student/${id}`);
        setCache(cacheKey, response.data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch student');
      }
    });
  },

  // Create new student
  create: async (studentData) => {
    try {
      const response = await api.post('/student', studentData);
      clearCache();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create student');
    }
  },

  // Update student
  update: async (id, studentData) => {
    try {
      const response = await api.put(`/student/${id}`, studentData);
      clearCache();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update student');
    }
  },

  // Delete student
  delete: async (id) => {
    try {
      await api.delete(`/student/${id}`);
      clearCache();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete student');
    }
  },

  // Search students
  search: async (searchParams, options = {}) => {
    const cacheKey = `student_search_${JSON.stringify(searchParams)}`;
    if (!options.skipCache) {
      const cached = getCache(cacheKey);
      if (cached) return cached;
    }
    return deduplicateRequest(cacheKey, async () => {
      try {
        const response = await api.get('/student/search', { params: searchParams });
        setCache(cacheKey, response.data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to search students');
      }
    });
  },

  // Get student statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/student/statistics');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student statistics');
    }
  },

  // Export students
  export: async (format = 'excel') => {
    try {
      const response = await api.get(`/student/export?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export students');
    }
  }
};

export { studentService };
