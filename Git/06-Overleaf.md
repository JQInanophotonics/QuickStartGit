# 06 — Syncing a paper with Overleaf over Git

Overleaf — the group is on a plan that includes this (Standard/Professional; Git integration is a premium feature not available on the free plan) — exposes every project as a Git remote, so you can write in your own editor locally and stay in sync with the web version. Useful for working offline, using your own editor/tools, or scripting around the LaTeX source.

## Getting the token and cloning

Git access to Overleaf uses a personal access token, not your account password:

1. In your project, open the project menu and select **Git**, or go to **Account Settings → Git authentication tokens** and generate one there (max 10 tokens, each expires after a year).
2. Find your project ID in its URL: `https://www.overleaf.com/project/<PROJECT_ID>`.
3. Clone it:
```bash
git clone https://git.overleaf.com/<PROJECT_ID> my-paper
```
When prompted for credentials, the username is always `git`; the password is the token you generated. Set up a [credential helper](https://git-scm.com/docs/gitcredentials) so you're not pasting the token every time:
```bash
git config --global credential.helper store   # or osxkeychain / manager, depending on platform
```

## The single-branch rule

**Overleaf's Git integration does not support branches** — there's exactly one line of history, and it *is* the web editor's current state. Whatever you `git push` becomes what's open in the Overleaf web editor; whatever's in the web editor is what the next `git pull` fetches. Don't create local branches for an Overleaf-tracked project expecting to push them separately — there's nowhere on the Overleaf side for a second branch to go. Do your branching/merging locally if you want it (see [04 — Branches and merging](04-BranchesAndMerging.md)), and only push the final result to Overleaf's single branch.

## Turn off track changes before you push

Overleaf's own documentation warns against mixing active Git use with Overleaf's track-changes/comments features: a `git push` can shift line numbers under a tracked change or comment, corrupting or dropping it. Turn track changes off (or accept/resolve everything) before you start pushing from your local clone.

## Turn off auto-fetch while someone's editing live on the web

If your local git client/editor is set to fetch automatically on an interval (VS Code's `Git: Autofetch`, GitLens's auto-fetch, some GUI clients by default), turn it off for an Overleaf-tracked repo while you or a collaborator are actively typing in the Overleaf web editor. Overleaf turns its own internal edit history into git commits as it saves — an auto-fetch hitting that mid-edit pulls a flood of tiny in-progress commits into your local history instead of one clean batch of edits. Fetch/pull deliberately, after a web-editing session is actually done.

## Resolving a conflict against your local edits

Same mechanics as [04 — Branches and merging: When it's not automatic: conflicts](04-BranchesAndMerging.md#when-its-not-automatic-conflicts), applied to this specific case: you edited `main.tex` locally *and* someone edited it on the Overleaf web editor before you pulled.

```bash
git pull
```
```
CONFLICT (content): Merge conflict in main.tex
Automatic merge failed; fix conflicts and then commit the result.
```
Open `main.tex`, find the `<<<<<<< HEAD` / `=======` / `>>>>>>>` markers exactly as in [04](04-BranchesAndMerging.md#when-its-not-automatic-conflicts), decide what the paragraph should actually say (your version, the web version, or a merge of both), delete the markers, then:
```bash
git add main.tex
git commit -m "Merge Overleaf edits, resolve intro conflict"
git push
```
The push sends the resolved version back to Overleaf — the web editor now shows exactly what you committed.

**Avoid the conflict in the first place**: pull right before you start a local editing session, and push as soon as you're done, rather than leaving local and web edits to accumulate in parallel for days.

## Quick reference

| Command | What it does |
|---|---|
| `git clone https://git.overleaf.com/<id>` | Clone an Overleaf project (username `git`, password = token) |
| `git pull` | Fetch the current state of the web editor |
| `git push` | Send your local commits to become the new web-editor state |

Next: [Example — a first repo, start to finish](Example-FirstRepoWalkthrough.md)
