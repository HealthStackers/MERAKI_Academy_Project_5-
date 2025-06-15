import { UpdateAppointment } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } = await params.params;
  const body = await request.json();
  const result = await UpdateAppointment(body , +id);
   return NextResponse.json(result, {
        status: 200,
      });
};
