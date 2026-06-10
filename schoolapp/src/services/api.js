// API Service for making HTTP requests to the backend

function resolveApiBaseUrl() {
  const raw = process.env.REACT_APP_API_URL?.trim() || process.env.REACT_APP_API_BASE_URL?.trim();
  if (!raw) return 'https://localhost:7200/api';
  let url = raw.replace(/\s+$/g, '');
  if (!/^https?:\/\//i.test(url)) {
    url = `http://${url}`;
  }
  url = url.replace(/\/+$|\s+$/g, '');
  if (!url.endsWith('/api')) url = `${url}/api`;
  return url;
}

const API_BASE_URL = resolveApiBaseUrl();

try {
  // eslint-disable-next-line no-console
  console.info('[api] Resolved API_BASE_URL ->', API_BASE_URL);
} catch (e) {
  // ignore
}

/** Optimized timeout for faster login response while maintaining reliability for other operations */
const REQUEST_TIMEOUT_MS = 20000;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL.replace(/\/+$/, '');
  }

  getCandidateBaseUrls() {
    const urls = [];
    try {
      const parsed = new URL(this.baseURL);
      const isLocalhost = ['localhost', '127.0.0.1'].includes(parsed.hostname);
      const currentScheme = parsed.protocol.replace(':', '');
      const alternateScheme = currentScheme === 'https' ? 'http' : 'https';
      const port = parsed.port || (currentScheme === 'https' ? '443' : '80');
      const pathSuffix = parsed.pathname.endsWith('/api') ? '/api' : parsed.pathname;

      urls.push(this.baseURL);
      if (isLocalhost) {
        urls.push(`${alternateScheme}://${parsed.hostname}:${port}${pathSuffix}`);
      }
    } catch {
      urls.push(this.baseURL);
    }

    return [...new Set(urls)];
  }

  // Generic HTTP request methods
  async request(endpoint, options = {}) {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const { params, ...fetchOptions } = options;
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    const baseUrls = this.getCandidateBaseUrls();

    const configBase = {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    };

    // Add authentication token if available
    const token = localStorage.getItem('token');
    if (token) {
      configBase.headers.Authorization = `Bearer ${token}`;
    }

    let lastError;
    for (let attempt = 0; attempt < baseUrls.length; attempt += 1) {
      const baseUrl = baseUrls[attempt];
      const url = `${baseUrl}${path}${queryString}`;
      const controller = new AbortController();
      const timeoutMs = attempt === 0 ? REQUEST_TIMEOUT_MS : Math.max(5000, REQUEST_TIMEOUT_MS / 2);
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      const config = {
        ...configBase,
        signal: controller.signal,
      };

      try {
        const response = await fetch(url, config);

        // If 404 and this client is using a base URL that ends with '/api',
        // attempt a single safe retry against the same host without the '/api' prefix.
        if (!response.ok) {
          // Handle 401 Unauthorized - token expired or invalid
          if (response.status === 401) {
            console.log('Token expired or invalid, clearing session and redirecting to login');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('expiresIn');
            window.location.href = '/login';
            throw new Error('Session expired. Please log in again.');
          }

          if (response.status === 404 && (!config.method || config.method.toUpperCase() === 'GET') && baseUrl.endsWith('/api')) {
            try {
              const altBase = baseUrl.replace(/\/api$/, '');
              const altUrl = `${altBase}${path}`;
              const altResponse = await fetch(altUrl, config);
              if (altResponse.ok) {
                const altData = await altResponse.json().catch(() => null);
                console.warn('[api] Fallback successful (removed /api):', altUrl);
                return altData;
              }

              const altRaw = await altResponse.text().catch(() => null);
              console.error('API fallback response error', {
                original: { url, status: response.status },
                fallback: { url: altUrl, status: altResponse.status, body: altRaw }
              });
              throw new Error(altRaw || `HTTP error! status: ${altResponse.status}`);
            } catch (altErr) {
              console.warn('[api] Fallback attempt failed:', altErr);
            }
          }

          const rawText = await response.text().catch(() => null);
          let errorData = {};
          try {
            errorData = rawText ? JSON.parse(rawText) : {};
          } catch (e) {
            // not JSON
          }

          console.error('API response error', {
            url,
            status: response.status,
            method: config.method || 'GET',
            body: rawText,
          });

          throw new Error(errorData.message || rawText || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json().catch(() => null);
        return data;
      } catch (error) {
        clearTimeout(timeoutId);
        const isRecoverable = error.name === 'AbortError' || error instanceof TypeError;
        if (isRecoverable && attempt < baseUrls.length - 1) {
          console.warn(`API request failed on ${url}, retrying with alternate base URL`, error.message);
          lastError = error;
          continue;
        }

        if (error.name === 'AbortError') {
          const msg = `Request timed out after ${REQUEST_TIMEOUT_MS / 1000}s`;
          console.error('API request error:', msg, url);
          throw new Error(msg);
        }

        console.error('API request error:', error);
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    }

    throw lastError || new Error('API request failed');
  }

  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // File upload method
  async upload(endpoint, formData, onProgress) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'POST',
      body: formData,
      headers: {},
    };

    // Add authentication token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            onProgress(percentComplete);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (error) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new Error(errorData.message || `HTTP error! status: ${xhr.status}`));
          } catch {
            reject(new Error(`HTTP error! status: ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error'));
      });

      xhr.open('POST', url);
      // Add authentication token to xhr after open()
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      xhr.send(formData);
    });
  }

  // File download method
  async download(endpoint, filename) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {},
    };

    // Add authentication token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          console.log('Token expired or invalid, clearing session and redirecting to login');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('loginTime');
          localStorage.removeItem('expiresIn');
          window.location.href = '/login';
          throw new Error('Session expired. Please log in again.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Create download link
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true };
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
