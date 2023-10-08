"use client";

import React from "react";
import ContainerCard from "./loginContainer.jsx";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const login = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <ContainerCard />
    </div>
  );
};

export default login;
