import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/products/stats`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch total product count: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch total products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
