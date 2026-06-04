# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite + React + TypeScript frontend for PromptEasy, a prompt management dashboard. Application code lives in `src/`: `App.tsx` contains the current UI, state, localStorage persistence, and prompt CRUD behavior; `main.tsx` mounts React; `styles.css` holds global and component styles; `vite-env.d.ts` contains Vite type declarations. Static entry files and build configuration sit at the root, including `index.html`, `vite.config.ts`, `tsconfig*.json`, and `eslint.config.js`. Production output is generated into `dist/` and should not be edited by hand.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Vite dev server on `0.0.0.0` for local browser testing.
- `npm run build` runs TypeScript project checks with `tsc -b` and creates a production Vite build.
- `npm run lint` runs ESLint over the repository.
- `npm run preview` serves the production build locally for verification.

Run `npm run build` and `npm run lint` before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep component, type, and constant names descriptive: `PromptFormState`, `StatCardProps`, `STORAGE_KEY`, and `starterPrompts` are good local examples. Use PascalCase for React components and types, camelCase for variables/functions, and uppercase snake case for module-level constants. Follow the existing style: two-space indentation, single quotes, semicolons, explicit type definitions for shared data shapes, and hooks imported from React. Keep CSS class names lowercase kebab case or concise semantic names such as `.app-shell`, `.prompt-card`, and `.form-actions`.

## Testing Guidelines

There is currently no test runner or `npm test` script. For now, validate behavior manually through `npm run dev`, and always run `npm run build` plus `npm run lint`. If tests are added, place them near the code they cover using names like `App.test.tsx` or under `src/__tests__/`, and prefer React Testing Library with Vitest to match the Vite stack.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `handled UI responsive` and `Add prompt management MVP interactions`. Keep commit subjects concise, action-oriented, and focused on one change. Pull requests should include a brief description, testing notes with exact commands run, linked issues when applicable, and screenshots or screen recordings for visible UI changes. Mention any localStorage schema changes, dependency additions, or behavior that affects existing saved prompts.
