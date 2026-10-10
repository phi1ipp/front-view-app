import { useState, useEffect, useCallback } from 'react';
import { PasswordPolicy } from '../types/types';
import { API_ENDPOINTS } from '../types/api';

let cachedPolicy: PasswordPolicy | null | undefined = undefined;
let pendingPromise: Promise<PasswordPolicy | null> | null = null;
const subscribers: Array<(policy: PasswordPolicy | null) => void> = [];

const notify = (policy: PasswordPolicy | null) => {
  subscribers.forEach((cb) => cb(policy));
};

const fetchPolicy = async (): Promise<PasswordPolicy | null> => {
  if (cachedPolicy !== undefined) {
    return cachedPolicy;
  }

  if (pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = (async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONFIG.PASSWORD_POLICY);

      if (!response.ok) {
        console.warn(
          `Failed to fetch password policy: ${response.status} ${response.statusText}`
        );
        cachedPolicy = null;
        notify(null);
        return null;
      }

      const data = (await response.json()) as PasswordPolicy;
      cachedPolicy = data;
      notify(cachedPolicy);
      return cachedPolicy;
    } catch (err) {
      console.warn('Failed to fetch password policy:', err);
      cachedPolicy = null;
      notify(null);
      return null;
    } finally {
      pendingPromise = null;
    }
  })();

  return pendingPromise;
};

export const usePasswordPolicy = (): {
  policy: PasswordPolicy | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
} => {
  const [policy, setPolicy] = useState<PasswordPolicy | null>(
    cachedPolicy !== undefined ? cachedPolicy : null
  );
  const [loading, setLoading] = useState<boolean>(cachedPolicy === undefined);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(() => {
    if (cachedPolicy !== undefined) {
      setPolicy(cachedPolicy);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    fetchPolicy().then((result) => {
      setPolicy(result);
      setLoading(false);
      setError(result === null ? new Error('Failed to fetch password policy') : null);
    });
  }, []);

  useEffect(() => {
    if (cachedPolicy === undefined) {
      load();
    }

    const onChange = (updated: PasswordPolicy | null) => {
      setPolicy(updated);
      setLoading(false);
      setError(updated === null ? new Error('Failed to fetch password policy') : null);
    };
    subscribers.push(onChange);

    return () => {
      const idx = subscribers.indexOf(onChange);
      if (idx !== -1) {
        subscribers.splice(idx, 1);
      }
    };
  }, [load]);

  const refresh = useCallback(() => {
    cachedPolicy = undefined;
    pendingPromise = null;
    load();
  }, [load]);

  return { policy, loading, error, refresh };
};
