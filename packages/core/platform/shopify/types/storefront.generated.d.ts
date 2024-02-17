/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from "./storefront.types.d.ts"

export type SingleCartFragment = Pick<StorefrontTypes.Cart, "id" | "checkoutUrl" | "totalQuantity"> & {
  cost: {
    subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
    totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
    totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">>
  }
  lines: {
    edges: Array<{
      node:
        | (Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
            cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
            merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
              selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
              product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                variants: {
                  edges: Array<{
                    node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                      selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                      price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                    }
                  }>
                }
                featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                seo: Pick<StorefrontTypes.Seo, "description" | "title">
              }
            }
          })
        | (Pick<StorefrontTypes.ComponentizableCartLine, "id" | "quantity"> & {
            cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
            merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
              selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
              product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                variants: {
                  edges: Array<{
                    node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                      selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                      price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                    }
                  }>
                }
                featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                seo: Pick<StorefrontTypes.Seo, "description" | "title">
              }
            }
          })
    }>
  }
}

export type SingleCollectionFragment = Pick<StorefrontTypes.Collection, "handle" | "title" | "description" | "updatedAt"> & {
  seo: Pick<StorefrontTypes.Seo, "description" | "title">
}

export type SingleImageFragment = Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">

export type SinglePageFragment = Pick<StorefrontTypes.Page, "id" | "title" | "handle" | "body" | "bodySummary" | "createdAt" | "updatedAt"> & {
  seo?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Seo, "description" | "title">>
}

export type SingleProductFragment = Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
  options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
  priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
  variants: {
    edges: Array<{
      node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
        selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
        price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
      }
    }>
  }
  featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
  images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
  seo: Pick<StorefrontTypes.Seo, "description" | "title">
}

export type SeoFragment = Pick<StorefrontTypes.Seo, "description" | "title">

export type CreateCartLineMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars["ID"]["input"]
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput
}>

export type CreateCartLineMutation = {
  cartLinesAdd?: StorefrontTypes.Maybe<{
    cart?: StorefrontTypes.Maybe<
      Pick<StorefrontTypes.Cart, "id" | "checkoutUrl" | "totalQuantity"> & {
        cost: {
          subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">>
        }
        lines: {
          edges: Array<{
            node:
              | (Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
              | (Pick<StorefrontTypes.ComponentizableCartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
          }>
        }
      }
    >
  }>
}

export type CreateCartMutationVariables = StorefrontTypes.Exact<{
  lineItems?: StorefrontTypes.InputMaybe<Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput>
}>

export type CreateCartMutation = {
  cartCreate?: StorefrontTypes.Maybe<{
    cart?: StorefrontTypes.Maybe<
      Pick<StorefrontTypes.Cart, "id" | "checkoutUrl" | "totalQuantity"> & {
        cost: {
          subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">>
        }
        lines: {
          edges: Array<{
            node:
              | (Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
              | (Pick<StorefrontTypes.ComponentizableCartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
          }>
        }
      }
    >
  }>
}

export type EditCartLineMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars["ID"]["input"]
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput
}>

export type EditCartLineMutation = {
  cartLinesUpdate?: StorefrontTypes.Maybe<{
    cart?: StorefrontTypes.Maybe<
      Pick<StorefrontTypes.Cart, "id" | "checkoutUrl" | "totalQuantity"> & {
        cost: {
          subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">>
        }
        lines: {
          edges: Array<{
            node:
              | (Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
              | (Pick<StorefrontTypes.ComponentizableCartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
          }>
        }
      }
    >
  }>
}

export type RemoveCartLineMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars["ID"]["input"]
  lineIds: Array<StorefrontTypes.Scalars["ID"]["input"]> | StorefrontTypes.Scalars["ID"]["input"]
}>

export type RemoveCartLineMutation = {
  cartLinesRemove?: StorefrontTypes.Maybe<{
    cart?: StorefrontTypes.Maybe<
      Pick<StorefrontTypes.Cart, "id" | "checkoutUrl" | "totalQuantity"> & {
        cost: {
          subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">>
        }
        lines: {
          edges: Array<{
            node:
              | (Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
              | (Pick<StorefrontTypes.ComponentizableCartLine, "id" | "quantity"> & {
                  cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                    selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                    product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                      priceRange: {
                        maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      }
                      variants: {
                        edges: Array<{
                          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                          }
                        }>
                      }
                      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                      seo: Pick<StorefrontTypes.Seo, "description" | "title">
                    }
                  }
                })
          }>
        }
      }
    >
  }>
}

export type SingleCartQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars["ID"]["input"]
}>

export type SingleCartQuery = {
  cart?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Cart, "id" | "checkoutUrl" | "totalQuantity"> & {
      cost: {
        subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
        totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
        totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">>
      }
      lines: {
        edges: Array<{
          node:
            | (Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
                cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                  selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                  product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                    options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                    priceRange: {
                      maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                    }
                    variants: {
                      edges: Array<{
                        node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                          selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                          price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        }
                      }>
                    }
                    featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                    images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                    seo: Pick<StorefrontTypes.Seo, "description" | "title">
                  }
                }
              })
            | (Pick<StorefrontTypes.ComponentizableCartLine, "id" | "quantity"> & {
                cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
                merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
                  selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                  product: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
                    options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
                    priceRange: {
                      maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                      minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                    }
                    variants: {
                      edges: Array<{
                        node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                          selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                          price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
                        }
                      }>
                    }
                    featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
                    images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
                    seo: Pick<StorefrontTypes.Seo, "description" | "title">
                  }
                }
              })
        }>
      }
    }
  >
}

