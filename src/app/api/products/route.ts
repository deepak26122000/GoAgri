import { PRODUCTS } from "@/lib/products";

/**
 * GET /api/products
 *
 * Backend endpoint that returns the dummy agriculture product catalogue as
 * JSON. In a real app this would query a database; here it serves static mock
 * data. Marked `force-static` since the payload never changes at runtime.
 */
export const dynamic = "force-static";

export async function GET() {
  return Response.json(PRODUCTS);
}
