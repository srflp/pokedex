import { type ChangeEvent } from "react";
import { BrightSection } from "../components/BaseComponents";
import { Route } from "../routes";
import { searchInput } from "./Search.css";

export const Search = () => {
  const navigate = Route.useNavigate();
  const { q } = Route.useSearch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    navigate({
      search: (prev) => ({ ...prev, q: value, page: 1 }),
      replace: true,
    });
  };

  return (
    <BrightSection>
      <input
        className={searchInput}
        type="search"
        placeholder={" 🔍 search"}
        value={q}
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
