import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    errorComponent?: ReactNode;
  }
  
  interface ErrorBoundaryState {
    hasError: boolean;
  }
  
  class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught in ErrorBoundary:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return this.props.errorComponent || <h1>Something went wrong.</h1>; // Hiển thị thông báo lỗi
      }
  
      return this.props.children;
    }
  }

  export default ErrorBoundary;