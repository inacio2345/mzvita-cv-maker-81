import React from 'react';

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null, info: React.ErrorInfo | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ info });
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#fee2e2', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#991b1b', fontSize: '2rem', marginBottom: '1rem' }}>Ops! Ocorreu um erro no sistema.</h1>
          <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>Por favor, tire uma captura de ecrã (screenshot) deste erro e envie-me para eu poder resolver rapidamente:</p>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', border: '1px solid #f87171', color: '#000' }}>
            {this.state.error?.toString()}
            <br />
            {this.state.info?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
