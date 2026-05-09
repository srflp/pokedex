import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { button } from "./Button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  hide?: boolean;
}

export const Button = ({ hide, className, ...rest }: Props) => (
  <button className={clsx(button({ hide }), className)} {...rest} />
);
