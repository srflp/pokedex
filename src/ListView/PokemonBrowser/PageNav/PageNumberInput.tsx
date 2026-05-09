import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Route } from "../../../routes";

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
  inputRef: RefObject<HTMLInputElement | null>;
  totalPages: number;
}

export const PageNumberInput = ({ className, inputRef, totalPages }: Props) => {
  const navigate = Route.useNavigate();
  const { page: currentPage } = Route.useSearch();
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const setPage = useCallback(
    (next: number) => navigate({ search: (prev) => ({ ...prev, page: next }) }),
    [navigate]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/, "");
    setInputValue(numericValue);
  }, []);

  const updatePageNumber = useCallback(() => {
    if (inputValue !== "") {
      const parsedPage = parseInt(inputValue.slice(-2));
      if (parsedPage < 1) {
        setPage(1);
        setInputValue(currentPage.toString());
      } else if (parsedPage > totalPages) {
        setPage(totalPages);
        setInputValue(currentPage.toString());
      } else {
        setPage(parsedPage);
      }
    } else {
      setInputValue(currentPage.toString());
    }
  }, [inputValue, currentPage, totalPages, setPage]);

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        updatePageNumber();
        inputRef?.current?.blur();
      }
    },
    [updatePageNumber, inputRef]
  );

  const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
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
