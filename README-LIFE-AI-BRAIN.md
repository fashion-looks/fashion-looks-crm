# Amit Singh · My Life AI Brain

Personal LLM chat for daily planning, Fashion Looks business support, learning, and review.

## Deploy with GitHub Actions + Cloudflare

1. Review and merge the pull request into `main`.
2. In Cloudflare, create an API token with Workers Scripts edit permissions for the target account. Keep it private.
3. In the GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret** and add:
   - `CLOUDFLARE_API_TOKEN`: the Cloudflare API token.
   - `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
   - `OPENAI_API_KEY`: your OpenAI API key.
4. Open **Actions → Deploy My Life AI Brain → Run workflow**. Choose `main` after the pull request has been merged.
5. When the workflow succeeds, open the Worker URL shown in Cloudflare. The homepage should load the Life AI interface.
6. Visit `/api/health`; it should report `configured: true`.

The workflow uses the OpenAI key as a Worker secret and does not write it to repository files. Never paste API keys into HTML, source code, issues, or chat messages.

## Files
- `index.html` and `my-life-ai-brain.html`: frontend
- `worker.js`: server-side OpenAI Responses API proxy
- `wrangler.toml`: Worker and static asset configuration
- `.github/workflows/deploy-life-ai-brain.yml`: manual deployment workflow

## Security notes
- Add authentication and rate limiting before public use. This starter does not implement user sign-in; a public endpoint can incur API costs.
- Restrict CORS to the production frontend origin once the deployment domain is known.
- The browser saves conversation/context in local storage. Submitted prompts are sent to the configured AI provider.
- Do not enter passwords, payment credentials, government ID numbers, or confidential client records.
- This app drafts and advises only; it does not automatically message clients or move money.
