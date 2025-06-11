import { calculateBMI } from "@/models/lib/db/services/bmi";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const result = await calculateBMI(body);

  return NextResponse.json(result, {
    status: 201,
  });
};
