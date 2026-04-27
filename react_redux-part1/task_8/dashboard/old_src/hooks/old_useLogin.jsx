import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook to manage login form state, validation and submission.
 *
 * @param {Function} onLogin - callback called with (email, password) on submit
 * @param {Object} [options]
 * @param {string} [options.email=''] - externally provided email (kept in sync)
 * @param {string} [options.password=''] - externally provided password (kept in sync)
 */
export default function useLogin(onLogin = () => {}, options = {}) {
  const initialEmail = options.email ?? '';
  const initialPassword = options.password ?? '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [enableSubmit, setEnableSubmit] = useState(false);

  // --- validation (unchanged from component version) ---
  const isValidEmail = useCallback((value) => {
    if (value !== value.trim()) return false;
    if (/\s/.test(value)) return false;

    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!pattern.test(value)) return false;

    const parts = value.split('@');
    if (parts.length !== 2) return false;
    const domain = parts[1];

    if (domain.includes('..')) return false;
    if (
      domain.startsWith('.') ||
      domain.endsWith('.') ||
      domain.startsWith('-') ||
      domain.endsWith('-')
    ) {
      return false;
    }

    const labels = domain.split('.');
    if (labels.some((label) => label.length === 0 || label.startsWith('-') || label.endsWith('-'))) {
      return false;
    }

    return true;
  }, []);

  const computeEnableSubmit = useCallback((e, p) => {
    const trimmedPwd = p.trim();
    const hasOuterSpaces = e !== e.trim();
    return !hasOuterSpaces && e.length > 0 && isValidEmail(e) && trimmedPwd.length >= 8;
  }, [isValidEmail]);

  // keep local state in sync with external props (App passes them)
  useEffect(() => {
    setEmail((prev) => {
      const next = initialEmail || '';
      // only recompute if it actually changes
      if (prev !== next) setEnableSubmit(computeEnableSubmit(next, password));
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEmail]);

  useEffect(() => {
    setPassword((prev) => {
      const next = initialPassword || '';
      if (prev !== next) setEnableSubmit(computeEnableSubmit(email, next));
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPassword]);

  // input handlers
  const handleChangeEmail = useCallback(
    (e) => {
      const value = e.target.value;
      setEmail((_) => value);
      setEnableSubmit(computeEnableSubmit(value, password));
    },
    [password, computeEnableSubmit]
  );

  const handleChangePassword = useCallback(
    (e) => {
      const value = e.target.value;
      setPassword((_) => value);
      setEnableSubmit(computeEnableSubmit(email, value));
    },
    [email, computeEnableSubmit]
  );

  // submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (enableSubmit) {
        onLogin(email, password);
      }
    },
    [enableSubmit, onLogin, email, password]
  );

  // optionally expose validators (not required by tests, but handy)
  const state = useMemo(
    () => ({ email, password, enableSubmit }),
    [email, password, enableSubmit]
  );

  return {
    ...state,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
  };
}
