import { Component } from "react";

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  failover: React.ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  {
    hasError: boolean;
  }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return this.props.failover;
    }

    return this.props.children;
  }
}
