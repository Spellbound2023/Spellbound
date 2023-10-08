"use client";

import { SessionProvider } from "next-auth/react";

const NextAuthenticationProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthenticationProvider;
