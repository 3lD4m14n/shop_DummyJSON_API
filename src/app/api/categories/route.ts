import { THIRD_API_CATEGORIES } from "@/constants";

export async function GET() {
  return Response.json(
    await fetch(THIRD_API_CATEGORIES).then((res) => res.json())
  );
}
