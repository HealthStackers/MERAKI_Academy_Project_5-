import { GetDiseaseNameByID } from "@/models/lib/db/services/Diseases";
import { NextResponse } from "next/server";

export const GET = async ( request: Request,
  params: {
    params: Promise<{ id: string }>;
  }) => {
  const { id } = await params.params;
  const result = await GetDiseaseNameByID(+id);
  return NextResponse.json(result, {
    status: 200,
  });
};