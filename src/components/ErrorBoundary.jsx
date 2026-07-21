import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: '#eee',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>⚠️</div>
          <h1 style={{ fontSize: '36px', color: '#130f40', marginBottom: '15px' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px', maxWidth: '500px', lineHeight: '1.6', textTransform: 'none' }}>
            An unexpected error occurred while rendering this page. 
            Please try reloading. If the issue persists, clear your browser's local storage.
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReload}
              style={{ background: 'green', color: '#fff', padding: '12px 30px', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', border: 'none' }}
            >
              🔄 Reload Page
            </button>
            <button
              onClick={() => window.location.hash = '/'}
              style={{ background: '#130f40', color: '#fff', padding: '12px 30px', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', border: 'none' }}
            >
              🏠 Go Home
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre style={{ marginTop: '30px', background: '#fff', padding: '15px', borderRadius: '6px', textAlign: 'left', fontSize: '12px', color: '#cc0000', maxWidth: '700px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
