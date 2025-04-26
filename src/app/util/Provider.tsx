"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "../_Components/ui/toaster";
import ErrorBoundary from "../_Components/ErrorBoundary/page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthSync from "./AuthSync";

const queryClient = new QueryClient();
//   {
//   defaultOptions: {
//     queries: {
//       staleTime: 5000,
//       refetchInterval : 1000
//     },
//   },
// }

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" />
      <Toaster />
      <ErrorBoundary>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
          <AuthSync/>
          {children}
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Provider;
