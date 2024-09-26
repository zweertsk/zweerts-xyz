export async function onRequest(context) {
  const resume = await env.ASSETS.fetch('resume');
  console.log(context);
  console.log(resume);
}
