import { POSTAddDisease } from "@/models/lib/db/services/Diseases";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await POSTAddDisease(body);
    return NextResponse.json(
      { data: result, message: "Disease has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding Disease" },
      { status: 501 }
    );
  }
};
