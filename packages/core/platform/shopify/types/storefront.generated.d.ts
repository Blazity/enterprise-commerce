/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from './storefront.types.d.ts';

export type SingleCartFragment = (
  Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
  & { cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, lines: { edges: Array<{ node: (
        Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
        & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
            Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
            & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                  Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                  & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
          ) }
        ) }
      ) | (
        Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
        & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
            Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
            & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                  Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                  & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
          ) }
        ) }
      ) }> } }
);

export type SingleCollectionFragment = (
  Pick<StorefrontTypes.Collection, 'handle' | 'title' | 'descriptionHtml' | 'id' | 'description' | 'updatedAt'>
  & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
);

export type SingleCustomerFragment = Pick<StorefrontTypes.Customer, 'acceptsMarketing' | 'createdAt' | 'updatedAt' | 'displayName' | 'email' | 'firstName' | 'lastName' | 'id' | 'phone' | 'tags'>;

export type SingleImageFragment = Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>;

export type SinglePageFragment = (
  Pick<StorefrontTypes.Page, 'id' | 'title' | 'handle' | 'body' | 'bodySummary' | 'createdAt' | 'updatedAt'>
  & { seo?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Seo, 'description' | 'title'>> }
);

export type SingleProductFragment = (
  Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
  & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
        & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
      ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
);

export type SeoFragment = Pick<StorefrontTypes.Seo, 'description' | 'title'>;

export type CreateCartItemMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  items: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type CreateCartItemMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) }> } }
    )> }> };

export type CreateCartMutationVariables = StorefrontTypes.Exact<{
  items?: StorefrontTypes.InputMaybe<Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput>;
}>;


export type CreateCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) }> } }
    )> }> };

export type UpdateCartItemsMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  items: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type UpdateCartItemsMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) }> } }
    )> }> };

export type DeleteCartItemsMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  itemIds: Array<StorefrontTypes.Scalars['ID']['input']> | StorefrontTypes.Scalars['ID']['input'];
}>;


export type DeleteCartItemsMutation = { cartLinesRemove?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
                Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
                & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                      Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                      & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                    ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
              ) }
            ) }
          ) }> } }
    )> }> };

export type CreateCustomerMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CustomerCreateInput;
}>;


export type CreateCustomerMutation = { customerCreate?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>>, customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>> }> };

export type UpdateCustomerMutationVariables = StorefrontTypes.Exact<{
  customer: StorefrontTypes.CustomerUpdateInput;
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type UpdateCustomerMutation = { customerUpdate?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>>, customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>> }> };

export type ActivateCustomerMutationVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
  input: StorefrontTypes.CustomerActivateInput;
}>;


export type ActivateCustomerMutation = { customerActivate?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>>, customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>> }> };

export type CreateAccessTokenMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CustomerAccessTokenCreateInput;
}>;


export type CreateAccessTokenMutation = { customerAccessTokenCreate?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>>, customerAccessToken?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CustomerAccessToken, 'accessToken' | 'expiresAt'>> }> };

export type SingleCartQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type SingleCartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
    & { cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalTaxAmount?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }, lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
              & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                    Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                    & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                  ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
            ) }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, product: (
              Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
              & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
                    Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
                    & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
                  ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
            ) }
          ) }
        ) }> } }
  )> };

export type SingleCollectionByIdQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type SingleCollectionByIdQuery = { collection?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Collection, 'handle' | 'title' | 'descriptionHtml' | 'id' | 'description' | 'updatedAt'>
    & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
  )> };

export type SingleCollectionQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type SingleCollectionQuery = { collection?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Collection, 'handle' | 'title' | 'descriptionHtml' | 'id' | 'description' | 'updatedAt'>
    & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
  )> };

export type CollectionsQueryVariables = StorefrontTypes.Exact<{
  limit?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Int']['input']>;
}>;


export type CollectionsQuery = { collections: { edges: Array<{ node: (
        Pick<StorefrontTypes.Collection, 'handle' | 'title' | 'descriptionHtml' | 'id' | 'description' | 'updatedAt'>
        & { image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
      ) }> } };

export type SingleCustomerQueryVariables = StorefrontTypes.Exact<{
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type SingleCustomerQuery = { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'acceptsMarketing' | 'createdAt' | 'updatedAt' | 'displayName' | 'email' | 'firstName' | 'lastName' | 'id' | 'phone' | 'tags'>> };

export type SinglePageQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type SinglePageQuery = { page?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Page, 'id' | 'title' | 'handle' | 'body' | 'bodySummary' | 'createdAt' | 'updatedAt'>
    & { seo?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Seo, 'description' | 'title'>> }
  )> };

export type PagesQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type PagesQuery = { pages: { edges: Array<{ node: (
        Pick<StorefrontTypes.Page, 'id' | 'title' | 'handle' | 'body' | 'bodySummary' | 'createdAt' | 'updatedAt'>
        & { seo?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Seo, 'description' | 'title'>> }
      ) }> } };

export type SingleProductQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type SingleProductQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
    & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
        ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
  )> };

