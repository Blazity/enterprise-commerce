export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }

export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Color: { input: any; output: any }
  DateTime: { input: any; output: any }
  Decimal: { input: any; output: any }
  HTML: { input: any; output: any }
  JSON: { input: any; output: any }
  URL: { input: any; output: any }
  UnsignedInt64: { input: any; output: any }
}

export type ApiVersion = {
  __typename?: "ApiVersion"

  displayName: Scalars["String"]["output"]

  handle: Scalars["String"]["output"]

  supported: Scalars["Boolean"]["output"]
}

export type ApplePayWalletContentInput = {
  billingAddress: MailingAddressInput

  data: Scalars["String"]["input"]

  header: ApplePayWalletHeaderInput

  lastDigits?: InputMaybe<Scalars["String"]["input"]>

  signature: Scalars["String"]["input"]

  version: Scalars["String"]["input"]
}

export type ApplePayWalletHeaderInput = {
  applicationData?: InputMaybe<Scalars["String"]["input"]>

  ephemeralPublicKey: Scalars["String"]["input"]

  publicKeyHash: Scalars["String"]["input"]

  transactionId: Scalars["String"]["input"]
}

export type AppliedGiftCard = Node & {
  __typename?: "AppliedGiftCard"

  amountUsed: MoneyV2
  /**
   * The amount that was taken from the gift card by applying it.
   * @deprecated Use `amountUsed` instead.
   */
  amountUsedV2: MoneyV2

  balance: MoneyV2
  /**
   * The amount left on the gift card.
   * @deprecated Use `balance` instead.
   */
  balanceV2: MoneyV2

  id: Scalars["ID"]["output"]

  lastCharacters: Scalars["String"]["output"]

  presentmentAmountUsed: MoneyV2
}

export type Article = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: "Article"
    /**
     * The article's author.
     * @deprecated Use `authorV2` instead.
     */
    author: ArticleAuthor

    authorV2?: Maybe<ArticleAuthor>

    blog: Blog

    comments: CommentConnection

    content: Scalars["String"]["output"]

    contentHtml: Scalars["HTML"]["output"]

    excerpt?: Maybe<Scalars["String"]["output"]>

    excerptHtml?: Maybe<Scalars["HTML"]["output"]>

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    publishedAt: Scalars["DateTime"]["output"]

    seo?: Maybe<Seo>

    tags: Array<Scalars["String"]["output"]>

    title: Scalars["String"]["output"]

    trackingParameters?: Maybe<Scalars["String"]["output"]>
  }

export type ArticleCommentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ArticleContentArgs = {
  truncateAt?: InputMaybe<Scalars["Int"]["input"]>
}

export type ArticleExcerptArgs = {
  truncateAt?: InputMaybe<Scalars["Int"]["input"]>
}

