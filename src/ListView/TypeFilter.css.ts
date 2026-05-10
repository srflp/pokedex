import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const filterTitle = style({
  fontWeight: 500,
  color: "#594a4e",
  fontSize: "1rem",
  padding: "0.5rem 0",
  overflow: "hidden",
  textAlign: "center",
  selectors: {
    "&:before": {
      backgroundColor: "#c9c9c9",
      content: '""',
      display: "inline-block",
      height: "1px",
      position: "relative",
      verticalAlign: "middle",
      width: "50%",
      right: "0.5rem",
      marginLeft: "-50%",
    },
    "&:after": {
      backgroundColor: "#c9c9c9",
      content: '""',
      display: "inline-block",
      height: "1px",
      position: "relative",
      verticalAlign: "middle",
      width: "50%",
      left: "0.5rem",
      marginRight: "-50%",
    },
  },
});

export const buttonContainer = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
  flexFlow: "row wrap",
});

export const filterColorVar = createVar();

export const filterButton = recipe({
  base: {
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: `1px solid ${filterColorVar}`,
    flexBasis: 0,
    padding: "0.5rem 0.75rem",
    margin: "0.25rem 0.25rem",
    outline: "none",
    transition: "all 0.05s ease-in-out",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    selectors: {
      "&:hover": { transform: "scale(1.05)" },
      "&:active": {
        color: "white",
        backgroundColor: filterColorVar,
      },
    },
  },
  variants: {
    selected: {
      true: {
        fontWeight: 500,
        color: "white",
        backgroundColor: filterColorVar,
        flexGrow: 3,
      },
      false: {
        fontWeight: "normal",
        color: "#594a4e",
        backgroundColor: "white",
        flexGrow: 1,
      },
    },
  },
  defaultVariants: { selected: false },
});
