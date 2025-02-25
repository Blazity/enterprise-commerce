import { FilterBuilder, ComparisonOperators } from "./filter-builder"

describe("FilterBuilder", () => {
  let builder: FilterBuilder

  beforeEach(() => {
    builder = new FilterBuilder()
  })

  describe("where", () => {
    it("should create a basic equality filter", () => {
      expect(new FilterBuilder().where("price", 100).build()).toBe("price:100")
      expect(new FilterBuilder().where("name", "test").build()).toBe('name:"test"')
      expect(new FilterBuilder().where("isActive", true).build()).toBe("isActive:true")
    })

    it("should handle comparison operators", () => {
      expect(new FilterBuilder().where("price", 100, ComparisonOperators.GreaterThan).build()).toBe("price>100")
      expect(new FilterBuilder().where("price", 100, ComparisonOperators.LessThanOrEqual).build()).toBe("price<=100")
      expect(new FilterBuilder().where("price", 100, ComparisonOperators.NotEqual).build()).toBe("price!=100")
    })

    it("should handle array values as IN operation", () => {
      expect(new FilterBuilder().where("category", ["books", "games"]).build()).toBe('(category:"books" OR category:"games")')
    })
  })

  describe("to", () => {
    it("should create a range filter", () => {
      expect(builder.to("price", 10, 100).build()).toBe("price:10 TO 100")
    })
  })

  describe("in", () => {
    it("should create an OR condition for multiple values", () => {
      expect(builder.in("category", ["books", "games"]).build()).toBe('(category:"books" OR category:"games")')
    })

    it("should handle empty array", () => {
      expect(builder.in("category", []).build()).toBe("")
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
      expect(builder.where("price", 100).and().where("category", "books").build()).toBe('price:100 AND category:"books"')
    })

    it("should combine conditions with OR", () => {
      const builder = new FilterBuilder()
      expect(builder.where("price", 100).or().where("price", 200).build()).toBe("price:100 OR price:200")
    })

    it("should handle NOT operator", () => {
      const builder = new FilterBuilder()
      expect(builder.not().where("category", "books").build()).toBe('NOT category:"books"')
    })
  })

  describe("group", () => {
    it("should create grouped conditions", () => {
      expect(
        new FilterBuilder()
          .group((sub) => {
            sub.where("price", 100).or().where("price", 200)
          })
          .and()
          .where("category", "books")
          .build()
      ).toBe('(price:100 OR price:200) AND category:"books"')
    })

    it("should handle nested groups", () => {
      expect(
        new FilterBuilder()
          .group((sub) => {
            sub
              .where("price", 100)
              .and()
              .group((inner) => {
                inner.where("category", "books").or().where("category", "games")
              })
          })
          .build()
      ).toBe('(price:100 AND (category:"books" OR category:"games"))')
    })
  })

  describe("complex queries", () => {
    it("should handle complex combinations of filters", () => {
      expect(
        new FilterBuilder()
          .where("price", 100, ComparisonOperators.GreaterThanOrEqual)
          .and()
          .where("price", 200, ComparisonOperators.LessThanOrEqual)
          .and()
          .group((sub) => {
            sub.where("category", "books").or().where("category", "games")
          })
          .and()
          .tag("featured")
          .build()
      ).toBe('price>=100 AND price<=200 AND (category:"books" OR category:"games") AND _tags:"featured"')
    })
  })
})
