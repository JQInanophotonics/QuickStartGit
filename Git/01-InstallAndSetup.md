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
