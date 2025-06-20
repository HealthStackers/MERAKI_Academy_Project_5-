import { userDiseases } from "@/models/lib/db/services/user_diseases";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await userDiseases(body);
    return NextResponse.json(
      { data: result, message: "Reflecting Disease to user has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in adding Disease" },
      { status: 501 }
    );
  }
};
