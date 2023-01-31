import { createWallet } from "./blockchain";

const mnemonic =
  "cheap damp eyebrow sand child impulse erode spray evidence moon sudden hint";

const wallets = [
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
];

describe("Blockchain API", () => {
  describe("createWallet()", () => {
    test("Should create 0 wallet from mnemonic phrase by default", () => {
      expect(createWallet(mnemonic)).toEqual(wallets[0]);
    });

    test("Should create a wallet from mnemonic phrase with the given index", () => {
      expect(createWallet(mnemonic, 0)).toEqual(wallets[0]);
      expect(createWallet(mnemonic, 1)).toEqual(wallets[1]);
      expect(createWallet(mnemonic, 2)).toEqual(wallets[2]);
    });
  });
});
