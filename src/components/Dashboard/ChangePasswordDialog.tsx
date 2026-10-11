import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalActions,
  FormField,
  Button,
  Banner,
} from '../shared';
import { usePasswordPolicy } from '../../hooks/usePasswordPolicy';
import { validatePassword } from '../../utils/passwordPolicy';

export interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passwordData: { currentPassword: string; newPassword: string }) => void;
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    passwordErrors: [] as string[],
    errorMessage: '',
    currentPasswordRequired: false,
    passwordsRequired: false,
    passwordsDontMatch: false,
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const { policy } = usePasswordPolicy();

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        passwordErrors: [],
        errorMessage: '',
        currentPasswordRequired: false,
        passwordsRequired: false,
        passwordsDontMatch: false,
      }));
    }
  }, [isOpen]);

  const validateCurrentPassword = (value: string) => {
    if (!value.trim()) {
      return 'Current password is required';
    }
    return '';
  };

  const validatePasswords = (newPwd: string, confirmPwd: string) => {
    const errors = {
      passwordsRequired: false,
      passwordsDontMatch: false,
      passwordErrors: [] as string[],
    };

    if (!newPwd.trim() || !confirmPwd.trim()) {
      errors.passwordsRequired = true;
    } else if (newPwd !== confirmPwd) {
      errors.passwordsDontMatch = true;
    }

    if (newPwd && policy) {
      errors.passwordErrors = validatePassword(newPwd, policy);
    }

    return errors;
  };

  const handleNewPasswordChange = (value: string) => {
    const { passwordErrors, passwordsDontMatch, passwordsRequired } = validatePasswords(
      value,
      formData.confirmPassword
    );
    setFormData((prev) => ({
      ...prev,
      newPassword: value,
      passwordErrors,
      passwordsDontMatch,
      passwordsRequired,
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    const { passwordErrors, passwordsDontMatch, passwordsRequired } = validatePasswords(
      formData.newPassword,
      value
    );
    setFormData((prev) => ({
      ...prev,
      confirmPassword: value,
      passwordErrors,
      passwordsDontMatch,
      passwordsRequired,
    }));
  };

  const handleCurrentPasswordChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      currentPassword: value,
      currentPasswordRequired: !value.trim(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentPasswordError = validateCurrentPassword(formData.currentPassword);
    const { passwordsRequired, passwordsDontMatch, passwordErrors } = validatePasswords(
      formData.newPassword,
      formData.confirmPassword
    );

    setFormData((prev) => ({
      ...prev,
      currentPasswordRequired: !!currentPasswordError,
      passwordsRequired,
      passwordsDontMatch,
      passwordErrors,
    }));

    if (
      currentPasswordError ||
      passwordsRequired ||
      passwordsDontMatch ||
      passwordErrors.length > 0
    ) {
      return;
    }

    try {
      await onSubmit({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        passwordErrors: [],
        errorMessage: '',
        currentPasswordRequired: false,
        passwordsRequired: false,
        passwordsDontMatch: false,
      }));
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setFormData((prev) => ({ ...prev, errorMessage: message }));
    }
  };

  const toggleVisibility = (field: 'current' | 'new' | 'confirm') => {
    setFormData((prev) => {
      const key = `show${field.charAt(0).toUpperCase()}${field.slice(1)}Password` as
        | 'showCurrentPassword'
        | 'showNewPassword'
        | 'showConfirmPassword';
      return { ...prev, [key]: !prev[key] };
    });
  };

  const eyeToggle = (field: 'current' | 'new' | 'confirm') => (
    <Button variant="text" onClick={() => toggleVisibility(field)} ariaLabel="Toggle visibility">
      👁️
    </Button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit}>
        {formData.errorMessage && <Banner type="error">{formData.errorMessage}</Banner>}
        <FormField
          id="currentPassword"
          label="Current Password"
          type={formData.showCurrentPassword ? 'text' : 'password'}
          value={formData.currentPassword}
          onChange={handleCurrentPasswordChange}
          error={
            formData.currentPasswordRequired ? 'Current password is required' : undefined
          }
          required
          trailing={eyeToggle('current')}
        />
        <FormField
          id="newPassword"
          label="New Password"
          type={formData.showNewPassword ? 'text' : 'password'}
          value={formData.newPassword}
          onChange={handleNewPasswordChange}
          error={formData.passwordsRequired ? 'New password is required' : formData.passwordErrors}
          required
          trailing={eyeToggle('new')}
        />
        <FormField
          id="confirmPassword"
          label="Confirm New Password"
          type={formData.showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={
            formData.passwordsRequired
              ? 'Confirm password is required'
              : formData.passwordsDontMatch
              ? 'Passwords do not match'
              : undefined
          }
          required
          trailing={eyeToggle('confirm')}
        />
        <ModalActions>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
