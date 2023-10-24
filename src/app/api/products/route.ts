import { THIRD_API_PRODUCTS } from "@/constants";

export async function GET() {
  return Response.json(
    await fetch(THIRD_API_PRODUCTS).then((res) => res.json())
  );
}
