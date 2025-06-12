import { getAppointmentsByDoctorId, getAppointmentsByPatientId } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,

  params: {
    params: Promise<{ id: string }>;
  }
) => {
  try {
    console.log(params);
    const { id } = await params.params;

    const result = await getAppointmentsByDoctorId("doctor", +id);
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