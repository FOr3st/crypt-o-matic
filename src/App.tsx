import { GlobalStyle } from "./style";
import { MainRouter } from "./MainRouter";
import { ModelContextProvider } from "./data/ContextProvider";
import { ErrorBoundary } from "./containers";

function App() {
  return (
    <ErrorBoundary>
      <ModelContextProvider>
        <GlobalStyle />
        <MainRouter />
      </ModelContextProvider>
    </ErrorBoundary>
  );
}

export default App;
