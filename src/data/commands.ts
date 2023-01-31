import { createWallet } from "src/api";
import { storageLoad, storageSave } from "src/api/storage";
import { AppContext } from "src/types";
import { generateMnemonicPhrase } from "src/utils";
import { decryptAccount, encryptAccount } from "./utils";

export async function createNewWallet({ state, setState }: AppContext) {
  const { account, password } = state;
  if (!account || !password) {
    throw new Error("No account data found");
  }

  const { mnemonic, wallets } = account;

  const newWallet = createWallet(mnemonic, wallets.length);

  const newAccount = {
    ...account,
    wallets: [...account.wallets, newWallet],
  };

  const encryptedAccount = await encryptAccount(newAccount, password);
  storageSave(encryptedAccount);

  setState((s) => ({ ...s, encryptedAccount, account: newAccount }));
}

export async function loadAccountFromStorage({ setState }: AppContext) {
  const encryptedAccount = storageLoad();
  if (!encryptedAccount) {
    return;
  }

  setState((s) => ({ ...s, encryptedAccount }));
}

export async function logIn({ state, setState }: AppContext, password: string) {
  const { encryptedAccount } = state;
  if (!encryptedAccount) {
    throw new Error("No account found");
  }

  const account = await decryptAccount(encryptedAccount, password);

  setState((s) => ({ ...s, account, authorized: true, password }));
}

export async function createNewAccount(
  { setState }: AppContext,
  password: string
) {
  const mnemonic = generateMnemonicPhrase();
  const wallet = createWallet(mnemonic);

  const account = {
    mnemonic,
    wallets: [wallet],
  };

  const encryptedAccount = await encryptAccount(account, password);
  storageSave(encryptedAccount);

  setState({ account, authorized: true, encryptedAccount, password });
}
