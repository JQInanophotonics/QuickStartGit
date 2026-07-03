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

## You don't have to edit raw markers by hand

Everything above works in any plain text editor, which is why it's worth knowing — but several tools give you a friendlier interface over the exact same process:

- **VS Code** (free) has a built-in 3-way merge editor: open a conflicted file and it shows "Accept Current Change / Incoming Change / Both Changes" links right above each conflict, plus a side-by-side view. No extra install — this ships with the editor.
- **GitKraken** and **Tower** (see [01 — Install and set up](01-InstallAndSetup.md)) both have dedicated visual conflict resolvers — pick a side or a line-by-line combination by clicking, not typing.

Under the hood, all of these do exactly steps 2–4 above: resolve the markers, stage the file, commit. Use whichever interface you're comfortable with — the underlying Git history ends up identical either way.

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
