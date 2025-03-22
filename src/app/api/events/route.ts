import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const queryString = searchParams.toString();

  const res = await fetch(`${BACKEND_URL}/events?${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
