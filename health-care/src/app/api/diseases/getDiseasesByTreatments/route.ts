import { GETDiseaseByTreatments } from "@/models/lib/db/services/Diseases";
import { NextResponse } from "next/server";
export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const body = url.searchParams.get("treatments");

    if (body) {
      const result = await GETDiseaseByTreatments(body);
      if (result.length === 0) {
        return NextResponse.json(
          { data: result, message: "No disease with this treatment" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { data: result, message: "All diseases with this treatment" },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting the Diseases" },
      { status: 501 }
    );
  }
};
