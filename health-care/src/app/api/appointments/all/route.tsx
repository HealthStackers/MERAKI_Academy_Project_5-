import { getAllAppointments } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const GET = async() => {
  const result = await getAllAppointments();
  return NextResponse.json(result, {
    status: 200,
  });
};
