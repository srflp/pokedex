import type { HTMLAttributes, Ref } from "react";
import { clsx } from "clsx";
import { brightSection, container, flex, flexCentered, grid } from "./BaseComponents.css";

export const Container = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(container, className)} {...rest} />
);

export const Grid = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(grid, className)} {...rest} />
);

export const Flex = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(flex, className)} {...rest} />
);

export const FlexCentered = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(flexCentered, className)} {...rest} />
);

interface BrightSectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "main";
  ref?: Ref<HTMLElement>;
}

export const BrightSection = ({ as: Tag = "section", className, ...rest }: BrightSectionProps) => (
  <Tag className={clsx(brightSection, className)} {...rest} />
);
