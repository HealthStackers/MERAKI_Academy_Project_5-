import { AddService, getAllService } from "@/models/lib/db/services/service";
import { NextResponse } from "next/server";

export const POST = async (request : Request) => {
  try {
    const body = await request.json();
    const result = await AddService(body);

    return NextResponse.json(
      { data: result, message: "All blogs" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { data: error, message: "Error in getting blogs" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const result = await getAllService();

    return NextResponse.json(
      { data: result, message: "All Services" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { data: error, message: "Error Can't get the Services" },
      { status: 500 }
    );
  }
};
