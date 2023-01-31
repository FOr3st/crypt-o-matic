import { AppContext, AppState } from "src/types";
import {
  createNewAccount,
  createNewWallet,
  loadAccountFromStorage,
  logIn,
} from "./commands";
import passworder from "browser-passworder";

import { Crypto } from "@peculiar/webcrypto";

import * as storageMock from "src/api/storage";
import * as mnemonicMock from "src/utils/mnemonic";

jest.mock("src/utils/mnemonic");
jest.mock("src/api/storage");

global.crypto = new Crypto();

const password = "123456";
const mnemonicPhrase =
  "cheap damp eyebrow sand child impulse erode spray evidence moon sudden hint";
const account = {
  mnemonic: mnemonicPhrase,
  wallets: [
    {
      address: "0xf3bE58fE6FFc7bfB8E05bef171878852D1A35367",
      publicKey:
        "0x03ba36d96071062994d76adff7c8621f14ad9aa9f630679ec22da4164cf791ef47",
      privateKey:
        "0x728cd1d3bef6fe4eaba1381045d11a42097006db421562f0f152885fb62b5a1c",
    },
    {
      address: "0x683dEc65dC55D1DED3C91543B818d4f79082De25",
      publicKey:
        "0x027e72530d1a5cd80a7356c29bb237d508e6b0113fb5f1d92a922f74ba7ce12db6",
      privateKey:
        "0x1e40287cde1b44eb39ecd6cbd3a586955ef841ecbd9ca39878acfcf839c37ddf",
    },
    {
      address: "0xc3e17F69286f7f5155Bc23c5F58913901Cf8DC81",
      publicKey:
        "0x03a796dc5c52f0d04bc8d8d965cda13c09bedb8a807d2e3eee5ec1d46f01b2a4ae",
      privateKey:
        "0x4cb9afa1509055333aeaf18b645a60ba9c6fc9284b0a6f1984dd2bd128882a1a",
    },
  ],
};

function getAccount(walletsNumber = 0) {
  return { ...account, wallets: account.wallets.slice(0, walletsNumber) };
}

describe("Commands", () => {
  beforeEach(() => {
    mnemonicMock.generateMnemonicPhrase = jest.fn(() => mnemonicPhrase);
    storageMock.storageSave = jest.fn();
  });

  describe("createNewAccount()", () => {
    test("Should call setState with new state, populated with user password, generated account, encrypted account and authorized=true props", async () => {
      const setState = jest.fn();
      const emptyState = { authorized: false };
      const context = { state: emptyState, setState };

      await createNewAccount(context, password);

      const newState: AppState = setState.mock.calls[0][0];

      expect(setState.mock.calls).toHaveLength(1);
      expect(newState.authorized).toBe(true);
      expect(newState.password).toBe(password);
      expect(newState.account).toEqual(getAccount(1));
      expect(newState.encryptedAccount).toBeDefined();
    });

    test("Should save updated account data to storage. Stored data should be encrypted and doesn't contain neither mnemonic nor wallets props", async () => {
      const setState = jest.fn();
      const emptyState = { authorized: false };
      const context = { state: emptyState, setState };

      await createNewAccount(context, password);

      const accountToSave = storageMock.storageSave.mock.calls[0][0];
      const decryptedAccount = await passworder.decrypt(
        password,
        accountToSave
      );

      expect(storageMock.storageSave.mock.calls).toHaveLength(1);
      expect(accountToSave).not.toEqual(getAccount(1));
      expect(decryptedAccount).toEqual(getAccount(1));
      expect(accountToSave.mnemonic).toBeUndefined();
      expect(accountToSave.wallets).toBeUndefined();
    });
  });

  describe("createNewWallet()", () => {
    test("Should get 2 wallets when use on account with 1 wallet", async () => {
      const setState = jest.fn();
      const state = { authorized: true, account: getAccount(1), password };
      const context = { state, setState };

      await createNewWallet(context);

      expect(setState.mock.calls).toHaveLength(1);
      const newState: AppState = setState.mock.calls[0][0]();

      expect(newState.account).toEqual(getAccount(2));
    });

    test("Should get 3 wallets when use on account with 2 wallets", async () => {
      const setState = jest.fn();
      const state = { authorized: true, account: getAccount(2), password };
      const context = { state, setState };

      await createNewWallet(context);

      const newState: AppState = setState.mock.calls[0][0]();

      expect(setState.mock.calls).toHaveLength(1);
      expect(newState.account).toEqual(getAccount(3));
    });

    test("Should save updated account data to storage. Stored data should be encrypted and doesn't contain neither mnemonic nor wallets props", async () => {
      const setState = jest.fn();
      const state = { authorized: true, account: getAccount(1), password };
      const context = { state, setState };

      await createNewWallet(context);

      const accountToSave = storageMock.storageSave.mock.calls[0][0];
      const decryptedAccount = await passworder.decrypt(
        password,
        accountToSave
      );

      expect(storageMock.storageSave.mock.calls).toHaveLength(1);
      expect(accountToSave).not.toEqual(getAccount(2));
      expect(decryptedAccount).toEqual(getAccount(2));
      expect(accountToSave.mnemonic).toBeUndefined();
      expect(accountToSave.wallets).toBeUndefined();
    });
  });

  describe("logIn()", () => {
    let encryptedAccount: string;
    let context: AppContext;

    beforeAll(async () => {
      encryptedAccount = await passworder.encrypt(password, getAccount(1));
    });

    beforeEach(() => {
      const setState = jest.fn();
      const state = { authorized: false, encryptedAccount, password };
      context = { state, setState };
    });

    test("Should decrypt encryptedAccount from store using password and append it to state as account prop with setState method call", async () => {
      await logIn(context, password);

      expect(context.setState.mock.calls).toHaveLength(1);
      const newState: AppState = context.setState.mock.calls[0][0]();

      expect(newState.authorized).toBe(true);
      expect(newState.account).toEqual(getAccount(1));
    });

    test("Should reject when trying to log in with wrong password", async () => {
      await expect(logIn(context, "wrong password")).rejects.toThrow();
    });
  });

  describe("loadAccountFromStorage()", () => {
    let encryptedAccount: string;
    let context: AppContext;

    beforeAll(async () => {
      encryptedAccount = await passworder.encrypt(password, getAccount(1));
    });

    beforeEach(() => {
      storageMock.storageLoad = jest.fn(() => encryptedAccount);
    });

    test("Should load decrypted account from storage", async () => {
      const state = { authorized: false };
      context = { state, setState: () => {} };

      await loadAccountFromStorage(context);

      expect(storageMock.storageLoad.mock.calls).toHaveLength(1);
    });

    test("Should call setState with decrypted account loaded from storage", async () => {
      const setState = jest.fn();
      const state = { authorized: false };
      context = { state, setState };

      await loadAccountFromStorage(context);

      const newState: AppState = setState.mock.calls[0][0]();

      expect(setState.mock.calls).toHaveLength(1);
      expect(newState).toEqual({ encryptedAccount });
    });
  });
});
