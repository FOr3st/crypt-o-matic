import { fontSize, size } from "src/constants";
import styled from "styled-components";

export const Input = styled.input`
  border: 1px solid #eee;
  color: #333;
  transition: all 300ms ease;
  outline: none;
  height: 50px;
  font-size: ${fontSize.m};
  border-radius: 15px;
  padding: ${size.s} ${size.m};

  :focus {
    border: 1px solid #eee;
  }

  :not([value=""]) {
    color: #000;
  }
`;
