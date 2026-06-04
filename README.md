# PromptEasy

A starter React + TypeScript UI for a dedicated AI prompt management system. This initial setup focuses on the frontend foundation and mock dashboard experience for:

- Prompt library search
- Prompt categorization
- Analytics overview cards and usage visualization
- AI-assisted prompt enhancement panel



Users can:

- Save prompts with title, category, tags, prompt text, and favorite status
- Organize prompts across Coding, Career, Learning, Travel, Food, and Writing
- Discover frequently used prompts based on copy/reuse count
- Improve rough prompts with a reusable enhancement template
- Reuse prompts quickly with copy-to-clipboard actions

MVP features included:

- Dashboard totals for prompts, favorites, categories, and total reuses
- Prompt CRUD: create, read, update, and delete
- Search by title, tags, category, and prompt text
- Category filtering
- Local Storage persistence for all prompt changes
- React Hooks and component composition through typed reusable UI pieces

## Getting started

```bash
npm install
npm run dev
```

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint checks
- `npm run preview` - preview the production build locally
