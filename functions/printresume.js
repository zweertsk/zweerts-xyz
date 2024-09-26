export async function onRequest(context) {
  const resume = await env.ASSETS.fetch('/content/resume.md');
  return new Response(resume)
}
