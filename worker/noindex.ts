/** Hosts that serve the full site but are not its public address. Search engines must not index them. */
export function isNonCanonicalHost(hostname: string): boolean {
  return hostname.endsWith(".workers.dev");
}

export function withNoindex(request: Request, response: Response): Response {
  if (!isNonCanonicalHost(new URL(request.url).hostname)) return response;
  const out = new Response(response.body, response);
  out.headers.set("x-robots-tag", "noindex");
  return out;
}
