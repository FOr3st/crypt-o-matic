import React, { FC, memo, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useModelContext } from "src/hooks";
import { ComponentProps } from "src/types";

export function withAuthProtection<T extends ComponentProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ProtectedComponent = (props: T) => {
    return (
      <AuthContainer>
        <WrappedComponent {...props} />;
      </AuthContainer>
    );
  };

  ProtectedComponent.displayName = `withAuthProtection(${displayName})`;

  return ProtectedComponent;
}

const AuthContainer: FC<ComponentProps> = memo(({ children }) => {
  const { state } = useModelContext();

  if (!state.encryptedAccount) {
    return <Navigate replace to="/welcome" />;
  }

  if (!state.authorized) {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
});
