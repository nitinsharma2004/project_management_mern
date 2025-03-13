import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider";

const MessageContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: ${(props) => (props.itsMe ? "flex-end" : "flex-start")};
`;

const ChatBubble = styled.div`
  background-color: ${(props) => (props.itsMe ? "#3b82f6" : "#1e293b")}; /* Blue for sender, dark for receiver */
  color: white;
  padding: 0.75rem;
  border-radius: 0.75rem;
  max-width: 60%;
  text-align: left;
`;

const ChatFooter = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

function Message({ message }) {
   const [authUser] = useAuth();
  const itsMe = message.senderId === authUser._id;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <MessageContainer itsMe={itsMe}>
      <div>
        <ChatBubble itsMe={itsMe}>{message.message}</ChatBubble>
        <ChatFooter>{formattedTime}</ChatFooter>
      </div>
    </MessageContainer>
  );
}

export default Message;
