import { ComparisonOperators, FilterBuilder, LogicalOperators } from "./filter-builder"

describe("FilterBuilder", () => {
  let builder: FilterBuilder

  beforeEach(() => {
    builder = new FilterBuilder()
  })

  describe("hasFilters", () => {
    it("should return false when no filters are added", () => {
      expect(builder.hasFilters()).toBe(false)
    })

    it("should return true when filters are added", () => {
      builder.where("category", "books")
      expect(builder.hasFilters()).toBe(true)
    })
  })

  describe("where", () => {
    it("should create a basic filter", () => {
      expect(builder.where("category", "books").build()).toBe('category:"books"')
    })

    it("should handle number values", () => {
      expect(builder.where("price", 100).build()).toBe("price:100")
    })

    it("should handle boolean values", () => {
      expect(builder.where("inStock", true).build()).toBe("inStock:true")
    })

    it("should ignore null values", () => {
      expect(builder.where("category", null).build()).toBe("")
    })
  })

  describe("multi", () => {
    it("should create an OR condition for multiple values", () => {
      expect(builder.multi("category", ["books", "games"]).build()).toBe('(category:"books" OR category:"games")')
    })

    it("should create an AND condition when specified", () => {
      expect(builder.multi("category", ["books", "games"], LogicalOperators.And).build()).toBe(
        '(category:"books" AND category:"games")'
      )
    })

    it("should handle empty array", () => {
      expect(builder.multi("category", []).build()).toBe("")
    })

    it("should handle null input", () => {
      expect(builder.multi("category", null).build()).toBe("")
    })
  })

  describe("numeric", () => {
    it("should create numeric comparison", () => {
      expect(builder.numeric("price", 100).build()).toBe("price = 100")
    })

    it("should handle different operators", () => {
      expect(builder.numeric("price", 100, ComparisonOperators.GreaterThan).build()).toBe("price > 100")
    })

    it("should ignore null values", () => {
      expect(builder.numeric("price", null).build()).toBe("")
    })
  })

  describe("to", () => {
    it("should create range filter", () => {
      expect(builder.to("price", 10, 100).build()).toBe("price:10 TO 100")
    })

    it("should ignore if either value is null", () => {
      expect(builder.to("price", null, 100).build()).toBe("")
      expect(builder.to("price", 10, null).build()).toBe("")
    })
  })

  describe("logical operators", () => {
    it("should chain conditions with AND", () => {
      expect(builder.where("category", "books").and().where("price", 100).build()).toBe(
        'category:"books" AND price:100'
      )
    })

    it("should chain conditions with OR", () => {
      expect(builder.where("category", "books").or().where("category", "games").build()).toBe(
        'category:"books" OR category:"games"'
      )
    })

    it("should handle NOT operator", () => {
      expect(builder.where("category", "books").and().not().where("price", 100).build()).toBe(
        'category:"books" AND NOT price:100'
      )
    })
  })

  describe("raw", () => {
    it("should add raw expression", () => {
      expect(builder.raw('category:"books"').build()).toBe('category:"books"')
    })

    it("should combine with other filters", () => {
      expect(builder.where("category", "books").and().raw("price:100").build()).toBe('category:"books" AND price:100')
    })
  })

  describe("build", () => {
    it("should join multiple conditions with default operator", () => {
      builder.where("category", "books").where("price", 100)
      expect(builder.build()).toBe('category:"books" price:100')
    })

    it("should join multiple conditions with specified operator", () => {
      builder.where("category", "books").where("price", 100)
      expect(builder.build(LogicalOperators.And)).toBe('category:"books" AND price:100')
    })

    it("should return empty string when no filters", () => {
      expect(builder.build()).toBe("")
    })
  })
})
