import { getAllUsers } from "@/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  const result = await getAllUsers();
  return NextResponse.json(result, { status: 200 });
};
