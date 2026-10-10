# Amit Singh · My Life AI Brain

A small personal LLM chat application with:
- A browser UI for life planning, Fashion Looks business support, learning, and daily review.
- A Cloudflare Worker backend that calls the OpenAI Responses API.
- Server-side API-key storage (never put the key in HTML, GitHub, or a public config file).
- Local browser context and chat history, exportable as JSON.
- A health endpoint to verify whether the server secret is configured.

## Files
- `my-life-ai-brain.html` — frontend
- `worker.js` — API proxy / LLM backend
- `wrangler.toml` — Worker configuration

## Deploy
1. Install Wrangler and log in to your Cloudflare account.
2. From this folder, deploy the Worker with `npx wrangler deploy`.
3. Add your provider key as a server-side secret: `npx wrangler secret put OPENAI_API_KEY`. Paste the key into the interactive prompt; do not put it in source code.
4. Optionally set a model name using the `OPENAI_MODEL` Worker variable in Cloudflare settings. Default: `gpt-4.1-mini`.
5. Serve `my-life-ai-brain.html` from the same Worker origin or your own website, and configure routing so `/api/health` and `/api/chat` reach this Worker. The static HTML must be hosted at the same origin for its relative API URLs to work.
6. Open `/api/health`. It should return `configured: true` after the secret is set. Send a test prompt in the UI.

## Important production hardening
- Add authentication before sharing this app publicly. As written, anyone who can reach the Worker endpoint may use your API quota.
- Add rate limiting and usage budgets; review provider pricing and data controls.
- Restrict CORS to your actual frontend origin rather than `*` once the deployment domain is known.
- Never enter passwords, financial credentials, government ID numbers, or confidential client records.
- Chat context is saved in local browser storage. The latest submitted prompt and history are sent to the configured provider. Provider handling follows the account and API terms you choose.
- This starter does not send emails, message clients, move money, or guarantee business or financial results.
