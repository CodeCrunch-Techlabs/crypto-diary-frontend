// import { NextResponse } from "next/server";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

// export async function GET(req: Request) {
//   try {
//     // Get query params (pagination, search, category, etc.)
//     const { searchParams } = new URL(req.url);
//     const queryString = searchParams.toString();

//     console.log('query string -------------', queryString);
    
//     // Fetch products from the backend
//     const res = await fetch(`${BACKEND_URL}/products?${queryString}`, {
//       cache: "no-store", // Ensure fresh data
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch products: ${res.statusText}`);
//     }

//     const data = await res.json();
//     console.log('data -------------', data);
    
//     return NextResponse.json(data);
//   } catch (error) {
//     let errorMessage = "An unexpected error occurred";

//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5003/api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();

    const res = await fetch(`${BACKEND_URL}/products?${queryString}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}