export type ArticleMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ArticleMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type ArticleAuthor = {
  __typename?: "ArticleAuthor"

  bio?: Maybe<Scalars["String"]["output"]>

  email: Scalars["String"]["output"]

  firstName: Scalars["String"]["output"]

  lastName: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export type ArticleConnection = {
  __typename?: "ArticleConnection"

  edges: Array<ArticleEdge>

  nodes: Array<Article>

  pageInfo: PageInfo
}

export type ArticleEdge = {
  __typename?: "ArticleEdge"

  cursor: Scalars["String"]["output"]

  node: Article
}

export enum ArticleSortKeys {
  Author = "AUTHOR",

  BlogTitle = "BLOG_TITLE",

  Id = "ID",

  PublishedAt = "PUBLISHED_AT",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export type Attribute = {
  __typename?: "Attribute"

  key: Scalars["String"]["output"]

  value?: Maybe<Scalars["String"]["output"]>
}

export type AttributeInput = {
  key: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type AutomaticDiscountApplication = DiscountApplication & {
  __typename?: "AutomaticDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]

  value: PricingValue
}

export type AvailableShippingRates = {
  __typename?: "AvailableShippingRates"

  ready: Scalars["Boolean"]["output"]

  shippingRates?: Maybe<Array<ShippingRate>>
}

export type BaseCartLine = {
  attribute?: Maybe<Attribute>

  attributes: Array<Attribute>

  cost: CartLineCost

  discountAllocations: Array<CartDiscountAllocation>
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: CartLineEstimatedCost

  id: Scalars["ID"]["output"]

  merchandise: Merchandise

  quantity: Scalars["Int"]["output"]

  sellingPlanAllocation?: Maybe<SellingPlanAllocation>
}

export type BaseCartLineAttributeArgs = {
  key: Scalars["String"]["input"]
}

export type BaseCartLineConnection = {
  __typename?: "BaseCartLineConnection"

  edges: Array<BaseCartLineEdge>

  nodes: Array<BaseCartLine>

  pageInfo: PageInfo
}

export type BaseCartLineEdge = {
  __typename?: "BaseCartLineEdge"

  cursor: Scalars["String"]["output"]

  node: BaseCartLine
}

export type Blog = HasMetafields &
  Node &
  OnlineStorePublishable & {
    __typename?: "Blog"

    articleByHandle?: Maybe<Article>

    articles: ArticleConnection

    authors: Array<ArticleAuthor>

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    seo?: Maybe<Seo>

    title: Scalars["String"]["output"]
  }

export type BlogArticleByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type BlogArticlesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ArticleSortKeys>
}

export type BlogMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type BlogMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type BlogConnection = {
  __typename?: "BlogConnection"

  edges: Array<BlogEdge>

  nodes: Array<Blog>

  pageInfo: PageInfo
}

export type BlogEdge = {
  __typename?: "BlogEdge"

  cursor: Scalars["String"]["output"]

  node: Blog
}

export enum BlogSortKeys {
  Handle = "HANDLE",

  Id = "ID",

  Relevance = "RELEVANCE",

  Title = "TITLE",
}

export type Brand = {
  __typename?: "Brand"

  colors: BrandColors

  coverImage?: Maybe<MediaImage>

  logo?: Maybe<MediaImage>

  shortDescription?: Maybe<Scalars["String"]["output"]>

  slogan?: Maybe<Scalars["String"]["output"]>

  squareLogo?: Maybe<MediaImage>
}

export type BrandColorGroup = {
  __typename?: "BrandColorGroup"

  background?: Maybe<Scalars["Color"]["output"]>

  foreground?: Maybe<Scalars["Color"]["output"]>
}

export type BrandColors = {
  __typename?: "BrandColors"

  primary: Array<BrandColorGroup>

  secondary: Array<BrandColorGroup>
}

export enum CardBrand {
  AmericanExpress = "AMERICAN_EXPRESS",

  DinersClub = "DINERS_CLUB",

  Discover = "DISCOVER",

  Jcb = "JCB",

  Mastercard = "MASTERCARD",

  Visa = "VISA",
}

export type Cart = HasMetafields &
  Node & {
    __typename?: "Cart"

    attribute?: Maybe<Attribute>

    attributes: Array<Attribute>

    buyerIdentity: CartBuyerIdentity

    checkoutUrl: Scalars["URL"]["output"]

    cost: CartCost

    createdAt: Scalars["DateTime"]["output"]

    deliveryGroups: CartDeliveryGroupConnection

    discountAllocations: Array<CartDiscountAllocation>

    discountCodes: Array<CartDiscountCode>
    /**
     * The estimated costs that the buyer will pay at checkout. The estimated costs are subject to change and changes will be reflected at checkout. The `estimatedCost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartEstimatedCost

    id: Scalars["ID"]["output"]

    lines: BaseCartLineConnection

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    note?: Maybe<Scalars["String"]["output"]>

    totalQuantity: Scalars["Int"]["output"]

    updatedAt: Scalars["DateTime"]["output"]
  }

export type CartAttributeArgs = {
  key: Scalars["String"]["input"]
}

export type CartDeliveryGroupsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CartLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CartMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CartMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type CartAttributesUpdatePayload = {
  __typename?: "CartAttributesUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartAutomaticDiscountAllocation = CartDiscountAllocation & {
  __typename?: "CartAutomaticDiscountAllocation"

  discountedAmount: MoneyV2

  title: Scalars["String"]["output"]
}

export type CartBuyerIdentity = {
  __typename?: "CartBuyerIdentity"

  countryCode?: Maybe<CountryCode>

  customer?: Maybe<Customer>

  deliveryAddressPreferences: Array<DeliveryAddress>

  email?: Maybe<Scalars["String"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  walletPreferences: Array<Scalars["String"]["output"]>
}

export type CartBuyerIdentityInput = {
  countryCode?: InputMaybe<CountryCode>

  customerAccessToken?: InputMaybe<Scalars["String"]["input"]>

  deliveryAddressPreferences?: InputMaybe<Array<DeliveryAddressInput>>

  email?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  walletPreferences?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type CartBuyerIdentityUpdatePayload = {
  __typename?: "CartBuyerIdentityUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export enum CartCardSource {
  SavedCreditCard = "SAVED_CREDIT_CARD",
}

export type CartCodeDiscountAllocation = CartDiscountAllocation & {
  __typename?: "CartCodeDiscountAllocation"

  code: Scalars["String"]["output"]

  discountedAmount: MoneyV2
}

export type CartCompletionAction = CompletePaymentChallenge

export type CartCompletionActionRequired = {
  __typename?: "CartCompletionActionRequired"

  action?: Maybe<CartCompletionAction>

  id: Scalars["String"]["output"]
}

export type CartCompletionAttemptResult =
  | CartCompletionActionRequired
  | CartCompletionFailed
  | CartCompletionProcessing
  | CartCompletionSuccess

export type CartCompletionFailed = {
  __typename?: "CartCompletionFailed"

  errors: Array<CompletionError>

  id: Scalars["String"]["output"]
}

export type CartCompletionProcessing = {
  __typename?: "CartCompletionProcessing"

  id: Scalars["String"]["output"]

  pollDelay: Scalars["Int"]["output"]
}

export type CartCompletionSuccess = {
  __typename?: "CartCompletionSuccess"

  completedAt?: Maybe<Scalars["DateTime"]["output"]>

  id: Scalars["String"]["output"]

  orderId: Scalars["ID"]["output"]

  orderUrl: Scalars["URL"]["output"]
}

export type CartCost = {
  __typename?: "CartCost"

  checkoutChargeAmount: MoneyV2

  subtotalAmount: MoneyV2

  subtotalAmountEstimated: Scalars["Boolean"]["output"]

  totalAmount: MoneyV2

  totalAmountEstimated: Scalars["Boolean"]["output"]

  totalDutyAmount?: Maybe<MoneyV2>

  totalDutyAmountEstimated: Scalars["Boolean"]["output"]

  totalTaxAmount?: Maybe<MoneyV2>

  totalTaxAmountEstimated: Scalars["Boolean"]["output"]
}

export type CartCreatePayload = {
  __typename?: "CartCreatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartCustomDiscountAllocation = CartDiscountAllocation & {
  __typename?: "CartCustomDiscountAllocation"

  discountedAmount: MoneyV2

  title: Scalars["String"]["output"]
}

export type CartDeliveryGroup = {
  __typename?: "CartDeliveryGroup"

  cartLines: BaseCartLineConnection

  deliveryAddress: MailingAddress

  deliveryOptions: Array<CartDeliveryOption>

  id: Scalars["ID"]["output"]

  selectedDeliveryOption?: Maybe<CartDeliveryOption>
}

export type CartDeliveryGroupCartLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CartDeliveryGroupConnection = {
  __typename?: "CartDeliveryGroupConnection"

  edges: Array<CartDeliveryGroupEdge>

  nodes: Array<CartDeliveryGroup>

  pageInfo: PageInfo
}

export type CartDeliveryGroupEdge = {
  __typename?: "CartDeliveryGroupEdge"

  cursor: Scalars["String"]["output"]

  node: CartDeliveryGroup
}

export type CartDeliveryOption = {
  __typename?: "CartDeliveryOption"

  code?: Maybe<Scalars["String"]["output"]>

  deliveryMethodType: DeliveryMethodType

  description?: Maybe<Scalars["String"]["output"]>

  estimatedCost: MoneyV2

  handle: Scalars["String"]["output"]

  title?: Maybe<Scalars["String"]["output"]>
}

export type CartDirectPaymentMethodInput = {
  billingAddress: MailingAddressInput

  cardSource?: InputMaybe<CartCardSource>

  sessionId: Scalars["String"]["input"]
}

export type CartDiscountAllocation = {
  discountedAmount: MoneyV2
}

export type CartDiscountCode = {
  __typename?: "CartDiscountCode"

  applicable: Scalars["Boolean"]["output"]

  code: Scalars["String"]["output"]
}

export type CartDiscountCodesUpdatePayload = {
  __typename?: "CartDiscountCodesUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export enum CartErrorCode {
  Invalid = "INVALID",

  InvalidDeliveryGroup = "INVALID_DELIVERY_GROUP",

  InvalidDeliveryOption = "INVALID_DELIVERY_OPTION",

  InvalidMerchandiseLine = "INVALID_MERCHANDISE_LINE",

  InvalidMetafields = "INVALID_METAFIELDS",

  InvalidPayment = "INVALID_PAYMENT",

  InvalidPaymentEmptyCart = "INVALID_PAYMENT_EMPTY_CART",

  LessThan = "LESS_THAN",

  MissingDiscountCode = "MISSING_DISCOUNT_CODE",

  MissingNote = "MISSING_NOTE",

  PaymentMethodNotSupported = "PAYMENT_METHOD_NOT_SUPPORTED",

  ValidationCustom = "VALIDATION_CUSTOM",
}

export type CartEstimatedCost = {
  __typename?: "CartEstimatedCost"

  checkoutChargeAmount: MoneyV2

  subtotalAmount: MoneyV2

  totalAmount: MoneyV2

  totalDutyAmount?: Maybe<MoneyV2>

  totalTaxAmount?: Maybe<MoneyV2>
}

export type CartFreePaymentMethodInput = {
  billingAddress: MailingAddressInput
}

export type CartInput = {
  attributes?: InputMaybe<Array<AttributeInput>>

  buyerIdentity?: InputMaybe<CartBuyerIdentityInput>

  discountCodes?: InputMaybe<Array<Scalars["String"]["input"]>>

  lines?: InputMaybe<Array<CartLineInput>>

  metafields?: InputMaybe<Array<CartInputMetafieldInput>>

  note?: InputMaybe<Scalars["String"]["input"]>
}

export type CartInputMetafieldInput = {
  key: Scalars["String"]["input"]

  type: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type CartLine = BaseCartLine &
  Node & {
    __typename?: "CartLine"

    attribute?: Maybe<Attribute>

    attributes: Array<Attribute>

    cost: CartLineCost

    discountAllocations: Array<CartDiscountAllocation>
    /**
     * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartLineEstimatedCost

    id: Scalars["ID"]["output"]

    merchandise: Merchandise

    quantity: Scalars["Int"]["output"]

    sellingPlanAllocation?: Maybe<SellingPlanAllocation>
  }

export type CartLineAttributeArgs = {
  key: Scalars["String"]["input"]
}

export type CartLineCost = {
  __typename?: "CartLineCost"

  amountPerQuantity: MoneyV2

  compareAtAmountPerQuantity?: Maybe<MoneyV2>

  subtotalAmount: MoneyV2

  totalAmount: MoneyV2
}

export type CartLineEstimatedCost = {
  __typename?: "CartLineEstimatedCost"

  amount: MoneyV2

  compareAtAmount?: Maybe<MoneyV2>

  subtotalAmount: MoneyV2

  totalAmount: MoneyV2
}

export type CartLineInput = {
  attributes?: InputMaybe<Array<AttributeInput>>

  merchandiseId: Scalars["ID"]["input"]

  quantity?: InputMaybe<Scalars["Int"]["input"]>

  sellingPlanId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CartLineUpdateInput = {
  attributes?: InputMaybe<Array<AttributeInput>>

  id: Scalars["ID"]["input"]

  merchandiseId?: InputMaybe<Scalars["ID"]["input"]>

  quantity?: InputMaybe<Scalars["Int"]["input"]>

  sellingPlanId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CartLinesAddPayload = {
  __typename?: "CartLinesAddPayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartLinesRemovePayload = {
  __typename?: "CartLinesRemovePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartLinesUpdatePayload = {
  __typename?: "CartLinesUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartMetafieldDeleteInput = {
  key: Scalars["String"]["input"]

  ownerId: Scalars["ID"]["input"]
}

export type CartMetafieldDeletePayload = {
  __typename?: "CartMetafieldDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<MetafieldDeleteUserError>
}

export type CartMetafieldsSetInput = {
  key: Scalars["String"]["input"]

  ownerId: Scalars["ID"]["input"]

  type: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type CartMetafieldsSetPayload = {
  __typename?: "CartMetafieldsSetPayload"

  metafields?: Maybe<Array<Metafield>>

  userErrors: Array<MetafieldsSetUserError>
}

export type CartNoteUpdatePayload = {
  __typename?: "CartNoteUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartPaymentInput = {
  amount: MoneyInput

  directPaymentMethod?: InputMaybe<CartDirectPaymentMethodInput>

  freePaymentMethod?: InputMaybe<CartFreePaymentMethodInput>

  sourceIdentifier?: InputMaybe<Scalars["String"]["input"]>

  walletPaymentMethod?: InputMaybe<CartWalletPaymentMethodInput>
}

export type CartPaymentUpdatePayload = {
  __typename?: "CartPaymentUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartSelectedDeliveryOptionInput = {
  deliveryGroupId: Scalars["ID"]["input"]

  deliveryOptionHandle: Scalars["String"]["input"]
}

export type CartSelectedDeliveryOptionsUpdatePayload = {
  __typename?: "CartSelectedDeliveryOptionsUpdatePayload"

  cart?: Maybe<Cart>

  userErrors: Array<CartUserError>
}

export type CartSubmitForCompletionPayload = {
  __typename?: "CartSubmitForCompletionPayload"

  result?: Maybe<CartSubmitForCompletionResult>

  userErrors: Array<CartUserError>
}

export type CartSubmitForCompletionResult = SubmitAlreadyAccepted | SubmitFailed | SubmitSuccess | SubmitThrottled

export type CartUserError = DisplayableError & {
  __typename?: "CartUserError"

  code?: Maybe<CartErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type CartWalletPaymentMethodInput = {
  applePayWalletContent?: InputMaybe<ApplePayWalletContentInput>

  shopPayWalletContent?: InputMaybe<ShopPayWalletContentInput>
}

export type Checkout = Node & {
  __typename?: "Checkout"

  appliedGiftCards: Array<AppliedGiftCard>

  availableShippingRates?: Maybe<AvailableShippingRates>

  buyerIdentity: CheckoutBuyerIdentity

  completedAt?: Maybe<Scalars["DateTime"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  currencyCode: CurrencyCode

  customAttributes: Array<Attribute>

  discountApplications: DiscountApplicationConnection

  email?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  lineItems: CheckoutLineItemConnection

  lineItemsSubtotalPrice: MoneyV2

  note?: Maybe<Scalars["String"]["output"]>

  order?: Maybe<Order>

  orderStatusUrl?: Maybe<Scalars["URL"]["output"]>

  paymentDue: MoneyV2
  /**
   * The amount left to be paid. This is equal to the cost of the line items, duties, taxes, and shipping, minus discounts and gift cards.
   * @deprecated Use `paymentDue` instead.
   */
  paymentDueV2: MoneyV2

  ready: Scalars["Boolean"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  shippingAddress?: Maybe<MailingAddress>

  shippingDiscountAllocations: Array<DiscountAllocation>

  shippingLine?: Maybe<ShippingRate>

  subtotalPrice: MoneyV2
  /**
   * The price at checkout before duties, shipping, and taxes.
   * @deprecated Use `subtotalPrice` instead.
   */
  subtotalPriceV2: MoneyV2

  taxExempt: Scalars["Boolean"]["output"]

  taxesIncluded: Scalars["Boolean"]["output"]

  totalDuties?: Maybe<MoneyV2>

  totalPrice: MoneyV2
  /**
   * The sum of all the prices of all the items in the checkout, including taxes and duties.
   * @deprecated Use `totalPrice` instead.
   */
  totalPriceV2: MoneyV2

  totalTax: MoneyV2
  /**
   * The sum of all the taxes applied to the line items and shipping lines in the checkout.
   * @deprecated Use `totalTax` instead.
   */
  totalTaxV2: MoneyV2

  updatedAt: Scalars["DateTime"]["output"]

  webUrl: Scalars["URL"]["output"]
}

export type CheckoutDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CheckoutLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CheckoutAttributesUpdateV2Input = {
  allowPartialAddresses?: InputMaybe<Scalars["Boolean"]["input"]>

  customAttributes?: InputMaybe<Array<AttributeInput>>

  note?: InputMaybe<Scalars["String"]["input"]>
}

export type CheckoutAttributesUpdateV2Payload = {
  __typename?: "CheckoutAttributesUpdateV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutBuyerIdentity = {
  __typename?: "CheckoutBuyerIdentity"

  countryCode?: Maybe<CountryCode>
}

export type CheckoutBuyerIdentityInput = {
  countryCode: CountryCode
}

export type CheckoutCompleteFreePayload = {
  __typename?: "CheckoutCompleteFreePayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutCompleteWithCreditCardV2Payload = {
  __typename?: "CheckoutCompleteWithCreditCardV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>

  payment?: Maybe<Payment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutCompleteWithTokenizedPaymentV3Payload = {
  __typename?: "CheckoutCompleteWithTokenizedPaymentV3Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>

  payment?: Maybe<Payment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutCreateInput = {
  allowPartialAddresses?: InputMaybe<Scalars["Boolean"]["input"]>

  buyerIdentity?: InputMaybe<CheckoutBuyerIdentityInput>

  customAttributes?: InputMaybe<Array<AttributeInput>>

  email?: InputMaybe<Scalars["String"]["input"]>

  lineItems?: InputMaybe<Array<CheckoutLineItemInput>>

  note?: InputMaybe<Scalars["String"]["input"]>

  shippingAddress?: InputMaybe<MailingAddressInput>
}

export type CheckoutCreatePayload = {
  __typename?: "CheckoutCreatePayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>

  queueToken?: Maybe<Scalars["String"]["output"]>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutCustomerAssociateV2Payload = {
  __typename?: "CheckoutCustomerAssociateV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>

  customer?: Maybe<Customer>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutCustomerDisassociateV2Payload = {
  __typename?: "CheckoutCustomerDisassociateV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutDiscountCodeApplyV2Payload = {
  __typename?: "CheckoutDiscountCodeApplyV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutDiscountCodeRemovePayload = {
  __typename?: "CheckoutDiscountCodeRemovePayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutEmailUpdateV2Payload = {
  __typename?: "CheckoutEmailUpdateV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export enum CheckoutErrorCode {
  AlreadyCompleted = "ALREADY_COMPLETED",

  BadDomain = "BAD_DOMAIN",

  Blank = "BLANK",

  CartDoesNotMeetDiscountRequirementsNotice = "CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE",

  CustomerAlreadyUsedOncePerCustomerDiscountNotice = "CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE",

  DiscountAlreadyApplied = "DISCOUNT_ALREADY_APPLIED",

  DiscountCodeApplicationFailed = "DISCOUNT_CODE_APPLICATION_FAILED",

  DiscountDisabled = "DISCOUNT_DISABLED",

  DiscountExpired = "DISCOUNT_EXPIRED",

  DiscountLimitReached = "DISCOUNT_LIMIT_REACHED",

  DiscountNotFound = "DISCOUNT_NOT_FOUND",

  Empty = "EMPTY",

  ExpiredQueueToken = "EXPIRED_QUEUE_TOKEN",

  GiftCardAlreadyApplied = "GIFT_CARD_ALREADY_APPLIED",

  GiftCardCodeInvalid = "GIFT_CARD_CODE_INVALID",

  GiftCardCurrencyMismatch = "GIFT_CARD_CURRENCY_MISMATCH",

  GiftCardDepleted = "GIFT_CARD_DEPLETED",

  GiftCardDisabled = "GIFT_CARD_DISABLED",

  GiftCardExpired = "GIFT_CARD_EXPIRED",

  GiftCardNotFound = "GIFT_CARD_NOT_FOUND",

  GiftCardUnusable = "GIFT_CARD_UNUSABLE",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  HigherValueDiscountApplied = "HIGHER_VALUE_DISCOUNT_APPLIED",

  Invalid = "INVALID",

  InvalidCountryAndCurrency = "INVALID_COUNTRY_AND_CURRENCY",

  InvalidForCountry = "INVALID_FOR_COUNTRY",

  InvalidForCountryAndProvince = "INVALID_FOR_COUNTRY_AND_PROVINCE",

  InvalidProvinceInCountry = "INVALID_PROVINCE_IN_COUNTRY",

  InvalidQueueToken = "INVALID_QUEUE_TOKEN",

  InvalidRegionInCountry = "INVALID_REGION_IN_COUNTRY",

  InvalidStateInCountry = "INVALID_STATE_IN_COUNTRY",

  LessThan = "LESS_THAN",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  LineItemNotFound = "LINE_ITEM_NOT_FOUND",

  Locked = "LOCKED",

  MaximumDiscountCodeLimitReached = "MAXIMUM_DISCOUNT_CODE_LIMIT_REACHED",

  MissingPaymentInput = "MISSING_PAYMENT_INPUT",

  NotEnoughInStock = "NOT_ENOUGH_IN_STOCK",

  NotSupported = "NOT_SUPPORTED",

  Present = "PRESENT",

  ProductNotAvailable = "PRODUCT_NOT_AVAILABLE",

  ShippingRateExpired = "SHIPPING_RATE_EXPIRED",

  ThrottledDuringCheckout = "THROTTLED_DURING_CHECKOUT",

  TooLong = "TOO_LONG",

  TotalPriceMismatch = "TOTAL_PRICE_MISMATCH",

  UnableToApply = "UNABLE_TO_APPLY",
}

export type CheckoutGiftCardRemoveV2Payload = {
  __typename?: "CheckoutGiftCardRemoveV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutGiftCardsAppendPayload = {
  __typename?: "CheckoutGiftCardsAppendPayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutLineItem = Node & {
  __typename?: "CheckoutLineItem"

  customAttributes: Array<Attribute>

  discountAllocations: Array<DiscountAllocation>

  id: Scalars["ID"]["output"]

  quantity: Scalars["Int"]["output"]

  title: Scalars["String"]["output"]

  unitPrice?: Maybe<MoneyV2>

  variant?: Maybe<ProductVariant>
}

export type CheckoutLineItemConnection = {
  __typename?: "CheckoutLineItemConnection"

  edges: Array<CheckoutLineItemEdge>

  nodes: Array<CheckoutLineItem>

  pageInfo: PageInfo
}

export type CheckoutLineItemEdge = {
  __typename?: "CheckoutLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: CheckoutLineItem
}

export type CheckoutLineItemInput = {
  customAttributes?: InputMaybe<Array<AttributeInput>>

  quantity: Scalars["Int"]["input"]

  variantId: Scalars["ID"]["input"]
}

export type CheckoutLineItemUpdateInput = {
  customAttributes?: InputMaybe<Array<AttributeInput>>

  id?: InputMaybe<Scalars["ID"]["input"]>

  quantity?: InputMaybe<Scalars["Int"]["input"]>

  variantId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CheckoutLineItemsAddPayload = {
  __typename?: "CheckoutLineItemsAddPayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutLineItemsRemovePayload = {
  __typename?: "CheckoutLineItemsRemovePayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutLineItemsReplacePayload = {
  __typename?: "CheckoutLineItemsReplacePayload"

  checkout?: Maybe<Checkout>

  userErrors: Array<CheckoutUserError>
}

export type CheckoutLineItemsUpdatePayload = {
  __typename?: "CheckoutLineItemsUpdatePayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutShippingAddressUpdateV2Payload = {
  __typename?: "CheckoutShippingAddressUpdateV2Payload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutShippingLineUpdatePayload = {
  __typename?: "CheckoutShippingLineUpdatePayload"

  checkout?: Maybe<Checkout>

  checkoutUserErrors: Array<CheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CheckoutUserError = DisplayableError & {
  __typename?: "CheckoutUserError"

  code?: Maybe<CheckoutErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type Collection = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: "Collection"

    description: Scalars["String"]["output"]

    descriptionHtml: Scalars["HTML"]["output"]

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    products: ProductConnection

    seo: Seo

    title: Scalars["String"]["output"]

    trackingParameters?: Maybe<Scalars["String"]["output"]>

    updatedAt: Scalars["DateTime"]["output"]
  }

export type CollectionDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars["Int"]["input"]>
}

export type CollectionMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CollectionMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  filters?: InputMaybe<Array<ProductFilter>>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductCollectionSortKeys>
}

export type CollectionConnection = {
  __typename?: "CollectionConnection"

  edges: Array<CollectionEdge>

  nodes: Array<Collection>

  pageInfo: PageInfo

  totalCount: Scalars["UnsignedInt64"]["output"]
}

export type CollectionEdge = {
  __typename?: "CollectionEdge"

  cursor: Scalars["String"]["output"]

  node: Collection
}

export enum CollectionSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export type Comment = Node & {
  __typename?: "Comment"

  author: CommentAuthor

  content: Scalars["String"]["output"]

  contentHtml: Scalars["HTML"]["output"]

  id: Scalars["ID"]["output"]
}

export type CommentContentArgs = {
  truncateAt?: InputMaybe<Scalars["Int"]["input"]>
}

export type CommentAuthor = {
  __typename?: "CommentAuthor"

  email: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export type CommentConnection = {
  __typename?: "CommentConnection"

  edges: Array<CommentEdge>

  nodes: Array<Comment>

  pageInfo: PageInfo
}

export type CommentEdge = {
  __typename?: "CommentEdge"

  cursor: Scalars["String"]["output"]

  node: Comment
}

export type CompletePaymentChallenge = {
  __typename?: "CompletePaymentChallenge"

  redirectUrl?: Maybe<Scalars["URL"]["output"]>
}

export type CompletionError = {
  __typename?: "CompletionError"

  code: CompletionErrorCode

  message?: Maybe<Scalars["String"]["output"]>
}

export enum CompletionErrorCode {
  Error = "ERROR",
  InventoryReservationError = "INVENTORY_RESERVATION_ERROR",
  PaymentAmountTooSmall = "PAYMENT_AMOUNT_TOO_SMALL",
  PaymentCallIssuer = "PAYMENT_CALL_ISSUER",
  PaymentCardDeclined = "PAYMENT_CARD_DECLINED",
  PaymentError = "PAYMENT_ERROR",
  PaymentGatewayNotEnabledError = "PAYMENT_GATEWAY_NOT_ENABLED_ERROR",
  PaymentInsufficientFunds = "PAYMENT_INSUFFICIENT_FUNDS",
  PaymentInvalidBillingAddress = "PAYMENT_INVALID_BILLING_ADDRESS",
  PaymentInvalidCreditCard = "PAYMENT_INVALID_CREDIT_CARD",
  PaymentInvalidCurrency = "PAYMENT_INVALID_CURRENCY",
  PaymentInvalidPaymentMethod = "PAYMENT_INVALID_PAYMENT_METHOD",
  PaymentTransientError = "PAYMENT_TRANSIENT_ERROR",
}

export type ComponentizableCartLine = BaseCartLine &
  Node & {
    __typename?: "ComponentizableCartLine"

    attribute?: Maybe<Attribute>

    attributes: Array<Attribute>

    cost: CartLineCost

    discountAllocations: Array<CartDiscountAllocation>
    /**
     * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartLineEstimatedCost

    id: Scalars["ID"]["output"]

    lineComponents: Array<CartLine>

    merchandise: Merchandise

    quantity: Scalars["Int"]["output"]

    sellingPlanAllocation?: Maybe<SellingPlanAllocation>
  }

export type ComponentizableCartLineAttributeArgs = {
  key: Scalars["String"]["input"]
}

export type Country = {
  __typename?: "Country"

  availableLanguages: Array<Language>

  currency: Currency

  isoCode: CountryCode

  market?: Maybe<Market>

  name: Scalars["String"]["output"]

  unitSystem: UnitSystem
}

export enum CountryCode {
  Ac = "AC",

  Ad = "AD",

  Ae = "AE",

  Af = "AF",

  Ag = "AG",

  Ai = "AI",

  Al = "AL",

  Am = "AM",

  An = "AN",

  Ao = "AO",

  Ar = "AR",

  At = "AT",

  Au = "AU",

  Aw = "AW",

  Ax = "AX",

  Az = "AZ",

  Ba = "BA",

  Bb = "BB",

  Bd = "BD",

  Be = "BE",

  Bf = "BF",

  Bg = "BG",

  Bh = "BH",

  Bi = "BI",

  Bj = "BJ",

  Bl = "BL",

  Bm = "BM",

  Bn = "BN",

  Bo = "BO",

  Bq = "BQ",

  Br = "BR",

  Bs = "BS",

  Bt = "BT",

  Bv = "BV",

  Bw = "BW",

  By = "BY",

  Bz = "BZ",

  Ca = "CA",

  Cc = "CC",

  Cd = "CD",

  Cf = "CF",

  Cg = "CG",

  Ch = "CH",

  Ci = "CI",

  Ck = "CK",

  Cl = "CL",

  Cm = "CM",

  Cn = "CN",

  Co = "CO",

  Cr = "CR",

  Cu = "CU",

  Cv = "CV",

  Cw = "CW",

  Cx = "CX",

  Cy = "CY",

  Cz = "CZ",

  De = "DE",

  Dj = "DJ",

  Dk = "DK",

  Dm = "DM",

  Do = "DO",

  Dz = "DZ",

  Ec = "EC",

  Ee = "EE",

  Eg = "EG",

  Eh = "EH",

  Er = "ER",

  Es = "ES",

  Et = "ET",

  Fi = "FI",

  Fj = "FJ",

  Fk = "FK",

  Fo = "FO",

  Fr = "FR",

  Ga = "GA",

  Gb = "GB",

  Gd = "GD",

  Ge = "GE",

  Gf = "GF",

  Gg = "GG",

  Gh = "GH",

  Gi = "GI",

  Gl = "GL",

  Gm = "GM",

  Gn = "GN",

  Gp = "GP",

  Gq = "GQ",

  Gr = "GR",

  Gs = "GS",

  Gt = "GT",

  Gw = "GW",

  Gy = "GY",

  Hk = "HK",

  Hm = "HM",

  Hn = "HN",

  Hr = "HR",

  Ht = "HT",

  Hu = "HU",

  Id = "ID",

  Ie = "IE",

  Il = "IL",

  Im = "IM",

  In = "IN",

  Io = "IO",

  Iq = "IQ",

  Ir = "IR",

  Is = "IS",

  It = "IT",

  Je = "JE",

  Jm = "JM",

  Jo = "JO",

  Jp = "JP",

  Ke = "KE",

  Kg = "KG",

  Kh = "KH",

  Ki = "KI",

  Km = "KM",

  Kn = "KN",

  Kp = "KP",

  Kr = "KR",

  Kw = "KW",

  Ky = "KY",

  Kz = "KZ",

  La = "LA",

  Lb = "LB",

  Lc = "LC",

  Li = "LI",

  Lk = "LK",

  Lr = "LR",

  Ls = "LS",

  Lt = "LT",

  Lu = "LU",

  Lv = "LV",

  Ly = "LY",

  Ma = "MA",

  Mc = "MC",

  Md = "MD",

  Me = "ME",

  Mf = "MF",

  Mg = "MG",

  Mk = "MK",

  Ml = "ML",

  Mm = "MM",

  Mn = "MN",

  Mo = "MO",

  Mq = "MQ",

  Mr = "MR",

  Ms = "MS",

  Mt = "MT",

  Mu = "MU",

  Mv = "MV",

  Mw = "MW",

  Mx = "MX",

  My = "MY",

  Mz = "MZ",

  Na = "NA",

  Nc = "NC",

  Ne = "NE",

  Nf = "NF",

  Ng = "NG",

  Ni = "NI",

  Nl = "NL",

  No = "NO",

  Np = "NP",

  Nr = "NR",

  Nu = "NU",

  Nz = "NZ",

  Om = "OM",

  Pa = "PA",

  Pe = "PE",

  Pf = "PF",

  Pg = "PG",

  Ph = "PH",

  Pk = "PK",

  Pl = "PL",

  Pm = "PM",

  Pn = "PN",

  Ps = "PS",

  Pt = "PT",

  Py = "PY",

  Qa = "QA",

  Re = "RE",

  Ro = "RO",

  Rs = "RS",

  Ru = "RU",

  Rw = "RW",

  Sa = "SA",

  Sb = "SB",

  Sc = "SC",

  Sd = "SD",

  Se = "SE",

  Sg = "SG",

  Sh = "SH",

  Si = "SI",

  Sj = "SJ",

  Sk = "SK",

  Sl = "SL",

  Sm = "SM",

  Sn = "SN",

  So = "SO",

  Sr = "SR",

  Ss = "SS",

  St = "ST",

  Sv = "SV",

  Sx = "SX",

  Sy = "SY",

  Sz = "SZ",

  Ta = "TA",

  Tc = "TC",

  Td = "TD",

  Tf = "TF",

  Tg = "TG",

  Th = "TH",

  Tj = "TJ",

  Tk = "TK",

  Tl = "TL",

  Tm = "TM",

  Tn = "TN",

  To = "TO",

  Tr = "TR",

  Tt = "TT",

  Tv = "TV",

  Tw = "TW",

  Tz = "TZ",

  Ua = "UA",

  Ug = "UG",

  Um = "UM",

  Us = "US",

  Uy = "UY",

  Uz = "UZ",

  Va = "VA",

  Vc = "VC",

  Ve = "VE",

  Vg = "VG",

  Vn = "VN",

  Vu = "VU",

  Wf = "WF",

  Ws = "WS",

  Xk = "XK",

  Ye = "YE",

  Yt = "YT",

  Za = "ZA",

  Zm = "ZM",

  Zw = "ZW",

  Zz = "ZZ",
}

export type CreditCard = {
  __typename?: "CreditCard"

  brand?: Maybe<Scalars["String"]["output"]>

  expiryMonth?: Maybe<Scalars["Int"]["output"]>

  expiryYear?: Maybe<Scalars["Int"]["output"]>

  firstDigits?: Maybe<Scalars["String"]["output"]>

  firstName?: Maybe<Scalars["String"]["output"]>

  lastDigits?: Maybe<Scalars["String"]["output"]>

  lastName?: Maybe<Scalars["String"]["output"]>

  maskedNumber?: Maybe<Scalars["String"]["output"]>
}

export type CreditCardPaymentInputV2 = {
  billingAddress: MailingAddressInput

  idempotencyKey: Scalars["String"]["input"]

  paymentAmount: MoneyInput

  test?: InputMaybe<Scalars["Boolean"]["input"]>

  vaultId: Scalars["String"]["input"]
}

export enum CropRegion {
  Bottom = "BOTTOM",

  Center = "CENTER",

  Left = "LEFT",

  Right = "RIGHT",

  Top = "TOP",
}

export type Currency = {
  __typename?: "Currency"

  isoCode: CurrencyCode

  name: Scalars["String"]["output"]

  symbol: Scalars["String"]["output"]
}

export enum CurrencyCode {
  Aed = "AED",

  Afn = "AFN",

  All = "ALL",

  Amd = "AMD",

  Ang = "ANG",

  Aoa = "AOA",

  Ars = "ARS",

  Aud = "AUD",

  Awg = "AWG",

  Azn = "AZN",

  Bam = "BAM",

  Bbd = "BBD",

  Bdt = "BDT",

  Bgn = "BGN",

  Bhd = "BHD",

  Bif = "BIF",

  Bmd = "BMD",

  Bnd = "BND",

  Bob = "BOB",

  Brl = "BRL",

  Bsd = "BSD",

  Btn = "BTN",

  Bwp = "BWP",

  Byn = "BYN",
  /**
   * Belarusian Ruble (BYR).
   * @deprecated `BYR` is deprecated. Use `BYN` available from version `2021-01` onwards instead.
   */
  Byr = "BYR",

  Bzd = "BZD",

  Cad = "CAD",

  Cdf = "CDF",

  Chf = "CHF",

  Clp = "CLP",

  Cny = "CNY",

  Cop = "COP",

  Crc = "CRC",

  Cve = "CVE",

  Czk = "CZK",

  Djf = "DJF",

  Dkk = "DKK",

  Dop = "DOP",

  Dzd = "DZD",

  Egp = "EGP",

  Ern = "ERN",

  Etb = "ETB",

  Eur = "EUR",

  Fjd = "FJD",

  Fkp = "FKP",

  Gbp = "GBP",

  Gel = "GEL",

  Ghs = "GHS",

  Gip = "GIP",

  Gmd = "GMD",

  Gnf = "GNF",

  Gtq = "GTQ",

  Gyd = "GYD",

  Hkd = "HKD",

  Hnl = "HNL",

  Hrk = "HRK",

  Htg = "HTG",

  Huf = "HUF",

  Idr = "IDR",

  Ils = "ILS",

  Inr = "INR",

  Iqd = "IQD",

  Irr = "IRR",

  Isk = "ISK",

  Jep = "JEP",

  Jmd = "JMD",

  Jod = "JOD",

  Jpy = "JPY",

  Kes = "KES",

  Kgs = "KGS",

  Khr = "KHR",

  Kid = "KID",

  Kmf = "KMF",

  Krw = "KRW",

  Kwd = "KWD",

  Kyd = "KYD",

  Kzt = "KZT",

  Lak = "LAK",

  Lbp = "LBP",

  Lkr = "LKR",

  Lrd = "LRD",

  Lsl = "LSL",

  Ltl = "LTL",

  Lvl = "LVL",

  Lyd = "LYD",

  Mad = "MAD",

  Mdl = "MDL",

  Mga = "MGA",

  Mkd = "MKD",

  Mmk = "MMK",

  Mnt = "MNT",

  Mop = "MOP",

  Mru = "MRU",

  Mur = "MUR",

  Mvr = "MVR",

  Mwk = "MWK",

  Mxn = "MXN",

  Myr = "MYR",

  Mzn = "MZN",

  Nad = "NAD",

  Ngn = "NGN",

  Nio = "NIO",

  Nok = "NOK",

  Npr = "NPR",

  Nzd = "NZD",

  Omr = "OMR",

  Pab = "PAB",

  Pen = "PEN",

  Pgk = "PGK",

  Php = "PHP",

  Pkr = "PKR",

  Pln = "PLN",

  Pyg = "PYG",

  Qar = "QAR",

  Ron = "RON",

  Rsd = "RSD",

  Rub = "RUB",

  Rwf = "RWF",

  Sar = "SAR",

  Sbd = "SBD",

  Scr = "SCR",

  Sdg = "SDG",

  Sek = "SEK",

  Sgd = "SGD",

  Shp = "SHP",

  Sll = "SLL",

  Sos = "SOS",

  Srd = "SRD",

  Ssp = "SSP",
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated `STD` is deprecated. Use `STN` available from version `2022-07` onwards instead.
   */
  Std = "STD",

  Stn = "STN",

  Syp = "SYP",

  Szl = "SZL",

  Thb = "THB",

  Tjs = "TJS",

  Tmt = "TMT",

  Tnd = "TND",

  Top = "TOP",

  Try = "TRY",

  Ttd = "TTD",

  Twd = "TWD",

  Tzs = "TZS",

  Uah = "UAH",

  Ugx = "UGX",

  Usd = "USD",

  Uyu = "UYU",

  Uzs = "UZS",

  Ved = "VED",
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated `VEF` is deprecated. Use `VES` available from version `2020-10` onwards instead.
   */
  Vef = "VEF",

  Ves = "VES",

  Vnd = "VND",

  Vuv = "VUV",

  Wst = "WST",

  Xaf = "XAF",

  Xcd = "XCD",

  Xof = "XOF",

  Xpf = "XPF",

  Xxx = "XXX",

  Yer = "YER",

  Zar = "ZAR",

  Zmw = "ZMW",
}

export type Customer = HasMetafields & {
  __typename?: "Customer"

  acceptsMarketing: Scalars["Boolean"]["output"]

  addresses: MailingAddressConnection

  createdAt: Scalars["DateTime"]["output"]

  defaultAddress?: Maybe<MailingAddress>

  displayName: Scalars["String"]["output"]

  email?: Maybe<Scalars["String"]["output"]>

  firstName?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  lastIncompleteCheckout?: Maybe<Checkout>

  lastName?: Maybe<Scalars["String"]["output"]>

  metafield?: Maybe<Metafield>

  metafields: Array<Maybe<Metafield>>

  numberOfOrders: Scalars["UnsignedInt64"]["output"]

  orders: OrderConnection

  phone?: Maybe<Scalars["String"]["output"]>

  tags: Array<Scalars["String"]["output"]>

  updatedAt: Scalars["DateTime"]["output"]
}

export type CustomerAddressesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomerMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type CustomerOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type CustomerAccessToken = {
  __typename?: "CustomerAccessToken"

  accessToken: Scalars["String"]["output"]

  expiresAt: Scalars["DateTime"]["output"]
}

export type CustomerAccessTokenCreateInput = {
  email: Scalars["String"]["input"]

  password: Scalars["String"]["input"]
}

export type CustomerAccessTokenCreatePayload = {
  __typename?: "CustomerAccessTokenCreatePayload"

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerAccessTokenCreateWithMultipassPayload = {
  __typename?: "CustomerAccessTokenCreateWithMultipassPayload"

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
}

export type CustomerAccessTokenDeletePayload = {
  __typename?: "CustomerAccessTokenDeletePayload"

  deletedAccessToken?: Maybe<Scalars["String"]["output"]>

  deletedCustomerAccessTokenId?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<UserError>
}

export type CustomerAccessTokenRenewPayload = {
  __typename?: "CustomerAccessTokenRenewPayload"

  customerAccessToken?: Maybe<CustomerAccessToken>

  userErrors: Array<UserError>
}

export type CustomerActivateByUrlPayload = {
  __typename?: "CustomerActivateByUrlPayload"

  customer?: Maybe<Customer>

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
}

export type CustomerActivateInput = {
  activationToken: Scalars["String"]["input"]

  password: Scalars["String"]["input"]
}

export type CustomerActivatePayload = {
  __typename?: "CustomerActivatePayload"

  customer?: Maybe<Customer>

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerAddressCreatePayload = {
  __typename?: "CustomerAddressCreatePayload"

  customerAddress?: Maybe<MailingAddress>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerAddressDeletePayload = {
  __typename?: "CustomerAddressDeletePayload"

  customerUserErrors: Array<CustomerUserError>

  deletedCustomerAddressId?: Maybe<Scalars["String"]["output"]>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerAddressUpdatePayload = {
  __typename?: "CustomerAddressUpdatePayload"

  customerAddress?: Maybe<MailingAddress>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerCreateInput = {
  acceptsMarketing?: InputMaybe<Scalars["Boolean"]["input"]>

  email: Scalars["String"]["input"]

  firstName?: InputMaybe<Scalars["String"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  password: Scalars["String"]["input"]

  phone?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomerCreatePayload = {
  __typename?: "CustomerCreatePayload"

  customer?: Maybe<Customer>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerDefaultAddressUpdatePayload = {
  __typename?: "CustomerDefaultAddressUpdatePayload"

  customer?: Maybe<Customer>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export enum CustomerErrorCode {
  AlreadyEnabled = "ALREADY_ENABLED",

  BadDomain = "BAD_DOMAIN",

  Blank = "BLANK",

  ContainsHtmlTags = "CONTAINS_HTML_TAGS",

  ContainsUrl = "CONTAINS_URL",

  CustomerDisabled = "CUSTOMER_DISABLED",

  Invalid = "INVALID",

  InvalidMultipassRequest = "INVALID_MULTIPASS_REQUEST",

  NotFound = "NOT_FOUND",

  PasswordStartsOrEndsWithWhitespace = "PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE",

  Taken = "TAKEN",

  TokenInvalid = "TOKEN_INVALID",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnidentifiedCustomer = "UNIDENTIFIED_CUSTOMER",
}

export type CustomerRecoverPayload = {
  __typename?: "CustomerRecoverPayload"

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerResetByUrlPayload = {
  __typename?: "CustomerResetByUrlPayload"

  customer?: Maybe<Customer>

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerResetInput = {
  password: Scalars["String"]["input"]

  resetToken: Scalars["String"]["input"]
}

export type CustomerResetPayload = {
  __typename?: "CustomerResetPayload"

  customer?: Maybe<Customer>

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerUpdateInput = {
  acceptsMarketing?: InputMaybe<Scalars["Boolean"]["input"]>

  email?: InputMaybe<Scalars["String"]["input"]>

  firstName?: InputMaybe<Scalars["String"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  password?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomerUpdatePayload = {
  __typename?: "CustomerUpdatePayload"

  customer?: Maybe<Customer>

  customerAccessToken?: Maybe<CustomerAccessToken>

  customerUserErrors: Array<CustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type CustomerUserError = DisplayableError & {
  __typename?: "CustomerUserError"

  code?: Maybe<CustomerErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type DeliveryAddress = MailingAddress

export type DeliveryAddressInput = {
  customerAddressId?: InputMaybe<Scalars["ID"]["input"]>

  deliveryAddress?: InputMaybe<MailingAddressInput>
}

export enum DeliveryMethodType {
  Local = "LOCAL",

  None = "NONE",

  PickupPoint = "PICKUP_POINT",

  PickUp = "PICK_UP",

  Retail = "RETAIL",

  Shipping = "SHIPPING",
}

export enum DigitalWallet {
  AndroidPay = "ANDROID_PAY",

  ApplePay = "APPLE_PAY",

  GooglePay = "GOOGLE_PAY",

  ShopifyPay = "SHOPIFY_PAY",
}

export type DiscountAllocation = {
  __typename?: "DiscountAllocation"

  allocatedAmount: MoneyV2

  discountApplication: DiscountApplication
}

export type DiscountApplication = {
  allocationMethod: DiscountApplicationAllocationMethod

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export enum DiscountApplicationAllocationMethod {
  Across = "ACROSS",

  Each = "EACH",
  /**
   * The value is specifically applied onto a particular line.
   * @deprecated Use ACROSS instead.
   */
  One = "ONE",
}

export type DiscountApplicationConnection = {
  __typename?: "DiscountApplicationConnection"

  edges: Array<DiscountApplicationEdge>

  nodes: Array<DiscountApplication>

  pageInfo: PageInfo
}

export type DiscountApplicationEdge = {
  __typename?: "DiscountApplicationEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountApplication
}

export enum DiscountApplicationTargetSelection {
  All = "ALL",

  Entitled = "ENTITLED",

  Explicit = "EXPLICIT",
}

export enum DiscountApplicationTargetType {
  LineItem = "LINE_ITEM",

  ShippingLine = "SHIPPING_LINE",
}

export type DiscountCodeApplication = DiscountApplication & {
  __typename?: "DiscountCodeApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  applicable: Scalars["Boolean"]["output"]

  code: Scalars["String"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type DisplayableError = {
  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type Domain = {
  __typename?: "Domain"

  host: Scalars["String"]["output"]

  sslEnabled: Scalars["Boolean"]["output"]

  url: Scalars["URL"]["output"]
}

export type ExternalVideo = Media &
  Node & {
    __typename?: "ExternalVideo"

    alt?: Maybe<Scalars["String"]["output"]>

    embedUrl: Scalars["URL"]["output"]
    /**
     * The URL.
     * @deprecated Use `originUrl` instead.
     */
    embeddedUrl: Scalars["URL"]["output"]

    host: MediaHost

    id: Scalars["ID"]["output"]

    mediaContentType: MediaContentType

    originUrl: Scalars["URL"]["output"]

    presentation?: Maybe<MediaPresentation>

    previewImage?: Maybe<Image>
  }

export type Filter = {
  __typename?: "Filter"

  id: Scalars["String"]["output"]

  label: Scalars["String"]["output"]

  type: FilterType

  values: Array<FilterValue>
}

export enum FilterType {
  Boolean = "BOOLEAN",

  List = "LIST",

  PriceRange = "PRICE_RANGE",
}

export type FilterValue = {
  __typename?: "FilterValue"

  count: Scalars["Int"]["output"]

  id: Scalars["String"]["output"]

  input: Scalars["JSON"]["output"]

  label: Scalars["String"]["output"]
}

export type Fulfillment = {
  __typename?: "Fulfillment"

  fulfillmentLineItems: FulfillmentLineItemConnection

  trackingCompany?: Maybe<Scalars["String"]["output"]>

  trackingInfo: Array<FulfillmentTrackingInfo>
}

export type FulfillmentFulfillmentLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentTrackingInfoArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type FulfillmentLineItem = {
  __typename?: "FulfillmentLineItem"

  lineItem: OrderLineItem

  quantity: Scalars["Int"]["output"]
}

export type FulfillmentLineItemConnection = {
  __typename?: "FulfillmentLineItemConnection"

  edges: Array<FulfillmentLineItemEdge>

  nodes: Array<FulfillmentLineItem>

  pageInfo: PageInfo
}

export type FulfillmentLineItemEdge = {
  __typename?: "FulfillmentLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: FulfillmentLineItem
}

export type FulfillmentTrackingInfo = {
  __typename?: "FulfillmentTrackingInfo"

  number?: Maybe<Scalars["String"]["output"]>

  url?: Maybe<Scalars["URL"]["output"]>
}

export type GenericFile = Node & {
  __typename?: "GenericFile"

  alt?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  mimeType?: Maybe<Scalars["String"]["output"]>

  originalFileSize?: Maybe<Scalars["Int"]["output"]>

  previewImage?: Maybe<Image>

  url?: Maybe<Scalars["URL"]["output"]>
}

export type GeoCoordinateInput = {
  latitude: Scalars["Float"]["input"]

  longitude: Scalars["Float"]["input"]
}

export type HasMetafields = {
  metafield?: Maybe<Metafield>

  metafields: Array<Maybe<Metafield>>
}

export type HasMetafieldsMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type HasMetafieldsMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type HasMetafieldsIdentifier = {
  key: Scalars["String"]["input"]

  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type Image = {
  __typename?: "Image"

  altText?: Maybe<Scalars["String"]["output"]>

  height?: Maybe<Scalars["Int"]["output"]>

  id?: Maybe<Scalars["ID"]["output"]>
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   *
   * @deprecated Use `url` instead.
   */
  originalSrc: Scalars["URL"]["output"]
  /**
   * The location of the image as a URL.
   * @deprecated Use `url` instead.
   */
  src: Scalars["URL"]["output"]
  /**
   * The location of the transformed image as a URL.
   *
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type doesn't support will be ignored.
   *
   * @deprecated Use `url(transform:)` instead
   */
  transformedSrc: Scalars["URL"]["output"]

  url: Scalars["URL"]["output"]

  width?: Maybe<Scalars["Int"]["output"]>
}

export type ImageTransformedSrcArgs = {
  crop?: InputMaybe<CropRegion>
  maxHeight?: InputMaybe<Scalars["Int"]["input"]>
  maxWidth?: InputMaybe<Scalars["Int"]["input"]>
  preferredContentType?: InputMaybe<ImageContentType>
  scale?: InputMaybe<Scalars["Int"]["input"]>
}

export type ImageUrlArgs = {
  transform?: InputMaybe<ImageTransformInput>
}

export type ImageConnection = {
  __typename?: "ImageConnection"

  edges: Array<ImageEdge>

  nodes: Array<Image>

  pageInfo: PageInfo
}

export enum ImageContentType {
  Jpg = "JPG",

  Png = "PNG",

  Webp = "WEBP",
}

export type ImageEdge = {
  __typename?: "ImageEdge"

  cursor: Scalars["String"]["output"]

  node: Image
}

export type ImageTransformInput = {
  crop?: InputMaybe<CropRegion>

  maxHeight?: InputMaybe<Scalars["Int"]["input"]>

  maxWidth?: InputMaybe<Scalars["Int"]["input"]>

  preferredContentType?: InputMaybe<ImageContentType>

  scale?: InputMaybe<Scalars["Int"]["input"]>
}

export type InContextAnnotation = {
  __typename?: "InContextAnnotation"
  description: Scalars["String"]["output"]
  type: InContextAnnotationType
}

export type InContextAnnotationType = {
  __typename?: "InContextAnnotationType"
  kind: Scalars["String"]["output"]
  name: Scalars["String"]["output"]
}

export type Language = {
  __typename?: "Language"

  endonymName: Scalars["String"]["output"]

  isoCode: LanguageCode

  name: Scalars["String"]["output"]
}

export enum LanguageCode {
  Af = "AF",

  Ak = "AK",

  Am = "AM",

  Ar = "AR",

  As = "AS",

  Az = "AZ",

  Be = "BE",

  Bg = "BG",

  Bm = "BM",

  Bn = "BN",

  Bo = "BO",

  Br = "BR",

  Bs = "BS",

  Ca = "CA",

  Ce = "CE",

  Ckb = "CKB",

  Cs = "CS",

  Cu = "CU",

  Cy = "CY",

  Da = "DA",

  De = "DE",

  Dz = "DZ",

  Ee = "EE",

  El = "EL",

  En = "EN",

  Eo = "EO",

  Es = "ES",

  Et = "ET",

  Eu = "EU",

  Fa = "FA",

  Ff = "FF",

  Fi = "FI",

  Fil = "FIL",

  Fo = "FO",

  Fr = "FR",

  Fy = "FY",

  Ga = "GA",

  Gd = "GD",

  Gl = "GL",

  Gu = "GU",

  Gv = "GV",

  Ha = "HA",

  He = "HE",

  Hi = "HI",

  Hr = "HR",

  Hu = "HU",

  Hy = "HY",

  Ia = "IA",

  Id = "ID",

  Ig = "IG",

  Ii = "II",

  Is = "IS",

  It = "IT",

  Ja = "JA",

  Jv = "JV",

  Ka = "KA",

  Ki = "KI",

  Kk = "KK",

  Kl = "KL",

  Km = "KM",

  Kn = "KN",

  Ko = "KO",

  Ks = "KS",

  Ku = "KU",

  Kw = "KW",

  Ky = "KY",

  La = "LA",

  Lb = "LB",

  Lg = "LG",

  Ln = "LN",

  Lo = "LO",

  Lt = "LT",

  Lu = "LU",

  Lv = "LV",

  Mg = "MG",

  Mi = "MI",

  Mk = "MK",

  Ml = "ML",

  Mn = "MN",

  Mo = "MO",

  Mr = "MR",

  Ms = "MS",

  Mt = "MT",

  My = "MY",

  Nb = "NB",

  Nd = "ND",

  Ne = "NE",

  Nl = "NL",

  Nn = "NN",

  No = "NO",

  Om = "OM",

  Or = "OR",

  Os = "OS",

  Pa = "PA",

  Pl = "PL",

  Ps = "PS",

  Pt = "PT",

  PtBr = "PT_BR",

  PtPt = "PT_PT",

  Qu = "QU",

  Rm = "RM",

  Rn = "RN",

  Ro = "RO",

  Ru = "RU",

  Rw = "RW",

  Sa = "SA",

  Sc = "SC",

  Sd = "SD",

  Se = "SE",

  Sg = "SG",

  Sh = "SH",

  Si = "SI",

  Sk = "SK",

  Sl = "SL",

  Sn = "SN",

  So = "SO",

  Sq = "SQ",

  Sr = "SR",

  Su = "SU",

  Sv = "SV",

  Sw = "SW",

  Ta = "TA",

  Te = "TE",

  Tg = "TG",

  Th = "TH",

  Ti = "TI",

  Tk = "TK",

  To = "TO",

  Tr = "TR",

  Tt = "TT",

  Ug = "UG",

  Uk = "UK",

  Ur = "UR",

  Uz = "UZ",

  Vi = "VI",

  Vo = "VO",

  Wo = "WO",

  Xh = "XH",

  Yi = "YI",

  Yo = "YO",

  Zh = "ZH",

  ZhCn = "ZH_CN",

  ZhTw = "ZH_TW",

  Zu = "ZU",
}

export type Localization = {
  __typename?: "Localization"

  availableCountries: Array<Country>

  availableLanguages: Array<Language>

  country: Country

  language: Language

  market: Market
}

export type Location = HasMetafields &
  Node & {
    __typename?: "Location"

    address: LocationAddress

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    name: Scalars["String"]["output"]
  }

export type LocationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type LocationMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type LocationAddress = {
  __typename?: "LocationAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  countryCode?: Maybe<Scalars["String"]["output"]>

  formatted: Array<Scalars["String"]["output"]>

  latitude?: Maybe<Scalars["Float"]["output"]>

  longitude?: Maybe<Scalars["Float"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type LocationConnection = {
  __typename?: "LocationConnection"

  edges: Array<LocationEdge>

  nodes: Array<Location>

  pageInfo: PageInfo
}

export type LocationEdge = {
  __typename?: "LocationEdge"

  cursor: Scalars["String"]["output"]

  node: Location
}

export enum LocationSortKeys {
  City = "CITY",

  Distance = "DISTANCE",

  Id = "ID",

  Name = "NAME",
}

export type MailingAddress = Node & {
  __typename?: "MailingAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  company?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   * @deprecated Use `countryCodeV2` instead.
   */
  countryCode?: Maybe<Scalars["String"]["output"]>

  countryCodeV2?: Maybe<CountryCode>

  firstName?: Maybe<Scalars["String"]["output"]>

  formatted: Array<Scalars["String"]["output"]>

  formattedArea?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  lastName?: Maybe<Scalars["String"]["output"]>

  latitude?: Maybe<Scalars["Float"]["output"]>

  longitude?: Maybe<Scalars["Float"]["output"]>

  name?: Maybe<Scalars["String"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type MailingAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars["Boolean"]["input"]>
  withName?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MailingAddressConnection = {
  __typename?: "MailingAddressConnection"

  edges: Array<MailingAddressEdge>

  nodes: Array<MailingAddress>

  pageInfo: PageInfo
}

export type MailingAddressEdge = {
  __typename?: "MailingAddressEdge"

  cursor: Scalars["String"]["output"]

  node: MailingAddress
}

export type MailingAddressInput = {
  address1?: InputMaybe<Scalars["String"]["input"]>

  address2?: InputMaybe<Scalars["String"]["input"]>

  city?: InputMaybe<Scalars["String"]["input"]>

  company?: InputMaybe<Scalars["String"]["input"]>

  country?: InputMaybe<Scalars["String"]["input"]>

  firstName?: InputMaybe<Scalars["String"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  province?: InputMaybe<Scalars["String"]["input"]>

  zip?: InputMaybe<Scalars["String"]["input"]>
}

export type ManualDiscountApplication = DiscountApplication & {
  __typename?: "ManualDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  description?: Maybe<Scalars["String"]["output"]>

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]

  value: PricingValue
}

export type Market = HasMetafields &
  Node & {
    __typename?: "Market"

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>
  }

export type MarketMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type MarketMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type Media = {
  alt?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  mediaContentType: MediaContentType

  presentation?: Maybe<MediaPresentation>

  previewImage?: Maybe<Image>
}

export type MediaConnection = {
  __typename?: "MediaConnection"

  edges: Array<MediaEdge>

  nodes: Array<Media>

  pageInfo: PageInfo
}

export enum MediaContentType {
  ExternalVideo = "EXTERNAL_VIDEO",

  Image = "IMAGE",

  Model_3D = "MODEL_3D",

  Video = "VIDEO",
}

export type MediaEdge = {
  __typename?: "MediaEdge"

  cursor: Scalars["String"]["output"]

  node: Media
}

export enum MediaHost {
  Vimeo = "VIMEO",

  Youtube = "YOUTUBE",
}

export type MediaImage = Media &
  Node & {
    __typename?: "MediaImage"

    alt?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    mediaContentType: MediaContentType

    presentation?: Maybe<MediaPresentation>

    previewImage?: Maybe<Image>
  }

export type MediaPresentation = Node & {
  __typename?: "MediaPresentation"

  asJson?: Maybe<Scalars["JSON"]["output"]>

  id: Scalars["ID"]["output"]
}

export type MediaPresentationAsJsonArgs = {
  format: MediaPresentationFormat
}

export enum MediaPresentationFormat {
  Image = "IMAGE",

  ModelViewer = "MODEL_VIEWER",
}

export type Menu = Node & {
  __typename?: "Menu"

  handle: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  items: Array<MenuItem>

  itemsCount: Scalars["Int"]["output"]

  title: Scalars["String"]["output"]
}

export type MenuItem = Node & {
  __typename?: "MenuItem"

  id: Scalars["ID"]["output"]

  items: Array<MenuItem>

  resource?: Maybe<MenuItemResource>

  resourceId?: Maybe<Scalars["ID"]["output"]>

  tags: Array<Scalars["String"]["output"]>

  title: Scalars["String"]["output"]

  type: MenuItemType

  url?: Maybe<Scalars["URL"]["output"]>
}

export type MenuItemResource = Article | Blog | Collection | Page | Product | ShopPolicy

export enum MenuItemType {
  Article = "ARTICLE",

  Blog = "BLOG",

  Catalog = "CATALOG",

  Collection = "COLLECTION",

  Collections = "COLLECTIONS",

  Frontpage = "FRONTPAGE",

  Http = "HTTP",

  Page = "PAGE",

  Product = "PRODUCT",

  Search = "SEARCH",

  ShopPolicy = "SHOP_POLICY",
}

export type Merchandise = ProductVariant

export type Metafield = Node & {
  __typename?: "Metafield"

  createdAt: Scalars["DateTime"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  key: Scalars["String"]["output"]

  namespace: Scalars["String"]["output"]

  parentResource: MetafieldParentResource

  reference?: Maybe<MetafieldReference>

  references?: Maybe<MetafieldReferenceConnection>

  type: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]

  value: Scalars["String"]["output"]
}

export type MetafieldReferencesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
}

export enum MetafieldDeleteErrorCode {
  InvalidOwner = "INVALID_OWNER",

  MetafieldDoesNotExist = "METAFIELD_DOES_NOT_EXIST",
}

export type MetafieldDeleteUserError = DisplayableError & {
  __typename?: "MetafieldDeleteUserError"

  code?: Maybe<MetafieldDeleteErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type MetafieldFilter = {
  key: Scalars["String"]["input"]

  namespace: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type MetafieldParentResource =
  | Article
  | Blog
  | Cart
  | Collection
  | Customer
  | Location
  | Market
  | Order
  | Page
  | Product
  | ProductVariant
  | Shop

export type MetafieldReference =
  | Collection
  | GenericFile
  | MediaImage
  | Metaobject
  | Page
  | Product
  | ProductVariant
  | Video

export type MetafieldReferenceConnection = {
  __typename?: "MetafieldReferenceConnection"

  edges: Array<MetafieldReferenceEdge>

  nodes: Array<MetafieldReference>

  pageInfo: PageInfo
}

export type MetafieldReferenceEdge = {
  __typename?: "MetafieldReferenceEdge"

  cursor: Scalars["String"]["output"]

  node: MetafieldReference
}

export type MetafieldsSetUserError = DisplayableError & {
  __typename?: "MetafieldsSetUserError"

  code?: Maybe<MetafieldsSetUserErrorCode>

  elementIndex?: Maybe<Scalars["Int"]["output"]>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldsSetUserErrorCode {
  Blank = "BLANK",

  Inclusion = "INCLUSION",

  InvalidOwner = "INVALID_OWNER",

  InvalidType = "INVALID_TYPE",

  InvalidValue = "INVALID_VALUE",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  Present = "PRESENT",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",
}

export type Metaobject = Node &
  OnlineStorePublishable & {
    __typename?: "Metaobject"

    field?: Maybe<MetaobjectField>

    fields: Array<MetaobjectField>

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    seo?: Maybe<MetaobjectSeo>

    type: Scalars["String"]["output"]

    updatedAt: Scalars["DateTime"]["output"]
  }

export type MetaobjectFieldArgs = {
  key: Scalars["String"]["input"]
}

export type MetaobjectConnection = {
  __typename?: "MetaobjectConnection"

  edges: Array<MetaobjectEdge>

  nodes: Array<Metaobject>

  pageInfo: PageInfo
}

export type MetaobjectEdge = {
  __typename?: "MetaobjectEdge"

  cursor: Scalars["String"]["output"]

  node: Metaobject
}

export type MetaobjectField = {
  __typename?: "MetaobjectField"

  key: Scalars["String"]["output"]

  reference?: Maybe<MetafieldReference>

  references?: Maybe<MetafieldReferenceConnection>

  type: Scalars["String"]["output"]

  value?: Maybe<Scalars["String"]["output"]>
}

export type MetaobjectFieldReferencesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
}

export type MetaobjectHandleInput = {
  handle: Scalars["String"]["input"]

  type: Scalars["String"]["input"]
}

export type MetaobjectSeo = {
  __typename?: "MetaobjectSEO"

  description?: Maybe<MetaobjectField>

  title?: Maybe<MetaobjectField>
}

export type Model3d = Media &
  Node & {
    __typename?: "Model3d"

    alt?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    mediaContentType: MediaContentType

    presentation?: Maybe<MediaPresentation>

    previewImage?: Maybe<Image>

    sources: Array<Model3dSource>
  }

export type Model3dSource = {
  __typename?: "Model3dSource"

  filesize: Scalars["Int"]["output"]

  format: Scalars["String"]["output"]

  mimeType: Scalars["String"]["output"]

  url: Scalars["String"]["output"]
}

export type MoneyInput = {
  amount: Scalars["Decimal"]["input"]

  currencyCode: CurrencyCode
}

export type MoneyV2 = {
  __typename?: "MoneyV2"

  amount: Scalars["Decimal"]["output"]

  currencyCode: CurrencyCode
}

export type Mutation = {
  __typename?: "Mutation"

  cartAttributesUpdate?: Maybe<CartAttributesUpdatePayload>

  cartBuyerIdentityUpdate?: Maybe<CartBuyerIdentityUpdatePayload>

  cartCreate?: Maybe<CartCreatePayload>

  cartDiscountCodesUpdate?: Maybe<CartDiscountCodesUpdatePayload>

  cartLinesAdd?: Maybe<CartLinesAddPayload>

  cartLinesRemove?: Maybe<CartLinesRemovePayload>

  cartLinesUpdate?: Maybe<CartLinesUpdatePayload>

  cartMetafieldDelete?: Maybe<CartMetafieldDeletePayload>

  cartMetafieldsSet?: Maybe<CartMetafieldsSetPayload>

  cartNoteUpdate?: Maybe<CartNoteUpdatePayload>

  cartPaymentUpdate?: Maybe<CartPaymentUpdatePayload>

  cartSelectedDeliveryOptionsUpdate?: Maybe<CartSelectedDeliveryOptionsUpdatePayload>

  cartSubmitForCompletion?: Maybe<CartSubmitForCompletionPayload>

  checkoutAttributesUpdateV2?: Maybe<CheckoutAttributesUpdateV2Payload>

  checkoutCompleteFree?: Maybe<CheckoutCompleteFreePayload>

  checkoutCompleteWithCreditCardV2?: Maybe<CheckoutCompleteWithCreditCardV2Payload>

  checkoutCompleteWithTokenizedPaymentV3?: Maybe<CheckoutCompleteWithTokenizedPaymentV3Payload>

  checkoutCreate?: Maybe<CheckoutCreatePayload>

  checkoutCustomerAssociateV2?: Maybe<CheckoutCustomerAssociateV2Payload>

  checkoutCustomerDisassociateV2?: Maybe<CheckoutCustomerDisassociateV2Payload>

  checkoutDiscountCodeApplyV2?: Maybe<CheckoutDiscountCodeApplyV2Payload>

  checkoutDiscountCodeRemove?: Maybe<CheckoutDiscountCodeRemovePayload>

  checkoutEmailUpdateV2?: Maybe<CheckoutEmailUpdateV2Payload>

  checkoutGiftCardRemoveV2?: Maybe<CheckoutGiftCardRemoveV2Payload>

  checkoutGiftCardsAppend?: Maybe<CheckoutGiftCardsAppendPayload>

  checkoutLineItemsAdd?: Maybe<CheckoutLineItemsAddPayload>

  checkoutLineItemsRemove?: Maybe<CheckoutLineItemsRemovePayload>

  checkoutLineItemsReplace?: Maybe<CheckoutLineItemsReplacePayload>

  checkoutLineItemsUpdate?: Maybe<CheckoutLineItemsUpdatePayload>

  checkoutShippingAddressUpdateV2?: Maybe<CheckoutShippingAddressUpdateV2Payload>

  checkoutShippingLineUpdate?: Maybe<CheckoutShippingLineUpdatePayload>

  customerAccessTokenCreate?: Maybe<CustomerAccessTokenCreatePayload>

  customerAccessTokenCreateWithMultipass?: Maybe<CustomerAccessTokenCreateWithMultipassPayload>

  customerAccessTokenDelete?: Maybe<CustomerAccessTokenDeletePayload>

  customerAccessTokenRenew?: Maybe<CustomerAccessTokenRenewPayload>

  customerActivate?: Maybe<CustomerActivatePayload>

  customerActivateByUrl?: Maybe<CustomerActivateByUrlPayload>

  customerAddressCreate?: Maybe<CustomerAddressCreatePayload>

  customerAddressDelete?: Maybe<CustomerAddressDeletePayload>

  customerAddressUpdate?: Maybe<CustomerAddressUpdatePayload>

  customerCreate?: Maybe<CustomerCreatePayload>

  customerDefaultAddressUpdate?: Maybe<CustomerDefaultAddressUpdatePayload>

  customerRecover?: Maybe<CustomerRecoverPayload>

  customerReset?: Maybe<CustomerResetPayload>

  customerResetByUrl?: Maybe<CustomerResetByUrlPayload>

  customerUpdate?: Maybe<CustomerUpdatePayload>
}

export type MutationCartAttributesUpdateArgs = {
  attributes: Array<AttributeInput>
  cartId: Scalars["ID"]["input"]
}

export type MutationCartBuyerIdentityUpdateArgs = {
  buyerIdentity: CartBuyerIdentityInput
  cartId: Scalars["ID"]["input"]
}

export type MutationCartCreateArgs = {
  input?: InputMaybe<CartInput>
}

export type MutationCartDiscountCodesUpdateArgs = {
  cartId: Scalars["ID"]["input"]
  discountCodes?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type MutationCartLinesAddArgs = {
  cartId: Scalars["ID"]["input"]
  lines: Array<CartLineInput>
}

export type MutationCartLinesRemoveArgs = {
  cartId: Scalars["ID"]["input"]
  lineIds: Array<Scalars["ID"]["input"]>
}

export type MutationCartLinesUpdateArgs = {
  cartId: Scalars["ID"]["input"]
  lines: Array<CartLineUpdateInput>
}

export type MutationCartMetafieldDeleteArgs = {
  input: CartMetafieldDeleteInput
}

export type MutationCartMetafieldsSetArgs = {
  metafields: Array<CartMetafieldsSetInput>
}

export type MutationCartNoteUpdateArgs = {
  cartId: Scalars["ID"]["input"]
  note?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationCartPaymentUpdateArgs = {
  cartId: Scalars["ID"]["input"]
  payment: CartPaymentInput
}

export type MutationCartSelectedDeliveryOptionsUpdateArgs = {
  cartId: Scalars["ID"]["input"]
  selectedDeliveryOptions: Array<CartSelectedDeliveryOptionInput>
}

export type MutationCartSubmitForCompletionArgs = {
  attemptToken: Scalars["String"]["input"]
  cartId: Scalars["ID"]["input"]
}

export type MutationCheckoutAttributesUpdateV2Args = {
  checkoutId: Scalars["ID"]["input"]
  input: CheckoutAttributesUpdateV2Input
}

export type MutationCheckoutCompleteFreeArgs = {
  checkoutId: Scalars["ID"]["input"]
}

export type MutationCheckoutCompleteWithCreditCardV2Args = {
  checkoutId: Scalars["ID"]["input"]
  payment: CreditCardPaymentInputV2
}

export type MutationCheckoutCompleteWithTokenizedPaymentV3Args = {
  checkoutId: Scalars["ID"]["input"]
  payment: TokenizedPaymentInputV3
}

export type MutationCheckoutCreateArgs = {
  input: CheckoutCreateInput
  queueToken?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationCheckoutCustomerAssociateV2Args = {
  checkoutId: Scalars["ID"]["input"]
  customerAccessToken: Scalars["String"]["input"]
}

export type MutationCheckoutCustomerDisassociateV2Args = {
  checkoutId: Scalars["ID"]["input"]
}

export type MutationCheckoutDiscountCodeApplyV2Args = {
  checkoutId: Scalars["ID"]["input"]
  discountCode: Scalars["String"]["input"]
}

export type MutationCheckoutDiscountCodeRemoveArgs = {
  checkoutId: Scalars["ID"]["input"]
}

export type MutationCheckoutEmailUpdateV2Args = {
  checkoutId: Scalars["ID"]["input"]
  email: Scalars["String"]["input"]
}

export type MutationCheckoutGiftCardRemoveV2Args = {
  appliedGiftCardId: Scalars["ID"]["input"]
  checkoutId: Scalars["ID"]["input"]
}

export type MutationCheckoutGiftCardsAppendArgs = {
  checkoutId: Scalars["ID"]["input"]
  giftCardCodes: Array<Scalars["String"]["input"]>
}

export type MutationCheckoutLineItemsAddArgs = {
  checkoutId: Scalars["ID"]["input"]
  lineItems: Array<CheckoutLineItemInput>
}

export type MutationCheckoutLineItemsRemoveArgs = {
  checkoutId: Scalars["ID"]["input"]
  lineItemIds: Array<Scalars["ID"]["input"]>
}

export type MutationCheckoutLineItemsReplaceArgs = {
  checkoutId: Scalars["ID"]["input"]
  lineItems: Array<CheckoutLineItemInput>
}

export type MutationCheckoutLineItemsUpdateArgs = {
  checkoutId: Scalars["ID"]["input"]
  lineItems: Array<CheckoutLineItemUpdateInput>
}

export type MutationCheckoutShippingAddressUpdateV2Args = {
  checkoutId: Scalars["ID"]["input"]
  shippingAddress: MailingAddressInput
}

export type MutationCheckoutShippingLineUpdateArgs = {
  checkoutId: Scalars["ID"]["input"]
  shippingRateHandle: Scalars["String"]["input"]
}

export type MutationCustomerAccessTokenCreateArgs = {
  input: CustomerAccessTokenCreateInput
}

export type MutationCustomerAccessTokenCreateWithMultipassArgs = {
  multipassToken: Scalars["String"]["input"]
}

export type MutationCustomerAccessTokenDeleteArgs = {
  customerAccessToken: Scalars["String"]["input"]
}

export type MutationCustomerAccessTokenRenewArgs = {
  customerAccessToken: Scalars["String"]["input"]
}

export type MutationCustomerActivateArgs = {
  id: Scalars["ID"]["input"]
  input: CustomerActivateInput
}

export type MutationCustomerActivateByUrlArgs = {
  activationUrl: Scalars["URL"]["input"]
  password: Scalars["String"]["input"]
}

export type MutationCustomerAddressCreateArgs = {
  address: MailingAddressInput
  customerAccessToken: Scalars["String"]["input"]
}

export type MutationCustomerAddressDeleteArgs = {
  customerAccessToken: Scalars["String"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationCustomerAddressUpdateArgs = {
  address: MailingAddressInput
  customerAccessToken: Scalars["String"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationCustomerCreateArgs = {
  input: CustomerCreateInput
}

export type MutationCustomerDefaultAddressUpdateArgs = {
  addressId: Scalars["ID"]["input"]
  customerAccessToken: Scalars["String"]["input"]
}

export type MutationCustomerRecoverArgs = {
  email: Scalars["String"]["input"]
}

export type MutationCustomerResetArgs = {
  id: Scalars["ID"]["input"]
  input: CustomerResetInput
}

export type MutationCustomerResetByUrlArgs = {
  password: Scalars["String"]["input"]
  resetUrl: Scalars["URL"]["input"]
}

export type MutationCustomerUpdateArgs = {
  customer: CustomerUpdateInput
  customerAccessToken: Scalars["String"]["input"]
}

export type Node = {
  id: Scalars["ID"]["output"]
}

export type OnlineStorePublishable = {
  onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>
}

export type Order = HasMetafields &
  Node & {
    __typename?: "Order"

    billingAddress?: Maybe<MailingAddress>

    cancelReason?: Maybe<OrderCancelReason>

    canceledAt?: Maybe<Scalars["DateTime"]["output"]>

    currencyCode: CurrencyCode

    currentSubtotalPrice: MoneyV2

    currentTotalDuties?: Maybe<MoneyV2>

    currentTotalPrice: MoneyV2

    currentTotalTax: MoneyV2

    customAttributes: Array<Attribute>

    customerLocale?: Maybe<Scalars["String"]["output"]>

    customerUrl?: Maybe<Scalars["URL"]["output"]>

    discountApplications: DiscountApplicationConnection

    edited: Scalars["Boolean"]["output"]

    email?: Maybe<Scalars["String"]["output"]>

    financialStatus?: Maybe<OrderFinancialStatus>

    fulfillmentStatus: OrderFulfillmentStatus

    id: Scalars["ID"]["output"]

    lineItems: OrderLineItemConnection

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    name: Scalars["String"]["output"]

    orderNumber: Scalars["Int"]["output"]

    originalTotalDuties?: Maybe<MoneyV2>

    originalTotalPrice: MoneyV2

    phone?: Maybe<Scalars["String"]["output"]>

    processedAt: Scalars["DateTime"]["output"]

    shippingAddress?: Maybe<MailingAddress>

    shippingDiscountAllocations: Array<DiscountAllocation>

    statusUrl: Scalars["URL"]["output"]

    subtotalPrice?: Maybe<MoneyV2>
    /**
     * Price of the order before duties, shipping and taxes.
     * @deprecated Use `subtotalPrice` instead.
     */
    subtotalPriceV2?: Maybe<MoneyV2>

    successfulFulfillments?: Maybe<Array<Fulfillment>>

    totalPrice: MoneyV2
    /**
     * The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive).
     * @deprecated Use `totalPrice` instead.
     */
    totalPriceV2: MoneyV2

    totalRefunded: MoneyV2
    /**
     * The total amount that has been refunded.
     * @deprecated Use `totalRefunded` instead.
     */
    totalRefundedV2: MoneyV2

    totalShippingPrice: MoneyV2
    /**
     * The total cost of shipping.
     * @deprecated Use `totalShippingPrice` instead.
     */
    totalShippingPriceV2: MoneyV2

    totalTax?: Maybe<MoneyV2>
    /**
     * The total cost of taxes.
     * @deprecated Use `totalTax` instead.
     */
    totalTaxV2?: Maybe<MoneyV2>
  }

export type OrderDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type OrderMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type OrderSuccessfulFulfillmentsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export enum OrderCancelReason {
  Customer = "CUSTOMER",

  Declined = "DECLINED",

  Fraud = "FRAUD",

  Inventory = "INVENTORY",

  Other = "OTHER",

  Staff = "STAFF",
}

export type OrderConnection = {
  __typename?: "OrderConnection"

  edges: Array<OrderEdge>

  nodes: Array<Order>

  pageInfo: PageInfo

  totalCount: Scalars["UnsignedInt64"]["output"]
}

export type OrderEdge = {
  __typename?: "OrderEdge"

  cursor: Scalars["String"]["output"]

  node: Order
}

export enum OrderFinancialStatus {
  Authorized = "AUTHORIZED",

  Paid = "PAID",

  PartiallyPaid = "PARTIALLY_PAID",

  PartiallyRefunded = "PARTIALLY_REFUNDED",

  Pending = "PENDING",

  Refunded = "REFUNDED",

  Voided = "VOIDED",
}

export enum OrderFulfillmentStatus {
  Fulfilled = "FULFILLED",

  InProgress = "IN_PROGRESS",

  OnHold = "ON_HOLD",

  Open = "OPEN",

  PartiallyFulfilled = "PARTIALLY_FULFILLED",

  PendingFulfillment = "PENDING_FULFILLMENT",

  Restocked = "RESTOCKED",

  Scheduled = "SCHEDULED",

  Unfulfilled = "UNFULFILLED",
}

export type OrderLineItem = {
  __typename?: "OrderLineItem"

  currentQuantity: Scalars["Int"]["output"]

  customAttributes: Array<Attribute>

  discountAllocations: Array<DiscountAllocation>

  discountedTotalPrice: MoneyV2

  originalTotalPrice: MoneyV2

  quantity: Scalars["Int"]["output"]

  title: Scalars["String"]["output"]

  variant?: Maybe<ProductVariant>
}

export type OrderLineItemConnection = {
  __typename?: "OrderLineItemConnection"

  edges: Array<OrderLineItemEdge>

  nodes: Array<OrderLineItem>

  pageInfo: PageInfo
}

export type OrderLineItemEdge = {
  __typename?: "OrderLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: OrderLineItem
}

export enum OrderSortKeys {
  Id = "ID",

  ProcessedAt = "PROCESSED_AT",

  Relevance = "RELEVANCE",

  TotalPrice = "TOTAL_PRICE",
}

export type Page = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: "Page"

    body: Scalars["HTML"]["output"]

    bodySummary: Scalars["String"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    seo?: Maybe<Seo>

    title: Scalars["String"]["output"]

    trackingParameters?: Maybe<Scalars["String"]["output"]>

    updatedAt: Scalars["DateTime"]["output"]
  }

export type PageMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type PageMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type PageConnection = {
  __typename?: "PageConnection"

  edges: Array<PageEdge>

  nodes: Array<Page>

  pageInfo: PageInfo
}

export type PageEdge = {
  __typename?: "PageEdge"

  cursor: Scalars["String"]["output"]

  node: Page
}

export type PageInfo = {
  __typename?: "PageInfo"

  endCursor?: Maybe<Scalars["String"]["output"]>

  hasNextPage: Scalars["Boolean"]["output"]

  hasPreviousPage: Scalars["Boolean"]["output"]

  startCursor?: Maybe<Scalars["String"]["output"]>
}

export enum PageSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export type Payment = Node & {
  __typename?: "Payment"

  amount: MoneyV2
  /**
   * The amount of the payment.
   * @deprecated Use `amount` instead.
   */
  amountV2: MoneyV2

  billingAddress?: Maybe<MailingAddress>

  checkout: Checkout

  creditCard?: Maybe<CreditCard>

  errorMessage?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  idempotencyKey?: Maybe<Scalars["String"]["output"]>

  nextActionUrl?: Maybe<Scalars["URL"]["output"]>

  ready: Scalars["Boolean"]["output"]

  test: Scalars["Boolean"]["output"]

  transaction?: Maybe<Transaction>
}

export type PaymentSettings = {
  __typename?: "PaymentSettings"

  acceptedCardBrands: Array<CardBrand>

  cardVaultUrl: Scalars["URL"]["output"]

  countryCode: CountryCode

  currencyCode: CurrencyCode

  enabledPresentmentCurrencies: Array<CurrencyCode>

  shopifyPaymentsAccountId?: Maybe<Scalars["String"]["output"]>

  supportedDigitalWallets: Array<DigitalWallet>
}

export enum PaymentTokenType {
  ApplePay = "APPLE_PAY",

  GooglePay = "GOOGLE_PAY",

  ShopifyPay = "SHOPIFY_PAY",

  StripeVaultToken = "STRIPE_VAULT_TOKEN",

  Vault = "VAULT",
}

export enum PredictiveSearchLimitScope {
  All = "ALL",

  Each = "EACH",
}

export type PredictiveSearchResult = {
  __typename?: "PredictiveSearchResult"

  articles: Array<Article>

  collections: Array<Collection>

  pages: Array<Page>

  products: Array<Product>

  queries: Array<SearchQuerySuggestion>
}

export enum PredictiveSearchType {
  Article = "ARTICLE",

  Collection = "COLLECTION",

  Page = "PAGE",

  Product = "PRODUCT",

  Query = "QUERY",
}

export type PriceRangeFilter = {
  max?: InputMaybe<Scalars["Float"]["input"]>

  min?: InputMaybe<Scalars["Float"]["input"]>
}

export type PricingPercentageValue = {
  __typename?: "PricingPercentageValue"

  percentage: Scalars["Float"]["output"]
}

export type PricingValue = MoneyV2 | PricingPercentageValue

export type Product = HasMetafields &
  Node &
  OnlineStorePublishable &
  Trackable & {
    __typename?: "Product"

    availableForSale: Scalars["Boolean"]["output"]

    collections: CollectionConnection

    compareAtPriceRange: ProductPriceRange

    createdAt: Scalars["DateTime"]["output"]

    description: Scalars["String"]["output"]

    descriptionHtml: Scalars["HTML"]["output"]

    featuredImage?: Maybe<Image>

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    images: ImageConnection

    isGiftCard: Scalars["Boolean"]["output"]

    media: MediaConnection

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    options: Array<ProductOption>

    priceRange: ProductPriceRange

    productType: Scalars["String"]["output"]

    publishedAt: Scalars["DateTime"]["output"]

    requiresSellingPlan: Scalars["Boolean"]["output"]

    sellingPlanGroups: SellingPlanGroupConnection

    seo: Seo

    tags: Array<Scalars["String"]["output"]>

    title: Scalars["String"]["output"]

    totalInventory?: Maybe<Scalars["Int"]["output"]>

    trackingParameters?: Maybe<Scalars["String"]["output"]>

    updatedAt: Scalars["DateTime"]["output"]

    variantBySelectedOptions?: Maybe<ProductVariant>

    variants: ProductVariantConnection

    vendor: Scalars["String"]["output"]
  }

export type ProductCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars["Int"]["input"]>
}

export type ProductImagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductImageSortKeys>
}

export type ProductMediaArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductMediaSortKeys>
}

export type ProductMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ProductMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type ProductOptionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type ProductSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantBySelectedOptionsArgs = {
  selectedOptions: Array<SelectedOptionInput>
}

export type ProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductVariantSortKeys>
}

export enum ProductCollectionSortKeys {
  BestSelling = "BEST_SELLING",

  CollectionDefault = "COLLECTION_DEFAULT",

  Created = "CREATED",

  Id = "ID",

  Manual = "MANUAL",

  Price = "PRICE",

  Relevance = "RELEVANCE",

  Title = "TITLE",
}

export type ProductConnection = {
  __typename?: "ProductConnection"

  edges: Array<ProductEdge>

  filters: Array<Filter>

  nodes: Array<Product>

  pageInfo: PageInfo
}

export type ProductEdge = {
  __typename?: "ProductEdge"

  cursor: Scalars["String"]["output"]

  node: Product
}

export type ProductFilter = {
  available?: InputMaybe<Scalars["Boolean"]["input"]>

  price?: InputMaybe<PriceRangeFilter>

  productMetafield?: InputMaybe<MetafieldFilter>

  productType?: InputMaybe<Scalars["String"]["input"]>

  productVendor?: InputMaybe<Scalars["String"]["input"]>

  tag?: InputMaybe<Scalars["String"]["input"]>

  variantMetafield?: InputMaybe<MetafieldFilter>

  variantOption?: InputMaybe<VariantOptionFilter>
}

export enum ProductImageSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Position = "POSITION",

  Relevance = "RELEVANCE",
}

export enum ProductMediaSortKeys {
  Id = "ID",

  Position = "POSITION",

  Relevance = "RELEVANCE",
}

export type ProductOption = Node & {
  __typename?: "ProductOption"

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  values: Array<Scalars["String"]["output"]>
}

export type ProductPriceRange = {
  __typename?: "ProductPriceRange"

  maxVariantPrice: MoneyV2

  minVariantPrice: MoneyV2
}

export enum ProductRecommendationIntent {
  Complementary = "COMPLEMENTARY",

  Related = "RELATED",
}

export enum ProductSortKeys {
  BestSelling = "BEST_SELLING",

  CreatedAt = "CREATED_AT",

  Id = "ID",

  Price = "PRICE",

  ProductType = "PRODUCT_TYPE",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",

  Vendor = "VENDOR",
}

export type ProductVariant = HasMetafields &
  Node & {
    __typename?: "ProductVariant"

    availableForSale: Scalars["Boolean"]["output"]

    barcode?: Maybe<Scalars["String"]["output"]>

    compareAtPrice?: Maybe<MoneyV2>
    /**
     * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`.
     * @deprecated Use `compareAtPrice` instead.
     */
    compareAtPriceV2?: Maybe<MoneyV2>

    currentlyNotInStock: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    price: MoneyV2
    /**
     * The product variant’s price.
     * @deprecated Use `price` instead.
     */
    priceV2: MoneyV2

    product: Product

    quantityAvailable?: Maybe<Scalars["Int"]["output"]>

    requiresShipping: Scalars["Boolean"]["output"]

    selectedOptions: Array<SelectedOption>

    sellingPlanAllocations: SellingPlanAllocationConnection

    sku?: Maybe<Scalars["String"]["output"]>

    storeAvailability: StoreAvailabilityConnection

    title: Scalars["String"]["output"]

    unitPrice?: Maybe<MoneyV2>

    unitPriceMeasurement?: Maybe<UnitPriceMeasurement>

    weight?: Maybe<Scalars["Float"]["output"]>

    weightUnit: WeightUnit
  }

export type ProductVariantMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ProductVariantMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type ProductVariantSellingPlanAllocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantStoreAvailabilityArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  near?: InputMaybe<GeoCoordinateInput>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantConnection = {
  __typename?: "ProductVariantConnection"

  edges: Array<ProductVariantEdge>

  nodes: Array<ProductVariant>

  pageInfo: PageInfo
}

export type ProductVariantEdge = {
  __typename?: "ProductVariantEdge"

  cursor: Scalars["String"]["output"]

  node: ProductVariant
}

export enum ProductVariantSortKeys {
  Id = "ID",

  Position = "POSITION",

  Relevance = "RELEVANCE",

  Sku = "SKU",

  Title = "TITLE",
}

export type QueryRoot = {
  __typename?: "QueryRoot"

  article?: Maybe<Article>

  articles: ArticleConnection

  blog?: Maybe<Blog>
  /**
   * Find a blog by its handle.
   * @deprecated Use `blog` instead.
   */
  blogByHandle?: Maybe<Blog>

  blogs: BlogConnection

  cart?: Maybe<Cart>

  cartCompletionAttempt?: Maybe<CartCompletionAttemptResult>

  collection?: Maybe<Collection>
  /**
   * Find a collection by its handle.
   * @deprecated Use `collection` instead.
   */
  collectionByHandle?: Maybe<Collection>

  collections: CollectionConnection

  customer?: Maybe<Customer>

  localization: Localization

  locations: LocationConnection

  menu?: Maybe<Menu>

  metaobject?: Maybe<Metaobject>

  metaobjects: MetaobjectConnection

  node?: Maybe<Node>

  nodes: Array<Maybe<Node>>

  page?: Maybe<Page>
  /**
   * Find a page by its handle.
   * @deprecated Use `page` instead.
   */
  pageByHandle?: Maybe<Page>

  pages: PageConnection

  predictiveSearch?: Maybe<PredictiveSearchResult>

  product?: Maybe<Product>
  /**
   * Find a product by its handle.
   * @deprecated Use `product` instead.
   */
  productByHandle?: Maybe<Product>

  productRecommendations?: Maybe<Array<Product>>

  productTags: StringConnection

  productTypes: StringConnection

  products: ProductConnection

  publicApiVersions: Array<ApiVersion>

  search: SearchResultItemConnection

  shop: Shop

  urlRedirects: UrlRedirectConnection
}

export type QueryRootArticleArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootArticlesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ArticleSortKeys>
}

export type QueryRootBlogArgs = {
  handle?: InputMaybe<Scalars["String"]["input"]>
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootBlogByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootBlogsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<BlogSortKeys>
}

export type QueryRootCartArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCartCompletionAttemptArgs = {
  attemptId: Scalars["String"]["input"]
}

export type QueryRootCollectionArgs = {
  handle?: InputMaybe<Scalars["String"]["input"]>
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootCollectionByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CollectionSortKeys>
}

export type QueryRootCustomerArgs = {
  customerAccessToken: Scalars["String"]["input"]
}

export type QueryRootLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  near?: InputMaybe<GeoCoordinateInput>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<LocationSortKeys>
}

export type QueryRootMenuArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootMetaobjectArgs = {
  handle?: InputMaybe<MetaobjectHandleInput>
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootMetaobjectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<Scalars["String"]["input"]>
  type: Scalars["String"]["input"]
}

export type QueryRootNodeArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootNodesArgs = {
  ids: Array<Scalars["ID"]["input"]>
}

export type QueryRootPageArgs = {
  handle?: InputMaybe<Scalars["String"]["input"]>
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootPageByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootPagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<PageSortKeys>
}

export type QueryRootPredictiveSearchArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>
  limitScope?: InputMaybe<PredictiveSearchLimitScope>
  query: Scalars["String"]["input"]
  searchableFields?: InputMaybe<Array<SearchableField>>
  types?: InputMaybe<Array<PredictiveSearchType>>
  unavailableProducts?: InputMaybe<SearchUnavailableProductsType>
}

export type QueryRootProductArgs = {
  handle?: InputMaybe<Scalars["String"]["input"]>
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootProductByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootProductRecommendationsArgs = {
  intent?: InputMaybe<ProductRecommendationIntent>
  productId: Scalars["ID"]["input"]
}

export type QueryRootProductTagsArgs = {
  first: Scalars["Int"]["input"]
}

export type QueryRootProductTypesArgs = {
  first: Scalars["Int"]["input"]
}

export type QueryRootProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductSortKeys>
}

export type QueryRootSearchArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  prefix?: InputMaybe<SearchPrefixQueryType>
  productFilters?: InputMaybe<Array<ProductFilter>>
  query: Scalars["String"]["input"]
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SearchSortKeys>
  types?: InputMaybe<Array<SearchType>>
  unavailableProducts?: InputMaybe<SearchUnavailableProductsType>
}

export type QueryRootUrlRedirectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type Seo = {
  __typename?: "SEO"

  description?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>
}

export type ScriptDiscountApplication = DiscountApplication & {
  __typename?: "ScriptDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]

  value: PricingValue
}

export enum SearchPrefixQueryType {
  Last = "LAST",

  None = "NONE",
}

export type SearchQuerySuggestion = Trackable & {
  __typename?: "SearchQuerySuggestion"

  styledText: Scalars["String"]["output"]

  text: Scalars["String"]["output"]

  trackingParameters?: Maybe<Scalars["String"]["output"]>
}

export type SearchResultItem = Article | Page | Product

export type SearchResultItemConnection = {
  __typename?: "SearchResultItemConnection"

  edges: Array<SearchResultItemEdge>

  nodes: Array<SearchResultItem>

  pageInfo: PageInfo

  productFilters: Array<Filter>

  totalCount: Scalars["Int"]["output"]
}

export type SearchResultItemEdge = {
  __typename?: "SearchResultItemEdge"

  cursor: Scalars["String"]["output"]

  node: SearchResultItem
}

export enum SearchSortKeys {
  Price = "PRICE",

  Relevance = "RELEVANCE",
}

export enum SearchType {
  Article = "ARTICLE",

  Page = "PAGE",

  Product = "PRODUCT",
}

export enum SearchUnavailableProductsType {
  Hide = "HIDE",

  Last = "LAST",

  Show = "SHOW",
}

export enum SearchableField {
  Author = "AUTHOR",

  Body = "BODY",

  ProductType = "PRODUCT_TYPE",

  Tag = "TAG",

  Title = "TITLE",

  VariantsBarcode = "VARIANTS_BARCODE",

  VariantsSku = "VARIANTS_SKU",

  VariantsTitle = "VARIANTS_TITLE",

  Vendor = "VENDOR",
}

export type SelectedOption = {
  __typename?: "SelectedOption"

  name: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type SelectedOptionInput = {
  name: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type SellingPlan = {
  __typename?: "SellingPlan"

  checkoutCharge: SellingPlanCheckoutCharge

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  options: Array<SellingPlanOption>

  priceAdjustments: Array<SellingPlanPriceAdjustment>

  recurringDeliveries: Scalars["Boolean"]["output"]
}

export type SellingPlanAllocation = {
  __typename?: "SellingPlanAllocation"

  checkoutChargeAmount: MoneyV2

  priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>

  remainingBalanceChargeAmount: MoneyV2

  sellingPlan: SellingPlan
}

export type SellingPlanAllocationConnection = {
  __typename?: "SellingPlanAllocationConnection"

  edges: Array<SellingPlanAllocationEdge>

  nodes: Array<SellingPlanAllocation>

  pageInfo: PageInfo
}

export type SellingPlanAllocationEdge = {
  __typename?: "SellingPlanAllocationEdge"

  cursor: Scalars["String"]["output"]

  node: SellingPlanAllocation
}

export type SellingPlanAllocationPriceAdjustment = {
  __typename?: "SellingPlanAllocationPriceAdjustment"

  compareAtPrice: MoneyV2

  perDeliveryPrice: MoneyV2

  price: MoneyV2

  unitPrice?: Maybe<MoneyV2>
}

export type SellingPlanCheckoutCharge = {
  __typename?: "SellingPlanCheckoutCharge"

  type: SellingPlanCheckoutChargeType

  value: SellingPlanCheckoutChargeValue
}

export type SellingPlanCheckoutChargePercentageValue = {
  __typename?: "SellingPlanCheckoutChargePercentageValue"

  percentage: Scalars["Float"]["output"]
}

export enum SellingPlanCheckoutChargeType {
  Percentage = "PERCENTAGE",

  Price = "PRICE",
}

export type SellingPlanCheckoutChargeValue = MoneyV2 | SellingPlanCheckoutChargePercentageValue

export type SellingPlanConnection = {
  __typename?: "SellingPlanConnection"

  edges: Array<SellingPlanEdge>

  nodes: Array<SellingPlan>

  pageInfo: PageInfo
}

export type SellingPlanEdge = {
  __typename?: "SellingPlanEdge"

  cursor: Scalars["String"]["output"]

  node: SellingPlan
}

export type SellingPlanFixedAmountPriceAdjustment = {
  __typename?: "SellingPlanFixedAmountPriceAdjustment"

  adjustmentAmount: MoneyV2
}

export type SellingPlanFixedPriceAdjustment = {
  __typename?: "SellingPlanFixedPriceAdjustment"

  price: MoneyV2
}

export type SellingPlanGroup = {
  __typename?: "SellingPlanGroup"

  appName?: Maybe<Scalars["String"]["output"]>

  name: Scalars["String"]["output"]

  options: Array<SellingPlanGroupOption>

  sellingPlans: SellingPlanConnection
}

export type SellingPlanGroupSellingPlansArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SellingPlanGroupConnection = {
  __typename?: "SellingPlanGroupConnection"

  edges: Array<SellingPlanGroupEdge>

  nodes: Array<SellingPlanGroup>

  pageInfo: PageInfo
}

export type SellingPlanGroupEdge = {
  __typename?: "SellingPlanGroupEdge"

  cursor: Scalars["String"]["output"]

  node: SellingPlanGroup
}

export type SellingPlanGroupOption = {
  __typename?: "SellingPlanGroupOption"

  name: Scalars["String"]["output"]

  values: Array<Scalars["String"]["output"]>
}

export type SellingPlanOption = {
  __typename?: "SellingPlanOption"

  name?: Maybe<Scalars["String"]["output"]>

  value?: Maybe<Scalars["String"]["output"]>
}

export type SellingPlanPercentagePriceAdjustment = {
  __typename?: "SellingPlanPercentagePriceAdjustment"

  adjustmentPercentage: Scalars["Int"]["output"]
}

export type SellingPlanPriceAdjustment = {
  __typename?: "SellingPlanPriceAdjustment"

  adjustmentValue: SellingPlanPriceAdjustmentValue

  orderCount?: Maybe<Scalars["Int"]["output"]>
}

export type SellingPlanPriceAdjustmentValue =
  | SellingPlanFixedAmountPriceAdjustment
  | SellingPlanFixedPriceAdjustment
  | SellingPlanPercentagePriceAdjustment

export type ShippingRate = {
  __typename?: "ShippingRate"

  handle: Scalars["String"]["output"]

  price: MoneyV2
  /**
   * Price of this shipping rate.
   * @deprecated Use `price` instead.
   */
  priceV2: MoneyV2

  title: Scalars["String"]["output"]
}

export type Shop = HasMetafields &
  Node & {
    __typename?: "Shop"

    brand?: Maybe<Brand>

    description?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: Array<Maybe<Metafield>>

    moneyFormat: Scalars["String"]["output"]

    name: Scalars["String"]["output"]

    paymentSettings: PaymentSettings

    primaryDomain: Domain

    privacyPolicy?: Maybe<ShopPolicy>

    refundPolicy?: Maybe<ShopPolicy>

    shippingPolicy?: Maybe<ShopPolicy>

    shipsToCountries: Array<CountryCode>

    subscriptionPolicy?: Maybe<ShopPolicyWithDefault>

    termsOfService?: Maybe<ShopPolicy>
  }

export type ShopMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ShopMetafieldsArgs = {
  identifiers: Array<HasMetafieldsIdentifier>
}

export type ShopPayWalletContentInput = {
  billingAddress: MailingAddressInput

  sessionToken: Scalars["String"]["input"]
}

export type ShopPolicy = Node & {
  __typename?: "ShopPolicy"

  body: Scalars["String"]["output"]

  handle: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export type ShopPolicyWithDefault = {
  __typename?: "ShopPolicyWithDefault"

  body: Scalars["String"]["output"]

  handle: Scalars["String"]["output"]

  id?: Maybe<Scalars["ID"]["output"]>

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export type StoreAvailability = {
  __typename?: "StoreAvailability"

  available: Scalars["Boolean"]["output"]

  location: Location

  pickUpTime: Scalars["String"]["output"]

  quantityAvailable: Scalars["Int"]["output"]
}

export type StoreAvailabilityConnection = {
  __typename?: "StoreAvailabilityConnection"

  edges: Array<StoreAvailabilityEdge>

  nodes: Array<StoreAvailability>

  pageInfo: PageInfo
}

export type StoreAvailabilityEdge = {
  __typename?: "StoreAvailabilityEdge"

  cursor: Scalars["String"]["output"]

  node: StoreAvailability
}

export type StringConnection = {
  __typename?: "StringConnection"

  edges: Array<StringEdge>

  pageInfo: PageInfo
}

export type StringEdge = {
  __typename?: "StringEdge"

  cursor: Scalars["String"]["output"]

  node: Scalars["String"]["output"]
}

export type SubmissionError = {
  __typename?: "SubmissionError"

  code: SubmissionErrorCode

  message?: Maybe<Scalars["String"]["output"]>
}

export enum SubmissionErrorCode {
  BuyerIdentityEmailIsInvalid = "BUYER_IDENTITY_EMAIL_IS_INVALID",
  BuyerIdentityEmailRequired = "BUYER_IDENTITY_EMAIL_REQUIRED",
  BuyerIdentityPhoneIsInvalid = "BUYER_IDENTITY_PHONE_IS_INVALID",
  DeliveryAddress1Invalid = "DELIVERY_ADDRESS1_INVALID",
  DeliveryAddress1Required = "DELIVERY_ADDRESS1_REQUIRED",
  DeliveryAddress1TooLong = "DELIVERY_ADDRESS1_TOO_LONG",
  DeliveryAddress2Invalid = "DELIVERY_ADDRESS2_INVALID",
  DeliveryAddress2Required = "DELIVERY_ADDRESS2_REQUIRED",
  DeliveryAddress2TooLong = "DELIVERY_ADDRESS2_TOO_LONG",
  DeliveryAddressRequired = "DELIVERY_ADDRESS_REQUIRED",
  DeliveryCityInvalid = "DELIVERY_CITY_INVALID",
  DeliveryCityRequired = "DELIVERY_CITY_REQUIRED",
  DeliveryCityTooLong = "DELIVERY_CITY_TOO_LONG",
  DeliveryCompanyInvalid = "DELIVERY_COMPANY_INVALID",
  DeliveryCompanyRequired = "DELIVERY_COMPANY_REQUIRED",
  DeliveryCompanyTooLong = "DELIVERY_COMPANY_TOO_LONG",
  DeliveryCountryRequired = "DELIVERY_COUNTRY_REQUIRED",
  DeliveryFirstNameInvalid = "DELIVERY_FIRST_NAME_INVALID",
  DeliveryFirstNameRequired = "DELIVERY_FIRST_NAME_REQUIRED",
  DeliveryFirstNameTooLong = "DELIVERY_FIRST_NAME_TOO_LONG",
  DeliveryInvalidPostalCodeForCountry = "DELIVERY_INVALID_POSTAL_CODE_FOR_COUNTRY",
  DeliveryInvalidPostalCodeForZone = "DELIVERY_INVALID_POSTAL_CODE_FOR_ZONE",
  DeliveryLastNameInvalid = "DELIVERY_LAST_NAME_INVALID",
  DeliveryLastNameRequired = "DELIVERY_LAST_NAME_REQUIRED",
  DeliveryLastNameTooLong = "DELIVERY_LAST_NAME_TOO_LONG",
  DeliveryNoDeliveryAvailable = "DELIVERY_NO_DELIVERY_AVAILABLE",
  DeliveryNoDeliveryAvailableForMerchandiseLine = "DELIVERY_NO_DELIVERY_AVAILABLE_FOR_MERCHANDISE_LINE",
  DeliveryOptionsPhoneNumberInvalid = "DELIVERY_OPTIONS_PHONE_NUMBER_INVALID",
  DeliveryOptionsPhoneNumberRequired = "DELIVERY_OPTIONS_PHONE_NUMBER_REQUIRED",
  DeliveryPhoneNumberInvalid = "DELIVERY_PHONE_NUMBER_INVALID",
  DeliveryPhoneNumberRequired = "DELIVERY_PHONE_NUMBER_REQUIRED",
  DeliveryPostalCodeInvalid = "DELIVERY_POSTAL_CODE_INVALID",
  DeliveryPostalCodeRequired = "DELIVERY_POSTAL_CODE_REQUIRED",
  DeliveryZoneNotFound = "DELIVERY_ZONE_NOT_FOUND",
  DeliveryZoneRequiredForCountry = "DELIVERY_ZONE_REQUIRED_FOR_COUNTRY",
  Error = "ERROR",
  MerchandiseLineLimitReached = "MERCHANDISE_LINE_LIMIT_REACHED",
  MerchandiseNotApplicable = "MERCHANDISE_NOT_APPLICABLE",
  MerchandiseNotEnoughStockAvailable = "MERCHANDISE_NOT_ENOUGH_STOCK_AVAILABLE",
  MerchandiseOutOfStock = "MERCHANDISE_OUT_OF_STOCK",
  MerchandiseProductNotPublished = "MERCHANDISE_PRODUCT_NOT_PUBLISHED",
  NoDeliveryGroupSelected = "NO_DELIVERY_GROUP_SELECTED",
  PaymentsAddress1Invalid = "PAYMENTS_ADDRESS1_INVALID",
  PaymentsAddress1Required = "PAYMENTS_ADDRESS1_REQUIRED",
  PaymentsAddress1TooLong = "PAYMENTS_ADDRESS1_TOO_LONG",
  PaymentsAddress2Invalid = "PAYMENTS_ADDRESS2_INVALID",
  PaymentsAddress2Required = "PAYMENTS_ADDRESS2_REQUIRED",
  PaymentsAddress2TooLong = "PAYMENTS_ADDRESS2_TOO_LONG",
  PaymentsBillingAddressZoneNotFound = "PAYMENTS_BILLING_ADDRESS_ZONE_NOT_FOUND",
  PaymentsBillingAddressZoneRequiredForCountry = "PAYMENTS_BILLING_ADDRESS_ZONE_REQUIRED_FOR_COUNTRY",
  PaymentsCityInvalid = "PAYMENTS_CITY_INVALID",
  PaymentsCityRequired = "PAYMENTS_CITY_REQUIRED",
  PaymentsCityTooLong = "PAYMENTS_CITY_TOO_LONG",
  PaymentsCompanyInvalid = "PAYMENTS_COMPANY_INVALID",
  PaymentsCompanyRequired = "PAYMENTS_COMPANY_REQUIRED",
  PaymentsCompanyTooLong = "PAYMENTS_COMPANY_TOO_LONG",
  PaymentsCountryRequired = "PAYMENTS_COUNTRY_REQUIRED",
  PaymentsCreditCardBaseExpired = "PAYMENTS_CREDIT_CARD_BASE_EXPIRED",
  PaymentsCreditCardBaseGatewayNotSupported = "PAYMENTS_CREDIT_CARD_BASE_GATEWAY_NOT_SUPPORTED",
  PaymentsCreditCardBaseInvalidStartDateOrIssueNumberForDebit = "PAYMENTS_CREDIT_CARD_BASE_INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT",
  PaymentsCreditCardBrandNotSupported = "PAYMENTS_CREDIT_CARD_BRAND_NOT_SUPPORTED",
  PaymentsCreditCardFirstNameBlank = "PAYMENTS_CREDIT_CARD_FIRST_NAME_BLANK",
  PaymentsCreditCardGeneric = "PAYMENTS_CREDIT_CARD_GENERIC",
  PaymentsCreditCardLastNameBlank = "PAYMENTS_CREDIT_CARD_LAST_NAME_BLANK",
  PaymentsCreditCardMonthInclusion = "PAYMENTS_CREDIT_CARD_MONTH_INCLUSION",
  PaymentsCreditCardNameInvalid = "PAYMENTS_CREDIT_CARD_NAME_INVALID",
  PaymentsCreditCardNumberInvalid = "PAYMENTS_CREDIT_CARD_NUMBER_INVALID",
  PaymentsCreditCardNumberInvalidFormat = "PAYMENTS_CREDIT_CARD_NUMBER_INVALID_FORMAT",
  PaymentsCreditCardSessionId = "PAYMENTS_CREDIT_CARD_SESSION_ID",
  PaymentsCreditCardVerificationValueBlank = "PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_BLANK",
  PaymentsCreditCardVerificationValueInvalidForCardType = "PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE",
  PaymentsCreditCardYearExpired = "PAYMENTS_CREDIT_CARD_YEAR_EXPIRED",
  PaymentsCreditCardYearInvalidExpiryYear = "PAYMENTS_CREDIT_CARD_YEAR_INVALID_EXPIRY_YEAR",
  PaymentsFirstNameInvalid = "PAYMENTS_FIRST_NAME_INVALID",
  PaymentsFirstNameRequired = "PAYMENTS_FIRST_NAME_REQUIRED",
  PaymentsFirstNameTooLong = "PAYMENTS_FIRST_NAME_TOO_LONG",
  PaymentsInvalidPostalCodeForCountry = "PAYMENTS_INVALID_POSTAL_CODE_FOR_COUNTRY",
  PaymentsInvalidPostalCodeForZone = "PAYMENTS_INVALID_POSTAL_CODE_FOR_ZONE",
  PaymentsLastNameInvalid = "PAYMENTS_LAST_NAME_INVALID",
  PaymentsLastNameRequired = "PAYMENTS_LAST_NAME_REQUIRED",
  PaymentsLastNameTooLong = "PAYMENTS_LAST_NAME_TOO_LONG",
  PaymentsMethodRequired = "PAYMENTS_METHOD_REQUIRED",
  PaymentsMethodUnavailable = "PAYMENTS_METHOD_UNAVAILABLE",
  PaymentsPhoneNumberInvalid = "PAYMENTS_PHONE_NUMBER_INVALID",
  PaymentsPhoneNumberRequired = "PAYMENTS_PHONE_NUMBER_REQUIRED",
  PaymentsPostalCodeInvalid = "PAYMENTS_POSTAL_CODE_INVALID",
  PaymentsPostalCodeRequired = "PAYMENTS_POSTAL_CODE_REQUIRED",
  PaymentsShopifyPaymentsRequired = "PAYMENTS_SHOPIFY_PAYMENTS_REQUIRED",
  PaymentsUnacceptablePaymentAmount = "PAYMENTS_UNACCEPTABLE_PAYMENT_AMOUNT",
  PaymentsWalletContentMissing = "PAYMENTS_WALLET_CONTENT_MISSING",
  TaxesDeliveryGroupIdNotFound = "TAXES_DELIVERY_GROUP_ID_NOT_FOUND",
  TaxesLineIdNotFound = "TAXES_LINE_ID_NOT_FOUND",
  TaxesMustBeDefined = "TAXES_MUST_BE_DEFINED",
}

export type SubmitAlreadyAccepted = {
  __typename?: "SubmitAlreadyAccepted"

  attemptId: Scalars["String"]["output"]
}

export type SubmitFailed = {
  __typename?: "SubmitFailed"

  checkoutUrl?: Maybe<Scalars["URL"]["output"]>

  errors: Array<SubmissionError>
}

export type SubmitSuccess = {
  __typename?: "SubmitSuccess"

  attemptId: Scalars["String"]["output"]
}

export type SubmitThrottled = {
  __typename?: "SubmitThrottled"

  pollAfter: Scalars["DateTime"]["output"]
}

export type TokenizedPaymentInputV3 = {
  billingAddress: MailingAddressInput

  idempotencyKey: Scalars["String"]["input"]

  identifier?: InputMaybe<Scalars["String"]["input"]>

  paymentAmount: MoneyInput

  paymentData: Scalars["String"]["input"]

  test?: InputMaybe<Scalars["Boolean"]["input"]>

  type: PaymentTokenType
}

export type Trackable = {
  trackingParameters?: Maybe<Scalars["String"]["output"]>
}

export type Transaction = {
  __typename?: "Transaction"

  amount: MoneyV2
  /**
   * The amount of money that the transaction was for.
   * @deprecated Use `amount` instead.
   */
  amountV2: MoneyV2

  kind: TransactionKind
  /**
   * The status of the transaction.
   * @deprecated Use `statusV2` instead.
   */
  status: TransactionStatus

  statusV2?: Maybe<TransactionStatus>

  test: Scalars["Boolean"]["output"]
}

export enum TransactionKind {
  Authorization = "AUTHORIZATION",

  Capture = "CAPTURE",

  Change = "CHANGE",

  EmvAuthorization = "EMV_AUTHORIZATION",

  Sale = "SALE",
}

export enum TransactionStatus {
  Error = "ERROR",

  Failure = "FAILURE",

  Pending = "PENDING",

  Success = "SUCCESS",
}

export type UnitPriceMeasurement = {
  __typename?: "UnitPriceMeasurement"

  measuredType?: Maybe<UnitPriceMeasurementMeasuredType>

  quantityUnit?: Maybe<UnitPriceMeasurementMeasuredUnit>

  quantityValue: Scalars["Float"]["output"]

  referenceUnit?: Maybe<UnitPriceMeasurementMeasuredUnit>

  referenceValue: Scalars["Int"]["output"]
}

export enum UnitPriceMeasurementMeasuredType {
  Area = "AREA",

  Length = "LENGTH",

  Volume = "VOLUME",

  Weight = "WEIGHT",
}

export enum UnitPriceMeasurementMeasuredUnit {
  Cl = "CL",

  Cm = "CM",

  G = "G",

  Kg = "KG",

  L = "L",

  M = "M",

  M2 = "M2",

  M3 = "M3",

  Mg = "MG",

  Ml = "ML",

  Mm = "MM",
}

export enum UnitSystem {
  ImperialSystem = "IMPERIAL_SYSTEM",

  MetricSystem = "METRIC_SYSTEM",
}

export type UrlRedirect = Node & {
  __typename?: "UrlRedirect"

  id: Scalars["ID"]["output"]

  path: Scalars["String"]["output"]

  target: Scalars["String"]["output"]
}

export type UrlRedirectConnection = {
  __typename?: "UrlRedirectConnection"

  edges: Array<UrlRedirectEdge>

  nodes: Array<UrlRedirect>

  pageInfo: PageInfo
}

export type UrlRedirectEdge = {
  __typename?: "UrlRedirectEdge"

  cursor: Scalars["String"]["output"]

  node: UrlRedirect
}

export type UserError = DisplayableError & {
  __typename?: "UserError"

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type VariantOptionFilter = {
  name: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type Video = Media &
  Node & {
    __typename?: "Video"

    alt?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    mediaContentType: MediaContentType

    presentation?: Maybe<MediaPresentation>

    previewImage?: Maybe<Image>

    sources: Array<VideoSource>
  }

export type VideoSource = {
  __typename?: "VideoSource"

  format: Scalars["String"]["output"]

  height: Scalars["Int"]["output"]

  mimeType: Scalars["String"]["output"]

  url: Scalars["String"]["output"]

  width: Scalars["Int"]["output"]
}

export enum WeightUnit {
  Grams = "GRAMS",

  Kilograms = "KILOGRAMS",

  Ounces = "OUNCES",

  Pounds = "POUNDS",
}
