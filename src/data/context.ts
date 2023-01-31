import { createContext } from "react";
import { AppContext, AppState } from "src/types";

export function getDefaultContext(): AppContext {
  return {
    state: getDefaultState(),
    setState: () => {},
  };
}

export function getDefaultState(): AppState {
  return {
    authorized: false,
  };
}

export const ModelContext = createContext(getDefaultContext());
