// For numeric attributes only
export enum ComparisonOperators {
  Equal = "=",
  NotEqual = "!=",
  GreaterThan = ">",
  GreaterThanOrEqual = ">=",
  LessThan = "<",
  LessThanOrEqual = "<=",
  To = "TO",
}

export enum LogicalOperators {
  And = "AND",
  Or = "OR",
  Not = "NOT",
}

type Value = string | number | boolean | (string | number | boolean)[]

export class FilterBuilder {
  private expression: string[] = []

  where(attribute: string, value: Value, operator?: ComparisonOperators): FilterBuilder {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return this
      }
      const conditions = value.map((v) => `${attribute}:${this.formatValue(v)}`)
      this.expression.push(conditions.length === 1 ? conditions[0] : `(${conditions.join(" OR ")})`)
    } else {
      this.expression.push(`${attribute}${operator || ":"}${this.formatValue(value)}`)
    }
    return this
  }

  to(attribute: string, min: number, max: number): FilterBuilder {
    this.expression.push(`${attribute}:${min} TO ${max}`)
    return this
  }

  in(attribute: string, values: (string | number | boolean)[]): FilterBuilder {
    if (values.length === 0) {
      return this
    }

    const conditions = values.map((value) => `${attribute}:${this.formatValue(value)}`)
    this.expression.push(conditions.length === 1 ? conditions[0] : `(${conditions.join(" OR ")})`)
    return this
  }

  tag(value: string): FilterBuilder {
    this.expression.push(`_tags:${this.formatValue(value)}`)
    return this
  }

  and(): FilterBuilder {
    this.expression.push(LogicalOperators.And)
    return this
  }

  or(): FilterBuilder {
    this.expression.push(LogicalOperators.Or)
    return this
  }

  not(): FilterBuilder {
    this.expression.push(LogicalOperators.Not)
    return this
  }

  group(fn: (builder: FilterBuilder) => void): FilterBuilder {
    const subBuilder = new FilterBuilder()
    fn(subBuilder)
    const subExpression = subBuilder.build()
    this.expression.push(`(${subExpression})`)
    return this
  }

  build(): string {
    return this.expression.join(" ")
  }

  private formatValue(value: string | number | boolean): string {
    if (typeof value === "string") {
      return `"${value}"`
    }
    return value.toString()
  }

  private formatArray(values: (string | number | boolean)[]): string {
    return `(${values.map((v) => this.formatValue(v)).join(",")})`
  }
}
