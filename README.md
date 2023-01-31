# Crypt-o-Matic

Crypt-o-Matic is a simple wallet keeper that store user's wallets securely. It allows to generate, store and fetch wallets.

## Features
- Application allows to generate wallets compatible with EVM networks such as **BNB Chain** or **Ethereum**.
- All the wallets are stored securely on the client using similar to [Metamask](https://https://metamask.io/) workflow. See more in **Workflow**.
- Crypot-o-Matic could run and display wallet balances in different blockhain networks. See more in **Networks**.
- Application doesn't store user's password.

## Functionality
- After registration, user account is created with single wallet from random mnemonic phrase.
- Users can generate more wallets. All the wallets are derived from same account and could be restored using mnemonic phrase.
- Users are able to see a list of generated wallets.
- Users can look up wallet's private keys by entering their password.
- Application can display wallet balances in blockchain networks (Ehereum, BSB Smart Chain). See more in **Networks**.

## Workflow

1. On account creation, a *mnemonic phrase* is generated using https://github.com/bitcoinjs/bip39. All the subsequent wallets are generated from this phrase. Thus this phrase could be used to export user wallets or to restore their account.
```javascript
const mnemonic = bip39.generateMnemonic();
```

2. The mnemonic phrase is converted to *salt* to generate wallets for the given account with their private, public keys and address (with using of HD wallet API https://github.com/ethereumjs/ethereumjs-wallet).

```javascript
const seed = bip39.mnemonicToSeed(mnemonic)
const hdWallet = hdkey.fromMasterSeed(seed)
```

3. User mnemonic phrase and all the derived wallets form `Account` (Metamask calls it Keyring). After account is created, it is encrypted using https://github.com/MetaMask/browser-passworder with user password and stored locally.

4. Once user logs into the application, encrypted account is loaded from the storage, decrypted with `browser-passworder` using user's password and saved to application state. At this point user is able to watch his wallets list and create new accounts by with menomic phrase from decrypted account. Decrypted user account and password are only stored in memory and doesn't go to the storage.

5. In order to export or import user account to any other EVM networks compatible wallet, only mnemonic phrase is needed (as per 1). User password works only on a device level.

## Networks

In the project directory, you can run:

### `npm start`

Runs the app in the Ethereum main network.

### `npm run start:goerli`

Runs the app in the Ethereum Goerli test network.

### `npm run start:sepolia`

Runs the app in the Ethereum Sepolia test network.

**Note:** To run application in BNB Smart Chain please uncomment `bscProvider()` function and return it's result from `getProvider()` in `src/api/getProvider.ts`. Running BNB Smart Chain from command line will be addressed later.

```javascript
export function getProvider() {
  return bscProvider()
}

function bscProvider() {
  return new providers.JsonRpcProvider("https://bsc-dataseed.binance.org/", {
    name: "binance",
    chainId: 56,
  });
}
```

## Misc

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Useful links
https://metamask.io/
https://www.wispwisp.com/index.php/2020/12/25/how-metamask-stores-your-wallet-secret/
