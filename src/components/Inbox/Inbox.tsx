import React, { useState, useEffect } from 'react';
import styles from './Inbox.module.css';

interface CertificationTask {
  runName: string;
  userName: string;
  firstName: string;
  lastName: string;
  controlName: string;
  ent1: string;
  role1: string;
  access1: string;
  ent2: string;
  role2: string;
  access2: string;
  isExclusion: boolean;
  notes: string;
  decision: string;
}

interface GroupedTasks {
  [runName: string]: {
    [userName: string]: CertificationTask[];
  };
}

export const Inbox: React.FC = () => {
  const [certificationTasks, setCertificationTasks] = useState<CertificationTask[]>([]);
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificationTasks = async () => {
      try {
        setLoading(true);
        
        // Get current user from localStorage
        const currentUser = localStorage.getItem('userName');
        if (!currentUser) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Fetch certification tasks from the API
        const response = await fetch('/api/certification');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const allTasks: CertificationTask[] = await response.json();
        
        setCertificationTasks(allTasks);
        
        // Group tasks by runName, then by userName
        const grouped: GroupedTasks = {};
        allTasks.forEach(task => {
          if (!grouped[task.runName]) {
            grouped[task.runName] = {};
          }
          if (!grouped[task.runName][task.userName]) {
            grouped[task.runName][task.userName] = [];
          }
          grouped[task.runName][task.userName].push(task);
        });
        
        setGroupedTasks(grouped);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch certification tasks:', error);
        setError('Failed to fetch certification tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchCertificationTasks();
  }, []);

  const isSaControl = (task: CertificationTask) => {
    return task.ent2 === '' || task.ent2 === null || task.ent2 === undefined;
  };

  const getDecisionColor = (decision: string) => {
    switch (decision.toUpperCase()) {
      case 'PENDING':
        return styles.decisionPending;
      case 'APPROVED':
        return styles.decisionApproved;
      case 'REJECTED':
        return styles.decisionRejected;
      case 'UNDER_REVIEW':
        return styles.decisionUnderReview;
      default:
        return styles.decisionDefault;
    }
  };

  const formatAccessList = (access: string) => {
    if (!access) return 'No access defined';
    return access.split('|').map(item => item.trim()).join(', ');
  };

  const getRunStats = (userTasks: { [userName: string]: CertificationTask[] }) => {
    let total = 0;
    let pending = 0;
    let approved = 0;
    let exclusions = 0;
    
    Object.values(userTasks).forEach(tasks => {
      total += tasks.length;
      pending += tasks.filter(task => task.decision === 'PENDING').length;
      approved += tasks.filter(task => task.decision === 'APPROVED').length;
      exclusions += tasks.filter(task => task.isExclusion).length;
    });
    
    return { total, pending, approved, exclusions };
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading certification tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  const runNames = Object.keys(groupedTasks).sort();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Inbox</h1>
        <p>Your assigned certification tasks and responsibilities</p>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{certificationTasks.length}</span>
          <span className={styles.statLabel}>Total Tasks</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {certificationTasks.filter(task => task.decision === 'PENDING').length}
          </span>
          <span className={styles.statLabel}>Pending</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {certificationTasks.filter(task => task.decision === 'APPROVED').length}
          </span>
          <span className={styles.statLabel}>Approved</span>
        </div>
      </div>

      <div className={styles.itemsContainer}>
        <h2>Assigned Certification Tasks</h2>
        {runNames.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No certification tasks assigned to you yet.</p>
            <p>Tasks will appear here when you are assigned as a certifier.</p>
          </div>
        ) : (
          <div className={styles.runsList}>
            {runNames.map((runName) => {
              const userTasks = groupedTasks[runName];
              const stats = getRunStats(userTasks);
              const userNames = Object.keys(userTasks).sort();
              
              return (
                <div key={runName} className={styles.runSection}>
                  <div className={styles.runHeader}>
                    <h3 className={styles.runTitle}>{runName}</h3>
                    <div className={styles.runStats}>
                      <span className={styles.runStat}>
                        <strong>{stats.total}</strong> tasks
                      </span>
                      <span className={styles.runStat}>
                        <strong>{stats.pending}</strong> pending
                      </span>
                      <span className={styles.runStat}>
                        <strong>{stats.approved}</strong> approved
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.usersList}>
                    {userNames.map((userName) => {
                      const tasks = userTasks[userName];
                      const userStats = {
                        total: tasks.length,
                        pending: tasks.filter(task => task.decision === 'PENDING').length,
                        approved: tasks.filter(task => task.decision === 'APPROVED').length,
                        exclusions: tasks.filter(task => task.isExclusion).length
                      };
                      
                      return (
                        <div key={userName} className={styles.userSection}>
                          <div className={styles.userHeader}>
                            <h4 className={styles.userTitle}>{userName}</h4>
                            <div className={styles.userStats}>
                              <span className={styles.userStat}>
                                <strong>{userStats.total}</strong> tasks
                              </span>
                              <span className={styles.userStat}>
                                <strong>{userStats.pending}</strong> pending
                              </span>
                              <span className={styles.userStat}>
                                <strong>{userStats.approved}</strong> approved
                              </span>
                              <span className={styles.userStat}>
                                <strong>{userStats.exclusions}</strong> exclusions
                              </span>
                            </div>
                          </div>
                          
                          <div className={styles.tasksList}>
                            {tasks.map((task, index) => (
                              <div key={index} className={styles.itemCard}>
                                <div className={styles.itemHeader}>
                                  <div className={styles.itemTitleSection}>
                                    <h5 className={styles.itemTitle}>{task.controlName}</h5>
                                  </div>
                                  <div className={styles.itemBadges}>
                                    <span className={`${styles.decisionBadge} ${getDecisionColor(task.decision)}`}>
                                      {task.decision}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className={styles.entitlementsSection}>
                                  <div className={styles.entitlement}>
                                    <h6>Entitlement 1: {task.ent1}</h6>
                                    <div className={styles.entitlementDetails}>
                                      <span className={styles.roleLabel}>Role: {task.role1}</span>
                                      <div className={styles.accessList}>
                                        <strong>Access:</strong> {formatAccessList(task.access1)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {!isSaControl(task) && (
                                    <div className={styles.entitlement}>
                                      <h6>Entitlement 2: {task.ent2}</h6>
                                      <div className={styles.entitlementDetails}>
                                        <span className={styles.roleLabel}>Role: {task.role2}</span>
                                        <div className={styles.accessList}>
                                          <strong>Access:</strong> {formatAccessList(task.access2)}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                {task.notes && (
                                  <div className={styles.notesSection}>
                                    <strong>Notes:</strong> {task.notes}
                                  </div>
                                )}
                                
                                <div className={styles.itemMeta}>
                                  <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Username:</span>
                                    <span className={styles.metaValue}>{task.userName}</span>
                                  </div>
                                  <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Decision:</span>
                                    <span className={styles.metaValue}>{task.decision}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
