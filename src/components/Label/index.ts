import { fontSize } from "src/constants";
import styled from "styled-components";

export const Label = styled.label<{
  size?: keyof typeof fontSize;
  color?: string;
  align?: 'center' | 'right' | 'left';
}>`
  font-size: ${({ size = "m" }) => fontSize[size]};
  ${({ color }) => color && `color: ${color}`};
  ${({ align }) => align && `text-align: ${align}`};
`;
