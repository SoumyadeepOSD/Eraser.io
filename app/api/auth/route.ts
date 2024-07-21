import { handleAuth, AuthEndpoints } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { kindeAuth: AuthEndpoints } }) {
  const { kindeAuth } = context.params;
  
  if (!kindeAuth) {
    return new Response("Missing 'kindeAuth' parameter", { status: 400 });
  }

  try {
    return await handleAuth(request, kindeAuth);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}