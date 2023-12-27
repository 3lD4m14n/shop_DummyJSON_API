import { LIMIT_PRODUCTS_PER_PAGE, THIRD_API_PRODUCTS } from "@/constants";

export async function GET(req: Request, { params }: { params: { currentPage: string } }) {
  return Response.json(
    await fetch(`${THIRD_API_PRODUCTS}?limit=${LIMIT_PRODUCTS_PER_PAGE}&skip=${(Number(params.currentPage) - 1) * LIMIT_PRODUCTS_PER_PAGE}`)
      .then((res) => res.json())
  );
}
