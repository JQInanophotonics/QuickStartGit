# QuickStartGit poor-boy wiki — design

## Purpose

Turn this repo into the org's Git on-ramp — plain Markdown, no build step,
no separate wiki repo — teaching true beginners (no prior version-control
experience) how to:

1. Understand what Git actually does (snapshots, staging, commits) and why
   the group standardizes on it.
2. Set up Git and GitHub once per machine (identity, SSH keys, optional
   GUI clients).
3. Use the local workflow (`add`/`commit`/`log`/`diff`) and the remote one
   (`clone`/`push`/`pull`, creating a repo on GitHub).
4. Branch, merge, and — the skill beginners freeze on most — resolve
   conflicts.
5. Collaborate via pull requests and issues.
6. Apply all of the above to sync an Overleaf LaTeX project via Overleaf's
   Git integration (Overleaf Pro plan).

It follows the same pattern already established by
[`ScientificDataManagement`](https://github.com/JQInanophotonics/ScientificDataManagement)
and [`ScientificPresentations`](https://github.com/JQInanophotonics/ScientificPresentations):
a `README.md` that is a one-screen index + rules summary — written so
someone can get the whole picture from the README alone without opening a
single page — with the actual depth as numbered Markdown pages in a topic
subfolder.

## Audience

True beginners: assume zero prior exposure to version control. Explain
concepts before commands, and don't assume familiarity with terms like
"repository" or "diff."

## Non-goals

- No native GitHub Wiki, no static site generator (mkdocs/Docusaurus).
  Every sibling repo in the org uses plain in-repo Markdown; stay
  consistent.
- No duplication of GitHub's own documentation — link out for exhaustive
  reference (e.g., full GitHub Docs, `gh` CLI docs) rather than
  re-explaining every UI screen.
- No advanced Git (rebase, cherry-pick, submodules, reflog surgery). This
  is a quick start, not a full manual — advanced topics are out of scope
  unless a later page needs to be added.
- No binary/example assets committed to this repo. The hands-on practice
  page has the reader create their *own* throwaway local + personal
  GitHub repo rather than shipping a sandbox repo to maintain here.

## Repo structure

```
QuickStartGit/
├── README.md                              # index + one-screen summary
└── Git/
    ├── 00-WhatIsGitAndWhy.md              # concepts: snapshots, staging, commits, local vs remote
    ├── 01-InstallAndSetup.md              # install, git config, SSH keys, GUI clients, Student Pack
    ├── 02-LocalBasics.md                  # init, status, add, commit, log, diff, .gitignore
    ├── 03-GitHubAndRemotes.md             # create repo on GitHub, clone, remote, push/pull, public/private
    ├── 04-BranchesAndMerging.md           # branch, merge, conflict-resolution walkthrough
    ├── 05-Collaboration.md                # pull requests, issues, forks, template repos
    ├── 06-Overleaf.md                     # Overleaf Git integration, single-branch model, conflicts
    └── Example-FirstRepoWalkthrough.md    # hands-on end-to-end exercise + command cheat-sheet
```

## `README.md` content

- **Forewords** — what Git is for in one paragraph; why the group
  standardizes on it (every other wiki — data, presentations, writing —
  assumes the reader already knows Git); this repo is the prerequisite
  on-ramp; explicitly welcomes true beginners.
- **The rules, in one screen** — written to be fully useful standalone
  (bold lead phrase + one sentence per rule), each linking to its page for
  readers who want depth:
  1. **Git tracks snapshots of your files over time** — commit often, in
     small logical chunks, with a short present-tense message.
  2. **Set up once per machine**: install Git, set your identity
     (`git config --global user.name/email`), and set up an SSH key for
     GitHub — never a typed password.
  3. **`git status` before anything you're unsure about.** It always tells
     you what state you're in.
  4. **Never commit secrets, large binaries, or generated files** —
     `.gitignore` them (see
     [ScientificDataManagement](https://github.com/JQInanophotonics/ScientificDataManagement)
     for Git LFS on the exceptions).
  5. **Pull before you push.** If you and someone else touch the same
     file, use a branch + pull request rather than racing to push to
     `main`.
  6. **GUI clients are fine** — GitHub Desktop (free), or Tower/GitKraken/
     GitLens Pro (free via the
     [GitHub Student Developer Pack](https://education.github.com/pack))
     — but know the underlying commands, since Overleaf-git and scripting
     need the terminal.
  7. **Overleaf-git is a single branch that *is* the web editor.** No
     separate branch — whatever you push becomes what's on Overleaf, and
     whatever's on Overleaf is what you pull. Turn off any auto-fetch/
     auto-sync git tooling (VS Code's `Git: Autofetch`, GitLens
     auto-fetch, etc.) while anyone is actively editing in the Overleaf
     web UI — each auto-fetch against a live-editing session can flood
     the project history with small sync commits.
- **Pages table** — one row per page in `Git/`, same format as siblings.
- **What's in this repo** — the tree above.
- **See also** — sibling wikis (`ScientificDataManagement`,
  `ScientificPresentations`, `ScientificGraphicDesign`,
  `ScientificWriting` once it exists), `JqiNanoBeamerTemplate`, with a note
  that this repo is the prerequisite for all of them.

## Page content

### `00-WhatIsGitAndWhy.md`

- Mental model: snapshots over time, not "track changes"/Dropbox-style
  continuous sync.
- The four places a change lives: working directory → staging area →
  commit → repository (local), then repository → remote (GitHub).
- Why the group uses it: reproducibility of data/paper repos, safe
  experimentation, collaboration without emailing zip files.
- Local (your machine) vs. remote (GitHub) — the distinction beginners
  most often blur.

### `01-InstallAndSetup.md`

- Install Git (platform-specific pointers).
- `git config --global user.name "..."` / `user.email "..."`.
- Generate an SSH key and add it to GitHub — never authenticate with a
  typed password.
- GUI clients as a convenience layer over the same commands: GitHub
  Desktop (free), and — via the
  [GitHub Student Developer Pack](https://education.github.com/pack) —
  free/discounted Tower, GitKraken, GitLens Pro.

### `02-LocalBasics.md`

- `git init`, `status`, `add`, `commit`, `log`, `diff`.
- `.gitignore` basics (minimal — local clutter only, see
  `ScientificDataManagement`'s convention for the fuller pattern).
- First hands-on mini-loop: create a file, commit it, change it, `diff`,
  commit again — small enough to do inline on this page.

### `03-GitHubAndRemotes.md`

- Creating a repo on GitHub.
- `clone` vs. `init` + `remote add`.
- `push` / `pull`.
- Public vs. private — tie to the org convention already documented in
  `ScientificDataManagement` (private while in prep, public at
  publication).
- Forking, briefly (full treatment lands in `05-Collaboration.md`).

### `04-BranchesAndMerging.md`

- Why/when to branch; `branch`, `checkout`/`switch`, `merge`.
- **Conflict-resolution walkthrough** (the anchor section of this page):
  what a conflict actually looks like (`<<<<<<<` / `=======` / `>>>>>>>`
  markers), how to read "theirs vs. mine," how to edit to the resolution
  you want, `git add` + commit to close it out. Paced for someone who has
  never seen this before.
- When the group actually branches vs. commits straight to `main` —
  observed practice: solo paper-data repos (`ScientificDataManagement`)
  commit direct to `main`; shared/collaborative repos should branch + PR.

### `05-Collaboration.md`

- Pull requests: opening one, what a review looks like, merging.
- Issues, briefly.
- Forking vs. org membership/write access.
- GitHub's "template repository" feature, tied to the group's existing
  use of it in `JqiNanoBeamerTemplate`.

### `06-Overleaf.md`

- Overleaf's Git integration (Menu → Integrations → Git; requires
  Overleaf Pro/Professional — the group has this plan). Exact current UI
  labels/steps (token generation, menu path) to be verified against
  Overleaf's live documentation when this page is actually written, since
  UI details drift over time.
- Single-branch model: the Overleaf remote *is* the web editor's state —
  no separate branches synced independently.
- Disabling auto-fetch/auto-sync tooling while live-editing on the
  Overleaf web UI, to avoid flooding the project history with sync
  commits.
- **Overleaf-specific conflict walkthrough**: pulling Overleaf web edits
  against local changes to the same `.tex` file — same resolution steps
  as `04-BranchesAndMerging.md`, applied to this concrete scenario.

### `Example-FirstRepoWalkthrough.md`

- Hands-on exercise, following the "worked example" convention of
  `Example-CLEOus.md` / `Example-OctaveSelfKIS.md` in the sibling repos:
  1. Create a scratch local repo.
  2. Create a throwaway personal GitHub repo (not in the org).
  3. Do the full loop: commit, branch, deliberately create and resolve a
     conflict, merge, push, pull, open a PR against yourself.
  4. Delete the throwaway repo when done.
- Ends with a compact command cheat-sheet covering every command used
  across all pages.

## Related fix (flagged, out of scope for this project)

The sibling READMEs (`ScientificDataManagement`, `ScientificPresentations`,
`ScientificGraphicDesign`) don't currently link to `QuickStartGit`. Once
this repo exists, their "See also" sections should point here as the
prerequisite. Not part of this implementation — call out separately, same
handling as the `ScientificGraphicDesign` broken-link follow-up noted in
`ScientificPresentations`'s design doc.

## Open items

- Overleaf UI specifics (exact menu path, token generation steps, current
  name of any auto-fetch-equivalent setting) need verification against
  Overleaf's live documentation at write time — not assumed accurate from
  memory in this spec.
