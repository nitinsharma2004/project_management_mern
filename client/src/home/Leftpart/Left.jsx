import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Users from "./Users";

const Container = styled.div`
  width: 30%;
  background-color: black;
  color: #d1d5db; /* Tailwind's gray-300 */
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  display:flex;
  font-weight:bold;

  justify-content:center;
  align-items:center;
`;

const UserListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: calc(84vh - 10vh);
`;

function Left() {
  return (
    <Container>
      <Title>Chats</Title>
      <Search />
      <UserListContainer>
        <Users />
      </UserListContainer>
    </Container>
  );
}

export default Left;
