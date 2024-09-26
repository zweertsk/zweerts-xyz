export async function onRequest(context) {
  const request = await env.ASSETS.fetch(request);
  console.log(request);
}
