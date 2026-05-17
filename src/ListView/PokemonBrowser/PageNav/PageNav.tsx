import type { RefObject } from "react";
import { PageNumberInput } from "./PageNumberInput";
import { Flex } from "../../../components/BaseComponents";
import { Button } from "../../../components/Button";
import { Route } from "../../../routes";
import { nav, pageNumber } from "./PageNav.css";

interface Props {
  pokemonBrowserRef: RefObject<HTMLElement | null>;
  totalPages: number;
  isTop?: boolean;
}

export const PageNav = ({ pokemonBrowserRef, totalPages, isTop }: Props) => {
  const navigate = Route.useNavigate();
  const { page: currentPage } = Route.useSearch();

  const setPage = (next: number) => {
    navigate({ search: (prev) => ({ ...prev, page: next }) });
    if (!isTop) pokemonBrowserRef.current?.scrollIntoView();
  };

  return (
    <nav className={nav}>
      <Flex>
        <Button onClick={() => setPage(1)} hide={currentPage === 1}>
          &lt;&lt;
        </Button>
        <Button onClick={() => setPage(currentPage - 1)} hide={currentPage === 1}>
          &lt; prev
        </Button>
      </Flex>
      <label className={pageNumber}>
        page <PageNumberInput totalPages={totalPages} />/{totalPages}
      </label>
      <Flex>
        <Button onClick={() => setPage(currentPage + 1)} hide={currentPage === totalPages}>
          next &gt;
        </Button>
        <Button onClick={() => setPage(totalPages)} hide={currentPage === totalPages}>
          &gt;&gt;
        </Button>
      </Flex>
    </nav>
  );
};
