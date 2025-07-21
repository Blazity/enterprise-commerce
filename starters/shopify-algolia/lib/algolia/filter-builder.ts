export enum ComparisonOperators {
  Equal = "=",
  NotEqual = "!=",
  GreaterThan = ">",
  GreaterThanOrEqual = ">=",
  LessThan = "<",
  LessThanOrEqual = "<=",
}

export enum LogicalOperators {
  And = "AND",
  Or = "OR",
  Not = "NOT",
}

export class FilterBuilder {
  private expression: string[] = []

  hasFilters(): boolean {
    return this.expression.length > 0
  }

  where(attribute: string, value: (string | number | boolean) | null): FilterBuilder {
    if (!value) return this

    this.expression.push(`${attribute}:${this.formatValue(value)}`)
    return this
  }

  multi(
    attribute: string,
    values: (string | number | boolean)[] | null,
    operator: LogicalOperators = LogicalOperators.Or
  ): FilterBuilder {
    if (!values || values.length === 0) return this

    const conditions = values.map((value) => `${attribute}:${this.formatValue(value)}`)
    this.expression.push(`(${conditions.join(` ${operator} `)})`)
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

  raw(expression: string): FilterBuilder {
    this.expression.push(expression)
    return this
  }
  to(attribute: string, min: number | null, max: number | null): FilterBuilder {
    if (!min || !max) return this

    this.expression.push(`${attribute}:${min} TO ${max}`)
    return this
  }
  numeric(
    attribute: string,
    value: number | null,
    operator: ComparisonOperators = ComparisonOperators.Equal
  ): FilterBuilder {
    if (!value) return this

    this.expression.push(`${attribute} ${operator} ${value}`)
    return this
  }

  build(operator?: LogicalOperators): string {
    if (this.expression.length === 0) return ""
    return this.expression.join(operator ? ` ${operator} ` : " ").trim()
  }

  private formatValue(value: string | number | boolean): string {
    if (typeof value === "string") {
      return `"${value}"`
    }
    return value.toString()
  }
}
