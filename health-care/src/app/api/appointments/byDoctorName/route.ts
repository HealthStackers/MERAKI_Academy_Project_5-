import { getAppointmentByDoctor } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLocaleLowerCase();
    //console.log(name)
    if (name) {
      const result = await getAppointmentByDoctor(name);
      return NextResponse.json(result, {
        status: 200,
      });
    }
    else {
        return NextResponse.json(
      { msg: `Error the query does not exist` },
      {
        status: 404,
      }
    );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { msg: `Failed ${error.message}` },
      {
        status: 404,
      }
    );
  }
};
