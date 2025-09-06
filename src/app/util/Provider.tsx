"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "../_Components/ui/toaster";
import ErrorBoundary from "../_Components/ErrorBoundary/page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthSync from "./AuthSync";
import { ThemeProvider } from "./Theme";
import { MessageContainer } from "../_Components/ui/message";

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
      <MessageContainer />
      <ErrorBoundary>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
          <AuthSync />
          <ThemeProvider>{children}</ThemeProvider>
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Provider;
