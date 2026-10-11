import React from 'react';
import styles from './shared.module.css';

export type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'text';

export interface ButtonProps {
  variant?: ButtonVariant;
  icon?: string;
  iconAlt?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel?: string;
  children?: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primaryButton,
  ghost: styles.ghostButton,
  danger: styles.dangerButton,
  text: styles.textButton,
};

const hasLabel = (children: React.ReactNode): boolean =>
  children !== null && children !== undefined && children !== '' && children !== false;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  iconAlt = '',
  disabled,
  type = 'button',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
  children,
}) => (
  <button
    type={type}
    className={variantClass[variant]}
    disabled={disabled}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    aria-label={ariaLabel}
  >
    {icon && (
      <img src={icon} alt={iconAlt} className={styles.buttonIcon} loading="lazy" />
    )}
    {hasLabel(children) && <span className={styles.buttonLabel}>{children}</span>}
  </button>
);
