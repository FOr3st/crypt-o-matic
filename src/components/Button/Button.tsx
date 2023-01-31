import { FC } from "react";
import { fontSize, size } from "src/constants";
import { ComponentProps } from "src/types";
import styled from "styled-components";

type Kind = "accent" | "default";

interface ButtonKind {
  kind?: Kind;
}

export interface ButtonProps extends ComponentProps, ButtonKind {
  onClick?(): void;
}

const StyledButton = styled.button<ButtonKind>`
  border-radius: 25px;
  padding: ${size.s} ${size.m};
  font-size: ${fontSize.m};
  border: 1px solid #69e;
  background-color: ${({ kind }) => (kind === "accent" ? "#69e" : "#fff")};
  color: ${({ kind }) => (kind === "accent" ? "#efe" : "#69e")};
  transition: all 300ms ease;
  cursor: pointer;

  :hover {
    background-color: #6ae;
    color: #efe;
  }

  :focus {
    background-color: #58e;
    color: #efe;
  }

  :active {
    background-color: #58e;
    color: #efe;
  }

  :disabled {
    background-color: #8ad;
    color: #aaa;

    cursor: none;
  }
`;

export const Button: FC<ButtonProps> = ({ children, kind, onClick }) => {
  return (
    <StyledButton kind={kind} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
