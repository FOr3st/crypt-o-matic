import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, PageContainer, WalletsList } from "src/components";
import { createNewWallet } from "src/data/commands";
import { ModelContext } from "src/data/context";
import { WalletData } from "src/types";

export function WalletsPage() {
  const navigate = useNavigate();
  const context = useContext(ModelContext);
  const { state } = context;

  const handleCreateWallet = useCallback(async () => {
    createNewWallet(context);
  }, [context]);

  const handleWalletClick = useCallback(
    ({ address }: WalletData) => {
      navigate(`/wallet/${address}`);
    },
    [navigate]
  );

  return (
    <PageContainer>
      <Label size="xl">Wallets list</Label>

      <WalletsList wallets={state.account?.wallets || []} onClick={handleWalletClick} />

      <div>
        <Button kind="accent" onClick={handleCreateWallet}>
          Create wallet
        </Button>
      </div>
    </PageContainer>
  );
}
