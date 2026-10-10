import { PasswordPolicy } from '../types/types';

export const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9]/;

export const validatePassword = (password: string, policy: PasswordPolicy | null | undefined): string[] => {
  const errors: string[] = [];

  if (!policy) {
    return errors;
  }

  if (!password) {
    errors.push('Password is required');
    return errors;
  }

  if (typeof policy.minLength === 'number' && password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters`);
  }

  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (policy.requireDigit && !/\d/.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  if (policy.requireSpecial && !SPECIAL_CHAR_REGEX.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
};
