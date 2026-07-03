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
