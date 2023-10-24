import { cookies } from "next/headers";
import {
  API_PATH,
  COOKIE_NAME,
  SESION_DURATION,
  SESION_DURATION_MINUTES,
  THIRD_API_AUTH,
} from "@/constants";

interface RegisterData {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  let data: RegisterData = await request.json();

  if (!data.username && !data.password) {
    return Response.json({ message: "Username and password are required" });
  }

  let { token } = await fetch(THIRD_API_AUTH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      expiresInMins: SESION_DURATION_MINUTES,
    }),
  }).then((res) => res.json());

  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: API_PATH,
    expires: new Date(Date.now() + SESION_DURATION),
  });

  return Response.json({ message: "Login successful" });
}
