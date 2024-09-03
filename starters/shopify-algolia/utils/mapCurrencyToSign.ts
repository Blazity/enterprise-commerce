export type CurrencyType = "USD" | "EUR" | "GBP"

export function mapCurrencyToSign(currency: CurrencyType) {
  switch (currency) {
    case "USD":
      return "$"
    case "EUR":
      return "€"
    case "GBP":
      return "£"

    default:
      return currency
  }
}
