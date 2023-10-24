import { THIRD_API_PRODUCTS_BY_CATEGORY } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  return Response.json(
    await fetch(`${THIRD_API_PRODUCTS_BY_CATEGORY}/${params.category}`).then(
      (res) => res.json()
    )
  );
}
