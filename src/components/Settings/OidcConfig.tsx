import React, { useState, useEffect } from 'react';
import {
  ScreenLayout,
  FormField,
  CheckboxContainer,
  CheckboxField,
  ModalActions,
  Button,
} from '../shared';
import { OidcConfig as OidcConfigType, OidcGroupRoleMapping } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

const defaultConfig: OidcConfigType = {
  issuer: '',
  clientId: '',
  clientSecret: '',
  scopes: 'openid,profile,email',
  roleClaimName: 'groups',
  enabled: false,
  groupRoleMappings: [],
};

export const OidcConfig: React.FC = () => {
  const [config, setConfig] = useState<OidcConfigType>(defaultConfig);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONFIG.OIDC, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setConfig({ ...defaultConfig, ...data });
      } catch (error) {
        console.error('Error fetching oidc config:', error);
        setConfig(defaultConfig);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (key: keyof OidcConfigType) => (value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (key: keyof OidcConfigType) => (checked: boolean) => {
    setConfig((prev) => ({ ...prev, [key]: checked }));
  };

  const updateMapping = (index: number, field: keyof OidcGroupRoleMapping, value: string) => {
    setConfig((prev) => {
      const mappings = [...prev.groupRoleMappings];
      mappings[index] = { ...mappings[index], [field]: value };
      return { ...prev, groupRoleMappings: mappings };
    });
  };

  const addMapping = () => {
    setConfig((prev) => ({
      ...prev,
      groupRoleMappings: [...prev.groupRoleMappings, { groupValue: '', role: 'ROLE_USER' }],
    }));
  };

  const removeMapping = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      groupRoleMappings: prev.groupRoleMappings.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await fetch(API_ENDPOINTS.CONFIG.OIDC, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to save');
      setSuccessMessage('OIDC settings saved successfully!');
    } catch (error) {
      setErrorMessage('Failed to save OIDC settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout
      title="OIDC Config"
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <form onSubmit={handleSubmit}>
        <CheckboxContainer>
          <CheckboxField
            id="enabled"
            label="Enabled"
            checked={config.enabled}
            onChange={handleCheckbox('enabled')}
          />
        </CheckboxContainer>
        <FormField
          id="issuer"
          label="Issuer"
          type="text"
          value={config.issuer}
          onChange={handleChange('issuer')}
          required
        />
        <FormField
          id="clientId"
          label="Client ID"
          type="text"
          value={config.clientId}
          onChange={handleChange('clientId')}
          required
        />
        <FormField
          id="clientSecret"
          label="Client Secret"
          type="password"
          value={config.clientSecret}
          onChange={handleChange('clientSecret')}
        />
        <FormField
          id="scopes"
          label="Scopes"
          type="text"
          value={config.scopes}
          onChange={handleChange('scopes')}
        />
        <FormField
          id="roleClaimName"
          label="Role Claim Name"
          type="text"
          value={config.roleClaimName}
          onChange={handleChange('roleClaimName')}
        />

        <div>
          <h3>Group to Role Mappings</h3>
          {config.groupRoleMappings.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <FormField
                id={`groupValue-${i}`}
                label="Group Value"
                type="text"
                value={m.groupValue}
                onChange={(v) => updateMapping(i, 'groupValue', v)}
              />
              <FormField
                id={`role-${i}`}
                label="Role"
                type="text"
                value={m.role}
                onChange={(v) => updateMapping(i, 'role', v)}
              />
              <Button variant="primary" type="button" onClick={() => removeMapping(i)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="primary" type="button" onClick={addMapping}>
            Add Mapping
          </Button>
        </div>

        <ModalActions>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </ModalActions>
      </form>
    </ScreenLayout>
  );
};

export default OidcConfig;