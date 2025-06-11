import { DeleteUser, UpdateUser } from "@/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } = params.params;

  const body = (await request.json()) as UpdateUser;
  const result = await UpdateUser(id, body);
  return NextResponse.json(result, { status: 200 });
};

export const DELETE = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } = params.params;
  const result = await DeleteUser(id);
  return NextResponse.json(result, { status: 200 });
};
