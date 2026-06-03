import type { ReactElement } from 'react';
import {
  BarChart3,
  Bot,
  Clock3,
  FolderKanban,
  Gauge,
  LayoutDashboard,
  Library,
  MessageSquarePlus,
  Search,
  Sparkles,
  Star,
  Tags,
  TrendingUp,
} from 'lucide-react';
import './styles.css';

type PromptStatus = 'Optimized' | 'Needs review' | 'Draft';

type Prompt = {
  title: string;
  category: string;
  model: string;
  status: PromptStatus;
  success: string;
  updated: string;
  tags: string[];
};

type CategoryColor = 'pink' | 'blue' | 'green' | 'orange';

type Category = {
  name: string;
  count: number;
  color: CategoryColor;
};

const prompts: Prompt[] = [
  {
    title: 'Product Launch Campaign Brief',
    category: 'Marketing',
    model: 'GPT-4.1',
    status: 'Optimized',
    success: '94%',
    updated: '2h ago',
    tags: ['campaign', 'strategy', 'email'],
  },
  {
    title: 'Support Ticket Classifier',
    category: 'Operations',
    model: 'Claude 3.7',
    status: 'Needs review',
    success: '82%',
    updated: 'Yesterday',
    tags: ['routing', 'sentiment', 'SLA'],
  },
  {
    title: 'Developer Docs Explainer',
    category: 'Engineering',
    model: 'GPT-4o',
    status: 'Draft',
    success: '76%',
    updated: '3d ago',
    tags: ['docs', 'examples', 'API'],
  },
];

const categories: Category[] = [
  { name: 'Marketing', count: 28, color: 'pink' },
  { name: 'Engineering', count: 19, color: 'blue' },
  { name: 'Sales', count: 14, color: 'green' },
  { name: 'Operations', count: 11, color: 'orange' },
];

const improvements: string[] = [
  'Add role and audience context for sharper outputs.',
  'Define success criteria before the model response.',
  'Convert broad requests into step-by-step instructions.',
];

function App(): ReactElement {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={22} />
          </div>
          <div>
            <p>PromptFlow</p>
            <span>AI Prompt Management</span>
          </div>
        </div>

        <nav className="nav-list">
          <a className="active" href="#dashboard">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#library">
            <Library size={18} /> Prompt Library
          </a>
          <a href="#categories">
            <FolderKanban size={18} /> Categories
          </a>
          <a href="#analytics">
            <BarChart3 size={18} /> Analytics
          </a>
          <a href="#enhance">
            <Bot size={18} /> AI Enhancer
          </a>
        </nav>

        <div className="sidebar-card">
          <p>Storage used</p>
          <strong>72%</strong>
          <div className="progress-bar">
            <span />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="hero" id="dashboard">
          <div>
            <span className="eyebrow">Prompt workspace</span>
            <h1>Manage, improve, and measure every AI prompt in one place.</h1>
            <p>
              A clean starting UI for a dedicated prompt management system with
              library search, categorization, analytics, and AI-assisted prompt enhancement.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button">
                <MessageSquarePlus size={18} /> New prompt
              </button>
              <button className="secondary-button" type="button">
                <Sparkles size={18} /> Enhance prompt
              </button>
            </div>
          </div>
          <section className="enhancer-card" aria-labelledby="enhancer-title">
            <div className="card-heading">
              <Bot size={20} />
              <h2 id="enhancer-title">AI prompt enhancer</h2>
            </div>
            <textarea
              aria-label="Prompt enhancement input"
              defaultValue="Write a customer onboarding email for a project management app."
            />
            <div className="enhancer-footer">
              <span>Clarity score: 78</span>
              <button type="button">Suggest improvements</button>
            </div>
          </section>
        </header>

        <section className="stats-grid" aria-label="Prompt analytics overview">
          <article>
            <Gauge />
            <span>Total prompts</span>
            <strong>126</strong>
            <small>+18 this month</small>
          </article>
          <article>
            <TrendingUp />
            <span>Avg. success rate</span>
            <strong>87%</strong>
            <small>+6.2% vs last month</small>
          </article>
          <article>
            <Star />
            <span>Top category</span>
            <strong>Marketing</strong>
            <small>28 active prompts</small>
          </article>
          <article>
            <Clock3 />
            <span>Time saved</span>
            <strong>42h</strong>
            <small>Estimated monthly</small>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel prompt-library" id="library">
            <div className="section-header">
              <div>
                <span className="eyebrow">Prompt library</span>
                <h2>Reusable prompt collection</h2>
              </div>
              <label className="search-box">
                <Search size={18} />
                <input type="search" placeholder="Search prompts, tags, or models" />
              </label>
            </div>

            <div className="prompt-list">
              {prompts.map((prompt) => (
                <article className="prompt-row" key={prompt.title}>
                  <div>
                    <div className="row-title">
                      <h3>{prompt.title}</h3>
                      <span className={`status ${prompt.status.toLowerCase().replace(' ', '-')}`}>
                        {prompt.status}
                      </span>
                    </div>
                    <p>
                      {prompt.category} · {prompt.model} · Updated {prompt.updated}
                    </p>
                    <div className="tag-list">
                      {prompt.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <strong>{prompt.success}</strong>
                </article>
              ))}
            </div>
          </div>

          <aside className="panel" id="categories">
            <div className="section-header compact">
              <div>
                <span className="eyebrow">Categories</span>
                <h2>Organize by team</h2>
              </div>
              <Tags size={20} />
            </div>
            <div className="category-list">
              {categories.map((category) => (
                <div className="category-item" key={category.name}>
                  <span className={`category-dot ${category.color}`} />
                  <p>{category.name}</p>
                  <strong>{category.count}</strong>
                </div>
              ))}
            </div>
          </aside>

          <section className="panel analytics-panel" id="analytics">
            <div className="section-header compact">
              <div>
                <span className="eyebrow">Analytics</span>
                <h2>Prompt performance</h2>
              </div>
              <BarChart3 size={22} />
            </div>
            <div className="chart-bars" aria-label="Prompt usage chart">
              {[44, 62, 51, 78, 69, 92, 84].map((height, index) => (
                <span key={height + index} style={{ height: `${height}%` }} />
              ))}
            </div>
            <p>Usage and success metrics are ready for future API integration.</p>
          </section>

          <section className="panel improvement-panel" id="enhance">
            <div className="section-header compact">
              <div>
                <span className="eyebrow">AI assistance</span>
                <h2>Suggested prompt improvements</h2>
              </div>
              <Sparkles size={22} />
            </div>
            <ul>
              {improvements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
