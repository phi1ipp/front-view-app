import React, { useState, useEffect } from 'react';
import { Modal, ModalActions, FormField, Button } from '../shared';
import { ExclusionModalProps, Exclusion } from '../../types/types';

export const ExclusionModal: React.FC<ExclusionModalProps> = ({
  isOpen,
  onClose: close,
  exclusion,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Exclusion>({
    id: '',
    name: '',
    rule: '',
  });

  const onClose = () => {
    setFormData({ id: '', name: '', rule: '' });
    close();
  };

  useEffect(() => {
    if (exclusion) {
      setFormData(exclusion);
    } else {
      setFormData({ id: '', name: '', rule: '' });
    }
  }, [exclusion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exclusion ? 'Edit Exclusion Rule' : 'Create Exclusion Rule'}
    >
      <form onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Exclusion Name"
          type="text"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
          required
        />
        <FormField
          id="rule"
          label="Exclusion Rule"
          value={formData.rule}
          onChange={(v) => setFormData({ ...formData, rule: v })}
          multiline
          required
        />
        <ModalActions>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {exclusion ? 'Save' : 'Create'}
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
