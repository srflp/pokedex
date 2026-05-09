import { style } from "@vanilla-extract/css";

export const searchInput = style({
  fontSize: "1.7rem",
  backgroundColor: "transparent",
  width: "100%",
  border: "none",
  textAlign: "center",
  MozAppearance: "textfield",
  WebkitAppearance: "none",
  outline: "none",
  padding: "0.5rem 0",
  selectors: {
    "&::-webkit-input-placeholder": { color: "#8b747a" },
    "&::-moz-placeholder": { color: "#8b747a" },
    "&:-ms-input-placeholder": { color: "#8b747a" },
    "&:-moz-placeholder": { color: "#8b747a" },
  },
});
