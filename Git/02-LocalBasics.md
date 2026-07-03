# 02 — Local basics

Everything in this page happens on your machine — no GitHub account needed yet.

## Turn a folder into a repo

```bash
mkdir my-project && cd my-project
git init
```
This creates a hidden `.git/` folder — that *is* the repository. Delete `.git/` and the folder goes back to being a normal folder with no history.

## The core loop: status, add, commit

```bash
echo "# My Project" > README.md
git status
```
`git status` is your most-used command — read it before doing anything you're unsure about. Right now it reports `README.md` as untracked.

```bash
git add README.md
git status
```
`add` moves the file into the **staging area** — the changes you're about to snapshot. `status` now shows it staged.

```bash
git commit -m "Add README"
```
This takes the staged changes and saves them as a permanent snapshot, with a message describing what changed. Keep messages short, present-tense, and specific: `"Add README"`, never `"stuff"` or `"updates"`.

## Seeing history

```bash
git log --oneline
```
One line per commit, newest first. Add `--stat` to also see which files each commit touched.

## Seeing what changed before you commit

```bash
echo "More content" >> README.md
git diff
```
Shows the exact lines added/removed since the last commit — read this before every `git add` so you know exactly what you're about to snapshot.

```bash
git add README.md
git commit -m "Expand README"
```

## `.gitignore` — telling Git what to never track

Some files shouldn't ever be committed: OS clutter, build artifacts, secrets. List them in a `.gitignore` file:
```gitignore
.DS_Store
__pycache__/
*.pyc
```
Anything matching a `.gitignore` pattern disappears from `git status` and can't be accidentally `git add`ed. Every repo in this org ships one — see any sibling repo's `.gitignore` for the pattern in practice.

## Quick reference

| Command | What it does |
|---|---|
| `git init` | Start tracking a folder |
| `git status` | What's changed, staged, or untracked |
| `git add <file>` | Stage a change for the next commit |
| `git commit -m "..."` | Save a snapshot of staged changes |
| `git log --oneline` | See commit history |
| `git diff` | See unstaged changes, line by line |

Next: [03 — GitHub and remotes](03-GitHubAndRemotes.md)
