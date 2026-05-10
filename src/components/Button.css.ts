import { recipe } from "@vanilla-extract/recipes";

export const button = recipe({
  base: {
    fontFamily: '"VT323", monospace',
    color: "#33272a",
    backgroundColor: "rgb(235, 235, 235)",
    padding: "0.75rem 0.75rem",
    fontSize: "1.25rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    border: "none",
    outline: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    selectors: {
      "&:hover": { backgroundColor: "rgb(225, 225, 225)" },
      "&:active": { backgroundColor: "rgb(215, 215, 215)" },
      "&:first-child": { marginRight: "0.25rem" },
    },
  },
  variants: {
    hide: {
      true: { visibility: "hidden" },
      false: { visibility: "visible" },
    },
  },
  defaultVariants: { hide: false },
});
