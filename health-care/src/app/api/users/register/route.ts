import { Register } from "@/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const result = await Register(body);

  return NextResponse.json(result, {
    status: 201,
  });
};
