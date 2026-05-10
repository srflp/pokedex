import { style } from "@vanilla-extract/css";

export const nav = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const pageNumber = style({
  fontFamily: '"VT323", monospace',
  color: "#33272a",
  fontSize: "1.25rem",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  cursor: "text",
  selectors: {
    "&:hover": { color: "black" },
  },
});
