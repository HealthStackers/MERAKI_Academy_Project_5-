import {  getBMIs } from "@/models/lib/db/services/bmi";
import { NextResponse } from "next/server";

export const GET = async () => {
  const result = await getBMIs();
  return NextResponse.json(result, {
    status: 200,
  });
};