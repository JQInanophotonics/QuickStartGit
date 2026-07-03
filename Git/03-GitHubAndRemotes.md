# 03 — GitHub and remotes

Everything so far lived only on your machine. A **remote** is a copy of the repo hosted elsewhere — for this group, that's [GitHub](https://github.com/JQInanophotonics), specifically the `JQInanophotonics` organization for group work.

## Starting from GitHub: clone

If a repo already exists on GitHub (e.g. this one), get a local copy with:
```bash
git clone git@github.com:JQInanophotonics/QuickStartGit.git
```
This copies the entire history, not just the current files, and automatically sets up the remote (named `origin`) so `push`/`pull` know where to sync.

## Starting from your machine: create on GitHub, then connect

If you already have a local repo (like the one from [02 — Local basics](02-LocalBasics.md)) and want to put it on GitHub:

1. On GitHub: **New repository** — don't initialize it with a README, since you already have files locally.
2. Connect your local repo to it and push:
```bash
git remote add origin git@github.com:<your-username>/my-project.git
git push -u origin main
```
`-u` links your local `main` branch to `origin`'s `main`, so future `git push`/`git pull` (no arguments) know where to go.

## Push and pull

```bash
git push          # send your local commits to the remote
git pull           # fetch and merge the remote's commits into your local copy
```
**Pull before you push** — if the remote has commits you don't have locally, `push` is rejected until you `pull` and reconcile them first.

## Public vs. private

New repos default to private (visible only to you/invited collaborators) or public (visible to anyone). The group's convention, used throughout [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement): **keep a paper's data repo private while the paper is in prep/review, and flip it to public at publication** — write everything you commit as if a stranger will eventually read it.

## Forking, briefly

A **fork** is your own copy of someone else's repo on GitHub — used when you don't have write access and want to propose changes. Full treatment, including the pull-request workflow this enables, is in [05 — Collaboration](05-Collaboration.md).

## Quick reference

| Command | What it does |
|---|---|
| `git clone <url>` | Copy a remote repo, with history, to your machine |
| `git remote add origin <url>` | Connect an existing local repo to a remote |
| `git push` | Send local commits to the remote |
| `git pull` | Fetch and merge the remote's commits |

Next: [04 — Branches, merging, and resolving conflicts](04-BranchesAndMerging.md)
