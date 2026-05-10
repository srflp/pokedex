import { style } from "@vanilla-extract/css";

export const headerContainer = style({
  display: "flex",
  justifyContent: "center",
  padding: "1rem",
});

export const headerText = style({
  fontFamily: '"Baloo Paaji 2", sans-serif',
  color: "#33272a",
  paddingLeft: "1rem",
  fontSize: "3rem",
});
