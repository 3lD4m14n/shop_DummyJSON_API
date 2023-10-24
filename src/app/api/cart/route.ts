import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { Cart, UserData } from "@/types";
import { COOKIE_NAME, THIRD_API_SINGLE_CART_USER } from "@/constants";

interface API_Response {
  carts: Cart[];
}

export async function GET() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return Response.json({
      status: 401,
      body: {
        message: "Unauthorized",
      },
    });
  }

  const userData = decodeJwt(token) as UserData;

  const userCart: API_Response = await fetch(
    `${THIRD_API_SINGLE_CART_USER}/${userData.id}`
  ).then((res) => res.json());

  return Response.json(userCart.carts[0]);
}
