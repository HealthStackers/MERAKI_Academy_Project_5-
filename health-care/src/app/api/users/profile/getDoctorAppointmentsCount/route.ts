import { GetCountAppointmentsForDoctor } from "@/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } =await params.params;
  const result = await GetCountAppointmentsForDoctor(+id);
  return NextResponse.json(result, { status: 200 });
};