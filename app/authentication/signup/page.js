"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ContainerCard from "./signupContainer";
import { redirect } from "next/navigation";

/* DOM Logic for Signup page */
const signup = () => {
  const { data: session, status } = useSession();

  // Do nothing when loading 
  if (status === "loading") return null;

  // Redirect to root dir when authenticated 
  if (status === "authenticated") {
    redirect("/");
  }
  
  // Returns signup container 
  return (
    <div>
      <ContainerCard />
    </div>
  );
};

export default signup;

// References: https://next-auth.js.org/getting-started/example
