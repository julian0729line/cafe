<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`,
`fix:`, `docs:`, `chore:`, `refactor:`, `perf:`, `test:`. One line, present
tense, describes the change — not a "GOAL NN" label. Multiple agent
sessions have worked on this repo independently with their own numbering;
the commit prefix is the one thing that has to stay consistent across all
of them for `git log` to stay readable.

## Branches and PRs

One branch per change, always a PR into `main` — never a direct commit or
push to `main`. `.github/pull_request_template.md` has the expected PR
shape (Objetivo / Alcance / Validación / Estado). `.github/workflows/ci.yml`
runs type-check, lint, and a build with no env vars on every PR — that
build-without-env invariant is load-bearing (see `CLAUDE.md`), don't relax
it to make CI pass.
