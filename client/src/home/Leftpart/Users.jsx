import React from "react";
import styled from "styled-components";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

// Styled Components
const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessagesHeader = styled.h1`
  padding: 0.5rem 2rem; /* Tailwind's px-8 py-2 */
  color: white;
  font-weight: 600; /* Tailwind's font-semibold */
  background-color: #1e293b; /* Tailwind's bg-slate-800 */
  border-radius: 0.375rem; /* Tailwind's rounded-md */
`;

const UserList = styled.div`
  padding-top: 0.5rem;
  flex: 1;
  overflow-y: auto;
  max-height: calc(84vh - 10vh);
`;

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <UsersContainer>
      <MessagesHeader>Messages</MessagesHeader>
      <UserList>
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </UserList>
    </UsersContainer>
  );
}

export default Users;
