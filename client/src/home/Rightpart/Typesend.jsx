import React, { useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

// Styled Components
const Form = styled.form`
  display: flex;
  align-items: center;
  background-color: #1f2937; /* Tailwind's bg-gray-800 */
  height: 8vh;
  padding: 0 1rem;
`;

const InputContainer = styled.div`
  width: 70%;
  margin: 0 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #374151; /* Tailwind's border-gray-700 */
  border-radius: 0.75rem;
  outline: none;
  background-color: #1e293b; /* Tailwind's bg-slate-900 */
  color: white;
  font-size: 1rem;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const SendIcon = styled(IoSend)`
  font-size: 1.75rem; /* Tailwind's text-3xl */
  color: white;
`;

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessages(message);
      setMessage("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <InputField
          type="text"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </InputContainer>
      <SendButton type="submit">
        <SendIcon />
      </SendButton>
    </Form>
  );
}

export default Typesend;
