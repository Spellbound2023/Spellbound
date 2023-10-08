import { NextResponse } from "next/server";
import { createUser } from "@/utils/authUtils";

/* The word request thing */
export const POST = async (request) => {
  const data = await request.json();

  const userCreationResponse = await createUser({
    username: data.username,
    password: data.password,
  });

  if (userCreationResponse.success) {
    return NextResponse.json({});
  }
  return NextResponse.json(
    { error: userCreationResponse.message },
    { status: 409 }
  );
};
