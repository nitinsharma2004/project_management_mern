import React from "react";
import styled from "styled-components";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

// ✅ Outer container (fixed height, column layout)
const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.sidebarBg || "#0f172a"};
`;

// ✅ Header
const MessagesHeader = styled.h1`
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  background-color: #1e293b;
  border-radius: 0.375rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
  }
`;

// ✅ Scrollable list
const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #1e293b;
  }
`;

// ✅ Optional: Loading text
const LoadingText = styled.p`
  color: #ccc;
  text-align: center;
  margin-top: 2rem;
`;

function Users({ onSelectChat }) {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <UsersContainer>
      <MessagesHeader>Messages</MessagesHeader>
      <UserList>
        {loading ? (
          <LoadingText>Loading users...</LoadingText>
        ) : (
          allUsers.map((user, index) => (
            <User key={user._id || index} user={user} onSelectChat={onSelectChat} />
          ))
        )}
      </UserList>
    </UsersContainer>
  );
}

export default Users;
