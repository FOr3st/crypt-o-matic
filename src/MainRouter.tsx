import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, withAuthProtection } from "./components";
import {
  WalletsPage,
  WalletDetailsPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  WelcomePage,
  ErrorBoundary,
} from "./containers";
import { loadAccountFromStorage } from "./data/commands";
import { useModelContext } from "./hooks";

const WalletsPageWithProtection = withAuthProtection(WalletsPage);
const WalletDetailsPageWithProtection = withAuthProtection(WalletDetailsPage);

export const MainRouter = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const context = useModelContext();
  useEffect(() => {
    if (isInitialized) {
      return;
    }

    loadAccountFromStorage(context);

    setIsInitialized(true);
  }, [context, isInitialized]);

  return (
    <>
      <ErrorBoundary>
        <header>
          <Header />
        </header>

        <main>
          <Router>
            <Routes>
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route index element={<WalletsPageWithProtection />} />
              <Route
                path="wallet/:address"
                element={<WalletDetailsPageWithProtection />}
              />
            </Routes>
          </Router>
        </main>
      </ErrorBoundary>
    </>
  );
};
