import styled from "styled-components";

export type DirectionContainerLayout = "horizontal" | "vertical";

export const DirectionContainer = styled.div<{
  direction?: DirectionContainerLayout;
}>`
  display: flex;
  flex-direction: ${({ direction = "horizontal" }) =>
    direction === "horizontal" ? "row" : "column"};
  
`;