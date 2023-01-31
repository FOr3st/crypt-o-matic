import { FC } from "react";
import { size } from "src/constants";
import { ComponentProps, WalletData } from "src/types";
import styled from "styled-components";
import { Label } from "../Label";

export interface WalletsListProps extends ComponentProps {
  wallets: Array<WalletData>;
  onClick?(wallet: WalletData): void;
}

const WalletInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size.m} 0;
`;

const WalletInfo = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  margin: ${size.s};
  padding: ${size.m};
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 300ms ease;
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
  border-radius: 8px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
`;

export const WalletsList: FC<WalletsListProps> = ({ wallets, onClick }) => {
  const walletsInfo = wallets.map((wallet) => (
    <WalletInfo
      key={wallet.address}
      onClick={() => onClick && onClick(wallet)}
      title={wallet.address}
    >
      <Label>{wallet.address}</Label>
    </WalletInfo>
  ));

  return <WalletInfoContainer>{walletsInfo}</WalletInfoContainer>;
};
