import { FilterBuilder, ComparisonOperators } from "./filter-builder"

describe("FilterBuilder", () => {
  let builder: FilterBuilder

  beforeEach(() => {
    builder = new FilterBuilder()
  })

  describe("where", () => {
    it("should create a basic equality filter", () => {
      expect(new FilterBuilder().where("minPrice", 100).build()).toBe("minPrice:100")
      expect(new FilterBuilder().where("handle", "test").build()).toBe('handle:"test"')
    })

    it("should handle comparison operators", () => {
      expect(new FilterBuilder().where("minPrice", 100, ComparisonOperators.GreaterThan).build()).toBe("minPrice>100")
      expect(new FilterBuilder().where("minPrice", 100, ComparisonOperators.LessThanOrEqual).build()).toBe("minPrice<=100")
      expect(new FilterBuilder().where("minPrice", 100, ComparisonOperators.NotEqual).build()).toBe("minPrice!=100")
    })

    it("should handle array values as IN operation", () => {
      expect(new FilterBuilder().where("hierarchicalCategories.lvl0", ["books", "games"]).build()).toBe(
        '(hierarchicalCategories.lvl0:"books" OR hierarchicalCategories.lvl0:"games")'
      )
    })
  })

  describe("to", () => {
    it("should create a range filter", () => {
      expect(builder.to("minPrice", 10, 100).build()).toBe("minPrice:10 TO 100")
    })
  })

  describe("in", () => {
    it("should create an OR condition for multiple values", () => {
      expect(builder.in("hierarchicalCategories.lvl0", ["books", "games"]).build()).toBe('(hierarchicalCategories.lvl0:"books" OR hierarchicalCategories.lvl0:"games")')
    })

    it("should handle empty array", () => {
      expect(builder.in("hierarchicalCategories.lvl0", []).build()).toBe("")
    })

    it("should handle different value types", () => {
      expect(builder.in("mixed", ["test", 123, true]).build()).toBe('(mixed:"test" OR mixed:123 OR mixed:true)')
    })
  })

  describe("tag", () => {
    it("should create a tag filter", () => {
      expect(builder.tag("featured").build()).toBe('_tags:"featured"')
    })
  })

  describe("logical operators", () => {
    it("should combine conditions with AND", () => {
      const builder = new FilterBuilder()
      expect(builder.where("minPrice", 100).and().where("hierarchicalCategories.lvl0", "books").build()).toBe('minPrice:100 AND hierarchicalCategories.lvl0:"books"')
    })

    it("should combine conditions with OR", () => {
      const builder = new FilterBuilder()
      expect(builder.where("minPrice", 100).or().where("minPrice", 200).build()).toBe("minPrice:100 OR minPrice:200")
    })

    it("should handle NOT operator", () => {
      const builder = new FilterBuilder()
      expect(builder.not().where("hierarchicalCategories.lvl0", "books").build()).toBe('NOT hierarchicalCategories.lvl0:"books"')
    })
  })

  describe("group", () => {
    it("should create grouped conditions", () => {
      expect(
        new FilterBuilder()
          .group((sub) => {
            sub.where("minPrice", 100).or().where("minPrice", 200)
          })
          .and()
          .where("hierarchicalCategories.lvl0", "books")
          .build()
      ).toBe('(minPrice:100 OR minPrice:200) AND hierarchicalCategories.lvl0:"books"')
    })

    it("should handle nested groups", () => {
      expect(
        new FilterBuilder()
          .group((sub) => {
            sub
              .where("minPrice", 100)
              .and()
              .group((inner) => {
                inner.where("hierarchicalCategories.lvl0", "books").or().where("hierarchicalCategories.lvl0", "games")
              })
          })
          .build()
      ).toBe('(minPrice:100 AND (hierarchicalCategories.lvl0:"books" OR hierarchicalCategories.lvl0:"games"))')
    })
  })

  describe("complex queries", () => {
    it("should handle complex combinations of filters", () => {
      expect(
        new FilterBuilder()
          .where("minPrice", 100, ComparisonOperators.GreaterThanOrEqual)
          .and()
          .where("minPrice", 200, ComparisonOperators.LessThanOrEqual)
          .and()
          .group((sub) => {
            sub.where("hierarchicalCategories.lvl0", "books").or().where("hierarchicalCategories.lvl0", "games")
          })
          .and()
          .tag("featured")
          .build()
      ).toBe('minPrice>=100 AND minPrice<=200 AND (hierarchicalCategories.lvl0:"books" OR hierarchicalCategories.lvl0:"games") AND _tags:"featured"')
    })
  })
})
