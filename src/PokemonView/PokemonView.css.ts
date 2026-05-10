import { createVar, style } from "@vanilla-extract/css";

export const typeColorVar = createVar();

export const typeBadge = style({
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "white",
  borderRadius: "5px",
  backgroundColor: typeColorVar,
  padding: "0.5rem",
  marginRight: "0.25rem",
  selectors: {
    "&:last-child": { marginRight: 0 },
  },
});

export const backRow = style({
  margin: "0.25rem",
});

export const mainColumn = style({
  flexDirection: "column",
  alignItems: "center",
});

export const pageTitle = style({
  fontSize: "2rem",
  margin: "0.5rem",
  fontFamily: '"VT323", monospace',
});

export const spriteImage = style({
  margin: "0.5rem",
});

export const statsContainer = style({
  width: "100%",
  maxWidth: "400px",
  padding: "0.7rem",
  boxSizing: "border-box",
});

export const heightText = style({
  marginBottom: "1.2rem",
});
