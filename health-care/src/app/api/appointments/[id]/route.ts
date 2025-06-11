import { getAppointmentByDoctorId } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const GET = async (
  id: number,
  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    const { id } = params.params;
    const result = await getAppointmentByDoctorId(id);
    return NextResponse.json(result, {
      status: 200,
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
