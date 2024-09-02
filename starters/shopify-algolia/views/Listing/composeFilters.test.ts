import { HIERARCHICAL_SEPARATOR } from "../../constants"
import { FilterBuilder } from "../../utils/filterBuilder"
import { composeFilters } from "./composeFilters"

describe("composeFilters", () => {
  test("should add a category filter when categories are present", () => {
    const parsedSearchParams = { categories: ["electronics"], vendors: [], colors: [], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)

    expect(filter.build()).toStrictEqual(`(hierarchicalCategories.lvl0 IN ["electronics"])`)
  })

  test("should add a vendor filter when vendors are present", () => {
    const parsedSearchParams = { categories: [], vendors: ["Apple"], colors: [], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)

    expect(filter.build()).toStrictEqual(`(vendor IN ["Apple"])`)
  })

  test("should add a color filter when colors are present", () => {
    const parsedSearchParams = { categories: [], vendors: [], colors: ["Black"], sizes: [], minPrice: null, maxPrice: null }
    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)

    expect(filter.build()).toStrictEqual(`(flatOptions.Color IN ["Black"])`)
  })

  test("should add a minPrice filter when minPrice is specified", () => {
    const parsedSearchParams = { categories: [], vendors: [], colors: [], sizes: [], minPrice: 100, maxPrice: null }
    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)

    expect(filter.build()).toStrictEqual(`minPrice >= 100`)
  })

  test("should add a maxPrice filter when maxPrice is specified", () => {
    const parsedSearchParams = { categories: [], vendors: [], colors: [], sizes: [], minPrice: null, maxPrice: 500 }
    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)

    expect(filter.build()).toStrictEqual(`minPrice <= 500`)
  })

  test("should add all filters when all conditions are met", () => {
    const parsedSearchParams = {
      categories: ["electronics"],
      vendors: ["Apple"],
      colors: ["Black"],
      sizes: ["M"],
      minPrice: 100,
      maxPrice: 500,
    }

    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)
    const builtFilter = filter.build()

    expect(builtFilter).toStrictEqual(
      '(hierarchicalCategories.lvl0 IN ["electronics"]) AND (vendor IN ["Apple"]) AND (flatOptions.Color IN ["Black"]) AND minPrice >= 100 AND minPrice <= 500'
    )
  })

  test("should support hierarchical categories", () => {
    const parsedSearchParams = {
      categories: ["electronics > cameras", "beauty", "fashion > men > shoes"],
      vendors: [],
      colors: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
    }

    const filter = composeFilters(new FilterBuilder(), parsedSearchParams, HIERARCHICAL_SEPARATOR)
    const builtFilter = filter.build()

    expect(builtFilter).toStrictEqual(
      '(hierarchicalCategories.lvl1 IN ["electronics > cameras"]) OR (hierarchicalCategories.lvl0 IN ["beauty"]) OR (hierarchicalCategories.lvl2 IN ["fashion > men > shoes"])'
    )
  })
})
