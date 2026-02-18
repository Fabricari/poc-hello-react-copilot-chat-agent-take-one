# PoC: Using Copilot Chat Agent to Build a React Interaction

This repository documents a proof-of-concept of working with GitHub Copilot Chat as a coding agent to go from an empty folder to a functioning interactive React experience.

The primary experiment was not just the UI itself, but the workflow: prompt → implement → review → refine → commit → push.

## Experiment Objective

Validate whether Copilot Chat can reliably support an iterative front-end build process with:

- local project bootstrapping
- incremental feature delivery from natural-language prompts
- frequent visual tuning loops
- clean local Git checkpointing and GitHub publishing

## What Was Tested with the Agent

### 1) Project initialization workflow

- Initialize local Git repository from an empty workspace.
- Set branch to `main`.
- Create a minimal React + TypeScript + Vite app shell.
- Verify build and run locally.

### 2) Design translation from sketch to implementation

Starting from a hand-drawn mockup, iterate toward a digital version using inline SVG and CSS:

- centered star behind text
- pastel-on-pastel palette with white lettering
- letter-by-letter positioning and styling
- ongoing geometry/color adjustments based on review feedback

### 3) Motion and interaction iteration

- independent per-letter wobble
- configurable wobble timing variables
- baseline star rotation
- pointer interactions:
  - press: pause rotation + scale star down
  - release: restore and resume
- modal reveal on release with embedded YouTube video and 10px white border

### 4) Agent-driven Git workflow

Throughout the session, changes were committed in small checkpoints, then pushed to GitHub.

## Final PoC Behavior (Current State)

The app currently provides a single-view animated lockup with these behaviors:

- SVG star rotates steadily clockwise
- letters wobble independently with randomized timing/angles
- pressing within the lockup hit area pauses star animation and scales the star to 75%
- releasing reverts star size/animation and opens a video modal
- modal supports backdrop click, close button, and `Esc` key dismissal

## Code and Asset Map

- `src/App.tsx` — SVG composition, animation parameter generation, pointer state, modal state
- `src/App.css` — layout, animation keyframes, interaction styles, modal styles
- `assets/hello-world-page-mock-up.jpg` — original sketch used for visual direction
- `assets/specifications.rtf` — supporting notes from the experiment

## Local Run Instructions

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Key Learnings from the Experiment

- Copilot Chat worked well for iterative UI tuning when changes were requested in small steps.
- Explicit constraints ("no backend", "single view", "minimal") helped keep scope tight.
- Frequent commit checkpoints made experimentation safer and easier to reason about.
- For custom text + shape lockups, inline SVG provided better control than plain HTML/CSS text styling.

## Scope Note

This is intentionally a PoC focused on agent-assisted build workflow and rapid iteration, not production hardening.
