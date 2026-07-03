# Example — a first repo, start to finish

A hands-on run through everything in this wiki, using a throwaway repo you make yourself. Nothing here touches the `JQInanophotonics` org — this is your own scratch space, safe to break.

## 1. A local repo

```bash
mkdir git-practice && cd git-practice
git init
echo "# Git practice" > notes.md
git add notes.md
git commit -m "Start notes"
```

## 2. A throwaway GitHub repo

On GitHub, under **your own account** (not the org): **New repository**, name it `git-practice`, don't initialize it with anything. Then:
```bash
git remote add origin git@github.com:<your-username>/git-practice.git
git push -u origin main
```
Refresh the GitHub page — your commit is there.

## 3. Branch, edit, and create a conflict on purpose

```bash
git switch -c add-section
echo "## Section A" >> notes.md
git add notes.md
git commit -m "Add Section A"
```
Now go back to `main` and change the *same line* a different way, to force a conflict:
```bash
git switch main
echo "## Introduction" >> notes.md
git add notes.md
git commit -m "Add Introduction on main"
git merge add-section
```
Git reports a conflict in `notes.md`. Open it, resolve it by hand (keep both headings, in whatever order makes sense), then:
```bash
git add notes.md
git commit -m "Merge add-section, keep both headings"
```
This is exactly the process in [04 — Branches and merging](04-BranchesAndMerging.md) — you just did it once, deliberately, so it's not the first time when it actually matters.

## 4. Push, and open a pull request against yourself

```bash
git push -u origin main
git switch -c try-a-pr
echo "## Another section" >> notes.md
git add notes.md
git commit -m "Add another section"
git push -u origin try-a-pr
```
On GitHub: **Compare & pull request**, write a one-line description, **Create pull request**, then **Merge pull request**. You've now done the full loop this wiki teaches: local commits, a branch, a resolved conflict, a push, and a merged PR.

## 5. Clean up

```bash
git pull                       # bring the merged PR back into local main
```
On GitHub: repo **Settings → Delete this repository** (bottom of the page) — this was a scratch repo, safe to remove once you're done practicing.

## Command cheat-sheet

Every command used across this wiki, in one place:

| Command | Page | What it does |
|---|---|---|
| `git --version` | [01](01-InstallAndSetup.md) | Confirm Git is installed |
| `git config --global user.name` / `user.email` | [01](01-InstallAndSetup.md) | Set your identity |
| `ssh-keygen -t ed25519 -C "..."` | [01](01-InstallAndSetup.md) | Generate an SSH key |
| `git init` | [02](02-LocalBasics.md) | Start tracking a folder |
| `git status` | [02](02-LocalBasics.md) | What's changed/staged/untracked |
| `git add <file>` | [02](02-LocalBasics.md) | Stage a change |
| `git commit -m "..."` | [02](02-LocalBasics.md) | Snapshot staged changes |
| `git log --oneline` | [02](02-LocalBasics.md) | See commit history |
| `git diff` | [02](02-LocalBasics.md) | See unstaged changes, line by line |
| `git clone <url>` | [03](03-GitHubAndRemotes.md) | Copy a remote repo with history |
| `git remote add origin <url>` | [03](03-GitHubAndRemotes.md) | Connect a local repo to a remote |
| `git push` / `git pull` | [03](03-GitHubAndRemotes.md) | Sync commits with the remote |
| `git branch <name>` | [04](04-BranchesAndMerging.md) | Create a branch |
| `git switch <name>` / `git switch -c <name>` | [04](04-BranchesAndMerging.md) | Move to a branch (create + move) |
| `git merge <name>` | [04](04-BranchesAndMerging.md) | Fold a branch into your current one |
| `git merge --abort` | [04](04-BranchesAndMerging.md) | Bail out of a conflicted merge |

Back to: [README](../README.md#pages)
