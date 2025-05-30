// components/auth-provider.tsx
"use client";

import type React from "react";
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@/redux/provider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
}
