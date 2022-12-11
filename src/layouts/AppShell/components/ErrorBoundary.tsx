import { Component } from "react";

export class ErrorBoundary extends Component<
  {
    children: React.ReactNode;
    failover: React.ReactNode;
  },
  {
    hasError: boolean;
  }
> {
  constructor(props: { children: React.ReactNode; failover: React.ReactNode }) {
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
