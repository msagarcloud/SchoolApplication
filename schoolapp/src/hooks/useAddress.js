import { useCallback, useMemo, useState } from 'react';

const DEFAULT_ADDRESS = {
  address1: '',
  address2: '',
  country: '',
  state: '',
  city: '',
  pincode: ''
};

/**
 * Reusable hook for managing a simple address object.
 *
 * @param {object} initialValues
 * @returns {
 *  values,
 *  setValues,
 *  setField,
 *  reset,
 *  onChange,
 *  setAddress
 * }
 */
export const useAddress = (initialValues = {}) => {
  const mergedInitial = useMemo(
    () => ({ ...DEFAULT_ADDRESS, ...(initialValues || {}) }),
    [initialValues]
  );

  const [values, setValues] = useState(mergedInitial);

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  /**
   * Generic onChange handler compatible with inputs/selects/textarea.
   * Expects `name` to be one of: address1, address2, country, state, city, pincode.
   */
  const onChange = useCallback((e) => {
    const { name, value, type, checked } = e?.target || {};
    const nextValue = type === 'checkbox' ? checked : value;
    if (!name) return;
    setField(name, nextValue);
  }, [setField]);

  const reset = useCallback(() => {
    setValues(mergedInitial);
  }, [mergedInitial]);

  const setAddress = useCallback((next) => {
    setValues((prev) => ({ ...prev, ...(next || {}) }));
  }, []);

  return {
    values,
    setValues,
    setField,
    reset,
    onChange,
    setAddress
  };
};

