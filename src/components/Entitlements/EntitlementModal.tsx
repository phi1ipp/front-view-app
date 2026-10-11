import React, { useState, useEffect } from 'react';
import { Modal, ModalActions, FormField, Button, TagPicker, TagOption } from '../shared';
import { EntitlementModalProps, Entitlement } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';
import { v4 as uuidv4 } from 'uuid';

export const EntitlementModal: React.FC<EntitlementModalProps> = ({
  isOpen,
  onClose: close,
  entitlement,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Entitlement>({
    id: '',
    name: '',
    accessSet: [],
  });

  const [functions, setFunctions] = useState<TagOption[]>([]);

  const onClose = () => {
    setFormData({ id: '', name: '', accessSet: [] });
    close();
  };

  useEffect(() => {
    fetchFunctions();
    if (entitlement) {
      setFormData({
        id: entitlement.id,
        name: entitlement.name,
        accessSet: entitlement.accessSet.map((access: TagOption) => ({
          id: access.id,
          name: access.name,
        })),
      });
    } else {
      setFormData({
        id: uuidv4(),
        name: '',
        accessSet: [],
      });
    }
  }, [entitlement]);

  const fetchFunctions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ACCESSLIST);
      const data = await response.json();
      setFunctions(data);
    } catch (error) {
      console.error('Error fetching functions:', error);
    }
  };

  const handleAddFunction = (functionId: string) => {
    const functionToAdd = functions.find((func) => func.id === functionId);
    if (functionToAdd && !formData.accessSet.some((access) => access.id === functionId)) {
      setFormData({
        ...formData,
        accessSet: [...formData.accessSet, functionToAdd],
      });
    }
  };

  const handleRemoveFunction = (functionId: string) => {
    setFormData({
      ...formData,
      accessSet: formData.accessSet.filter((access) => access.id !== functionId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={entitlement ? 'Edit Entitlement' : 'Create Entitlement'}
    >
      <form onSubmit={handleSubmit}>
        <FormField
          id="name"
          label="Entitlement Name"
          type="text"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
          required
        />
        <TagPicker
          options={functions}
          selected={formData.accessSet}
          onAdd={handleAddFunction}
          onRemove={handleRemoveFunction}
        />
        <ModalActions>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {entitlement ? 'Save' : 'Create'}
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
