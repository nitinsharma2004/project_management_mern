import React from "react";
import styled from "styled-components";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

// Styled Components
const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MessagesHeader = styled.h1`
  padding: 0.5rem 2rem;
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

const UserList = styled.div`
  padding-top: 0.5rem;
  flex: 1;
  overflow-y: auto;
  max-height: calc(84vh - 10vh);

  /* Optional: Better scrollbar UI */
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

  @media (max-width: 768px) {
    max-height: calc(100vh - 180px);
  }

  @media (max-width: 480px) {
    max-height: calc(100vh - 160px);
  }
`;
function Users({ onSelectChat }) {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <UsersContainer>
      <MessagesHeader>Messages</MessagesHeader>
      <UserList>
        {allUsers.map((user, index) => (
          <User key={index} user={user} onSelectChat={onSelectChat} />
        ))}
      </UserList>
    </UsersContainer>
  );
}


export default Users;
