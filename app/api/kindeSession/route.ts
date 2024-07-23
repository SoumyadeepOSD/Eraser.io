// route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getUser, isAuthenticated, getPermissions, getOrganization } = getKindeServerSession();
    const user = getUser();
    const authenticated = isAuthenticated();
    const permissions = getPermissions();
    const organization = getOrganization();

    return NextResponse.json({ user, authenticated, permissions, organization });
  } catch (error) {
    console.error("Error retrieving session data:", error);
    return NextResponse.json({ error: 'Failed to retrieve session data' }, { status: 500 });
  }
}
