import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const tile = style({
  position: "relative",
  margin: "auto",
  height: "100%",
  width: "100%",
  selectors: {
    "&:before": {
      content: '" "',
      display: "block",
      width: "100%",
    },
  },
});

export const shadow = style({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "40%",
  width: "60%",
  paddingTop: "60%",
  background: "#fffcfa",
});

export const gridImage = recipe({
  base: {
    position: "absolute",
    height: "100%",
    zIndex: 1,
    transition: "all 90ms ease-in-out",
    selectors: {
      "&:hover": { transform: "scale(1.1)" },
    },
  },
  variants: {
    pixelated: {
      true: { imageRendering: "pixelated" },
      false: { imageRendering: "smooth" },
    },
  },
  defaultVariants: { pixelated: false },
});

export const label = style({
  fontFamily: '"VT323", monospace',
  fontSize: "1.3em",
  whiteSpace: "nowrap",
  position: "absolute",
  left: "50%",
  top: "100%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  color: "#33272a",
  backgroundColor: "rgba(255, 255, 254, 0.7)",
  borderRadius: "5px",
});
