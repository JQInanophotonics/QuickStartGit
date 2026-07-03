# 00 — What is Git, and why do we use it?

## The problem Git solves

Without version control, collaboration usually looks like emailing files back and forth until someone ends up with `paper_v2_final_FINAL.docx` — no record of what changed, who changed it, or why, and no way to undo a bad edit without asking around. Git tracks every change to a set of files over time, as a series of snapshots, so you can always go back, see exactly what changed and when, and combine work from multiple people without losing anything.

## The mental model: snapshots, not sync

Dropbox or Google Drive save the latest state continuously and silently, with maybe some automatic version history. Git is the opposite: deliberate. You decide when a snapshot happens — that's a **commit** — and you write a short note (the **commit message**) saying what changed and why. Nothing is saved to history until you say so.

## Four places a change lives

1. **Working directory** — the files you're actually editing, same as any folder.
2. **Staging area** — changes you've earmarked for the next snapshot (`git add`).
3. **Commit** — the snapshot itself, saved permanently in the repository's history (`git commit`).
4. **Repository** — the full history of every commit, living on your machine.

That's all local so far. A **remote** (usually GitHub) is a copy of that repository hosted somewhere else, that you sync with (`push`/`pull`) — the only way changes get from your machine to a collaborator's, or to the group's copy of a repo.

## Why the group uses it

- Every other wiki in this org assumes you already know Git: [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement) stores each paper's data and figures in its own Git repo; [ScientificPresentations](https://github.com/JQInanophotonics/ScientificPresentations) tracks a talk's LaTeX and figures; Overleaf itself syncs your paper over Git (see [06 — Overleaf](06-Overleaf.md)). This repo is the prerequisite for all of them.
- It's the only practical way to work on the same files as a labmate without overwriting each other's work.
- It's a permanent, searchable lab notebook for code and data: `git log` on a paper-data repo shows exactly when a figure changed and why, months or years later.

Next: [01 — Install and set up Git](01-InstallAndSetup.md)
