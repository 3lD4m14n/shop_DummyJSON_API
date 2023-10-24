import { THIRD_API_PRODUCTS } from "@/constants";

export async function GET(
  req: Request,
  { params }: { params: { product: string } }
) {
  return Response.json(
    await fetch(`${THIRD_API_PRODUCTS}/${params.product}`).then((res) =>
      res.json()
    )
  );
}
