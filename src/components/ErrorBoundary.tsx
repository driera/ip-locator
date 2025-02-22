import React, { ErrorInfo } from "react";
import style from "./ErrorBoundary.module.css";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.error}>
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
