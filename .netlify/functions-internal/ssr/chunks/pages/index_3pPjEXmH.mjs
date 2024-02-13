import { g as getInfoPages } from './index_LuSZz-9z.mjs';

const GET = async ({ params, request }) => {
  try {
    const reqUrl = new URL(request.url);
    const url = new URLSearchParams(reqUrl.search);
    const nameQuery = url.get("url");
    const data = await getInfoPages(nameQuery);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify(
        { status: 500, message: "Internal error: Try again" }
      ),
      { status: 500 }
    );
  }
};

export { GET };
