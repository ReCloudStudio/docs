# AGENTS.md — ReCloud Studio Documentation

## Project Purpose

Public documentation site for **ReCloud Studio** (worldexecute.me).
Built with **Starlight** (Astro-based docs framework). Content mirrors the organization's public-facing policies, guides, and product docs.

## Tech Stack

- **Framework**: Starlight (Astro)
- **Package Manager**: bun (never npm/yarn/pnpm)
- **Language**: Markdown + MDX for content; TypeScript for config/components
- **Deployment**: Cloudflare Pages (static output)

## Commands

```bash
bun install          # install dependencies
bun dev              # start dev server (localhost:4321)
bun run build        # production build (outputs to dist/)
bun run preview      # preview production build locally
```

## Project Structure

```
docs/
├── src/
│   ├── content/
│   │   └── docs/       # Markdown/MDX documentation pages
│   │       ├── index.mdx              # 首页
│   │       ├── manifesto/             # 总纲
│   │       ├── organization/          # 架构、角色与关系
│   │       ├── conduct/               # 内部成员行为守则
│   │       ├── security/              # 数据安全与隐私保护
│   │       ├── open-source/           # 开源协议
│   │       ├── brand/                 # 品牌与身份保护
│   │       ├── management/            # 管理规范
│   │       └── development/           # 开发规范
│   ├── assets/         # images, icons (logo.svg)
│   └── components/     # custom Astro components (if needed)
├── public/             # static assets (favicon, etc.)
├── astro.config.mjs    # Starlight/Astro config (title, sidebar, i18n, social links)
├── package.json
└── tsconfig.json
```

## Conventions

- Content files live in `src/content/docs/`
- Use `.md` for simple pages, `.mdx` when you need component imports
- Sidebar ordering controlled by `StarlightSidebar` config in `astro.config.mjs` or via frontmatter `order`
- Default language: `zh-CN` (Chinese Simplified); English pages under `/en/`
- Image references use relative paths from `src/assets/` or `public/`
- Frontmatter required: `title`, optional `description`, `sidebar.label`, `sidebar.order`

## Content Reference

Primary content source: **Better SR** policy handbook (SR思锐团队政策与合规手册).
Original: Feishu wiki at `sr-studio.feishu.cn/wiki/GwKxwB1Ili5bP1kNcUvcFjI5n5c`

Key sections to adapt for public docs:
- 总纲 (Manifesto)
- 架构、角色与关系
- 内部成员日常行为守则
- 数据安全与隐私保护
- 开源协议
- 品牌与身份保护
- 项目管理制度与技术开发规范

## Notes

- This is a new repository — initial setup only. Content migration from Feishu is pending.
- ReCloud Studio is the successor/rebrand of SR思锐团队. Use "ReCloud Studio" in public-facing text.
- Tagline: "We build open-source software. Fair, transparent, and community-driven."
