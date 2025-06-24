import { DiseaseBySymptoms } from "@/models/lib/db/services/Diseases";
import { request } from "http";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  params: {
    params: Promise<{ symptoms: string[] }>;
  }
) => {
  try {
    const { symptoms } = await params.params;

    const result = await DiseaseBySymptoms(symptoms);
    if (result.length === 0) {
      return NextResponse.json(
        { data: result, message: "No diseases with this Symptom" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { data: result, message: "All diseases with this Symptom" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error Can't get the Diseases please check" },
      { status: 501 }
    );
  }

  //   const url = new URL(request.url);
  //   const param = url.searchParams.get("symptoms");
  //   const json = param?.replace(/'/g, '"');
  //   const body = json ? json.split(",") : [];
  //   // ? param.split(",").map(s => s.trim())
  //   // : [];
  //   console.log(body);
  //   if (body) {
  //     const result = await DiseaseBySymptoms(body);
  //     if (result.length === 0) {
  //       console.log(body);

  //       return NextResponse.json(
  //         { data: result, message: "No disease with this Symptom" },
  //         { status: 404 }
  //       );
  //     } else {
  //       return NextResponse.json(
  //         { data: result, message: "All diseases with this Symptom" },
  //         { status: 200 }
  //       );
  //     }
  //   }
  
};
