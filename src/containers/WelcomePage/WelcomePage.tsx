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

const PaddedLabel = styled(Label)`
  margin: ${size.xs};
`;

export function WelcomePage() {
  const { state } = useModelContext();

  if (state.authorized) {
    return <Navigate replace to="/" />;
  }

  const navigateLink = state.encryptedAccount ? "/login" : "/register";

  return (
    <PageContainer>
      <PaddedLabel size="xl" align="center">
        Welcome to Crypt-o-Matic!
      </PaddedLabel>

      <PaddedLabel size="s" align="center">
        Crypt-o-Matic (C) is a simple wallet keeper that stores your wallets
        securely
      </PaddedLabel>

      <PaddedLabel align="center">Press Proceed button to start</PaddedLabel>

      <ActionsContainer>
        <Link to={navigateLink}>
          <Button kind="accent">Proceed</Button>
        </Link>
      </ActionsContainer>
    </PageContainer>
  );
}
