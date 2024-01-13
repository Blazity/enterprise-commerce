import { Product, SeedStrategy } from "types"
import { createAdminApiClient } from "@shopify/admin-api-client"
import { gql } from "graphql-tag"
import { print } from "graphql/language/printer"
import { env } from "../env"

interface ShopifyProduct {
  id: number
  title: String
  body_html: string
  vendor: string
  product_type: string
  handle: string
  tags: string
  status: string
  images: ProductImage[]
  image: null
}

interface ProductImage {
  id: number
  product_id: number
  width: number
  height: number
  src: string
}

const operation = gql`
  mutation CreateProduct($input: ProductInput!, $media: [CreateMediaInput!]) {
    productCreate(input: $input, media: $media) {
      product {
        id
        title
        productType
        media(first: 10) {
          nodes {
            alt
            mediaContentType
            preview {
              status
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

const client = createAdminApiClient({
  storeDomain: env.SHOPIFY_STORE_DOMAIN,
  apiVersion: "2023-10",
  accessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN,
})

export function createShopifyStrategy(): SeedStrategy {
  const uploadProduct = async (product: Product): Promise<ShopifyProduct | null> => {
    const { data, errors } = await client.request(print(operation), {
      variables: {
        input: {
          title: product.title,
          productType: "Example Type",
          descriptionHtml: `<p>${product.description}</p>`,
          vendor: "Example Vendor",
          variants: [{ price: "19.99", sku: "123" }],
          tags: [product.type],
        },
        media: product.images?.map((image) => ({
          originalSource: image,
          alt: product.title,
          mediaContentType: "IMAGE",
        })),
      },
    })

    if (errors) {
      console.error("Something wrong happend while uploading a product", errors)
      return null
    }

    return data
  }

  return {
    seed: async (products: Product[]): Promise<void> => {
      if (env.SEEDER_ENABLED !== "true") {
        return
      }

      for (const product of products) {
        const uploadedProduct = await uploadProduct(product)
        console.log("Uploaded product", uploadedProduct?.title)
      }
    },
  }
}
