import { GetAllBloodTypeByID } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const GET = async ( request: Request,
  params: {
    params: Promise<{ id: string }>;
  }) => {
  const { id } = await params.params;
  const result = await GetAllBloodTypeByID(+id);
  return NextResponse.json(result, {
    status: 200,
  });
};