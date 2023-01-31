import { Link, Navigate } from "react-router-dom";
import {
  Button,
  DirectionContainer,
  Label,
  PageContainer,
} from "src/components";
import { size } from "src/constants";
import { useModelContext } from "src/hooks";
import styled from "styled-components";

const ActionsContainer = styled(DirectionContainer)`
  justify-content: center;
  margin: ${size.m} 0;
`;

export function WelcomePage() {
  const { state } = useModelContext();

  if (state.authorized) {
    return <Navigate replace to="/" />;
  }

  const navigateLink = state.encryptedAccount ? "/login" : "/register";

  return (
    <PageContainer>
      <Label size="xl" align="center">
        Welcome to Crypt-o-Matic (C) crypto wallet generator!
      </Label>

      <Label align='center'>Press Proceed button to start</Label>

      <ActionsContainer>
        <Link to={navigateLink}>
          <Button kind="accent">Proceed</Button>
        </Link>
      </ActionsContainer>
    </PageContainer>
  );
}