export type SingleCollectionQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars["String"]["input"]
}>

export type SingleCollectionQuery = {
  collection?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Collection, "handle" | "title" | "description" | "updatedAt"> & { seo: Pick<StorefrontTypes.Seo, "description" | "title"> }
  >
}

export type CollectionsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never }>

export type CollectionsQuery = {
  collections: {
    edges: Array<{ node: Pick<StorefrontTypes.Collection, "handle" | "title" | "description" | "updatedAt"> & { seo: Pick<StorefrontTypes.Seo, "description" | "title"> } }>
  }
}

export type CollectionProductsQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars["String"]["input"]
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductCollectionSortKeys>
  reverse?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars["Boolean"]["input"]>
}>

export type CollectionProductsQuery = {
  collection?: StorefrontTypes.Maybe<{
    products: {
      edges: Array<{
        node: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
          options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
          priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
          variants: {
            edges: Array<{
              node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
                selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
                price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
              }
            }>
          }
          featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
          images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
          seo: Pick<StorefrontTypes.Seo, "description" | "title">
        }
      }>
    }
  }>
}

export type MenuQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars["String"]["input"]
}>

export type MenuQuery = { menu?: StorefrontTypes.Maybe<{ items: Array<Pick<StorefrontTypes.MenuItem, "title" | "url">> }> }

export type SinglePageQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars["String"]["input"]
}>

export type SinglePageQuery = {
  page?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Page, "id" | "title" | "handle" | "body" | "bodySummary" | "createdAt" | "updatedAt"> & {
      seo?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Seo, "description" | "title">>
    }
  >
}

export type PagesQueryVariables = StorefrontTypes.Exact<{ [key: string]: never }>

export type PagesQuery = {
  pages: {
    edges: Array<{
      node: Pick<StorefrontTypes.Page, "id" | "title" | "handle" | "body" | "bodySummary" | "createdAt" | "updatedAt"> & {
        seo?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Seo, "description" | "title">>
      }
    }>
  }
}

export type SingleProductQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars["ID"]["input"]
}>

export type SingleProductQuery = {
  product?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
      collections: { nodes: Array<Pick<StorefrontTypes.Collection, "handle" | "title" | "description" | "updatedAt">> }
      options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
      priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
      variants: {
        edges: Array<{
          node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
            selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
            price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          }
        }>
      }
      featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
      images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
      seo: Pick<StorefrontTypes.Seo, "description" | "title">
    }
  >
}

export type ProductsByHandleQueryVariables = StorefrontTypes.Exact<{
  query: StorefrontTypes.Scalars["String"]["input"]
}>

export type ProductsByHandleQuery = {
  products: {
    edges: Array<{
      node: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
        collections: { nodes: Array<Pick<StorefrontTypes.Collection, "handle" | "title" | "description" | "updatedAt">> }
        options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
        priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
        variants: {
          edges: Array<{
            node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
              selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
              price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
            }
          }>
        }
        featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
        images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
        seo: Pick<StorefrontTypes.Seo, "description" | "title">
      }
    }>
  }
}

export type ProductsQueryVariables = StorefrontTypes.Exact<{
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductSortKeys>
  reverse?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars["Boolean"]["input"]>
  query?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars["String"]["input"]>
  numProducts: StorefrontTypes.Scalars["Int"]["input"]
  cursor?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars["String"]["input"]>
}>

export type ProductsQuery = {
  products: {
    edges: Array<{
      node: Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
        options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
        priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
        variants: {
          edges: Array<{
            node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
              selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
              price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
            }
          }>
        }
        featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
        images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
        seo: Pick<StorefrontTypes.Seo, "description" | "title">
      }
    }>
    pageInfo: Pick<StorefrontTypes.PageInfo, "hasNextPage" | "endCursor">
  }
}

export type ProductRecommendationsQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars["ID"]["input"]
}>

