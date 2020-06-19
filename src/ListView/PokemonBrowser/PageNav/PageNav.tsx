import React, { useCallback, useRef } from "react";
import styled from "styled-components/macro";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../configureStore";
import { page, PageAction } from "../../../store/page/pageSlice";
import PageNumberInput from "./PageNumberInput";
import { Flex } from "../../../components/BaseComponents";
import Button from "../../../components/Button";
import totalSelector from "../../../store/page/totalSelector";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageNumber = styled.p`
  font-family: "VT323", monospace;
  color: #33272a;
  font-size: 1.25rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: text;
  :hover {
    color: black;
  }
`;

interface Props {
  pokemonBrowserRef: React.RefObject<HTMLElement>;
  isTop?: boolean;
}

const PageNav: React.FC<Props> = ({ pokemonBrowserRef, isTop }) => {
  const dispatch = useDispatch<Dispatch<PageAction>>();
  const currentPage = useTypedSelector((state) => state.page.current);
  const totalPages = useTypedSelector(totalSelector);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNavButtonClick = useCallback(
    (action: PageAction) => {
      dispatch(action);
      if (!isTop) pokemonBrowserRef.current?.scrollIntoView();
    },
    [pokemonBrowserRef, isTop, dispatch]
  );

  return (
    <Nav>
      <Flex>
        <Button
          onClick={() => handleNavButtonClick(page.setCurrent(1))}
          hide={currentPage === 1}
        >
          &lt;&lt;
        </Button>
        <Button
          onClick={() => handleNavButtonClick(page.prev())}
          hide={currentPage === 1}
        >
          &lt; prev
        </Button>
      </Flex>
      <PageNumber onClick={() => inputRef?.current?.focus()}>
        page <PageNumberInput inputRef={inputRef} />/{totalPages}
      </PageNumber>
      <Flex>
        <Button
          onClick={() => {
            handleNavButtonClick(page.next());
          }}
          hide={currentPage === totalPages}
        >
          next &gt;
        </Button>
        <Button
          onClick={() => dispatch(page.setCurrent(totalPages))}
          hide={currentPage === totalPages}
        >
          &gt;&gt;
        </Button>
      </Flex>
    </Nav>
  );
};

export default PageNav;
