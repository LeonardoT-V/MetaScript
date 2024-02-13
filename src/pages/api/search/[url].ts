import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, request }) => {

  console.log(params);


  return new Response(JSON.stringify({
    path: 'params.url'
  })
  )
}