'use client'

import { useState } from 'react'

export default function useErrorBoundary() {
  const [error, setError] = useState<any>(null);

  function catchError(error_parameter: any) {
    setError(error_parameter)
  }

  function cleatError() {
    setError(null);
  }
  return {
    error,
    catchError,
    cleatError
  }
}