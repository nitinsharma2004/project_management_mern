import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import { AuthProvider } from "../context/AuthProvider";
import { SocketProvider } from "../context/SocketContext";
import Left from "../home/Leftpart/Left";
import Right from "../home/Rightpart/Right";
import { darkTheme, lightTheme } from "../utils/Theme";

const Container = styled.div`
  display: flex;
  height: 85%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;


const Chats = ({ darkMode }) => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AuthProvider>
        <SocketProvider>
          <Container>
            <Left
              onSelectChat={setActiveChat}
              activeChat={activeChat}
            />
            <Right
              activeChat={activeChat}
              goBack={() => setActiveChat(null)}
                onSelectChat={setActiveChat}
              
            />
          </Container>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Chats;
