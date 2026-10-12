import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { API_ENDPOINTS } from '../../types/api';
import { VersionInfo } from '../../types/types';
import styles from './About.module.css';

export const About: React.FC = () => {
  const [version, setVersion] = useState<string>('Loading...');
  const [changelogHtml, setChangelogHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.VERSION);
        if (!response.ok) {
          throw new Error('Failed to fetch version');
        }
        const data: VersionInfo = await response.json();
        setVersion(data.version || 'Unknown');
      } catch (err) {
        console.error('Error fetching version:', err);
        setVersion('Unknown');
        setError('Failed to load version information');
      }
    };

    const fetchChangelog = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CHANGELOG);
        if (!response.ok) {
          throw new Error('Failed to fetch changelog');
        }
        const markdown = await response.text();
        const html = marked.parse(markdown) as string;
        setChangelogHtml(html);
      } catch (err) {
        console.error('Error fetching changelog:', err);
        setChangelogHtml('<p>Changelog unavailable</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
    fetchChangelog();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About GRC application</h1>
        <div className={styles.versionBadge}>
          <span>Version </span>
          <span className={styles.versionText}>{version}</span>
        </div>
      </header>
      {error && <div className={styles.error}>{error}</div>}
      <section className={styles.changelogSection}>
        <div
          className={styles.changelogContent}
          dangerouslySetInnerHTML={{ __html: changelogHtml }}
        />
      </section>
    </div>
  );
};