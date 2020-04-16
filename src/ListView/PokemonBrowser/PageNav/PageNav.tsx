import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import PageNumberInput from "./PageNumberInput";
import usePages from "../../usePages";
import { Flex } from "../../../components/BaseComponents";
import Button from "../../../components/Button";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const { pages, dispatchPages } = usePages();
  const handleNavButtonClick = useCallback(
    (page: "first" | "previous" | "next" | "last") => {
      if (isTop) {
        dispatchPages({ type: page });
      } else {
        dispatchPages({ type: page, scrollTo: pokemonBrowserRef });
      }
    },
    [pokemonBrowserRef, isTop, dispatchPages]
  );

  return (
    <Nav>
      <Flex>
        <Button onClick={() => handleNavButtonClick("first")}>&lt;&lt;</Button>
        <Button onClick={() => handleNavButtonClick("previous")}>
          &lt; prev
        </Button>
      </Flex>
      <PageNumber onClick={() => inputRef?.current?.focus()}>
        page <PageNumberInput inputRef={inputRef} />/{pages.total}
      </PageNumber>
      <Flex>
        <Button onClick={() => handleNavButtonClick("next")}>next &gt;</Button>
        <Button onClick={() => handleNavButtonClick("last")}>&gt;&gt;</Button>
      </Flex>
    </Nav>
  );
};

export default PageNav;
