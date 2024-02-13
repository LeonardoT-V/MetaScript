const GET = ({ params, request }) => {
  console.log(params);
  return new Response(
    JSON.stringify({
      path: "params.url"
    })
  );
};

export { GET };
