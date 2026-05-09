import type { ButtonHTMLAttributes } from "react";
import { button } from "./Button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  hide?: boolean;
}

export const Button = ({ hide, className, ...rest }: Props) => (
  <button
    className={[button({ hide }), className].filter(Boolean).join(" ")}
    {...rest}
  />
);
