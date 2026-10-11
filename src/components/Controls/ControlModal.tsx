import React, { useState, useEffect } from 'react';
import { Modal, ModalActions, FormField, Button } from '../shared';
import {
  ControlModalProps,
  Controls,
  GrcSaControl,
  GrcSodControl,
  isSodControl,
} from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

interface EntitlementOption {
  id: number;
  name: string;
}

const emptySa = (): GrcSaControl => ({
  id: 0,
  name: '',
  description: '',
  type: 'SA',
  entId: 0,
  entName: '',
});

export const ControlModal: React.FC<ControlModalProps> = ({
  isOpen,
  onClose: close,
  control,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Controls>(emptySa());
  const [entitlementOptions1, setEntitlementOptions1] = useState<EntitlementOption[]>([]);
  const [entitlementOptions2, setEntitlementOptions2] = useState<EntitlementOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onClose = () => {
    setFormData(emptySa());
    setEntitlementOptions1([]);
    setEntitlementOptions2([]);
    setError(null);
    close();
  };

  useEffect(() => {
    const fetchEntitlements = async () => {
      try {
        const response1 = await fetch(API_ENDPOINTS.ENTITLEMENTS);
        const data1 = await response1.json();
        setEntitlementOptions1(data1);

        const response2 = await fetch(API_ENDPOINTS.ENTITLEMENTS);
        const data2 = await response2.json();
        setEntitlementOptions2(data2);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch entitlements');
        setLoading(false);
      }
    };

    fetchEntitlements();

    if (control) {
      setFormData(control);
    } else {
      setFormData(emptySa());
    }
  }, [control]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const ent1Value = isSodControl(formData) ? formData.ent1Name : formData.entName;
  const ent2Value = isSodControl(formData) ? formData.ent2Name : '';

  const handleEnt1Change = (value: string) => {
    const selectedOption = entitlementOptions1.find((option) => option.name === value);
    const selectedId = selectedOption ? selectedOption.id : 0;

    if (isSodControl(formData)) {
      setFormData({
        ...formData,
        ent1Name: value,
        ent1id: selectedId,
      } as unknown as GrcSodControl);
    } else {
      setFormData({
        ...formData,
        entName: value,
        entId: selectedId,
      } as GrcSaControl);
    }
  };

  const handleEnt2Change = (value: string) => {
    const selectedOption = entitlementOptions2.find((option) => option.name === value);
    const selectedId = selectedOption ? selectedOption.id : 0;

    if (isSodControl(formData)) {
      setFormData({
        ...formData,
        ent2id: selectedId,
        ent2Name: value,
      } as unknown as GrcSodControl);
    } else {
      setFormData({
        id: formData.id,
        name: formData.name,
        ent1Name: formData.entName,
        ent1id: formData.entId,
        ent2Name: value,
        ent2id: selectedId,
        type: 'SOD',
      } as unknown as GrcSodControl);
    }
  };

  const handleNameChange = (value: string) => {
    if (isSodControl(formData)) {
      setFormData({ ...formData, name: value } as GrcSodControl);
    } else {
      setFormData({ ...formData, name: value } as GrcSaControl);
    }
  };

  if (!isOpen) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={control ? 'Edit Control' : 'Create Control'}>
      <form onSubmit={handleSubmit}>
        <FormField
          id="Name"
          label="Control Name"
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          required
        />
        <FormField
          id="ent1Name"
          label="Entitlement 1"
          value={ent1Value}
          onChange={handleEnt1Change}
          required
          options={[
            { value: '', label: 'Select Entitlement 1' },
            ...entitlementOptions1.map((o) => ({ value: o.name, label: o.name })),
          ]}
        />
        <FormField
          id="ent2Name"
          label="Entitlement 2"
          value={ent2Value}
          onChange={handleEnt2Change}
          options={[
            { value: '', label: 'Select Entitlement 2' },
            ...entitlementOptions2.map((o) => ({ value: o.name, label: o.name })),
          ]}
        />
        <ModalActions>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {control ? 'Save' : 'Create'}
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
