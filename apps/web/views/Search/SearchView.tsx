import { meilisearch } from "client/meilisearch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/Accordion"
import { Button } from "components/ui/Button"
import { Checkbox } from "components/ui/Checkbox"
import { Label } from "components/ui/Label"
import Link from "next/link"

import { createSearchParamsCache, parseAsString } from "nuqs/server"
import { SearchBar } from "./SearchBar"
import { Sorter } from "./Sorter"

const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(" "),
  sortBy: parseAsString.withDefault(""),
})

export async function SearchView({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const parsedSearchParams = searchParamsCache.parse(searchParams)

  const index = await meilisearch?.getIndex("products")

  const meilisearchResults = await index.search(parsedSearchParams.q, {
    sort: parsedSearchParams.sortBy ? [parsedSearchParams.sortBy] : undefined,
    limit: 50,
    facets: ["collections.title", "tags", "vendor", "variants.availableForSale", "variants.title", "options"],
  })
  const hits = meilisearchResults.hits

  const availableForSale = meilisearchResults.facetDistribution?.["variants.availableForSale"]
  const collections = meilisearchResults.facetDistribution?.["collections.title"]
  const tags = meilisearchResults.facetDistribution?.["tags"]
  const variants = meilisearchResults.facetDistribution?.["variants.title"]
  const vendors = meilisearchResults.facetDistribution?.["vendor"]

  console.log(meilisearchResults.facetDistribution)

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Filters</h2>
          <SearchBar />
          <Accordion collapsible className="w-full" type="single">
            <AccordionItem value="category">
              <AccordionTrigger className="text-base">Category</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {Object.entries(collections || {}).map(([collection, noOfItems], index) => (
                    <Label key={collection} className="flex items-center gap-2 font-normal">
                      <Checkbox id="category-clothing" />
                      {collection}
                      {"\n                              "}({noOfItems} items)
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tags">
              <AccordionTrigger className="text-base">Tags</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {Object.entries(tags || {}).map(([tag, noOfItems], index) => (
                    <Label key={tag} className="flex items-center gap-2 font-normal">
                      <Checkbox id="category-clothing" />
                      {tag}
                      {"\n                              "}({noOfItems} items)
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
              <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label>
                    Min price
                    <input className="ml-2 inline-flex" type="number" />
                  </Label>
                  <Label>
                    Max price
                    <input className="ml-2 inline-flex" type="number" />
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <Sorter />
          </div>
          {/* <NextInstantSearch
            meilisearchOptions={{ sort: parsedSearchParams.sortBy ? [parsedSearchParams.sortBy] : [] }}
            searchParams={{ q: parsedSearchParams.q || " " }}
            options={{ revalidate: 60 }}
            cacheKey={parsedSearchParams.sortBy || ""}
            indexName="products"
            render={({ hits }: any) => (
              <> */}
          {/* <pre>xdxd {JSON.stringify(payload.hits, null, 2)}</pre> */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hits.map((singleResult) => (
              <div className="group relative overflow-hidden rounded-lg" key={singleResult.id}>
                <Link className="absolute inset-0 z-10" href={`/products/${singleResult.handle}`}>
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 1"
                  className="h-60 w-full object-cover"
                  height={singleResult.images[0].height || 300}
                  src={singleResult.images[0].url}
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={singleResult.images[0].width || 400}
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold md:text-xl">{singleResult.title}</h3>
                  <h4 className="text-base font-semibold md:text-lg">${singleResult.minPrice || 1337}</h4>
                  <Button className="mt-2" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* </> */}
          {/* )}
          /> */}
        </div>
      </div>
    </div>
  )
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  )
}
