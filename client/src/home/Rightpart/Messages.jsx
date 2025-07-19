import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

// Styled Components
const MessagesWrapper = styled.div`
  flex: 1;
  height: calc(100vh - 120px); /* Adjust based on your layout */
  overflow-y: auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bg };
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: calc(100vh - 160px); /* More space for mobile headers/footers */
    padding: 0.5rem;
  }
`;

const EmptyMessageContainer = styled.div`
  text-align: center;
  margin-top: 30%;
  color: ${({ theme }) => theme.text || "#94a3b8"};
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // Hook to listen for real-time messages

  const lastMsgRef = useRef();

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <MessagesWrapper>
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMsgRef : null}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <EmptyMessageContainer>
          Say "Hi 👋" to start the conversation!
        </EmptyMessageContainer>
      )}
    </MessagesWrapper>
  );
}

export default Messages;
