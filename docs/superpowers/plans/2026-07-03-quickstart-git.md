# QuickStartGit Poor-Boy Wiki Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `QuickStartGit` poor-boy wiki: a `README.md` index plus eight Markdown pages in `Git/`, teaching true beginners Git, GitHub, branching/conflict resolution, collaboration, and syncing a paper with Overleaf over Git.

**Architecture:** Plain Markdown, no build step, no separate wiki repo — mirrors `ScientificDataManagement`'s and `ScientificPresentations`'s pattern (README as index/rules-summary, numbered content pages in a subfolder). The eight content pages are written first (`00`–`06` plus `Example-FirstRepoWalkthrough.md`), then the README is written last so its links target files that already exist, then every internal link in the repo is verified against the filesystem.

**Tech Stack:** Markdown only. No dependencies, no CI, no generated assets.

## Global Constraints

- Audience is true beginners — zero assumed prior version-control experience (spec: "Audience"). Explain concepts before commands.
- No native GitHub Wiki, no static site generator (spec: "Non-goals").
- No duplication of GitHub's own documentation or Overleaf's own documentation beyond what's needed inline — link out instead (spec: "Non-goals").
- No advanced Git (rebase, cherry-pick, submodules, reflog surgery) — quick start only (spec: "Non-goals").
- No binary/example assets committed to this repo. The hands-on practice page has the reader create their own throwaway local + personal GitHub repo (spec: "Non-goals").
- Repo structure is fixed by the spec:
  ```
  QuickStartGit/
  ├── README.md
  └── Git/
      ├── 00-WhatIsGitAndWhy.md
      ├── 01-InstallAndSetup.md
      ├── 02-LocalBasics.md
      ├── 03-GitHubAndRemotes.md
      ├── 04-BranchesAndMerging.md
      ├── 05-Collaboration.md
      ├── 06-Overleaf.md
      └── Example-FirstRepoWalkthrough.md
  ```
- Overleaf facts used in Task 7 were verified against Overleaf's live documentation on 2026-07-03 (`docs.overleaf.com/integrations-and-add-ons/git-integration-and-github-synchronization/...`): Git integration is a premium feature (Standard/Professional plans); it supports exactly one branch, which mirrors the web editor directly; authentication uses username `git` and a personal access token (generated in Account Settings or the project's Git menu, max 10 tokens, 1-year expiry); mixing active Git use with Overleaf's track-changes/comments is explicitly discouraged by Overleaf itself.
- Working directory for all tasks: `/Users/greg/Documents/Lib/JQInanophotonics/QuickStartGit`.

---

## Task 1: `Git/00-WhatIsGitAndWhy.md`

**Files:**
- Create: `Git/00-WhatIsGitAndWhy.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/00-WhatIsGitAndWhy.md`, linked from `README.md`'s Pages table and from `Git/01-InstallAndSetup.md`'s trailing "Next" link (Task 2).
- Consumes: nothing (first content page).

- [ ] **Step 1: Create the directory and write the file**

Create `Git/00-WhatIsGitAndWhy.md` with this exact content:

```markdown
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
```

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/00-WhatIsGitAndWhy.md`
Expected: `5` (one `#` title + four `##` sections)

- [ ] **Step 3: Commit**

```bash
git add Git/00-WhatIsGitAndWhy.md
git commit -m "Add what-is-git page to quickstart git wiki"
```

---

## Task 2: `Git/01-InstallAndSetup.md`

**Files:**
- Create: `Git/01-InstallAndSetup.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/01-InstallAndSetup.md`, linked from `README.md`'s Pages table, from Task 1's "Next" link, and from Task 3's "Next" link.
- Consumes: links back to `00-WhatIsGitAndWhy.md` (Task 1, already exists) and forward to `02-LocalBasics.md` (Task 3).

- [ ] **Step 1: Write the file**

Create `Git/01-InstallAndSetup.md` with this exact content:

````markdown
# 01 — Install and set up Git

## Install Git

