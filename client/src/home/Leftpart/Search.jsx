import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

// Styled Components
const SearchContainer = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Form = styled.form`
  width: 100%;
`;

const SearchWrapper = styled.label`
height: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #374151; /* Tailwind's border-gray-700 */
  background-color: #1e293b; /* Tailwind's bg-slate-900 */
  border-radius: 0.5rem;
  padding: 0.75rem;
  width: 80%;
`;

const Input = styled.input`
  flex-grow: 1;
  outline: none;
  background: transparent;
  color: white;
  border: none;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
  padding: 0.5rem;

  &:hover {
    background-color: #4b5563; /* Tailwind's hover:bg-gray-600 */
  }
`;

const SearchIcon = styled(FaSearch)`
  padding: 0.5rem;
`;

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <SearchWrapper>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrapper>
          <SearchButton>
            <SearchIcon />
          </SearchButton>
        </div>
      </Form>
    </SearchContainer>
  );
}

export default Search;
