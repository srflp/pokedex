import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { page, PageAction } from "../../../store/page/pageSlice";
import { useTypedSelector } from "../../../configureStore";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

const PageNumberInputStyled = styled.input`
  font-family: "VT323", monospace;
  font-size: 1.5rem;
  width: 2ch;
  color: #33272a;
  background-color: #faeee7;
  border: none;
  border-radius: 4px;
  text-align: right;
  appearance: none;
  outline: none;
  padding: 0;
`;

interface Props {
  className?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const PageNumberInput = ({ className, inputRef }: Props) => {
  const dispatch = useDispatch<Dispatch<PageAction>>();
  const currentPage = useTypedSelector((state) => state.page.current);
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage, setInputValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // allows only numbers as input
      const numericValue = e.target.value.replace(/\D/, "");
      setInputValue(numericValue);
    },
    [setInputValue]
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const updatePageNumber = useCallback(() => {
    if (inputValue !== "") {
      dispatch(page.setCurrent(parseInt(inputValue.slice(-2))));
    }
    setInputValue(currentPage.toString());
  }, [dispatch, currentPage, inputValue, setInputValue]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === 13) {
        updatePageNumber();
        inputRef?.current?.blur();
      }
    },
    [updatePageNumber, inputRef]
  );

  return (
    <PageNumberInputStyled
      ref={inputRef}
      type="text"
      className={className}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={updatePageNumber}
      onKeyDown={handleEnter}
    />
  );
};

export default PageNumberInput;
