<div align="center">

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/header.svg"/><img src="assets/header.svg" width="97%" alt="QuickStart Git"/></picture>

<a href="#pages"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/PAGES-0d1117?style=flat-square&logoColor=ffffff"/><img src="https://img.shields.io/badge/PAGES-ffffff?style=flat-square&logoColor=1a1a1a" alt="Pages"/></picture></a>
<a href="https://github.com/JQInanophotonics/ScientificGraphicDesign"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/GRAPHIC%20DESIGN-0d1117?style=flat-square&logoColor=ffffff"/><img src="https://img.shields.io/badge/GRAPHIC%20DESIGN-ffffff?style=flat-square&logoColor=1a1a1a" alt="ScientificGraphicDesign"/></picture></a>
<a href="https://github.com/JQInanophotonics/ScientificPresentations"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/PRESENTATIONS-0d1117?style=flat-square&logoColor=ffffff"/><img src="https://img.shields.io/badge/PRESENTATIONS-ffffff?style=flat-square&logoColor=1a1a1a" alt="ScientificPresentations"/></picture></a>

</div>

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-forewords.svg"/><img src="assets/banner-forewords.svg" width="97%" alt="00 — Forewords"/></picture>

Every other wiki in this org — [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement), [ScientificPresentations](https://github.com/JQInanophotonics/ScientificPresentations), and the future ScientificWriting — assumes you already know Git: cloning a repo, committing changes, pushing to GitHub. This repo is where that assumption gets filled in, from zero. If you've never used version control before, you're in the right place.

Read the pages in order the first time — each builds on the last; use them, and the rules below, as a checklist afterwards — same spirit as [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement). If you want an interactive, visual way to see branching and merging before reading about it, [Learn Git Branching](https://learngitbranching.js.org) is an excellent 15-minute sandbox — worth doing alongside [04 — Branches and merging](Git/04-BranchesAndMerging.md).

Everything below is designed to be usable at a glance — the cheat sheet and workflow give you the whole thing in one look; every other section is there to go deeper only when you need to.

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-cheat-sheet.svg"/><img src="assets/banner-cheat-sheet.svg" width="97%" alt="01 — Cheat Sheet"/></picture>

| Command | What it does |
|---|---|
| `git status` | What's changed, staged, or untracked |
| `git add <file>` | Stage a change |
| `git commit -m "..."` | Snapshot staged changes |
| `git log --oneline` | See commit history |
| `git diff` | See unstaged changes, line by line |
| `git clone <url>` | Copy a remote repo, with history |
| `git push` / `git pull` | Sync commits with the remote |
| `git branch <name>` | Create a branch |
| `git switch <name>` | Move onto a branch |
| `git switch -c <name>` | Create + switch to a new branch in one step |
| `git merge <name>` | Fold a branch into your current one |
| `git merge --abort` | Bail out of a conflicted merge, no harm done |

Full list with page references: [Example — command cheat-sheet](Git/Example-FirstRepoWalkthrough.md#command-cheat-sheet).

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-everyday-workflow.svg"/><img src="assets/banner-everyday-workflow.svg" width="97%" alt="02 — Everyday Workflow"/></picture>

**Solo, straight to `main`** (a paper-data repo, working alone):
```
edit files → git status → git add <file> → git commit -m "..." → git pull → git push
```

**Shared repo, or a change you want reviewed** — branch instead of pushing straight to `main`:
```
git switch -c my-branch → edit, commit as above → git push -u origin my-branch
→ open a pull request on GitHub → merge
```

Conflict during a `pull` or `merge`? See [04 — Branches and merging](Git/04-BranchesAndMerging.md#when-its-not-automatic-conflicts) — it's a normal part of the process, not a sign something broke.

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-the-rules.svg"/><img src="assets/banner-the-rules.svg" width="97%" alt="03 — The Rules, in One Screen"/></picture>

1. **Git tracks snapshots of your files over time** — commit often, in small logical chunks, with a short present-tense message. See [00](Git/00-WhatIsGitAndWhy.md).
2. **Set up once per machine**: install Git, set your identity (`git config --global user.name/email`), and set up an SSH key for GitHub — never a typed password. See [01](Git/01-InstallAndSetup.md).
3. **`git status` before anything you're unsure about.** It always tells you what state you're in. See [02](Git/02-LocalBasics.md).
4. **Never commit secrets, large binaries, or generated files** — `.gitignore` them (see [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement) for Git LFS on the exceptions). See [02](Git/02-LocalBasics.md).
5. **Pull before you push.** If you and someone else touch the same file, use a branch + pull request rather than racing to push to `main`. See [03](Git/03-GitHubAndRemotes.md) and [04](Git/04-BranchesAndMerging.md).
6. **GUI clients are fine** — GitHub Desktop (free), or Tower/GitKraken/GitLens Pro (free via the [GitHub Student Developer Pack](https://education.github.com/pack)) — but know the underlying commands, since Overleaf-git and scripting need the terminal. See [01](Git/01-InstallAndSetup.md).
7. **Overleaf-git is a single branch that *is* the web editor.** No separate branch — whatever you push becomes what's on Overleaf, and whatever's on Overleaf is what you pull. Turn off auto-fetch/auto-sync tooling while anyone is actively editing in the Overleaf web UI. See [06](Git/06-Overleaf.md).

<a id="pages"></a>

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-pages.svg"/><img src="assets/banner-pages.svg" width="97%" alt="04 — Pages"/></picture>

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

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-repo-layout.svg"/><img src="assets/banner-repo-layout.svg" width="97%" alt="05 — What's in This Repo"/></picture>

```
QuickStartGit/
├── README.md
├── assets/                    # this README's own banners (light + dark/), not Git content
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

<picture><source media="(prefers-color-scheme: dark)" srcset="assets/dark/banner-see-also.svg"/><img src="assets/banner-see-also.svg" width="97%" alt="06 — See Also"/></picture>

This repo is the prerequisite for every other wiki in the org: [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement), [ScientificPresentations](https://github.com/JQInanophotonics/ScientificPresentations), [ScientificGraphicDesign](https://github.com/JQInanophotonics/ScientificGraphicDesign), [ScientificWriting](https://github.com/JQInanophotonics/ScientificWriting), [JqiNanoBeamerTemplate](https://github.com/JQInanophotonics/JqiNanoBeamerTemplate).
