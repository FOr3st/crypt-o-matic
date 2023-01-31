import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWalletBalance } from "src/api";
import {
  Button,
  ButtonLabel,
  DirectionContainer,
  Label,
  PageContainer,
  PasswordDialog,
} from "src/components";
import { size } from "src/constants";
import { getWalletByAddress } from "src/data/selectors";
import styled from "styled-components";
// import { PrivateKeyDialog } from "../PrivateKeyDialog";
import { useModelContext } from "src/hooks";
import { WalletData } from "src/types";
import { validatePassword } from "src/utils";
import { canDecryptAccount } from "src/data/utils";

const LOADING_LABEL = "...";

const ActionsContainer = styled(DirectionContainer)`
  margin: ${size.m} 0;

  & :not(:last-child) {
    margin-right: ${size.s};
  }
`;

const StyledPageContainer = styled(PageContainer)`
  position: absolute;
`;

export function WalletDetailsPage() {
  const { address } = useParams();
  const context = useModelContext();
  const { state } = context;

  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [balance, setBalance] = useState(LOADING_LABEL);

  let wallet: WalletData | undefined;
  if (address) {
    wallet = getWalletByAddress(state, address);
  }

  const refreshBalance = useCallback(async () => {
    if (!address) {
      return;
    }

    setBalance(LOADING_LABEL);

    const balance = await getWalletBalance(address);
    setBalance(balance);
  }, [address]);

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  const validateInput = useMemo(
    () => async (password: string) => {
      const validateError = validatePassword(password);
      if (validateError) {
        return validateError;
      }

      if (!await canDecryptAccount(context, password)) {
        return "Wrong password";
      }
    },
    [context]
  );

  const handleCopyAddress = useCallback(async () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  }, [address]);

  const handleCopyPrivateKey = useCallback(async () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.privateKey);
    }
  }, [wallet]);

  const handleShowPrivateKeyClick = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setShowDialog(false);
  }, []);

  const handlePasswordConfirmed = useCallback(() => {
    setPasswordConfirmed(true);
    setShowDialog(false);
  }, []);

  if (!wallet) {
    return (
      <PageContainer>
        <Label size="l">Wallet not found</Label>
      </PageContainer>
    );
  }

  // TODO: add currency
  return (
    <StyledPageContainer>
      {showDialog && (
        <PasswordDialog
          validateInput={validateInput}
          onCancel={handleDialogClose}
          onConfirm={handlePasswordConfirmed}
        />
      )}

      <Label size="l">Wallet details</Label>

      <DirectionContainer direction="vertical">
        <DirectionContainer>
          <Label>Address: {address}</Label>
          <ButtonLabel onClick={handleCopyAddress}>Copy</ButtonLabel>
        </DirectionContainer>

        <DirectionContainer>
          <Label>Balance: {balance} ETH</Label>
          <ButtonLabel onClick={refreshBalance}>Refresh</ButtonLabel>
        </DirectionContainer>

        {passwordConfirmed && (
          <DirectionContainer>
            <Label>Private key: {wallet.privateKey}</Label>
            <ButtonLabel onClick={handleCopyPrivateKey}>Copy</ButtonLabel>
          </DirectionContainer>
        )}
      </DirectionContainer>

      <ActionsContainer>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        {!passwordConfirmed && (
          <Button kind="accent" onClick={handleShowPrivateKeyClick}>
            Show private key
          </Button>
        )}
      </ActionsContainer>
    </StyledPageContainer>
  );
}
