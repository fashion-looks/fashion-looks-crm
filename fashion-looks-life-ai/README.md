# Fashion Looks Life AI Integration

This folder contains a separately deployable AI chat service and embeddable website widget. It does not replace the existing FashionLooks.co.in website.

## Included
- `worker.js`: server-side OpenAI Responses API proxy. The key is read only from the Cloudflare Worker secret `OPENAI_API_KEY`.
- `public/widget.js`: embeddable floating chat widget.
- `public/index.html`: standalone preview page for the assistant.
- `wrangler.toml`: Worker and static assets configuration.
- GitHub Actions workflow at `.github/workflows/deploy-fashion-looks-life-ai.yml`.

## Deploy
1. Review and merge the pull request into `main`.
2. In Cloudflare, create a scoped API token that can deploy Workers for your account.
3. In GitHub repository Settings → Secrets and variables → Actions, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `OPENAI_API_KEY`
4. Open Actions → Deploy Fashion Looks Life AI → Run workflow, using `main`.
5. On success, open the Worker URL shown in Cloudflare and check `/api/health`. It should return `configured: true`.
6. Test the standalone chat before adding the widget to the production website.

## Add widget to FashionLooks.co.in
After deployment, copy the actual Worker URL from Cloudflare (example placeholder only: `https://fashion-looks-life-ai.<your-subdomain>.workers.dev`). Add this script near the end of the existing website HTML, before `</body>`:

```html
<script
  src="https://YOUR-WORKER-URL/widget.js"
  data-api-base="https://YOUR-WORKER-URL"
  defer>
</script>
```

Replace both placeholder values with the actual Worker URL. Keep the origin allowlist in `worker.js` limited to the real production website origins. It currently permits `https://fashionlooks.co.in` and `https://www.fashionlooks.co.in`.

This repository does not currently contain the verified production website source, so the widget cannot be inserted into the live site automatically from this PR. The script must be added to the real site's source/CMS or deployment repository. Alternatively, configure a custom domain for the Worker in Cloudflare and use that domain as the widget URL.

## Security and privacy
- Never commit the OpenAI key or Cloudflare token to code.
- This starter has an origin allowlist but does not include user authentication or robust rate limiting. Do not share publicly until rate limits/abuse controls are configured and tested.
- Browser chat history exists only in the widget's page session. Messages sent to the Worker are forwarded to the configured AI provider.
- Do not collect passwords, government ID numbers, payment credentials, or confidential factory records.
- The assistant does not issue certificates, send client messages, or make financial transactions.
