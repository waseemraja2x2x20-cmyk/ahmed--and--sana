# Workflow Guide

This repository supports an Ahmed & Sana 2D animation pipeline from source art to final export.

## 1) Source and reference

- Keep canonical visual reference in `references/character-sheet.png`.
- Keep editable source art under `characters/`.
- Keep production rig files under `puppets/`.

`project.json` is the source of truth for path conventions and quality checks.

## 2) Asset production

- Build reusable facial/gesture assets in `assets/`.
- Build expression variations in `animation/expressions/`.
- Build walk cycles in `animation/walks/`.
- Build gestures in `animation/gestures/`.

## 3) Scene production

- Scene root: `animation/scenes/`.
- Current planned scene folders are listed in `project.json` under `scenes.current_scenes`.
- Scripts live in `scripts/scene-NN.md`.
- Audio sources live in `audio/dialogue/`, `audio/music/`, and `audio/sfx/`.

## 4) Export policy (tracked vs untracked)

- `exports/previews/` and `exports/final/` are scaffolded and tracked with `.gitkeep`.
- Actual rendered binaries (video/audio) remain untracked by `.gitignore`.
- Keep only directory placeholders in Git unless explicitly requested otherwise.

## 5) Validation workflow

- Pull requests run `.github/workflows/validation.yml`.
- Validation checks:
  - `project.json` is valid JSON.
  - Referenced directories/files exist (or are explicitly `null`).
  - `scenes.current_scenes` matches real folders under `animation/scenes/`.
