const ALLOWED_ORIGINS = new Set([
  "https://fashionlooks.co.in",
  "https://www.fashionlooks.co.in"
]);

const json = (data, status = 200, origin = "") => {
  const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Vary": "Origin" };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return new Response(JSON.stringify(data), { status, headers });
};

function systemPrompt(mode, context) {
  const purpose = {
    general: "Help visitors understand Fashion Looks services and plan sensible next steps.",
    certification: "Help explain textile certification consultancy workflows such as GOTS, GRS, OCS, RCS, RWS, OEKO-TEX, Better Cotton/BCI, Transaction Certificates, Scope Certificates, traceability, mass balance, audits and compliance. Do not claim to issue certificates, guarantee approval, or bypass a certification body. Explain that eligibility and timelines depend on the certification body and complete documentation.",
    contact: "Help the visitor prepare a professional enquiry or checklist for contacting Fashion Looks. Do not claim a message has been sent."
  };
  return [
    "You are Fashion Looks Life AI, a helpful website assistant for Fashion Looks, a textile and garment certification consultancy.",
    purpose[mode] || purpose.general,
    "Be concise, polite, and honest. Ask only for information needed to answer. Do not ask for passwords, payment card details, government identity numbers, or confidential factory/client records. Never make up prices, credentials, client names, or certificate status. Do not provide legal, tax, or financial guarantees. Do not send messages or perform external actions.",
    context ? "Visitor's optional context: " + String(context).slice(0, 1200) : ""
  ].filter(Boolean).join("\n\n");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
      }});
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ ok: true, configured: Boolean(env.OPENAI_API_KEY), service: "Fashion Looks Life AI" }, 200, origin);
    }

    if (url.pathname === "/api/chat") {
      if (!ALLOWED_ORIGINS.has(origin) && origin !== url.origin) {
        return json({ error: "Origin not allowed." }, 403, origin);
      }
      if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, origin);
      if (!env.OPENAI_API_KEY) return json({ error: "AI service is not configured yet." }, 503, origin);

      let body;
      try { body = await request.json(); } catch { return json({ error: "Request must be valid JSON." }, 400, origin); }
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message || message.length > 3000) return json({ error: "Message is required (maximum 3000 characters)." }, 400, origin);

      const history = Array.isArray(body.history)
        ? body.history.slice(-8).filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
            .map(m => ({ role: m.role, content: m.content.slice(0, 3000) }))
        : [];
      const input = [...history, { role: "user", content: message }];

      try {
        const upstream = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: { "Authorization": "Bearer " + env.OPENAI_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: env.OPENAI_MODEL || "gpt-4.1-mini",
            instructions: systemPrompt(body.mode, body.context),
            input,
            max_output_tokens: 700,
            store: false
          })
        });
        const data = await upstream.json();
        if (!upstream.ok) return json({ error: "AI provider request failed. Check service configuration and try again." }, 502, origin);
        const reply = data.output_text || (data.output || []).flatMap(item => item.content || []).filter(part => part.type === "output_text").map(part => part.text).join("\n");
        if (!reply) return json({ error: "No answer was returned. Please try again." }, 502, origin);
        return json({ reply }, 200, origin);
      } catch {
        return json({ error: "The AI service is temporarily unavailable." }, 502, origin);
      }
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return json({ error: "Not found." }, 404, origin);
  }
};
