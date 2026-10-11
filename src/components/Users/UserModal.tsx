import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalActions,
  FormField,
  CheckboxContainer,
  CheckboxField,
  Button,
} from '../shared';
import { UserModalProps, User } from '../../types/types';
import { usePasswordPolicy } from '../../hooks/usePasswordPolicy';
import { validatePassword } from '../../utils/passwordPolicy';

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose: close, user, onSubmit }) => {
  const [formData, setFormData] = useState<User>({
    username: '',
    fullName: '',
    email: '',
    password: '',
    enabled: true,
    isAdmin: false,
  });

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const { policy } = usePasswordPolicy();

  const onClose = () => {
    setFormData({ username: '', fullName: '', email: '', password: '', enabled: true, isAdmin: false });
    setPasswordErrors([]);
    close();
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' });
    } else {
      setFormData({ username: '', fullName: '', email: '', password: '', enabled: true, isAdmin: false });
    }
  }, [user]);

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    if (policy) {
      setPasswordErrors(value ? validatePassword(value, policy) : []);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user && !formData.password) {
      setPasswordErrors([]);
      onSubmit(formData);
      return;
    }

    const errors = validatePassword(formData.password, policy);
    setPasswordErrors(errors);

    if (errors.length > 0) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Edit User' : 'Create User'}>
      <form onSubmit={handleSubmit}>
        <FormField
          id="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(v) => setFormData({ ...formData, fullName: v })}
          required
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(v) => setFormData({ ...formData, email: v })}
          required
        />
        <FormField
          id="username"
          label="User Name"
          type="text"
          value={formData.username}
          onChange={(v) => setFormData({ ...formData, username: v })}
          required
          disabled={!!user}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
          required={!user}
          error={passwordErrors}
        />
        <CheckboxContainer>
          <CheckboxField
            id="admin"
            label="Admin?"
            checked={!!formData.isAdmin}
            onChange={(c) => setFormData({ ...formData, isAdmin: c })}
          />
          <CheckboxField
            id="enabled"
            label="Enabled?"
            checked={!!formData.enabled}
            onChange={(c) => setFormData({ ...formData, enabled: c })}
          />
        </CheckboxContainer>
        <ModalActions>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {user ? 'Save' : 'Create'}
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
