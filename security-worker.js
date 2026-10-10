/**
 * Fashion Looks™ domain security headers + optional maintenance lock.
 * Keep this Worker behind Cloudflare and test policies before production use.
 */
const SECURITY_HEADERS = {
  "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
};

function withHeaders(response, additions = {}) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
  for (const [key, value] of Object.entries(additions)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Enable only through Cloudflare Worker variable SECURITY_LOCK=enabled.
    if (env.SECURITY_LOCK === "enabled") {
      return withHeaders(new Response(
        "Fashion Looks™ is temporarily in security maintenance. Please try again later.",
        { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } }
      ), { "Retry-After": "900" });
    }

    const response = await env.ASSETS.fetch(request);
    const additions = {};
    // HSTS is added only when explicitly enabled after confirming every subdomain supports HTTPS.
    if (env.ENABLE_HSTS === "true") additions["Strict-Transport-Security"] = "max-age=31536000";
    return withHeaders(response, additions);
  }
};
