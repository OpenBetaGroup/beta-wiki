import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";

export default defineConfig(
  withSidebar(
    {
      base: "/beta-wiki",
      title: "Technical Beta Wiki",
      description:
        "A wiki documenting Minecraft Beta 1.7.3's network protocol and other technical specifications.",

      head: [
        ["link", { rel: "icon", href: "/beta-wiki/favicon.ico" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:image", content: "/beta-wiki/banner.webp" }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:image", content: "/beta-wiki/banner.webp" }],
      ],

      // MPA builds without javascript, but has to do full-page reload when you navigate between pages
      mpa: false,
      cleanUrls: true,

      themeConfig: {
        lang: "en",
        logo: "/favicon.ico",
        search: {
          provider: "local",
        },
        nav: [
          {
            text: "Intro",
            link: "/introduction",
          },
          {
            text: "Contributing",
            link: "/CONTRIBUTING",
          },
          {
            text: "Projects",
            link: "/projects",
          },
          {
            text: "Resources",
            link: "/resources",
          },
          {
            text: "To-Do",
            link: "/todo",
          },
          {
            text: "Credits",
            link: "/credits",
          },
          {
            text: "Legal",
            link: "/legal",
          },
        ],
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/OpenBetaGroup/beta-wiki",
          },
          {
            icon: "discord",
            link: "https://discord.gg/JHTz2HSKrf",
          },
          {
            icon: "youtube",
            link: "https://www.youtube.com/@techbetawiki",
          },
        ],
        editLink: {
          pattern: "https://github.com/OpenBetaGroup/beta-wiki/edit/main/:path",
        },
      },
      markdown: {
        math: true,
        image: {
          lazyLoading: true,
        },
      },
    },
    {
      documentRootPath: "/",
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      useTitleFromFrontmatter: true,
      sortMenusByFrontmatterOrder: true,
      rootGroupText: "Beta Wiki",
      useFolderLinkFromIndexFile: true,
      excludeByGlobPattern: [
        "CONTRIBUTING.md",
        "credits.md",
        "legal.md",
        "projects.md",
        "resources.md",
        "todo.md",
      ],
      excludeFilesByFrontmatterFieldName: "exclude",
      collapsed: true,
      collapseDepth: 2,
    },
  ),
);
