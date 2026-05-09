import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { PageNumberInput } from "./PageNumberInput";
import { Flex } from "../../../components/BaseComponents";
import { Button } from "../../../components/Button";
import { Route } from "../../../routes";

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
  pokemonBrowserRef: React.RefObject<HTMLElement | null>;
  totalPages: number;
  isTop?: boolean;
}

export const PageNav: React.FC<Props> = ({
  pokemonBrowserRef,
  totalPages,
  isTop,
}) => {
  const navigate = Route.useNavigate();
  const { page: currentPage } = Route.useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const setPage = useCallback(
    (next: number) => {
      navigate({ search: (prev) => ({ ...prev, page: next }) });
      if (!isTop) pokemonBrowserRef.current?.scrollIntoView();
    },
    [navigate, pokemonBrowserRef, isTop],
  );

  return (
    <Nav>
      <Flex>
        <Button onClick={() => setPage(1)} $hide={currentPage === 1}>
          &lt;&lt;
        </Button>
        <Button
          onClick={() => setPage(currentPage - 1)}
          $hide={currentPage === 1}
        >
          &lt; prev
        </Button>
      </Flex>
      <PageNumber onClick={() => inputRef?.current?.focus()}>
        page <PageNumberInput inputRef={inputRef} totalPages={totalPages} />/
        {totalPages}
      </PageNumber>
      <Flex>
        <Button
          onClick={() => setPage(currentPage + 1)}
          $hide={currentPage === totalPages}
        >
          next &gt;
        </Button>
        <Button
          onClick={() => setPage(totalPages)}
          $hide={currentPage === totalPages}
        >
          &gt;&gt;
        </Button>
      </Flex>
    </Nav>
  );
};
