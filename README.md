# Enterprise Commerce


<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/assets/blazity-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="/assets/blazity-logo-light.svg">
  <img alt="Logo" align="right" height="80" src="/assets/blazity-logo-light.svg">
</picture>

### Introduction

Enterprise Commerce by [Blazity](https://blazity.com) is a open source enterprise-grade template of a Next.js project using Shopify as the e-commerce platform (product data, categories) and Algolia as the middle layer (data fetching, searching, faceting and recommendations).


[![GitHub License][github-license-badge]][github-license-badge-link] [![Docs][check-the-docs]][check-the-docs-link] [![Blazity][made-by-blazity-badge]][made-by-blazity-badge-link] [![Blazity][made-with-v0-badge]][made-with-v0-link] [![Live Demo][view-live-demo-badge]][view-live-demo-link]


### Installation 

For detailed steps how to setup the whole application, please check [docs.blazity.com "Setup & Configuration"](https://docs.blazity.com/enterprise-commerce/setup).

You can also deploy the project to Vercel with one click the button below  
  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Blazity/enterprise-commerce)  

### Philosophy & motivation

Building e-commerce platform is a tough topic. Creating one that has all the features that enterprise companies want is hard, way harder than implementing Headless CMS. There are bunch of templates out there that struggle with couple areas, while they may be a great choice for a small or medium-sized businesses, the huge needs for e.g. crawling budget optimization, SEO, excellent browsing journey, simplicity of the implementation are way more than can be expected from other projects.

### The browsing journey

A monolithic commerce platform will never beat the speed of a fast-lookup system like Algolia, Constructor, or other enterprise search systems. What if you cache your platform's responses? Even still, the combinatorics of search terms, filters, and sort options create endless unique queries. A fast source-of-truth is table-stakes for speedy browsing UX.

### Architecture diagram

Simple, winning e-commerce architecture. Take a closer look at the arrow colors as they represent the times between high-level user's browsing journey interactions and network latencies in the lower level.

<img width="4763" height="3137" alt="detailed" src="https://github.com/user-attachments/assets/d1a66375-a573-43aa-98d5-efdd97c64c30" />

## Media preview




https://github.com/user-attachments/assets/ec3a3a7d-2118-4367-950c-dd31022768f1





## Storefront features

- Shopify as e-commerce backend, Algolia as the data middle-layer
- Instant search, faceting and filtering experience through thousands (most likely will also work with millions) products with sophisticated filters, typo tolerance and word similarity
- Enterprise-grade redirects handling through tens of thousands redirects without latency overhead (implemented on Bloom Filters)
- Fast builds regardless of the e-commerce specific data volume
- Platform-agnostic hierarchical categories
- Analytics ([Vercel Analytics](vercel-analytics) / Google Analytics) with easy provider switch
- Uncomplicated [A/B testing](https://github.com/Blazity/enterprise-commerce/blob/17726a77d22ecee81dc9268518a3d41e7c0861d3/starters/shopify-algolia/middleware.ts#L41-L43) setup
- Perfect performance scores
- SEO optimized, with crawling budget concept in mind
  - Crucial pages displaying critical contents and data without JavaScript execution needed
- Follows the best practices regarding building e-commerce storefronts with simplicity in mind
- Next.js App Router with implementation using all of the features (as we believe Next.js is the king for e-commerce)
- [ISR MegaNav](https://github.com/vercel-solutions/meganav-demo) updates with seamless client-side hot-reload (SWR)
- Browsing journey setup with mind of high conversion rates & maximizing the user's experience
  - Instant navigation between pages with carefully picked rendering strategies ([HP][hp], [PDP][pdp], [CLP][clp], [PLP][plp], [SRP][plp])
  - Breadcrumbs on every crucial e-commerce page
  - Filtering helpers such as tiny vendor facet values search
- Hosted on [Vercel][vercel]
- Designed using [v0][v0]

## Page specific features                                          

### HP (Home Page)
- Super optimized above-the-fold category carousel with CTA buttons forwarding to CLPs/PLPs
- SSG for best possible performance
- A/B testing out of the box with simple implementation
- Sales banner

### CLP (Category Landing Page)
- Optimized Headless CMS driven CLP cover images and descriptions
- Showcase of products from the particular category
- "Show all products" button navigating to the actual [PLP][plp]
- Tightly bound to the categories user in the e-commerce provider configured (default: Shopify)
- Possibility to declare category to be viewable as [PLP][plp] or [CLP][clp], depending on the hierarchical level after clicking it in the MegaNav

  
### PLP (Product Listing Page)
- Sub-second search experience built on Algolia, with infinite scaling capabilities
- Intelligent values faceting through multiple filters, such as:
  - Product's copywriting content
  - Average rating and reviews
  - Vendors
  - Variants (e.g. Color)
  - Minimum/maximum price
- Sorting of the [PLP][plp] output display
- Efficient and battle-tested pagination without fancy infinite loading sections
- Query params driven, easily shareable links
- Browsing journey helpers, such as tiny vendors' list search
  
### PDP (Product Details Page)

- Multiple variants configurations with robust variants' combinations handling
- Image variants carousel with auto-changing the preview based on the selected variant
- FAQ sections driven by headless CMS
- Product reviews panel with "View all reviews" subpage
- Recommended products at the bottom of the page
- Above the fold content visible with JavaScript disabled (SEO-optimized)
- Base product generated as SSG + variants SSR

### Documentation

We also created a comprehensive documentation [docs.blazity.com/enterprise-commerce](docs.blazity.com) serving purpose of explaining our architectural decisions, containing in-details features descriptions and read-worthy guidelines. Everything with focus on the business values and theirs impact on the implementations. 

### Frontend architecture

| Term    | Full Name                                      | Rendering Strategy                                                                                         | Caching Strategy                                                                                                       | A/B Testing or Personalization                                                         |
| ------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **HP**  | Home Page                                      | **ISR**/**SSG**/**PPR**                                                                                    | **Static**                                                                                                             | **ISR** variants above the fold and **CSR** below the fold or **PPR**                  |
| **CLP** | Category Landing Page (products + CMS content) | **ISR**/**SSG**/**PPR**                                                                                    | **Static**                                                                                                             | **ISR** variants above the fold and **CSR** below the fold or **PPR**                  |
| **PLP** | Product Listing Page (products only)           | **ISR** for main categories with pagination **PPR**/**CSR**/**SSR**/**ISR** for filtering/faceting/sorting | 1. **Static** for all SEO indexable URL<br/>2. **Dynamic** for the faceting/filtering/sorting and long tail pagination | Ideally **PPR**/**ISR** variants for SEO indexable URLs. **CSR**/**SSR** for long tail |
| **SRP** | Search Results Page                            | **SSR**/**ISR**/**CSR**                                                                                    | **Dynamic**                                                                                                            | **PPR** or **CSR**                                                                     |
| **PDP** | Product Details Page                           | Pareto rule 80/20. **SSG** for the bestsellers. **ISR** for the long tail.                                 | 1. **Static** for above the fold line<br/>2. **Dynamic** below the fold line                                           | **ISR** variants above the fold and **CSR** below the fold or **PPR**                  |

[_Reference: post 'Enterprise e-commerce migration cheat-sheet: essential terms and definitions' by Dom Sipowicz on Vercel Community ↩_](https://community.vercel.com/t/enterprise-e-commerce-migration-cheat-sheet-essential-terms-and-definitions/586)

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

[check-workflow-badge]: https://img.shields.io/github/actions/workflow/status/blazity/enterprise-commerce/check.yml?label=check
[github-license-badge]: https://img.shields.io/github/license/blazity/enterprise-commerce?link=https%3A%2F%2Fgithub.com%2FBlazity%2Fenterprise-commerce%2Fblob%2Fmain%2FLICENSE
[github-contributors-badge]: https://img.shields.io/github/contributors/blazity/enterprise-commerce?link=https%3A%2F%2Fgithub.com%2FBlazity%2Fenterprise-commerce%2Fgraphs%2Fcontributors
[discord-badge]: https://img.shields.io/discord/1111676875782234175?color=7b8dcd&link=https%3A%2F%2Fblazity.com%2Fdiscord
[check-the-docs]: https://img.shields.io/badge/check-the_docs-blue
[check-the-docs-link]: https://docs.blazity.com/enterprise-commerce
[made-by-blazity-badge]: https://img.shields.io/badge/made_by-Blazity-blue?color=FF782B&link=https://blazity.com/
[made-with-v0-badge]: https://img.shields.io/badge/designed_with-v0-red?color=black&link=https://blazity.com/
[view-live-demo-badge]: https://img.shields.io/badge/view-live_demo-purple?link=https://commerce.blazity.com/
[view-live-demo-link]: https://commerce.blazity.com/
[check-workflow-badge-link]: https://github.com/Blazity/enterprise-commerce/actions/workflows/check.yml
[github-license-badge-link]: https://github.com/Blazity/enterprise-commerce/blob/main/LICENSE
[github-contributors-badge-link]: https://github.com/Blazity/enterprise-commerce/graphs/contributors
[discord-badge-link]: https://blazity.com/discord
[made-by-blazity-badge-link]: https://blazity.com/?utm_source=nextenterprise&utm_medium=github
[made-with-v0-link]: https://v0.dev/
[v0]: https://v0.dev/
[vercel]: https://vercel.com/
[vercel-analytics]: https://vercel.com/analytics
[plp]: https://docs.blazity.com/enterprise-commerce/browsing-journey/plp
[clp]: https://docs.blazity.com/enterprise-commerce/browsing-journey/clp
[pdp]: https://docs.blazity.com/enterprise-commerce/browsing-journey/pdp
[hp]: https://docs.blazity.com/enterprise-commerce/browsing-journey/hp
