// import { NextResponse } from "next/server";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const res = await fetch(`${BACKEND_URL}/products/${params.id}`, { cache: "no-store" });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch product: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     let errorMessage = "An unexpected error occurred";

//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const res = await fetch(`${BACKEND_URL}/products/${params.id}`, { cache: "no-store" });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch product: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${BACKEND_URL}/products/${params.id}`, { 
      cache: "no-store" 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to fetch product';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}