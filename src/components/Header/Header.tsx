import styled from "styled-components";
import { fontSize, size } from "src/constants";

const HeaderContainer = styled.div`
  background: #fff;
  padding: ${size.xl};
  font-size: ${fontSize.xxl};
  display: flex;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export function Header() {
  return (
    <HeaderContainer>Crypt-o-Matic</HeaderContainer>
  );
}
