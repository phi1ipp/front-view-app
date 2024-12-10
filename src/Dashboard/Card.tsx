import React from 'react';
import styles from './Dashboard.module.css';
import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({ 
  image, 
  title, 
  date,
  onClick 
}) => (
  <article 
    className={styles.card}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <img loading="lazy" src={image} className={styles.cardImage} alt="" />
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <time className={styles.cardDate}>{date}</time>
    </div>
  </article>
);