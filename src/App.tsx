import type { ChangeEvent, FormEvent, ReactElement, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Bot,
  Clipboard,
  Copy,
  Edit3,
  FolderKanban,
  Heart,
  Library,
  MessageSquarePlus,
  Search,
  Sparkles,
  Star,
  Tags,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import './styles.css';

type PromptCategory = 'Coding' | 'Career' | 'Learning' | 'Travel' | 'Food' | 'Writing';

type Prompt = {
  id: string;
  title: string;
  category: PromptCategory;
  tags: string[];
  content: string;
  favorite: boolean;
  uses: number;
  updatedAt: string;
};

type PromptFormState = {
  title: string;
  category: PromptCategory;
  tags: string;
  content: string;
  favorite: boolean;
};

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  helper: string;
};

const STORAGE_KEY = 'prompteasy.prompts.v1';
const categories: PromptCategory[] = ['Coding', 'Career', 'Learning', 'Travel', 'Food', 'Writing'];

const defaultForm: PromptFormState = {
  title: '',
  category: 'Coding',
  tags: '',
  content: '',
  favorite: false,
};

const starterPrompts: Prompt[] = [
  {
    id: 'prompt-1',
    title: 'React Component Generator',
    category: 'Coding',
    tags: ['react', 'typescript', 'components'],
    content: 'Act as a senior React engineer. Generate a reusable TypeScript component with props, accessibility notes, and styling guidance for: [feature].',
    favorite: true,
    uses: 36,
    updatedAt: '2026-06-01',
  },
  {
    id: 'prompt-2',
    title: 'Bug Investigation Checklist',
    category: 'Coding',
    tags: ['debugging', 'qa', 'root-cause'],
    content: 'Create a bug investigation checklist for this issue. Include reproduction steps, suspected files, logs to inspect, and a minimal fix plan: [issue].',
    favorite: false,
    uses: 28,
    updatedAt: '2026-05-31',
  },
  {
    id: 'prompt-3',
    title: 'API Documentation Explainer',
    category: 'Coding',
    tags: ['api', 'docs', 'examples'],
    content: 'Explain this API endpoint for a junior developer. Cover purpose, parameters, response shape, edge cases, and one realistic example: [endpoint].',
    favorite: true,
    uses: 31,
    updatedAt: '2026-05-30',
  },
  {
    id: 'prompt-4',
    title: 'SQL Query Optimizer',
    category: 'Coding',
    tags: ['sql', 'performance', 'database'],
    content: 'Review this SQL query for performance. Suggest indexes, rewrites, and explain the tradeoffs in plain language: [query].',
    favorite: false,
    uses: 19,
    updatedAt: '2026-05-29',
  },
  {
    id: 'prompt-5',
    title: 'Resume Bullet Rewriter',
    category: 'Career',
    tags: ['resume', 'impact', 'job-search'],
    content: 'Rewrite these resume bullets to emphasize measurable impact, action verbs, and relevance to a [role] position: [bullets].',
    favorite: true,
    uses: 42,
    updatedAt: '2026-05-28',
  },
  {
    id: 'prompt-6',
    title: 'Interview Practice Coach',
    category: 'Career',
    tags: ['interview', 'behavioral', 'practice'],
    content: 'Act as an interview coach. Ask me one behavioral interview question at a time for a [role], then critique my answer using the STAR method.',
    favorite: true,
    uses: 39,
    updatedAt: '2026-05-27',
  },
  {
    id: 'prompt-7',
    title: 'LinkedIn Summary Draft',
    category: 'Career',
    tags: ['linkedin', 'branding', 'profile'],
    content: 'Draft a concise LinkedIn About section for a professional with this background, tone, and target audience: [details].',
    favorite: false,
    uses: 17,
    updatedAt: '2026-05-26',
  },
  {
    id: 'prompt-8',
    title: 'Career Decision Matrix',
    category: 'Career',
    tags: ['decision', 'growth', 'planning'],
    content: 'Build a decision matrix comparing these career options across growth, compensation, lifestyle, learning, and risk: [options].',
    favorite: false,
    uses: 15,
    updatedAt: '2026-05-25',
  },
  {
    id: 'prompt-9',
    title: 'Study Plan Builder',
    category: 'Learning',
    tags: ['study', 'planning', 'skills'],
    content: 'Create a 4-week study plan for learning [topic]. Include daily tasks, practice exercises, review checkpoints, and project ideas.',
    favorite: true,
    uses: 34,
    updatedAt: '2026-05-24',
  },
  {
    id: 'prompt-10',
    title: 'Concept Simplifier',
    category: 'Learning',
    tags: ['explain', 'analogy', 'beginner'],
    content: 'Explain [concept] in three levels: beginner analogy, practical example, and technical explanation. End with a quick quiz.',
    favorite: true,
    uses: 37,
    updatedAt: '2026-05-23',
  },
  {
    id: 'prompt-11',
    title: 'Flashcard Generator',
    category: 'Learning',
    tags: ['flashcards', 'memory', 'review'],
    content: 'Turn these notes into active recall flashcards with questions, concise answers, and difficulty levels: [notes].',
    favorite: false,
    uses: 26,
    updatedAt: '2026-05-22',
  },
  {
    id: 'prompt-12',
    title: 'Learning Project Ideas',
    category: 'Learning',
    tags: ['projects', 'practice', 'portfolio'],
    content: 'Suggest five practical projects to learn [skill]. Rank them by difficulty and include what each project teaches.',
    favorite: false,
    uses: 13,
    updatedAt: '2026-05-21',
  },
  {
    id: 'prompt-13',
    title: 'Weekend Trip Planner',
    category: 'Travel',
    tags: ['itinerary', 'budget', 'weekend'],
    content: 'Plan a weekend trip to [destination] for [budget]. Include itinerary, food options, transit tips, and backup indoor activities.',
    favorite: true,
    uses: 33,
    updatedAt: '2026-05-20',
  },
  {
    id: 'prompt-14',
    title: 'Packing List Assistant',
    category: 'Travel',
    tags: ['packing', 'checklist', 'weather'],
    content: 'Create a packing list for [destination] from [start date] to [end date], considering weather, activities, and luggage limits.',
    favorite: false,
    uses: 22,
    updatedAt: '2026-05-19',
  },
  {
    id: 'prompt-15',
    title: 'Local Experience Finder',
    category: 'Travel',
    tags: ['local', 'culture', 'activities'],
    content: 'Recommend non-touristy local experiences in [city] for someone interested in [interests]. Include timing and neighborhoods.',
    favorite: false,
    uses: 18,
    updatedAt: '2026-05-18',
  },
  {
    id: 'prompt-16',
    title: 'Travel Budget Breakdown',
    category: 'Travel',
    tags: ['budget', 'costs', 'planning'],
    content: 'Estimate a travel budget for [destination] for [days] days. Break down lodging, food, transport, activities, and buffer.',
    favorite: false,
    uses: 12,
    updatedAt: '2026-05-17',
  },
  {
    id: 'prompt-17',
    title: 'Weekly Meal Planner',
    category: 'Food',
    tags: ['meal-plan', 'groceries', 'healthy'],
    content: 'Create a weekly meal plan for [diet preference] with quick dinners, leftovers strategy, and a categorized grocery list.',
    favorite: true,
    uses: 41,
    updatedAt: '2026-05-16',
  },
  {
    id: 'prompt-18',
    title: 'Recipe From Ingredients',
    category: 'Food',
    tags: ['recipe', 'pantry', 'cooking'],
    content: 'Suggest three recipes using these ingredients: [ingredients]. Prioritize simple steps, minimal waste, and substitutions.',
    favorite: false,
    uses: 30,
    updatedAt: '2026-05-15',
  },
  {
    id: 'prompt-19',
    title: 'Restaurant Review Summarizer',
    category: 'Food',
    tags: ['restaurant', 'reviews', 'summary'],
    content: 'Summarize these restaurant reviews into pros, cons, best dishes, service notes, and whether it fits [occasion]: [reviews].',
    favorite: false,
    uses: 16,
    updatedAt: '2026-05-14',
  },
  {
    id: 'prompt-20',
    title: 'Dinner Party Menu',
    category: 'Food',
    tags: ['menu', 'hosting', 'party'],
    content: 'Design a dinner party menu for [guest count] people with dietary restrictions [restrictions]. Include prep schedule and shopping list.',
    favorite: false,
    uses: 11,
    updatedAt: '2026-05-13',
  },
  {
    id: 'prompt-21',
    title: 'Blog Outline Builder',
    category: 'Writing',
    tags: ['blog', 'outline', 'seo'],
    content: 'Create a detailed blog outline for [topic] targeting [audience]. Include headline options, sections, examples, and SEO keywords.',
    favorite: false,
    uses: 29,
    updatedAt: '2026-05-12',
  },
  {
    id: 'prompt-22',
    title: 'Tone Rewriter',
    category: 'Writing',
    tags: ['tone', 'editing', 'rewrite'],
    content: 'Rewrite this text in a [tone] tone while preserving the meaning. Provide three variations and explain when to use each: [text].',
    favorite: false,
    uses: 25,
    updatedAt: '2026-05-11',
  },
  {
    id: 'prompt-23',
    title: 'Newsletter Draft Assistant',
    category: 'Writing',
    tags: ['newsletter', 'email', 'audience'],
    content: 'Draft a newsletter for [audience] about [topic]. Include subject lines, preview text, clear sections, and a call to action.',
    favorite: false,
    uses: 20,
    updatedAt: '2026-05-10',
  },
  {
    id: 'prompt-24',
    title: 'Story Idea Expander',
    category: 'Writing',
    tags: ['creative', 'story', 'ideas'],
    content: 'Expand this story idea into premise, characters, conflict, setting, and three possible endings: [idea].',
    favorite: false,
    uses: 14,
    updatedAt: '2026-05-09',
  },
];

