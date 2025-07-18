import React, { useEffect } from "react";
import styled from "styled-components";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

// ✅ Container
const RightContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
  }
`;

// ✅ Back Button
const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  z-index: 1001;
  margin-bottom: 10px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

// ✅ No Chat Container
const NoChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const MessagesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
`;

const NoChatSelected = () => {
  const authUser = useSelector((state) => state.user.currentUser);
  return (
    <NoChatContainer>
      <h1>
        Welcome <UserName>{authUser?.name}</UserName>
        <br />
        No chat selected, please select a conversation.
      </h1>
    </NoChatContainer>
  );
};

function Right({ activeChat, goBack,onSelectChat }) {
 const { setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const isMobile = window.innerWidth <= 768;
   if (isMobile && activeChat===true){
    onSelectChat(false); 
   }
  return (

  <>
      {!activeChat ? (
        <NoChatSelected />
        
      ) : (
        <RightContainer >
          <BackButton onClick={goBack}>
            <IoArrowBack /> Back
          </BackButton>
          <Chatuser />
          <MessagesWrapper>
            <Messages />
          </MessagesWrapper>
          <Typesend />
        </RightContainer>
      )
    }
    </>
  );
}

export default Right;
