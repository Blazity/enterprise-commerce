import { composeFilters } from "./composeFilters"

describe("composeFilters", () => {
  test("should add a category filter when categories are present", () => {
    const parsedSearchParams = { categories: ["Electronics"], vendors: [], tags: [], colors: [], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`(collections.title IN ["Electronics"])`)
  })

  test("should add a vendor filter when vendors are present", () => {
    const parsedSearchParams = { categories: [], vendors: ["Apple"], tags: [], colors: [], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`(vendor IN ["Apple"])`)
  })

  test("should add a tags filter when tags are present", () => {
    const parsedSearchParams = { categories: [], vendors: [], tags: ["Smartphone"], colors: [], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`(tags IN ["Smartphone"])`)
  })

  test("should add a color filter when colors are present", () => {
    const parsedSearchParams = { categories: [], vendors: [], tags: [], colors: ["Black"], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`(flatOptions.Color IN ["Black"])`)
  })

  test("should add a size filter when sizes are present", () => {
    const parsedSearchParams = { categories: [], vendors: [], tags: [], colors: [], sizes: ["M"], minPrice: null, maxPrice: null }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`(flatOptions.Size IN ["M"])`)
  })

  test("should add a minPrice filter when minPrice is specified", () => {
    const parsedSearchParams = { categories: [], vendors: [], tags: [], colors: [], sizes: [], minPrice: 100, maxPrice: null }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`minPrice > 100`)
  })

  test("should add a maxPrice filter when maxPrice is specified", () => {
    const parsedSearchParams = { categories: [], vendors: [], tags: [], colors: [], sizes: [], minPrice: null, maxPrice: 500 }
    const filter = composeFilters(parsedSearchParams)

    expect(filter.build()).toStrictEqual(`minPrice < 500`)
  })

  test("should add all filters when all conditions are met", () => {
    const parsedSearchParams = {
      categories: ["Electronics"],
      vendors: ["Apple"],
      tags: ["Smartphone"],
      colors: ["Black"],
      sizes: ["M"],
      minPrice: 100,
      maxPrice: 500,
    }

    const filter = composeFilters(parsedSearchParams)
    const builtFilter = filter.build()

    expect(builtFilter).toStrictEqual(
      '(collections.title IN ["Electronics"]) AND (vendor IN ["Apple"]) AND (tags IN ["Smartphone"]) AND (flatOptions.Color IN ["Black"]) AND (flatOptions.Size IN ["M"]) AND minPrice > 100 AND minPrice < 500'
    )
  })
})
