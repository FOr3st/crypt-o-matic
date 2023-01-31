import { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  Input, Label
} from "src/components";
import {
  DirectionContainer
} from 'src/components/DirectionContainer'
import { size } from "src/constants";

const StyledContainer = styled(DirectionContainer)`
  & > * {
    margin-bottom: ${size.s};
  }
`;

export interface PasswordDialogProps {
  onCancel?(): void;
  onConfirm?(value: string): void;
  validateInput?(value: string): Promise<string | undefined> | string | undefined;
}

export function PasswordDialog({
  onConfirm,
  onCancel,
  validateInput,
}: PasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  }, []);

  const handleConfirm = useCallback(async () => {
    if (validateInput) {
      const validateError = await validateInput(password);

      if (validateError) {
        return setErrorMessage(validateError);
      }
    }

    onConfirm && onConfirm(password);
  }, [onConfirm, validateInput, password]);

  const error = errorMessage && (
    <Label size="s" color="#e33">
      {errorMessage}
    </Label>
  );

  return (
    <Dialog onConfirm={handleConfirm} onCancel={onCancel}>
      <StyledContainer direction="vertical">
        <Label size="l">Enter your password</Label>
        <Input type="password" onChange={handleChange} value={password} />
        {error}
      </StyledContainer>
    </Dialog>
  );
}

// import { ChangeEvent, useCallback, useState } from "react";
// import {
//   Dialog,
//   Label,
//   DirectionContainer,
//   Input,
//   ButtonLabel,
// } from "src/components";
// import { size } from "src/constants";
// import { WalletData } from "src/types";
// import { validatePassword } from "src/utils";
// import styled from "styled-components";

// const StyledContainer = styled(DirectionContainer)`
//   & > * {
//     margin-bottom: ${size.s};
//   }
// `;

// export interface PasswordDialogProps {
//   wallet: WalletData;
//   onClose?(): void;
// }

// export function PasswordDialog({ wallet, onClose }: PasswordDialogProps) {
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [privateKey, setPrivateKey] = useState("");

//   const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//     setErrorMessage("");
//   }, []);

//   const handleConfirm = useCallback(() => {
//     const validateError = validatePassword(password);
//     if (validateError) {
//       return setErrorMessage(validateError);
//     }

//     let decryptedWallet;

//     // try {
//     //   decryptedWallet = decryptWallet(wallet, password);
//     // } catch {}

//     // if (!decryptedWallet || !decryptedWallet.privateKey) {
//     //   return setErrorMessage("Wrong password");
//     // }

//     // setPrivateKey(decryptedWallet.privateKey);
//   }, [wallet, password]);

//   const handleCopyKey = useCallback(() => {
//     if (privateKey) {
//       navigator.clipboard.writeText(privateKey);
//     }
//   }, [privateKey]);

//   const error = errorMessage && (
//     <Label size="s" color="#e33">
//       {errorMessage}
//     </Label>
//   );

//   const passwordRequest = (
//     <>
//       <Label size="l">Enter your password</Label>
//       <Input type="password" onChange={handleChange} value={password} />
//       {error}
//     </>
//   );

//   const privateKeyDisplay = (
//     <>
//       <Label size="l">{}</Label>
//       <DirectionContainer direction="vertical">
//         <Label size="l">Private key</Label>
//         <Label size="s" title={privateKey}>
//           {privateKey}
//         </Label>
//         <ButtonLabel onClick={handleCopyKey}>Copy</ButtonLabel>
//       </DirectionContainer>
//     </>
//   );

//   return (
//     <Dialog
//       onConfirm={handleConfirm}
//       onCancel={onClose}
//       hasConfirm={!privateKey}
//     >
//       <StyledContainer direction="vertical">
//         {privateKey ? privateKeyDisplay : passwordRequest}
//       </StyledContainer>
//     </Dialog>
//   );
// }
