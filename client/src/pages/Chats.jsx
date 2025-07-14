import styled, { ThemeProvider } from "styled-components";
import { AuthProvider } from "../context/AuthProvider";
import { SocketProvider } from "../context/SocketContext";
import Left from "../home/Leftpart/Left";
import Right from "../home/Rightpart/Right";
import { useState } from "react";
import { darkTheme, lightTheme } from "../utils/Theme";


const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Chats = ( {darkMode}) => {

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AuthProvider>
        <SocketProvider>
          <Container>
            <Left />
            <Right />
          </Container>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Chats;
