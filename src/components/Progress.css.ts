import { createVar, fallbackVar, style } from "@vanilla-extract/css";

export const colorVar = createVar();
export const backgroundVar = createVar();

export const stat = style({
  backgroundColor: fallbackVar(backgroundVar, "white"),
  borderRadius: "4px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25) inset",
  width: "100%",
  height: "1.5rem",
});

export const statBar = style({
  backgroundColor: colorVar,
  borderRadius: "4px",
  display: "block",
  textIndent: "-9999px",
  height: "100%",
});
