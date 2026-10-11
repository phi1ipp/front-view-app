import React, { useState, useEffect } from 'react';
import { UserTable } from './UserTable';
import { UserModal } from './UserModal';
import { ScreenLayout, DeleteModal } from '../shared';
import { User } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS);
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

  const handleDeleteClick = (userName: string) => {
    setSelectedUserId(userName);
    setIsDeleteModalOpen(true);
  };

  const handleUserSubmit = async (user: User) => {
    try {
      const method = selectedUser ? 'PUT' : 'POST';
      const url = selectedUser ? `${API_ENDPOINTS.USERS}/${selectedUser.username}` : API_ENDPOINTS.USERS;

      const payload: Partial<User> = { ...user };
      if (selectedUser && !payload.password) {
        delete payload.password;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        return;
      }

      setSuccessMessage(selectedUser ? 'Updated User Successfully!' : 'Created User Successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      setIsUserModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving User:', error);
      setErrorMessage('Failed to save User.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
      setSuccessMessage('Deleted User Successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      fetchUsers();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting User:', error);
      setErrorMessage('Failed to delete User.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <ScreenLayout
      title="Users"
      onCreate={handleCreateUser}
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteClick} />
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onSubmit={handleUserSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteConfirm(selectedUserId)}
      />
    </ScreenLayout>
  );
};
