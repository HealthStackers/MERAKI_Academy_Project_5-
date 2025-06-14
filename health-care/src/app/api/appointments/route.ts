import {
  bookAppointment,
  getAppointmentsByUserId,
} from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const result = await bookAppointment(body);
    return NextResponse.json(result, {
      status: 201,
    });
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

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLocaleLowerCase();
    const id = url.searchParams.get("id");

    if (name && id) {
      const result = await getAppointmentsByUserId(name, +id);
      if (result.length === 0) {
        return NextResponse.json(
          { message: `Error there is no any appointments for ${id}` },
          {
            status: 404,
          }
        );
      } else {
        return NextResponse.json(result, {
          status: 200,
        });
      }
    } else {
      return NextResponse.json(
        { message: `Error the query does not exist` },
        {
          status: 404,
        }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed ${error.message}` },
      {
        status: 404,
      }
    );
  }
};
