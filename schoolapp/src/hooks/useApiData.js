import { useState, useEffect, useCallback } from 'react';

export const useApiData = (service, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError('');
      let result;
      
      if (service.getAll && typeof service.getAll === 'function') {
        result = await service.getAll(params);
      } else if (typeof service === 'function') {
        result = await service(params);
      } else {
        throw new Error('Invalid service provided');
      }
      
      setData(result || []);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createItem = useCallback(async (itemData) => {
    try {
      setLoading(true);
      setError('');
      const newItem = await service.create(itemData);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create item';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const updateItem = useCallback(async (id, itemData, params = {}) => {
    try {
      setLoading(true);
      setError('');
      const updatedItem = await service.update(id, itemData, params);
      setData(prev => 
        prev.map(item => item.id === id ? updatedItem : item)
      );
      return updatedItem;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update item';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const deleteItem = useCallback(async (id, params = {}) => {
    try {
      setLoading(true);
      setError('');
      await service.delete(id, params);
      setData(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete item';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const refreshData = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    refreshData
  };
};
