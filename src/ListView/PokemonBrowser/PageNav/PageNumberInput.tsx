import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type RefObject,
  useEffect,
  useState,
} from "react";
import { Route } from "../../../routes";
import { pageNumberInput } from "./PageNumberInput.css";

interface Props {
  className?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  totalPages: number;
}

const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
  e.target.select();
};

export const PageNumberInput = ({ className, inputRef, totalPages }: Props) => {
  const navigate = Route.useNavigate();
  const { page: currentPage } = Route.useSearch();
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const setPage = (next: number) =>
    navigate({ search: (prev) => ({ ...prev, page: next }) });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/, "");
    setInputValue(numericValue);
  };

  const updatePageNumber = () => {
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
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      updatePageNumber();
      inputRef?.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className={[pageNumberInput, className].filter(Boolean).join(" ")}
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={updatePageNumber}
      onKeyDown={handleEnter}
    />
  );
};
