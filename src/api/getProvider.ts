import { getDefaultProvider, providers } from "ethers";

export function getProvider() {
  const { REACT_APP_NETWORK } = process.env;

  return ethereumProvider(REACT_APP_NETWORK || "homestead");
}

function ethereumProvider(network: string) {
  return getDefaultProvider(network);
}

// function bscProvider() {
//   return new providers.JsonRpcProvider("https://bsc-dataseed.binance.org/", {
//     name: "binance",
//     chainId: 56,
//   });
// }
