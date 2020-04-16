import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  padding: 0.25rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  //background-color: #61dafb;
`;

export const Col = styled("div")<{ size?: number }>`
  flex: ${(props) => props.size};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(9rem, 100%), 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1.75rem 0.5rem;
  padding: 1rem 0 2rem;
  justify-items: center;

  &:before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
`;

export const BrightSection = styled.section`
  background-color: #fffffe;
  padding: 0.25rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;
