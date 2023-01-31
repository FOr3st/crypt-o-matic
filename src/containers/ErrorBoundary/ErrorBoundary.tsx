import React from "react";
import { Label, PageContainer } from "src/components";
import { ComponentProps } from "src/types";

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends React.Component<
  ComponentProps,
  ErrorBoundaryState
> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      message: error.message,
    });
  }

  render() {
    const { hasError, message } = this.state;

    if (hasError) {
      return (
        <PageContainer>
          <Label>Whoops! Something went wrong.</Label>
          <Label size="s">{message}</Label>
        </PageContainer>
      );
    }

    return this.props.children;
  }
}
