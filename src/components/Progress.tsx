import React from "react";
import styled from "styled-components/macro";

const Stat = styled.div<{ color: string; background?: string }>`
  background-color: ${({ background }) => background || "white"};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25) inset;
  width: 100%;
  height: 1.5rem;

  & > span {
    background-color: ${(props) => props.color};
    border-radius: 4px;
    display: block;
    text-indent: -9999px;
    height: 100%;
  }
`;

interface Props {
  value: number;
  max: number;
  color: string;
  background?: string;
  [key: string]: any;
}

const Progress: React.FC<Props> = ({
  value,
  max,
  color,
  background,
  ...rest
}) => {
  return (
    <Stat color={color} background={background} {...rest}>
      <span
        style={{
          width: (value / max) * 100 + "%",
        }}
      >
        {value}
      </span>
    </Stat>
  );
};

export default Progress;
