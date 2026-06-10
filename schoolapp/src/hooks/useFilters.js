import { useState, useCallback, useMemo } from 'react';

export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateMultipleFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const clearFilter = useCallback((field) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[field];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const applyFilters = useCallback((data, filterConfig = {}) => {
    let filteredData = [...data];

    // Apply each filter if it exists and has a value
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        const filterFunction = filterConfig[key];
        if (typeof filterFunction === 'function') {
          filteredData = filterFunction(filteredData, value);
        } else {
          // Default string filtering (case-insensitive)
          filteredData = filteredData.filter(item => {
            const itemValue = item[key];
            return itemValue && 
                   typeof itemValue === 'string' && 
                   itemValue.toLowerCase().includes(value.toLowerCase());
          });
        }
      }
    });

    return filteredData;
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => 
      value !== '' && value !== null && value !== undefined && 
      JSON.stringify(value) !== JSON.stringify(initialFilters[key])
    );
  }, [filters, initialFilters]);

  const getFilterCount = useCallback(() => {
    return Object.entries(filters).filter(([key, value]) => 
      value !== '' && value !== null && value !== undefined && 
      JSON.stringify(value) !== JSON.stringify(initialFilters[key])
    ).length;
  }, [filters, initialFilters]);

  // Common filter configurations
  const commonFilterConfigs = {
    // String contains filter (case-insensitive)
    contains: (data, value, field) => 
      data.filter(item => {
        const itemValue = item[field];
        return itemValue && 
               typeof itemValue === 'string' && 
               itemValue.toLowerCase().includes(value.toLowerCase());
      }),
    
    // Exact match filter
    exact: (data, value, field) => 
      data.filter(item => item[field] === value),
    
    // Boolean filter
    boolean: (data, value, field) => {
      const boolValue = value === 'true' || value === true;
      return data.filter(item => item[field] === boolValue);
    },
    
    // Date range filter
    dateRange: (data, value, field) => {
      if (!value.start && !value.end) return data;
      return data.filter(item => {
        const itemDate = new Date(item[field]);
        if (value.start && itemDate < new Date(value.start)) return false;
        if (value.end && itemDate > new Date(value.end)) return false;
        return true;
      });
    },
    
    // Array includes filter
    includes: (data, value, field) => 
      data.filter(item => {
        const itemValue = item[field];
        return Array.isArray(itemValue) && itemValue.includes(value);
      }),
    
    // Multiple values filter (for dropdowns with multiple selection)
    multiple: (data, value, field) => {
      if (!Array.isArray(value) || value.length === 0) return data;
      return data.filter(item => value.includes(item[field]));
    }
  };

  return {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearFilter,
    clearAllFilters,
    applyFilters,
    hasActiveFilters,
    getFilterCount,
    filterConfigs: commonFilterConfigs
  };
};
