import {
  POSTJoinAsDoctor,
  GETRequestByStatus,
  PUTUpdateStatusById,
} from "@/models/lib/db/services/joinRequest";
import { request } from "http";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    const authHeader = request.headers.get("authorization")?.split(" ")[1];
    console.log(authHeader);
    if (!authHeader) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 501 }
      );
    } else {
      const body = await request.json();
      const result = await POSTJoinAsDoctor(body);
      return NextResponse.json(
        {
          data: result,
          message: "You Request has been submitted successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { data: error, message: "Error in adding the request" },
      { status: 501 }
    );
  }
};

export const GET = async (request: Request) => {
  try {
    const authHeader = request.headers.get("authorization")?.split(" ")[1];
    if (!authHeader) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 501 }
      );
    } else {
      const payload = jwt.verify(
        authHeader,
        process.env.NEXTAUTH_SECRET!
      ) as Record<string, any>;
      if (payload.roleId !== 1) {
        return NextResponse.json({ message: "unauthorized" }, { status: 501 });
      } else {
        const url = new URL(request.url);
        const status = url.searchParams.get("status");
        if (status) {
          const result = await GETRequestByStatus(status);
          console.log(result.length);
          if (result.length === 0) {
            return NextResponse.json(
              { data: result, message: "No requests with this status" },
              { status: 404 }
            );
          } else {
            return NextResponse.json(
              { data: result, message: "All requests with Pendeing status" },
              { status: 200 }
            );
          }
        }
      }
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in getting the requests" },
      { status: 501 }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const authHeader = request.headers.get("authorization")?.split(" ")[1];
    if (!authHeader) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 501 }
      );
    } else {
      const payload = jwt.verify(
        authHeader,
        process.env.NEXTAUTH_SECRET!
      ) as Record<string, any>;

      if (payload.roleId !== 1) {
        return NextResponse.json({ message: "unauthorized" }, { status: 501 });
      } else {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const body = await request.json();

        if (id) {
          const result = await PUTUpdateStatusById(body, +id);
          return NextResponse.json(
            {
              data: result,
              message: "Request status has been updated successfully",
            },
            { status: 200 }
          );
        }
      }
    }
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Error in updating the status" },
      { status: 501 }
    );
  }
};