export type ProductRecommendationsQuery = {
  productRecommendations?: StorefrontTypes.Maybe<
    Array<
      Pick<StorefrontTypes.Product, "id" | "handle" | "title" | "description" | "descriptionHtml" | "vendor" | "tags" | "updatedAt" | "createdAt"> & {
        options: Array<Pick<StorefrontTypes.ProductOption, "id" | "name" | "values">>
        priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">; minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode"> }
        variants: {
          edges: Array<{
            node: Pick<StorefrontTypes.ProductVariant, "id" | "title" | "availableForSale"> & {
              selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, "name" | "value">>
              price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
            }
          }>
        }
        featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">>
        images: { edges: Array<{ node: Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height"> }> }
        seo: Pick<StorefrontTypes.Seo, "description" | "title">
      }
    >
  >
}

interface GeneratedQueryTypes {
  "#graphql\n  query SingleCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...singleCart\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {
    return: SingleCartQuery
    variables: SingleCartQueryVariables
  }
  "#graphql\n  query SingleCollection($handle: String!) {\n    collection(handle: $handle) {\n      ...singleCollection\n    }\n  }\n  #graphql\n  fragment singleCollection on Collection {\n    handle\n    title\n    description\n    seo {\n      ...seo\n    }\n    updatedAt\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: SingleCollectionQuery
    variables: SingleCollectionQueryVariables
  }
  "#graphql\n  query Collections {\n    collections(first: 100, sortKey: TITLE) {\n      edges {\n        node {\n          ...singleCollection\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singleCollection on Collection {\n    handle\n    title\n    description\n    seo {\n      ...seo\n    }\n    updatedAt\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: CollectionsQuery
    variables: CollectionsQueryVariables
  }
  "#graphql\n  query CollectionProducts($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {\n    collection(handle: $handle) {\n      products(sortKey: $sortKey, reverse: $reverse, first: 100) {\n        edges {\n          node {\n            ...singleProduct\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: CollectionProductsQuery
    variables: CollectionProductsQueryVariables
  }
  "#graphql\n  query Menu($handle: String!) {\n    menu(handle: $handle) {\n      items {\n        title\n        url\n      }\n    }\n  }\n": {
    return: MenuQuery
    variables: MenuQueryVariables
  }
  "#graphql\n  query SinglePage($handle: String!) {\n    page(handle: $handle) {\n      ...singlePage\n    }\n  }\n  #graphql\n  fragment singlePage on Page {\n    ... on Page {\n      id\n      title\n      handle\n      body\n      bodySummary\n      seo {\n        ...seo\n      }\n      createdAt\n      updatedAt\n    }\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: SinglePageQuery
    variables: SinglePageQueryVariables
  }
  "#graphql\n  query Pages {\n    pages(first: 100) {\n      edges {\n        node {\n          ...singlePage\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singlePage on Page {\n    ... on Page {\n      id\n      title\n      handle\n      body\n      bodySummary\n      seo {\n        ...seo\n      }\n      createdAt\n      updatedAt\n    }\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: PagesQuery
    variables: PagesQueryVariables
  }
  "#graphql\n  query SingleProduct($id: ID!) {\n    product(id: $id) {\n      ...singleProduct\n      collections(first: 15) {\n        nodes {\n          handle\n          title\n          description\n          updatedAt\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: SingleProductQuery
    variables: SingleProductQueryVariables
  }
  "#graphql\n  query ProductsByHandle($query: String!) {\n    products(first: 1, query: $query) {\n      edges {\n        node {\n          ...singleProduct\n          collections(first: 15) {\n            nodes {\n              handle\n              title\n              description\n              updatedAt\n            }\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: ProductsByHandleQuery
    variables: ProductsByHandleQueryVariables
  }
  "#graphql\n  query Products($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $numProducts: Int!, $cursor: String) {\n    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $numProducts, after: $cursor ) {\n      edges {\n        node {\n          ...singleProduct\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: ProductsQuery
    variables: ProductsQueryVariables
  }
  "#graphql\n  query ProductRecommendations($productId: ID!) {\n    productRecommendations(productId: $productId) {\n      ...singleProduct\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {
    return: ProductRecommendationsQuery
    variables: ProductRecommendationsQueryVariables
  }
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation CreateCartLine($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {
    return: CreateCartLineMutation
    variables: CreateCartLineMutationVariables
  }
  "#graphql\n  mutation CreateCart($lineItems: [CartLineInput!]) {\n    cartCreate(input: { lines: $lineItems }) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {
    return: CreateCartMutation
    variables: CreateCartMutationVariables
  }
  "#graphql\n  mutation EditCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {
    return: EditCartLineMutation
    variables: EditCartLineMutationVariables
  }
  "#graphql\n  mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {
    return: RemoveCartLineMutation
    variables: RemoveCartLineMutationVariables
  }
}
declare module "@shopify/storefront-api-client" {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
