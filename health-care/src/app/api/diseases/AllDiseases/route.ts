import { GetAllDiseases } from "@/models/lib/db/services/Diseases";
import { NextResponse } from "next/server";

export const GET = async () => {
  const result = await GetAllDiseases();
  return NextResponse.json(result, {
    status: 200,
  });
};
