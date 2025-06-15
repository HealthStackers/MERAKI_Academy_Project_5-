import { GETDiseaseBySymptoms } from "@/models/lib/db/services/Diseases";
import { request } from "http";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const body = url.searchParams.get("symptoms");

    if (body) {
      const result = await GETDiseaseBySymptoms(body);
      if (result.length === 0) {
        console.log(body);

        return NextResponse.json(
          { data: result, message: "No disease with this Symptom" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { data: result, message: "All diseases with this Symptom" },
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
