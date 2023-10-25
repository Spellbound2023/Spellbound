"use client";

import React from "react";
import ContainerCard from "./loginContainer.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

/* DOM Logic for Login page */
const login = () => {
  const { data: session, status } = useSession();
  
  // Do nothing when loading
  if (status === "loading") return null;
  
  // Redirects to root dir when authenticated
  if (status === "authenticated") {
    redirect("/");
  }
  
  // Returns login container 
  return (
    <div>
      <ContainerCard />
    </div>
  );
};

export default login;
