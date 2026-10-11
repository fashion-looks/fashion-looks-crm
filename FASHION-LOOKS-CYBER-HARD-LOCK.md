# Fashion Looks™ Domain Cyber Hard Lock

This is a Cloudflare Worker security-header starter, not a complete cybersecurity product and not a substitute for securing the registrar and Cloudflare accounts.

## Files
- `security-worker.js`: HTTPS redirect, baseline security headers, optional maintenance mode.
- `wrangler-security.toml`: separate Worker configuration with assets in `public/`.
- `public/index.html`: placeholder only; replace it with your actual website build before deployment.
- `.github/workflows/deploy-fashion-looks-security.yml`: manual GitHub Actions deployment.

## Before deployment
1. Copy your existing website's built output into `public/`. Do not deploy the placeholder as your live website by accident.
2. Create a Cloudflare API token with only the Workers deployment permissions needed for the target account.
3. Add GitHub Actions repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. Review the Content-Security-Policy against your website's scripts, styles, fonts, images, and API domains. The starter policy may block third-party assets until intentionally configured.
5. Review the pull request and merge it before running the deployment workflow.
6. Run **Actions → Deploy Fashion Looks Domain Security → Run workflow**.
7. Test the staging hostname first. Only route a production domain to this Worker after validating the site.

## Lock controls
- To show the maintenance page, change Worker variable `SECURITY_LOCK` to `enabled`. Set it back to `disabled` to restore normal serving.
- HSTS is off by default. Set `ENABLE_HSTS=true` only after verifying HTTPS on the domain and every subdomain that may be affected. This configuration intentionally omits `includeSubDomains` by default.

## Additional account/domain protection
- Enable MFA on GitHub, Cloudflare, and the domain registrar.
- Enable registrar/domain transfer lock and review DNSSEC support at the registrar and DNS provider.
- Use Cloudflare WAF/rate-limiting rules appropriate to the actual site and traffic.
- Keep a separate, tested backup of website files and DNS configuration.
- Never commit API tokens, passwords, private keys, or customer data.
- The workflow deploys code only; it does not change registrar locks, DNS records, WAF settings, or account MFA.
