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
  min-width: 280px;

  @media screen and (max-width: 1024px) {
    width: 40%;
  }

  @media screen and (max-width: 768px) {
    width: 50%;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.h1`
  display: flex;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  font-size: 1.5rem;
  text-align: center;
  background-color: ${({ theme }) => theme.soft};

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    padding: 12px 0;
  }
`;

const UserListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  min-height: calc(100vh - 60px);

  @media screen and (max-width: 600px) {
    max-height: 70vh;
    padding: 8px;
  }

  @media screen and (max-width: 480px) {
    max-height: 65vh;
  }
`;

function Left({ onSelectChat, activeChat }) {
  const isMobile = window.innerWidth <= 768;

  return (
    <Container style={{ display: isMobile && activeChat ? "none" : "flex" }}>
      <Title>Chats</Title>
      <Search />
      <UserListContainer>
        <Users onSelectChat={onSelectChat} />
      </UserListContainer>
    </Container>
  );
}



export default Left;
