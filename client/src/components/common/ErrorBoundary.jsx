import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export class ErrorBoundary extends React.Component {
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

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto my-16 p-8 text-center bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 rounded-3xl shadow-soft-md space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-xs text-[#52635B] dark:text-[#A8C8B5] leading-relaxed">
              We encountered an issue while displaying this page.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
