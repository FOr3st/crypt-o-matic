import { PropsWithChildren } from "react";

export interface Account {
  mnemonic: string;
  wallets: Array<WalletData>;
}

export interface AppState {
  account?: Account;
  encryptedAccount?: string;
  authorized: boolean;
  password?: string;
}

export interface Action<T = any> {
  type: string;
  data?: T;
}

type SetStateAction = AppState | ((prevState: AppState) => AppState);
type SetState = (value: SetStateAction) => void;

export interface AppContext {
  state: AppState;
  setState: SetState;
}

export interface WalletData {
  address: string;
  publicKey: string;
  privateKey: string;
}

export interface ComponentProps extends PropsWithChildren {}

export type ScreenSize = "small" | "medium" | "big" | "large";

export type LayoutDirection = "vertical" | "horizontal";

export interface ScreenLayout {
  screenSize: ScreenSize;
  width: number;
  height: number;
  direction: LayoutDirection;
}
