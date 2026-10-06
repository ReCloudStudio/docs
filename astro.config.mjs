import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://docs.worldexecute.me",
  server: {
    allowedHosts: ["recloud-docs.rhen.cloud"],
  },
  integrations: [
    starlight({
      title: "ReCloud Studio",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "ReCloud Studio",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ReCloudStudio",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/PBxdFTRM8",
        },
        {
          icon: "telegram",
          label: "Telegram",
          href: "https://t.me/recloudstudio",
        },
        {
          icon: "twitter",
          label: "Twitter",
          href: "https://twitter.com/recloudstudio",
        },
      ],
      sidebar: [
        {
          label: "总纲",
          items: [
            { label: "概述", slug: "manifesto" },
            { label: "身份与定义", slug: "manifesto/identity" },
            { label: "使命与愿景", slug: "manifesto/mission" },
            { label: "文化与精神", slug: "manifesto/culture" },
          ],
        },
        {
          label: "架构与角色",
          items: [
            { label: "概述", slug: "organization" },
            { label: "团队体系", slug: "organization/team-structure" },
            { label: "团队架构", slug: "organization/team-architecture" },
            { label: "成员角色", slug: "organization/member-roles" },
            { label: "对外关系", slug: "organization/external-relations" },
          ],
        },
        {
          label: "行为守则",
          items: [
            { label: "概述", slug: "conduct" },
            { label: "成员行为规范", slug: "conduct/code-of-conduct" },
          ],
        },
        {
          label: "数据安全",
          items: [
            { label: "概述", slug: "security" },
            { label: "隐私保护规范", slug: "security/privacy-policy" },
          ],
        },
        {
          label: "开源协议",
          items: [
            { label: "概述", slug: "open-source" },
            { label: "对外公开源代码", slug: "open-source/public-license" },
            { label: "对内公开源代码", slug: "open-source/internal-license" },
          ],
        },
        {
          label: "设计系统",
          items: [
            { label: "概述", slug: "design-system" },
            { label: "设计基础", slug: "design-system/foundations" },
            { label: "设计 Token", slug: "design-system/tokens" },
            { label: "ReCloud UI 使用指南", slug: "design-system/recloud-ui" },
          ],
        },
        {
          label: "品牌保护",
          items: [
            { label: "概述", slug: "brand" },
            { label: "品牌使用规范", slug: "brand/brand-guidelines" },
            { label: "设计规范", slug: "brand/design" },
          ],
        },
        {
          label: "管理规范",
          items: [
            { label: "概述", slug: "management" },
            { label: "构成与选拔", slug: "management/composition" },
            { label: "权力清单", slug: "management/powers" },
            { label: "义务与限制", slug: "management/obligations" },
            { label: "决策机制", slug: "management/decision-making" },
            { label: "弹劾与更替", slug: "management/impeachment" },
          ],
        },
        {
          label: "开发规范",
          items: [
            { label: "概述", slug: "development" },
            { label: "项目管理", slug: "development/project-management" },
            { label: "技术标准", slug: "development/tech-standards" },
            { label: "Git 提交规范", slug: "development/git" },
            { label: "命名规范", slug: "development/naming" },
            { label: "标点符号使用规范", slug: "development/punctuation" },
            { label: "Markdown 格式规范", slug: "development/markdown" },
            {
              label: "语言代码规范",
              items: [
                { label: "TypeScript", slug: "development/ts-style" },
                { label: "Python", slug: "development/python-style" },
                { label: "Go", slug: "development/go-style" },
              ],
            },
            { label: "贡献指南", slug: "development/contributing" },
          ],
        },
      ],
      components: {
        Head: "./src/components/Head.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
      },
    }),
  ],
});
