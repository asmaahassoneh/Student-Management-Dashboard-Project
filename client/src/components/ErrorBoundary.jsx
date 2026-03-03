import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p style={{ opacity: 0.8 }}>
            {this.state.error?.message ?? "Unexpected error"}
          </p>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <button onClick={this.handleReset}>Try again</button>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
