import { FC } from "react";
import styled from "styled-components";
import { ComponentProps } from "src/types";
import { size } from "src/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${size.xl} ${size.xxl};
`;

export const PageContainer: FC<ComponentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
