# Twitter CLI Documentation Site

This site documents [Twitter CLI](https://github.com/StanleyMasinde/twitter), the terminal app whose slogan is “Tweet without going to twitter.com.” It is for people installing, configuring, and using the CLI. The CLI source code and release binaries live in the linked repository.

## Run Locally

Install the site dependencies with pnpm, then start the development server:

```sh
pnpm install
pnpm docs:dev
```

Open the local URL printed by VitePress. To verify a production build, run:

```sh
pnpm docs:build
pnpm docs:preview
```

## Edit the Documentation

- `index.md` is the homepage.
- `guide/` contains the setup, tweeting, Unix examples, scheduling, reading, account, list, message, stream, troubleshooting, and command-reference pages.
- `.vitepress/config.mts` defines navigation, search, and site metadata. `.vitepress/config.ts` re-exports it for compatibility.
- `.vitepress/theme/custom.css` and `tokens.css` define the visual design.

The guides use VitePress code groups for platform choices and warning containers for commands that publish or delete immediately. Keep those notices adjacent to the relevant commands when editing a page.

Check commands with `twitter COMMAND --help` and the CLI source before changing examples. Keep credentials out of examples and issues.

## Deploy to Cloudflare Workers

The site uses Workers Static Assets. Wrangler serves the VitePress build from `.vitepress/dist` and returns the generated `404.html` for missing pages.

1. Install dependencies with `pnpm install --frozen-lockfile`.
2. Sign in to Cloudflare with `pnpm exec wrangler login` if you aren't already authenticated.
3. Check the deployment package with `pnpm deploy:dry-run`.
4. Deploy with `pnpm deploy`.

The Worker name is `twitter-cli-docs` in `wrangler.jsonc`. The deployment uses your Cloudflare account's `workers.dev` subdomain until you attach a custom domain. For Cloudflare Builds, use `pnpm install --frozen-lockfile` as the install command, `pnpm docs:build` as the build command, and `pnpm exec wrangler deploy` as the deploy command.
