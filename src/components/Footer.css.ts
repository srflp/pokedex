import { style } from "@vanilla-extract/css";

export const footer = style({
  justifyContent: "center",
  textAlign: "center",
  fontSize: "0.9rem",
  margin: "1.5rem 1rem 1rem",
  color: "rgb(160, 160, 160)",
});

export const footerLink = style({
  textDecoration: "none",
  color: "rgb(130, 130, 130)",
  selectors: {
    "&:hover": {
      color: "rgb(90, 90, 90)",
      textDecoration: "underline",
    },
  },
});
