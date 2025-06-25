import {getAllServicesWithBlogsById } from "@/models/lib/db/services/service";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  const { id } = await params.params;
  const result = await getAllServicesWithBlogsById(+id);
   return NextResponse.json(result, {
        status: 200,
      });
};



