import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export type sessionResponse = {
  session: true | false;
};

export async function GET() {
  const cookiesStore = cookies();
  const sesion = cookiesStore.get(COOKIE_NAME);

  if (sesion) {
    return Response.json({
      session: true,
    });
  }

  return Response.json({
    session: false,
  });
}
