import { FC, useMemo, useState } from "react";
import { ComponentProps } from "src/types";
import { getDefaultState, ModelContext } from "./context";

export const ModelContextProvider: FC<ComponentProps> = ({ children }) => {
  const [state, setState] = useState(getDefaultState());
  const context = useMemo(() => ({ state, setState }), [state]);

  return (
    <ModelContext.Provider value={context}>{children}</ModelContext.Provider>
  );
};
