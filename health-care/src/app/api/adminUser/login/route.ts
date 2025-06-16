import { loginAdminUser } from "@/models/lib/db/services/adminUsers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await loginAdminUser(body);
    return NextResponse.json(
      [{ data: result, message: "logged in successfully" }],
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      [{ data: error, message: " Email or Password is incorrect " }],
      {
        status: 501,
      }
    );
  }
};
