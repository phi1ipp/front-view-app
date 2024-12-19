import React, { useState, useEffect } from 'react';
import styles from '../Users/UserManagement.module.css';
import { UserModal } from '../Users/UserModal.tsx';
import { DeleteModal } from '../Users/DeleteModal.tsx';
import { User } from './types.ts';
import { ConnectionsTable } from './ConnectionsTable.tsx';


export const ConnectionsComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/connections');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(undefined);
    setIsUserModalOpen(true);
  };

  

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleUserSubmit = async (user: User) => {
    try {
      const method = selectedUser ? 'PUT' : 'POST';
      const url = selectedUser ? `/api/users/${user.userId}` : '/api/users';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      
      fetchUsers();
      setIsUserModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteConfirm = async (userId: string) => {
    try {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      fetchUsers();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Connections</h1>
            </div>
            <button className={styles.createButton} onClick={handleCreateUser}>
              <div className={styles.buttonContent}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b4608d1988e70018595556c3c26823efc666bca62fa6ad93cfa773d0dd82ca2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                  alt="Create Icon"
                  className={styles.buttonIcon}
                />
                <span className={styles.buttonText}>Create</span>
              </div>
            </button>
          </div>
      <div className={styles.content}>
        <ConnectionsTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteClick}
        />
      </div>
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onSubmit={handleUserSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userId={selectedUserId}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};