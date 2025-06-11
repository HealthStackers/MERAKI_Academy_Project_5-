import { bookAppointment } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";





export const POST = async(request: Request) => {
  const body = await request.json();

  const result = await bookAppointment(body);
  return NextResponse.json(result, {
    status: 201,
  });



};
