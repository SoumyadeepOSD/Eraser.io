import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";

type Props = {};
export async function GET(props: Props) {
  const {getUser, isAuthenticated, getPermissions, getOrganization} = getKindeServerSession();
  const user = getUser();
  const authenticated = isAuthenticated();
  const permissions = getPermissions();
  const organization = getOrganization();

  return NextResponse.json({user, authenticated, permissions, organization});
}