import type { HTMLAttributes } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { backgroundVar, colorVar, stat, statBar } from "./Progress.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  color: string;
  background?: string;
}

export const Progress = ({
  value,
  max,
  color,
  background,
  style: styleProp,
  ...rest
}: Props) => (
  <div
    className={stat}
    style={{
      ...assignInlineVars({
        [colorVar]: color,
        ...(background ? { [backgroundVar]: background } : {}),
      }),
      ...styleProp,
    }}
    {...rest}
  >
    <span className={statBar} style={{ width: (value / max) * 100 + "%" }}>
      {value}
    </span>
  </div>
);
