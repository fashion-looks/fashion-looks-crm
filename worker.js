const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8"
};
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: cors });
const instructions = (mode, goal, memory) => {
  const modes = {
    life: "Help with realistic daily planning, habits, reflection, and clear next actions.",
    business: "Support Fashion Looks textile-certification consultancy: client service, GOTS/GRS/OCS/RCS-related workflows, traceability, documentation, follow-ups, and ethical business operations. Never claim a certificate or TC can be guaranteed or issued without the relevant certification body's process.",
    learning: "Teach clearly in small steps, explain jargon, and offer a practical exercise.",
    review: "Guide a balanced review: wins, lessons, blockers, and a realistic first action for tomorrow."
  };
  return [
    "You are My Life AI, a practical, honest assistant for Amit Singh.",
    modes[mode] || modes.life,
    "Be supportive but grounded. Do not claim to be conscious, all-knowing, or able to control the user's life. Never promise wealth or guaranteed outcomes. Separate known facts from assumptions, ask concise clarifying questions when needed, and keep plans realistic.",
    "Do not perform external actions. Draft messages only; the user must review and send them. Do not request passwords, payment card data, government ID numbers, or unnecessary sensitive information. For medical, legal, tax, or financial decisions, provide general information and recommend appropriate qualified help where needed.",
    goal ? "User's current focus (user-provided): " + goal : "",
    memory ? "Additional context explicitly supplied for this request: " + memory : ""
  ].filter(Boolean).join("\n\n");
};
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(request.url);
    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ ok: true, configured: Boolean(env.OPENAI_API_KEY), model: env.OPENAI_MODEL || "gpt-4.1-mini" });
    }
    if (url.pathname !== "/api/chat") return json({ error: "Not found" }, 404);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (!env.OPENAI_API_KEY) return json({ error: "Server AI key is not configured. Add OPENAI_API_KEY as a Worker secret." }, 503);
    let body;
    try { body = await request.json(); } catch { return json({ error: "Request body must be valid JSON." }, 400); }
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length > 6000) return json({ error: "Message is required and must be 6000 characters or fewer." }, 400);
    const history = Array.isArray(body.history) ? body.history.slice(-10).filter(m => m && ["user","assistant"].includes(m.role) && typeof m.content === "string").map(m => ({ role: m.role, content: m.content.slice(0, 6000) })) : [];
    const input = [...history, { role: "user", content: message }].map(m => ({ role: m.role, content: [{ type: m.role === "assistant" ? "output_text" : "input_text", text: m.content }] }));
    try {
      const upstream = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.OPENAI_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4.1-mini",
          instructions: instructions(body.mode, String(body.goal || "").slice(0, 1200), String(body.memory || "").slice(0, 2500)),
          input,
          max_output_tokens: 1200,
          store: false
        })
      });
      const data = await upstream.json();
      if (!upstream.ok) return json({ error: data.error?.message || "AI provider request failed." }, upstream.status >= 500 ? 502 : upstream.status);
      const reply = data.output_text || (data.output || []).flatMap(item => item.content || []).filter(part => part.type === "output_text").map(part => part.text).join("\n");
      if (!reply) return json({ error: "AI provider returned no text. Try again." }, 502);
      return json({ reply });
    } catch {
      return json({ error: "Could not reach AI provider. Try again later." }, 502);
    }
  }
};