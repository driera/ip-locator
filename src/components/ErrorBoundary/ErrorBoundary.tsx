import { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className={styles.errorBoundaryOverlay}>
          <div className={styles.errorBoundaryModal}>
            <h2>Something went wrong</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()}>Try again</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
