import { getAllServicesWithBlogs } from "@/models/lib/db/services/service";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await getAllServicesWithBlogs();

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
