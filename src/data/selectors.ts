import { AppState } from "src/types";

export function getWalletByAddress(state: AppState, address: string) {
    return state.account?.wallets.find(w => w.address === address);
}