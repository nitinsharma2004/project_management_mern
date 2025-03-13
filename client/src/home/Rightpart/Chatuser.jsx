import React from "react";
import styled from "styled-components";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

// Styled Components
const ChatUserContainer = styled.div`
  padding-left: 1.25rem; /* Tailwind's pl-5 */
  padding-top: 1.25rem; /* Tailwind's pt-5 */
  height: 12vh;
  display: flex;
  align-items: center;
  gap: 1rem; /* Tailwind's space-x-4 */
  background-color: #374151; /* Tailwind's bg-gray-700 */
  transition: background-color 0.3s;

  &:hover {
    background-color: #4b5563; /* Tailwind's hover:bg-gray-600 */
  }
`;

const AvatarContainer = styled.div`
  width: 3.5rem; /* Tailwind's w-14 */
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: ${(props) => (props.isOnline ? "2px solid #10b981" : "2px solid transparent")};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 1.25rem; /* Tailwind's text-xl */
  font-weight: bold;
`;

const UserStatus = styled.span`
  font-size: 0.875rem; /* Tailwind's text-sm */
  color: ${(props) => (props.isOnline ? "#10b981" : "#9ca3af")}; /* Online (green), Offline (gray) */
`;

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <ChatUserContainer>
      <AvatarContainer isOnline={isOnline}>
        <img src="" alt="User Avatar" />
      </AvatarContainer>
      <UserInfo>
        <UserName>{selectedConversation.name}</UserName>
        <UserStatus isOnline={isOnline}>
          {isOnline ? "Online" : "Offline"}
        </UserStatus>
      </UserInfo>
    </ChatUserContainer>
  );
}

export default Chatuser;
