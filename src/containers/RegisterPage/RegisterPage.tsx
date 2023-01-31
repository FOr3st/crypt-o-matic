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
      <Label size="xl" align="center">
        Register page
      </Label>

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
