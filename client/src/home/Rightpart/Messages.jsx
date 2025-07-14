import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

// Styled Components
const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: calc(92vh - 8vh);
`;

const EmptyMessageContainer = styled.div`
  text-align: center;
  margin-top: 20%;
  color: ${({ theme }) => theme.text};
`;

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // Listening to incoming messages

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <MessagesContainer>
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <EmptyMessageContainer>Say! Hi to start the conversation</EmptyMessageContainer>
      )}
    </MessagesContainer>
  );
}

export default Messages;
