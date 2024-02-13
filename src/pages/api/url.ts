import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ params, request }) => {

  const urlParams = new URLSearchParams(request.url)
  console.log(urlParams);
  console.log(params);


  return new Response(JSON.stringify({
    path: 'params.url'
  })
  )
}