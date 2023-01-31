import { utils } from "ethers";
import { getProvider } from "./getProvider";

export async function getWalletBalance(address: string) {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  const balanceInEth = utils.formatEther(balance);

  return balanceInEth;
}

function getHDNodePath(walletIndex: number = 0) {
  return `m/44'/60'/0'/0/${walletIndex}`;
}

export function getHDNode(mnemonic: string) {
  return utils.HDNode.fromMnemonic(mnemonic);
}

export function createWallet(mnemonic: string, index: number = 0) {
  const node = getHDNode(mnemonic);
  const { address, publicKey, privateKey } = node.derivePath(getHDNodePath(index));

  return { address, publicKey, privateKey };
}
