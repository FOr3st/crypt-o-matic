import { useCallback, useState, ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  PageContainer,
  DirectionContainer,
  Input,
  Label,
} from "src/components";
import { size } from "src/constants";
import { createNewAccount } from "src/data/commands";
import { useModelContext } from "src/hooks";
import { validatePassword } from "src/utils";
import styled from "styled-components";

const ActionsContainer = styled(DirectionContainer)`
  justify-content: center;
  margin: ${size.m} 0;
`;

const PaddedLabel = styled(Label)`
  margin: ${size.xs};
`;

export function RegisterPage() {
  const context = useModelContext();
  const {state} = context;

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateAccount = useCallback(() => {
    const validateError = validatePassword(password);
    if (validateError) {
      return setErrorMessage(validateError);
    }

    createNewAccount(context, password); 
  }, [context, password]);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setErrorMessage("");
    },
    []
  );

  if (state.authorized) {
    return <Navigate replace to="/" />;
  }

  const error = errorMessage && (
    <Label size="s" color="#e33">
      {errorMessage}
    </Label>
  );

  return (
    <PageContainer>
      <PaddedLabel size="xl" align="center">
        Register page
      </PaddedLabel>

      <PaddedLabel size="s" align="center">
        To start using the appliction, please enter your password
      </PaddedLabel>

      <DirectionContainer direction="vertical">
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error}
      </DirectionContainer>

      <ActionsContainer>
        <Button kind="accent" onClick={handleCreateAccount}>
          Create Account
        </Button>
      </ActionsContainer>
    </PageContainer>
  );
}
