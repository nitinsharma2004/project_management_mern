import React, { useEffect } from "react";
import styled from "styled-components";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useSelector } from "react-redux";
import { CiMenuFries } from "react-icons/ci";

// Styled Components
const RightContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
   background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const MessagesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const NoChatContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const DrawerButton = styled.label`
  position: absolute;
  left: 1.25rem; /* Tailwind's left-5 */
  top: 1.25rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 1.25rem; /* Tailwind's text-xl */
`;

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <RightContainer>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <MessagesWrapper>
            <Messages />
          </MessagesWrapper>
          <Typesend />
        </>
      )}
    </RightContainer>
  );
}

export default Right;

// Subcomponent for when no chat is selected
const NoChatSelected = () => {
  const authUser = useSelector((state) => state.user.currentUser);

  return (
    <NoChatContainer>
      <DrawerButton htmlFor="my-drawer-2">
        <CiMenuFries />
      </DrawerButton>
      <h1>
        Welcome <UserName>{authUser.name}</UserName>
        <br />
        No chat selected, please start a conversation by selecting a contact.
      </h1>
    </NoChatContainer>
  );
};
