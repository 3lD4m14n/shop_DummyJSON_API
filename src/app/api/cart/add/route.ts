import { decodeJwt } from "jose";
import { UserData } from "@/types";
import { COOKIE_NAME, THIRD_API_SINGLE_CART_USER } from "@/constants";
import { cookies } from "next/headers";
import { CartsResponse } from "@/types";

type Data = {
  addQuantity?: number;
  newQuantity?: number;
  productID: number;
};

export async function POST(req: Request) {
  const cookiesStore = cookies();
  const token = cookiesStore.get(COOKIE_NAME)?.value;
  const { addQuantity, newQuantity, productID }: Data = await req.json();

  if (!token) {
    return Response.json({
      status: 401,
      body: {
        message: "Unauthorized",
      },
    });
  }

  const userData = decodeJwt(token) as UserData;

  const cartResponse: CartsResponse = await fetch(
    `${THIRD_API_SINGLE_CART_USER}/${userData.id}`
  ).then((res) => res.json());

  if (addQuantity) {
    const userCart = cartResponse.carts[0];

    const product = userCart.products.find(
      (product) => product.id === productID
    );

    const currentQuantity = product ? product.quantity : 0;

    fetch(`${THIRD_API_SINGLE_CART_USER}/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true, // this will include existing products in the cart
        products: [
          {
            id: productID,
            quantity: currentQuantity + addQuantity,
          },
        ],
      }),
    });
  }

  if (newQuantity) {
    fetch(`${THIRD_API_SINGLE_CART_USER}/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true, // this will include existing products in the cart
        products: [
          {
            id: productID,
            quantity: newQuantity,
          },
        ],
      }),
    });
  }

  if (!addQuantity && !newQuantity) {
    return Response.json({
      status: 400,
      body: {
        message: "Bad request",
      },
    });
  }

  return Response.json({
    status: 200,
    body: {
      message: "Product added to cart",
    },
  });
}
