import React from "react";

export type Pages = {
  current: number;
  total: number;
};

export type PagesAction =
  | {
      type: "set_current" | "set_total";
      payload: number;
      scrollTo?: React.RefObject<HTMLElement>;
    }
  | {
      type: "first" | "previous" | "next" | "last";
      scrollTo?: React.RefObject<HTMLElement>;
    };

type PagesContextType = {
  pages: Pages;
  dispatchPages: React.Dispatch<PagesAction>;
};

const pagesReducer = (pages: Pages, action: PagesAction): Pages => {
  action.scrollTo?.current?.scrollIntoView();

  switch (action.type) {
    case "first":
      return { ...pages, current: 1 };
    case "previous":
      return {
        ...pages,
        current: pages.current > 1 ? pages.current - 1 : pages.current,
      };
    case "next":
      return {
        ...pages,
        current:
          pages.current < pages.total ? pages.current + 1 : pages.current,
      };
    case "last":
      return { ...pages, current: pages.total };
    case "set_current":
      let newPage;
      if (action.payload <= 0) {
        newPage = 1;
      } else if (action.payload > pages.total) {
        newPage = pages.total;
      } else {
        newPage = action.payload;
      }
      return { ...pages, current: newPage };
    case "set_total":
      return { ...pages, total: action.payload === 0 ? 1 : action.payload };
    default:
      throw new Error("Error in pagesReducer: invalid action type");
  }
};

const PagesContext = React.createContext({} as PagesContextType);

export const PagesProvider: React.FC = ({ children }) => {
  const [pages, dispatchPages] = React.useReducer(pagesReducer, {
    current: 1,
    total: 1,
  });

  const contextValue = React.useMemo(() => {
    return { pages, dispatchPages };
  }, [pages, dispatchPages]);

  return (
    <PagesContext.Provider value={contextValue}>
      {children}
    </PagesContext.Provider>
  );
};

const usePages = () => {
  const { pages, dispatchPages } = React.useContext(PagesContext);
  return { pages, dispatchPages };
};

export default usePages;
