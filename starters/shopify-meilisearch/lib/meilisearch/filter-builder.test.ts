import { ComparisonOperators, FilterBuilder, SpecialOperators } from "./filter-builder"

describe("FilterBuilder", () => {
  test("should create a basic condition", () => {
    const filter = new FilterBuilder().where("genres", ComparisonOperators.Equal, "horror").build()

    expect(filter).toBe('genres = "horror"')
  })

  test("should handle the TO operator", () => {
    const filter = new FilterBuilder().to("rating.users", 80, 89).build()

    expect(filter).toBe("rating.users 80 TO 89")
  })

  test("should handle the EXISTS operator", () => {
    const filter = new FilterBuilder().exists("overview").build()

    expect(filter).toBe("overview EXISTS")
  })

  test("should handle the IS EMPTY operator", () => {
    const filter = new FilterBuilder().isEmpty("overview").build()

    expect(filter).toBe("overview IS EMPTY")
  })

  test("should handle the IS NULL operator", () => {
    const filter = new FilterBuilder().isNull("release_date").build()

    expect(filter).toBe("release_date IS NULL")
  })

  test("should negate a condition using the NOT operator", () => {
    const filter = new FilterBuilder().not().where("director", ComparisonOperators.Equal, "Jordan Peele").build()

    expect(filter).toBe('NOT director = "Jordan Peele"')
  })

  test("should combine conditions with AND/OR logical operators", () => {
    const filter = new FilterBuilder().where("genres", ComparisonOperators.Equal, "horror").and().where("rating.users", ComparisonOperators.GreaterThan, 85).build()
    const filterOr = new FilterBuilder().where("genres", ComparisonOperators.Equal, "horror").or().where("genres", ComparisonOperators.Equal, "comedy").build()

    expect(filter).toBe('genres = "horror" AND rating.users > 85')
    expect(filterOr).toBe('genres = "horror" OR genres = "comedy"')
  })

  test("should handle complex grouping with logical operators", () => {
    const filter = new FilterBuilder()
      .group((builder) => {
        builder.where("genres", ComparisonOperators.Equal, "horror").or().where("genres", ComparisonOperators.Equal, "comedy")
      })
      .and()
      .where("rating.users", ComparisonOperators.GreaterThan, 85)
      .build()

    expect(filter).toBe('(genres = "horror" OR genres = "comedy") AND rating.users > 85')
  })

  test("should create an inequality condition", () => {
    const filter = new FilterBuilder().where("genres", ComparisonOperators.NotEqual, "action").build()

    expect(filter).toBe('genres != "action"')
  })

  test('should create a comparison condition using ">" operator', () => {
    const filter = new FilterBuilder().where("rating.users", ComparisonOperators.GreaterThan, 85).build()

    expect(filter).toBe("rating.users > 85")
  })

  test('should combine comparison conditions using ">= AND <" operators', () => {
    const filter = new FilterBuilder().where("rating.users", ComparisonOperators.GreaterThanOrEqual, 80).and().where("rating.users", ComparisonOperators.LessThan, 90).build()

    expect(filter).toBe("rating.users >= 80 AND rating.users < 90")
  })

  test('should handle "NOT EXISTS" operator', () => {
    const filter = new FilterBuilder().not().exists("release_date").build()

    expect(filter).toBe("NOT release_date EXISTS")
  })

  test('should handle reverse "NOT EXISTS" logic', () => {
    const filter = new FilterBuilder().not().where("release_date", SpecialOperators.Exists).build()

    expect(filter).toBe("NOT release_date EXISTS")
  })

  test('should handle "IN" operator with multiple values', () => {
    const filter = new FilterBuilder().in("genres", ["horror", "comedy"]).build()

    expect(filter).toBe('genres IN ["horror", "comedy"]')
  })

  test('should handle "OR" logic with the same field', () => {
    const filter = new FilterBuilder().where("genres", ComparisonOperators.Equal, "horror").or().where("genres", ComparisonOperators.Equal, "comedy").build()

    expect(filter).toBe('genres = "horror" OR genres = "comedy"')
  })

  test('should handle "NOT IN" operator with multiple values', () => {
    const filter = new FilterBuilder().not().in("genres", ["horror", "comedy"]).build()

    expect(filter).toBe('NOT genres IN ["horror", "comedy"]')
  })

  test("should combine conditions without logical operators as array", () => {
    const filter = new FilterBuilder()
      .group((sub) => {
        sub.where("genres", ComparisonOperators.Equal, "horror").and().where("director", ComparisonOperators.Equal, "Jordan Peele")
      })
      .build()

    expect(filter).toBe('(genres = "horror" AND director = "Jordan Peele")')
  })

  test("should handle OR logic within groups", () => {
    const filter = new FilterBuilder()
      .group((sub) => {
        sub.where("genres", ComparisonOperators.Equal, "horror").or().where("genres", ComparisonOperators.Equal, "comedy")
      })
      .build()

    expect(filter).toBe('(genres = "horror" OR genres = "comedy")')
  })

  test("should combine multiple conditions and groups", () => {
    const filter = new FilterBuilder()
      .group((sub) => {
        sub.where("genres", ComparisonOperators.Equal, "horror").or().where("genres", ComparisonOperators.Equal, "comedy")
      })
      .and()
      .where("director", ComparisonOperators.Equal, "Jordan Peele")
      .build()

    expect(filter).toBe('(genres = "horror" OR genres = "comedy") AND director = "Jordan Peele"')
  })

  test("should handle complex condition with OR and NOT operators", () => {
    const filter = new FilterBuilder()
      .group((sub) => {
        sub.where("genres", ComparisonOperators.Equal, "comedy").or().where("genres", ComparisonOperators.Equal, "horror")
      })
      .and()
      .not()
      .where("director", ComparisonOperators.Equal, "Jordan Peele")
      .build()

    expect(filter).toBe('(genres = "comedy" OR genres = "horror") AND NOT director = "Jordan Peele"')
  })

  test("should handle mixed array and string syntax for complex condition", () => {
    const filter = new FilterBuilder()
      .group((sub) => {
        sub.in("genres", ["comedy", "horror"])
      })
      .and()
      .not()
      .where("director", ComparisonOperators.Equal, "Jordan Peele")
      .build()

    expect(filter).toBe('(genres IN ["comedy", "horror"]) AND NOT director = "Jordan Peele"')
  })

  test("should correctly handle nested groups", () => {
    const filter = new FilterBuilder()
      .group((g1) => {
        g1.group((g2) => {
          g2.where("rating", ComparisonOperators.GreaterThan, 9)
        })
          .and()
          .exists("director")
      })
      .build()

    expect(filter).toBe("((rating > 9) AND director EXISTS)")
  })

  test("should not start with a logical operator", () => {
    const query = new FilterBuilder().and().where("field", ComparisonOperators.Equal, "value").build()

    expect(query).not.toMatch(/^\s*AND\s+/)
  })

  test("should not end with a logical operator", () => {
    const query = new FilterBuilder().where("field", ComparisonOperators.Equal, "value").and().build()

    expect(query).not.toMatch(/\s+AND\s*$/)
  })

  test("should handle complex expressions without starting or ending with a logical operator", () => {
    const query = new FilterBuilder()
      .and()
      .where("field1", ComparisonOperators.Equal, "value")
      .and()
      .group((builder) => {
        builder.where("field2", ComparisonOperators.GreaterThan, 10).or().where("field3", ComparisonOperators.LessThan, 20)
      })
      .or()
      .build()

    expect(query).toMatch(/^field1 = "value" AND/)
    expect(query).toMatch(/\(field2 > 10 OR field3 < 20\)$/)
    expect(query).not.toMatch(/^\s*AND\s+/)
    expect(query).not.toMatch(/\s+OR\s*$/)
  })
})
