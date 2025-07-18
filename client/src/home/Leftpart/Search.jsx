import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

// Styled Components
const SearchContainer = styled.div`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 0.6rem 0.9rem;
  background-color: #1f2937;

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
  }
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  background: transparent;
  color: white;
  border: none;
  font-size: 1rem;

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.6rem;
  color: #9ca3af;

  &:hover {
    color: white;
  }

  @media (max-width: 480px) {
    padding-left: 0.4rem;
  }
`;

const SearchIcon = styled(FaSearch)`
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = allUsers.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <SearchWrapper>
          <Input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit">
            <SearchIcon />
          </SearchButton>
        </SearchWrapper>
      </Form>
    </SearchContainer>
  );
}

export default Search;
