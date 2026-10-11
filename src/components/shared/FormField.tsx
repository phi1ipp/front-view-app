import React from 'react';
import styles from './shared.module.css';

export interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  disabled?: boolean;
  required?: boolean;
  error?: string | string[];
  options?: Array<{ value: string; label: string }>;
  multiline?: boolean;
  trailing?: React.ReactNode;
}

const isFilled = (value: string | number) =>
  value !== '' && value !== null && value !== undefined;

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  min,
  disabled,
  required,
  error,
  options,
  multiline,
  trailing,
}) => {
  const filled = isFilled(value);
  const errorList = Array.isArray(error) ? error : error ? [error] : [];

  return (
    <div
      className={styles.formField}
      data-filled={filled ? 'true' : 'false'}
      data-trailing={trailing ? 'true' : 'false'}
    >
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={styles.formControl}
        />
      ) : options ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={styles.formControl}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          min={min}
          disabled={disabled}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={styles.formControl}
          placeholder=" "
        />
      )}
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      {trailing && <div className={styles.formTrailing}>{trailing}</div>}
      {errorList.map((err, i) => (
        <div key={i} className={styles.fieldError}>
          {err}
        </div>
      ))}
    </div>
  );
};

export interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <div className={styles.checkboxField}>
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={styles.checkbox}
    />
    <label htmlFor={id} className={styles.checkboxLabel}>
      {label}
    </label>
  </div>
);

export const CheckboxContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.checkboxContainer}>{children}</div>
);
