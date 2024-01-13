import { defineConfig } from "vitepress"

export default defineConfig({
  title: "Enterprise Commerce",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Get started", link: "/getting-started" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting started", link: "/getting-started" },
          { text: "Deploying your own", link: "/deployment" },
          { text: "Benchmarks", link: "/benchmarks" },
          { text: "Architecture overview", link: "/architecture-overview" },
          { text: "Tech Stack", link: "/tech-stack" },
        ],
      },
      {
        text: "Features",
        items: [
          { text: "Shopify Backend", link: "/#" },
          { text: "Instant Search", link: "/#" },
          { text: "SEO Redirects", link: "/#" },
          { text: "A/B Testing", link: "/#" },
          { text: "CI Workflows", link: "/#" },
          { text: "Automated Testing", link: "/#" },
          { text: "Formatting", link: "/#" },
        ],
      },
      {
        text: "Recipes",
        items: [
          { text: "Affiliate Marketing", link: "/#" },
          { text: "Tidio integration", link: "/#" },
          { text: "Seeder", link: "/recipies/seeder" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Blazity/enterprise-commerce" }],
  },
})
