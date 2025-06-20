import { DiseaseByEffectedBodyPart } from "@/models/lib/db/services/Diseases";
import { request } from "http";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const body = url.searchParams.get("effectedBodyPart");

    if (body) {
      const result = await DiseaseByEffectedBodyPart(body);
      if (result.length === 0) {
        return NextResponse.json(
          { data: result, message: "No disease with this body part" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { data: result, message: "All diseases with this  body part" },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      { data: error, message: "Error in getting the Diseases" },
      { status: 501 }
    );
  }
};
