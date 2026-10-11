import React, { useState, useEffect } from 'react';
import {
  ScreenLayout,
  FormField,
  CheckboxContainer,
  CheckboxField,
  ModalActions,
  Button,
} from '../shared';
import { PasswordPolicy } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

export const Settings: React.FC = () => {
  const [config, setConfig] = useState<PasswordPolicy>({
    minLength: 8,
    requireUppercase: false,
    requireLowercase: false,
    requireDigit: false,
    requireSpecial: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONFIG.PASSWORD_POLICY, {
          credentials: 'include',
        });
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchConfig();
  }, []);

  const handleMinLengthChange = (value: string) => {
    setConfig((prev) => ({ ...prev, minLength: Number(value) }));
  };

  const handleCheckboxChange =
    (key: keyof PasswordPolicy) => (checked: boolean) => {
      setConfig((prev) => ({ ...prev, [key]: checked }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.CONFIG.PASSWORD_POLICY, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to save settings');
      setSuccessMessage('Settings saved successfully!');
    } catch (error) {
      setErrorMessage('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      title="Settings"
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <form onSubmit={handleSubmit}>
        <FormField
          id="minLength"
          label="Min Length"
          type="number"
          value={config.minLength}
          onChange={handleMinLengthChange}
          min={1}
          required
        />
        <CheckboxContainer>
          <CheckboxField
            id="requireSpecial"
            label="Require Special Character"
            checked={config.requireSpecial}
            onChange={handleCheckboxChange('requireSpecial')}
          />
          <CheckboxField
            id="requireUppercase"
            label="Require Upper Case"
            checked={config.requireUppercase}
            onChange={handleCheckboxChange('requireUppercase')}
          />
          <CheckboxField
            id="requireLowercase"
            label="Require Lower Case"
            checked={config.requireLowercase}
            onChange={handleCheckboxChange('requireLowercase')}
          />
          <CheckboxField
            id="requireDigit"
            label="Require Number"
            checked={config.requireDigit}
            onChange={handleCheckboxChange('requireDigit')}
          />
        </CheckboxContainer>
        <ModalActions>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </ModalActions>
      </form>
    </ScreenLayout>
  );
};
