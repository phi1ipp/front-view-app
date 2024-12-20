import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';
import { UserTable } from './UserTable.tsx';
import { UserModal } from './UserModal.tsx';
import { DeleteModal } from './DeleteModal.tsx';
import { User } from './types';
import Create from './Create.png';

export const UserManagement: React.FC = () => {
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
      const response = await fetch('http://localhost:4000/usersdata');
            if (!response.ok) { // Check if the response was successful
        throw new Error(`HTTP error! status: ${response.status}`);
      }  
      const data = await response.json();
      setUsers(data);
      console.log(JSON.stringify(response));
      console.log('Data:', data); 
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

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const handleUserSubmit = async (user: User) => {
    try {
      const method = selectedUser ? 'PUT' : 'POST';
      const url = selectedUser ? `http://localhost:4000/usersdata/${user.id}` : 'http://localhost:4000/usersdata';
      
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

  const handleDeleteConfirm = async (id: string) => {
    console.log("id"+id)
    try {
      await fetch(`http://localhost:4000/usersdata/${id}`, { method: 'DELETE' });
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
              <h1 className={styles.title}>Users</h1>
            </div>
           <button className={styles.createButton} onClick={handleCreateUser}>
                     <div className={styles.buttonContent}>
                       <img
                         loading="lazy"
                         src={Create}
                         alt="Create Icon"
                         className={styles.buttonIcon}
                       />
                       <span className={styles.buttonText}>Create</span>
                     </div>
                   </button>
          </div>
      <div className={styles.content}>
        <UserTable
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
        id={selectedUserId}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};