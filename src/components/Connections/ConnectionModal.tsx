import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalActions, FormField, Button, Banner } from '../shared';
import { ConnectionModalProps, Connection } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  isOpen,
  onClose: close,
  connection,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Connection>({
    id: 0,
    name: '',
    host: '',
    port: '',
    db: '',
    user: '',
    password: '',
    type: 'service',
  });

  const [testMessage, setTestMessage] = useState('');
  const [, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (connection) {
      setFormData(connection);
    } else {
      setFormData({
        id: 0,
        name: '',
        host: '',
        port: '',
        db: '',
        user: '',
        password: '',
        type: 'service',
      });
    }
  }, [connection]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onClose = () => {
    setFormData({
      id: 0,
      name: '',
      host: '',
      port: '',
      db: '',
      user: '',
      password: '',
      type: 'service',
    });
    close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTestConnection = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.TEST_CONNECTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: formData.host,
          port: formData.port,
          user: formData.user,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setTestMessage('Connection successful!');
      } else {
        setTestMessage('Connection failed!');
      }
    } catch (error) {
      setTestMessage('Connection failed!');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={connection ? 'Edit Connection' : 'Create Connection'}
    >
      <form onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Connection Name"
          type="text"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
          required
        />
        <FormField
          id="host"
          label="Host"
          type="text"
          value={formData.host}
          onChange={(v) => setFormData({ ...formData, host: v })}
          required
        />
        <FormField
          id="port"
          label="Port"
          type="text"
          value={formData.port}
          onChange={(v) => setFormData({ ...formData, port: v })}
          required
        />
        <FormField
          id="db"
          label="db"
          type="text"
          value={formData.db}
          onChange={(v) => setFormData({ ...formData, db: v })}
          required
        />
        <FormField
          id="type"
          label="Type"
          value={formData.type}
          onChange={(v) => setFormData({ ...formData, type: v as Connection['type'] })}
          options={[
            { value: 'sid', label: 'SID' },
            { value: 'service', label: 'Service' },
          ]}
          required
        />
        <FormField
          id="user"
          label="User"
          type="text"
          value={formData.user}
          onChange={(v) => setFormData({ ...formData, user: v })}
          required
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(v) => setFormData({ ...formData, password: v })}
          required
        />

        <ModalActions>
          <Button variant="primary" type="submit" onClick={handleTestConnection}>
            Test Connection
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {connection ? 'Save' : 'Create'}
          </Button>
        </ModalActions>
        {testMessage && (
          <Banner type={testMessage === 'Connection successful!' ? 'success' : 'error'}>
            {testMessage}
          </Banner>
        )}
      </form>
    </Modal>
  );
};
