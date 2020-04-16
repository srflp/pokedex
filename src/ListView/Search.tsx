import React from "react";
import styled from "styled-components";
import { BrightSection } from "../components/BaseComponents";
import useSearch from "./useSearch";

const SearchInput = styled.input`
  font-size: 1.7rem;
  background-color: transparent;
  width: 100%;
  border: none;
  text-align: center;
  -moz-appearance: textfield;
  -webkit-appearance: none;
  outline: none;
  padding: 0.5rem 0;
  ::-webkit-input-placeholder {
    color: #8b747a;
  }
  ::-moz-placeholder {
    color: #8b747a;
  }
  :-ms-input-placeholder {
    color: #8b747a;
  }
  :-moz-placeholder {
    color: #8b747a;
  }
`;

const Search: React.FC = () => {
  const { setSearch } = useSearch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ term: e.target.value.toLowerCase() });
  };
  return (
    <BrightSection>
      <SearchInput
        type="search"
        placeholder={" 🔍 search"}
        onFocus={(e) => {
          const target = e.target;
          target.placeholder = " 🔍      ";
        }}
        onBlur={(e) => (e.target.placeholder = " 🔍 search")}
        onChange={handleChange}
      />
    </BrightSection>
  );
};

export default Search;
