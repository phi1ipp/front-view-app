import React from 'react';
import styles from './Login.module.css';
import { InputFieldProps } from './types';

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  icon,
  type = "text",
  onChange
}) => {
  const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContent}>
          <label htmlFor={inputId} className={styles.visuallyHidden}>
            {label}
          </label>
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.inputField}
            placeholder={label}
            aria-label={label}
          />
          <div className={styles.iconWrapper}>
            <div className={styles.iconContainer}>
              <div className={styles.iconStateLayer}>
                <img
                  loading="lazy"
                  src={icon}
                  alt=""
                  className={styles.iconImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inputIndicator} />
    </div>
  );
};