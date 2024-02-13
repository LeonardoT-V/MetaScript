import type { APIRoute } from "astro";
import { getInfoPages } from "../../../utils/fetchData";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const reqUrl = new URL(request.url)
    const url = new URLSearchParams(reqUrl.search)
    const nameQuery = url.get('url')

    const data = await getInfoPages(nameQuery)

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(
      { status: 500, message: 'Internal error: Try again' }), { status: 500 }
    )
  }
}