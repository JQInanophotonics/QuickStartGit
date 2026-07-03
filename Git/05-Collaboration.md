# 05 — Collaborating: pull requests, issues, templates

## Pull requests

A **pull request (PR)** proposes merging one branch into another, with a place for someone else to review it before it lands. The usual flow:

```bash
git switch -c my-feature        # -c creates the branch and switches to it in one step
# ...make commits...
git push -u origin my-feature
```
Then on GitHub: **Compare & pull request** → describe what changed and why → request a review. Once approved, **Merge pull request** on GitHub does the `git merge` for you, on the server.

Why bother instead of pushing straight to `main`: it gives a labmate a chance to catch a mistake before it's permanent, and it leaves the repo a searchable record of *why* a change was made (the PR description), not just *what* changed (the commit).

## Issues

An **issue** is a tracked to-do or bug report, living on the repo itself instead of in Slack or email — searchable, linkable from commits (`Fixes #12`), and visible to anyone with access to the repo.

## Forking vs. org membership

If you're a member of the `JQInanophotonics` GitHub org with write access to a repo, you can push branches directly and open PRs within it. If you don't have write access — say, contributing to someone else's public repo outside the group — **fork** it first (your own copy on GitHub), push your branch there, and open a PR from your fork back to the original.

## Template repositories

A **template repo** is a starting point you copy, not fork — no shared history, no link back to the original. The group uses this for [JqiNanoBeamerTemplate](https://github.com/JQInanophotonics/JqiNanoBeamerTemplate): every talk starts by clicking **Use this template** on that repo (or `git clone` followed by `rm -rf .git && git init`, per that repo's own instructions), never by forking it.

## Quick reference

| Command / action | What it does |
|---|---|
| `git switch -c <name>` | Create + switch to a new branch in one step |
| `git push -u origin <name>` | Push a new branch and link it for future push/pull |
| "Compare & pull request" (GitHub) | Open a PR from your pushed branch |
| "Use this template" (GitHub) | Start a fresh repo from a template, no shared history |

Next: [06 — Syncing a paper with Overleaf over Git](06-Overleaf.md)
