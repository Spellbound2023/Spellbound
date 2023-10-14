"use client";

import React from "react";
import { useSession } from "next-auth/react";
import ContainerCard from "./signupContainer";
import { redirect } from "next/navigation";

const signup = () => {
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

export default signup;

// References: https://next-auth.js.org/getting-started/example
