import { headerContainer, headerText } from "./Header.css";

export function Header() {
  return (
    <div className={headerContainer}>
      <h1 className={headerText}>Pokédex</h1>
    </div>
  );
}
