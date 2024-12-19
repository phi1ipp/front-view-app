import React from 'react';
import styles from './LoginPage.module.css';
import { InputFieldProps } from './types';

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  icon,
  type = "text",
  onChange,
  error
}) => {
  const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;

  return (
    <div className={styles.inputContainer}>
      <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
        <div className={styles.inputContent}>
          <label htmlFor={inputId} className={styles.visuallyHidden}>
            {label}
          </label>
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            placeholder={label}
            aria-label={label}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />
          <div className={styles.iconWrapper}>
            <div className={styles.iconContainer}>
              <div className={styles.iconStateLayer}>
                <img
                  loading="lazy"
                  src={icon}
                  alt=""
                  className={styles.icon}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inputIndicator} />
      {error && (
        <div id={`${inputId}-error`} className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};