import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

export async function GET(req: NextRequest) {
  try {
    // Extract 'id' from the URL path using req.nextUrl
    const id = req.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const res = await fetch(`${BACKEND_URL}/products/${id}`, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch product: ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}