export type ProductsByHandleQueryVariables = StorefrontTypes.Exact<{
  query: StorefrontTypes.Scalars['String']['input'];
}>;


export type ProductsByHandleQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
        & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
              & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
            ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
      ) }> } };

export type ProductsQueryVariables = StorefrontTypes.Exact<{
  sortKey?: StorefrontTypes.InputMaybe<StorefrontTypes.ProductSortKeys>;
  reverse?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['Boolean']['input']>;
  query?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  numProducts: StorefrontTypes.Scalars['Int']['input'];
  cursor?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type ProductsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
        & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
              & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
            ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
      ) }>, pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'endCursor'> } };

export type ProductRecommendationsQueryVariables = StorefrontTypes.Exact<{
  productId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type ProductRecommendationsQuery = { productRecommendations?: StorefrontTypes.Maybe<Array<(
    Pick<StorefrontTypes.Product, 'id' | 'handle' | 'title' | 'description' | 'descriptionHtml' | 'vendor' | 'tags' | 'updatedAt' | 'createdAt'>
    & { options: Array<Pick<StorefrontTypes.ProductOption, 'id' | 'name' | 'values'>>, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'handle' | 'id'>> }, variants: { edges: Array<{ node: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'quantityAvailable' | 'availableForSale'>
          & { selectedOptions: Array<Pick<StorefrontTypes.SelectedOption, 'name' | 'value'>>, price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }
        ) }> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>>, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'> }> }, seo: Pick<StorefrontTypes.Seo, 'description' | 'title'> }
  )>> };

interface GeneratedQueryTypes {
  "#graphql\n  query SingleCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...singleCart\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              quantityAvailable\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {return: SingleCartQuery, variables: SingleCartQueryVariables},
  "#graphql\n  query SingleCollectionById($id: ID!) {\n    collection(id: $id) {\n      ...singleCollection\n    }\n  }\n  #graphql\n  fragment singleCollection on Collection {\n    handle\n    image {\n      ...singleImage\n    }\n    title\n    descriptionHtml\n    id\n    description\n    seo {\n      ...seo\n    }\n    updatedAt\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n\n": {return: SingleCollectionByIdQuery, variables: SingleCollectionByIdQueryVariables},
  "#graphql\n  query SingleCollection($handle: String!) {\n    collection(handle: $handle) {\n      ...singleCollection\n    }\n  }\n  #graphql\n  fragment singleCollection on Collection {\n    handle\n    image {\n      ...singleImage\n    }\n    title\n    descriptionHtml\n    id\n    description\n    seo {\n      ...seo\n    }\n    updatedAt\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n\n": {return: SingleCollectionQuery, variables: SingleCollectionQueryVariables},
  "#graphql\n  query Collections($limit: Int = 250) {\n    collections(first: $limit, sortKey: TITLE) {\n      edges {\n        node {\n          ...singleCollection\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singleCollection on Collection {\n    handle\n    image {\n      ...singleImage\n    }\n    title\n    descriptionHtml\n    id\n    description\n    seo {\n      ...seo\n    }\n    updatedAt\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n\n": {return: CollectionsQuery, variables: CollectionsQueryVariables},
  "#graphql\n  query SingleCustomer($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      ...singleCustomer\n    }\n  }\n  #graphql \n  fragment singleCustomer on Customer {\n    acceptsMarketing\n    createdAt\n    updatedAt\n    displayName\n    email\n    firstName\n    lastName\n    id\n    phone\n    tags\n  }\n\n": {return: SingleCustomerQuery, variables: SingleCustomerQueryVariables},
  "#graphql\n  query SinglePage($handle: String!) {\n    page(handle: $handle) {\n      ...singlePage\n    }\n  }\n  #graphql\n  fragment singlePage on Page {\n    ... on Page {\n      id\n      title\n      handle\n      body\n      bodySummary\n      seo {\n        ...seo\n      }\n      createdAt\n      updatedAt\n    }\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: SinglePageQuery, variables: SinglePageQueryVariables},
  "#graphql\n  query Pages {\n    pages(first: 100) {\n      edges {\n        node {\n          ...singlePage\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singlePage on Page {\n    ... on Page {\n      id\n      title\n      handle\n      body\n      bodySummary\n      seo {\n        ...seo\n      }\n      createdAt\n      updatedAt\n    }\n  }\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: PagesQuery, variables: PagesQueryVariables},
  "#graphql\n  query SingleProduct($id: ID!) {\n    product(id: $id) {\n      ...singleProduct\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: SingleProductQuery, variables: SingleProductQueryVariables},
  "#graphql\n  query ProductsByHandle($query: String!) {\n    products(first: 1, query: $query) {\n      edges {\n        node {\n          ...singleProduct\n        }\n      }\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: ProductsByHandleQuery, variables: ProductsByHandleQueryVariables},
  "#graphql\n  query Products($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $numProducts: Int!, $cursor: String) {\n    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $numProducts, after: $cursor ) {\n      edges {\n        node {\n          ...singleProduct\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: ProductsQuery, variables: ProductsQueryVariables},
  "#graphql\n  query ProductRecommendations($productId: ID!) {\n    productRecommendations(productId: $productId) {\n      ...singleProduct\n    }\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n": {return: ProductRecommendationsQuery, variables: ProductRecommendationsQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation CreateCartItem($cartId: ID!, $items: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $items) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              quantityAvailable\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {return: CreateCartItemMutation, variables: CreateCartItemMutationVariables},
  "#graphql\n  mutation CreateCart($items: [CartLineInput!]) {\n    cartCreate(input: { lines: $items }) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              quantityAvailable\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {return: CreateCartMutation, variables: CreateCartMutationVariables},
  "#graphql\n  mutation UpdateCartItems($cartId: ID!, $items: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $items) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              quantityAvailable\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {return: UpdateCartItemsMutation, variables: UpdateCartItemsMutationVariables},
  "#graphql\n  mutation DeleteCartItems($cartId: ID!, $itemIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $itemIds) {\n      cart {\n        ...singleCart\n      }\n    }\n  }\n  #graphql \n  fragment singleCart on Cart {\n    id\n    checkoutUrl\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n      totalTaxAmount {\n        amount\n        currencyCode\n      }\n    }\n    lines(first: 100) {\n      edges {\n        node {\n          id\n          quantity\n          cost {\n            totalAmount {\n              amount\n              currencyCode\n            }\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              title\n              price {\n                amount\n                currencyCode\n              }\n              quantityAvailable\n              selectedOptions {\n                name\n                value\n              }\n              product {\n                ...singleProduct\n              }\n            }\n          }\n        }\n      }\n    }\n    totalQuantity\n  }\n  #graphql\n  fragment singleProduct on Product {\n    id\n    handle\n    title\n    description\n    descriptionHtml\n    vendor\n    options {\n      id\n      name\n      values\n    }\n    priceRange {\n      maxVariantPrice {\n        amount\n        currencyCode\n      }\n      minVariantPrice {\n        amount\n        currencyCode\n      }\n    }\n    collections(first: 250) {\n      nodes {\n        handle\n        id\n      }\n    }\n    variants(first: 250) {\n      edges {\n        node {\n          id\n          title\n          quantityAvailable\n          availableForSale\n          selectedOptions {\n            name\n            value\n          }\n          price {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n    featuredImage {\n      ...singleImage\n    }\n    images(first: 20) {\n      edges {\n        node {\n          ...singleImage\n        }\n      }\n    }\n    seo {\n      ...seo\n    }\n    tags\n    updatedAt\n    createdAt\n  }\n  #graphql\n  fragment singleImage on Image {\n    url\n    altText\n    width\n    height\n  }\n\n  #graphql\n  fragment seo on SEO {\n    description\n    title\n  }\n\n\n\n": {return: DeleteCartItemsMutation, variables: DeleteCartItemsMutationVariables},
  "#graphql\n  mutation CreateCustomer($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n": {return: CreateCustomerMutation, variables: CreateCustomerMutationVariables},
  "#graphql\n  mutation UpdateCustomer($customer: CustomerUpdateInput!, $customerAccessToken: String!) {\n    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n": {return: UpdateCustomerMutation, variables: UpdateCustomerMutationVariables},
  "#graphql\n  mutation ActivateCustomer($id: ID!, $input: CustomerActivateInput!) {\n    customerActivate(id: $id, input: $input) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      customer {\n        id\n      }\n    }\n  }\n": {return: ActivateCustomerMutation, variables: ActivateCustomerMutationVariables},
  "#graphql\n  mutation CreateAccessToken($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n": {return: CreateAccessTokenMutation, variables: CreateAccessTokenMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
