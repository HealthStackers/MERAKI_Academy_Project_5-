import { getBMIResultByUserId } from "@/models/lib/db/services/bmi";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } = params.params;
  const result = await getBMIResultByUserId(id);
  return NextResponse.json(result, {
    status: 200,
  });
};
