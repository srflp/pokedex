import type { HTMLAttributes, Ref } from "react";
import {
  brightSection,
  container,
  flex,
  flexCentered,
  grid,
} from "./BaseComponents.css";

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export const Container = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(container, className)} {...rest} />
);

export const Grid = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(grid, className)} {...rest} />
);

export const Flex = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(flex, className)} {...rest} />
);

export const FlexCentered = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(flexCentered, className)} {...rest} />
);

interface BrightSectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "main";
  ref?: Ref<HTMLElement>;
}

export const BrightSection = ({
  as: Tag = "section",
  className,
  ...rest
}: BrightSectionProps) => (
  <Tag className={cx(brightSection, className)} {...rest} />
);
