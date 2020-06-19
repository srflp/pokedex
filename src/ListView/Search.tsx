import React from "react";
import styled from "styled-components/macro";
import { BrightSection } from "../components/BaseComponents";
import { useDispatch } from "react-redux";
import { search } from "../store/filter/searchSlice";
import { page } from "../store/page/pageSlice";

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
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(search.set(e.target.value.toLowerCase()));
    dispatch(page.setCurrent(1));
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
