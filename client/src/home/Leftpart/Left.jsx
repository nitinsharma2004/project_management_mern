import React from "react";
import styled from "styled-components";
import Search from "./Search";
import Users from "./Users";

const Container = styled.div`
  width: 30%;
    background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media screen and (max-width: 1024px) {
    width: 40%;
  }

  @media screen and (max-width: 768px) {
    width: 50%;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.h1`
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  font-size: 20px;

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

const UserListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: calc(84vh - 10vh);

  @media screen and (max-width: 480px) {
    min-height: auto;
    max-height: 400px; /* Adjust based on need */
  }
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
