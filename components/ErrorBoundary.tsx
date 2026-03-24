import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState;
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    if (hasError) {
      let errorMessage = 'An unexpected error occurred.';
      try {
        const parsedError = JSON.parse(error?.message || '');
        if (parsedError.error) {
          errorMessage = `Firestore Error: ${parsedError.error}`;
        }
      } catch (e) {
        errorMessage = error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-800">
            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-rose-600 dark:text-rose-400" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center space-x-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 rounded-2xl transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reload Application</span>
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center space-x-2 w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black py-4 rounded-2xl transition-all"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;