import { GetAllPatients} from "@/models/lib/db/services/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await GetAllPatients();
    return NextResponse.json(result, {
      status: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { msg: ` ${error.message}` },
      {
        status: 404,
      }
    );
  }
};
