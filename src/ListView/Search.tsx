import React from "react";
import styled from "styled-components";
import { BrightSection } from "../components/BaseComponents";
import { Route } from "../routes";

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
  const navigate = Route.useNavigate();
  const { q } = Route.useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    navigate({
      search: (prev) => ({ ...prev, q: value, page: 1 }),
      replace: true,
    });
  };

  return (
    <BrightSection>
      <SearchInput
        type="search"
        placeholder={" 🔍 search"}
        value={q}
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
