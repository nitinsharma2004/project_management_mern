import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider";

const MessageContainer = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: ${(props) => (props.itsMe ? "flex-end" : "flex-start")};
`;

const ChatBubble = styled.div`
  background-color: ${(props) => (props.itsMe ? "#3b82f6" : "#1e293b")};
  color: white;
  padding: 0.75rem;
  border-radius: 0.75rem;
  max-width: 75%;
  word-wrap: break-word;
  text-align: left;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    max-width: 90%;
    font-size: 0.85rem;
  }
`;

const ChatFooter = styled.div`
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  text-align: ${(props) => (props.itsMe ? "right" : "left")};
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
        <ChatFooter itsMe={itsMe}>{formattedTime}</ChatFooter>
      </div>
    </MessageContainer>
  );
}

export default Message;
