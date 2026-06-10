import api from './authService';

export const locationService = {
  // Get all countries
  async getCountries() {
    try {
      const response = await api.get('/location/countries');
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },

  // Get states by country ID
  async getStatesByCountryId(countryId) {
    try {
      const response = await api.get(`/location/states/by-country/${countryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching states:', error);
      throw error;
    }
  },

  // Get all states
  async getStates() {
    try {
      const response = await api.get('/location/states');
      return response.data;
    } catch (error) {
      console.error('Error fetching states:', error);
      throw error;
    }
  },

  // Get cities by state ID
  async getCitiesByStateId(stateId) {
    try {
      const response = await api.get(`/location/cities/by-state/${stateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  // Get all cities
  async getCities() {
    try {
      const response = await api.get('/location/cities');
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  // Get cascaded location data (all countries, states, cities in one call)
  async getCascadedLocationData() {
    try {
      const response = await api.get('/location/cascaded');
      return response.data;
    } catch (error) {
      console.error('Error fetching cascaded location data:', error);
      throw error;
    }
  }
};
