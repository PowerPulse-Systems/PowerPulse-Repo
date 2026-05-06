# 🚀 PowerPulse Systems: The Practical Git Workflow Guide

Welcome to the PowerPulse workflow! Instead of just throwing theory and definitions at you, this document is designed as a **step-by-step tutorial scenario**. We will walk through exactly what a day in the life of a developer (let's say, Sithum) looks like when interacting with this repository.

---

## 🛠️ Phase 1: The First-Time Setup

You just joined the team or got a new laptop. You need the code.

**Step 1: Clone the Repository to your computer**
```bash
git clone https://github.com/PowerPulse-Systems/PowerPulse-Repo.git
```

**Step 2: Go into your new folder**
```bash
cd PowerPulse-Repo
```
*You only need to do Phase 1 once per computer.*

---

## 🎬 Phase 2: The Daily Grind (The "Sithum" Scenario)

Let's imagine you (Sithum) have been assigned to build a new backend authentication feature. Here is exactly how to do it without breaking the project.

### Step 1: Get the Latest Code
Before you start typing any code, you need to make sure you have what your team did yesterday. We use `develop` as our main team branch.

```bash
# Make sure you are on the develop branch
git checkout develop

# Pull down any new changes your team made while you were sleeping
git pull origin develop
```

### Step 2: Create a Feature Branch (Your Sandbox)
NEVER work directly on `develop` or `main`. Let's create a safe bubble for your work. We'll name it `backend/sithum`.

```bash
# Create and switch to a new branch
git checkout -b backend/sithum
```

### Step 3: Write Code & Save It (Commit)
You write some amazing code. Now it's time to "Save" your progress into Git history.

```bash
# Check what files you actually modified
git status

# Add all your changed files to the "staging area" (getting them ready)
git add .

# Wrap them up in a commit with a message describing what you did
git commit -m "feat(backend): add login authentication route"
```

### Step 4: Back It Up to the Cloud (Push)
Your code is saved on your laptop, but the team can't see it yet. Push it to GitHub!

```bash
# The '-u' links your local branch to GitHub for the first time
git push -u origin backend/sithum
```
*(Next time you push on this branch, you can just type `git push`)*

---

## 🚨 Phase 3: "Oops!" (Handling Mistakes)

Let's pause the scenario. What happens if you make a mistake?

**Scenario A: You committed, but haven't pushed yet.**
"I misspelled a variable in the commit I just made!"
```bash
# Undoes the commit, but KEEPS your code changes in your editor so you can fix them
git reset --soft HEAD~1
```

**Scenario B: You already pushed it to GitHub.**
"I broke the server and pushed it. I need to undo that commit safely."
```bash
# Find the commit hash (e.g., a1b2c3d)
git log --oneline

# This creates a NEW commit that does the exact opposite of your mistake
git revert <commit-hash>
git push
```

---

## 🔄 Phase 4: Syncing With The Team (Mid-Feature Update)

You've been working on `backend/sithum` for 3 days. Meanwhile, your teammate merged a massive database update into `develop`. You need their database update in your branch.

```bash
# 1. Step out of your branch and go back to develop
git checkout develop

# 2. Download your teammate's new database code
git pull origin develop

# 3. Go back to your feature branch
git checkout backend/sithum

# 4. Mash (merge) the new develop code into your current branch
git merge develop
```
*Note: If Git says "Merge Conflict", it means you and your teammate edited the exact same line of code. Open your editor (VS Code), accept the changes you want, save the files, and run `git add .` then `git commit`.*

---

## 🏁 Phase 5: The Finish Line (Pull Request)

You finished the authentication feature. It works perfectly. You've ran `git push`. Now you need to merge `backend/sithum` into `develop` so the rest of the team can use it.

1. Open your web browser and go to your repo: **[PowerPulse-Repo on GitHub](https://github.com/PowerPulse-Systems/PowerPulse-Repo)**.
2. GitHub is smart and will usually show a green banner: **"backend/sithum had recent pushes. Compare & pull request."** Click it!
   * *(If you don't see it, click the "Pull requests" tab, then "New pull request".)*
3. Set the **base** branch to `develop`.
4. Set the **compare** branch to `backend/sithum`.
5. Fill out the Title & Description:
   * **Title:** `feat: added backend authentication logic`
   * **Description:** Explain what you did, and how your team can test it.
6. Click **Create pull request**.
7. Wait for a teammate to approve it, then click the **Merge pull request** button! 

🎉 **Done! You just successfully contributed to PowerPulse Systems.**
