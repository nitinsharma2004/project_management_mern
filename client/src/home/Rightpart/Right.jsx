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
  background-color: #1e293b; /* Tailwind's bg-slate-900 */
  color: #d1d5db; /* Tailwind's text-gray-300 */
`;

const MessagesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(88vh - 8vh);
`;

const NoChatContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const DrawerButton = styled.label`
  position: absolute;
  left: 1.25rem; /* Tailwind's left-5 */
  color: white;
  font-size: 1.25rem;
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
