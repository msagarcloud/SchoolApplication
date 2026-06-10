import { useState, useEffect, useCallback } from 'react';

export const useDropdownData = (services) => {
  const [dropdownData, setDropdownData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const fetchDropdownData = useCallback(async (sessionParams = {}) => {
    setLoading(prev => ({ ...prev, global: true }));
    setErrors(prev => ({ ...prev, global: '' }));

    try {
      const promises = Object.entries(services).map(async ([key, service]) => {
        try {
          setLoading(prev => ({ ...prev, [key]: true }));
          setErrors(prev => ({ ...prev, [key]: '' }));
          
          let data;
          if (typeof service === 'function') {
            data = await service(sessionParams);
          } else if (service.getAll && typeof service.getAll === 'function') {
            data = await service.getAll(sessionParams);
          } else if (service.getBySchoolId && typeof service.getBySchoolId === 'function') {
            data = await service.getBySchoolId(sessionParams.schoolId);
          } else {
            data = await service;
          }
          
          return { key, data: data || [] };
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || `Failed to fetch ${key}`;
          setErrors(prev => ({ ...prev, [key]: errorMessage }));
          return { key, data: [] };
        } finally {
          setLoading(prev => ({ ...prev, [key]: false }));
        }
      });

      const results = await Promise.all(promises);
      
      const newDropdownData = {};
      results.forEach(({ key, data }) => {
        newDropdownData[key] = data;
      });
      
      setDropdownData(newDropdownData);
      setErrors(prev => ({ ...prev, global: '' }));
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch dropdown data';
      setErrors(prev => ({ ...prev, global: errorMessage }));
    } finally {
      setLoading(prev => ({ ...prev, global: false }));
    }
  }, [services]);

  const getDropdownOptions = useCallback((key, valueField = 'id', labelField = 'name') => {
    const data = dropdownData[key] || [];
    return data.map(item => ({
      value: item[valueField] || item.id,
      label: item[labelField] || item.name || item.toString(),
      item: item
    }));
  }, [dropdownData]);

  const getFilteredOptions = useCallback((key, filterValue, valueField = 'id', labelField = 'name') => {
    const options = getDropdownOptions(key, valueField, labelField);
    if (!filterValue) return options;
    
    return options.filter(option => 
      option.label.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [getDropdownOptions]);

  const refreshDropdown = useCallback(async (key) => {
    if (!services[key]) return;
    
    try {
      setLoading(prev => ({ ...prev, [key]: true }));
      setErrors(prev => ({ ...prev, [key]: '' }));
      
      let data;
      const service = services[key];
      if (typeof service === 'function') {
        data = await service();
      } else if (service.getAll && typeof service.getAll === 'function') {
        data = await service.getAll();
      } else if (service.getBySchoolId && typeof service.getBySchoolId === 'function') {
        // Note: This would need session params to be passed in or accessed from context
        data = await service.getBySchoolId();
      }
      
      setDropdownData(prev => ({
        ...prev,
        [key]: data || []
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || `Failed to refresh ${key}`;
      setErrors(prev => ({ ...prev, [key]: errorMessage }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [services]);

  const clearDropdownData = useCallback((key) => {
    if (key) {
      setDropdownData(prev => {
        const newData = { ...prev };
        delete newData[key];
        return newData;
      });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
      setLoading(prev => {
        const newLoading = { ...prev };
        delete newLoading[key];
        return newLoading;
      });
    } else {
      // Clear all
      setDropdownData({});
      setErrors({});
      setLoading({});
    }
  }, []);

  const isLoading = useCallback((key) => {
    return loading[key] || loading.global || false;
  }, [loading]);

  const getError = useCallback((key) => {
    return errors[key] || errors.global || '';
  }, [errors]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  return {
    dropdownData,
    loading,
    errors,
    fetchDropdownData,
    getDropdownOptions,
    getFilteredOptions,
    refreshDropdown,
    clearDropdownData,
    isLoading,
    getError
  };
};
