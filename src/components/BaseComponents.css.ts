import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  margin: "0 auto",
  maxWidth: "900px",
  padding: "0.25rem",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(9rem, 100%), 1fr))",
  gridAutoRows: "1fr",
  gridGap: "1.75rem 0.5rem",
  padding: "1rem 0 2rem",
  justifyItems: "center",
  selectors: {
    "&:before": {
      content: '""',
      width: 0,
      paddingBottom: "100%",
      gridRow: "1 / 1",
      gridColumn: "1 / 1",
    },
  },
});

globalStyle(`${grid} > *:first-child`, {
  gridRow: "1 / 1",
  gridColumn: "1 / 1",
});

export const flex = style({
  display: "flex",
});

export const flexCentered = style({
  display: "flex",
  justifyContent: "center",
});

export const brightSection = style({
  backgroundColor: "#fffffe",
  padding: "0.25rem",
  borderRadius: "10px",
  marginBottom: "0.5rem",
});
