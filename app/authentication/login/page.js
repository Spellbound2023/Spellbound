"use client";

import React from "react";
import ContainerCard from "./loginContainer.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const login = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated") {
    redirect("/");
  }
  return (
    <div>
      <ContainerCard />
    </div>
  );
};

export default login;
