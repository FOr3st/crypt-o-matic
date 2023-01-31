import { Account, AppContext } from "src/types";
import { decrypt, encrypt } from "src/utils";

export async function encryptAccount(account: Account, password: string): Promise<string> {
  return await encrypt(account, password);
}

export async function decryptAccount(account: string, password: string) {
  return await decrypt<Account>(account, password);
}

export async function canDecryptAccount(context: AppContext, password: string) {
  const {
    state: { encryptedAccount },
  } = context;

  if (!encryptedAccount) {
    return false;
  }

  try {
    const account = await decryptAccount(encryptedAccount, password);
    return !!account;
  } catch {}

  return false;
}
