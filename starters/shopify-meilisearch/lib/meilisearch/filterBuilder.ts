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

export enum SpecialOperators {
  Exists = "EXISTS",
  IsEmpty = "IS EMPTY",
  IsNull = "IS NULL",
}

type Value = string | number | (string | number)[]

export class FilterBuilder {
  private expression: string[] = []

  where(attribute: string, operator: ComparisonOperators | SpecialOperators, value?: Value): FilterBuilder {
    if (Array.isArray(value)) {
      value = `[${value.map((v) => (typeof v === "string" ? `"${v}"` : v)).join(", ")}]`
    } else if (typeof value === "string" && operator !== ComparisonOperators.To) {
      value = `"${value}"`
    }

    if (value) {
      this.expression.push(`${attribute} ${operator} ${value}`)
    } else {
      this.expression.push(`${attribute} ${operator}`)
    }

    return this
  }

  to(attribute: string, min: number, max: number): FilterBuilder {
    this.expression.push(`${attribute} ${min} ${ComparisonOperators.To} ${max}`)
    return this
  }

  exists(attribute: string): FilterBuilder {
    this.expression.push(`${attribute} ${SpecialOperators.Exists}`)
    return this
  }

  isEmpty(attribute: string): FilterBuilder {
    this.expression.push(`${attribute} ${SpecialOperators.IsEmpty}`)
    return this
  }

  isNull(attribute: string): FilterBuilder {
    this.expression.push(`${attribute} ${SpecialOperators.IsNull}`)
    return this
  }

  in(attribute: string, values: (string | number)[]): FilterBuilder {
    const formattedValues = `[${values.map((v) => (typeof v === "string" ? `"${v}"` : v)).join(", ")}]`
    this.expression.push(`${attribute} IN ${formattedValues}`)
    return this
  }

  not(): FilterBuilder {
    this.expression.push(LogicalOperators.Not)
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

  group(fn: (builder: FilterBuilder) => void): FilterBuilder {
    const subBuilder = new FilterBuilder()
    fn(subBuilder)
    const subExpression = subBuilder.build()
    this.expression.push(`(${subExpression})`)
    return this
  }

  build(): string {
    const isConnectingOperatorFirst = this.expression.length > 0 && this.isConnectingOperator(this.expression[0])
    const isConnectingOperatorLast = this.expression.length > 0 && this.isConnectingOperator(this.expression[this.expression.length - 1])

    if (isConnectingOperatorFirst) this.expression.shift()
    if (isConnectingOperatorLast) this.expression.pop()

    return this.expression.join(" ")
  }

  private isConnectingOperator(value: string): boolean {
    return value === LogicalOperators.And || value === LogicalOperators.Or
  }
}
