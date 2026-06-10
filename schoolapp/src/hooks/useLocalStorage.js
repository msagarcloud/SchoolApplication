import { useState, useCallback, useEffect } from 'react';

export const useLocalStorage = (key, initialValue = null) => {
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Set value in localStorage and state
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Clear all localStorage
  const clearAll = useCallback(() => {
    try {
      window.localStorage.clear();
      setStoredValue(initialValue);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  }, [initialValue]);

  // Check if key exists
  const hasKey = useCallback(() => {
    return window.localStorage.getItem(key) !== null;
  }, [key]);

  // Get all keys
  const getAllKeys = useCallback(() => {
    return Object.keys(window.localStorage);
  }, []);

  // Get storage size (approximate)
  const getStorageSize = useCallback(() => {
    let total = 0;
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        total += window.localStorage[key].length + key.length;
      }
    }
    return total;
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error);
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearAll,
    hasKey,
    getAllKeys,
    getStorageSize
  };
};
