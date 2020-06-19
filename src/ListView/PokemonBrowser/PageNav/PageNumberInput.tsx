import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { page } from "../../../store/page/pageSlice";
import { useTypedSelector } from "../../../configureStore";
import { useDispatch } from "react-redux";
import totalSelector from "../../../store/page/totalSelector";

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
  const dispatch = useDispatch();
  const currentPage = useTypedSelector((state) => state.page.current);
  const totalPages = useTypedSelector(totalSelector);
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/, "");
    setInputValue(numericValue);
  }, []);

  const updatePageNumber = useCallback(() => {
    if (inputValue !== "") {
      const parsedPage = parseInt(inputValue.slice(-2));
      if (parsedPage < 1) {
        dispatch(page.setCurrent(1));
        setInputValue(currentPage.toString());
      } else if (parsedPage > totalPages) {
        dispatch(page.setCurrent(totalPages));
        setInputValue(currentPage.toString());
      } else {
        dispatch(page.setCurrent(parsedPage));
      }
    } else {
      setInputValue(currentPage.toString());
    }
  }, [dispatch, inputValue, setInputValue, currentPage, totalPages]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === 13) {
        updatePageNumber();
        inputRef?.current?.blur();
      }
    },
    [updatePageNumber, inputRef]
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

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