function StatCard({ icon, label, value, helper }: StatCardProps): ReactElement {
  return (
    <article>
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  );
}

function parseTags(tags: string): string[] {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getInitialPrompts(): Prompt[] {
  const storedPrompts = localStorage.getItem(STORAGE_KEY);

  if (!storedPrompts) {
    return starterPrompts;
  }

  try {
    const parsedPrompts = JSON.parse(storedPrompts) as Prompt[];
    return Array.isArray(parsedPrompts) ? parsedPrompts : starterPrompts;
  } catch {
    return starterPrompts;
  }
}

function createPromptId(): string {
  return `prompt-${Date.now()}`;
}

function App(): ReactElement {
  const [prompts, setPrompts] = useState<Prompt[]>(getInitialPrompts);
  const [form, setForm] = useState<PromptFormState>(defaultForm);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'All'>('All');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [enhancerInput, setEnhancerInput] = useState('Write a customer onboarding email for a project management app.');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  }, [prompts]);

  const favoriteCount = useMemo(
    () => prompts.filter((prompt) => prompt.favorite).length,
    [prompts],
  );

  const categoryCounts = useMemo(
    () => categories.map((category) => ({
      name: category,
      count: prompts.filter((prompt) => prompt.category === category).length,
    })),
    [prompts],
  );

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
      const searchableText = [prompt.title, prompt.category, prompt.content, ...prompt.tags]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [prompts, searchQuery, selectedCategory]);

  const frequentlyUsedPrompts = useMemo(
    () => [...prompts].sort((first, second) => second.uses - first.uses).slice(0, 5),
    [prompts],
  );

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;

    if (name === 'favorite' && event.target instanceof HTMLInputElement) {
      const { checked } = event.target;
      setForm((currentForm) => ({ ...currentForm, favorite: checked }));
      return;
    }

    if (name === 'category' && categories.includes(value as PromptCategory)) {
      setForm((currentForm) => ({ ...currentForm, category: value as PromptCategory }));
      return;
    }

    if (name === 'title' || name === 'tags' || name === 'content') {
      setForm((currentForm) => ({ ...currentForm, [name]: value }));
    }
  };

  const resetForm = (): void => {
    setForm(defaultForm);
    setEditingPromptId(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const promptPayload = {
      title: form.title.trim(),
      category: form.category,
      tags: parseTags(form.tags),
      content: form.content.trim(),
      favorite: form.favorite,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    if (!promptPayload.title || !promptPayload.content) {
      return;
    }

    if (editingPromptId) {
      setPrompts((currentPrompts) =>
        currentPrompts.map((prompt) =>
          prompt.id === editingPromptId ? { ...prompt, ...promptPayload } : prompt,
        ),
      );
    } else {
      setPrompts((currentPrompts) => [
        {
          id: createPromptId(),
          uses: 0,
          ...promptPayload,
        },
        ...currentPrompts,
      ]);
    }

    resetForm();
  };

  const editPrompt = (prompt: Prompt): void => {
    setEditingPromptId(prompt.id);
    setForm({
      title: prompt.title,
      category: prompt.category,
      tags: prompt.tags.join(', '),
      content: prompt.content,
      favorite: prompt.favorite,
    });
  };

  const deletePrompt = (promptId: string): void => {
    setPrompts((currentPrompts) => currentPrompts.filter((prompt) => prompt.id !== promptId));

    if (editingPromptId === promptId) {
      resetForm();
    }
  };

  const toggleFavorite = (promptId: string): void => {
    setPrompts((currentPrompts) =>
      currentPrompts.map((prompt) =>
        prompt.id === promptId ? { ...prompt, favorite: !prompt.favorite } : prompt,
      ),
    );
  };

  const copyPrompt = async (prompt: Prompt): Promise<void> => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(prompt.content);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = prompt.content;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setPrompts((currentPrompts) =>
      currentPrompts.map((currentPrompt) =>
        currentPrompt.id === prompt.id
          ? { ...currentPrompt, uses: currentPrompt.uses + 1, updatedAt: new Date().toISOString().slice(0, 10) }
          : currentPrompt,
      ),
    );
    setCopiedPromptId(prompt.id);
    window.setTimeout(() => setCopiedPromptId(null), 1400);
  };

  const improvePrompt = (): void => {
    const trimmedPrompt = enhancerInput.trim();

    if (!trimmedPrompt) {
      setEnhancedPrompt('');
      return;
    }

    setEnhancedPrompt(
      `Act as an expert prompt engineer. Improve the following prompt for clarity, context, constraints, output format, and examples.\n\nOriginal prompt:\n${trimmedPrompt}\n\nReturn:\n1. A rewritten production-ready prompt\n2. Assumptions to confirm\n3. Suggested variables to reuse`,
    );
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={22} />
          </div>
          <div>
            <p>PromptEasy</p>
            <span>Prompt Management</span>
          </div>
        </div>

        <nav className="nav-list">
          <a className="active" href="#dashboard">
            <Library size={18} /> Dashboard
          </a>
          <a href="#editor">
            <MessageSquarePlus size={18} /> Save prompts
          </a>
          <a href="#library">
            <Search size={18} /> Search library
          </a>
          <a href="#frequent">
            <TrendingUp size={18} /> Frequently used
          </a>
          <a href="#enhance">
            <Bot size={18} /> Improve prompts
          </a>
        </nav>

      </aside>

      <main className="main-content">
        <header className="hero" id="dashboard">
          <div>
            <span className="eyebrow">Dedicated prompt workspace</span>
            <h1>Save, organize, discover, improve, and reuse prompts quickly.</h1>
       
            <div className="hero-actions">
              <a className="primary-button" href="#editor">
                <MessageSquarePlus size={18} /> Create prompt
              </a>
              <a className="secondary-button" href="#library">
                <Clipboard size={18} /> Reuse prompt
              </a>
            </div>
          </div>
          <section className="enhancer-card" aria-labelledby="quick-enhancer-title">
            <div className="card-heading">
              <Bot size={20} />
              <h2 id="quick-enhancer-title">AI-assisted prompt enhancement</h2>
            </div>
            <textarea
              aria-label="Prompt enhancement input"
              onChange={(event) => setEnhancerInput(event.target.value)}
              value={enhancerInput}
            />
            <div className="enhancer-footer">
              <span>Turns rough ideas into reusable prompt templates.</span>
              <button onClick={improvePrompt} type="button">
                Improve prompt
              </button>
            </div>
          </section>
        </header>

        <section className="stats-grid" aria-label="Prompt dashboard overview">
          <StatCard
            helper="Seeded with 24 MVP examples"
            icon={<Library />}
            label="Total prompts"
            value={prompts.length}
          />
          <StatCard
            helper="Quick access prompt shortcuts"
            icon={<Heart />}
            label="Favorites"
            value={favoriteCount}
          />
          <StatCard
            helper="Coding, Career, Learning, Travel, Food, Writing"
            icon={<FolderKanban />}
            label="Categories"
            value={categories.length}
          />
          <StatCard
            helper="Copying increments usage"
            icon={<Copy />}
            label="Total reuses"
            value={prompts.reduce((total, prompt) => total + prompt.uses, 0)}
          />
        </section>

        <section className="workspace-grid">
          <form className="panel prompt-form" id="editor" onSubmit={handleSubmit}>
            <div className="section-header compact">
              <div>
                <span className="eyebrow">Prompt</span>
                <h2>{editingPromptId ? 'Update prompt' : 'Create prompt'}</h2>
              </div>
              <MessageSquarePlus size={22} />
            </div>

            <label>
              Title
              <input
                name="title"
                onChange={handleFieldChange}
                placeholder="e.g. Portfolio case study writer"
                type="text"
                value={form.title}
              />
            </label>

            <div className="form-row">
              <label>
                Category
                <select name="category" onChange={handleFieldChange} value={form.category}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tags
                <input
                  name="tags"
                  onChange={handleFieldChange}
                  placeholder="comma, separated, tags"
                  type="text"
                  value={form.tags}
                />
              </label>
            </div>

            <label>
              Prompt
              <textarea
                name="content"
                onChange={handleFieldChange}
                placeholder="Write the reusable prompt template here..."
                value={form.content}
              />
            </label>

            <label className="favorite-toggle">
              <input
                checked={form.favorite}
                name="favorite"
                onChange={handleFieldChange}
                type="checkbox"
              />
              Mark as favorite
            </label>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingPromptId ? 'Save changes' : 'Save prompt'}
              </button>
              {editingPromptId ? (
                <button className="secondary-button" onClick={resetForm} type="button">
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>

          <aside className="panel" id="categories">
            <div className="section-header compact">
              <div>
                <span className="eyebrow">Organize prompts</span>
                <h2>Categories</h2>
              </div>
              <Tags size={20} />
            </div>
            <div className="category-list">
              <button
                className={selectedCategory === 'All' ? 'category-item selected' : 'category-item'}
                onClick={() => setSelectedCategory('All')}
                type="button"
              >
                <span className="category-dot all" />
                <p>All prompts</p>
                <strong>{prompts.length}</strong>
              </button>
              {categoryCounts.map((category) => (
                <button
                  className={selectedCategory === category.name ? 'category-item selected' : 'category-item'}
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  type="button"
                >
                  <span className={`category-dot ${category.name.toLowerCase()}`} />
                  <p>{category.name}</p>
                  <strong>{category.count}</strong>
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="content-grid">
          <div className="panel prompt-library" id="library">
            <div className="section-header">
              <div>
                <span className="eyebrow">Search and reuse</span>
                <h2>Prompt library</h2>
              </div>
              <label className="search-box">
                <Search size={18} />
                <input
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by title, tags, or category"
                  type="search"
                  value={searchQuery}
                />
              </label>
            </div>

            <div className="prompt-list">
              {filteredPrompts.map((prompt) => (
                <article className="prompt-card" key={prompt.id}>
                  <div className="prompt-card-header">
                    <div>
                      <div className="row-title">
                        <h3>{prompt.title}</h3>
                        {prompt.favorite ? <span className="favorite-pill">Favorite</span> : null}
                      </div>
                      <p>
                        {prompt.category} · Used {prompt.uses} times · Updated {prompt.updatedAt}
                      </p>
                    </div>
                    <button
                      aria-label={prompt.favorite ? 'Remove from favorites' : 'Add to favorites'}
                      className="icon-button"
                      onClick={() => toggleFavorite(prompt.id)}
                      type="button"
                    >
                      <Star fill={prompt.favorite ? 'currentColor' : 'none'} size={18} />
                    </button>
                  </div>

                  <p className="prompt-content">{prompt.content}</p>

                  <div className="tag-list">
                    {prompt.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="prompt-actions">
                    <button onClick={() => void copyPrompt(prompt)} type="button">
                      <Copy size={16} /> {copiedPromptId === prompt.id ? 'Copied!' : 'Copy prompt'}
                    </button>
                    <button onClick={() => editPrompt(prompt)} type="button">
                      <Edit3 size={16} /> Edit
                    </button>
                    <button className="danger-button" onClick={() => deletePrompt(prompt.id)} type="button">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="side-stack">
            <section className="panel" id="frequent">
              <div className="section-header compact">
                <div>
                  <span className="eyebrow">Discover prompts</span>
                  <h2>Frequently used</h2>
                </div>
                <TrendingUp size={22} />
              </div>
              <div className="frequent-list">
                {frequentlyUsedPrompts.map((prompt) => (
                  <button key={prompt.id} onClick={() => void copyPrompt(prompt)} type="button">
                    <span>{prompt.title}</span>
                    <strong>{prompt.uses} uses</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel improvement-panel" id="enhance">
              <div className="section-header compact">
                <div>
                  <span className="eyebrow">Improve prompts</span>
                  <h2>Enhanced template</h2>
                </div>
                <Sparkles size={22} />
              </div>
              {enhancedPrompt ? (
                <>
                  <pre>{enhancedPrompt}</pre>
                  <button
                    className="primary-button"
                    onClick={() => void navigator.clipboard.writeText(enhancedPrompt)}
                    type="button"
                  >
                    Copy improved prompt
                  </button>
                </>
              ) : (
                <ul>
                  <li>Add role, audience, and context.</li>
                  <li>Specify constraints and output format.</li>
                  <li>Turn one-off prompts into reusable variables.</li>
                </ul>
              )}
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
