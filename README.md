# Open Workload Governance Website

An independent, English-only Hugo/Docsy documentation site for the **OWG Workload Specification 0.1
Draft (Proposal)**. It follows the documentation-first structure of opentelemetry.io without copying
its content, branding, integrations, or specification submodules.

## Development

Install Hugo **extended** 0.146.0 or later, Go 1.23 or later, and Node.js 22.18 or later. The
validated local Hugo version is 0.152.2. Docsy is pinned to 0.12.0 through Hugo Modules.

```sh
cd openworkloadgovernance.io
npm ci
npm run build
npm run serve
```

Open <http://localhost:1314>. If that port is occupied, run `npm run serve -- --port 1315`. The
first build downloads the theme and its Go module dependencies. There are no dependencies on files
outside this folder.

```sh
npm run fix:format
npm run check
npm test
```

## Structure

- `content/en/`: homepage, concepts, specification, examples, and project roadmap.
- `hugo.yaml`: English-only configuration, navigation, and local search.
- `assets/scss/`: small Docsy styling overrides.
- `examples/`: downloadable draft Workload example.
- `tests/`: generated-page and internal-link smoke tests.
- `PLAN.md`: implementation stages, boundaries, and unresolved specification decisions.
- `netlify.toml`: optional static hosting configuration.

## Version Control And Publishing

Keep this site in its own repository, including `package-lock.json`, `go.mod`, and `go.sum`. Do not
include `node_modules`, `public`, or `resources`. Choose content and code licenses before
publishing; none are assumed by this starter.

The production URL is `https://openworkloadgovernance.io/`. `npm run build` produces `public/`.
GitHub Actions runs `npm run check` and `npm test` on pushes to `main` and pull requests. A
successful push to `main` also uploads `public/` to the configured FTP destination; pull requests
never deploy.

The included `netlify.toml` remains available for optional preview deployments. Connect the
repository to a Netlify site and enable Deploy Previews for pull requests; each preview is built
with its unique Netlify URL as the base URL. This is separate from the production FTP deployment.

For a manual preview build, set the preview base URL explicitly:
`npm run build -- --baseURL https://your-preview.example/`.

The documentation describes workload data and reference resolution, not running APIs. The draft is
intentionally published as normal content, not Hugo `draft: true`, so production builds include it.
The supplied identities fragment is normalized into a list of `ref` objects with nested token
references; this interpretation is documented for specification review.
