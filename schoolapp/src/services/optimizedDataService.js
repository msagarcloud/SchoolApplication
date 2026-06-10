import api from './authService';

// Simple in-memory cache for API responses
const cache = new Map();
const pendingRequests = new Map();

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;

class OptimizedDataService {
  constructor() {
    // Use shared authenticated axios instance from authService
    this.api = api;
  }

  // Cache methods
  setCache(key, data) {
    // Remove oldest entries if cache is full
    if (cache.size >= MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  getCache(key) {
    const cached = cache.get(key);
    if (!cached) return null;
    
    // Check if cache is expired
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clearCache(pattern = null) {
    if (pattern) {
      // Clear cache entries matching pattern
      for (const key of cache.keys()) {
        if (key.includes(pattern)) {
          cache.delete(key);
        }
      }
    } else {
      cache.clear();
    }
  }

  // Request deduplication
  async deduplicateRequest(key, requestFn) {
    // If request is already pending, return the existing promise
    if (pendingRequests.has(key)) {
      return pendingRequests.get(key);
    }
    // Create new request and ensure pendingRequests cleanup
    const promise = requestFn().finally(() => pendingRequests.delete(key));
    pendingRequests.set(key, promise);
    return promise;
  }

  // Optimized HTTP methods
  async get(url, options = {}) {
    // Check cache first
    if (!options.skipCache) {
      const cachedData = this.getCache(url);
      if (cachedData) {
        return { data: cachedData, fromCache: true };
      }
    }

    // Deduplicate identical requests and populate cache on success
    return this.deduplicateRequest(`GET:${url}`, async () => {
      const response = await this.api.get(url, options);
      try {
        this.setCache(url, response.data);
      } catch (e) {
        // ignore cache set errors
      }
      return response;
    });
  }

  async post(url, data, options = {}) {
    // Clear relevant cache on POST
    this.clearCache(url.split('/')[1]);
    return this.api.post(url, data, options);
  }

  async put(url, data, options = {}) {
    // Clear relevant cache on PUT
    this.clearCache(url.split('/')[1]);
    try {
      await this.api.delete(`${url}/cache`);
    } catch {}
    return this.api.put(url, data, options);
  }

  async delete(url, options = {}) {
    // Clear relevant cache on DELETE
    this.clearCache(url.split('/')[1]);
    return this.api.delete(url, options);
  }

  // Batch requests
  async batch(requests) {
    const promises = requests.map(({ method, url, data, options }) => {
      switch (method.toLowerCase()) {
        case 'get':
          return this.get(url, options);
        case 'post':
          return this.post(url, data, options);
        case 'put':
          return this.put(url, data, options);
        case 'delete':
          return this.delete(url, options);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    });

    return Promise.allSettled(promises);
  }

  // Optimized student service methods
  async getStudents(options = {}) {
    const { page = 1, pageSize = 20, search, minimal } = options;
    
    let url = '/students';
    const params = new URLSearchParams();
    
    if (page > 1 || pageSize !== 20) {
      url = '/students/paged';
      params.append('page', page);
      params.append('pageSize', pageSize);
    } else if (minimal) {
      url = '/students/minimal';
    }
    
    if (search) {
      url = '/students/search';
      params.append('query', search);
      params.append('page', page);
      params.append('pageSize', pageSize);
    }
    
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    return this.get(fullUrl);
  }

  async getStudentById(id) {
    return this.get(`/students/${id}`);
  }

  async createStudent(data) {
    return this.post('/students', data);
  }

  async updateStudent(id, data) {
    return this.put(`/students/${id}`, data);
  }

  async deleteStudent(id) {
    return this.delete(`/students/${id}`);
  }

  // Preload commonly used data
  async preloadCommonData() {
    const commonRequests = [
      { method: 'get', url: '/students/minimal' },
      { method: 'get', url: '/classes' },
      { method: 'get', url: '/sections' },
      { method: 'get', url: '/categories' },
    ];

    return this.batch(commonRequests);
  }

  // Cache statistics
  getCacheStats() {
    return {
      size: cache.size,
      maxSize: MAX_CACHE_SIZE,
      pendingRequests: pendingRequests.size,
    };
  }
}

// Create singleton instance
const optimizedDataService = new OptimizedDataService();

export default optimizedDataService;
