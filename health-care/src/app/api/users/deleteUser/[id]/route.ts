import { deleteUser } from "@/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } =await params.params;
  const result = await deleteUser(+id);
  return NextResponse.json(result, { status: 200 });
};