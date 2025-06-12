import { deleteAppointmentById } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } = await params.params;
  const result = await deleteAppointmentById(+id);
   return NextResponse.json(result, {
        status: 201,
      });
};
