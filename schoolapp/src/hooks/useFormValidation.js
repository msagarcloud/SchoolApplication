import { useState, useCallback, useMemo } from 'react';

export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    for (const rule of rules) {
      const result = rule(value, values);
      if (result) return result;
    }

    return '';
  }, [validationRules, values]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      newErrors[fieldName] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  }, [validateField, values, validationRules]);

  const setFieldValue = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate field on change
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, [validateField]);

  const setFieldValues = useCallback((newValues) => {
    setValues(prev => ({ ...prev, ...newValues }));
    setTouched(prev => ({ ...prev, ...Object.keys(newValues).reduce((acc, key) => ({ ...acc, [key]: true }), {}) }));
    
    // Validate all updated fields
    const newErrors = {};
    Object.keys(newValues).forEach(fieldName => {
      newErrors[fieldName] = validateField(fieldName, newValues[fieldName]);
    });
    setErrors(prev => ({ ...prev, ...newErrors }));
  }, [validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const resetField = useCallback((fieldName) => {
    setValues(prev => ({ ...prev, [fieldName]: initialValues[fieldName] || '' }));
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
    setTouched(prev => ({ ...prev, [fieldName]: false }));
  }, [initialValues]);

  const isFieldValid = useCallback((fieldName) => {
    return !errors[fieldName];
  }, [errors]);

  const isFormValid = useMemo(() => {
    return Object.keys(validationRules).every(fieldName => !errors[fieldName]);
  }, [errors, validationRules]);

  const isFieldTouched = useCallback((fieldName) => {
    return touched[fieldName] || false;
  }, [touched]);

  const getFieldError = useCallback((fieldName) => {
    return touched[fieldName] ? errors[fieldName] : '';
  }, [errors, touched]);

  // Common validation rules
  const commonRules = {
    required: (message = 'This field is required') => (value) => {
      return !value || (typeof value === 'string' && value.trim() === '') ? message : '';
    },
    
    minLength: (min, message) => (value) => {
      return value && value.length < min ? (message || `Minimum ${min} characters required`) : '';
    },
    
    maxLength: (max, message) => (value) => {
      return value && value.length > max ? (message || `Maximum ${max} characters allowed`) : '';
    },
    
    email: (message = 'Invalid email address') => (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return value && !emailRegex.test(value) ? message : '';
    },
    
    phone: (message = 'Invalid phone number') => (value) => {
      const phoneRegex = /^[\d\s\-+()]+$/;
      return value && !phoneRegex.test(value) ? message : '';
    },
    
    number: (message = 'Must be a number') => (value) => {
      return value && isNaN(Number(value)) ? message : '';
    },
    
    positiveNumber: (message = 'Must be a positive number') => (value) => {
      return value && (isNaN(Number(value)) || Number(value) <= 0) ? message : '';
    },
    
    url: (message = 'Invalid URL') => (value) => {
      try {
        new URL(value);
        return '';
      } catch (error) {
        return value ? message : '';
      }
    },
    
    guid: (message = 'Invalid GUID format') => (value) => {
      const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return value && !guidRegex.test(value) ? message : '';
    },
    
    date: (message = 'Invalid date') => (value) => {
      const date = new Date(value);
      return value && isNaN(date.getTime()) ? message : '';
    },
    
    minDate: (minDate, message) => (value) => {
      if (!value) return '';
      const date = new Date(value);
      const min = new Date(minDate);
      return date < min ? (message || `Date must be after ${minDate}`) : '';
    },
    
    maxDate: (maxDate, message) => (value) => {
      if (!value) return '';
      const date = new Date(value);
      const max = new Date(maxDate);
      return date > max ? (message || `Date must be before ${maxDate}`) : '';
    },
    
    pattern: (regex, message) => (value) => {
      return value && !regex.test(value) ? message : '';
    },
    
    custom: (validator, message) => (value) => {
      return validator(value, values) ? '' : message;
    }
  };

  return {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldValues,
    resetForm,
    resetField,
    validateForm,
    validateField,
    isFieldValid,
    isFormValid,
    isFieldTouched,
    getFieldError,
    commonRules
  };
};
