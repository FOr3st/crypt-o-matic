import { useContext } from "react";
import { ModelContext } from "src/data/context";
import { AppContext } from "src/types";

export function useModelContext(): AppContext {
  return useContext(ModelContext);
}