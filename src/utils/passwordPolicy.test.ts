import { validatePassword } from './passwordPolicy';
import { PasswordPolicy } from '../types/types';

const fullPolicy: PasswordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireDigit: true,
  requireSpecial: true,
};

describe('validatePassword', () => {
  it('returns no errors for a strong password', () => {
    const errors = validatePassword('Abcdef1!', fullPolicy);
    expect(errors).toEqual([]);
  });

  it('fails open (no errors) when policy is null', () => {
    const errors = validatePassword('', null);
    expect(errors).toEqual([]);
  });

  it('fails open (no errors) when policy is undefined', () => {
    const errors = validatePassword('', undefined);
    expect(errors).toEqual([]);
  });

  it('reports required when password is empty', () => {
    const errors = validatePassword('', fullPolicy);
    expect(errors).toEqual(['Password is required']);
  });

  it('reports minLength on short passwords', () => {
    const errors = validatePassword('Ab1!', fullPolicy);
    expect(errors).toContain('Password must be at least 8 characters');
  });

  it('reports missing uppercase', () => {
    const errors = validatePassword('abcdef1!', fullPolicy);
    expect(errors).toContain('Password must contain at least one uppercase letter');
  });

  it('reports missing lowercase', () => {
    const errors = validatePassword('ABCDEF1!', fullPolicy);
    expect(errors).toContain('Password must contain at least one lowercase letter');
  });

  it('reports missing digit', () => {
    const errors = validatePassword('Abcdefg!', fullPolicy);
    expect(errors).toContain('Password must contain at least one digit');
  });

  it('reports missing special character', () => {
    const errors = validatePassword('Abcdefg1', fullPolicy);
    expect(errors).toContain('Password must contain at least one special character');
  });

  it('reports all unmet criteria at once', () => {
    const errors = validatePassword('a', fullPolicy);
    expect(errors).toHaveLength(4);
    expect(errors).toContain('Password must be at least 8 characters');
    expect(errors).toContain('Password must contain at least one uppercase letter');
    expect(errors).toContain('Password must contain at least one digit');
    expect(errors).toContain('Password must contain at least one special character');
    expect(errors).not.toContain('Password must contain at least one lowercase letter');
  });

  it('respects a partial policy (special not required)', () => {
    const policy: PasswordPolicy = {
      minLength: 4,
      requireUppercase: true,
      requireLowercase: true,
      requireDigit: true,
      requireSpecial: false,
    };
    const errors = validatePassword('Abcd1', policy);
    expect(errors).toEqual([]);
  });
});
