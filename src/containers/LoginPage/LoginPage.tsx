import { ChangeEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, DirectionContainer, Input, Label, PageContainer } from "src/components";
import { size } from "src/constants";
import { logIn } from "src/data/commands";
import { canDecryptAccount } from "src/data/utils";
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

export function LoginPage() {
  const context = useModelContext();
  const { state } = context;

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = useCallback(async () => {
    const validateError = validatePassword(password);
    if (validateError) {
      return setErrorMessage(validateError);
    }

    if (!await canDecryptAccount(context, password)) {
      return setErrorMessage("Wrong password");
    }

    await logIn(context, password);
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
        Login page
      </PaddedLabel>

      <PaddedLabel size="s" align="center">
        Existing account found. Please enter your password to enter
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
        <Button onClick={handleLogIn}>Log in</Button>
      </ActionsContainer>
    </PageContainer>
  );
}
