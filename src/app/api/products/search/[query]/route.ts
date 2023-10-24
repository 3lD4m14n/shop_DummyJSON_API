import { THIRD_API_SEARCH_PRODUCTS } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  return Response.json(
    await fetch(`${THIRD_API_SEARCH_PRODUCTS}?q=${params.query}`).then((res) =>
      res.json()
    )
  );
}