- **macOS**: `xcode-select --install` (ships Git), or `brew install git` for the latest version.
- **Windows**: install [Git for Windows](https://git-scm.com/download/win) — this also gives you "Git Bash," a terminal that behaves like macOS/Linux.
- **Linux**: `sudo apt install git` (Debian/Ubuntu) or your distro's package manager.

Check it worked:
```bash
git --version
```

## Tell Git who you are

Every commit is stamped with a name and email — set this once per machine:
```bash
git config --global user.name "Your Name"
git config --global user.email "you@umd.edu"
```
Use the same email as your GitHub account so your commits link to your GitHub profile.

## Set up an SSH key (don't type your GitHub password)

GitHub no longer accepts a plain password over the command line. Set up an SSH key once, and every `clone`/`push`/`pull` over SSH authenticates automatically:

```bash
ssh-keygen -t ed25519 -C "you@umd.edu"
```
Press enter through the prompts (default file location, passphrase optional). Then print the public key:
```bash
cat ~/.ssh/id_ed25519.pub
```
Copy the output, and paste it into GitHub: **Settings → SSH and GPG keys → New SSH key**.

Test it:
```bash
ssh -T git@github.com
```
Expected: `Hi <your-username>! You've successfully authenticated...`

## GUI clients — optional, but fine

Everything in this wiki is a terminal command, because that's what works everywhere — scripting, SSH, and Overleaf-git (see [06 — Overleaf](06-Overleaf.md)) all assume it. But you don't have to type commands if you'd rather click:

- **[GitHub Desktop](https://desktop.github.com/)** — free, simple, covers the everyday commit/push/pull/branch workflow.
- **Tower, GitKraken, GitLens (Pro)** — free or discounted through the **[GitHub Student Developer Pack](https://education.github.com/pack)** if you're a student — worth grabbing even if you mostly use the terminal, since the Pack also includes GitHub Pro perks.

A GUI is a layer over the same underlying commands — knowing the commands means you're never stuck when the GUI can't do what you need.

Next: [02 — Local basics](02-LocalBasics.md)
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/01-InstallAndSetup.md`
Expected: `5` (one `#` title + four `##` sections)

- [ ] **Step 3: Commit**

```bash
git add Git/01-InstallAndSetup.md
git commit -m "Add install-and-setup page to quickstart git wiki"
```

---

## Task 3: `Git/02-LocalBasics.md`

**Files:**
- Create: `Git/02-LocalBasics.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/02-LocalBasics.md`, linked from `README.md`'s Pages table, from Task 2's "Next" link, and from Task 4's "Next" link.
- Consumes: links back to `01-InstallAndSetup.md` (Task 2) and forward to `03-GitHubAndRemotes.md` (Task 4).

- [ ] **Step 1: Write the file**

Create `Git/02-LocalBasics.md` with this exact content:

````markdown
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
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/02-LocalBasics.md`
Expected: `7` (one `#` title + six `##` sections)

- [ ] **Step 3: Commit**

```bash
git add Git/02-LocalBasics.md
git commit -m "Add local-basics page to quickstart git wiki"
```

---

## Task 4: `Git/03-GitHubAndRemotes.md`

**Files:**
- Create: `Git/03-GitHubAndRemotes.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/03-GitHubAndRemotes.md`, linked from `README.md`'s Pages table, from Task 3's "Next" link, and from Task 5's "Next" link.
- Consumes: links back to `02-LocalBasics.md` (Task 3) and forward to `04-BranchesAndMerging.md` (Task 5) and `05-Collaboration.md` (Task 6).

- [ ] **Step 1: Write the file**

Create `Git/03-GitHubAndRemotes.md` with this exact content:

````markdown
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
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/03-GitHubAndRemotes.md`
Expected: `7` (one `#` title + six `##` sections)

- [ ] **Step 3: Commit**

```bash
git add Git/03-GitHubAndRemotes.md
git commit -m "Add github-and-remotes page to quickstart git wiki"
```

---

## Task 5: `Git/04-BranchesAndMerging.md`

**Files:**
- Create: `Git/04-BranchesAndMerging.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/04-BranchesAndMerging.md`, linked from `README.md`'s Pages table, from Task 4's "Next" link, and from Task 6's "Next" link. Its `## When it's not automatic: conflicts` section is also linked to by anchor (`#when-its-not-automatic-conflicts`) from `06-Overleaf.md` (Task 7).
- Consumes: links back to `03-GitHubAndRemotes.md` (Task 4) and forward to `05-Collaboration.md` (Task 6).

- [ ] **Step 1: Write the file**

Create `Git/04-BranchesAndMerging.md` with this exact content:

````markdown
# 04 — Branches, merging, and resolving conflicts

## Why branch

A **branch** is an independent line of work — you can try something (a new figure, a big rewrite) without touching `main` until it's ready. Every repo starts with one branch, usually `main`.

```bash
git branch experiment        # create a new branch
git switch experiment         # move onto it
# ...make commits...
git switch main                # back to main, experiment's commits untouched
```
(`git checkout experiment` also works — `switch` is the newer, clearer command for changing branches.)

## Merging

Once a branch is ready, fold its commits into another branch:
```bash
git switch main
git merge experiment
```
If `experiment`'s changes don't overlap with anything `main` changed in the meantime, this is instant and automatic.

## When it's not automatic: conflicts

A **conflict** happens when the branch you're merging in and the branch you're merging into both changed the *same lines* of the *same file*. Git can't guess which version you want, so it stops and asks you.

This is the moment beginners freeze — here's exactly what to do.

**1. Git tells you there's a conflict**, and marks the file:
```
Auto-merging notes.md
CONFLICT (content): Merge conflict in notes.md
Automatic merge failed; fix conflicts and then commit the result.
```

**2. Open the file.** Git has inserted conflict markers around the disputed lines:
```
<<<<<<< HEAD
This is what's on your current branch.
=======
This is what's on the branch you're merging in.
>>>>>>> experiment
```
- Everything between `<<<<<<< HEAD` and `=======` is **your current branch's version**.
- Everything between `=======` and `>>>>>>> experiment` is **the incoming branch's version**.

**3. Edit the file by hand to the version you actually want.** That might be one side, the other, a combination of both, or something new entirely — Git doesn't decide this, you do. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` marker lines too; they're not part of the file, just Git's way of showing you the dispute.

**4. Tell Git it's resolved, and commit:**
```bash
git add notes.md
git commit -m "Merge experiment, resolve notes.md conflict"
```
The commit closes out the merge — the file is now whatever you edited it to in step 3.

**5. If you get stuck or want to bail out**, abort and go back to before the merge started:
```bash
git merge --abort
```
Nothing is lost — this just undoes the in-progress merge, leaving both branches exactly as they were.

## When the group actually branches

Solo repos (a paper's data repo, written by one person) commit straight to `main` — see [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement)'s convention. Branch when more than one person is editing the same repo at the same time, or when you want review before something lands on `main` — see [05 — Collaboration](05-Collaboration.md) for pull requests.

## Quick reference

| Command | What it does |
|---|---|
| `git branch <name>` | Create a new branch |
| `git switch <name>` | Move onto a branch |
| `git merge <name>` | Fold a branch's commits into your current branch |
| `git merge --abort` | Bail out of a conflicted merge, no harm done |

Next: [05 — Collaboration](05-Collaboration.md)
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/04-BranchesAndMerging.md`
Expected: `7` (one `#` title + five `##` sections + one `# ...make commits...` bash comment line inside a code block, which also starts with `#`)

- [ ] **Step 3: Verify the conflict-section anchor text matches what `06-Overleaf.md` will link to**

Run: `grep -n "^## When it's not automatic: conflicts" Git/04-BranchesAndMerging.md`
Expected: one matching line — this exact heading text is what GitHub's slugger turns into the anchor `#when-its-not-automatic-conflicts`, referenced from Task 7.

- [ ] **Step 4: Commit**

```bash
git add Git/04-BranchesAndMerging.md
git commit -m "Add branches-and-merging page to quickstart git wiki"
```

---

## Task 6: `Git/05-Collaboration.md`

**Files:**
- Create: `Git/05-Collaboration.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/05-Collaboration.md`, linked from `README.md`'s Pages table, from Task 5's "Next" link, and from Task 7's "Next" link.
- Consumes: links back to `04-BranchesAndMerging.md` (Task 5) and forward to `06-Overleaf.md` (Task 7).

- [ ] **Step 1: Write the file**

Create `Git/05-Collaboration.md` with this exact content:

````markdown
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
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/05-Collaboration.md`
Expected: `7` (one `#` title + five `##` sections + one `# ...make commits...` bash comment line inside a code block, which also starts with `#`)

- [ ] **Step 3: Commit**

```bash
git add Git/05-Collaboration.md
git commit -m "Add collaboration page to quickstart git wiki"
```

---

## Task 7: `Git/06-Overleaf.md`

**Files:**
- Create: `Git/06-Overleaf.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/06-Overleaf.md`, linked from `README.md`'s Pages table and from Task 6's "Next" link. Links to `04-BranchesAndMerging.md` both plainly and via the `#when-its-not-automatic-conflicts` anchor (verified to exist in Task 5, Step 3).
- Consumes: links back to `05-Collaboration.md` (Task 6) and forward to `Example-FirstRepoWalkthrough.md` (Task 8).

- [ ] **Step 1: Write the file**

Create `Git/06-Overleaf.md` with this exact content:

````markdown
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
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/06-Overleaf.md`
Expected: `7` (one `#` title + six `##` sections)

- [ ] **Step 3: Commit**

```bash
git add Git/06-Overleaf.md
git commit -m "Add overleaf page to quickstart git wiki"
```

---

## Task 8: `Git/Example-FirstRepoWalkthrough.md`

**Files:**
- Create: `Git/Example-FirstRepoWalkthrough.md`

**Interfaces:**
- Produces: a page reachable at relative path `Git/Example-FirstRepoWalkthrough.md`, linked from `README.md`'s Pages table and from Task 7's "Next" link. Its cheat-sheet table links back to every page (`00`–`06`) by anchor-free relative path.
- Consumes: links back to `../README.md#pages` and to every page `00`–`06` (all already exist by this point).

- [ ] **Step 1: Write the file**

Create `Git/Example-FirstRepoWalkthrough.md` with this exact content:

````markdown
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
git switch main                # you were left on try-a-pr after step 4
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
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' Git/Example-FirstRepoWalkthrough.md`
Expected: `7` (one `#` title + six `##` sections)

- [ ] **Step 3: Commit**

```bash
git add Git/Example-FirstRepoWalkthrough.md
git commit -m "Add first-repo walkthrough example to quickstart git wiki"
```

---

## Task 9: `README.md`

**Files:**
- Modify: `README.md` (does not exist yet — full creation)

**Interfaces:**
- Produces: the repo's index page. Links to all eight pages created in Tasks 1–8, plus external links to `ScientificDataManagement`, `ScientificPresentations`, `ScientificGraphicDesign`, `ScientificWriting`, and `JqiNanoBeamerTemplate`.
- Consumes: nothing new — this is the task that ties the already-created pages together.

- [ ] **Step 1: Write the file**

Create `README.md` with this exact content:

````markdown
# QuickStart Git

## Forewords

Every other wiki in this org — [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement), [ScientificPresentations](https://github.com/JQInanophotonics/ScientificPresentations), and the future ScientificWriting — assumes you already know Git: cloning a repo, committing changes, pushing to GitHub. This repo is where that assumption gets filled in, from zero. If you've never used version control before, you're in the right place.

Read the pages in order the first time — each builds on the last; use them, and the rules below, as a checklist afterwards — same spirit as [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement). If you want an interactive, visual way to see branching and merging before reading about it, [Learn Git Branching](https://learngitbranching.js.org) is an excellent 15-minute sandbox — worth doing alongside [04 — Branches and merging](Git/04-BranchesAndMerging.md).

## The rules, in one screen

1. **Git tracks snapshots of your files over time** — commit often, in small logical chunks, with a short present-tense message. See [00](Git/00-WhatIsGitAndWhy.md).
2. **Set up once per machine**: install Git, set your identity (`git config --global user.name/email`), and set up an SSH key for GitHub — never a typed password. See [01](Git/01-InstallAndSetup.md).
3. **`git status` before anything you're unsure about.** It always tells you what state you're in. See [02](Git/02-LocalBasics.md).
4. **Never commit secrets, large binaries, or generated files** — `.gitignore` them (see [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement) for Git LFS on the exceptions). See [02](Git/02-LocalBasics.md).
5. **Pull before you push.** If you and someone else touch the same file, use a branch + pull request rather than racing to push to `main`. See [03](Git/03-GitHubAndRemotes.md) and [04](Git/04-BranchesAndMerging.md).
6. **GUI clients are fine** — GitHub Desktop (free), or Tower/GitKraken/GitLens Pro (free via the [GitHub Student Developer Pack](https://education.github.com/pack)) — but know the underlying commands, since Overleaf-git and scripting need the terminal. See [01](Git/01-InstallAndSetup.md).
7. **Overleaf-git is a single branch that *is* the web editor.** No separate branch — whatever you push becomes what's on Overleaf, and whatever's on Overleaf is what you pull. Turn off auto-fetch/auto-sync tooling while anyone is actively editing in the Overleaf web UI. See [06](Git/06-Overleaf.md).

## Pages

| Page | What it covers |
|------|-----------------|
| [00 — What is Git, and why do we use it?](Git/00-WhatIsGitAndWhy.md) | Snapshots vs. sync, staging/commits/repos, why the group uses it |
| [01 — Install and set up](Git/01-InstallAndSetup.md) | Installing Git, identity, SSH keys, GUI clients, Student Developer Pack |
| [02 — Local basics](Git/02-LocalBasics.md) | `init`/`status`/`add`/`commit`/`log`/`diff`, `.gitignore` |
| [03 — GitHub and remotes](Git/03-GitHubAndRemotes.md) | Cloning, creating a repo on GitHub, `push`/`pull`, public vs. private |
| [04 — Branches and merging](Git/04-BranchesAndMerging.md) | Branching, merging, and a full conflict-resolution walkthrough |
| [05 — Collaboration](Git/05-Collaboration.md) | Pull requests, issues, forks, template repositories |
| [06 — Overleaf](Git/06-Overleaf.md) | Syncing a paper with Overleaf's Git integration, resolving Overleaf conflicts |
| [Example — a first repo, start to finish](Git/Example-FirstRepoWalkthrough.md) | Hands-on practice repo + full command cheat-sheet |

## What's in this repo

```
QuickStartGit/
├── README.md
└── Git/
    ├── 00-WhatIsGitAndWhy.md
    ├── 01-InstallAndSetup.md
    ├── 02-LocalBasics.md
    ├── 03-GitHubAndRemotes.md
    ├── 04-BranchesAndMerging.md
    ├── 05-Collaboration.md
    ├── 06-Overleaf.md
    └── Example-FirstRepoWalkthrough.md
```

No binary assets live here — the hands-on practice page has you create your own throwaway repo instead of shipping one to maintain.

## See also

This repo is the prerequisite for every other wiki in the org: [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement), [ScientificPresentations](https://github.com/JQInanophotonics/ScientificPresentations), [ScientificGraphicDesign](https://github.com/JQInanophotonics/ScientificGraphicDesign), [ScientificWriting](https://github.com/JQInanophotonics/ScientificWriting), [JqiNanoBeamerTemplate](https://github.com/JQInanophotonics/JqiNanoBeamerTemplate).
````

- [ ] **Step 2: Verify the file was written correctly**

Run: `grep -c '^#' README.md`
Expected: `6` (one `#` title + five `##` sections)

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Write full README index for quickstart git wiki"
```

---

## Task 10: Verify all internal links resolve

**Files:**
- None created or modified — verification only. If broken links are found, fix them in the relevant file from Tasks 1–9 and re-stage/commit as a fix.

**Interfaces:**
- Consumes: every file created in Tasks 1–9.
- Produces: confirmation that the wiki is internally consistent — the deliverable of this plan.

- [ ] **Step 1: Run a link-resolution check over every Markdown file**

Run this from the repo root:

```bash
python3 - <<'EOF'
import re, pathlib

root = pathlib.Path(".")
files = [root / "README.md"] + sorted((root / "Git").glob("*.md"))
link_re = re.compile(r"\[[^\]]*\]\(([^)]+)\)")

broken = []
for f in files:
    text = f.read_text()
    for target in link_re.findall(text):
        if target.startswith(("http://", "https://")):
            continue  # external links, not checked here
        path_part = target.split("#", 1)[0]
        if not path_part:
            continue  # pure in-page anchor
        resolved = (f.parent / path_part).resolve()
        if not resolved.is_file():
            broken.append((str(f), target, str(resolved)))

if broken:
    print("BROKEN LINKS:")
    for f, target, resolved in broken:
        print(f"  {f}: '{target}' -> {resolved} (missing)")
else:
    print(f"All internal links resolve OK across {len(files)} files.")
EOF
```

Expected output: `All internal links resolve OK across 9 files.`

If it reports broken links, open the listed file, fix the link target, save, and re-run this step until it passes.

- [ ] **Step 2: Confirm the internal anchor link is accurate**

`06-Overleaf.md` links twice to `04-BranchesAndMerging.md#when-its-not-automatic-conflicts`. The link-resolution script above only checks the file exists, not the anchor. Confirm the heading that produces this anchor is present and spelled exactly as expected:

```bash
grep -n "^## When it's not automatic: conflicts" Git/04-BranchesAndMerging.md
```

Expected: one matching line. GitHub's Markdown renderer slugs `"When it's not automatic: conflicts"` (lowercase, spaces→hyphens, punctuation stripped) to `when-its-not-automatic-conflicts`, matching the anchor used in `06-Overleaf.md`.

- [ ] **Step 3: Review the full page list renders sensibly**

Run: `find . -name '*.md' -not -path './docs/*' | sort`
Expected:
```
./Git/00-WhatIsGitAndWhy.md
./Git/01-InstallAndSetup.md
./Git/02-LocalBasics.md
./Git/03-GitHubAndRemotes.md
./Git/04-BranchesAndMerging.md
./Git/05-Collaboration.md
./Git/06-Overleaf.md
./Git/Example-FirstRepoWalkthrough.md
./README.md
```

- [ ] **Step 4: Final commit (only if Step 1 required fixes)**

If no fixes were needed, skip this step — Task 9's commit is the final state. If fixes were made in Step 1:

```bash
git add -A
git commit -m "Fix broken internal links in quickstart git wiki"
```

---

## Self-Review Notes

- **Spec coverage:** Every section of the design doc (`docs/superpowers/specs/2026-07-03-quickstart-git-design.md`) maps to a task — Forewords/rules/Pages table/tree/See-also all in Task 9; the eight content pages in Tasks 1–8, each matching its planned section exactly (concepts in 00, setup+GUI+Student Pack in 01, local workflow in 02, GitHub/remotes/public-private in 03, branching+the conflict walkthrough in 04, PRs/issues/templates in 05, Overleaf single-branch/track-changes/auto-fetch/conflict-in-context in 06, hands-on exercise+cheat-sheet in the Example page); the flagged sibling-README follow-up is explicitly out of scope per the spec and is not a task here.
- **Placeholder scan:** No `TBD`/`TODO` anywhere — every page ships complete, real content, unlike `ScientificPresentations`'s intentionally-placeholder Example page (this repo's Example page didn't need to be a placeholder, since the "reference talk" problem doesn't apply — any reader can do the walkthrough with their own throwaway repo).
- **Type/interface consistency:** Link targets are consistent throughout — every page uses the same relative-path convention (`Git/...` from `README.md`, bare filename between sibling pages in `Git/`, `../README.md#pages` from within `Git/`), verified mechanically in Task 10 rather than by inspection alone. The one anchor link (`04-BranchesAndMerging.md#when-its-not-automatic-conflicts`) is verified by exact heading-text grep in both Task 5 (at creation) and Task 10 (final check).
