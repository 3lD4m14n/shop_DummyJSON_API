import { LIMIT_PRODUCTS_PER_PAGE, THIRD_API_SEARCH_PRODUCTS } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { query: string, currentPage: string } }
) {
  return Response.json(
    await fetch(`${THIRD_API_SEARCH_PRODUCTS}?q=${params.query}&limit=${LIMIT_PRODUCTS_PER_PAGE}&skip=${(Number(params.currentPage) - 1) * LIMIT_PRODUCTS_PER_PAGE}`)
      .then((res) => res.json())
  );
}
