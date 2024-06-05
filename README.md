<a href="https://blazity.com/r/commerce">

![HERO](https://github.com/Blazity/enterprise-commerce/assets/28964599/1ff1a75d-30ea-41dd-aa9a-b530b2baed51)

</a>

[![GitHub Actions Workflow Status][check-workflow-badge]][check-workflow-badge-link] [![GitHub License][github-license-badge]][github-license-badge-link] [![GitHub contributors][github-contributors-badge]][github-contributors-badge-link] [![Discord][discord-badge]][discord-badge-link] [![Blazity][made-by-blazity-badge]][made-by-blazity-badge-link] [![Blazity][made-with-v0-badge]][made-with-v0-link]

🚀 Launch your high-performance Shopify storefront in minutes, not weeks, with this Next.js commerce starter. Leverage the power of Vector Search and AI to deliver a superior online shopping experience without the development headaches.

Run this command and let our CLI do the job or [see our documentation for manual setup instruction](https://blazity.com/r/commerce-docs).

```bash
$ yarn create commerce
```

[See the live demo](https://blazity.com/r/commerce) or deploy it straight to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBlazity%2Fenterprise-commerce%2Ftree%2Fmain&envDescription=Full%20explanation%20on%20how%20to%20obtain%20keys&envLink=https%3A%2F%2Fdocs.commerce.blazity.com%2Fsetup&demo-title=Your%20Commerce&demo-description=AI-FIRST%20NEXT.JS%20STOREFRONT%20FOR%20COMPOSABLE%20COMMERCE&demo-url=https%3A%2F%2Fblazity.com%2Fr%2Fcommerce&demo-image=https%3A%2F%2Fcommerce.blazity.com%2Fopengraph-image.jpg&root-directory=apps%2Fweb)

**Note:** To enable all features, ensure [required environment variables](https://docs.commerce.blazity.com/setup#manual) are set in your `.env.local`

## Features

- [Next.js App Router](https://nextjs.org/docs/app) & [Turborepo](https://turbo.build/repo)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) (RSCs), [Suspense and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Dynamic OG Images](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [AI Vector Search](https://www.meilisearch.com/docs/learn/experimental/vector_search)
- [Lightning fast search & filtering](https://www.meilisearch.com/)
- [Designed with v0](https://v0.dev/)
- [Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) (feature flags, comments, deployment sharing, etc.)
- AI Image captioning
- Perfect Performance & SEO
- Extremely strict TypeScript
- Draft Mode
- A/B Tests
- Shadcn UI
- TailwindCSS
- Analytics (GTM, Vercel)
- Highly Scalable SEO Redirects ([Bloom Filters](https://nextjs.org/docs/app/building-your-application/routing/redirecting#managing-redirects-at-scale-advanced))
- Complete and fast CI/CD pipelines
- Platform agnostic (integrated with Shopify by default)
- Easy migration - migrate your existing solution in minutes
- Conventional commits git hook
- Playwright - write end-to-end tests like a pro
- Storybook - create, test, and showcase your components
- T3 Env - manage your environment variables with ease
- Patch-package - fix external dependencies without losing your mind
- Components coupling and cohesion graph - a tool for managing component relationships
- Category Landing Page detached from Product Listing for fast SEO indexing & better performance
- Reviews & Ratings with [Judge.me](https://judge.me/)

## Architecture

In Enterprise Commerce high-level architecture, Meilisearch serves as the primary source for all product data and potentially other types of data in the future. The system is designed to easily integrate AI personalization tools without needing to modify any frontend code. While we are integrated with Shopify by default, we are not tightly bound to it, and you can use any system that works with Meilisearch and can adapt data to our format.

From a structural viewpoint, we use a monorepo (Turborepo) to manage packages, even though we currently have only one Next.js app. We chose this setup because it prepares us for future developments, which will include additional apps. This arrangement helps keep the packages well-separated and self-contained.

<img width="1841" alt="architecture diagram" src="https://github.com/Blazity/enterprise-commerce/assets/28964599/c5d3a0b3-6c3e-47df-9c45-4ecb583f5a64">

## Performance

At Blazity, we prioritize speed. Enterprise Commerce is meticulously crafted to deliver top-notch performance for your online store.

Lighthouse scores offer a valuable comparison tool, but they don’t directly translate to SEO or user experience (UX).
For a true picture, prioritize real user data. Tools like CrUX or Vercel Speed Insights provide user-based performance metrics, ensuring your online store delivers a seamless experience for your customers.

![performance diagram](https://github.com/Blazity/enterprise-commerce/assets/28964599/8aba9b68-38d6-41c9-81a8-234003e7e1b0)

## 🤝 Contribution

Contributions are always welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes, and commit them using the [Conventional Commits](https://www.conventionalcommits.org/) format.
4. Push your changes to the forked repository.
5. Create a pull request, and we'll review your changes.

## Support

If you're looking for help or simply want to share your thoughts about the project, we encourage you to join our Discord community. Here's the link: [https://blazity.com/discord](https://blazity.com/discord). It's a space where we exchange ideas and help one another. Everyone's input is appreciated, and we look forward to welcoming you.

<br />
<a href="https://discord.gg/fyWtyNKmfX" style="width: 100%; display: flex; justify-content: center;">
  <img src="https://discordapp.com/api/guilds/1111676875782234175/widget.png?style=banner2" alt="Blazity Discord Banner"/>
</a>
<br />

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

[check-workflow-badge]: https://img.shields.io/github/actions/workflow/status/blazity/enterprise-commerce/check.yml?label=check
[github-license-badge]: https://img.shields.io/github/license/blazity/enterprise-commerce?link=https%3A%2F%2Fgithub.com%2FBlazity%2Fenterprise-commerce%2Fblob%2Fmain%2FLICENSE
[github-contributors-badge]: https://img.shields.io/github/contributors/blazity/enterprise-commerce?link=https%3A%2F%2Fgithub.com%2FBlazity%2Fenterprise-commerce%2Fgraphs%2Fcontributors
[discord-badge]: https://img.shields.io/discord/1111676875782234175?color=7b8dcd&link=https%3A%2F%2Fblazity.com%2Fdiscord
[made-by-blazity-badge]: https://img.shields.io/badge/made_by-Blazity-blue?color=FF782B&link=https://blazity.com/
[made-with-v0-badge]: https://img.shields.io/badge/designed_with-v0-red?color=black&link=https://blazity.com/
[check-workflow-badge-link]: https://github.com/Blazity/enterprise-commerce/actions/workflows/check.yml
[github-license-badge-link]: https://github.com/Blazity/enterprise-commerce/blob/main/LICENSE
[github-contributors-badge-link]: https://github.com/Blazity/enterprise-commerce/graphs/contributors
[discord-badge-link]: https://blazity.com/discord
[made-by-blazity-badge-link]: https://blazity.com/?utm_source=nextenterprise&utm_medium=github
[made-with-v0-link]: https://v0.dev/
