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
  ARN: { input: any; output: any }
  Date: { input: any; output: any }
  DateTime: { input: any; output: any }
  Decimal: { input: any; output: any }
  FormattedString: { input: any; output: any }
  HTML: { input: any; output: any }
  JSON: { input: any; output: any }
  Money: { input: any; output: any }
  StorefrontID: { input: any; output: any }
  URL: { input: any; output: any }
  UnsignedInt64: { input: any; output: any }
  UtcOffset: { input: any; output: any }
}

export type AbandonedCheckout = Navigable &
  Node & {
    __typename?: "AbandonedCheckout"

    abandonedCheckoutUrl: Scalars["URL"]["output"]

    defaultCursor: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    lineItems: AbandonedCheckoutLineItemConnection

    lineItemsQuantity: Scalars["Int"]["output"]

    totalPriceSet: MoneyBag
  }

export type AbandonedCheckoutLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type AbandonedCheckoutLineItem = Node & {
  __typename?: "AbandonedCheckoutLineItem"

  customAttributes: Array<Attribute>

  discountedTotalPriceSet: MoneyBag

  discountedTotalPriceWithCodeDiscount: MoneyBag

  discountedUnitPriceSet: MoneyBag

  discountedUnitPriceWithCodeDiscount: MoneyBag

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  originalTotalPriceSet: MoneyBag

  originalUnitPriceSet: MoneyBag

  product?: Maybe<Product>

  quantity: Scalars["Int"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>
}

export type AbandonedCheckoutLineItemConnection = {
  __typename?: "AbandonedCheckoutLineItemConnection"

  edges: Array<AbandonedCheckoutLineItemEdge>

  nodes: Array<AbandonedCheckoutLineItem>

  pageInfo: PageInfo
}

export type AbandonedCheckoutLineItemEdge = {
  __typename?: "AbandonedCheckoutLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: AbandonedCheckoutLineItem
}

export type Abandonment = Node & {
  __typename?: "Abandonment"

  abandonedCheckoutPayload?: Maybe<AbandonedCheckout>

  abandonmentType: AbandonmentAbandonmentType

  app: App

  cartUrl?: Maybe<Scalars["URL"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  customer: Customer

  customerHasNoDraftOrderSinceAbandonment: Scalars["Boolean"]["output"]

  customerHasNoOrderSinceAbandonment: Scalars["Boolean"]["output"]

  daysSinceLastAbandonmentEmail: Scalars["Int"]["output"]

  emailSentAt?: Maybe<Scalars["DateTime"]["output"]>

  emailState?: Maybe<AbandonmentEmailState>

  hoursSinceLastAbandonedCheckout?: Maybe<Scalars["Float"]["output"]>

  id: Scalars["ID"]["output"]

  inventoryAvailable: Scalars["Boolean"]["output"]

  isFromOnlineStore: Scalars["Boolean"]["output"]

  isFromShopApp: Scalars["Boolean"]["output"]

  isFromShopPay: Scalars["Boolean"]["output"]

  isMostSignificantAbandonment: Scalars["Boolean"]["output"]

  lastBrowseAbandonmentDate: Scalars["DateTime"]["output"]

  lastCartAbandonmentDate: Scalars["DateTime"]["output"]

  lastCheckoutAbandonmentDate: Scalars["DateTime"]["output"]

  mostRecentStep: AbandonmentAbandonmentType

  productsAddedToCart: CustomerVisitProductInfoConnection

  productsViewed: CustomerVisitProductInfoConnection

  visitStartedAt?: Maybe<Scalars["DateTime"]["output"]>
}

export type AbandonmentProductsAddedToCartArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type AbandonmentProductsViewedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export enum AbandonmentAbandonmentType {
  Browse = "BROWSE",

  Cart = "CART",

  Checkout = "CHECKOUT",
}

export enum AbandonmentDeliveryState {
  NotSent = "NOT_SENT",

  Scheduled = "SCHEDULED",

  Sent = "SENT",
}

export enum AbandonmentEmailState {
  NotSent = "NOT_SENT",

  Scheduled = "SCHEDULED",

  Sent = "SENT",
}

export type AbandonmentEmailStateUpdatePayload = {
  __typename?: "AbandonmentEmailStateUpdatePayload"

  abandonment?: Maybe<Abandonment>

  userErrors: Array<AbandonmentEmailStateUpdateUserError>
}

export type AbandonmentEmailStateUpdateUserError = DisplayableError & {
  __typename?: "AbandonmentEmailStateUpdateUserError"

  code?: Maybe<AbandonmentEmailStateUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum AbandonmentEmailStateUpdateUserErrorCode {
  AbandonmentNotFound = "ABANDONMENT_NOT_FOUND",
}

export type AbandonmentUpdateActivitiesDeliveryStatusesPayload = {
  __typename?: "AbandonmentUpdateActivitiesDeliveryStatusesPayload"

  abandonment?: Maybe<Abandonment>

  userErrors: Array<AbandonmentUpdateActivitiesDeliveryStatusesUserError>
}

export type AbandonmentUpdateActivitiesDeliveryStatusesUserError = DisplayableError & {
  __typename?: "AbandonmentUpdateActivitiesDeliveryStatusesUserError"

  code?: Maybe<AbandonmentUpdateActivitiesDeliveryStatusesUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum AbandonmentUpdateActivitiesDeliveryStatusesUserErrorCode {
  AbandonmentNotFound = "ABANDONMENT_NOT_FOUND",

  DeliveryStatusInfoNotFound = "DELIVERY_STATUS_INFO_NOT_FOUND",

  MarketingActivityNotFound = "MARKETING_ACTIVITY_NOT_FOUND",
}

export type AccessScope = {
  __typename?: "AccessScope"

  description: Scalars["String"]["output"]

  handle: Scalars["String"]["output"]
}

export type AddAllProductsOperation = Node &
  ResourceOperation & {
    __typename?: "AddAllProductsOperation"

    id: Scalars["ID"]["output"]

    processedRowCount?: Maybe<Scalars["Int"]["output"]>

    rowCount?: Maybe<RowCount>

    status: ResourceOperationStatus
  }

export type AdditionalFee = Node & {
  __typename?: "AdditionalFee"

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  price: MoneyBag

  taxLines: Array<TaxLine>
}

export type AdditionalFeeSale = Sale & {
  __typename?: "AdditionalFeeSale"

  actionType: SaleActionType

  additionalFee: SaleAdditionalFee

  id: Scalars["ID"]["output"]

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export type AdjustmentSale = Sale & {
  __typename?: "AdjustmentSale"

  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export type AllDiscountItems = {
  __typename?: "AllDiscountItems"

  allItems: Scalars["Boolean"]["output"]
}

export type ApiVersion = {
  __typename?: "ApiVersion"

  displayName: Scalars["String"]["output"]

  handle: Scalars["String"]["output"]

  supported: Scalars["Boolean"]["output"]
}

export type App = Node & {
  __typename?: "App"

  apiKey: Scalars["String"]["output"]

  appStoreAppUrl?: Maybe<Scalars["URL"]["output"]>

  appStoreDeveloperUrl?: Maybe<Scalars["URL"]["output"]>

  availableAccessScopes: Array<AccessScope>

  banner: Image

  description?: Maybe<Scalars["String"]["output"]>

  developerName?: Maybe<Scalars["String"]["output"]>

  developerType: AppDeveloperType
  /**
   * Website of the developer who created the app.
   * @deprecated Use `appStoreDeveloperUrl` instead.
   */
  developerUrl: Scalars["URL"]["output"]

  embedded: Scalars["Boolean"]["output"]

  failedRequirements: Array<FailedRequirement>

  features: Array<Scalars["String"]["output"]>

  feedback?: Maybe<AppFeedback>

  handle?: Maybe<Scalars["String"]["output"]>

  icon: Image

  id: Scalars["ID"]["output"]

  installUrl?: Maybe<Scalars["URL"]["output"]>

  installation?: Maybe<AppInstallation>

  isPostPurchaseAppInUse: Scalars["Boolean"]["output"]
  /**
   * Webpage that the app starts in.
   * @deprecated Use AppInstallation.launchUrl instead
   */
  launchUrl: Scalars["URL"]["output"]
  /**
   * Menu items for the app, which also appear as submenu items in left navigation sidebar in the Shopify admin.
   *
   * @deprecated Use AppInstallation.navigationItems instead
   */
  navigationItems: Array<NavigationItem>

  previouslyInstalled: Scalars["Boolean"]["output"]

  pricingDetails?: Maybe<Scalars["String"]["output"]>

  pricingDetailsSummary: Scalars["String"]["output"]

  privacyPolicyUrl?: Maybe<Scalars["URL"]["output"]>

  publicCategory: AppPublicCategory

  published: Scalars["Boolean"]["output"]

  requestedAccessScopes: Array<AccessScope>

  screenshots: Array<Image>

  shopifyDeveloped: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]

  uninstallMessage: Scalars["String"]["output"]
  /**
   * Webpage where you can uninstall the app.
   * @deprecated Use AppInstallation.uninstallUrl instead
   */
  uninstallUrl?: Maybe<Scalars["URL"]["output"]>

  webhookApiVersion: Scalars["String"]["output"]
}

export type AppCatalog = Catalog &
  Node & {
    __typename?: "AppCatalog"

    apps: AppConnection

    id: Scalars["ID"]["output"]

    operations: Array<ResourceOperation>

    priceList?: Maybe<PriceList>

    publication?: Maybe<Publication>

    status: CatalogStatus

    title: Scalars["String"]["output"]
  }

export type AppCatalogAppsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type AppConnection = {
  __typename?: "AppConnection"

  edges: Array<AppEdge>

  nodes: Array<App>

  pageInfo: PageInfo
}

export type AppCredit = Node & {
  __typename?: "AppCredit"

  amount: MoneyV2

  createdAt: Scalars["DateTime"]["output"]

  description: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  test: Scalars["Boolean"]["output"]
}

export type AppCreditConnection = {
  __typename?: "AppCreditConnection"

  edges: Array<AppCreditEdge>

  nodes: Array<AppCredit>

  pageInfo: PageInfo
}

export type AppCreditEdge = {
  __typename?: "AppCreditEdge"

  cursor: Scalars["String"]["output"]

  node: AppCredit
}

export enum AppDeveloperType {
  Merchant = "MERCHANT",

  Partner = "PARTNER",

  Shopify = "SHOPIFY",

  Unknown = "UNKNOWN",
}

export type AppDiscountType = {
  __typename?: "AppDiscountType"

  app: App

  appBridge: FunctionsAppBridge

  appKey: Scalars["String"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  discountClass: DiscountClass

  functionId: Scalars["String"]["output"]

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]
}

export type AppEdge = {
  __typename?: "AppEdge"

  cursor: Scalars["String"]["output"]

  node: App
}

export type AppFeedback = {
  __typename?: "AppFeedback"

  app: App

  link?: Maybe<Link>

  messages: Array<UserError>
}

export type AppInstallation = HasMetafields &
  Node & {
    __typename?: "AppInstallation"

    accessScopes: Array<AccessScope>

    activeSubscriptions: Array<AppSubscription>

    allSubscriptions: AppSubscriptionConnection

    app: App
    /**
     * Channel associated with the installed application.
     * @deprecated Use `publication` instead.
     */
    channel?: Maybe<Channel>

    credits: AppCreditConnection

    id: Scalars["ID"]["output"]

    launchUrl: Scalars["URL"]["output"]

    metafield?: Maybe<Metafield>

    metafields: MetafieldConnection

    oneTimePurchases: AppPurchaseOneTimeConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    publication?: Maybe<Publication>

    revenueAttributionRecords: AppRevenueAttributionRecordConnection
    /**
     * Subscriptions charge to a shop on a recurring basis.
     * @deprecated Use `activeSubscriptions` instead.
     */
    subscriptions: Array<AppSubscription>

    uninstallUrl?: Maybe<Scalars["URL"]["output"]>
  }

export type AppInstallationAllSubscriptionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<AppSubscriptionSortKeys>
}

export type AppInstallationCreditsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<AppTransactionSortKeys>
}

export type AppInstallationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type AppInstallationMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type AppInstallationOneTimePurchasesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<AppTransactionSortKeys>
}

export type AppInstallationPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type AppInstallationPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type AppInstallationRevenueAttributionRecordsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<AppRevenueAttributionRecordSortKeys>
}

export enum AppInstallationCategory {
  Channel = "CHANNEL",

  PosEmbedded = "POS_EMBEDDED",
}

export type AppInstallationConnection = {
  __typename?: "AppInstallationConnection"

  edges: Array<AppInstallationEdge>

  nodes: Array<AppInstallation>

  pageInfo: PageInfo
}

export type AppInstallationEdge = {
  __typename?: "AppInstallationEdge"

  cursor: Scalars["String"]["output"]

  node: AppInstallation
}

export enum AppInstallationPrivacy {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export enum AppInstallationSortKeys {
  AppTitle = "APP_TITLE",

  Id = "ID",

  InstalledAt = "INSTALLED_AT",

  Relevance = "RELEVANCE",
}

export type AppPlanInput = {
  appRecurringPricingDetails?: InputMaybe<AppRecurringPricingInput>

  appUsagePricingDetails?: InputMaybe<AppUsagePricingInput>
}

export type AppPlanV2 = {
  __typename?: "AppPlanV2"

  pricingDetails: AppPricingDetails
}

export type AppPricingDetails = AppRecurringPricing | AppUsagePricing

export enum AppPricingInterval {
  Annual = "ANNUAL",

  Every_30Days = "EVERY_30_DAYS",
}

export enum AppPublicCategory {
  Custom = "CUSTOM",

  Other = "OTHER",

  Private = "PRIVATE",

  Public = "PUBLIC",
}

export type AppPurchase = {
  createdAt: Scalars["DateTime"]["output"]

  name: Scalars["String"]["output"]

  price: MoneyV2

  status: AppPurchaseStatus

  test: Scalars["Boolean"]["output"]
}

export type AppPurchaseOneTime = AppPurchase &
  Node & {
    __typename?: "AppPurchaseOneTime"

    createdAt: Scalars["DateTime"]["output"]

    id: Scalars["ID"]["output"]

    name: Scalars["String"]["output"]

    price: MoneyV2

    status: AppPurchaseStatus

    test: Scalars["Boolean"]["output"]
  }

export type AppPurchaseOneTimeConnection = {
  __typename?: "AppPurchaseOneTimeConnection"

  edges: Array<AppPurchaseOneTimeEdge>

  nodes: Array<AppPurchaseOneTime>

  pageInfo: PageInfo
}

export type AppPurchaseOneTimeCreatePayload = {
  __typename?: "AppPurchaseOneTimeCreatePayload"

  appPurchaseOneTime?: Maybe<AppPurchaseOneTime>

  confirmationUrl?: Maybe<Scalars["URL"]["output"]>

  userErrors: Array<UserError>
}

export type AppPurchaseOneTimeEdge = {
  __typename?: "AppPurchaseOneTimeEdge"

  cursor: Scalars["String"]["output"]

  node: AppPurchaseOneTime
}

export enum AppPurchaseStatus {
  /**
   * The app purchase has been approved by the merchant and is ready to be activated by the app. App purchases created through the GraphQL Admin API are activated upon approval.
   * @deprecated As of API version 2021-01, when a merchant accepts an app purchase, the status immediately changes from `pending` to `active`.
   */
  Accepted = "ACCEPTED",

  Active = "ACTIVE",

  Declined = "DECLINED",

  Expired = "EXPIRED",

  Pending = "PENDING",
}

export type AppRecurringPricing = {
  __typename?: "AppRecurringPricing"

  discount?: Maybe<AppSubscriptionDiscount>

  interval: AppPricingInterval

  price: MoneyV2
}

export type AppRecurringPricingInput = {
  discount?: InputMaybe<AppSubscriptionDiscountInput>

  interval?: InputMaybe<AppPricingInterval>

  price: MoneyInput
}

export type AppRevenueAttributionRecord = Node & {
  __typename?: "AppRevenueAttributionRecord"

  amount: MoneyV2

  capturedAt: Scalars["DateTime"]["output"]

  createdAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  idempotencyKey: Scalars["String"]["output"]

  test: Scalars["Boolean"]["output"]

  type: AppRevenueAttributionType
}

export type AppRevenueAttributionRecordConnection = {
  __typename?: "AppRevenueAttributionRecordConnection"

  edges: Array<AppRevenueAttributionRecordEdge>

  nodes: Array<AppRevenueAttributionRecord>

  pageInfo: PageInfo
}

export type AppRevenueAttributionRecordEdge = {
  __typename?: "AppRevenueAttributionRecordEdge"

  cursor: Scalars["String"]["output"]

  node: AppRevenueAttributionRecord
}

export enum AppRevenueAttributionRecordSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export enum AppRevenueAttributionType {
  ApplicationPurchase = "APPLICATION_PURCHASE",

  ApplicationSubscription = "APPLICATION_SUBSCRIPTION",

  ApplicationUsage = "APPLICATION_USAGE",

  Other = "OTHER",
}

export type AppSubscription = Node & {
  __typename?: "AppSubscription"

  createdAt: Scalars["DateTime"]["output"]

  currentPeriodEnd?: Maybe<Scalars["DateTime"]["output"]>

  id: Scalars["ID"]["output"]

  lineItems: Array<AppSubscriptionLineItem>

  name: Scalars["String"]["output"]

  returnUrl: Scalars["URL"]["output"]

  status: AppSubscriptionStatus

  test: Scalars["Boolean"]["output"]

  trialDays: Scalars["Int"]["output"]
}

export type AppSubscriptionCancelPayload = {
  __typename?: "AppSubscriptionCancelPayload"

  appSubscription?: Maybe<AppSubscription>

  userErrors: Array<UserError>
}

export type AppSubscriptionConnection = {
  __typename?: "AppSubscriptionConnection"

  edges: Array<AppSubscriptionEdge>

  nodes: Array<AppSubscription>

  pageInfo: PageInfo
}

export type AppSubscriptionCreatePayload = {
  __typename?: "AppSubscriptionCreatePayload"

  appSubscription?: Maybe<AppSubscription>

  confirmationUrl?: Maybe<Scalars["URL"]["output"]>

  userErrors: Array<UserError>
}

export type AppSubscriptionDiscount = {
  __typename?: "AppSubscriptionDiscount"

  durationLimitInIntervals?: Maybe<Scalars["Int"]["output"]>

  priceAfterDiscount: MoneyV2

  remainingDurationInIntervals?: Maybe<Scalars["Int"]["output"]>

  value: AppSubscriptionDiscountValue
}

export type AppSubscriptionDiscountAmount = {
  __typename?: "AppSubscriptionDiscountAmount"

  amount: MoneyV2
}

export type AppSubscriptionDiscountInput = {
  durationLimitInIntervals?: InputMaybe<Scalars["Int"]["input"]>

  value?: InputMaybe<AppSubscriptionDiscountValueInput>
}

export type AppSubscriptionDiscountPercentage = {
  __typename?: "AppSubscriptionDiscountPercentage"

  percentage: Scalars["Float"]["output"]
}

export type AppSubscriptionDiscountValue = AppSubscriptionDiscountAmount | AppSubscriptionDiscountPercentage

export type AppSubscriptionDiscountValueInput = {
  amount?: InputMaybe<Scalars["Decimal"]["input"]>

  percentage?: InputMaybe<Scalars["Float"]["input"]>
}

export type AppSubscriptionEdge = {
  __typename?: "AppSubscriptionEdge"

  cursor: Scalars["String"]["output"]

  node: AppSubscription
}

export type AppSubscriptionLineItem = {
  __typename?: "AppSubscriptionLineItem"

  id: Scalars["ID"]["output"]

  plan: AppPlanV2

  usageRecords: AppUsageRecordConnection
}

export type AppSubscriptionLineItemUsageRecordsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<AppUsageRecordSortKeys>
}

export type AppSubscriptionLineItemInput = {
  plan: AppPlanInput
}

export type AppSubscriptionLineItemUpdatePayload = {
  __typename?: "AppSubscriptionLineItemUpdatePayload"

  appSubscription?: Maybe<AppSubscription>

  confirmationUrl?: Maybe<Scalars["URL"]["output"]>

  userErrors: Array<UserError>
}

export enum AppSubscriptionReplacementBehavior {
  ApplyImmediately = "APPLY_IMMEDIATELY",

  ApplyOnNextBillingCycle = "APPLY_ON_NEXT_BILLING_CYCLE",

  Standard = "STANDARD",
}

export enum AppSubscriptionSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export enum AppSubscriptionStatus {
  /**
   * The app subscription has been approved by the merchant and is ready to be activated by the app.
   * @deprecated As of API version 2021-01, when a merchant approves an app subscription, the status immediately transitions from `pending` to `active`.
   */
  Accepted = "ACCEPTED",

  Active = "ACTIVE",

  Cancelled = "CANCELLED",

  Declined = "DECLINED",

  Expired = "EXPIRED",

  Frozen = "FROZEN",

  Pending = "PENDING",
}

export type AppSubscriptionTrialExtendPayload = {
  __typename?: "AppSubscriptionTrialExtendPayload"

  appSubscription?: Maybe<AppSubscription>

  userErrors: Array<AppSubscriptionTrialExtendUserError>
}

export type AppSubscriptionTrialExtendUserError = DisplayableError & {
  __typename?: "AppSubscriptionTrialExtendUserError"

  code?: Maybe<AppSubscriptionTrialExtendUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum AppSubscriptionTrialExtendUserErrorCode {
  SubscriptionNotActive = "SUBSCRIPTION_NOT_ACTIVE",

  SubscriptionNotFound = "SUBSCRIPTION_NOT_FOUND",

  TrialNotActive = "TRIAL_NOT_ACTIVE",
}

export enum AppTransactionSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export type AppUsagePricing = {
  __typename?: "AppUsagePricing"

  balanceUsed: MoneyV2

  cappedAmount: MoneyV2

  interval: AppPricingInterval

  terms: Scalars["String"]["output"]
}

export type AppUsagePricingInput = {
  cappedAmount: MoneyInput

  terms: Scalars["String"]["input"]
}

export type AppUsageRecord = Node & {
  __typename?: "AppUsageRecord"

  createdAt: Scalars["DateTime"]["output"]

  description: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  idempotencyKey?: Maybe<Scalars["String"]["output"]>

  price: MoneyV2

  subscriptionLineItem: AppSubscriptionLineItem
}

export type AppUsageRecordConnection = {
  __typename?: "AppUsageRecordConnection"

  edges: Array<AppUsageRecordEdge>

  nodes: Array<AppUsageRecord>

  pageInfo: PageInfo
}

export type AppUsageRecordCreatePayload = {
  __typename?: "AppUsageRecordCreatePayload"

  appUsageRecord?: Maybe<AppUsageRecord>

  userErrors: Array<UserError>
}

export type AppUsageRecordEdge = {
  __typename?: "AppUsageRecordEdge"

  cursor: Scalars["String"]["output"]

  node: AppUsageRecord
}

export enum AppUsageRecordSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
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

  index: Scalars["Int"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]

  value: PricingValue
}

export enum AutomaticDiscountSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export type AvailableChannelDefinitionsByChannel = {
  __typename?: "AvailableChannelDefinitionsByChannel"

  channelDefinitions: Array<ChannelDefinition>

  channelName: Scalars["String"]["output"]
}

export enum BadgeType {
  Attention = "ATTENTION",

  Default = "DEFAULT",

  Info = "INFO",

  Success = "SUCCESS",

  Warning = "WARNING",
}

export enum BalanceTransactionSortKeys {
  Amount = "AMOUNT",

  Fee = "FEE",

  Id = "ID",

  Net = "NET",

  OrderName = "ORDER_NAME",

  PaymentMethodName = "PAYMENT_METHOD_NAME",

  PayoutDate = "PAYOUT_DATE",

  PayoutStatus = "PAYOUT_STATUS",

  ProcessedAt = "PROCESSED_AT",

  Relevance = "RELEVANCE",

  TransactionType = "TRANSACTION_TYPE",
}

export type BasePaymentDetails = {
  paymentMethodName?: Maybe<Scalars["String"]["output"]>
}

export type BasicEvent = Event &
  Node & {
    __typename?: "BasicEvent"

    appTitle?: Maybe<Scalars["String"]["output"]>

    attributeToApp: Scalars["Boolean"]["output"]

    attributeToUser: Scalars["Boolean"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    criticalAlert: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    message: Scalars["FormattedString"]["output"]
  }

export type BillingAttemptUserError = DisplayableError & {
  __typename?: "BillingAttemptUserError"

  code?: Maybe<BillingAttemptUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum BillingAttemptUserErrorCode {
  Blank = "BLANK",

  ContractNotFound = "CONTRACT_NOT_FOUND",

  ContractTerminated = "CONTRACT_TERMINATED",

  ContractUnderReview = "CONTRACT_UNDER_REVIEW",

  CycleIndexOutOfRange = "CYCLE_INDEX_OUT_OF_RANGE",

  CycleStartDateOutOfRange = "CYCLE_START_DATE_OUT_OF_RANGE",

  Invalid = "INVALID",

  OriginTimeBeforeContractCreation = "ORIGIN_TIME_BEFORE_CONTRACT_CREATION",

  OriginTimeOutOfRange = "ORIGIN_TIME_OUT_OF_RANGE",

  UpcomingCycleLimitExceeded = "UPCOMING_CYCLE_LIMIT_EXCEEDED",
}

export enum BulkMutationErrorCode {
  InternalFileServerError = "INTERNAL_FILE_SERVER_ERROR",

  InvalidMutation = "INVALID_MUTATION",

  InvalidStagedUploadFile = "INVALID_STAGED_UPLOAD_FILE",

  NoSuchFile = "NO_SUCH_FILE",

  OperationInProgress = "OPERATION_IN_PROGRESS",
}

export type BulkMutationUserError = DisplayableError & {
  __typename?: "BulkMutationUserError"

  code?: Maybe<BulkMutationErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type BulkOperation = Node & {
  __typename?: "BulkOperation"

  completedAt?: Maybe<Scalars["DateTime"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  errorCode?: Maybe<BulkOperationErrorCode>

  fileSize?: Maybe<Scalars["UnsignedInt64"]["output"]>

  id: Scalars["ID"]["output"]

  objectCount: Scalars["UnsignedInt64"]["output"]

  partialDataUrl?: Maybe<Scalars["URL"]["output"]>

  query: Scalars["String"]["output"]

  rootObjectCount: Scalars["UnsignedInt64"]["output"]

  status: BulkOperationStatus

  type: BulkOperationType

  url?: Maybe<Scalars["URL"]["output"]>
}

export type BulkOperationCancelPayload = {
  __typename?: "BulkOperationCancelPayload"

  bulkOperation?: Maybe<BulkOperation>

  userErrors: Array<UserError>
}

export enum BulkOperationErrorCode {
  AccessDenied = "ACCESS_DENIED",

  InternalServerError = "INTERNAL_SERVER_ERROR",

  Timeout = "TIMEOUT",
}

export type BulkOperationRunMutationPayload = {
  __typename?: "BulkOperationRunMutationPayload"

  bulkOperation?: Maybe<BulkOperation>

  userErrors: Array<BulkMutationUserError>
}

export type BulkOperationRunQueryPayload = {
  __typename?: "BulkOperationRunQueryPayload"

  bulkOperation?: Maybe<BulkOperation>

  userErrors: Array<UserError>
}

export enum BulkOperationStatus {
  Canceled = "CANCELED",

  Canceling = "CANCELING",

  Completed = "COMPLETED",

  Created = "CREATED",

  Expired = "EXPIRED",

  Failed = "FAILED",

  Running = "RUNNING",
}

export enum BulkOperationType {
  Mutation = "MUTATION",

  Query = "QUERY",
}

export type BulkProductResourceFeedbackCreatePayload = {
  __typename?: "BulkProductResourceFeedbackCreatePayload"

  feedback?: Maybe<Array<ProductResourceFeedback>>

  userErrors: Array<BulkProductResourceFeedbackCreateUserError>
}

export type BulkProductResourceFeedbackCreateUserError = DisplayableError & {
  __typename?: "BulkProductResourceFeedbackCreateUserError"

  code?: Maybe<BulkProductResourceFeedbackCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum BulkProductResourceFeedbackCreateUserErrorCode {
  Blank = "BLANK",

  Invalid = "INVALID",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  MaximumFeedbackLimitExceeded = "MAXIMUM_FEEDBACK_LIMIT_EXCEEDED",

  OutdatedFeedback = "OUTDATED_FEEDBACK",

  Present = "PRESENT",

  ProductNotFound = "PRODUCT_NOT_FOUND",
}

export type BundlesFeature = {
  __typename?: "BundlesFeature"

  eligibleForBundles: Scalars["Boolean"]["output"]

  ineligibilityReason?: Maybe<Scalars["String"]["output"]>

  sellsBundles: Scalars["Boolean"]["output"]
}

export enum BusinessCustomerErrorCode {
  Blank = "BLANK",

  FailedToDelete = "FAILED_TO_DELETE",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  InvalidInput = "INVALID_INPUT",

  LimitReached = "LIMIT_REACHED",

  NoInput = "NO_INPUT",

  Required = "REQUIRED",

  ResourceNotFound = "RESOURCE_NOT_FOUND",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  UnexpectedType = "UNEXPECTED_TYPE",
}

export type BusinessCustomerUserError = DisplayableError & {
  __typename?: "BusinessCustomerUserError"

  code?: Maybe<BusinessCustomerErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type BuyerExperienceConfiguration = {
  __typename?: "BuyerExperienceConfiguration"

  checkoutToDraft: Scalars["Boolean"]["output"]

  editableShippingAddress: Scalars["Boolean"]["output"]

  payNowOnly: Scalars["Boolean"]["output"]

  paymentTermsTemplate?: Maybe<PaymentTermsTemplate>
}

export type BuyerExperienceConfigurationInput = {
  checkoutToDraft?: InputMaybe<Scalars["Boolean"]["input"]>

  editableShippingAddress?: InputMaybe<Scalars["Boolean"]["input"]>

  paymentTermsTemplateId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CalculatedAutomaticDiscountApplication = CalculatedDiscountApplication & {
  __typename?: "CalculatedAutomaticDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  appliedTo: DiscountApplicationLevel

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type CalculatedDiscountAllocation = {
  __typename?: "CalculatedDiscountAllocation"

  allocatedAmountSet: MoneyBag

  discountApplication: CalculatedDiscountApplication
}

export type CalculatedDiscountApplication = {
  allocationMethod: DiscountApplicationAllocationMethod

  appliedTo: DiscountApplicationLevel

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type CalculatedDiscountApplicationConnection = {
  __typename?: "CalculatedDiscountApplicationConnection"

  edges: Array<CalculatedDiscountApplicationEdge>

  nodes: Array<CalculatedDiscountApplication>

  pageInfo: PageInfo
}

export type CalculatedDiscountApplicationEdge = {
  __typename?: "CalculatedDiscountApplicationEdge"

  cursor: Scalars["String"]["output"]

  node: CalculatedDiscountApplication
}

export type CalculatedDiscountCodeApplication = CalculatedDiscountApplication & {
  __typename?: "CalculatedDiscountCodeApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  appliedTo: DiscountApplicationLevel

  code: Scalars["String"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type CalculatedDraftOrder = {
  __typename?: "CalculatedDraftOrder"

  appliedDiscount?: Maybe<DraftOrderAppliedDiscount>

  availableShippingRates: Array<ShippingRate>

  billingAddressMatchesShippingAddress: Scalars["Boolean"]["output"]

  currencyCode: CurrencyCode

  customer?: Maybe<Customer>

  lineItems: Array<CalculatedDraftOrderLineItem>

  lineItemsSubtotalPrice: MoneyBag

  marketName: Scalars["String"]["output"]

  marketRegionCountryCode: CountryCode

  phone?: Maybe<Scalars["String"]["output"]>

  presentmentCurrencyCode: CurrencyCode

  purchasingEntity?: Maybe<PurchasingEntity>

  shippingLine?: Maybe<ShippingLine>

  subtotalPrice: Scalars["Money"]["output"]

  subtotalPriceSet: MoneyBag

  taxLines: Array<TaxLine>

  totalDiscountsSet: MoneyBag

  totalLineItemsPriceSet: MoneyBag

  totalPrice: Scalars["Money"]["output"]

  totalPriceSet: MoneyBag

  totalShippingPrice: Scalars["Money"]["output"]

  totalShippingPriceSet: MoneyBag

  totalTax: Scalars["Money"]["output"]

  totalTaxSet: MoneyBag
}

export type CalculatedDraftOrderLineItem = {
  __typename?: "CalculatedDraftOrderLineItem"

  appliedDiscount?: Maybe<DraftOrderAppliedDiscount>

  custom: Scalars["Boolean"]["output"]

  customAttributes: Array<Attribute>

  customAttributesV2: Array<TypedAttribute>

  discountedTotal: MoneyV2

  discountedTotalSet: MoneyBag

  discountedUnitPrice: MoneyV2

  discountedUnitPriceSet: MoneyBag

  fulfillmentService?: Maybe<FulfillmentService>

  image?: Maybe<Image>

  isGiftCard: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]

  originalTotal: MoneyV2

  originalTotalSet: MoneyBag

  originalUnitPrice: MoneyV2

  originalUnitPriceSet: MoneyBag

  product?: Maybe<Product>

  quantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  taxable: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]

  totalDiscount: MoneyV2

  totalDiscountSet: MoneyBag

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>

  vendor?: Maybe<Scalars["String"]["output"]>

  weight?: Maybe<Weight>
}

export type CalculatedLineItem = {
  __typename?: "CalculatedLineItem"

  calculatedDiscountAllocations: Array<CalculatedDiscountAllocation>

  customAttributes: Array<Attribute>
  /**
   * The discounts that have been allocated onto the line item by discount applications.
   * @deprecated Use `calculatedDiscountAllocations` instead.
   */
  discountAllocations: Array<DiscountAllocation>

  discountedUnitPriceSet: MoneyBag

  editableQuantity: Scalars["Int"]["output"]

  editableQuantityBeforeChanges: Scalars["Int"]["output"]

  editableSubtotalSet: MoneyBag

  hasStagedLineItemDiscount: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  originalUnitPriceSet: MoneyBag

  quantity: Scalars["Int"]["output"]

  restockable: Scalars["Boolean"]["output"]

  restocking: Scalars["Boolean"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  stagedChanges: Array<OrderStagedChange>

  title: Scalars["String"]["output"]

  uneditableSubtotalSet: MoneyBag

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>
}

export type CalculatedLineItemConnection = {
  __typename?: "CalculatedLineItemConnection"

  edges: Array<CalculatedLineItemEdge>

  nodes: Array<CalculatedLineItem>

  pageInfo: PageInfo
}

export type CalculatedLineItemEdge = {
  __typename?: "CalculatedLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: CalculatedLineItem
}

export type CalculatedManualDiscountApplication = CalculatedDiscountApplication & {
  __typename?: "CalculatedManualDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  appliedTo: DiscountApplicationLevel

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type CalculatedOrder = Node & {
  __typename?: "CalculatedOrder"

  addedDiscountApplications: CalculatedDiscountApplicationConnection

  addedLineItems: CalculatedLineItemConnection

  cartDiscountAmountSet?: Maybe<MoneyBag>

  committed: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  lineItems: CalculatedLineItemConnection

  notificationPreviewHtml?: Maybe<Scalars["HTML"]["output"]>

  notificationPreviewTitle: Scalars["String"]["output"]
  /**
   * The order without any changes applied.
   * @deprecated Use `originalOrder` instead.
   */
  order: Order

  originalOrder: Order

  stagedChanges: OrderStagedChangeConnection

  subtotalLineItemsQuantity: Scalars["Int"]["output"]

  subtotalPriceSet?: Maybe<MoneyBag>

  taxLines: Array<TaxLine>

  totalOutstandingSet: MoneyBag

  totalPriceSet: MoneyBag
}

export type CalculatedOrderAddedDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CalculatedOrderAddedLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CalculatedOrderLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CalculatedOrderStagedChangesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CalculatedScriptDiscountApplication = CalculatedDiscountApplication & {
  __typename?: "CalculatedScriptDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  appliedTo: DiscountApplicationLevel

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type CardPaymentDetails = BasePaymentDetails & {
  __typename?: "CardPaymentDetails"

  avsResultCode?: Maybe<Scalars["String"]["output"]>

  bin?: Maybe<Scalars["String"]["output"]>

  company?: Maybe<Scalars["String"]["output"]>

  cvvResultCode?: Maybe<Scalars["String"]["output"]>

  expirationMonth?: Maybe<Scalars["Int"]["output"]>

  expirationYear?: Maybe<Scalars["Int"]["output"]>

  name?: Maybe<Scalars["String"]["output"]>

  number?: Maybe<Scalars["String"]["output"]>

  paymentMethodName?: Maybe<Scalars["String"]["output"]>

  wallet?: Maybe<DigitalWallet>
}

export type CartTransform = HasMetafields &
  Node & {
    __typename?: "CartTransform"

    blockOnFailure: Scalars["Boolean"]["output"]

    functionId: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection
  }

export type CartTransformMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CartTransformMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CartTransformPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type CartTransformPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CartTransformConnection = {
  __typename?: "CartTransformConnection"

  edges: Array<CartTransformEdge>

  nodes: Array<CartTransform>

  pageInfo: PageInfo
}

export type CartTransformCreatePayload = {
  __typename?: "CartTransformCreatePayload"

  cartTransform?: Maybe<CartTransform>

  userErrors: Array<CartTransformCreateUserError>
}

export type CartTransformCreateUserError = DisplayableError & {
  __typename?: "CartTransformCreateUserError"

  code?: Maybe<CartTransformCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CartTransformCreateUserErrorCode {
  FunctionAlreadyRegistered = "FUNCTION_ALREADY_REGISTERED",

  FunctionDoesNotImplement = "FUNCTION_DOES_NOT_IMPLEMENT",

  FunctionNotFound = "FUNCTION_NOT_FOUND",

  InputInvalid = "INPUT_INVALID",
}

export type CartTransformDeletePayload = {
  __typename?: "CartTransformDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<CartTransformDeleteUserError>
}

export type CartTransformDeleteUserError = DisplayableError & {
  __typename?: "CartTransformDeleteUserError"

  code?: Maybe<CartTransformDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CartTransformDeleteUserErrorCode {
  NotFound = "NOT_FOUND",

  UnauthorizedAppScope = "UNAUTHORIZED_APP_SCOPE",
}

export type CartTransformEdge = {
  __typename?: "CartTransformEdge"

  cursor: Scalars["String"]["output"]

  node: CartTransform
}

export type CartTransformEligibleOperations = {
  __typename?: "CartTransformEligibleOperations"

  expandOperation: Scalars["Boolean"]["output"]

  mergeOperation: Scalars["Boolean"]["output"]

  updateOperation: Scalars["Boolean"]["output"]
}

export type CartTransformFeature = {
  __typename?: "CartTransformFeature"

  eligibleOperations: CartTransformEligibleOperations
}

export type Catalog = {
  id: Scalars["ID"]["output"]

  operations: Array<ResourceOperation>

  priceList?: Maybe<PriceList>

  publication?: Maybe<Publication>

  status: CatalogStatus

  title: Scalars["String"]["output"]
}

export type CatalogConnection = {
  __typename?: "CatalogConnection"

  edges: Array<CatalogEdge>

  nodes: Array<Catalog>

  pageInfo: PageInfo

  totalCount: Scalars["UnsignedInt64"]["output"]
}

export type CatalogContextInput = {
  companyLocationIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type CatalogContextUpdatePayload = {
  __typename?: "CatalogContextUpdatePayload"

  catalog?: Maybe<Catalog>

  userErrors: Array<CatalogUserError>
}

export type CatalogCreateInput = {
  context: CatalogContextInput

  priceListId?: InputMaybe<Scalars["ID"]["input"]>

  publicationId?: InputMaybe<Scalars["ID"]["input"]>

  status: CatalogStatus

  title: Scalars["String"]["input"]
}

export type CatalogCreatePayload = {
  __typename?: "CatalogCreatePayload"

  catalog?: Maybe<Catalog>

  userErrors: Array<CatalogUserError>
}

export type CatalogCsvOperation = Node &
  ResourceOperation & {
    __typename?: "CatalogCsvOperation"

    id: Scalars["ID"]["output"]

    processedRowCount?: Maybe<Scalars["Int"]["output"]>

    rowCount?: Maybe<RowCount>

    status: ResourceOperationStatus
  }

export type CatalogDeletePayload = {
  __typename?: "CatalogDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<CatalogUserError>
}

export type CatalogEdge = {
  __typename?: "CatalogEdge"

  cursor: Scalars["String"]["output"]

  node: Catalog
}

export enum CatalogSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",

  Title = "TITLE",
}

export enum CatalogStatus {
  Active = "ACTIVE",

  Archived = "ARCHIVED",

  Draft = "DRAFT",
}

export enum CatalogType {
  App = "APP",

  CompanyLocation = "COMPANY_LOCATION",

  Market = "MARKET",

  None = "NONE",
}

export type CatalogUpdateInput = {
  context?: InputMaybe<CatalogContextInput>

  priceListId?: InputMaybe<Scalars["ID"]["input"]>

  publicationId?: InputMaybe<Scalars["ID"]["input"]>

  status?: InputMaybe<CatalogStatus>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type CatalogUpdatePayload = {
  __typename?: "CatalogUpdatePayload"

  catalog?: Maybe<Catalog>

  userErrors: Array<CatalogUserError>
}

export type CatalogUserError = DisplayableError & {
  __typename?: "CatalogUserError"

  code?: Maybe<CatalogUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CatalogUserErrorCode {
  AppCatalogPriceListAssignment = "APP_CATALOG_PRICE_LIST_ASSIGNMENT",

  Blank = "BLANK",

  CannotAddMoreThanOneMarket = "CANNOT_ADD_MORE_THAN_ONE_MARKET",

  CannotCreateAppCatalog = "CANNOT_CREATE_APP_CATALOG",

  CannotCreateMarketCatalog = "CANNOT_CREATE_MARKET_CATALOG",

  CannotDeleteAppCatalog = "CANNOT_DELETE_APP_CATALOG",

  CannotDeleteMarketCatalog = "CANNOT_DELETE_MARKET_CATALOG",

  CannotModifyAppCatalog = "CANNOT_MODIFY_APP_CATALOG",

  CannotModifyMarketCatalog = "CANNOT_MODIFY_MARKET_CATALOG",

  CatalogContextDoesNotSupportQuantityPriceBreaks = "CATALOG_CONTEXT_DOES_NOT_SUPPORT_QUANTITY_PRICE_BREAKS",

  CatalogContextDoesNotSupportQuantityRules = "CATALOG_CONTEXT_DOES_NOT_SUPPORT_QUANTITY_RULES",

  CatalogFailedToSave = "CATALOG_FAILED_TO_SAVE",

  CatalogNotFound = "CATALOG_NOT_FOUND",

  CompanyLocationCatalogStatusPlan = "COMPANY_LOCATION_CATALOG_STATUS_PLAN",

  CompanyLocationNotFound = "COMPANY_LOCATION_NOT_FOUND",

  ContextAlreadyAssignedToCatalog = "CONTEXT_ALREADY_ASSIGNED_TO_CATALOG",

  ContextCatalogLimitReached = "CONTEXT_CATALOG_LIMIT_REACHED",

  ContextDriverMismatch = "CONTEXT_DRIVER_MISMATCH",

  CountryPriceListAssignment = "COUNTRY_PRICE_LIST_ASSIGNMENT",

  Invalid = "INVALID",

  InvalidCatalogContextType = "INVALID_CATALOG_CONTEXT_TYPE",

  MarketAndPriceListCurrencyMismatch = "MARKET_AND_PRICE_LIST_CURRENCY_MISMATCH",

  MarketCatalogStatus = "MARKET_CATALOG_STATUS",

  MarketNotFound = "MARKET_NOT_FOUND",

  MarketTaken = "MARKET_TAKEN",

  MustProvideExactlyOneContextType = "MUST_PROVIDE_EXACTLY_ONE_CONTEXT_TYPE",

  PriceListFailedToSave = "PRICE_LIST_FAILED_TO_SAVE",

  PriceListLocked = "PRICE_LIST_LOCKED",

  PriceListNotAllowedForPrimaryMarket = "PRICE_LIST_NOT_ALLOWED_FOR_PRIMARY_MARKET",

  PriceListNotFound = "PRICE_LIST_NOT_FOUND",

  PublicationNotFound = "PUBLICATION_NOT_FOUND",

  RequiresContextsToAddOrRemove = "REQUIRES_CONTEXTS_TO_ADD_OR_REMOVE",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnsupportedCatalogAction = "UNSUPPORTED_CATALOG_ACTION",
}

export type Channel = Node & {
  __typename?: "Channel"

  app: App

  collectionPublicationsV3: ResourcePublicationConnection

  collections: CollectionConnection
  /**
   * The unique identifier for the channel.
   * @deprecated Use `id` instead.
   */
  handle: Scalars["String"]["output"]

  hasCollection: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]
  /**
   * The menu items for the channel, which also appear as submenu items in the left navigation sidebar in the Shopify admin.
   *
   * @deprecated Use [AppInstallation.navigationItems](
   *           https://shopify.dev/api/admin-graphql/current/objects/AppInstallation#field-appinstallation-navigationitems) instead.
   */
  navigationItems: Array<NavigationItem>
  /**
   * Home page for the channel.
   * @deprecated Use [AppInstallation.launchUrl](
   *           https://shopify.dev/api/admin-graphql/current/objects/AppInstallation#field-appinstallation-launchurl) instead.
   */
  overviewPath?: Maybe<Scalars["URL"]["output"]>
  /**
   * The product publications for the products published to the channel.
   * @deprecated Use `productPublicationsV3` instead.
   */
  productPublications: ProductPublicationConnection

  productPublicationsV3: ResourcePublicationConnection

  products: ProductConnection

  supportsFuturePublishing: Scalars["Boolean"]["output"]
}

export type ChannelCollectionPublicationsV3Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ChannelCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ChannelHasCollectionArgs = {
  id: Scalars["ID"]["input"]
}

export type ChannelProductPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ChannelProductPublicationsV3Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ChannelProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ChannelConnection = {
  __typename?: "ChannelConnection"

  edges: Array<ChannelEdge>

  nodes: Array<Channel>

  pageInfo: PageInfo
}

export type ChannelDefinition = Node & {
  __typename?: "ChannelDefinition"

  channelName: Scalars["String"]["output"]

  handle: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  isMarketplace: Scalars["Boolean"]["output"]

  subChannelName: Scalars["String"]["output"]

  svgIcon?: Maybe<Scalars["String"]["output"]>
}

export type ChannelEdge = {
  __typename?: "ChannelEdge"

  cursor: Scalars["String"]["output"]

  node: Channel
}

export type ChannelInformation = Node & {
  __typename?: "ChannelInformation"

  app: App

  channelDefinition?: Maybe<ChannelDefinition>

  channelId: Scalars["ID"]["output"]

  id: Scalars["ID"]["output"]
}

export type CheckoutBranding = {
  __typename?: "CheckoutBranding"

  customizations?: Maybe<CheckoutBrandingCustomizations>

  designSystem?: Maybe<CheckoutBrandingDesignSystem>
}

export enum CheckoutBrandingBackgroundStyle {
  None = "NONE",

  Solid = "SOLID",
}

export enum CheckoutBrandingBorder {
  BlockEnd = "BLOCK_END",

  Full = "FULL",

  None = "NONE",
}

export type CheckoutBrandingButton = {
  __typename?: "CheckoutBrandingButton"

  background?: Maybe<CheckoutBrandingBackgroundStyle>

  blockPadding?: Maybe<CheckoutBrandingSpacing>

  border?: Maybe<CheckoutBrandingSimpleBorder>

  cornerRadius?: Maybe<CheckoutBrandingCornerRadius>

  inlinePadding?: Maybe<CheckoutBrandingSpacing>

  typography?: Maybe<CheckoutBrandingTypographyStyle>
}

export type CheckoutBrandingButtonColorRoles = {
  __typename?: "CheckoutBrandingButtonColorRoles"

  accent?: Maybe<Scalars["String"]["output"]>

  background?: Maybe<Scalars["String"]["output"]>

  border?: Maybe<Scalars["String"]["output"]>

  decorative?: Maybe<Scalars["String"]["output"]>

  hover?: Maybe<CheckoutBrandingColorRoles>

  icon?: Maybe<Scalars["String"]["output"]>

  text?: Maybe<Scalars["String"]["output"]>
}

export type CheckoutBrandingButtonColorRolesInput = {
  accent?: InputMaybe<Scalars["String"]["input"]>

  background?: InputMaybe<Scalars["String"]["input"]>

  border?: InputMaybe<Scalars["String"]["input"]>

  decorative?: InputMaybe<Scalars["String"]["input"]>

  hover?: InputMaybe<CheckoutBrandingColorRolesInput>

  icon?: InputMaybe<Scalars["String"]["input"]>

  text?: InputMaybe<Scalars["String"]["input"]>
}

export type CheckoutBrandingButtonInput = {
  background?: InputMaybe<CheckoutBrandingBackgroundStyle>

  blockPadding?: InputMaybe<CheckoutBrandingSpacing>

  border?: InputMaybe<CheckoutBrandingSimpleBorder>

  cornerRadius?: InputMaybe<CheckoutBrandingCornerRadius>

  inlinePadding?: InputMaybe<CheckoutBrandingSpacing>

  typography?: InputMaybe<CheckoutBrandingTypographyStyleInput>
}

export type CheckoutBrandingCheckbox = {
  __typename?: "CheckoutBrandingCheckbox"

  cornerRadius?: Maybe<CheckoutBrandingCornerRadius>
}

export type CheckoutBrandingCheckboxInput = {
  cornerRadius?: InputMaybe<CheckoutBrandingCornerRadius>
}

export type CheckoutBrandingChoiceList = {
  __typename?: "CheckoutBrandingChoiceList"

  group?: Maybe<CheckoutBrandingChoiceListGroup>
}

export type CheckoutBrandingChoiceListGroup = {
  __typename?: "CheckoutBrandingChoiceListGroup"

  spacing?: Maybe<CheckoutBrandingSpacingKeyword>
}

export type CheckoutBrandingChoiceListGroupInput = {
  spacing?: InputMaybe<CheckoutBrandingSpacingKeyword>
}

export type CheckoutBrandingChoiceListInput = {
  group?: InputMaybe<CheckoutBrandingChoiceListGroupInput>
}

export type CheckoutBrandingColorGlobal = {
  __typename?: "CheckoutBrandingColorGlobal"

  accent?: Maybe<Scalars["String"]["output"]>

  brand?: Maybe<Scalars["String"]["output"]>

  critical?: Maybe<Scalars["String"]["output"]>

  decorative?: Maybe<Scalars["String"]["output"]>

  info?: Maybe<Scalars["String"]["output"]>

  success?: Maybe<Scalars["String"]["output"]>

  warning?: Maybe<Scalars["String"]["output"]>
}

export type CheckoutBrandingColorGlobalInput = {
  accent?: InputMaybe<Scalars["String"]["input"]>

  brand?: InputMaybe<Scalars["String"]["input"]>

  critical?: InputMaybe<Scalars["String"]["input"]>

  decorative?: InputMaybe<Scalars["String"]["input"]>

  info?: InputMaybe<Scalars["String"]["input"]>

  success?: InputMaybe<Scalars["String"]["input"]>

  warning?: InputMaybe<Scalars["String"]["input"]>
}

export type CheckoutBrandingColorRoles = {
  __typename?: "CheckoutBrandingColorRoles"

  accent?: Maybe<Scalars["String"]["output"]>

  background?: Maybe<Scalars["String"]["output"]>

  border?: Maybe<Scalars["String"]["output"]>

  decorative?: Maybe<Scalars["String"]["output"]>

  icon?: Maybe<Scalars["String"]["output"]>

  text?: Maybe<Scalars["String"]["output"]>
}

export type CheckoutBrandingColorRolesInput = {
  accent?: InputMaybe<Scalars["String"]["input"]>

  background?: InputMaybe<Scalars["String"]["input"]>

  border?: InputMaybe<Scalars["String"]["input"]>

  decorative?: InputMaybe<Scalars["String"]["input"]>

  icon?: InputMaybe<Scalars["String"]["input"]>

  text?: InputMaybe<Scalars["String"]["input"]>
}

export type CheckoutBrandingColorScheme = {
  __typename?: "CheckoutBrandingColorScheme"

  base?: Maybe<CheckoutBrandingColorRoles>

  control?: Maybe<CheckoutBrandingControlColorRoles>

  primaryButton?: Maybe<CheckoutBrandingButtonColorRoles>

  secondaryButton?: Maybe<CheckoutBrandingButtonColorRoles>
}

export type CheckoutBrandingColorSchemeInput = {
  base?: InputMaybe<CheckoutBrandingColorRolesInput>

  control?: InputMaybe<CheckoutBrandingControlColorRolesInput>

  primaryButton?: InputMaybe<CheckoutBrandingButtonColorRolesInput>

  secondaryButton?: InputMaybe<CheckoutBrandingButtonColorRolesInput>
}

export enum CheckoutBrandingColorSchemeSelection {
  ColorScheme1 = "COLOR_SCHEME1",

  ColorScheme2 = "COLOR_SCHEME2",

  Transparent = "TRANSPARENT",
}

export type CheckoutBrandingColorSchemes = {
  __typename?: "CheckoutBrandingColorSchemes"

  scheme1?: Maybe<CheckoutBrandingColorScheme>

  scheme2?: Maybe<CheckoutBrandingColorScheme>
}

export type CheckoutBrandingColorSchemesInput = {
  scheme1?: InputMaybe<CheckoutBrandingColorSchemeInput>

  scheme2?: InputMaybe<CheckoutBrandingColorSchemeInput>
}

export enum CheckoutBrandingColorSelection {
  Transparent = "TRANSPARENT",
}

export type CheckoutBrandingColors = {
  __typename?: "CheckoutBrandingColors"

  global?: Maybe<CheckoutBrandingColorGlobal>

  schemes?: Maybe<CheckoutBrandingColorSchemes>
}

export type CheckoutBrandingColorsInput = {
  global?: InputMaybe<CheckoutBrandingColorGlobalInput>

  schemes?: InputMaybe<CheckoutBrandingColorSchemesInput>
}

export type CheckoutBrandingControl = {
  __typename?: "CheckoutBrandingControl"

  border?: Maybe<CheckoutBrandingSimpleBorder>

  color?: Maybe<CheckoutBrandingColorSelection>

  cornerRadius?: Maybe<CheckoutBrandingCornerRadius>

  labelPosition?: Maybe<CheckoutBrandingLabelPosition>
}

export type CheckoutBrandingControlColorRoles = {
  __typename?: "CheckoutBrandingControlColorRoles"

  accent?: Maybe<Scalars["String"]["output"]>

  background?: Maybe<Scalars["String"]["output"]>

  border?: Maybe<Scalars["String"]["output"]>

  decorative?: Maybe<Scalars["String"]["output"]>

  icon?: Maybe<Scalars["String"]["output"]>

  selected?: Maybe<CheckoutBrandingColorRoles>

  text?: Maybe<Scalars["String"]["output"]>
}

export type CheckoutBrandingControlColorRolesInput = {
  accent?: InputMaybe<Scalars["String"]["input"]>

  background?: InputMaybe<Scalars["String"]["input"]>

  border?: InputMaybe<Scalars["String"]["input"]>

  decorative?: InputMaybe<Scalars["String"]["input"]>

  icon?: InputMaybe<Scalars["String"]["input"]>

  selected?: InputMaybe<CheckoutBrandingColorRolesInput>

  text?: InputMaybe<Scalars["String"]["input"]>
}

export type CheckoutBrandingControlInput = {
  border?: InputMaybe<CheckoutBrandingSimpleBorder>

  color?: InputMaybe<CheckoutBrandingColorSelection>

  cornerRadius?: InputMaybe<CheckoutBrandingCornerRadius>

  labelPosition?: InputMaybe<CheckoutBrandingLabelPosition>
}

export enum CheckoutBrandingCornerRadius {
  Base = "BASE",

  Large = "LARGE",

  None = "NONE",

  Small = "SMALL",
}

export type CheckoutBrandingCornerRadiusVariables = {
  __typename?: "CheckoutBrandingCornerRadiusVariables"

  base?: Maybe<Scalars["Int"]["output"]>

  large?: Maybe<Scalars["Int"]["output"]>

  small?: Maybe<Scalars["Int"]["output"]>
}

export type CheckoutBrandingCornerRadiusVariablesInput = {
  base?: InputMaybe<Scalars["Int"]["input"]>

  large?: InputMaybe<Scalars["Int"]["input"]>

  small?: InputMaybe<Scalars["Int"]["input"]>
}

export type CheckoutBrandingCustomFont = CheckoutBrandingFont & {
  __typename?: "CheckoutBrandingCustomFont"

  genericFileId?: Maybe<Scalars["ID"]["output"]>

  sources?: Maybe<Scalars["String"]["output"]>

  weight?: Maybe<Scalars["Int"]["output"]>
}

export type CheckoutBrandingCustomFontGroupInput = {
  base: CheckoutBrandingCustomFontInput

  bold: CheckoutBrandingCustomFontInput

  loadingStrategy?: InputMaybe<CheckoutBrandingFontLoadingStrategy>
}

export type CheckoutBrandingCustomFontInput = {
  genericFileId: Scalars["ID"]["input"]

  weight: Scalars["Int"]["input"]
}

export type CheckoutBrandingCustomizations = {
  __typename?: "CheckoutBrandingCustomizations"

  checkbox?: Maybe<CheckoutBrandingCheckbox>

  choiceList?: Maybe<CheckoutBrandingChoiceList>

  control?: Maybe<CheckoutBrandingControl>

  favicon?: Maybe<CheckoutBrandingImage>

  global?: Maybe<CheckoutBrandingGlobal>

  header?: Maybe<CheckoutBrandingHeader>

  headingLevel1?: Maybe<CheckoutBrandingHeadingLevel>

  headingLevel2?: Maybe<CheckoutBrandingHeadingLevel>

  headingLevel3?: Maybe<CheckoutBrandingHeadingLevel>

  main?: Maybe<CheckoutBrandingMain>

  merchandiseThumbnail?: Maybe<CheckoutBrandingMerchandiseThumbnail>

  orderSummary?: Maybe<CheckoutBrandingOrderSummary>

  primaryButton?: Maybe<CheckoutBrandingButton>

  secondaryButton?: Maybe<CheckoutBrandingButton>

  select?: Maybe<CheckoutBrandingSelect>

  textField?: Maybe<CheckoutBrandingTextField>
}

export type CheckoutBrandingCustomizationsInput = {
  checkbox?: InputMaybe<CheckoutBrandingCheckboxInput>

  choiceList?: InputMaybe<CheckoutBrandingChoiceListInput>

  control?: InputMaybe<CheckoutBrandingControlInput>

  favicon?: InputMaybe<CheckoutBrandingImageInput>

  global?: InputMaybe<CheckoutBrandingGlobalInput>

  header?: InputMaybe<CheckoutBrandingHeaderInput>

  headingLevel1?: InputMaybe<CheckoutBrandingHeadingLevelInput>

  headingLevel2?: InputMaybe<CheckoutBrandingHeadingLevelInput>

  headingLevel3?: InputMaybe<CheckoutBrandingHeadingLevelInput>

  main?: InputMaybe<CheckoutBrandingMainInput>

  merchandiseThumbnail?: InputMaybe<CheckoutBrandingMerchandiseThumbnailInput>

  orderSummary?: InputMaybe<CheckoutBrandingOrderSummaryInput>

  primaryButton?: InputMaybe<CheckoutBrandingButtonInput>

  secondaryButton?: InputMaybe<CheckoutBrandingButtonInput>

  select?: InputMaybe<CheckoutBrandingSelectInput>

  textField?: InputMaybe<CheckoutBrandingTextFieldInput>
}

export type CheckoutBrandingDesignSystem = {
  __typename?: "CheckoutBrandingDesignSystem"

  colors?: Maybe<CheckoutBrandingColors>

  cornerRadius?: Maybe<CheckoutBrandingCornerRadiusVariables>

  typography?: Maybe<CheckoutBrandingTypography>
}

export type CheckoutBrandingDesignSystemInput = {
  colors?: InputMaybe<CheckoutBrandingColorsInput>

  cornerRadius?: InputMaybe<CheckoutBrandingCornerRadiusVariablesInput>

  typography?: InputMaybe<CheckoutBrandingTypographyInput>
}

export type CheckoutBrandingFont = {
  sources?: Maybe<Scalars["String"]["output"]>

  weight?: Maybe<Scalars["Int"]["output"]>
}

export type CheckoutBrandingFontGroup = {
  __typename?: "CheckoutBrandingFontGroup"

  base?: Maybe<CheckoutBrandingFont>

  bold?: Maybe<CheckoutBrandingFont>

  loadingStrategy?: Maybe<CheckoutBrandingFontLoadingStrategy>

  name?: Maybe<Scalars["String"]["output"]>
}

export type CheckoutBrandingFontGroupInput = {
  customFontGroup?: InputMaybe<CheckoutBrandingCustomFontGroupInput>

  shopifyFontGroup?: InputMaybe<CheckoutBrandingShopifyFontGroupInput>
}

export enum CheckoutBrandingFontLoadingStrategy {
  Auto = "AUTO",

  Block = "BLOCK",

  Fallback = "FALLBACK",

  Optional = "OPTIONAL",

  Swap = "SWAP",
}

export type CheckoutBrandingFontSize = {
  __typename?: "CheckoutBrandingFontSize"

  base?: Maybe<Scalars["Float"]["output"]>

  ratio?: Maybe<Scalars["Float"]["output"]>
}

export type CheckoutBrandingFontSizeInput = {
  base?: InputMaybe<Scalars["Float"]["input"]>

  ratio?: InputMaybe<Scalars["Float"]["input"]>
}

export type CheckoutBrandingGlobal = {
  __typename?: "CheckoutBrandingGlobal"

  cornerRadius?: Maybe<CheckoutBrandingGlobalCornerRadius>

  typography?: Maybe<CheckoutBrandingTypographyStyleGlobal>
}

export enum CheckoutBrandingGlobalCornerRadius {
  None = "NONE",
}

export type CheckoutBrandingGlobalInput = {
  cornerRadius?: InputMaybe<CheckoutBrandingGlobalCornerRadius>

  typography?: InputMaybe<CheckoutBrandingTypographyStyleGlobalInput>
}

export type CheckoutBrandingHeader = {
  __typename?: "CheckoutBrandingHeader"

  alignment?: Maybe<CheckoutBrandingHeaderAlignment>

  banner?: Maybe<CheckoutBrandingImage>

  logo?: Maybe<CheckoutBrandingLogo>

  position?: Maybe<CheckoutBrandingHeaderPosition>
}

export enum CheckoutBrandingHeaderAlignment {
  Center = "CENTER",

  End = "END",

  Start = "START",
}

export type CheckoutBrandingHeaderInput = {
  alignment?: InputMaybe<CheckoutBrandingHeaderAlignment>

  banner?: InputMaybe<CheckoutBrandingImageInput>

  logo?: InputMaybe<CheckoutBrandingLogoInput>

  position?: InputMaybe<CheckoutBrandingHeaderPosition>
}

export enum CheckoutBrandingHeaderPosition {
  Inline = "INLINE",

  InlineSecondary = "INLINE_SECONDARY",

  Start = "START",
}

export type CheckoutBrandingHeadingLevel = {
  __typename?: "CheckoutBrandingHeadingLevel"

  typography?: Maybe<CheckoutBrandingTypographyStyle>
}

export type CheckoutBrandingHeadingLevelInput = {
  typography?: InputMaybe<CheckoutBrandingTypographyStyleInput>
}

export type CheckoutBrandingImage = {
  __typename?: "CheckoutBrandingImage"

  image?: Maybe<Image>
}

export type CheckoutBrandingImageInput = {
  mediaImageId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CheckoutBrandingInput = {
  customizations?: InputMaybe<CheckoutBrandingCustomizationsInput>

  designSystem?: InputMaybe<CheckoutBrandingDesignSystemInput>
}

export enum CheckoutBrandingLabelPosition {
  Inside = "INSIDE",

  Outside = "OUTSIDE",
}

export type CheckoutBrandingLogo = {
  __typename?: "CheckoutBrandingLogo"

  image?: Maybe<Image>

  maxWidth?: Maybe<Scalars["Int"]["output"]>
}

export type CheckoutBrandingLogoInput = {
  image?: InputMaybe<CheckoutBrandingImageInput>

  maxWidth?: InputMaybe<Scalars["Int"]["input"]>
}

export type CheckoutBrandingMain = {
  __typename?: "CheckoutBrandingMain"

  backgroundImage?: Maybe<CheckoutBrandingImage>

  colorScheme?: Maybe<CheckoutBrandingColorSchemeSelection>
}

export type CheckoutBrandingMainInput = {
  backgroundImage?: InputMaybe<CheckoutBrandingImageInput>

  colorScheme?: InputMaybe<CheckoutBrandingColorSchemeSelection>
}

export type CheckoutBrandingMerchandiseThumbnail = {
  __typename?: "CheckoutBrandingMerchandiseThumbnail"

  border?: Maybe<CheckoutBrandingSimpleBorder>

  cornerRadius?: Maybe<CheckoutBrandingCornerRadius>
}

export type CheckoutBrandingMerchandiseThumbnailInput = {
  border?: InputMaybe<CheckoutBrandingSimpleBorder>

  cornerRadius?: InputMaybe<CheckoutBrandingCornerRadius>
}

export type CheckoutBrandingOrderSummary = {
  __typename?: "CheckoutBrandingOrderSummary"

  backgroundImage?: Maybe<CheckoutBrandingImage>

  colorScheme?: Maybe<CheckoutBrandingColorSchemeSelection>
}

export type CheckoutBrandingOrderSummaryInput = {
  backgroundImage?: InputMaybe<CheckoutBrandingImageInput>

  colorScheme?: InputMaybe<CheckoutBrandingColorSchemeSelection>
}

export type CheckoutBrandingSelect = {
  __typename?: "CheckoutBrandingSelect"

  border?: Maybe<CheckoutBrandingBorder>

  typography?: Maybe<CheckoutBrandingTypographyStyle>
}

export type CheckoutBrandingSelectInput = {
  border?: InputMaybe<CheckoutBrandingBorder>

  typography?: InputMaybe<CheckoutBrandingTypographyStyleInput>
}

export type CheckoutBrandingShopifyFont = CheckoutBrandingFont & {
  __typename?: "CheckoutBrandingShopifyFont"

  sources?: Maybe<Scalars["String"]["output"]>

  weight?: Maybe<Scalars["Int"]["output"]>
}

export type CheckoutBrandingShopifyFontGroupInput = {
  baseWeight?: InputMaybe<Scalars["Int"]["input"]>

  boldWeight?: InputMaybe<Scalars["Int"]["input"]>

  loadingStrategy?: InputMaybe<CheckoutBrandingFontLoadingStrategy>

  name: Scalars["String"]["input"]
}

export enum CheckoutBrandingSimpleBorder {
  Full = "FULL",

  None = "NONE",
}

export enum CheckoutBrandingSpacing {
  Base = "BASE",

  ExtraLoose = "EXTRA_LOOSE",

  ExtraTight = "EXTRA_TIGHT",

  Loose = "LOOSE",

  None = "NONE",

  Tight = "TIGHT",
}

export enum CheckoutBrandingSpacingKeyword {
  Base = "BASE",

  Large = "LARGE",

  Large_100 = "LARGE_100",

  Large_200 = "LARGE_200",

  Large_300 = "LARGE_300",

  Large_400 = "LARGE_400",

  Large_500 = "LARGE_500",

  None = "NONE",

  Small = "SMALL",

  Small_100 = "SMALL_100",

  Small_200 = "SMALL_200",

  Small_300 = "SMALL_300",

  Small_400 = "SMALL_400",

  Small_500 = "SMALL_500",
}

export type CheckoutBrandingTextField = {
  __typename?: "CheckoutBrandingTextField"

  border?: Maybe<CheckoutBrandingBorder>

  typography?: Maybe<CheckoutBrandingTypographyStyle>
}

export type CheckoutBrandingTextFieldInput = {
  border?: InputMaybe<CheckoutBrandingBorder>

  typography?: InputMaybe<CheckoutBrandingTypographyStyleInput>
}

export type CheckoutBrandingTypography = {
  __typename?: "CheckoutBrandingTypography"

  primary?: Maybe<CheckoutBrandingFontGroup>

  secondary?: Maybe<CheckoutBrandingFontGroup>

  size?: Maybe<CheckoutBrandingFontSize>
}

export enum CheckoutBrandingTypographyFont {
  Primary = "PRIMARY",

  Secondary = "SECONDARY",
}

export type CheckoutBrandingTypographyInput = {
  primary?: InputMaybe<CheckoutBrandingFontGroupInput>

  secondary?: InputMaybe<CheckoutBrandingFontGroupInput>

  size?: InputMaybe<CheckoutBrandingFontSizeInput>
}

export enum CheckoutBrandingTypographyKerning {
  Base = "BASE",

  ExtraLoose = "EXTRA_LOOSE",

  Loose = "LOOSE",
}

export enum CheckoutBrandingTypographyLetterCase {
  Lower = "LOWER",

  None = "NONE",

  Title = "TITLE",

  Upper = "UPPER",
}

export enum CheckoutBrandingTypographySize {
  Base = "BASE",

  ExtraExtraLarge = "EXTRA_EXTRA_LARGE",

  ExtraLarge = "EXTRA_LARGE",

  ExtraSmall = "EXTRA_SMALL",

  Large = "LARGE",

  Medium = "MEDIUM",

  Small = "SMALL",
}

export type CheckoutBrandingTypographyStyle = {
  __typename?: "CheckoutBrandingTypographyStyle"

  font?: Maybe<CheckoutBrandingTypographyFont>

  kerning?: Maybe<CheckoutBrandingTypographyKerning>

  letterCase?: Maybe<CheckoutBrandingTypographyLetterCase>

  size?: Maybe<CheckoutBrandingTypographySize>

  weight?: Maybe<CheckoutBrandingTypographyWeight>
}

export type CheckoutBrandingTypographyStyleGlobal = {
  __typename?: "CheckoutBrandingTypographyStyleGlobal"

  kerning?: Maybe<CheckoutBrandingTypographyKerning>

  letterCase?: Maybe<CheckoutBrandingTypographyLetterCase>
}

export type CheckoutBrandingTypographyStyleGlobalInput = {
  kerning?: InputMaybe<CheckoutBrandingTypographyKerning>

  letterCase?: InputMaybe<CheckoutBrandingTypographyLetterCase>
}

export type CheckoutBrandingTypographyStyleInput = {
  font?: InputMaybe<CheckoutBrandingTypographyFont>

  kerning?: InputMaybe<CheckoutBrandingTypographyKerning>

  letterCase?: InputMaybe<CheckoutBrandingTypographyLetterCase>

  size?: InputMaybe<CheckoutBrandingTypographySize>

  weight?: InputMaybe<CheckoutBrandingTypographyWeight>
}

export enum CheckoutBrandingTypographyWeight {
  Base = "BASE",

  Bold = "BOLD",
}

export type CheckoutBrandingUpsertPayload = {
  __typename?: "CheckoutBrandingUpsertPayload"

  checkoutBranding?: Maybe<CheckoutBranding>

  userErrors: Array<CheckoutBrandingUpsertUserError>
}

export type CheckoutBrandingUpsertUserError = DisplayableError & {
  __typename?: "CheckoutBrandingUpsertUserError"

  code?: Maybe<CheckoutBrandingUpsertUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CheckoutBrandingUpsertUserErrorCode {
  InternalError = "INTERNAL_ERROR",
}

export type CheckoutProfile = Node & {
  __typename?: "CheckoutProfile"

  createdAt: Scalars["DateTime"]["output"]

  editedAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  isPublished: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]
}

export type CheckoutProfileConnection = {
  __typename?: "CheckoutProfileConnection"

  edges: Array<CheckoutProfileEdge>

  nodes: Array<CheckoutProfile>

  pageInfo: PageInfo
}

export type CheckoutProfileEdge = {
  __typename?: "CheckoutProfileEdge"

  cursor: Scalars["String"]["output"]

  node: CheckoutProfile
}

export enum CheckoutProfileSortKeys {
  CreatedAt = "CREATED_AT",

  EditedAt = "EDITED_AT",

  Id = "ID",

  IsPublished = "IS_PUBLISHED",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export enum CodeDiscountSortKeys {
  CreatedAt = "CREATED_AT",

  EndsAt = "ENDS_AT",

  Id = "ID",

  Relevance = "RELEVANCE",

  StartsAt = "STARTS_AT",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export type Collection = HasMetafieldDefinitions &
  HasMetafields &
  HasPublishedTranslations &
  Node &
  Publishable & {
    __typename?: "Collection"

    availablePublicationCount: Scalars["Int"]["output"]

    description: Scalars["String"]["output"]

    descriptionHtml: Scalars["HTML"]["output"]

    feedback?: Maybe<ResourceFeedback>

    handle: Scalars["String"]["output"]

    hasProduct: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    products: ProductConnection

    productsCount: Scalars["Int"]["output"]

    publicationCount: Scalars["Int"]["output"]
    /**
     * The channels where the collection is published.
     * @deprecated Use `resourcePublications` instead.
     */
    publications: CollectionPublicationConnection
    /**
     * Check to see whether the resource is published to a given channel.
     * @deprecated Use `publishedOnPublication` instead.
     */
    publishedOnChannel: Scalars["Boolean"]["output"]
    /**
     * Check to see whether the resource is published to the calling app's channel.
     * @deprecated Use `publishedOnCurrentPublication` instead.
     */
    publishedOnCurrentChannel: Scalars["Boolean"]["output"]

    publishedOnCurrentPublication: Scalars["Boolean"]["output"]

    publishedOnPublication: Scalars["Boolean"]["output"]

    resourcePublications: ResourcePublicationConnection

    resourcePublicationsV2: ResourcePublicationV2Connection

    ruleSet?: Maybe<CollectionRuleSet>

    seo: Seo

    sortOrder: CollectionSortOrder
    /**
     * The Storefront GraphQL API ID of the `Collection`.
     *
     * As of the `2022-04` version release, the Storefront GraphQL API will no longer return Base64 encoded IDs to match the behavior of the Admin GraphQL API. Therefore, you can safely use the `id` field's value instead.
     *
     * @deprecated Use `id` instead.
     */
    storefrontId: Scalars["StorefrontID"]["output"]

    templateSuffix?: Maybe<Scalars["String"]["output"]>

    title: Scalars["String"]["output"]

    translations: Array<Translation>
    /**
     * The list of channels that the resource is not published to.
     * @deprecated Use `unpublishedPublications` instead.
     */
    unpublishedChannels: ChannelConnection

    unpublishedPublications: PublicationConnection

    updatedAt: Scalars["DateTime"]["output"]
  }

export type CollectionDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars["Int"]["input"]>
}

export type CollectionHasProductArgs = {
  id: Scalars["ID"]["input"]
}

export type CollectionMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CollectionMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type CollectionMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type CollectionPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductCollectionSortKeys>
}

export type CollectionPublicationCountArgs = {
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionPublishedOnChannelArgs = {
  channelId: Scalars["ID"]["input"]
}

export type CollectionPublishedOnPublicationArgs = {
  publicationId: Scalars["ID"]["input"]
}

export type CollectionResourcePublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionResourcePublicationsV2Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  catalogType?: InputMaybe<CatalogType>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CollectionUnpublishedChannelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionUnpublishedPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CollectionAddProductsPayload = {
  __typename?: "CollectionAddProductsPayload"

  collection?: Maybe<Collection>

  userErrors: Array<UserError>
}

export type CollectionAddProductsV2Payload = {
  __typename?: "CollectionAddProductsV2Payload"

  job?: Maybe<Job>

  userErrors: Array<CollectionAddProductsV2UserError>
}

export type CollectionAddProductsV2UserError = DisplayableError & {
  __typename?: "CollectionAddProductsV2UserError"

  code?: Maybe<CollectionAddProductsV2UserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CollectionAddProductsV2UserErrorCode {
  CantAddToSmartCollection = "CANT_ADD_TO_SMART_COLLECTION",

  CollectionDoesNotExist = "COLLECTION_DOES_NOT_EXIST",
}

export type CollectionConnection = {
  __typename?: "CollectionConnection"

  edges: Array<CollectionEdge>

  nodes: Array<Collection>

  pageInfo: PageInfo
}

export type CollectionCreatePayload = {
  __typename?: "CollectionCreatePayload"

  collection?: Maybe<Collection>

  userErrors: Array<UserError>
}

export type CollectionDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type CollectionDeletePayload = {
  __typename?: "CollectionDeletePayload"

  deletedCollectionId?: Maybe<Scalars["ID"]["output"]>

  shop: Shop

  userErrors: Array<UserError>
}

export type CollectionEdge = {
  __typename?: "CollectionEdge"

  cursor: Scalars["String"]["output"]

  node: Collection
}

export type CollectionInput = {
  descriptionHtml?: InputMaybe<Scalars["String"]["input"]>

  handle?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  image?: InputMaybe<ImageInput>

  metafields?: InputMaybe<Array<MetafieldInput>>

  products?: InputMaybe<Array<Scalars["ID"]["input"]>>

  redirectNewHandle?: InputMaybe<Scalars["Boolean"]["input"]>

  ruleSet?: InputMaybe<CollectionRuleSetInput>

  seo?: InputMaybe<SeoInput>

  sortOrder?: InputMaybe<CollectionSortOrder>

  templateSuffix?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type CollectionPublication = {
  __typename?: "CollectionPublication"
  /**
   * The channel where the collection will be published.
   * @deprecated Use `publication` instead.
   */
  channel: Channel

  collection: Collection

  isPublished: Scalars["Boolean"]["output"]

  publication: Publication

  publishDate: Scalars["DateTime"]["output"]
}

export type CollectionPublicationConnection = {
  __typename?: "CollectionPublicationConnection"

  edges: Array<CollectionPublicationEdge>

  nodes: Array<CollectionPublication>

  pageInfo: PageInfo
}

export type CollectionPublicationEdge = {
  __typename?: "CollectionPublicationEdge"

  cursor: Scalars["String"]["output"]

  node: CollectionPublication
}

export type CollectionPublicationInput = {
  publicationId?: InputMaybe<Scalars["ID"]["input"]>
}

export type CollectionPublishInput = {
  collectionPublications: Array<CollectionPublicationInput>

  id: Scalars["ID"]["input"]
}

export type CollectionPublishPayload = {
  __typename?: "CollectionPublishPayload"

  collection?: Maybe<Collection>

  collectionPublications?: Maybe<Array<CollectionPublication>>

  shop: Shop

  userErrors: Array<UserError>
}

export type CollectionRemoveProductsPayload = {
  __typename?: "CollectionRemoveProductsPayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type CollectionReorderProductsPayload = {
  __typename?: "CollectionReorderProductsPayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type CollectionRule = {
  __typename?: "CollectionRule"

  column: CollectionRuleColumn

  condition: Scalars["String"]["output"]

  conditionObject?: Maybe<CollectionRuleConditionObject>

  relation: CollectionRuleRelation
}

export enum CollectionRuleColumn {
  IsPriceReduced = "IS_PRICE_REDUCED",

  ProductMetafieldDefinition = "PRODUCT_METAFIELD_DEFINITION",

  ProductTaxonomyNodeId = "PRODUCT_TAXONOMY_NODE_ID",

  Tag = "TAG",

  Title = "TITLE",

  Type = "TYPE",

  VariantCompareAtPrice = "VARIANT_COMPARE_AT_PRICE",

  VariantInventory = "VARIANT_INVENTORY",

  VariantMetafieldDefinition = "VARIANT_METAFIELD_DEFINITION",

  VariantPrice = "VARIANT_PRICE",

  VariantTitle = "VARIANT_TITLE",

  VariantWeight = "VARIANT_WEIGHT",

  Vendor = "VENDOR",
}

export type CollectionRuleConditionObject =
  | CollectionRuleMetafieldCondition
  | CollectionRuleProductCategoryCondition
  | CollectionRuleTextCondition

export type CollectionRuleConditions = {
  __typename?: "CollectionRuleConditions"

  allowedRelations: Array<CollectionRuleRelation>

  defaultRelation: CollectionRuleRelation

  ruleObject?: Maybe<CollectionRuleConditionsRuleObject>

  ruleType: CollectionRuleColumn
}

export type CollectionRuleConditionsRuleObject = CollectionRuleMetafieldCondition

export type CollectionRuleInput = {
  column: CollectionRuleColumn

  condition: Scalars["String"]["input"]

  conditionObjectId?: InputMaybe<Scalars["ID"]["input"]>

  relation: CollectionRuleRelation
}

export type CollectionRuleMetafieldCondition = {
  __typename?: "CollectionRuleMetafieldCondition"

  metafieldDefinition: MetafieldDefinition
}

export type CollectionRuleProductCategoryCondition = {
  __typename?: "CollectionRuleProductCategoryCondition"

  value: ProductTaxonomyNode
}

export enum CollectionRuleRelation {
  Contains = "CONTAINS",

  EndsWith = "ENDS_WITH",

  Equals = "EQUALS",

  GreaterThan = "GREATER_THAN",

  IsNotSet = "IS_NOT_SET",

  IsSet = "IS_SET",

  LessThan = "LESS_THAN",

  NotContains = "NOT_CONTAINS",

  NotEquals = "NOT_EQUALS",

  StartsWith = "STARTS_WITH",
}

export type CollectionRuleSet = {
  __typename?: "CollectionRuleSet"

  appliedDisjunctively: Scalars["Boolean"]["output"]

  rules: Array<CollectionRule>
}

export type CollectionRuleSetInput = {
  appliedDisjunctively: Scalars["Boolean"]["input"]

  rules?: InputMaybe<Array<CollectionRuleInput>>
}

export type CollectionRuleTextCondition = {
  __typename?: "CollectionRuleTextCondition"

  value: Scalars["String"]["output"]
}

export enum CollectionSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export enum CollectionSortOrder {
  AlphaAsc = "ALPHA_ASC",

  AlphaDesc = "ALPHA_DESC",

  BestSelling = "BEST_SELLING",

  Created = "CREATED",

  CreatedDesc = "CREATED_DESC",

  Manual = "MANUAL",

  PriceAsc = "PRICE_ASC",

  PriceDesc = "PRICE_DESC",
}

export type CollectionUnpublishInput = {
  collectionPublications: Array<CollectionPublicationInput>

  id: Scalars["ID"]["input"]
}

export type CollectionUnpublishPayload = {
  __typename?: "CollectionUnpublishPayload"

  collection?: Maybe<Collection>

  shop: Shop

  userErrors: Array<UserError>
}

export type CollectionUpdatePayload = {
  __typename?: "CollectionUpdatePayload"

  collection?: Maybe<Collection>

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type CommentEvent = Event &
  Node & {
    __typename?: "CommentEvent"

    appTitle?: Maybe<Scalars["String"]["output"]>

    attachments: Array<CommentEventAttachment>

    attributeToApp: Scalars["Boolean"]["output"]

    attributeToUser: Scalars["Boolean"]["output"]

    author: StaffMember

    canDelete: Scalars["Boolean"]["output"]

    canEdit: Scalars["Boolean"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    criticalAlert: Scalars["Boolean"]["output"]

    edited: Scalars["Boolean"]["output"]

    embed?: Maybe<CommentEventEmbed>

    id: Scalars["ID"]["output"]

    message: Scalars["FormattedString"]["output"]

    rawMessage: Scalars["String"]["output"]

    subject: CommentEventSubject
  }

export type CommentEventAttachment = {
  __typename?: "CommentEventAttachment"

  fileExtension?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  name: Scalars["String"]["output"]

  size: Scalars["Int"]["output"]

  url: Scalars["URL"]["output"]
}

export type CommentEventEmbed = Customer | DraftOrder | Order | Product | ProductVariant

export type CommentEventSubject = {
  hasTimelineComment: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]
}

export type CompaniesDeletePayload = {
  __typename?: "CompaniesDeletePayload"

  deletedCompanyIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<BusinessCustomerUserError>
}

export type Company = CommentEventSubject &
  HasEvents &
  HasMetafieldDefinitions &
  HasMetafields &
  Navigable &
  Node & {
    __typename?: "Company"

    contactCount: Scalars["Int"]["output"]

    contactRoles: CompanyContactRoleConnection

    contacts: CompanyContactConnection

    createdAt: Scalars["DateTime"]["output"]

    customerSince: Scalars["DateTime"]["output"]

    defaultCursor: Scalars["String"]["output"]

    defaultRole?: Maybe<CompanyContactRole>

    draftOrders: DraftOrderConnection

    events: EventConnection

    externalId?: Maybe<Scalars["String"]["output"]>

    hasTimelineComment: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    lifetimeDuration: Scalars["String"]["output"]

    locationCount: Scalars["Int"]["output"]

    locations: CompanyLocationConnection

    mainContact?: Maybe<CompanyContact>

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    name: Scalars["String"]["output"]

    note?: Maybe<Scalars["String"]["output"]>

    orderCount: Scalars["Int"]["output"]

    orders: OrderConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    totalSpent: MoneyV2

    updatedAt: Scalars["DateTime"]["output"]
  }

export type CompanyContactRolesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyContactRoleSortKeys>
}

export type CompanyContactsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyContactSortKeys>
}

export type CompanyDraftOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DraftOrderSortKeys>
}

export type CompanyEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type CompanyLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyLocationSortKeys>
}

export type CompanyMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CompanyMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type CompanyMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CompanyOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type CompanyPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type CompanyPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CompanyAddress = Node & {
  __typename?: "CompanyAddress"

  address1: Scalars["String"]["output"]

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  companyName: Scalars["String"]["output"]

  country?: Maybe<Scalars["String"]["output"]>

  countryCode: CountryCode

  createdAt: Scalars["DateTime"]["output"]

  firstName?: Maybe<Scalars["String"]["output"]>

  formattedAddress: Array<Scalars["String"]["output"]>

  formattedArea?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  lastName?: Maybe<Scalars["String"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  recipient?: Maybe<Scalars["String"]["output"]>

  updatedAt: Scalars["DateTime"]["output"]

  zip?: Maybe<Scalars["String"]["output"]>

  zoneCode?: Maybe<Scalars["String"]["output"]>
}

export type CompanyAddressFormattedAddressArgs = {
  withCompanyName?: InputMaybe<Scalars["Boolean"]["input"]>
  withName?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CompanyAddressDeletePayload = {
  __typename?: "CompanyAddressDeletePayload"

  deletedAddressId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyAddressInput = {
  address1?: InputMaybe<Scalars["String"]["input"]>

  address2?: InputMaybe<Scalars["String"]["input"]>

  city?: InputMaybe<Scalars["String"]["input"]>

  countryCode?: InputMaybe<CountryCode>

  firstName?: InputMaybe<Scalars["String"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  recipient?: InputMaybe<Scalars["String"]["input"]>

  zip?: InputMaybe<Scalars["String"]["input"]>

  zoneCode?: InputMaybe<Scalars["String"]["input"]>
}

export enum CompanyAddressType {
  Billing = "BILLING",

  Shipping = "SHIPPING",
}

export type CompanyAssignCustomerAsContactPayload = {
  __typename?: "CompanyAssignCustomerAsContactPayload"

  companyContact?: Maybe<CompanyContact>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyAssignMainContactPayload = {
  __typename?: "CompanyAssignMainContactPayload"

  company?: Maybe<Company>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyConnection = {
  __typename?: "CompanyConnection"

  edges: Array<CompanyEdge>

  nodes: Array<Company>

  pageInfo: PageInfo
}

export type CompanyContact = Node & {
  __typename?: "CompanyContact"

  company: Company

  createdAt: Scalars["DateTime"]["output"]

  customer: Customer

  draftOrders: DraftOrderConnection

  id: Scalars["ID"]["output"]

  isMainContact: Scalars["Boolean"]["output"]

  lifetimeDuration: Scalars["String"]["output"]

  locale?: Maybe<Scalars["String"]["output"]>

  orders: OrderConnection

  roleAssignments: CompanyContactRoleAssignmentConnection

  title?: Maybe<Scalars["String"]["output"]>

  updatedAt: Scalars["DateTime"]["output"]
}

export type CompanyContactDraftOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DraftOrderSortKeys>
}

export type CompanyContactOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type CompanyContactRoleAssignmentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyContactRoleAssignmentSortKeys>
}

export type CompanyContactAssignRolePayload = {
  __typename?: "CompanyContactAssignRolePayload"

  companyContactRoleAssignment?: Maybe<CompanyContactRoleAssignment>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactAssignRolesPayload = {
  __typename?: "CompanyContactAssignRolesPayload"

  roleAssignments?: Maybe<Array<CompanyContactRoleAssignment>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactConnection = {
  __typename?: "CompanyContactConnection"

  edges: Array<CompanyContactEdge>

  nodes: Array<CompanyContact>

  pageInfo: PageInfo
}

export type CompanyContactCreatePayload = {
  __typename?: "CompanyContactCreatePayload"

  companyContact?: Maybe<CompanyContact>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactDeletePayload = {
  __typename?: "CompanyContactDeletePayload"

  deletedCompanyContactId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactEdge = {
  __typename?: "CompanyContactEdge"

  cursor: Scalars["String"]["output"]

  node: CompanyContact
}

export type CompanyContactInput = {
  email?: InputMaybe<Scalars["String"]["input"]>

  firstName?: InputMaybe<Scalars["String"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  locale?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type CompanyContactRemoveFromCompanyPayload = {
  __typename?: "CompanyContactRemoveFromCompanyPayload"

  removedCompanyContactId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactRevokeRolePayload = {
  __typename?: "CompanyContactRevokeRolePayload"

  revokedCompanyContactRoleAssignmentId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactRevokeRolesPayload = {
  __typename?: "CompanyContactRevokeRolesPayload"

  revokedRoleAssignmentIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactRole = Node & {
  __typename?: "CompanyContactRole"

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  note?: Maybe<Scalars["String"]["output"]>
}

export type CompanyContactRoleAssign = {
  companyContactRoleId: Scalars["ID"]["input"]

  companyLocationId: Scalars["ID"]["input"]
}

export type CompanyContactRoleAssignment = Node & {
  __typename?: "CompanyContactRoleAssignment"

  company: Company

  companyContact: CompanyContact

  companyLocation: CompanyLocation

  createdAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  role: CompanyContactRole

  updatedAt: Scalars["DateTime"]["output"]
}

export type CompanyContactRoleAssignmentConnection = {
  __typename?: "CompanyContactRoleAssignmentConnection"

  edges: Array<CompanyContactRoleAssignmentEdge>

  nodes: Array<CompanyContactRoleAssignment>

  pageInfo: PageInfo
}

export type CompanyContactRoleAssignmentEdge = {
  __typename?: "CompanyContactRoleAssignmentEdge"

  cursor: Scalars["String"]["output"]

  node: CompanyContactRoleAssignment
}

export enum CompanyContactRoleAssignmentSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  LocationName = "LOCATION_NAME",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export type CompanyContactRoleConnection = {
  __typename?: "CompanyContactRoleConnection"

  edges: Array<CompanyContactRoleEdge>

  nodes: Array<CompanyContactRole>

  pageInfo: PageInfo
}

export type CompanyContactRoleEdge = {
  __typename?: "CompanyContactRoleEdge"

  cursor: Scalars["String"]["output"]

  node: CompanyContactRole
}

export enum CompanyContactRoleSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export type CompanyContactSendWelcomeEmailPayload = {
  __typename?: "CompanyContactSendWelcomeEmailPayload"

  companyContact?: Maybe<CompanyContact>

  userErrors: Array<BusinessCustomerUserError>
}

export enum CompanyContactSortKeys {
  CompanyId = "COMPANY_ID",

  CreatedAt = "CREATED_AT",

  Email = "EMAIL",

  Id = "ID",

  Name = "NAME",

  NameEmail = "NAME_EMAIL",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export type CompanyContactUpdatePayload = {
  __typename?: "CompanyContactUpdatePayload"

  companyContact?: Maybe<CompanyContact>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyContactsDeletePayload = {
  __typename?: "CompanyContactsDeletePayload"

  deletedCompanyContactIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyCreateInput = {
  company: CompanyInput

  companyContact?: InputMaybe<CompanyContactInput>

  companyLocation?: InputMaybe<CompanyLocationInput>
}

export type CompanyCreatePayload = {
  __typename?: "CompanyCreatePayload"

  company?: Maybe<Company>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyDeletePayload = {
  __typename?: "CompanyDeletePayload"

  deletedCompanyId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyEdge = {
  __typename?: "CompanyEdge"

  cursor: Scalars["String"]["output"]

  node: Company
}

export type CompanyInput = {
  customerSince?: InputMaybe<Scalars["DateTime"]["input"]>

  externalId?: InputMaybe<Scalars["String"]["input"]>

  name?: InputMaybe<Scalars["String"]["input"]>

  note?: InputMaybe<Scalars["String"]["input"]>
}

export type CompanyLocation = CommentEventSubject &
  HasEvents &
  HasMetafieldDefinitions &
  HasMetafields &
  Navigable &
  Node & {
    __typename?: "CompanyLocation"

    billingAddress?: Maybe<CompanyAddress>

    buyerExperienceConfiguration?: Maybe<BuyerExperienceConfiguration>

    catalogs: CatalogConnection

    company: Company

    createdAt: Scalars["DateTime"]["output"]

    currency: CurrencyCode

    defaultCursor: Scalars["String"]["output"]

    draftOrders: DraftOrderConnection

    events: EventConnection

    externalId?: Maybe<Scalars["String"]["output"]>

    hasTimelineComment: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    inCatalog: Scalars["Boolean"]["output"]

    locale?: Maybe<Scalars["String"]["output"]>

    market: Market

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    name: Scalars["String"]["output"]

    note?: Maybe<Scalars["String"]["output"]>

    orderCount: Scalars["Int"]["output"]

    orders: OrderConnection

    phone?: Maybe<Scalars["String"]["output"]>
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    roleAssignments: CompanyContactRoleAssignmentConnection

    shippingAddress?: Maybe<CompanyAddress>

    taxExemptions: Array<TaxExemption>

    taxRegistrationId?: Maybe<Scalars["String"]["output"]>

    totalSpent: MoneyV2

    updatedAt: Scalars["DateTime"]["output"]
  }

export type CompanyLocationCatalogsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CompanyLocationDraftOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DraftOrderSortKeys>
}

export type CompanyLocationEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type CompanyLocationInCatalogArgs = {
  catalogId: Scalars["ID"]["input"]
}

export type CompanyLocationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CompanyLocationMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type CompanyLocationMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CompanyLocationOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type CompanyLocationPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type CompanyLocationPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CompanyLocationRoleAssignmentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyContactRoleAssignmentSortKeys>
}

export type CompanyLocationAssignAddressPayload = {
  __typename?: "CompanyLocationAssignAddressPayload"

  addresses?: Maybe<Array<CompanyAddress>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationAssignRolesPayload = {
  __typename?: "CompanyLocationAssignRolesPayload"

  roleAssignments?: Maybe<Array<CompanyContactRoleAssignment>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationAssignTaxExemptionsPayload = {
  __typename?: "CompanyLocationAssignTaxExemptionsPayload"

  companyLocation?: Maybe<CompanyLocation>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationCatalog = Catalog &
  Node & {
    __typename?: "CompanyLocationCatalog"

    companyLocations: CompanyLocationConnection

    companyLocationsCount: Scalars["Int"]["output"]

    id: Scalars["ID"]["output"]

    operations: Array<ResourceOperation>

    priceList?: Maybe<PriceList>

    publication?: Maybe<Publication>

    status: CatalogStatus

    title: Scalars["String"]["output"]
  }

export type CompanyLocationCatalogCompanyLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyLocationSortKeys>
}

export type CompanyLocationConnection = {
  __typename?: "CompanyLocationConnection"

  edges: Array<CompanyLocationEdge>

  nodes: Array<CompanyLocation>

  pageInfo: PageInfo
}

export type CompanyLocationCreatePayload = {
  __typename?: "CompanyLocationCreatePayload"

  companyLocation?: Maybe<CompanyLocation>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationCreateTaxRegistrationPayload = {
  __typename?: "CompanyLocationCreateTaxRegistrationPayload"

  companyLocation?: Maybe<CompanyLocation>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationDeletePayload = {
  __typename?: "CompanyLocationDeletePayload"

  deletedCompanyLocationId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationEdge = {
  __typename?: "CompanyLocationEdge"

  cursor: Scalars["String"]["output"]

  node: CompanyLocation
}

export type CompanyLocationInput = {
  billingAddress?: InputMaybe<CompanyAddressInput>

  billingSameAsShipping?: InputMaybe<Scalars["Boolean"]["input"]>

  buyerExperienceConfiguration?: InputMaybe<BuyerExperienceConfigurationInput>

  externalId?: InputMaybe<Scalars["String"]["input"]>

  locale?: InputMaybe<Scalars["String"]["input"]>

  name?: InputMaybe<Scalars["String"]["input"]>

  note?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  shippingAddress?: InputMaybe<CompanyAddressInput>

  taxExemptions?: InputMaybe<Array<TaxExemption>>

  taxRegistrationId?: InputMaybe<Scalars["String"]["input"]>
}

export type CompanyLocationRevokeRolesPayload = {
  __typename?: "CompanyLocationRevokeRolesPayload"

  revokedRoleAssignmentIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationRevokeTaxExemptionsPayload = {
  __typename?: "CompanyLocationRevokeTaxExemptionsPayload"

  companyLocation?: Maybe<CompanyLocation>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationRevokeTaxRegistrationPayload = {
  __typename?: "CompanyLocationRevokeTaxRegistrationPayload"

  companyLocation?: Maybe<CompanyLocation>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationRoleAssign = {
  companyContactId: Scalars["ID"]["input"]

  companyContactRoleId: Scalars["ID"]["input"]
}

export enum CompanyLocationSortKeys {
  CompanyAndLocationName = "COMPANY_AND_LOCATION_NAME",

  CompanyId = "COMPANY_ID",

  CreatedAt = "CREATED_AT",

  Id = "ID",

  Name = "NAME",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export type CompanyLocationUpdateInput = {
  buyerExperienceConfiguration?: InputMaybe<BuyerExperienceConfigurationInput>

  externalId?: InputMaybe<Scalars["String"]["input"]>

  locale?: InputMaybe<Scalars["String"]["input"]>

  name?: InputMaybe<Scalars["String"]["input"]>

  note?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>
}

export type CompanyLocationUpdatePayload = {
  __typename?: "CompanyLocationUpdatePayload"

  companyLocation?: Maybe<CompanyLocation>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyLocationsDeletePayload = {
  __typename?: "CompanyLocationsDeletePayload"

  deletedCompanyLocationIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<BusinessCustomerUserError>
}

export type CompanyRevokeMainContactPayload = {
  __typename?: "CompanyRevokeMainContactPayload"

  company?: Maybe<Company>

  userErrors: Array<BusinessCustomerUserError>
}

export enum CompanySortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Name = "NAME",

  OrderCount = "ORDER_COUNT",

  Relevance = "RELEVANCE",

  SinceDate = "SINCE_DATE",

  TotalSpent = "TOTAL_SPENT",

  UpdatedAt = "UPDATED_AT",
}

export type CompanyUpdatePayload = {
  __typename?: "CompanyUpdatePayload"

  company?: Maybe<Company>

  userErrors: Array<BusinessCustomerUserError>
}

export type ContextualPricingContext = {
  companyLocationId?: InputMaybe<Scalars["ID"]["input"]>

  country?: InputMaybe<CountryCode>
}

export type ContextualPublicationContext = {
  companyLocationId?: InputMaybe<Scalars["ID"]["input"]>

  country?: InputMaybe<CountryCode>
}

export type CountriesInShippingZones = {
  __typename?: "CountriesInShippingZones"

  countryCodes: Array<CountryCode>

  includeRestOfWorld: Scalars["Boolean"]["output"]
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

export type CountryHarmonizedSystemCode = {
  __typename?: "CountryHarmonizedSystemCode"

  countryCode: CountryCode

  harmonizedSystemCode: Scalars["String"]["output"]
}

export type CountryHarmonizedSystemCodeConnection = {
  __typename?: "CountryHarmonizedSystemCodeConnection"

  edges: Array<CountryHarmonizedSystemCodeEdge>

  nodes: Array<CountryHarmonizedSystemCode>

  pageInfo: PageInfo
}

export type CountryHarmonizedSystemCodeEdge = {
  __typename?: "CountryHarmonizedSystemCodeEdge"

  cursor: Scalars["String"]["output"]

  node: CountryHarmonizedSystemCode
}

export type CountryHarmonizedSystemCodeInput = {
  countryCode: CountryCode

  harmonizedSystemCode: Scalars["String"]["input"]
}

export type CreateMediaInput = {
  alt?: InputMaybe<Scalars["String"]["input"]>

  mediaContentType: MediaContentType

  originalSource: Scalars["String"]["input"]
}

export enum CropRegion {
  Bottom = "BOTTOM",

  Center = "CENTER",

  Left = "LEFT",

  Right = "RIGHT",

  Top = "TOP",
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

export type CurrencyFormats = {
  __typename?: "CurrencyFormats"

  moneyFormat: Scalars["FormattedString"]["output"]

  moneyInEmailsFormat: Scalars["String"]["output"]

  moneyWithCurrencyFormat: Scalars["FormattedString"]["output"]

  moneyWithCurrencyInEmailsFormat: Scalars["String"]["output"]
}

export type CurrencySetting = {
  __typename?: "CurrencySetting"

  currencyCode: CurrencyCode

  currencyName: Scalars["String"]["output"]

  enabled: Scalars["Boolean"]["output"]

  rateUpdatedAt?: Maybe<Scalars["DateTime"]["output"]>
}

export type CurrencySettingConnection = {
  __typename?: "CurrencySettingConnection"

  edges: Array<CurrencySettingEdge>

  nodes: Array<CurrencySetting>

  pageInfo: PageInfo
}

export type CurrencySettingEdge = {
  __typename?: "CurrencySettingEdge"

  cursor: Scalars["String"]["output"]

  node: CurrencySetting
}

export type CustomShippingPackageInput = {
  default?: InputMaybe<Scalars["Boolean"]["input"]>

  dimensions?: InputMaybe<ObjectDimensionsInput>

  name?: InputMaybe<Scalars["String"]["input"]>

  type?: InputMaybe<ShippingPackageType>

  weight?: InputMaybe<WeightInput>
}

export type Customer = CommentEventSubject &
  HasEvents &
  HasMetafieldDefinitions &
  HasMetafields &
  LegacyInteroperability &
  Node & {
    __typename?: "Customer"

    addresses: Array<MailingAddress>

    amountSpent: MoneyV2

    canDelete: Scalars["Boolean"]["output"]

    companyContactProfiles: Array<CompanyContact>

    createdAt: Scalars["DateTime"]["output"]

    defaultAddress?: Maybe<MailingAddress>

    displayName: Scalars["String"]["output"]

    email?: Maybe<Scalars["String"]["output"]>

    emailMarketingConsent?: Maybe<CustomerEmailMarketingConsentState>

    events: EventConnection

    firstName?: Maybe<Scalars["String"]["output"]>
    /**
     * Whether the merchant has added timeline comments about the customer on the customer's page.
     * @deprecated To query for comments on the timeline, use the events connection and a `query` argument containing `verb:comment`, or look for a `CommentEvent` in the `__typename` of events.
     */
    hasTimelineComment: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    image: Image

    lastName?: Maybe<Scalars["String"]["output"]>

    lastOrder?: Maybe<Order>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    lifetimeDuration: Scalars["String"]["output"]

    locale: Scalars["String"]["output"]

    market?: Maybe<Market>

    mergeable: CustomerMergeable

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    multipassIdentifier?: Maybe<Scalars["String"]["output"]>

    note?: Maybe<Scalars["String"]["output"]>

    numberOfOrders: Scalars["UnsignedInt64"]["output"]

    orders: OrderConnection

    paymentMethods: CustomerPaymentMethodConnection

    phone?: Maybe<Scalars["String"]["output"]>
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    productSubscriberStatus: CustomerProductSubscriberStatus

    smsMarketingConsent?: Maybe<CustomerSmsMarketingConsentState>

    state: CustomerState

    statistics: CustomerStatistics

    subscriptionContracts: SubscriptionContractConnection

    tags: Array<Scalars["String"]["output"]>

    taxExempt: Scalars["Boolean"]["output"]

    taxExemptions: Array<TaxExemption>

    unsubscribeUrl: Scalars["URL"]["output"]

    updatedAt: Scalars["DateTime"]["output"]

    validEmailAddress: Scalars["Boolean"]["output"]

    verifiedEmail: Scalars["Boolean"]["output"]
  }

export type CustomerAddressesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type CustomerEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type CustomerMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomerMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type CustomerMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
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

export type CustomerPaymentMethodsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  showRevoked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type CustomerPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerAccountsV2 = {
  __typename?: "CustomerAccountsV2"

  customerAccountsVersion: CustomerAccountsVersion

  loginLinksVisibleOnStorefrontAndCheckout: Scalars["Boolean"]["output"]

  loginRequiredAtCheckout: Scalars["Boolean"]["output"]

  url?: Maybe<Scalars["URL"]["output"]>
}

export enum CustomerAccountsVersion {
  Classic = "CLASSIC",

  NewCustomerAccounts = "NEW_CUSTOMER_ACCOUNTS",
}

export type CustomerAddTaxExemptionsPayload = {
  __typename?: "CustomerAddTaxExemptionsPayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export enum CustomerCancelDataErasureErrorCode {
  DoesNotExist = "DOES_NOT_EXIST",

  FailedToCancel = "FAILED_TO_CANCEL",

  NotBeingErased = "NOT_BEING_ERASED",
}

export type CustomerCancelDataErasurePayload = {
  __typename?: "CustomerCancelDataErasurePayload"

  customerId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<CustomerCancelDataErasureUserError>
}

export type CustomerCancelDataErasureUserError = DisplayableError & {
  __typename?: "CustomerCancelDataErasureUserError"

  code?: Maybe<CustomerCancelDataErasureErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type CustomerConnection = {
  __typename?: "CustomerConnection"

  edges: Array<CustomerEdge>

  nodes: Array<Customer>

  pageInfo: PageInfo
}

export enum CustomerConsentCollectedFrom {
  Other = "OTHER",

  Shopify = "SHOPIFY",
}

export type CustomerCreatePayload = {
  __typename?: "CustomerCreatePayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export type CustomerCreditCard = {
  __typename?: "CustomerCreditCard"

  billingAddress?: Maybe<CustomerCreditCardBillingAddress>

  brand: Scalars["String"]["output"]

  expiresSoon: Scalars["Boolean"]["output"]

  expiryMonth: Scalars["Int"]["output"]

  expiryYear: Scalars["Int"]["output"]

  firstDigits?: Maybe<Scalars["String"]["output"]>

  isRevocable: Scalars["Boolean"]["output"]

  lastDigits: Scalars["String"]["output"]

  maskedNumber: Scalars["String"]["output"]

  name: Scalars["String"]["output"]

  source?: Maybe<Scalars["String"]["output"]>

  virtualLastDigits?: Maybe<Scalars["String"]["output"]>
}

export type CustomerCreditCardBillingAddress = {
  __typename?: "CustomerCreditCardBillingAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  countryCode?: Maybe<CountryCode>

  firstName?: Maybe<Scalars["String"]["output"]>

  lastName?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type CustomerDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type CustomerDeletePayload = {
  __typename?: "CustomerDeletePayload"

  deletedCustomerId?: Maybe<Scalars["ID"]["output"]>

  shop: Shop

  userErrors: Array<UserError>
}

export type CustomerEdge = {
  __typename?: "CustomerEdge"

  cursor: Scalars["String"]["output"]

  node: Customer
}

export type CustomerEmailAddress = {
  __typename?: "CustomerEmailAddress"

  emailAddress: Scalars["String"]["output"]

  marketingState: CustomerEmailAddressMarketingState

  marketingUnsubscribeUrl: Scalars["URL"]["output"]

  openTrackingLevel: CustomerEmailAddressOpenTrackingLevel

  openTrackingUrl: Scalars["URL"]["output"]
}

export enum CustomerEmailAddressMarketingState {
  Invalid = "INVALID",

  NotSubscribed = "NOT_SUBSCRIBED",

  Pending = "PENDING",

  Subscribed = "SUBSCRIBED",

  Unsubscribed = "UNSUBSCRIBED",
}

export enum CustomerEmailAddressOpenTrackingLevel {
  OptedIn = "OPTED_IN",

  OptedOut = "OPTED_OUT",

  Unknown = "UNKNOWN",
}

export type CustomerEmailMarketingConsentInput = {
  consentUpdatedAt?: InputMaybe<Scalars["DateTime"]["input"]>

  marketingOptInLevel?: InputMaybe<CustomerMarketingOptInLevel>

  marketingState: CustomerEmailMarketingState
}

export type CustomerEmailMarketingConsentState = {
  __typename?: "CustomerEmailMarketingConsentState"

  consentUpdatedAt?: Maybe<Scalars["DateTime"]["output"]>

  marketingOptInLevel?: Maybe<CustomerMarketingOptInLevel>

  marketingState: CustomerEmailMarketingState
}

export type CustomerEmailMarketingConsentUpdateInput = {
  customerId: Scalars["ID"]["input"]

  emailMarketingConsent: CustomerEmailMarketingConsentInput
}

export type CustomerEmailMarketingConsentUpdatePayload = {
  __typename?: "CustomerEmailMarketingConsentUpdatePayload"

  customer?: Maybe<Customer>

  userErrors: Array<CustomerEmailMarketingConsentUpdateUserError>
}

export type CustomerEmailMarketingConsentUpdateUserError = DisplayableError & {
  __typename?: "CustomerEmailMarketingConsentUpdateUserError"

  code?: Maybe<CustomerEmailMarketingConsentUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerEmailMarketingConsentUpdateUserErrorCode {
  Inclusion = "INCLUSION",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  MissingArgument = "MISSING_ARGUMENT",
}

export enum CustomerEmailMarketingState {
  Invalid = "INVALID",

  NotSubscribed = "NOT_SUBSCRIBED",

  Pending = "PENDING",

  Redacted = "REDACTED",

  Subscribed = "SUBSCRIBED",

  Unsubscribed = "UNSUBSCRIBED",
}

export type CustomerGenerateAccountActivationUrlPayload = {
  __typename?: "CustomerGenerateAccountActivationUrlPayload"

  accountActivationUrl?: Maybe<Scalars["URL"]["output"]>

  userErrors: Array<UserError>
}

export type CustomerInput = {
  addresses?: InputMaybe<Array<MailingAddressInput>>

  email?: InputMaybe<Scalars["String"]["input"]>

  emailMarketingConsent?: InputMaybe<CustomerEmailMarketingConsentInput>

  firstName?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  locale?: InputMaybe<Scalars["String"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  note?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  smsMarketingConsent?: InputMaybe<CustomerSmsMarketingConsentInput>

  tags?: InputMaybe<Array<Scalars["String"]["input"]>>

  taxExempt?: InputMaybe<Scalars["Boolean"]["input"]>

  taxExemptions?: InputMaybe<Array<TaxExemption>>
}

export type CustomerJourney = {
  __typename?: "CustomerJourney"

  customerOrderIndex: Scalars["Int"]["output"]

  daysToConversion: Scalars["Int"]["output"]

  firstVisit: CustomerVisit

  lastVisit?: Maybe<CustomerVisit>

  moments: Array<CustomerMoment>
}

export type CustomerJourneySummary = {
  __typename?: "CustomerJourneySummary"

  customerOrderIndex?: Maybe<Scalars["Int"]["output"]>

  daysToConversion?: Maybe<Scalars["Int"]["output"]>

  firstVisit?: Maybe<CustomerVisit>

  lastVisit?: Maybe<CustomerVisit>

  moments?: Maybe<CustomerMomentConnection>

  momentsCount?: Maybe<Scalars["Int"]["output"]>

  ready: Scalars["Boolean"]["output"]
}

export type CustomerJourneySummaryMomentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export enum CustomerMarketingOptInLevel {
  ConfirmedOptIn = "CONFIRMED_OPT_IN",

  SingleOptIn = "SINGLE_OPT_IN",

  Unknown = "UNKNOWN",
}

export type CustomerMergeError = {
  __typename?: "CustomerMergeError"

  errorFields: Array<CustomerMergeErrorFieldType>

  message: Scalars["String"]["output"]
}

export enum CustomerMergeErrorCode {
  CustomerHasGiftCards = "CUSTOMER_HAS_GIFT_CARDS",

  InternalError = "INTERNAL_ERROR",

  InvalidCustomer = "INVALID_CUSTOMER",

  InvalidCustomerId = "INVALID_CUSTOMER_ID",

  MissingOverrideAttribute = "MISSING_OVERRIDE_ATTRIBUTE",

  OverrideAttributeInvalid = "OVERRIDE_ATTRIBUTE_INVALID",
}

export enum CustomerMergeErrorFieldType {
  CompanyContact = "COMPANY_CONTACT",

  CustomerPaymentMethods = "CUSTOMER_PAYMENT_METHODS",

  DeletedAt = "DELETED_AT",

  GiftCards = "GIFT_CARDS",

  MergeInProgress = "MERGE_IN_PROGRESS",

  MultipassIdentifier = "MULTIPASS_IDENTIFIER",

  PendingDataRequest = "PENDING_DATA_REQUEST",

  RedactedAt = "REDACTED_AT",

  Subscriptions = "SUBSCRIPTIONS",
}

export type CustomerMergeOverrideFields = {
  customerIdOfDefaultAddressToKeep?: InputMaybe<Scalars["ID"]["input"]>

  customerIdOfEmailToKeep?: InputMaybe<Scalars["ID"]["input"]>

  customerIdOfFirstNameToKeep?: InputMaybe<Scalars["ID"]["input"]>

  customerIdOfLastNameToKeep?: InputMaybe<Scalars["ID"]["input"]>

  customerIdOfPhoneNumberToKeep?: InputMaybe<Scalars["ID"]["input"]>

  note?: InputMaybe<Scalars["String"]["input"]>

  tags?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type CustomerMergePayload = {
  __typename?: "CustomerMergePayload"

  job?: Maybe<Job>

  resultingCustomerId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<CustomerMergeUserError>
}

export type CustomerMergePreview = {
  __typename?: "CustomerMergePreview"

  alternateFields?: Maybe<CustomerMergePreviewAlternateFields>

  blockingFields?: Maybe<CustomerMergePreviewBlockingFields>

  customerMergeErrors?: Maybe<Array<CustomerMergeError>>

  defaultFields?: Maybe<CustomerMergePreviewDefaultFields>

  resultingCustomerId?: Maybe<Scalars["ID"]["output"]>
}

export type CustomerMergePreviewAlternateFields = {
  __typename?: "CustomerMergePreviewAlternateFields"

  defaultAddress?: Maybe<MailingAddress>

  email?: Maybe<CustomerEmailAddress>

  firstName?: Maybe<Scalars["String"]["output"]>

  lastName?: Maybe<Scalars["String"]["output"]>

  phoneNumber?: Maybe<CustomerPhoneNumber>
}

export type CustomerMergePreviewBlockingFields = {
  __typename?: "CustomerMergePreviewBlockingFields"

  note?: Maybe<Scalars["String"]["output"]>

  tags: Array<Scalars["String"]["output"]>
}

export type CustomerMergePreviewDefaultFields = {
  __typename?: "CustomerMergePreviewDefaultFields"

  addresses: MailingAddressConnection

  defaultAddress?: Maybe<MailingAddress>

  discountNodeCount: Scalars["UnsignedInt64"]["output"]

  discountNodes: DiscountNodeConnection

  displayName: Scalars["String"]["output"]

  draftOrderCount: Scalars["UnsignedInt64"]["output"]

  draftOrders: DraftOrderConnection

  email?: Maybe<CustomerEmailAddress>

  firstName?: Maybe<Scalars["String"]["output"]>

  giftCardCount: Scalars["UnsignedInt64"]["output"]

  giftCards: GiftCardConnection

  lastName?: Maybe<Scalars["String"]["output"]>

  metafieldCount: Scalars["UnsignedInt64"]["output"]

  note?: Maybe<Scalars["String"]["output"]>

  orderCount: Scalars["UnsignedInt64"]["output"]

  orders: OrderConnection

  phoneNumber?: Maybe<CustomerPhoneNumber>

  tags: Array<Scalars["String"]["output"]>
}

export type CustomerMergePreviewDefaultFieldsAddressesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerMergePreviewDefaultFieldsDiscountNodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DiscountSortKeys>
}

export type CustomerMergePreviewDefaultFieldsDraftOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DraftOrderSortKeys>
}

export type CustomerMergePreviewDefaultFieldsGiftCardsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<GiftCardSortKeys>
}

export type CustomerMergePreviewDefaultFieldsOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type CustomerMergeRequest = {
  __typename?: "CustomerMergeRequest"

  customerMergeErrors: Array<CustomerMergeError>

  jobId?: Maybe<Scalars["ID"]["output"]>

  resultingCustomerId: Scalars["ID"]["output"]

  status: CustomerMergeRequestStatus
}

export enum CustomerMergeRequestStatus {
  Completed = "COMPLETED",

  Failed = "FAILED",

  InProgress = "IN_PROGRESS",

  Requested = "REQUESTED",
}

export type CustomerMergeUserError = DisplayableError & {
  __typename?: "CustomerMergeUserError"

  code?: Maybe<CustomerMergeErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type CustomerMergeable = {
  __typename?: "CustomerMergeable"

  errorFields: Array<CustomerMergeErrorFieldType>

  isMergeable: Scalars["Boolean"]["output"]

  mergeInProgress?: Maybe<CustomerMergeRequest>

  reason?: Maybe<Scalars["String"]["output"]>
}

export type CustomerMoment = {
  occurredAt: Scalars["DateTime"]["output"]
}

export type CustomerMomentConnection = {
  __typename?: "CustomerMomentConnection"

  edges: Array<CustomerMomentEdge>

  nodes: Array<CustomerMoment>

  pageInfo: PageInfo
}

export type CustomerMomentEdge = {
  __typename?: "CustomerMomentEdge"

  cursor: Scalars["String"]["output"]

  node: CustomerMoment
}

export type CustomerPaymentInstrument = CustomerCreditCard | CustomerPaypalBillingAgreement | CustomerShopPayAgreement

export type CustomerPaymentInstrumentBillingAddress = {
  __typename?: "CustomerPaymentInstrumentBillingAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  countryCode?: Maybe<CountryCode>

  name?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type CustomerPaymentMethod = Node & {
  __typename?: "CustomerPaymentMethod"

  customer?: Maybe<Customer>

  id: Scalars["ID"]["output"]

  instrument?: Maybe<CustomerPaymentInstrument>

  revokedAt?: Maybe<Scalars["DateTime"]["output"]>

  revokedReason?: Maybe<CustomerPaymentMethodRevocationReason>

  subscriptionContracts: SubscriptionContractConnection
}

export type CustomerPaymentMethodSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerPaymentMethodConnection = {
  __typename?: "CustomerPaymentMethodConnection"

  edges: Array<CustomerPaymentMethodEdge>

  nodes: Array<CustomerPaymentMethod>

  pageInfo: PageInfo
}

export type CustomerPaymentMethodCreateFromDuplicationDataPayload = {
  __typename?: "CustomerPaymentMethodCreateFromDuplicationDataPayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  userErrors: Array<CustomerPaymentMethodCreateFromDuplicationDataUserError>
}

export type CustomerPaymentMethodCreateFromDuplicationDataUserError = DisplayableError & {
  __typename?: "CustomerPaymentMethodCreateFromDuplicationDataUserError"

  code?: Maybe<CustomerPaymentMethodCreateFromDuplicationDataUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerPaymentMethodCreateFromDuplicationDataUserErrorCode {
  CustomerDoesNotExist = "CUSTOMER_DOES_NOT_EXIST",

  InvalidEncryptedDuplicationData = "INVALID_ENCRYPTED_DUPLICATION_DATA",

  TooManyRequests = "TOO_MANY_REQUESTS",
}

export type CustomerPaymentMethodCreditCardCreatePayload = {
  __typename?: "CustomerPaymentMethodCreditCardCreatePayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  processing?: Maybe<Scalars["Boolean"]["output"]>

  userErrors: Array<UserError>
}

export type CustomerPaymentMethodCreditCardUpdatePayload = {
  __typename?: "CustomerPaymentMethodCreditCardUpdatePayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  processing?: Maybe<Scalars["Boolean"]["output"]>

  userErrors: Array<UserError>
}

export type CustomerPaymentMethodEdge = {
  __typename?: "CustomerPaymentMethodEdge"

  cursor: Scalars["String"]["output"]

  node: CustomerPaymentMethod
}

export type CustomerPaymentMethodGetDuplicationDataPayload = {
  __typename?: "CustomerPaymentMethodGetDuplicationDataPayload"

  encryptedDuplicationData?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<CustomerPaymentMethodGetDuplicationDataUserError>
}

export type CustomerPaymentMethodGetDuplicationDataUserError = DisplayableError & {
  __typename?: "CustomerPaymentMethodGetDuplicationDataUserError"

  code?: Maybe<CustomerPaymentMethodGetDuplicationDataUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerPaymentMethodGetDuplicationDataUserErrorCode {
  CustomerDoesNotExist = "CUSTOMER_DOES_NOT_EXIST",

  InvalidInstrument = "INVALID_INSTRUMENT",

  InvalidOrganizationShop = "INVALID_ORGANIZATION_SHOP",

  PaymentMethodDoesNotExist = "PAYMENT_METHOD_DOES_NOT_EXIST",

  SameShop = "SAME_SHOP",

  TooManyRequests = "TOO_MANY_REQUESTS",
}

export type CustomerPaymentMethodGetUpdateUrlPayload = {
  __typename?: "CustomerPaymentMethodGetUpdateUrlPayload"

  updatePaymentMethodUrl?: Maybe<Scalars["URL"]["output"]>

  userErrors: Array<CustomerPaymentMethodGetUpdateUrlUserError>
}

export type CustomerPaymentMethodGetUpdateUrlUserError = DisplayableError & {
  __typename?: "CustomerPaymentMethodGetUpdateUrlUserError"

  code?: Maybe<CustomerPaymentMethodGetUpdateUrlUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerPaymentMethodGetUpdateUrlUserErrorCode {
  CustomerDoesNotExist = "CUSTOMER_DOES_NOT_EXIST",

  InvalidInstrument = "INVALID_INSTRUMENT",

  PaymentMethodDoesNotExist = "PAYMENT_METHOD_DOES_NOT_EXIST",

  TooManyRequests = "TOO_MANY_REQUESTS",
}

export type CustomerPaymentMethodPaypalBillingAgreementCreatePayload = {
  __typename?: "CustomerPaymentMethodPaypalBillingAgreementCreatePayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  userErrors: Array<CustomerPaymentMethodUserError>
}

export type CustomerPaymentMethodPaypalBillingAgreementUpdatePayload = {
  __typename?: "CustomerPaymentMethodPaypalBillingAgreementUpdatePayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  userErrors: Array<CustomerPaymentMethodUserError>
}

export type CustomerPaymentMethodRemoteCreatePayload = {
  __typename?: "CustomerPaymentMethodRemoteCreatePayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  userErrors: Array<CustomerPaymentMethodRemoteUserError>
}

export type CustomerPaymentMethodRemoteCreditCardCreatePayload = {
  __typename?: "CustomerPaymentMethodRemoteCreditCardCreatePayload"

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  userErrors: Array<CustomerPaymentMethodUserError>
}

export type CustomerPaymentMethodRemoteInput = {
  authorizeNetCustomerPaymentProfile?: InputMaybe<RemoteAuthorizeNetCustomerPaymentProfileInput>

  braintreePaymentMethod?: InputMaybe<RemoteBraintreePaymentMethodInput>

  stripePaymentMethod?: InputMaybe<RemoteStripePaymentMethodInput>
}

export type CustomerPaymentMethodRemoteUserError = DisplayableError & {
  __typename?: "CustomerPaymentMethodRemoteUserError"

  code?: Maybe<CustomerPaymentMethodRemoteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerPaymentMethodRemoteUserErrorCode {
  AuthorizeNetNotEnabledForSubscriptions = "AUTHORIZE_NET_NOT_ENABLED_FOR_SUBSCRIPTIONS",

  BraintreeNotEnabledForSubscriptions = "BRAINTREE_NOT_ENABLED_FOR_SUBSCRIPTIONS",

  ExactlyOneRemoteReferenceRequired = "EXACTLY_ONE_REMOTE_REFERENCE_REQUIRED",

  Invalid = "INVALID",

  Present = "PRESENT",

  Taken = "TAKEN",
}

export enum CustomerPaymentMethodRevocationReason {
  AuthorizeNetGatewayNotEnabled = "AUTHORIZE_NET_GATEWAY_NOT_ENABLED",

  AuthorizeNetReturnedNoPaymentMethod = "AUTHORIZE_NET_RETURNED_NO_PAYMENT_METHOD",

  BraintreeApiAuthenticationError = "BRAINTREE_API_AUTHENTICATION_ERROR",

  BraintreeGatewayNotEnabled = "BRAINTREE_GATEWAY_NOT_ENABLED",

  BraintreePaymentMethodNotCard = "BRAINTREE_PAYMENT_METHOD_NOT_CARD",

  BraintreeReturnedNoPaymentMethod = "BRAINTREE_RETURNED_NO_PAYMENT_METHOD",

  FailedToUpdateCreditCard = "FAILED_TO_UPDATE_CREDIT_CARD",

  ManuallyRevoked = "MANUALLY_REVOKED",

  Merged = "MERGED",

  StripeApiAuthenticationError = "STRIPE_API_AUTHENTICATION_ERROR",

  StripeApiInvalidRequestError = "STRIPE_API_INVALID_REQUEST_ERROR",

  StripeGatewayNotEnabled = "STRIPE_GATEWAY_NOT_ENABLED",

  StripePaymentMethodNotCard = "STRIPE_PAYMENT_METHOD_NOT_CARD",

  StripeReturnedNoPaymentMethod = "STRIPE_RETURNED_NO_PAYMENT_METHOD",
}

export type CustomerPaymentMethodRevokePayload = {
  __typename?: "CustomerPaymentMethodRevokePayload"

  revokedCustomerPaymentMethodId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type CustomerPaymentMethodSendUpdateEmailPayload = {
  __typename?: "CustomerPaymentMethodSendUpdateEmailPayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export type CustomerPaymentMethodUserError = DisplayableError & {
  __typename?: "CustomerPaymentMethodUserError"

  code?: Maybe<CustomerPaymentMethodUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerPaymentMethodUserErrorCode {
  Invalid = "INVALID",

  Present = "PRESENT",

  Taken = "TAKEN",
}

export type CustomerPaypalBillingAgreement = {
  __typename?: "CustomerPaypalBillingAgreement"

  billingAddress?: Maybe<CustomerPaymentInstrumentBillingAddress>

  inactive: Scalars["Boolean"]["output"]

  isRevocable: Scalars["Boolean"]["output"]

  paypalAccountEmail?: Maybe<Scalars["String"]["output"]>
}

export type CustomerPhoneNumber = {
  __typename?: "CustomerPhoneNumber"

  marketingState: CustomerSmsMarketingState

  phoneNumber: Scalars["String"]["output"]
}

export enum CustomerPredictedSpendTier {
  High = "HIGH",

  Low = "LOW",

  Medium = "MEDIUM",
}

export enum CustomerProductSubscriberStatus {
  Active = "ACTIVE",

  Cancelled = "CANCELLED",

  Expired = "EXPIRED",

  Failed = "FAILED",

  NeverSubscribed = "NEVER_SUBSCRIBED",

  Paused = "PAUSED",
}

export type CustomerRemoveTaxExemptionsPayload = {
  __typename?: "CustomerRemoveTaxExemptionsPayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export type CustomerReplaceTaxExemptionsPayload = {
  __typename?: "CustomerReplaceTaxExemptionsPayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export enum CustomerRequestDataErasureErrorCode {
  DoesNotExist = "DOES_NOT_EXIST",

  FailedToRequest = "FAILED_TO_REQUEST",
}

export type CustomerRequestDataErasurePayload = {
  __typename?: "CustomerRequestDataErasurePayload"

  customerId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<CustomerRequestDataErasureUserError>
}

export type CustomerRequestDataErasureUserError = DisplayableError & {
  __typename?: "CustomerRequestDataErasureUserError"

  code?: Maybe<CustomerRequestDataErasureErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerSavedSearchSortKeys {
  Id = "ID",

  Name = "NAME",

  Relevance = "RELEVANCE",
}

export type CustomerSegmentMember = HasMetafields & {
  __typename?: "CustomerSegmentMember"

  amountSpent?: Maybe<MoneyV2>

  defaultAddress?: Maybe<MailingAddress>

  defaultEmailAddress?: Maybe<CustomerEmailAddress>

  defaultPhoneNumber?: Maybe<CustomerPhoneNumber>

  displayName: Scalars["String"]["output"]

  firstName?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  lastName?: Maybe<Scalars["String"]["output"]>

  lastOrderId?: Maybe<Scalars["ID"]["output"]>

  mergeable: CustomerMergeable

  metafield?: Maybe<Metafield>

  metafields: MetafieldConnection

  note?: Maybe<Scalars["String"]["output"]>

  numberOfOrders?: Maybe<Scalars["UnsignedInt64"]["output"]>
  /**
   * Returns a private metafield by namespace and key that belongs to the resource.
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafield?: Maybe<PrivateMetafield>
  /**
   * List of private metafields that belong to the resource.
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafields: PrivateMetafieldConnection
}

export type CustomerSegmentMemberMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomerSegmentMemberMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerSegmentMemberPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type CustomerSegmentMemberPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomerSegmentMemberConnection = {
  __typename?: "CustomerSegmentMemberConnection"

  edges: Array<CustomerSegmentMemberEdge>

  pageInfo: PageInfo

  statistics: SegmentStatistics

  totalCount: Scalars["Int"]["output"]
}

export type CustomerSegmentMemberEdge = {
  __typename?: "CustomerSegmentMemberEdge"

  cursor: Scalars["String"]["output"]

  node: CustomerSegmentMember
}

export type CustomerSegmentMembersQuery = JobResult &
  Node & {
    __typename?: "CustomerSegmentMembersQuery"

    currentCount: Scalars["Int"]["output"]

    done: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]
  }

export type CustomerSegmentMembersQueryCreatePayload = {
  __typename?: "CustomerSegmentMembersQueryCreatePayload"

  customerSegmentMembersQuery?: Maybe<CustomerSegmentMembersQuery>

  userErrors: Array<CustomerSegmentMembersQueryUserError>
}

export type CustomerSegmentMembersQueryInput = {
  query?: InputMaybe<Scalars["String"]["input"]>

  reverse?: InputMaybe<Scalars["Boolean"]["input"]>

  segmentId?: InputMaybe<Scalars["ID"]["input"]>

  sortKey?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomerSegmentMembersQueryUserError = DisplayableError & {
  __typename?: "CustomerSegmentMembersQueryUserError"

  code?: Maybe<CustomerSegmentMembersQueryUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerSegmentMembersQueryUserErrorCode {
  Invalid = "INVALID",
}

export type CustomerShopPayAgreement = {
  __typename?: "CustomerShopPayAgreement"

  billingAddress?: Maybe<CustomerCreditCardBillingAddress>

  expiresSoon: Scalars["Boolean"]["output"]

  expiryMonth: Scalars["Int"]["output"]

  expiryYear: Scalars["Int"]["output"]

  inactive: Scalars["Boolean"]["output"]

  isRevocable: Scalars["Boolean"]["output"]

  lastDigits: Scalars["String"]["output"]

  maskedNumber: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export type CustomerSmsMarketingConsentError = DisplayableError & {
  __typename?: "CustomerSmsMarketingConsentError"

  code?: Maybe<CustomerSmsMarketingConsentErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum CustomerSmsMarketingConsentErrorCode {
  Inclusion = "INCLUSION",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  MissingArgument = "MISSING_ARGUMENT",
}

export type CustomerSmsMarketingConsentInput = {
  consentUpdatedAt?: InputMaybe<Scalars["DateTime"]["input"]>

  marketingOptInLevel?: InputMaybe<CustomerMarketingOptInLevel>

  marketingState: CustomerSmsMarketingState
}

export type CustomerSmsMarketingConsentState = {
  __typename?: "CustomerSmsMarketingConsentState"

  consentCollectedFrom?: Maybe<CustomerConsentCollectedFrom>

  consentUpdatedAt?: Maybe<Scalars["DateTime"]["output"]>

  marketingOptInLevel: CustomerMarketingOptInLevel

  marketingState: CustomerSmsMarketingState
}

export type CustomerSmsMarketingConsentUpdateInput = {
  customerId: Scalars["ID"]["input"]

  smsMarketingConsent: CustomerSmsMarketingConsentInput
}

export type CustomerSmsMarketingConsentUpdatePayload = {
  __typename?: "CustomerSmsMarketingConsentUpdatePayload"

  customer?: Maybe<Customer>

  userErrors: Array<CustomerSmsMarketingConsentError>
}

export enum CustomerSmsMarketingState {
  NotSubscribed = "NOT_SUBSCRIBED",

  Pending = "PENDING",

  Redacted = "REDACTED",

  Subscribed = "SUBSCRIBED",

  Unsubscribed = "UNSUBSCRIBED",
}

export enum CustomerSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  LastOrderDate = "LAST_ORDER_DATE",

  Location = "LOCATION",

  Name = "NAME",

  OrdersCount = "ORDERS_COUNT",

  Relevance = "RELEVANCE",

  TotalSpent = "TOTAL_SPENT",

  UpdatedAt = "UPDATED_AT",
}

export enum CustomerState {
  Declined = "DECLINED",

  Disabled = "DISABLED",

  Enabled = "ENABLED",

  Invited = "INVITED",
}

export type CustomerStatistics = {
  __typename?: "CustomerStatistics"

  predictedSpendTier?: Maybe<CustomerPredictedSpendTier>
}

export type CustomerUpdateDefaultAddressPayload = {
  __typename?: "CustomerUpdateDefaultAddressPayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export type CustomerUpdatePayload = {
  __typename?: "CustomerUpdatePayload"

  customer?: Maybe<Customer>

  userErrors: Array<UserError>
}

export type CustomerVisit = CustomerMoment &
  Node & {
    __typename?: "CustomerVisit"

    id: Scalars["ID"]["output"]

    landingPage?: Maybe<Scalars["URL"]["output"]>

    landingPageHtml?: Maybe<Scalars["HTML"]["output"]>

    marketingEvent?: Maybe<MarketingEvent>

    occurredAt: Scalars["DateTime"]["output"]

    referralCode?: Maybe<Scalars["String"]["output"]>

    referralInfoHtml: Scalars["FormattedString"]["output"]

    referrerUrl?: Maybe<Scalars["URL"]["output"]>

    source: Scalars["String"]["output"]

    sourceDescription?: Maybe<Scalars["String"]["output"]>

    sourceType?: Maybe<MarketingTactic>

    utmParameters?: Maybe<UtmParameters>
  }

export type CustomerVisitProductInfo = {
  __typename?: "CustomerVisitProductInfo"

  product?: Maybe<Product>

  quantity: Scalars["Int"]["output"]

  variant?: Maybe<ProductVariant>
}

export type CustomerVisitProductInfoConnection = {
  __typename?: "CustomerVisitProductInfoConnection"

  edges: Array<CustomerVisitProductInfoEdge>

  nodes: Array<CustomerVisitProductInfo>

  pageInfo: PageInfo
}

export type CustomerVisitProductInfoEdge = {
  __typename?: "CustomerVisitProductInfoEdge"

  cursor: Scalars["String"]["output"]

  node: CustomerVisitProductInfo
}

export enum DayOfTheWeek {
  Friday = "FRIDAY",

  Monday = "MONDAY",

  Saturday = "SATURDAY",

  Sunday = "SUNDAY",

  Thursday = "THURSDAY",

  Tuesday = "TUESDAY",

  Wednesday = "WEDNESDAY",
}

export type DelegateAccessToken = {
  __typename?: "DelegateAccessToken"

  accessScopes: Array<Scalars["String"]["output"]>

  accessToken: Scalars["String"]["output"]

  createdAt: Scalars["DateTime"]["output"]
}

export type DelegateAccessTokenCreatePayload = {
  __typename?: "DelegateAccessTokenCreatePayload"

  delegateAccessToken?: Maybe<DelegateAccessToken>

  shop: Shop

  userErrors: Array<DelegateAccessTokenCreateUserError>
}

export type DelegateAccessTokenCreateUserError = DisplayableError & {
  __typename?: "DelegateAccessTokenCreateUserError"

  code?: Maybe<DelegateAccessTokenCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum DelegateAccessTokenCreateUserErrorCode {
  DelegateAccessToken = "DELEGATE_ACCESS_TOKEN",

  EmptyAccessScope = "EMPTY_ACCESS_SCOPE",

  ExpiresAfterParent = "EXPIRES_AFTER_PARENT",

  NegativeExpiresIn = "NEGATIVE_EXPIRES_IN",

  PersistenceFailed = "PERSISTENCE_FAILED",

  RefreshToken = "REFRESH_TOKEN",

  UnknownScopes = "UNKNOWN_SCOPES",
}

export type DelegateAccessTokenDestroyPayload = {
  __typename?: "DelegateAccessTokenDestroyPayload"

  shop: Shop

  status?: Maybe<Scalars["Boolean"]["output"]>

  userErrors: Array<DelegateAccessTokenDestroyUserError>
}

export type DelegateAccessTokenDestroyUserError = DisplayableError & {
  __typename?: "DelegateAccessTokenDestroyUserError"

  code?: Maybe<DelegateAccessTokenDestroyUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum DelegateAccessTokenDestroyUserErrorCode {
  AccessDenied = "ACCESS_DENIED",

  AccessTokenNotFound = "ACCESS_TOKEN_NOT_FOUND",

  CanOnlyDeleteDelegateTokens = "CAN_ONLY_DELETE_DELEGATE_TOKENS",

  PersistenceFailed = "PERSISTENCE_FAILED",
}

export type DelegateAccessTokenInput = {
  delegateAccessScope: Array<Scalars["String"]["input"]>

  expiresIn?: InputMaybe<Scalars["Int"]["input"]>
}

export type DeletionEvent = {
  __typename?: "DeletionEvent"

  occurredAt: Scalars["DateTime"]["output"]

  subjectId: Scalars["ID"]["output"]

  subjectType: DeletionEventSubjectType
}

export type DeletionEventConnection = {
  __typename?: "DeletionEventConnection"

  edges: Array<DeletionEventEdge>

  nodes: Array<DeletionEvent>

  pageInfo: PageInfo
}

export type DeletionEventEdge = {
  __typename?: "DeletionEventEdge"

  cursor: Scalars["String"]["output"]

  node: DeletionEvent
}

export enum DeletionEventSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export enum DeletionEventSubjectType {
  Collection = "COLLECTION",
  Product = "PRODUCT",
}

export type DeliveryAvailableService = {
  __typename?: "DeliveryAvailableService"

  countries: DeliveryCountryCodesOrRestOfWorld

  name: Scalars["String"]["output"]
}

export type DeliveryBrandedPromise = {
  __typename?: "DeliveryBrandedPromise"

  handle: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export type DeliveryCarrierService = Node & {
  __typename?: "DeliveryCarrierService"

  availableServicesForCountries: Array<DeliveryAvailableService>

  formattedName?: Maybe<Scalars["String"]["output"]>

  icon: Image

  id: Scalars["ID"]["output"]

  name?: Maybe<Scalars["String"]["output"]>
}

export type DeliveryCarrierServiceAvailableServicesForCountriesArgs = {
  countryCodes?: InputMaybe<Array<CountryCode>>
  origins?: InputMaybe<Array<Scalars["ID"]["input"]>>
  restOfWorld: Scalars["Boolean"]["input"]
}

export type DeliveryCarrierServiceAndLocations = {
  __typename?: "DeliveryCarrierServiceAndLocations"

  carrierService: DeliveryCarrierService

  locations: Array<Location>
}

export type DeliveryCondition = Node & {
  __typename?: "DeliveryCondition"

  conditionCriteria: DeliveryConditionCriteria

  field: DeliveryConditionField

  id: Scalars["ID"]["output"]

  operator: DeliveryConditionOperator
}

export type DeliveryConditionCriteria = MoneyV2 | Weight

export enum DeliveryConditionField {
  TotalPrice = "TOTAL_PRICE",

  TotalWeight = "TOTAL_WEIGHT",
}

export enum DeliveryConditionOperator {
  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",
}

export type DeliveryCountry = Node & {
  __typename?: "DeliveryCountry"

  code: DeliveryCountryCodeOrRestOfWorld

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  provinces: Array<DeliveryProvince>

  translatedName: Scalars["String"]["output"]
}

export type DeliveryCountryAndZone = {
  __typename?: "DeliveryCountryAndZone"

  country: DeliveryCountry

  zone: Scalars["String"]["output"]
}

export type DeliveryCountryCodeOrRestOfWorld = {
  __typename?: "DeliveryCountryCodeOrRestOfWorld"

  countryCode?: Maybe<CountryCode>

  restOfWorld: Scalars["Boolean"]["output"]
}

export type DeliveryCountryCodesOrRestOfWorld = {
  __typename?: "DeliveryCountryCodesOrRestOfWorld"

  countryCodes: Array<CountryCode>

  restOfWorld: Scalars["Boolean"]["output"]
}

export type DeliveryCountryInput = {
  code?: InputMaybe<CountryCode>

  includeAllProvinces?: InputMaybe<Scalars["Boolean"]["input"]>

  provinces?: InputMaybe<Array<DeliveryProvinceInput>>

  restOfWorld?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryCustomization = HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "DeliveryCustomization"

    enabled: Scalars["Boolean"]["output"]

    errorHistory?: Maybe<FunctionsErrorHistory>

    functionId: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    shopifyFunction: ShopifyFunction

    title: Scalars["String"]["output"]
  }

export type DeliveryCustomizationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type DeliveryCustomizationMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type DeliveryCustomizationMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryCustomizationPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type DeliveryCustomizationPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryCustomizationActivationPayload = {
  __typename?: "DeliveryCustomizationActivationPayload"

  ids?: Maybe<Array<Scalars["String"]["output"]>>

  userErrors: Array<DeliveryCustomizationError>
}

export type DeliveryCustomizationConnection = {
  __typename?: "DeliveryCustomizationConnection"

  edges: Array<DeliveryCustomizationEdge>

  nodes: Array<DeliveryCustomization>

  pageInfo: PageInfo
}

export type DeliveryCustomizationCreatePayload = {
  __typename?: "DeliveryCustomizationCreatePayload"

  deliveryCustomization?: Maybe<DeliveryCustomization>

  userErrors: Array<DeliveryCustomizationError>
}

export type DeliveryCustomizationDeletePayload = {
  __typename?: "DeliveryCustomizationDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<DeliveryCustomizationError>
}

export type DeliveryCustomizationEdge = {
  __typename?: "DeliveryCustomizationEdge"

  cursor: Scalars["String"]["output"]

  node: DeliveryCustomization
}

export type DeliveryCustomizationError = DisplayableError & {
  __typename?: "DeliveryCustomizationError"

  code?: Maybe<DeliveryCustomizationErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum DeliveryCustomizationErrorCode {
  CustomAppFunctionNotEligible = "CUSTOM_APP_FUNCTION_NOT_ELIGIBLE",

  DeliveryCustomizationFunctionNotEligible = "DELIVERY_CUSTOMIZATION_FUNCTION_NOT_ELIGIBLE",

  DeliveryCustomizationNotFound = "DELIVERY_CUSTOMIZATION_NOT_FOUND",

  FunctionDoesNotImplement = "FUNCTION_DOES_NOT_IMPLEMENT",

  FunctionIdCannotBeChanged = "FUNCTION_ID_CANNOT_BE_CHANGED",

  FunctionNotFound = "FUNCTION_NOT_FOUND",

  FunctionPendingDeletion = "FUNCTION_PENDING_DELETION",

  Invalid = "INVALID",

  InvalidMetafields = "INVALID_METAFIELDS",

  MaximumActiveDeliveryCustomizations = "MAXIMUM_ACTIVE_DELIVERY_CUSTOMIZATIONS",

  RequiredInputField = "REQUIRED_INPUT_FIELD",

  UnauthorizedAppScope = "UNAUTHORIZED_APP_SCOPE",
}

export type DeliveryCustomizationInput = {
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>

  functionId?: InputMaybe<Scalars["String"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type DeliveryCustomizationUpdatePayload = {
  __typename?: "DeliveryCustomizationUpdatePayload"

  deliveryCustomization?: Maybe<DeliveryCustomization>

  userErrors: Array<DeliveryCustomizationError>
}

export type DeliveryLegacyModeBlocked = {
  __typename?: "DeliveryLegacyModeBlocked"

  blocked: Scalars["Boolean"]["output"]

  reasons?: Maybe<Array<DeliveryLegacyModeBlockedReason>>
}

export enum DeliveryLegacyModeBlockedReason {
  /**
   * Multi-Location mode is disabled. The shop can't convert to full multi-location delivery profiles mode.
   * @deprecated All shops are now using multi-location mode.
   */
  MultiLocationDisabled = "MULTI_LOCATION_DISABLED",

  NoLocationsFulfillingOnlineOrders = "NO_LOCATIONS_FULFILLING_ONLINE_ORDERS",
}

export type DeliveryLocalPickupSettings = {
  __typename?: "DeliveryLocalPickupSettings"

  instructions: Scalars["String"]["output"]

  pickupTime: DeliveryLocalPickupTime
}

export enum DeliveryLocalPickupTime {
  FiveOrMoreDays = "FIVE_OR_MORE_DAYS",

  FourHours = "FOUR_HOURS",

  OneHour = "ONE_HOUR",

  TwentyFourHours = "TWENTY_FOUR_HOURS",

  TwoHours = "TWO_HOURS",

  TwoToFourDays = "TWO_TO_FOUR_DAYS",
}

export type DeliveryLocationGroup = Node & {
  __typename?: "DeliveryLocationGroup"

  id: Scalars["ID"]["output"]

  locations: LocationConnection

  locationsCount: Scalars["Int"]["output"]
}

export type DeliveryLocationGroupLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  includeInactive?: InputMaybe<Scalars["Boolean"]["input"]>
  includeLegacy?: InputMaybe<Scalars["Boolean"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<LocationSortKeys>
}

export type DeliveryLocationGroupZone = {
  __typename?: "DeliveryLocationGroupZone"

  methodDefinitionCounts: DeliveryMethodDefinitionCounts

  methodDefinitions: DeliveryMethodDefinitionConnection

  zone: DeliveryZone
}

export type DeliveryLocationGroupZoneMethodDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  eligible?: InputMaybe<Scalars["Boolean"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MethodDefinitionSortKeys>
  type?: InputMaybe<DeliveryMethodDefinitionType>
}

export type DeliveryLocationGroupZoneConnection = {
  __typename?: "DeliveryLocationGroupZoneConnection"

  edges: Array<DeliveryLocationGroupZoneEdge>

  nodes: Array<DeliveryLocationGroupZone>

  pageInfo: PageInfo
}

export type DeliveryLocationGroupZoneEdge = {
  __typename?: "DeliveryLocationGroupZoneEdge"

  cursor: Scalars["String"]["output"]

  node: DeliveryLocationGroupZone
}

export type DeliveryLocationGroupZoneInput = {
  countries?: InputMaybe<Array<DeliveryCountryInput>>

  id?: InputMaybe<Scalars["ID"]["input"]>

  methodDefinitionsToCreate?: InputMaybe<Array<DeliveryMethodDefinitionInput>>

  methodDefinitionsToUpdate?: InputMaybe<Array<DeliveryMethodDefinitionInput>>

  name?: InputMaybe<Scalars["String"]["input"]>
}

export type DeliveryLocationLocalPickupEnableInput = {
  instructions?: InputMaybe<Scalars["String"]["input"]>

  locationId: Scalars["ID"]["input"]

  pickupTime: DeliveryLocalPickupTime
}

export type DeliveryLocationLocalPickupSettingsError = DisplayableError & {
  __typename?: "DeliveryLocationLocalPickupSettingsError"

  code?: Maybe<DeliveryLocationLocalPickupSettingsErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum DeliveryLocationLocalPickupSettingsErrorCode {
  ActiveLocationNotFound = "ACTIVE_LOCATION_NOT_FOUND",

  GenericError = "GENERIC_ERROR",
}

export type DeliveryMethod = Node & {
  __typename?: "DeliveryMethod"

  brandedPromise?: Maybe<DeliveryBrandedPromise>

  id: Scalars["ID"]["output"]

  maxDeliveryDateTime?: Maybe<Scalars["DateTime"]["output"]>

  methodType: DeliveryMethodType

  minDeliveryDateTime?: Maybe<Scalars["DateTime"]["output"]>

  serviceCode?: Maybe<Scalars["String"]["output"]>
}

export type DeliveryMethodDefinition = Node & {
  __typename?: "DeliveryMethodDefinition"

  active: Scalars["Boolean"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  methodConditions: Array<DeliveryCondition>

  name: Scalars["String"]["output"]

  rateProvider: DeliveryRateProvider
}

export type DeliveryMethodDefinitionConnection = {
  __typename?: "DeliveryMethodDefinitionConnection"

  edges: Array<DeliveryMethodDefinitionEdge>

  nodes: Array<DeliveryMethodDefinition>

  pageInfo: PageInfo
}

export type DeliveryMethodDefinitionCounts = {
  __typename?: "DeliveryMethodDefinitionCounts"

  participantDefinitionsCount: Scalars["Int"]["output"]

  rateDefinitionsCount: Scalars["Int"]["output"]
}

export type DeliveryMethodDefinitionEdge = {
  __typename?: "DeliveryMethodDefinitionEdge"

  cursor: Scalars["String"]["output"]

  node: DeliveryMethodDefinition
}

export type DeliveryMethodDefinitionInput = {
  active?: InputMaybe<Scalars["Boolean"]["input"]>

  conditionsToUpdate?: InputMaybe<Array<DeliveryUpdateConditionInput>>

  description?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  name?: InputMaybe<Scalars["String"]["input"]>

  participant?: InputMaybe<DeliveryParticipantInput>

  priceConditionsToCreate?: InputMaybe<Array<DeliveryPriceConditionInput>>

  rateDefinition?: InputMaybe<DeliveryRateDefinitionInput>

  weightConditionsToCreate?: InputMaybe<Array<DeliveryWeightConditionInput>>
}

export enum DeliveryMethodDefinitionType {
  Merchant = "MERCHANT",

  Participant = "PARTICIPANT",
}

export enum DeliveryMethodType {
  Local = "LOCAL",

  None = "NONE",

  PickUp = "PICK_UP",

  Retail = "RETAIL",

  Shipping = "SHIPPING",
}

export type DeliveryParticipant = Node & {
  __typename?: "DeliveryParticipant"

  adaptToNewServicesFlag: Scalars["Boolean"]["output"]

  carrierService: DeliveryCarrierService

  fixedFee?: Maybe<MoneyV2>

  id: Scalars["ID"]["output"]

  participantServices: Array<DeliveryParticipantService>

  percentageOfRateFee: Scalars["Float"]["output"]
}

export type DeliveryParticipantInput = {
  adaptToNewServices?: InputMaybe<Scalars["Boolean"]["input"]>

  carrierServiceId?: InputMaybe<Scalars["ID"]["input"]>

  fixedFee?: InputMaybe<MoneyInput>

  id?: InputMaybe<Scalars["ID"]["input"]>

  participantServices?: InputMaybe<Array<DeliveryParticipantServiceInput>>

  percentageOfRateFee?: InputMaybe<Scalars["Float"]["input"]>
}

export type DeliveryParticipantService = {
  __typename?: "DeliveryParticipantService"

  active: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]
}

export type DeliveryParticipantServiceInput = {
  active: Scalars["Boolean"]["input"]

  name: Scalars["String"]["input"]
}

export type DeliveryPriceConditionInput = {
  criteria?: InputMaybe<MoneyInput>

  operator?: InputMaybe<DeliveryConditionOperator>
}

export type DeliveryProductVariantsCount = {
  __typename?: "DeliveryProductVariantsCount"

  capped: Scalars["Boolean"]["output"]

  count: Scalars["Int"]["output"]
}

export type DeliveryProfile = Node & {
  __typename?: "DeliveryProfile"

  activeMethodDefinitionsCount: Scalars["Int"]["output"]

  default: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  legacyMode: Scalars["Boolean"]["output"]

  locationsWithoutRatesCount: Scalars["Int"]["output"]

  name: Scalars["String"]["output"]

  originLocationCount: Scalars["Int"]["output"]
  /**
   * The number of product variants for this profile. The count for the default profile isn't supported and will return -1.
   * @deprecated Use `productVariantsCountV2` instead.
   */
  productVariantsCount: Scalars["Int"]["output"]

  productVariantsCountV2: DeliveryProductVariantsCount

  profileItems: DeliveryProfileItemConnection

  profileLocationGroups: Array<DeliveryProfileLocationGroup>

  sellingPlanGroups: SellingPlanGroupConnection

  unassignedLocations: Array<Location>

  unassignedLocationsPaginated: LocationConnection

  zoneCountryCount: Scalars["Int"]["output"]
}

export type DeliveryProfileProfileItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryProfileProfileLocationGroupsArgs = {
  locationGroupId?: InputMaybe<Scalars["ID"]["input"]>
}

export type DeliveryProfileSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryProfileUnassignedLocationsPaginatedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryProfileConnection = {
  __typename?: "DeliveryProfileConnection"

  edges: Array<DeliveryProfileEdge>

  nodes: Array<DeliveryProfile>

  pageInfo: PageInfo
}

export type DeliveryProfileEdge = {
  __typename?: "DeliveryProfileEdge"

  cursor: Scalars["String"]["output"]

  node: DeliveryProfile
}

export type DeliveryProfileInput = {
  conditionsToDelete?: InputMaybe<Array<Scalars["ID"]["input"]>>

  locationGroupsToCreate?: InputMaybe<Array<DeliveryProfileLocationGroupInput>>

  locationGroupsToDelete?: InputMaybe<Array<Scalars["ID"]["input"]>>

  locationGroupsToUpdate?: InputMaybe<Array<DeliveryProfileLocationGroupInput>>

  methodDefinitionsToDelete?: InputMaybe<Array<Scalars["ID"]["input"]>>

  name?: InputMaybe<Scalars["String"]["input"]>

  profileLocationGroups?: InputMaybe<Array<DeliveryProfileLocationGroupInput>>

  sellingPlanGroupsToAssociate?: InputMaybe<Array<Scalars["ID"]["input"]>>

  sellingPlanGroupsToDissociate?: InputMaybe<Array<Scalars["ID"]["input"]>>

  variantsToAssociate?: InputMaybe<Array<Scalars["ID"]["input"]>>

  variantsToDissociate?: InputMaybe<Array<Scalars["ID"]["input"]>>

  zonesToDelete?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type DeliveryProfileItem = Node & {
  __typename?: "DeliveryProfileItem"

  id: Scalars["ID"]["output"]

  product: Product

  variants: ProductVariantConnection
}

export type DeliveryProfileItemVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryProfileItemConnection = {
  __typename?: "DeliveryProfileItemConnection"

  edges: Array<DeliveryProfileItemEdge>

  nodes: Array<DeliveryProfileItem>

  pageInfo: PageInfo
}

export type DeliveryProfileItemEdge = {
  __typename?: "DeliveryProfileItemEdge"

  cursor: Scalars["String"]["output"]

  node: DeliveryProfileItem
}

export type DeliveryProfileLocationGroup = {
  __typename?: "DeliveryProfileLocationGroup"

  countriesInAnyZone: Array<DeliveryCountryAndZone>

  locationGroup: DeliveryLocationGroup

  locationGroupZones: DeliveryLocationGroupZoneConnection
}

export type DeliveryProfileLocationGroupLocationGroupZonesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliveryProfileLocationGroupInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>

  locations?: InputMaybe<Array<Scalars["ID"]["input"]>>

  locationsToAdd?: InputMaybe<Array<Scalars["ID"]["input"]>>

  locationsToRemove?: InputMaybe<Array<Scalars["ID"]["input"]>>

  zonesToCreate?: InputMaybe<Array<DeliveryLocationGroupZoneInput>>

  zonesToUpdate?: InputMaybe<Array<DeliveryLocationGroupZoneInput>>
}

export type DeliveryProvince = Node & {
  __typename?: "DeliveryProvince"

  code: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  translatedName: Scalars["String"]["output"]
}

export type DeliveryProvinceInput = {
  code: Scalars["String"]["input"]
}

export type DeliveryRateDefinition = Node & {
  __typename?: "DeliveryRateDefinition"

  id: Scalars["ID"]["output"]

  price: MoneyV2
}

export type DeliveryRateDefinitionInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>

  price: MoneyInput
}

export type DeliveryRateProvider = DeliveryParticipant | DeliveryRateDefinition

export type DeliverySetting = {
  __typename?: "DeliverySetting"

  legacyModeBlocked: DeliveryLegacyModeBlocked

  legacyModeProfiles: Scalars["Boolean"]["output"]
}

export type DeliverySettingInput = {
  legacyModeProfiles?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DeliverySettingUpdatePayload = {
  __typename?: "DeliverySettingUpdatePayload"

  setting?: Maybe<DeliverySetting>

  userErrors: Array<UserError>
}

export type DeliveryShippingOriginAssignPayload = {
  __typename?: "DeliveryShippingOriginAssignPayload"

  userErrors: Array<UserError>
}

export type DeliveryUpdateConditionInput = {
  criteria?: InputMaybe<Scalars["Float"]["input"]>

  criteriaUnit?: InputMaybe<Scalars["String"]["input"]>

  field?: InputMaybe<DeliveryConditionField>

  id: Scalars["ID"]["input"]

  operator?: InputMaybe<DeliveryConditionOperator>
}

export type DeliveryWeightConditionInput = {
  criteria?: InputMaybe<WeightInput>

  operator?: InputMaybe<DeliveryConditionOperator>
}

export type DeliveryZone = Node & {
  __typename?: "DeliveryZone"

  countries: Array<DeliveryCountry>

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]
}

export enum DigitalWallet {
  AndroidPay = "ANDROID_PAY",

  ApplePay = "APPLE_PAY",

  GooglePay = "GOOGLE_PAY",

  ShopifyPay = "SHOPIFY_PAY",
}

export type Discount =
  | DiscountAutomaticApp
  | DiscountAutomaticBasic
  | DiscountAutomaticBxgy
  | DiscountAutomaticFreeShipping
  | DiscountCodeApp
  | DiscountCodeBasic
  | DiscountCodeBxgy
  | DiscountCodeFreeShipping

export type DiscountAllocation = {
  __typename?: "DiscountAllocation"
  /**
   * The money amount that's allocated to a line based on the associated discount application.
   * @deprecated Use `allocatedAmountSet` instead.
   */
  allocatedAmount: MoneyV2

  allocatedAmountSet: MoneyBag

  discountApplication: DiscountApplication
}

export type DiscountAmount = {
  __typename?: "DiscountAmount"

  amount: MoneyV2

  appliesOnEachItem: Scalars["Boolean"]["output"]
}

export type DiscountAmountInput = {
  amount?: InputMaybe<Scalars["Decimal"]["input"]>

  appliesOnEachItem?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountApplication = {
  allocationMethod: DiscountApplicationAllocationMethod

  index: Scalars["Int"]["output"]

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

export enum DiscountApplicationLevel {
  Line = "LINE",

  Order = "ORDER",
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

export type DiscountAutomatic =
  | DiscountAutomaticApp
  | DiscountAutomaticBasic
  | DiscountAutomaticBxgy
  | DiscountAutomaticFreeShipping

export type DiscountAutomaticActivatePayload = {
  __typename?: "DiscountAutomaticActivatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticApp = {
  __typename?: "DiscountAutomaticApp"

  appDiscountType: AppDiscountType

  asyncUsageCount: Scalars["Int"]["output"]

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  discountClass: DiscountClass

  discountId: Scalars["ID"]["output"]

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  errorHistory?: Maybe<FunctionsErrorHistory>

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  title: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]
}

export type DiscountAutomaticAppCreatePayload = {
  __typename?: "DiscountAutomaticAppCreatePayload"

  automaticAppDiscount?: Maybe<DiscountAutomaticApp>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticAppInput = {
  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  functionId?: InputMaybe<Scalars["String"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type DiscountAutomaticAppUpdatePayload = {
  __typename?: "DiscountAutomaticAppUpdatePayload"

  automaticAppDiscount?: Maybe<DiscountAutomaticApp>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticBasic = {
  __typename?: "DiscountAutomaticBasic"

  asyncUsageCount: Scalars["Int"]["output"]

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  customerGets: DiscountCustomerGets

  discountClass: MerchandiseDiscountClass

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  minimumRequirement: DiscountMinimumRequirement

  recurringCycleLimit: Scalars["Int"]["output"]

  shortSummary: Scalars["String"]["output"]

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  summary: Scalars["String"]["output"]

  title: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]
  /**
   * The number of times that the discount has been used.
   * @deprecated Use `asyncUsageCount` instead.
   */
  usageCount: Scalars["Int"]["output"]
}

export type DiscountAutomaticBasicCreatePayload = {
  __typename?: "DiscountAutomaticBasicCreatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticBasicInput = {
  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerGets?: InputMaybe<DiscountCustomerGetsInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>

  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type DiscountAutomaticBasicUpdatePayload = {
  __typename?: "DiscountAutomaticBasicUpdatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticBulkDeletePayload = {
  __typename?: "DiscountAutomaticBulkDeletePayload"

  job?: Maybe<Job>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticBxgy = HasEvents &
  Node & {
    __typename?: "DiscountAutomaticBxgy"

    asyncUsageCount: Scalars["Int"]["output"]

    combinesWith: DiscountCombinesWith

    createdAt: Scalars["DateTime"]["output"]

    customerBuys: DiscountCustomerBuys

    customerGets: DiscountCustomerGets

    discountClass: MerchandiseDiscountClass

    endsAt?: Maybe<Scalars["DateTime"]["output"]>

    events: EventConnection
    /**
     * A legacy unique ID for the discount.
     * @deprecated Use DiscountAutomaticNode.id instead.
     */
    id: Scalars["ID"]["output"]

    startsAt: Scalars["DateTime"]["output"]

    status: DiscountStatus

    summary: Scalars["String"]["output"]

    title: Scalars["String"]["output"]

    updatedAt: Scalars["DateTime"]["output"]
    /**
     * The number of times that the discount has been used.
     * @deprecated Use `asyncUsageCount` instead.
     */
    usageCount: Scalars["Int"]["output"]

    usesPerOrderLimit?: Maybe<Scalars["Int"]["output"]>
  }

export type DiscountAutomaticBxgyEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type DiscountAutomaticBxgyCreatePayload = {
  __typename?: "DiscountAutomaticBxgyCreatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticBxgyInput = {
  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerBuys?: InputMaybe<DiscountCustomerBuysInput>

  customerGets?: InputMaybe<DiscountCustomerGetsInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  usesPerOrderLimit?: InputMaybe<Scalars["UnsignedInt64"]["input"]>
}

export type DiscountAutomaticBxgyUpdatePayload = {
  __typename?: "DiscountAutomaticBxgyUpdatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticConnection = {
  __typename?: "DiscountAutomaticConnection"

  edges: Array<DiscountAutomaticEdge>

  nodes: Array<DiscountAutomatic>

  pageInfo: PageInfo
}

export type DiscountAutomaticDeactivatePayload = {
  __typename?: "DiscountAutomaticDeactivatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticDeletePayload = {
  __typename?: "DiscountAutomaticDeletePayload"

  deletedAutomaticDiscountId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticEdge = {
  __typename?: "DiscountAutomaticEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountAutomatic
}

export type DiscountAutomaticFreeShipping = {
  __typename?: "DiscountAutomaticFreeShipping"

  appliesOnOneTimePurchase: Scalars["Boolean"]["output"]

  appliesOnSubscription: Scalars["Boolean"]["output"]

  asyncUsageCount: Scalars["Int"]["output"]

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  destinationSelection: DiscountShippingDestinationSelection

  discountClass: ShippingDiscountClass

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  hasTimelineComment: Scalars["Boolean"]["output"]

  maximumShippingPrice?: Maybe<MoneyV2>

  minimumRequirement: DiscountMinimumRequirement

  recurringCycleLimit: Scalars["Int"]["output"]

  shortSummary: Scalars["String"]["output"]

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  summary: Scalars["String"]["output"]

  title: Scalars["String"]["output"]

  totalSales?: Maybe<MoneyV2>

  updatedAt: Scalars["DateTime"]["output"]
}

export type DiscountAutomaticFreeShippingCreatePayload = {
  __typename?: "DiscountAutomaticFreeShippingCreatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticFreeShippingInput = {
  appliesOnOneTimePurchase?: InputMaybe<Scalars["Boolean"]["input"]>

  appliesOnSubscription?: InputMaybe<Scalars["Boolean"]["input"]>

  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  destination?: InputMaybe<DiscountShippingDestinationSelectionInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  maximumShippingPrice?: InputMaybe<Scalars["Decimal"]["input"]>

  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>

  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type DiscountAutomaticFreeShippingUpdatePayload = {
  __typename?: "DiscountAutomaticFreeShippingUpdatePayload"

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountAutomaticNode = HasEvents &
  HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "DiscountAutomaticNode"

    automaticDiscount: DiscountAutomatic

    events: EventConnection

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection
  }

export type DiscountAutomaticNodeEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type DiscountAutomaticNodeMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type DiscountAutomaticNodeMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type DiscountAutomaticNodeMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountAutomaticNodePrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type DiscountAutomaticNodePrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountAutomaticNodeConnection = {
  __typename?: "DiscountAutomaticNodeConnection"

  edges: Array<DiscountAutomaticNodeEdge>

  nodes: Array<DiscountAutomaticNode>

  pageInfo: PageInfo
}

export type DiscountAutomaticNodeEdge = {
  __typename?: "DiscountAutomaticNodeEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountAutomaticNode
}

export enum DiscountClass {
  Order = "ORDER",

  Product = "PRODUCT",

  Shipping = "SHIPPING",
}

export type DiscountCode = DiscountCodeApp | DiscountCodeBasic | DiscountCodeBxgy | DiscountCodeFreeShipping

export type DiscountCodeActivatePayload = {
  __typename?: "DiscountCodeActivatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeApp = {
  __typename?: "DiscountCodeApp"

  appDiscountType: AppDiscountType

  appliesOncePerCustomer: Scalars["Boolean"]["output"]

  asyncUsageCount: Scalars["Int"]["output"]

  codeCount: Scalars["Int"]["output"]

  codes: DiscountRedeemCodeConnection

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  customerSelection: DiscountCustomerSelection

  discountClass: DiscountClass

  discountId: Scalars["ID"]["output"]

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  errorHistory?: Maybe<FunctionsErrorHistory>

  hasTimelineComment: Scalars["Boolean"]["output"]

  recurringCycleLimit?: Maybe<Scalars["Int"]["output"]>

  shareableUrls: Array<DiscountShareableUrl>

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  title: Scalars["String"]["output"]

  totalSales?: Maybe<MoneyV2>

  updatedAt: Scalars["DateTime"]["output"]

  usageLimit?: Maybe<Scalars["Int"]["output"]>
}

export type DiscountCodeAppCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DiscountCodeSortKeys>
}

export type DiscountCodeAppCreatePayload = {
  __typename?: "DiscountCodeAppCreatePayload"

  codeAppDiscount?: Maybe<DiscountCodeApp>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeAppInput = {
  appliesOncePerCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  code?: InputMaybe<Scalars["String"]["input"]>

  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  functionId?: InputMaybe<Scalars["String"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  usageLimit?: InputMaybe<Scalars["Int"]["input"]>
}

export type DiscountCodeAppUpdatePayload = {
  __typename?: "DiscountCodeAppUpdatePayload"

  codeAppDiscount?: Maybe<DiscountCodeApp>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeApplication = DiscountApplication & {
  __typename?: "DiscountCodeApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  code: Scalars["String"]["output"]

  index: Scalars["Int"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  value: PricingValue
}

export type DiscountCodeBasic = {
  __typename?: "DiscountCodeBasic"

  appliesOncePerCustomer: Scalars["Boolean"]["output"]

  asyncUsageCount: Scalars["Int"]["output"]

  codeCount: Scalars["Int"]["output"]

  codes: DiscountRedeemCodeConnection

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  customerGets: DiscountCustomerGets

  customerSelection: DiscountCustomerSelection

  discountClass: MerchandiseDiscountClass

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  hasTimelineComment: Scalars["Boolean"]["output"]

  minimumRequirement?: Maybe<DiscountMinimumRequirement>

  recurringCycleLimit?: Maybe<Scalars["Int"]["output"]>

  shareableUrls: Array<DiscountShareableUrl>

  shortSummary: Scalars["String"]["output"]

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  summary: Scalars["String"]["output"]

  title: Scalars["String"]["output"]

  totalSales?: Maybe<MoneyV2>

  updatedAt: Scalars["DateTime"]["output"]

  usageLimit?: Maybe<Scalars["Int"]["output"]>
}

export type DiscountCodeBasicCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DiscountCodeSortKeys>
}

export type DiscountCodeBasicCreatePayload = {
  __typename?: "DiscountCodeBasicCreatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeBasicInput = {
  appliesOncePerCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  code?: InputMaybe<Scalars["String"]["input"]>

  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerGets?: InputMaybe<DiscountCustomerGetsInput>

  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>

  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  usageLimit?: InputMaybe<Scalars["Int"]["input"]>
}

export type DiscountCodeBasicUpdatePayload = {
  __typename?: "DiscountCodeBasicUpdatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeBulkActivatePayload = {
  __typename?: "DiscountCodeBulkActivatePayload"

  job?: Maybe<Job>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeBulkDeactivatePayload = {
  __typename?: "DiscountCodeBulkDeactivatePayload"

  job?: Maybe<Job>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeBulkDeletePayload = {
  __typename?: "DiscountCodeBulkDeletePayload"

  job?: Maybe<Job>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeBxgy = {
  __typename?: "DiscountCodeBxgy"

  appliesOncePerCustomer: Scalars["Boolean"]["output"]

  asyncUsageCount: Scalars["Int"]["output"]

  codeCount: Scalars["Int"]["output"]

  codes: DiscountRedeemCodeConnection

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  customerBuys: DiscountCustomerBuys

  customerGets: DiscountCustomerGets

  customerSelection: DiscountCustomerSelection

  discountClass: MerchandiseDiscountClass

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  hasTimelineComment: Scalars["Boolean"]["output"]

  shareableUrls: Array<DiscountShareableUrl>

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  summary: Scalars["String"]["output"]

  title: Scalars["String"]["output"]

  totalSales?: Maybe<MoneyV2>

  updatedAt: Scalars["DateTime"]["output"]

  usageLimit?: Maybe<Scalars["Int"]["output"]>

  usesPerOrderLimit?: Maybe<Scalars["Int"]["output"]>
}

export type DiscountCodeBxgyCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DiscountCodeSortKeys>
}

export type DiscountCodeBxgyCreatePayload = {
  __typename?: "DiscountCodeBxgyCreatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeBxgyInput = {
  appliesOncePerCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  code?: InputMaybe<Scalars["String"]["input"]>

  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerBuys?: InputMaybe<DiscountCustomerBuysInput>

  customerGets?: InputMaybe<DiscountCustomerGetsInput>

  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  usageLimit?: InputMaybe<Scalars["Int"]["input"]>

  usesPerOrderLimit?: InputMaybe<Scalars["Int"]["input"]>
}

export type DiscountCodeBxgyUpdatePayload = {
  __typename?: "DiscountCodeBxgyUpdatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeDeactivatePayload = {
  __typename?: "DiscountCodeDeactivatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeDeletePayload = {
  __typename?: "DiscountCodeDeletePayload"

  deletedCodeDiscountId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeFreeShipping = {
  __typename?: "DiscountCodeFreeShipping"

  appliesOnOneTimePurchase: Scalars["Boolean"]["output"]

  appliesOnSubscription: Scalars["Boolean"]["output"]

  appliesOncePerCustomer: Scalars["Boolean"]["output"]

  asyncUsageCount: Scalars["Int"]["output"]

  codeCount: Scalars["Int"]["output"]

  codes: DiscountRedeemCodeConnection

  combinesWith: DiscountCombinesWith

  createdAt: Scalars["DateTime"]["output"]

  customerSelection: DiscountCustomerSelection

  destinationSelection: DiscountShippingDestinationSelection

  discountClass: ShippingDiscountClass

  endsAt?: Maybe<Scalars["DateTime"]["output"]>

  hasTimelineComment: Scalars["Boolean"]["output"]

  maximumShippingPrice?: Maybe<MoneyV2>

  minimumRequirement?: Maybe<DiscountMinimumRequirement>

  recurringCycleLimit?: Maybe<Scalars["Int"]["output"]>

  shareableUrls: Array<DiscountShareableUrl>

  shortSummary: Scalars["String"]["output"]

  startsAt: Scalars["DateTime"]["output"]

  status: DiscountStatus

  summary: Scalars["String"]["output"]

  title: Scalars["String"]["output"]

  totalSales?: Maybe<MoneyV2>

  updatedAt: Scalars["DateTime"]["output"]

  usageLimit?: Maybe<Scalars["Int"]["output"]>
}

export type DiscountCodeFreeShippingCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DiscountCodeSortKeys>
}

export type DiscountCodeFreeShippingCreatePayload = {
  __typename?: "DiscountCodeFreeShippingCreatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeFreeShippingInput = {
  appliesOnOneTimePurchase?: InputMaybe<Scalars["Boolean"]["input"]>

  appliesOnSubscription?: InputMaybe<Scalars["Boolean"]["input"]>

  appliesOncePerCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  code?: InputMaybe<Scalars["String"]["input"]>

  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>

  destination?: InputMaybe<DiscountShippingDestinationSelectionInput>

  endsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  maximumShippingPrice?: InputMaybe<Scalars["Decimal"]["input"]>

  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>

  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  startsAt?: InputMaybe<Scalars["DateTime"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  usageLimit?: InputMaybe<Scalars["Int"]["input"]>
}

export type DiscountCodeFreeShippingUpdatePayload = {
  __typename?: "DiscountCodeFreeShippingUpdatePayload"

  codeDiscountNode?: Maybe<DiscountCodeNode>

  userErrors: Array<DiscountUserError>
}

export type DiscountCodeNode = HasEvents &
  HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "DiscountCodeNode"

    codeDiscount: DiscountCode

    events: EventConnection

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection
  }

export type DiscountCodeNodeEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type DiscountCodeNodeMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type DiscountCodeNodeMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type DiscountCodeNodeMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountCodeNodePrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type DiscountCodeNodePrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountCodeNodeConnection = {
  __typename?: "DiscountCodeNodeConnection"

  edges: Array<DiscountCodeNodeEdge>

  nodes: Array<DiscountCodeNode>

  pageInfo: PageInfo
}

export type DiscountCodeNodeEdge = {
  __typename?: "DiscountCodeNodeEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountCodeNode
}

export type DiscountCodeRedeemCodeBulkDeletePayload = {
  __typename?: "DiscountCodeRedeemCodeBulkDeletePayload"

  job?: Maybe<Job>

  userErrors: Array<DiscountUserError>
}

export enum DiscountCodeSortKeys {
  Code = "CODE",

  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export type DiscountCollections = {
  __typename?: "DiscountCollections"

  collections: CollectionConnection
}

export type DiscountCollectionsCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountCollectionsInput = {
  add?: InputMaybe<Array<Scalars["ID"]["input"]>>

  remove?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type DiscountCombinesWith = {
  __typename?: "DiscountCombinesWith"

  orderDiscounts: Scalars["Boolean"]["output"]

  productDiscounts: Scalars["Boolean"]["output"]

  shippingDiscounts: Scalars["Boolean"]["output"]
}

export type DiscountCombinesWithInput = {
  orderDiscounts?: InputMaybe<Scalars["Boolean"]["input"]>

  productDiscounts?: InputMaybe<Scalars["Boolean"]["input"]>

  shippingDiscounts?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountCountries = {
  __typename?: "DiscountCountries"

  countries: Array<CountryCode>

  includeRestOfWorld: Scalars["Boolean"]["output"]
}

export type DiscountCountriesInput = {
  add?: InputMaybe<Array<CountryCode>>

  includeRestOfWorld?: InputMaybe<Scalars["Boolean"]["input"]>

  remove?: InputMaybe<Array<CountryCode>>
}

export type DiscountCountryAll = {
  __typename?: "DiscountCountryAll"

  allCountries: Scalars["Boolean"]["output"]
}

export type DiscountCustomerAll = {
  __typename?: "DiscountCustomerAll"

  allCustomers: Scalars["Boolean"]["output"]
}

export type DiscountCustomerBuys = {
  __typename?: "DiscountCustomerBuys"

  items: DiscountItems

  value: DiscountCustomerBuysValue
}

export type DiscountCustomerBuysInput = {
  items?: InputMaybe<DiscountItemsInput>

  value?: InputMaybe<DiscountCustomerBuysValueInput>
}

export type DiscountCustomerBuysValue = DiscountPurchaseAmount | DiscountQuantity

export type DiscountCustomerBuysValueInput = {
  amount?: InputMaybe<Scalars["Decimal"]["input"]>

  quantity?: InputMaybe<Scalars["UnsignedInt64"]["input"]>
}

export type DiscountCustomerGets = {
  __typename?: "DiscountCustomerGets"

  appliesOnOneTimePurchase: Scalars["Boolean"]["output"]

  appliesOnSubscription: Scalars["Boolean"]["output"]

  items: DiscountItems

  value: DiscountCustomerGetsValue
}

export type DiscountCustomerGetsInput = {
  appliesOnOneTimePurchase?: InputMaybe<Scalars["Boolean"]["input"]>

  appliesOnSubscription?: InputMaybe<Scalars["Boolean"]["input"]>

  items?: InputMaybe<DiscountItemsInput>

  value?: InputMaybe<DiscountCustomerGetsValueInput>
}

export type DiscountCustomerGetsValue = DiscountAmount | DiscountOnQuantity | DiscountPercentage

export type DiscountCustomerGetsValueInput = {
  discountAmount?: InputMaybe<DiscountAmountInput>

  discountOnQuantity?: InputMaybe<DiscountOnQuantityInput>

  percentage?: InputMaybe<Scalars["Float"]["input"]>
}

export type DiscountCustomerSegments = {
  __typename?: "DiscountCustomerSegments"

  segments: Array<Segment>
}

export type DiscountCustomerSegmentsInput = {
  add?: InputMaybe<Array<Scalars["ID"]["input"]>>

  remove?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type DiscountCustomerSelection = DiscountCustomerAll | DiscountCustomerSegments | DiscountCustomers

export type DiscountCustomerSelectionInput = {
  all?: InputMaybe<Scalars["Boolean"]["input"]>

  customerSegments?: InputMaybe<DiscountCustomerSegmentsInput>

  customers?: InputMaybe<DiscountCustomersInput>
}

export type DiscountCustomers = {
  __typename?: "DiscountCustomers"

  customers: Array<Customer>
}

export type DiscountCustomersInput = {
  add?: InputMaybe<Array<Scalars["ID"]["input"]>>

  remove?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type DiscountEffect = DiscountAmount | DiscountPercentage

export type DiscountEffectInput = {
  percentage?: InputMaybe<Scalars["Float"]["input"]>
}

export enum DiscountErrorCode {
  ActivePeriodOverlap = "ACTIVE_PERIOD_OVERLAP",

  Blank = "BLANK",

  Conflict = "CONFLICT",

  Duplicate = "DUPLICATE",

  EqualTo = "EQUAL_TO",

  ExceededMax = "EXCEEDED_MAX",

  GreaterThan = "GREATER_THAN",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  ImplicitDuplicate = "IMPLICIT_DUPLICATE",

  Inclusion = "INCLUSION",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  InvalidCombinesWithForDiscountClass = "INVALID_COMBINES_WITH_FOR_DISCOUNT_CLASS",

  InvalidDiscountClassForPriceRule = "INVALID_DISCOUNT_CLASS_FOR_PRICE_RULE",

  LessThan = "LESS_THAN",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  MaxAppDiscounts = "MAX_APP_DISCOUNTS",

  MinimumSubtotalAndQuantityRangeBothPresent = "MINIMUM_SUBTOTAL_AND_QUANTITY_RANGE_BOTH_PRESENT",

  MissingArgument = "MISSING_ARGUMENT",

  Present = "PRESENT",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooManyArguments = "TOO_MANY_ARGUMENTS",

  TooShort = "TOO_SHORT",

  ValueOutsideRange = "VALUE_OUTSIDE_RANGE",
}

export type DiscountItems = AllDiscountItems | DiscountCollections | DiscountProducts

export type DiscountItemsInput = {
  all?: InputMaybe<Scalars["Boolean"]["input"]>

  collections?: InputMaybe<DiscountCollectionsInput>

  products?: InputMaybe<DiscountProductsInput>
}

export type DiscountMinimumQuantity = {
  __typename?: "DiscountMinimumQuantity"

  greaterThanOrEqualToQuantity: Scalars["UnsignedInt64"]["output"]
}

export type DiscountMinimumQuantityInput = {
  greaterThanOrEqualToQuantity?: InputMaybe<Scalars["UnsignedInt64"]["input"]>
}

export type DiscountMinimumRequirement = DiscountMinimumQuantity | DiscountMinimumSubtotal

export type DiscountMinimumRequirementInput = {
  quantity?: InputMaybe<DiscountMinimumQuantityInput>

  subtotal?: InputMaybe<DiscountMinimumSubtotalInput>
}

export type DiscountMinimumSubtotal = {
  __typename?: "DiscountMinimumSubtotal"

  greaterThanOrEqualToSubtotal: MoneyV2
}

export type DiscountMinimumSubtotalInput = {
  greaterThanOrEqualToSubtotal?: InputMaybe<Scalars["Decimal"]["input"]>
}

export type DiscountNode = HasEvents &
  HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "DiscountNode"

    discount: Discount

    events: EventConnection

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection
  }

export type DiscountNodeEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type DiscountNodeMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type DiscountNodeMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type DiscountNodeMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountNodePrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type DiscountNodePrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountNodeConnection = {
  __typename?: "DiscountNodeConnection"

  edges: Array<DiscountNodeEdge>

  nodes: Array<DiscountNode>

  pageInfo: PageInfo
}

export type DiscountNodeEdge = {
  __typename?: "DiscountNodeEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountNode
}

export type DiscountOnQuantity = {
  __typename?: "DiscountOnQuantity"

  effect: DiscountEffect

  quantity: DiscountQuantity
}

export type DiscountOnQuantityInput = {
  effect?: InputMaybe<DiscountEffectInput>

  quantity?: InputMaybe<Scalars["UnsignedInt64"]["input"]>
}

export type DiscountPercentage = {
  __typename?: "DiscountPercentage"

  percentage: Scalars["Float"]["output"]
}

export type DiscountProducts = {
  __typename?: "DiscountProducts"

  productVariants: ProductVariantConnection

  products: ProductConnection
}

export type DiscountProductsProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountProductsProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountProductsInput = {
  productVariantsToAdd?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productVariantsToRemove?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productsToAdd?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productsToRemove?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type DiscountPurchaseAmount = {
  __typename?: "DiscountPurchaseAmount"

  amount: Scalars["Decimal"]["output"]
}

export type DiscountQuantity = {
  __typename?: "DiscountQuantity"

  quantity: Scalars["UnsignedInt64"]["output"]
}

export type DiscountRedeemCode = {
  __typename?: "DiscountRedeemCode"

  asyncUsageCount: Scalars["Int"]["output"]

  code: Scalars["String"]["output"]

  createdBy?: Maybe<App>

  id: Scalars["ID"]["output"]
}

export type DiscountRedeemCodeBulkAddPayload = {
  __typename?: "DiscountRedeemCodeBulkAddPayload"

  bulkCreation?: Maybe<DiscountRedeemCodeBulkCreation>

  userErrors: Array<DiscountUserError>
}

export type DiscountRedeemCodeBulkCreation = Node & {
  __typename?: "DiscountRedeemCodeBulkCreation"

  codes: DiscountRedeemCodeBulkCreationCodeConnection

  codesCount: Scalars["Int"]["output"]

  createdAt: Scalars["DateTime"]["output"]

  discountCode?: Maybe<DiscountCodeNode>

  done: Scalars["Boolean"]["output"]

  failedCount: Scalars["Int"]["output"]

  id: Scalars["ID"]["output"]

  importedCount: Scalars["Int"]["output"]
}

export type DiscountRedeemCodeBulkCreationCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DiscountRedeemCodeBulkCreationCode = {
  __typename?: "DiscountRedeemCodeBulkCreationCode"

  code: Scalars["String"]["output"]

  discountRedeemCode?: Maybe<DiscountRedeemCode>

  errors: Array<DiscountUserError>
}

export type DiscountRedeemCodeBulkCreationCodeConnection = {
  __typename?: "DiscountRedeemCodeBulkCreationCodeConnection"

  edges: Array<DiscountRedeemCodeBulkCreationCodeEdge>

  nodes: Array<DiscountRedeemCodeBulkCreationCode>

  pageInfo: PageInfo
}

export type DiscountRedeemCodeBulkCreationCodeEdge = {
  __typename?: "DiscountRedeemCodeBulkCreationCodeEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountRedeemCodeBulkCreationCode
}

export type DiscountRedeemCodeConnection = {
  __typename?: "DiscountRedeemCodeConnection"

  edges: Array<DiscountRedeemCodeEdge>

  nodes: Array<DiscountRedeemCode>

  pageInfo: PageInfo
}

export type DiscountRedeemCodeEdge = {
  __typename?: "DiscountRedeemCodeEdge"

  cursor: Scalars["String"]["output"]

  node: DiscountRedeemCode
}

export type DiscountRedeemCodeInput = {
  code: Scalars["String"]["input"]
}

export type DiscountShareableUrl = {
  __typename?: "DiscountShareableUrl"

  targetItemImage?: Maybe<Image>

  targetType: DiscountShareableUrlTargetType

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export enum DiscountShareableUrlTargetType {
  Collection = "COLLECTION",

  Home = "HOME",

  Product = "PRODUCT",
}

export type DiscountShippingDestinationSelection = DiscountCountries | DiscountCountryAll

export type DiscountShippingDestinationSelectionInput = {
  all?: InputMaybe<Scalars["Boolean"]["input"]>

  countries?: InputMaybe<DiscountCountriesInput>
}

export enum DiscountSortKeys {
  CreatedAt = "CREATED_AT",

  EndsAt = "ENDS_AT",

  Id = "ID",

  Relevance = "RELEVANCE",

  StartsAt = "STARTS_AT",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export enum DiscountStatus {
  Active = "ACTIVE",

  Expired = "EXPIRED",

  Scheduled = "SCHEDULED",
}

export enum DiscountTargetType {
  LineItem = "LINE_ITEM",

  ShippingLine = "SHIPPING_LINE",
}

export enum DiscountType {
  AutomaticDiscount = "AUTOMATIC_DISCOUNT",

  CodeDiscount = "CODE_DISCOUNT",

  Manual = "MANUAL",
}

export type DiscountUserError = DisplayableError & {
  __typename?: "DiscountUserError"

  code?: Maybe<DiscountErrorCode>

  extraInfo?: Maybe<Scalars["String"]["output"]>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type DisplayableError = {
  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type DisputeEvidenceUpdatePayload = {
  __typename?: "DisputeEvidenceUpdatePayload"

  disputeEvidence?: Maybe<ShopifyPaymentsDisputeEvidence>

  userErrors: Array<DisputeEvidenceUpdateUserError>
}

export type DisputeEvidenceUpdateUserError = DisplayableError & {
  __typename?: "DisputeEvidenceUpdateUserError"

  code?: Maybe<DisputeEvidenceUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum DisputeEvidenceUpdateUserErrorCode {
  DisputeEvidenceNotFound = "DISPUTE_EVIDENCE_NOT_FOUND",

  EvidenceAlreadyAccepted = "EVIDENCE_ALREADY_ACCEPTED",

  EvidencePastDueDate = "EVIDENCE_PAST_DUE_DATE",

  FilesSizeExceededLimit = "FILES_SIZE_EXCEEDED_LIMIT",

  Invalid = "INVALID",

  TooLarge = "TOO_LARGE",
}

export enum DisputeStatus {
  Accepted = "ACCEPTED",
  ChargeRefunded = "CHARGE_REFUNDED",
  Lost = "LOST",
  NeedsResponse = "NEEDS_RESPONSE",
  UnderReview = "UNDER_REVIEW",
  Won = "WON",
}

export enum DisputeType {
  Chargeback = "CHARGEBACK",

  Inquiry = "INQUIRY",
}

export type Domain = Node & {
  __typename?: "Domain"

  host: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  localization?: Maybe<DomainLocalization>

  marketWebPresence?: Maybe<MarketWebPresence>

  sslEnabled: Scalars["Boolean"]["output"]

  url: Scalars["URL"]["output"]
}

export type DomainLocalization = {
  __typename?: "DomainLocalization"

  alternateLocales: Array<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  defaultLocale: Scalars["String"]["output"]
}

export type DraftOrder = CommentEventSubject &
  HasEvents &
  HasLocalizationExtensions &
  HasMetafields &
  LegacyInteroperability &
  Navigable &
  Node & {
    __typename?: "DraftOrder"

    appliedDiscount?: Maybe<DraftOrderAppliedDiscount>

    billingAddress?: Maybe<MailingAddress>

    billingAddressMatchesShippingAddress: Scalars["Boolean"]["output"]

    completedAt?: Maybe<Scalars["DateTime"]["output"]>

    createdAt: Scalars["DateTime"]["output"]

    currencyCode: CurrencyCode

    customAttributes: Array<Attribute>

    customer?: Maybe<Customer>

    defaultCursor: Scalars["String"]["output"]

    email?: Maybe<Scalars["String"]["output"]>

    events: EventConnection

    hasTimelineComment: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    invoiceEmailTemplateSubject: Scalars["String"]["output"]

    invoiceSentAt?: Maybe<Scalars["DateTime"]["output"]>

    invoiceUrl?: Maybe<Scalars["URL"]["output"]>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    lineItems: DraftOrderLineItemConnection

    lineItemsSubtotalPrice: MoneyBag

    localizationExtensions: LocalizationExtensionConnection

    marketName: Scalars["String"]["output"]

    marketRegionCountryCode: CountryCode

    metafield?: Maybe<Metafield>

    metafields: MetafieldConnection

    name: Scalars["String"]["output"]

    note2?: Maybe<Scalars["String"]["output"]>

    order?: Maybe<Order>

    paymentTerms?: Maybe<PaymentTerms>

    phone?: Maybe<Scalars["String"]["output"]>

    poNumber?: Maybe<Scalars["String"]["output"]>

    presentmentCurrencyCode: CurrencyCode
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    purchasingEntity?: Maybe<PurchasingEntity>

    ready: Scalars["Boolean"]["output"]

    reserveInventoryUntil?: Maybe<Scalars["DateTime"]["output"]>

    shippingAddress?: Maybe<MailingAddress>

    shippingLine?: Maybe<ShippingLine>

    status: DraftOrderStatus

    subtotalPrice: Scalars["Money"]["output"]

    subtotalPriceSet: MoneyBag

    tags: Array<Scalars["String"]["output"]>

    taxExempt: Scalars["Boolean"]["output"]

    taxLines: Array<TaxLine>

    taxesIncluded: Scalars["Boolean"]["output"]

    totalDiscountsSet: MoneyBag

    totalLineItemsPriceSet: MoneyBag

    totalPrice: Scalars["Money"]["output"]

    totalPriceSet: MoneyBag

    totalShippingPrice: Scalars["Money"]["output"]

    totalShippingPriceSet: MoneyBag

    totalTax: Scalars["Money"]["output"]

    totalTaxSet: MoneyBag

    totalWeight: Scalars["UnsignedInt64"]["output"]

    updatedAt: Scalars["DateTime"]["output"]

    visibleToCustomer: Scalars["Boolean"]["output"]
  }

export type DraftOrderEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type DraftOrderLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DraftOrderLocalizationExtensionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  countryCodes?: InputMaybe<Array<CountryCode>>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  purposes?: InputMaybe<Array<LocalizationExtensionPurpose>>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DraftOrderMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type DraftOrderMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DraftOrderPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type DraftOrderPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DraftOrderAppliedDiscount = {
  __typename?: "DraftOrderAppliedDiscount"
  /**
   * Amount of the order-level discount that's applied to the draft order.
   * @deprecated Use `amountV2` instead.
   */
  amount: Scalars["Money"]["output"]

  amountSet: MoneyBag

  amountV2: MoneyV2

  description: Scalars["String"]["output"]

  title?: Maybe<Scalars["String"]["output"]>

  value: Scalars["Float"]["output"]

  valueType: DraftOrderAppliedDiscountType
}

export type DraftOrderAppliedDiscountInput = {
  amount?: InputMaybe<Scalars["Money"]["input"]>

  description?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  value: Scalars["Float"]["input"]

  valueType: DraftOrderAppliedDiscountType
}

export enum DraftOrderAppliedDiscountType {
  FixedAmount = "FIXED_AMOUNT",

  Percentage = "PERCENTAGE",
}

export type DraftOrderBulkAddTagsPayload = {
  __typename?: "DraftOrderBulkAddTagsPayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type DraftOrderBulkDeletePayload = {
  __typename?: "DraftOrderBulkDeletePayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type DraftOrderBulkRemoveTagsPayload = {
  __typename?: "DraftOrderBulkRemoveTagsPayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type DraftOrderCalculatePayload = {
  __typename?: "DraftOrderCalculatePayload"

  calculatedDraftOrder?: Maybe<CalculatedDraftOrder>

  userErrors: Array<UserError>
}

export type DraftOrderCompletePayload = {
  __typename?: "DraftOrderCompletePayload"

  draftOrder?: Maybe<DraftOrder>

  userErrors: Array<UserError>
}

export type DraftOrderConnection = {
  __typename?: "DraftOrderConnection"

  edges: Array<DraftOrderEdge>

  nodes: Array<DraftOrder>

  pageInfo: PageInfo
}

export type DraftOrderCreateFromOrderPayload = {
  __typename?: "DraftOrderCreateFromOrderPayload"

  draftOrder?: Maybe<DraftOrder>

  userErrors: Array<UserError>
}

export type DraftOrderCreateMerchantCheckoutPayload = {
  __typename?: "DraftOrderCreateMerchantCheckoutPayload"

  userErrors: Array<UserError>
}

export type DraftOrderCreatePayload = {
  __typename?: "DraftOrderCreatePayload"

  draftOrder?: Maybe<DraftOrder>

  userErrors: Array<UserError>
}

export type DraftOrderDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type DraftOrderDeletePayload = {
  __typename?: "DraftOrderDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type DraftOrderDuplicatePayload = {
  __typename?: "DraftOrderDuplicatePayload"

  draftOrder?: Maybe<DraftOrder>

  userErrors: Array<UserError>
}

export type DraftOrderEdge = {
  __typename?: "DraftOrderEdge"

  cursor: Scalars["String"]["output"]

  node: DraftOrder
}

export type DraftOrderInput = {
  appliedDiscount?: InputMaybe<DraftOrderAppliedDiscountInput>

  billingAddress?: InputMaybe<MailingAddressInput>

  customAttributes?: InputMaybe<Array<AttributeInput>>

  email?: InputMaybe<Scalars["String"]["input"]>

  lineItems?: InputMaybe<Array<DraftOrderLineItemInput>>

  localizationExtensions?: InputMaybe<Array<LocalizationExtensionInput>>

  marketRegionCountryCode?: InputMaybe<CountryCode>

  metafields?: InputMaybe<Array<MetafieldInput>>

  note?: InputMaybe<Scalars["String"]["input"]>

  paymentTerms?: InputMaybe<PaymentTermsInput>

  phone?: InputMaybe<Scalars["String"]["input"]>

  poNumber?: InputMaybe<Scalars["String"]["input"]>

  presentmentCurrencyCode?: InputMaybe<CurrencyCode>

  purchasingEntity?: InputMaybe<PurchasingEntityInput>

  reserveInventoryUntil?: InputMaybe<Scalars["DateTime"]["input"]>

  shippingAddress?: InputMaybe<MailingAddressInput>

  shippingLine?: InputMaybe<ShippingLineInput>

  sourceName?: InputMaybe<Scalars["String"]["input"]>

  tags?: InputMaybe<Array<Scalars["String"]["input"]>>

  taxExempt?: InputMaybe<Scalars["Boolean"]["input"]>

  useCustomerDefaultAddress?: InputMaybe<Scalars["Boolean"]["input"]>

  visibleToCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type DraftOrderInvoicePreviewPayload = {
  __typename?: "DraftOrderInvoicePreviewPayload"

  previewHtml?: Maybe<Scalars["HTML"]["output"]>

  previewSubject?: Maybe<Scalars["HTML"]["output"]>

  userErrors: Array<UserError>
}

export type DraftOrderInvoiceSendPayload = {
  __typename?: "DraftOrderInvoiceSendPayload"

  draftOrder?: Maybe<DraftOrder>

  userErrors: Array<UserError>
}

export type DraftOrderLineItem = Node & {
  __typename?: "DraftOrderLineItem"

  appliedDiscount?: Maybe<DraftOrderAppliedDiscount>

  custom: Scalars["Boolean"]["output"]

  customAttributes: Array<Attribute>

  customAttributesV2: Array<TypedAttribute>

  discountedTotal: Scalars["Money"]["output"]

  discountedTotalSet: MoneyBag

  discountedUnitPrice: Scalars["Money"]["output"]

  discountedUnitPriceSet: MoneyBag

  fulfillmentService?: Maybe<FulfillmentService>
  /**
   * The weight of the line item in grams. The weight can only be specified if the line item is a custom
   * line item.
   *
   * @deprecated Use `weight` instead.
   */
  grams?: Maybe<Scalars["Int"]["output"]>

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  isGiftCard: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]

  originalTotal: Scalars["Money"]["output"]

  originalTotalSet: MoneyBag

  originalUnitPrice: Scalars["Money"]["output"]

  originalUnitPriceSet: MoneyBag

  product?: Maybe<Product>

  quantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  taxLines: Array<TaxLine>

  taxable: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]

  totalDiscount: Scalars["Money"]["output"]

  totalDiscountSet: MoneyBag

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>

  vendor?: Maybe<Scalars["String"]["output"]>

  weight?: Maybe<Weight>
}

export type DraftOrderLineItemConnection = {
  __typename?: "DraftOrderLineItemConnection"

  edges: Array<DraftOrderLineItemEdge>

  nodes: Array<DraftOrderLineItem>

  pageInfo: PageInfo
}

export type DraftOrderLineItemEdge = {
  __typename?: "DraftOrderLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: DraftOrderLineItem
}

export type DraftOrderLineItemInput = {
  appliedDiscount?: InputMaybe<DraftOrderAppliedDiscountInput>

  customAttributes?: InputMaybe<Array<AttributeInput>>

  originalUnitPrice?: InputMaybe<Scalars["Money"]["input"]>

  quantity: Scalars["Int"]["input"]

  requiresShipping?: InputMaybe<Scalars["Boolean"]["input"]>

  sku?: InputMaybe<Scalars["String"]["input"]>

  taxable?: InputMaybe<Scalars["Boolean"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  variantId?: InputMaybe<Scalars["ID"]["input"]>

  weight?: InputMaybe<WeightInput>
}

export enum DraftOrderSortKeys {
  CustomerName = "CUSTOMER_NAME",

  Id = "ID",

  Number = "NUMBER",

  Relevance = "RELEVANCE",

  Status = "STATUS",

  TotalPrice = "TOTAL_PRICE",

  UpdatedAt = "UPDATED_AT",
}

export enum DraftOrderStatus {
  Completed = "COMPLETED",

  InvoiceSent = "INVOICE_SENT",

  Open = "OPEN",
}

export type DraftOrderTag = Node & {
  __typename?: "DraftOrderTag"

  handle: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  title: Scalars["String"]["output"]
}

export type DraftOrderUpdatePayload = {
  __typename?: "DraftOrderUpdatePayload"

  draftOrder?: Maybe<DraftOrder>

  userErrors: Array<UserError>
}

export type Duty = Node & {
  __typename?: "Duty"

  countryCodeOfOrigin?: Maybe<CountryCode>

  harmonizedSystemCode?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  price: MoneyBag

  taxLines: Array<TaxLine>
}

export type DutySale = Sale & {
  __typename?: "DutySale"

  actionType: SaleActionType

  duty: Duty

  id: Scalars["ID"]["output"]

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export type EditableProperty = {
  __typename?: "EditableProperty"

  locked: Scalars["Boolean"]["output"]

  reason?: Maybe<Scalars["FormattedString"]["output"]>
}

export type EmailInput = {
  bcc?: InputMaybe<Array<Scalars["String"]["input"]>>

  body?: InputMaybe<Scalars["String"]["input"]>

  customMessage?: InputMaybe<Scalars["String"]["input"]>

  from?: InputMaybe<Scalars["String"]["input"]>

  subject?: InputMaybe<Scalars["String"]["input"]>

  to?: InputMaybe<Scalars["String"]["input"]>
}

export type ErrorPosition = {
  __typename?: "ErrorPosition"

  character: Scalars["Int"]["output"]

  line: Scalars["Int"]["output"]
}

export type ErrorsServerPixelUserError = DisplayableError & {
  __typename?: "ErrorsServerPixelUserError"

  code?: Maybe<ErrorsServerPixelUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ErrorsServerPixelUserErrorCode {
  AlreadyExists = "ALREADY_EXISTS",

  NeedsConfigurationToConnect = "NEEDS_CONFIGURATION_TO_CONNECT",

  NotFound = "NOT_FOUND",

  PubSubError = "PUB_SUB_ERROR",
}

export type ErrorsWebPixelUserError = DisplayableError & {
  __typename?: "ErrorsWebPixelUserError"

  code?: Maybe<ErrorsWebPixelUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ErrorsWebPixelUserErrorCode {
  Blank = "BLANK",

  InvalidSettings = "INVALID_SETTINGS",

  NotFound = "NOT_FOUND",

  Taken = "TAKEN",

  UnableToDelete = "UNABLE_TO_DELETE",
}

export type Event = {
  appTitle?: Maybe<Scalars["String"]["output"]>

  attributeToApp: Scalars["Boolean"]["output"]

  attributeToUser: Scalars["Boolean"]["output"]

  createdAt: Scalars["DateTime"]["output"]

  criticalAlert: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  message: Scalars["FormattedString"]["output"]
}

export type EventBridgeServerPixelUpdatePayload = {
  __typename?: "EventBridgeServerPixelUpdatePayload"

  serverPixel?: Maybe<ServerPixel>

  userErrors: Array<ErrorsServerPixelUserError>
}

export type EventBridgeWebhookSubscriptionCreatePayload = {
  __typename?: "EventBridgeWebhookSubscriptionCreatePayload"

  userErrors: Array<UserError>

  webhookSubscription?: Maybe<WebhookSubscription>
}

export type EventBridgeWebhookSubscriptionInput = {
  arn?: InputMaybe<Scalars["ARN"]["input"]>

  format?: InputMaybe<WebhookSubscriptionFormat>

  includeFields?: InputMaybe<Array<Scalars["String"]["input"]>>

  metafieldNamespaces?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type EventBridgeWebhookSubscriptionUpdatePayload = {
  __typename?: "EventBridgeWebhookSubscriptionUpdatePayload"

  userErrors: Array<UserError>

  webhookSubscription?: Maybe<WebhookSubscription>
}

export type EventConnection = {
  __typename?: "EventConnection"

  edges: Array<EventEdge>

  nodes: Array<Event>

  pageInfo: PageInfo
}

export type EventEdge = {
  __typename?: "EventEdge"

  cursor: Scalars["String"]["output"]

  node: Event
}

export enum EventSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export type ExchangeV2 = Node & {
  __typename?: "ExchangeV2"

  additions: ExchangeV2Additions

  completedAt?: Maybe<Scalars["DateTime"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  location?: Maybe<Location>

  note?: Maybe<Scalars["String"]["output"]>

  refunds: Array<Refund>

  returns: ExchangeV2Returns

  staffMember?: Maybe<StaffMember>

  totalAmountProcessedSet: MoneyBag

  totalPriceSet: MoneyBag

  transactions: Array<OrderTransaction>
}

export type ExchangeV2Additions = {
  __typename?: "ExchangeV2Additions"

  lineItems: Array<ExchangeV2LineItem>

  subtotalPriceSet: MoneyBag

  taxLines: Array<TaxLine>

  totalPriceSet: MoneyBag
}

export type ExchangeV2Connection = {
  __typename?: "ExchangeV2Connection"

  edges: Array<ExchangeV2Edge>

  nodes: Array<ExchangeV2>

  pageInfo: PageInfo
}

export type ExchangeV2Edge = {
  __typename?: "ExchangeV2Edge"

  cursor: Scalars["String"]["output"]

  node: ExchangeV2
}

export type ExchangeV2LineItem = {
  __typename?: "ExchangeV2LineItem"

  customAttributes: Array<Attribute>

  discountedTotalSet: MoneyBag

  discountedUnitPriceSet: MoneyBag

  fulfillmentService?: Maybe<FulfillmentService>

  giftCard: Scalars["Boolean"]["output"]

  giftCards: Array<GiftCard>

  lineItem?: Maybe<LineItem>

  name: Scalars["String"]["output"]

  originalTotalSet: MoneyBag

  originalUnitPriceSet: MoneyBag

  quantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  taxLines: Array<TaxLine>

  taxable: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>

  vendor?: Maybe<Scalars["String"]["output"]>
}

export type ExchangeV2Returns = {
  __typename?: "ExchangeV2Returns"

  lineItems: Array<ExchangeV2LineItem>

  orderDiscountAmountSet: MoneyBag

  shippingRefundAmountSet: MoneyBag

  subtotalPriceSet: MoneyBag

  taxLines: Array<TaxLine>

  tipRefundAmountSet: MoneyBag

  totalPriceSet: MoneyBag
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

    mediaErrors: Array<MediaError>

    mediaWarnings: Array<MediaWarning>

    originUrl: Scalars["URL"]["output"]

    preview?: Maybe<MediaPreviewImage>

    status: MediaStatus
  }

export type FailedRequirement = {
  __typename?: "FailedRequirement"

  action?: Maybe<NavigationItem>

  message: Scalars["String"]["output"]
}

export type File = {
  alt?: Maybe<Scalars["String"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  fileErrors: Array<FileError>

  fileStatus: FileStatus

  id: Scalars["ID"]["output"]

  preview?: Maybe<MediaPreviewImage>

  updatedAt: Scalars["DateTime"]["output"]
}

export type FileAcknowledgeUpdateFailedPayload = {
  __typename?: "FileAcknowledgeUpdateFailedPayload"

  files?: Maybe<Array<File>>

  userErrors: Array<FilesUserError>
}

export type FileConnection = {
  __typename?: "FileConnection"

  edges: Array<FileEdge>

  nodes: Array<File>

  pageInfo: PageInfo
}

export enum FileContentType {
  File = "FILE",

  Image = "IMAGE",

  Video = "VIDEO",
}

export type FileCreateInput = {
  alt?: InputMaybe<Scalars["String"]["input"]>

  contentType?: InputMaybe<FileContentType>

  duplicateResolutionMode?: InputMaybe<FileCreateInputDuplicateResolutionMode>

  filename?: InputMaybe<Scalars["String"]["input"]>

  originalSource: Scalars["String"]["input"]
}

export enum FileCreateInputDuplicateResolutionMode {
  AppendUuid = "APPEND_UUID",

  RaiseError = "RAISE_ERROR",

  Replace = "REPLACE",
}

export type FileCreatePayload = {
  __typename?: "FileCreatePayload"

  files?: Maybe<Array<File>>

  userErrors: Array<FilesUserError>
}

export type FileDeletePayload = {
  __typename?: "FileDeletePayload"

  deletedFileIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<FilesUserError>
}

export type FileEdge = {
  __typename?: "FileEdge"

  cursor: Scalars["String"]["output"]

  node: File
}

export type FileError = {
  __typename?: "FileError"

  code: FileErrorCode

  details?: Maybe<Scalars["String"]["output"]>

  message: Scalars["String"]["output"]
}

export enum FileErrorCode {
  DuplicateFilenameError = "DUPLICATE_FILENAME_ERROR",

  ExternalVideoEmbedDisabled = "EXTERNAL_VIDEO_EMBED_DISABLED",

  ExternalVideoEmbedNotFoundOrTranscoding = "EXTERNAL_VIDEO_EMBED_NOT_FOUND_OR_TRANSCODING",

  ExternalVideoInvalidAspectRatio = "EXTERNAL_VIDEO_INVALID_ASPECT_RATIO",

  ExternalVideoNotFound = "EXTERNAL_VIDEO_NOT_FOUND",

  ExternalVideoUnlisted = "EXTERNAL_VIDEO_UNLISTED",

  FileStorageLimitExceeded = "FILE_STORAGE_LIMIT_EXCEEDED",

  GenericFileDownloadFailure = "GENERIC_FILE_DOWNLOAD_FAILURE",

  GenericFileInvalidSize = "GENERIC_FILE_INVALID_SIZE",

  ImageDownloadFailure = "IMAGE_DOWNLOAD_FAILURE",

  ImageProcessingFailure = "IMAGE_PROCESSING_FAILURE",

  InvalidImageAspectRatio = "INVALID_IMAGE_ASPECT_RATIO",

  InvalidImageFileSize = "INVALID_IMAGE_FILE_SIZE",

  InvalidImageResolution = "INVALID_IMAGE_RESOLUTION",

  InvalidSignedUrl = "INVALID_SIGNED_URL",

  MediaTimeoutError = "MEDIA_TIMEOUT_ERROR",

  Model3DGlbOutputCreationError = "MODEL3D_GLB_OUTPUT_CREATION_ERROR",

  Model3DGlbToUsdzConversionError = "MODEL3D_GLB_TO_USDZ_CONVERSION_ERROR",

  Model3DProcessingFailure = "MODEL3D_PROCESSING_FAILURE",

  Model3DThumbnailGenerationError = "MODEL3D_THUMBNAIL_GENERATION_ERROR",

  Model3DThumbnailRegenerationError = "MODEL3D_THUMBNAIL_REGENERATION_ERROR",

  Model3DValidationError = "MODEL3D_VALIDATION_ERROR",

  Unknown = "UNKNOWN",

  UnsupportedImageFileType = "UNSUPPORTED_IMAGE_FILE_TYPE",

  VideoInvalidFiletypeError = "VIDEO_INVALID_FILETYPE_ERROR",

  VideoMaxDurationError = "VIDEO_MAX_DURATION_ERROR",

  VideoMaxHeightError = "VIDEO_MAX_HEIGHT_ERROR",

  VideoMaxWidthError = "VIDEO_MAX_WIDTH_ERROR",

  VideoMetadataReadError = "VIDEO_METADATA_READ_ERROR",

  VideoMinDurationError = "VIDEO_MIN_DURATION_ERROR",

  VideoMinHeightError = "VIDEO_MIN_HEIGHT_ERROR",

  VideoMinWidthError = "VIDEO_MIN_WIDTH_ERROR",

  VideoValidationError = "VIDEO_VALIDATION_ERROR",
}

export enum FileSortKeys {
  CreatedAt = "CREATED_AT",

  Filename = "FILENAME",

  Id = "ID",

  OriginalUploadSize = "ORIGINAL_UPLOAD_SIZE",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export enum FileStatus {
  Failed = "FAILED",

  Processing = "PROCESSING",

  Ready = "READY",

  Uploaded = "UPLOADED",
}

export type FileUpdateInput = {
  alt?: InputMaybe<Scalars["String"]["input"]>

  filename?: InputMaybe<Scalars["String"]["input"]>

  id: Scalars["ID"]["input"]

  originalSource?: InputMaybe<Scalars["String"]["input"]>

  previewImageSource?: InputMaybe<Scalars["String"]["input"]>
}

export type FileUpdatePayload = {
  __typename?: "FileUpdatePayload"

  files?: Maybe<Array<File>>

  userErrors: Array<FilesUserError>
}

export enum FilesErrorCode {
  AltValueLimitExceeded = "ALT_VALUE_LIMIT_EXCEEDED",

  BlankSearch = "BLANK_SEARCH",

  FilenameAlreadyExists = "FILENAME_ALREADY_EXISTS",

  FileDoesNotExist = "FILE_DOES_NOT_EXIST",

  FileLocked = "FILE_LOCKED",

  Invalid = "INVALID",

  InvalidDuplicateModeForType = "INVALID_DUPLICATE_MODE_FOR_TYPE",

  InvalidFilename = "INVALID_FILENAME",

  InvalidFilenameExtension = "INVALID_FILENAME_EXTENSION",

  InvalidImageSourceUrl = "INVALID_IMAGE_SOURCE_URL",

  InvalidQuery = "INVALID_QUERY",

  MismatchedFilenameAndOriginalSource = "MISMATCHED_FILENAME_AND_ORIGINAL_SOURCE",

  MissingArguments = "MISSING_ARGUMENTS",

  MissingFilenameForDuplicateModeReplace = "MISSING_FILENAME_FOR_DUPLICATE_MODE_REPLACE",

  NonImageMediaPerShopLimitExceeded = "NON_IMAGE_MEDIA_PER_SHOP_LIMIT_EXCEEDED",

  NonReadyState = "NON_READY_STATE",

  TooManyArguments = "TOO_MANY_ARGUMENTS",

  UnacceptableAsset = "UNACCEPTABLE_ASSET",

  UnacceptableTrialAsset = "UNACCEPTABLE_TRIAL_ASSET",

  UnacceptableUnverifiedTrialAsset = "UNACCEPTABLE_UNVERIFIED_TRIAL_ASSET",

  UnsupportedMediaTypeForFilenameUpdate = "UNSUPPORTED_MEDIA_TYPE_FOR_FILENAME_UPDATE",
}

export type FilesUserError = DisplayableError & {
  __typename?: "FilesUserError"

  code?: Maybe<FilesErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type FilterOption = {
  __typename?: "FilterOption"

  label: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type FinancialSummaryDiscountAllocation = {
  __typename?: "FinancialSummaryDiscountAllocation"

  approximateAllocatedAmountPerItem: MoneyBag

  discountApplication: FinancialSummaryDiscountApplication
}

export type FinancialSummaryDiscountApplication = {
  __typename?: "FinancialSummaryDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType
}

export type FlowGenerateSignaturePayload = {
  __typename?: "FlowGenerateSignaturePayload"

  payload?: Maybe<Scalars["String"]["output"]>

  signature?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<UserError>
}

export type FlowTriggerReceivePayload = {
  __typename?: "FlowTriggerReceivePayload"

  userErrors: Array<UserError>
}

export type Fulfillment = LegacyInteroperability &
  Node & {
    __typename?: "Fulfillment"

    createdAt: Scalars["DateTime"]["output"]

    deliveredAt?: Maybe<Scalars["DateTime"]["output"]>

    displayStatus?: Maybe<FulfillmentDisplayStatus>

    estimatedDeliveryAt?: Maybe<Scalars["DateTime"]["output"]>

    events: FulfillmentEventConnection

    fulfillmentLineItems: FulfillmentLineItemConnection

    fulfillmentOrders: FulfillmentOrderConnection

    id: Scalars["ID"]["output"]

    inTransitAt?: Maybe<Scalars["DateTime"]["output"]>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    location?: Maybe<Location>

    name: Scalars["String"]["output"]

    order: Order

    originAddress?: Maybe<FulfillmentOriginAddress>

    requiresShipping: Scalars["Boolean"]["output"]

    service?: Maybe<FulfillmentService>

    status: FulfillmentStatus

    totalQuantity: Scalars["Int"]["output"]

    trackingInfo: Array<FulfillmentTrackingInfo>

    updatedAt: Scalars["DateTime"]["output"]
  }

export type FulfillmentEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<FulfillmentEventSortKeys>
}

export type FulfillmentFulfillmentLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentTrackingInfoArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type FulfillmentCancelPayload = {
  __typename?: "FulfillmentCancelPayload"

  fulfillment?: Maybe<Fulfillment>

  userErrors: Array<UserError>
}

export type FulfillmentConnection = {
  __typename?: "FulfillmentConnection"

  edges: Array<FulfillmentEdge>

  nodes: Array<Fulfillment>

  pageInfo: PageInfo
}

export type FulfillmentConstraintRule = HasMetafields &
  Node & {
    __typename?: "FulfillmentConstraintRule"

    function: ShopifyFunction

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection
  }

export type FulfillmentConstraintRuleMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type FulfillmentConstraintRuleMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentConstraintRulePrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type FulfillmentConstraintRulePrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentConstraintRuleCreatePayload = {
  __typename?: "FulfillmentConstraintRuleCreatePayload"

  fulfillmentConstraintRule?: Maybe<FulfillmentConstraintRule>

  userErrors: Array<FulfillmentConstraintRuleCreateUserError>
}

export type FulfillmentConstraintRuleCreateUserError = DisplayableError & {
  __typename?: "FulfillmentConstraintRuleCreateUserError"

  code?: Maybe<FulfillmentConstraintRuleCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentConstraintRuleCreateUserErrorCode {
  CustomAppFunctionNotEligible = "CUSTOM_APP_FUNCTION_NOT_ELIGIBLE",

  FunctionAlreadyRegistered = "FUNCTION_ALREADY_REGISTERED",

  FunctionDoesNotImplement = "FUNCTION_DOES_NOT_IMPLEMENT",

  FunctionNotFound = "FUNCTION_NOT_FOUND",

  FunctionPendingDeletion = "FUNCTION_PENDING_DELETION",

  InputInvalid = "INPUT_INVALID",
}

export type FulfillmentConstraintRuleDeletePayload = {
  __typename?: "FulfillmentConstraintRuleDeletePayload"

  success?: Maybe<Scalars["Boolean"]["output"]>

  userErrors: Array<FulfillmentConstraintRuleDeleteUserError>
}

export type FulfillmentConstraintRuleDeleteUserError = DisplayableError & {
  __typename?: "FulfillmentConstraintRuleDeleteUserError"

  code?: Maybe<FulfillmentConstraintRuleDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentConstraintRuleDeleteUserErrorCode {
  NotFound = "NOT_FOUND",

  UnauthorizedAppScope = "UNAUTHORIZED_APP_SCOPE",
}

export type FulfillmentCreateV2Payload = {
  __typename?: "FulfillmentCreateV2Payload"

  fulfillment?: Maybe<Fulfillment>

  userErrors: Array<UserError>
}

export enum FulfillmentDisplayStatus {
  AttemptedDelivery = "ATTEMPTED_DELIVERY",

  Canceled = "CANCELED",

  Confirmed = "CONFIRMED",

  Delivered = "DELIVERED",

  Failure = "FAILURE",

  Fulfilled = "FULFILLED",

  InTransit = "IN_TRANSIT",

  LabelPrinted = "LABEL_PRINTED",

  LabelPurchased = "LABEL_PURCHASED",

  LabelVoided = "LABEL_VOIDED",

  MarkedAsFulfilled = "MARKED_AS_FULFILLED",

  NotDelivered = "NOT_DELIVERED",

  OutForDelivery = "OUT_FOR_DELIVERY",

  PickedUp = "PICKED_UP",

  ReadyForPickup = "READY_FOR_PICKUP",

  Submitted = "SUBMITTED",
}

export type FulfillmentEdge = {
  __typename?: "FulfillmentEdge"

  cursor: Scalars["String"]["output"]

  node: Fulfillment
}

export type FulfillmentEvent = Node & {
  __typename?: "FulfillmentEvent"

  address1?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  estimatedDeliveryAt?: Maybe<Scalars["DateTime"]["output"]>

  happenedAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  latitude?: Maybe<Scalars["Float"]["output"]>

  longitude?: Maybe<Scalars["Float"]["output"]>

  message?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  status: FulfillmentEventStatus

  zip?: Maybe<Scalars["String"]["output"]>
}

export type FulfillmentEventConnection = {
  __typename?: "FulfillmentEventConnection"

  edges: Array<FulfillmentEventEdge>

  nodes: Array<FulfillmentEvent>

  pageInfo: PageInfo
}

export type FulfillmentEventCreatePayload = {
  __typename?: "FulfillmentEventCreatePayload"

  fulfillmentEvent?: Maybe<FulfillmentEvent>

  userErrors: Array<UserError>
}

export type FulfillmentEventEdge = {
  __typename?: "FulfillmentEventEdge"

  cursor: Scalars["String"]["output"]

  node: FulfillmentEvent
}

export type FulfillmentEventInput = {
  address1?: InputMaybe<Scalars["String"]["input"]>

  city?: InputMaybe<Scalars["String"]["input"]>

  country?: InputMaybe<Scalars["String"]["input"]>

  estimatedDeliveryAt?: InputMaybe<Scalars["DateTime"]["input"]>

  fulfillmentId: Scalars["ID"]["input"]

  happenedAt?: InputMaybe<Scalars["DateTime"]["input"]>

  latitude?: InputMaybe<Scalars["Float"]["input"]>

  longitude?: InputMaybe<Scalars["Float"]["input"]>

  message?: InputMaybe<Scalars["String"]["input"]>

  province?: InputMaybe<Scalars["String"]["input"]>

  status: FulfillmentEventStatus

  zip?: InputMaybe<Scalars["String"]["input"]>
}

export enum FulfillmentEventSortKeys {
  HappenedAt = "HAPPENED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export enum FulfillmentEventStatus {
  AttemptedDelivery = "ATTEMPTED_DELIVERY",

  Confirmed = "CONFIRMED",

  Delivered = "DELIVERED",

  Failure = "FAILURE",

  InTransit = "IN_TRANSIT",

  LabelPrinted = "LABEL_PRINTED",

  LabelPurchased = "LABEL_PURCHASED",

  OutForDelivery = "OUT_FOR_DELIVERY",

  ReadyForPickup = "READY_FOR_PICKUP",
}

export type FulfillmentHold = {
  __typename?: "FulfillmentHold"

  heldBy?: Maybe<Scalars["String"]["output"]>

  reason: FulfillmentHoldReason

  reasonNotes?: Maybe<Scalars["String"]["output"]>
}

export enum FulfillmentHoldReason {
  AwaitingPayment = "AWAITING_PAYMENT",

  AwaitingReturnItems = "AWAITING_RETURN_ITEMS",

  HighRiskOfFraud = "HIGH_RISK_OF_FRAUD",

  IncorrectAddress = "INCORRECT_ADDRESS",

  InventoryOutOfStock = "INVENTORY_OUT_OF_STOCK",

  OnlineStorePostPurchaseCrossSell = "ONLINE_STORE_POST_PURCHASE_CROSS_SELL",

  Other = "OTHER",

  UnknownDeliveryDate = "UNKNOWN_DELIVERY_DATE",
}

export type FulfillmentLineItem = Node & {
  __typename?: "FulfillmentLineItem"
  /**
   * The total price after discounts are applied.
   * @deprecated Use `discountedTotalSet` instead.
   */
  discountedTotal: Scalars["Money"]["output"]

  discountedTotalSet: MoneyBag

  id: Scalars["ID"]["output"]

  lineItem: LineItem
  /**
   * The total price before discounts are applied.
   * @deprecated Use `originalTotalSet` instead.
   */
  originalTotal: Scalars["Money"]["output"]

  originalTotalSet: MoneyBag

  quantity?: Maybe<Scalars["Int"]["output"]>
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

export type FulfillmentOrder = Node & {
  __typename?: "FulfillmentOrder"

  assignedLocation: FulfillmentOrderAssignedLocation

  channelId?: Maybe<Scalars["ID"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  deliveryMethod?: Maybe<DeliveryMethod>

  destination?: Maybe<FulfillmentOrderDestination>

  fulfillAt?: Maybe<Scalars["DateTime"]["output"]>

  fulfillBy?: Maybe<Scalars["DateTime"]["output"]>

  fulfillmentHolds: Array<FulfillmentHold>

  fulfillmentOrdersForMerge: FulfillmentOrderConnection

  fulfillments: FulfillmentConnection

  id: Scalars["ID"]["output"]

  internationalDuties?: Maybe<FulfillmentOrderInternationalDuties>

  lineItems: FulfillmentOrderLineItemConnection

  locationsForMove: FulfillmentOrderLocationForMoveConnection

  merchantRequests: FulfillmentOrderMerchantRequestConnection

  order: Order

  orderId: Scalars["ID"]["output"]

  orderName: Scalars["String"]["output"]

  orderProcessedAt: Scalars["DateTime"]["output"]

  requestStatus: FulfillmentOrderRequestStatus

  status: FulfillmentOrderStatus

  supportedActions: Array<FulfillmentOrderSupportedAction>

  updatedAt: Scalars["DateTime"]["output"]
}

export type FulfillmentOrderFulfillmentOrdersForMergeArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderFulfillmentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderLocationsForMoveArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  lineItemIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  locationIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderMerchantRequestsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  kind?: InputMaybe<FulfillmentOrderMerchantRequestKind>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderAcceptCancellationRequestPayload = {
  __typename?: "FulfillmentOrderAcceptCancellationRequestPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderAcceptFulfillmentRequestPayload = {
  __typename?: "FulfillmentOrderAcceptFulfillmentRequestPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export enum FulfillmentOrderAction {
  CancelFulfillmentOrder = "CANCEL_FULFILLMENT_ORDER",

  CreateFulfillment = "CREATE_FULFILLMENT",

  External = "EXTERNAL",

  Hold = "HOLD",

  MarkAsOpen = "MARK_AS_OPEN",

  Merge = "MERGE",

  Move = "MOVE",

  ReleaseHold = "RELEASE_HOLD",

  RequestCancellation = "REQUEST_CANCELLATION",

  RequestFulfillment = "REQUEST_FULFILLMENT",

  Split = "SPLIT",
}

export type FulfillmentOrderAssignedLocation = {
  __typename?: "FulfillmentOrderAssignedLocation"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  countryCode: CountryCode

  location?: Maybe<Location>

  name: Scalars["String"]["output"]

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export enum FulfillmentOrderAssignmentStatus {
  CancellationRequested = "CANCELLATION_REQUESTED",

  FulfillmentAccepted = "FULFILLMENT_ACCEPTED",

  FulfillmentRequested = "FULFILLMENT_REQUESTED",
}

export type FulfillmentOrderCancelPayload = {
  __typename?: "FulfillmentOrderCancelPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  replacementFulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderClosePayload = {
  __typename?: "FulfillmentOrderClosePayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderConnection = {
  __typename?: "FulfillmentOrderConnection"

  edges: Array<FulfillmentOrderEdge>

  nodes: Array<FulfillmentOrder>

  pageInfo: PageInfo
}

export type FulfillmentOrderDestination = Node & {
  __typename?: "FulfillmentOrderDestination"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  company?: Maybe<Scalars["String"]["output"]>

  countryCode?: Maybe<CountryCode>

  email?: Maybe<Scalars["String"]["output"]>

  firstName?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  lastName?: Maybe<Scalars["String"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type FulfillmentOrderEdge = {
  __typename?: "FulfillmentOrderEdge"

  cursor: Scalars["String"]["output"]

  node: FulfillmentOrder
}

export type FulfillmentOrderHoldInput = {
  externalId?: InputMaybe<Scalars["String"]["input"]>

  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>

  notifyMerchant?: InputMaybe<Scalars["Boolean"]["input"]>

  reason: FulfillmentHoldReason

  reasonNotes?: InputMaybe<Scalars["String"]["input"]>
}

export type FulfillmentOrderHoldPayload = {
  __typename?: "FulfillmentOrderHoldPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  remainingFulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<FulfillmentOrderHoldUserError>
}

export type FulfillmentOrderHoldUserError = DisplayableError & {
  __typename?: "FulfillmentOrderHoldUserError"

  code?: Maybe<FulfillmentOrderHoldUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrderHoldUserErrorCode {
  FulfillmentOrderNotFound = "FULFILLMENT_ORDER_NOT_FOUND",

  GreaterThanZero = "GREATER_THAN_ZERO",

  InvalidLineItemQuantity = "INVALID_LINE_ITEM_QUANTITY",

  Taken = "TAKEN",
}

export type FulfillmentOrderInternationalDuties = {
  __typename?: "FulfillmentOrderInternationalDuties"

  incoterm: Scalars["String"]["output"]
}

export type FulfillmentOrderLineItem = Node & {
  __typename?: "FulfillmentOrderLineItem"

  financialSummaries: Array<FulfillmentOrderLineItemFinancialSummary>

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  inventoryItemId?: Maybe<Scalars["ID"]["output"]>
  /**
   * The associated order line item.
   * @deprecated           As of API version 2023-01, this field has been deprecated. The order line item associated with a `FulfillmentOrderLineItem`
   *           shouldn't be used to determine what to fulfill. Use the `FulfillmentOrderLineItem` and `FulfillmentOrder` objects
   *           instead. An order `LineItem` represents a single line item on an order, but it doesn't represent what should be fulfilled.
   *
   */
  lineItem: LineItem
  /**
   * The variant unit price without discounts applied, in shop and presentment currencies.
   * @deprecated Use `financialSummaries` instead.
   */
  originalUnitPriceSet: MoneyBag

  productTitle: Scalars["String"]["output"]

  remainingQuantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  totalQuantity: Scalars["Int"]["output"]

  variantTitle?: Maybe<Scalars["String"]["output"]>

  vendor?: Maybe<Scalars["String"]["output"]>
  /** Warning messages for a fulfillment order line item. */
  warnings: Array<FulfillmentOrderLineItemWarning>

  weight?: Maybe<Weight>
}

export type FulfillmentOrderLineItemConnection = {
  __typename?: "FulfillmentOrderLineItemConnection"

  edges: Array<FulfillmentOrderLineItemEdge>

  nodes: Array<FulfillmentOrderLineItem>

  pageInfo: PageInfo
}

export type FulfillmentOrderLineItemEdge = {
  __typename?: "FulfillmentOrderLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: FulfillmentOrderLineItem
}

export type FulfillmentOrderLineItemFinancialSummary = {
  __typename?: "FulfillmentOrderLineItemFinancialSummary"

  approximateDiscountedUnitPriceSet: MoneyBag

  discountAllocations: Array<FinancialSummaryDiscountAllocation>

  originalUnitPriceSet: MoneyBag

  quantity: Scalars["Int"]["output"]
}

export type FulfillmentOrderLineItemInput = {
  id: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]
}

export type FulfillmentOrderLineItemWarning = {
  __typename?: "FulfillmentOrderLineItemWarning"

  description?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>
}

export type FulfillmentOrderLineItemsInput = {
  fulfillmentOrderId: Scalars["ID"]["input"]

  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>
}

export type FulfillmentOrderLineItemsPreparedForPickupInput = {
  lineItemsByFulfillmentOrder: Array<PreparedFulfillmentOrderLineItemsInput>
}

export type FulfillmentOrderLineItemsPreparedForPickupPayload = {
  __typename?: "FulfillmentOrderLineItemsPreparedForPickupPayload"

  userErrors: Array<FulfillmentOrderLineItemsPreparedForPickupUserError>
}

export type FulfillmentOrderLineItemsPreparedForPickupUserError = DisplayableError & {
  __typename?: "FulfillmentOrderLineItemsPreparedForPickupUserError"

  code?: Maybe<FulfillmentOrderLineItemsPreparedForPickupUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrderLineItemsPreparedForPickupUserErrorCode {
  FulfillmentOrderInvalid = "FULFILLMENT_ORDER_INVALID",

  NoLineItemsToPrepareForFulfillmentOrder = "NO_LINE_ITEMS_TO_PREPARE_FOR_FULFILLMENT_ORDER",

  UnableToPrepareQuantity = "UNABLE_TO_PREPARE_QUANTITY",
}

export type FulfillmentOrderLocationForMove = {
  __typename?: "FulfillmentOrderLocationForMove"

  availableLineItems: FulfillmentOrderLineItemConnection

  availableLineItemsCount: Scalars["UnsignedInt64"]["output"]

  location: Location

  message?: Maybe<Scalars["String"]["output"]>

  movable: Scalars["Boolean"]["output"]

  unavailableLineItems: FulfillmentOrderLineItemConnection

  unavailableLineItemsCount: Scalars["UnsignedInt64"]["output"]
}

export type FulfillmentOrderLocationForMoveAvailableLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderLocationForMoveUnavailableLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FulfillmentOrderLocationForMoveConnection = {
  __typename?: "FulfillmentOrderLocationForMoveConnection"

  edges: Array<FulfillmentOrderLocationForMoveEdge>

  nodes: Array<FulfillmentOrderLocationForMove>

  pageInfo: PageInfo
}

export type FulfillmentOrderLocationForMoveEdge = {
  __typename?: "FulfillmentOrderLocationForMoveEdge"

  cursor: Scalars["String"]["output"]

  node: FulfillmentOrderLocationForMove
}

export type FulfillmentOrderMerchantRequest = Node & {
  __typename?: "FulfillmentOrderMerchantRequest"

  fulfillmentOrder: FulfillmentOrder

  id: Scalars["ID"]["output"]

  kind: FulfillmentOrderMerchantRequestKind

  message?: Maybe<Scalars["String"]["output"]>

  requestOptions?: Maybe<Scalars["JSON"]["output"]>

  responseData?: Maybe<Scalars["JSON"]["output"]>

  sentAt: Scalars["DateTime"]["output"]
}

export type FulfillmentOrderMerchantRequestConnection = {
  __typename?: "FulfillmentOrderMerchantRequestConnection"

  edges: Array<FulfillmentOrderMerchantRequestEdge>

  nodes: Array<FulfillmentOrderMerchantRequest>

  pageInfo: PageInfo
}

export type FulfillmentOrderMerchantRequestEdge = {
  __typename?: "FulfillmentOrderMerchantRequestEdge"

  cursor: Scalars["String"]["output"]

  node: FulfillmentOrderMerchantRequest
}

export enum FulfillmentOrderMerchantRequestKind {
  CancellationRequest = "CANCELLATION_REQUEST",

  FulfillmentRequest = "FULFILLMENT_REQUEST",
}

export type FulfillmentOrderMergeInput = {
  mergeIntents: Array<FulfillmentOrderMergeInputMergeIntent>
}

export type FulfillmentOrderMergeInputMergeIntent = {
  fulfillmentOrderId: Scalars["ID"]["input"]

  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>
}

export type FulfillmentOrderMergePayload = {
  __typename?: "FulfillmentOrderMergePayload"

  fulfillmentOrderMerges?: Maybe<Array<FulfillmentOrderMergeResult>>

  userErrors: Array<FulfillmentOrderMergeUserError>
}

export type FulfillmentOrderMergeResult = {
  __typename?: "FulfillmentOrderMergeResult"

  fulfillmentOrder: FulfillmentOrder
}

export type FulfillmentOrderMergeUserError = DisplayableError & {
  __typename?: "FulfillmentOrderMergeUserError"

  code?: Maybe<FulfillmentOrderMergeUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrderMergeUserErrorCode {
  FulfillmentOrderNotFound = "FULFILLMENT_ORDER_NOT_FOUND",

  GreaterThan = "GREATER_THAN",

  InvalidLineItemQuantity = "INVALID_LINE_ITEM_QUANTITY",
}

export type FulfillmentOrderMovePayload = {
  __typename?: "FulfillmentOrderMovePayload"

  movedFulfillmentOrder?: Maybe<FulfillmentOrder>

  originalFulfillmentOrder?: Maybe<FulfillmentOrder>

  remainingFulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderOpenPayload = {
  __typename?: "FulfillmentOrderOpenPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderRejectCancellationRequestPayload = {
  __typename?: "FulfillmentOrderRejectCancellationRequestPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderRejectFulfillmentRequestPayload = {
  __typename?: "FulfillmentOrderRejectFulfillmentRequestPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export enum FulfillmentOrderRejectionReason {
  IncorrectAddress = "INCORRECT_ADDRESS",

  IneligibleProduct = "INELIGIBLE_PRODUCT",

  InventoryOutOfStock = "INVENTORY_OUT_OF_STOCK",

  Other = "OTHER",

  UndeliverableDestination = "UNDELIVERABLE_DESTINATION",
}

export type FulfillmentOrderReleaseHoldPayload = {
  __typename?: "FulfillmentOrderReleaseHoldPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<FulfillmentOrderReleaseHoldUserError>
}

export type FulfillmentOrderReleaseHoldUserError = DisplayableError & {
  __typename?: "FulfillmentOrderReleaseHoldUserError"

  code?: Maybe<FulfillmentOrderReleaseHoldUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrderReleaseHoldUserErrorCode {
  FulfillmentOrderNotFound = "FULFILLMENT_ORDER_NOT_FOUND",

  GreaterThanZero = "GREATER_THAN_ZERO",

  InvalidLineItemQuantity = "INVALID_LINE_ITEM_QUANTITY",
}

export enum FulfillmentOrderRequestStatus {
  Accepted = "ACCEPTED",

  CancellationAccepted = "CANCELLATION_ACCEPTED",

  CancellationRejected = "CANCELLATION_REJECTED",

  CancellationRequested = "CANCELLATION_REQUESTED",

  Closed = "CLOSED",

  Rejected = "REJECTED",

  Submitted = "SUBMITTED",

  Unsubmitted = "UNSUBMITTED",
}

export type FulfillmentOrderReschedulePayload = {
  __typename?: "FulfillmentOrderReschedulePayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<FulfillmentOrderRescheduleUserError>
}

export type FulfillmentOrderRescheduleUserError = DisplayableError & {
  __typename?: "FulfillmentOrderRescheduleUserError"

  code?: Maybe<FulfillmentOrderRescheduleUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrderRescheduleUserErrorCode {
  FulfillmentOrderNotFound = "FULFILLMENT_ORDER_NOT_FOUND",
}

export enum FulfillmentOrderSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",
}

export type FulfillmentOrderSplitInput = {
  fulfillmentOrderId: Scalars["ID"]["input"]

  fulfillmentOrderLineItems: Array<FulfillmentOrderLineItemInput>
}

export type FulfillmentOrderSplitPayload = {
  __typename?: "FulfillmentOrderSplitPayload"

  fulfillmentOrderSplits?: Maybe<Array<FulfillmentOrderSplitResult>>

  userErrors: Array<FulfillmentOrderSplitUserError>
}

export type FulfillmentOrderSplitResult = {
  __typename?: "FulfillmentOrderSplitResult"

  fulfillmentOrder: FulfillmentOrder

  remainingFulfillmentOrder: FulfillmentOrder

  replacementFulfillmentOrder?: Maybe<FulfillmentOrder>
}

export type FulfillmentOrderSplitUserError = DisplayableError & {
  __typename?: "FulfillmentOrderSplitUserError"

  code?: Maybe<FulfillmentOrderSplitUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrderSplitUserErrorCode {
  FulfillmentOrderNotFound = "FULFILLMENT_ORDER_NOT_FOUND",

  GreaterThan = "GREATER_THAN",

  InvalidLineItemQuantity = "INVALID_LINE_ITEM_QUANTITY",

  NoLineItemsProvidedToSplit = "NO_LINE_ITEMS_PROVIDED_TO_SPLIT",
}

export enum FulfillmentOrderStatus {
  Cancelled = "CANCELLED",

  Closed = "CLOSED",

  Incomplete = "INCOMPLETE",

  InProgress = "IN_PROGRESS",

  OnHold = "ON_HOLD",

  Open = "OPEN",

  Scheduled = "SCHEDULED",
}

export type FulfillmentOrderSubmitCancellationRequestPayload = {
  __typename?: "FulfillmentOrderSubmitCancellationRequestPayload"

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderSubmitFulfillmentRequestPayload = {
  __typename?: "FulfillmentOrderSubmitFulfillmentRequestPayload"

  originalFulfillmentOrder?: Maybe<FulfillmentOrder>

  submittedFulfillmentOrder?: Maybe<FulfillmentOrder>

  unsubmittedFulfillmentOrder?: Maybe<FulfillmentOrder>

  userErrors: Array<UserError>
}

export type FulfillmentOrderSupportedAction = {
  __typename?: "FulfillmentOrderSupportedAction"

  action: FulfillmentOrderAction

  externalUrl?: Maybe<Scalars["URL"]["output"]>
}

export type FulfillmentOrdersReleaseHoldsPayload = {
  __typename?: "FulfillmentOrdersReleaseHoldsPayload"

  job?: Maybe<Job>

  userErrors: Array<FulfillmentOrdersReleaseHoldsUserError>
}

export type FulfillmentOrdersReleaseHoldsUserError = DisplayableError & {
  __typename?: "FulfillmentOrdersReleaseHoldsUserError"

  code?: Maybe<FulfillmentOrdersReleaseHoldsUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrdersReleaseHoldsUserErrorCode {
  FailedToCreateJob = "FAILED_TO_CREATE_JOB",
}

export type FulfillmentOrdersSetFulfillmentDeadlinePayload = {
  __typename?: "FulfillmentOrdersSetFulfillmentDeadlinePayload"

  success?: Maybe<Scalars["Boolean"]["output"]>

  userErrors: Array<FulfillmentOrdersSetFulfillmentDeadlineUserError>
}

export type FulfillmentOrdersSetFulfillmentDeadlineUserError = DisplayableError & {
  __typename?: "FulfillmentOrdersSetFulfillmentDeadlineUserError"

  code?: Maybe<FulfillmentOrdersSetFulfillmentDeadlineUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum FulfillmentOrdersSetFulfillmentDeadlineUserErrorCode {
  FulfillmentOrdersNotFound = "FULFILLMENT_ORDERS_NOT_FOUND",
}

export type FulfillmentOriginAddress = {
  __typename?: "FulfillmentOriginAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  countryCode: Scalars["String"]["output"]

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type FulfillmentOriginAddressInput = {
  address1?: InputMaybe<Scalars["String"]["input"]>

  address2?: InputMaybe<Scalars["String"]["input"]>

  city?: InputMaybe<Scalars["String"]["input"]>

  countryCode: Scalars["String"]["input"]

  provinceCode?: InputMaybe<Scalars["String"]["input"]>

  zip?: InputMaybe<Scalars["String"]["input"]>
}

export type FulfillmentService = {
  __typename?: "FulfillmentService"

  callbackUrl?: Maybe<Scalars["URL"]["output"]>
  /**
   * Whether the fulfillment service uses the [fulfillment order based workflow](https://shopify.dev/apps/fulfillment/fulfillment-service-apps/manage-fulfillments) for managing fulfillments.
   *
   * As the migration is now finished, the `fulfillmentOrdersOptIn` property is [deprecated](
   * https://shopify.dev/changelog/deprecation-of-the-fulfillmentservice-fulfillmentordersoptin-field)
   * and is always set to `true` on correctly functioning fulfillment services.
   *
   * @deprecated Migration period ended. All correctly functioning fulfillment services have `fulfillmentOrdersOptIn` set to `true`.
   */
  fulfillmentOrdersOptIn: Scalars["Boolean"]["output"]

  handle: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  inventoryManagement: Scalars["Boolean"]["output"]

  location?: Maybe<Location>

  permitsSkuSharing: Scalars["Boolean"]["output"]

  productBased: Scalars["Boolean"]["output"]

  serviceName: Scalars["String"]["output"]
  /**
   * Shipping methods associated with the fulfillment service provider. Applies only to Fulfill By Amazon fulfillment service.
   * @deprecated The Fulfillment by Amazon feature will no longer be supported from March 30, 2023. To continue using Amazon fulfillment, merchants need to set up a Multi-Channel Fulfillment solution recommended by Amazon: https://help.shopify.com/manual/shipping/fulfillment-services/amazon#activate-fulfillment-by-amazon
   */
  shippingMethods: Array<ShippingMethod>

  type: FulfillmentServiceType
}

export type FulfillmentServiceCreatePayload = {
  __typename?: "FulfillmentServiceCreatePayload"

  fulfillmentService?: Maybe<FulfillmentService>

  userErrors: Array<UserError>
}

export type FulfillmentServiceDeletePayload = {
  __typename?: "FulfillmentServiceDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export enum FulfillmentServiceType {
  GiftCard = "GIFT_CARD",

  Manual = "MANUAL",

  ThirdParty = "THIRD_PARTY",
}

export type FulfillmentServiceUpdatePayload = {
  __typename?: "FulfillmentServiceUpdatePayload"

  fulfillmentService?: Maybe<FulfillmentService>

  userErrors: Array<UserError>
}

export enum FulfillmentStatus {
  Cancelled = "CANCELLED",

  Error = "ERROR",

  Failure = "FAILURE",
  /**
   * The third-party fulfillment service has acknowledged the fulfillment and is processing it.
   *
   * @deprecated This is a legacy status and is due to be deprecated.
   */
  Open = "OPEN",
  /**
   * Shopify has created the fulfillment and is waiting for the third-party fulfillment service to transition it to `open` or `success`.
   *
   * @deprecated This is a legacy status and is due to be deprecated.
   */
  Pending = "PENDING",

  Success = "SUCCESS",
}

export type FulfillmentTrackingInfo = {
  __typename?: "FulfillmentTrackingInfo"

  company?: Maybe<Scalars["String"]["output"]>

  number?: Maybe<Scalars["String"]["output"]>

  url?: Maybe<Scalars["URL"]["output"]>
}

export type FulfillmentTrackingInfoUpdateV2Payload = {
  __typename?: "FulfillmentTrackingInfoUpdateV2Payload"

  fulfillment?: Maybe<Fulfillment>

  userErrors: Array<UserError>
}

export type FulfillmentTrackingInput = {
  company?: InputMaybe<Scalars["String"]["input"]>

  number?: InputMaybe<Scalars["String"]["input"]>

  numbers?: InputMaybe<Array<Scalars["String"]["input"]>>

  url?: InputMaybe<Scalars["URL"]["input"]>

  urls?: InputMaybe<Array<Scalars["URL"]["input"]>>
}

export type FulfillmentV2Input = {
  lineItemsByFulfillmentOrder: Array<FulfillmentOrderLineItemsInput>

  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  originAddress?: InputMaybe<FulfillmentOriginAddressInput>

  trackingInfo?: InputMaybe<FulfillmentTrackingInput>
}

export type FunctionsAppBridge = {
  __typename?: "FunctionsAppBridge"

  createPath: Scalars["String"]["output"]

  detailsPath: Scalars["String"]["output"]
}

export type FunctionsErrorHistory = {
  __typename?: "FunctionsErrorHistory"

  errorsFirstOccurredAt: Scalars["DateTime"]["output"]

  firstOccurredAt: Scalars["DateTime"]["output"]

  hasBeenSharedSinceLastError: Scalars["Boolean"]["output"]

  hasSharedRecentErrors: Scalars["Boolean"]["output"]
}

export type GenericFile = File &
  Node & {
    __typename?: "GenericFile"

    alt?: Maybe<Scalars["String"]["output"]>

    createdAt: Scalars["DateTime"]["output"]

    fileErrors: Array<FileError>

    fileStatus: FileStatus

    id: Scalars["ID"]["output"]

    mimeType?: Maybe<Scalars["String"]["output"]>

    originalFileSize?: Maybe<Scalars["Int"]["output"]>

    preview?: Maybe<MediaPreviewImage>

    updatedAt: Scalars["DateTime"]["output"]

    url?: Maybe<Scalars["URL"]["output"]>
  }

export type GiftCard = Node & {
  __typename?: "GiftCard"

  balance: MoneyV2

  createdAt: Scalars["DateTime"]["output"]

  customer?: Maybe<Customer>

  disabledAt?: Maybe<Scalars["DateTime"]["output"]>

  enabled: Scalars["Boolean"]["output"]

  expiresOn?: Maybe<Scalars["Date"]["output"]>

  id: Scalars["ID"]["output"]

  initialValue: MoneyV2

  lastCharacters: Scalars["String"]["output"]

  maskedCode: Scalars["String"]["output"]

  note?: Maybe<Scalars["String"]["output"]>

  order?: Maybe<Order>
}

export type GiftCardConnection = {
  __typename?: "GiftCardConnection"

  edges: Array<GiftCardEdge>

  nodes: Array<GiftCard>

  pageInfo: PageInfo
}

export type GiftCardCreateInput = {
  code?: InputMaybe<Scalars["String"]["input"]>

  customerId?: InputMaybe<Scalars["ID"]["input"]>

  expiresOn?: InputMaybe<Scalars["Date"]["input"]>

  initialValue: Scalars["Decimal"]["input"]

  note?: InputMaybe<Scalars["String"]["input"]>

  templateSuffix?: InputMaybe<Scalars["String"]["input"]>
}

export type GiftCardCreatePayload = {
  __typename?: "GiftCardCreatePayload"

  giftCard?: Maybe<GiftCard>

  giftCardCode?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<GiftCardUserError>
}

export type GiftCardDisablePayload = {
  __typename?: "GiftCardDisablePayload"

  giftCard?: Maybe<GiftCard>

  userErrors: Array<UserError>
}

export type GiftCardEdge = {
  __typename?: "GiftCardEdge"

  cursor: Scalars["String"]["output"]

  node: GiftCard
}

export enum GiftCardErrorCode {
  GreaterThan = "GREATER_THAN",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  MissingArgument = "MISSING_ARGUMENT",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",
}

export type GiftCardSale = Sale & {
  __typename?: "GiftCardSale"

  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineItem: LineItem

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export enum GiftCardSortKeys {
  AmountSpent = "AMOUNT_SPENT",

  Balance = "BALANCE",

  Code = "CODE",

  CreatedAt = "CREATED_AT",

  CustomerName = "CUSTOMER_NAME",

  DisabledAt = "DISABLED_AT",

  ExpiresOn = "EXPIRES_ON",

  Id = "ID",

  InitialValue = "INITIAL_VALUE",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export type GiftCardUpdateInput = {
  customerId?: InputMaybe<Scalars["ID"]["input"]>

  expiresOn?: InputMaybe<Scalars["Date"]["input"]>

  note?: InputMaybe<Scalars["String"]["input"]>

  templateSuffix?: InputMaybe<Scalars["String"]["input"]>
}

export type GiftCardUpdatePayload = {
  __typename?: "GiftCardUpdatePayload"

  giftCard?: Maybe<GiftCard>

  userErrors: Array<UserError>
}

export type GiftCardUserError = DisplayableError & {
  __typename?: "GiftCardUserError"

  code?: Maybe<GiftCardErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type HasEvents = {
  events: EventConnection
}

export type HasEventsEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type HasLocalizationExtensions = {
  localizationExtensions: LocalizationExtensionConnection
}

export type HasLocalizationExtensionsLocalizationExtensionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  countryCodes?: InputMaybe<Array<CountryCode>>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  purposes?: InputMaybe<Array<LocalizationExtensionPurpose>>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type HasMetafieldDefinitions = {
  metafieldDefinitions: MetafieldDefinitionConnection
}

export type HasMetafieldDefinitionsMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type HasMetafields = {
  metafield?: Maybe<Metafield>

  metafields: MetafieldConnection
  /**
   * Returns a private metafield by namespace and key that belongs to the resource.
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafield?: Maybe<PrivateMetafield>
  /**
   * List of private metafields that belong to the resource.
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafields: PrivateMetafieldConnection
}

export type HasMetafieldsMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type HasMetafieldsMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type HasMetafieldsPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type HasMetafieldsPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type HasPublishedTranslations = {
  translations: Array<Translation>
}

export type HasPublishedTranslationsTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type Image = HasMetafields & {
  __typename?: "Image"

  altText?: Maybe<Scalars["String"]["output"]>

  height?: Maybe<Scalars["Int"]["output"]>

  id?: Maybe<Scalars["ID"]["output"]>

  metafield?: Maybe<Metafield>

  metafields: MetafieldConnection
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   *
   * @deprecated Use `url` instead.
   */
  originalSrc: Scalars["URL"]["output"]
  /**
   * Returns a private metafield by namespace and key that belongs to the resource.
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafield?: Maybe<PrivateMetafield>
  /**
   * List of private metafields that belong to the resource.
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafields: PrivateMetafieldConnection
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

export type ImageMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ImageMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ImagePrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type ImagePrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
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

export type ImageInput = {
  altText?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  src?: InputMaybe<Scalars["String"]["input"]>
}

export type ImageTransformInput = {
  crop?: InputMaybe<CropRegion>

  maxHeight?: InputMaybe<Scalars["Int"]["input"]>

  maxWidth?: InputMaybe<Scalars["Int"]["input"]>

  preferredContentType?: InputMaybe<ImageContentType>

  scale?: InputMaybe<Scalars["Int"]["input"]>
}

/**
 * A parameter to upload an image.
 *
 * Deprecated in favor of
 * [StagedUploadParameter](https://shopify.dev/api/admin-graphql/latest/objects/StagedUploadParameter),
 * which is used in
 * [StagedMediaUploadTarget](https://shopify.dev/api/admin-graphql/latest/objects/StagedMediaUploadTarget)
 * and returned by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type ImageUploadParameter = {
  __typename?: "ImageUploadParameter"

  name: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type IncomingRequestLineItemInput = {
  fulfillmentOrderLineItemId: Scalars["ID"]["input"]

  message?: InputMaybe<Scalars["String"]["input"]>
}

export type InventoryActivatePayload = {
  __typename?: "InventoryActivatePayload"

  inventoryLevel?: Maybe<InventoryLevel>

  userErrors: Array<UserError>
}

export type InventoryAdjustItemInput = {
  availableDelta: Scalars["Int"]["input"]

  inventoryItemId: Scalars["ID"]["input"]
}

export type InventoryAdjustQuantitiesInput = {
  changes: Array<InventoryChangeInput>

  name: Scalars["String"]["input"]

  reason: Scalars["String"]["input"]

  referenceDocumentUri?: InputMaybe<Scalars["String"]["input"]>
}

export type InventoryAdjustQuantitiesPayload = {
  __typename?: "InventoryAdjustQuantitiesPayload"

  inventoryAdjustmentGroup?: Maybe<InventoryAdjustmentGroup>

  userErrors: Array<InventoryAdjustQuantitiesUserError>
}

export type InventoryAdjustQuantitiesUserError = DisplayableError & {
  __typename?: "InventoryAdjustQuantitiesUserError"

  code?: Maybe<InventoryAdjustQuantitiesUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum InventoryAdjustQuantitiesUserErrorCode {
  AdjustQuantitiesFailed = "ADJUST_QUANTITIES_FAILED",

  InternalLedgerDocument = "INTERNAL_LEDGER_DOCUMENT",

  InvalidAvailableDocument = "INVALID_AVAILABLE_DOCUMENT",

  InvalidInventoryItem = "INVALID_INVENTORY_ITEM",

  InvalidLedgerDocument = "INVALID_LEDGER_DOCUMENT",

  InvalidLocation = "INVALID_LOCATION",

  InvalidQuantityDocument = "INVALID_QUANTITY_DOCUMENT",

  InvalidQuantityName = "INVALID_QUANTITY_NAME",

  InvalidQuantityTooHigh = "INVALID_QUANTITY_TOO_HIGH",

  InvalidQuantityTooLow = "INVALID_QUANTITY_TOO_LOW",

  InvalidReason = "INVALID_REASON",

  InvalidReferenceDocument = "INVALID_REFERENCE_DOCUMENT",

  ItemNotStockedAtLocation = "ITEM_NOT_STOCKED_AT_LOCATION",

  MaxOneLedgerDocument = "MAX_ONE_LEDGER_DOCUMENT",

  NonMutableInventoryItem = "NON_MUTABLE_INVENTORY_ITEM",
}

export type InventoryAdjustQuantityInput = {
  availableDelta: Scalars["Int"]["input"]

  inventoryLevelId: Scalars["ID"]["input"]
}

export type InventoryAdjustQuantityPayload = {
  __typename?: "InventoryAdjustQuantityPayload"

  inventoryLevel?: Maybe<InventoryLevel>

  userErrors: Array<UserError>
}

export type InventoryAdjustmentGroup = Node & {
  __typename?: "InventoryAdjustmentGroup"

  app?: Maybe<App>

  changes: Array<InventoryChange>

  createdAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  reason: Scalars["String"]["output"]

  referenceDocumentUri?: Maybe<Scalars["String"]["output"]>

  staffMember?: Maybe<StaffMember>
}

export type InventoryAdjustmentGroupChangesArgs = {
  inventoryItemIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  locationIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  quantityNames?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type InventoryBulkAdjustQuantityAtLocationPayload = {
  __typename?: "InventoryBulkAdjustQuantityAtLocationPayload"

  inventoryLevels?: Maybe<Array<InventoryLevel>>

  userErrors: Array<UserError>
}

export type InventoryBulkToggleActivationInput = {
  activate: Scalars["Boolean"]["input"]

  locationId: Scalars["ID"]["input"]
}

export type InventoryBulkToggleActivationPayload = {
  __typename?: "InventoryBulkToggleActivationPayload"

  inventoryItem?: Maybe<InventoryItem>

  inventoryLevels?: Maybe<Array<InventoryLevel>>

  userErrors: Array<InventoryBulkToggleActivationUserError>
}

export type InventoryBulkToggleActivationUserError = DisplayableError & {
  __typename?: "InventoryBulkToggleActivationUserError"

  code?: Maybe<InventoryBulkToggleActivationUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum InventoryBulkToggleActivationUserErrorCode {
  CannotDeactivateFromOnlyLocation = "CANNOT_DEACTIVATE_FROM_ONLY_LOCATION",
  /**
   * Cannot unstock this inventory item from this location because it has committed and incoming quantities.
   * @deprecated This error code is deprecated. Both INCOMING_INVENTORY_AT_LOCATION and COMMITTED_INVENTORY_AT_LOCATION codes will be returned as individual errors instead.
   */
  CommittedAndIncomingInventoryAtLocation = "COMMITTED_AND_INCOMING_INVENTORY_AT_LOCATION",

  CommittedInventoryAtLocation = "COMMITTED_INVENTORY_AT_LOCATION",

  FailedToStockAtLocation = "FAILED_TO_STOCK_AT_LOCATION",

  FailedToUnstockFromLocation = "FAILED_TO_UNSTOCK_FROM_LOCATION",

  GenericError = "GENERIC_ERROR",

  IncomingInventoryAtLocation = "INCOMING_INVENTORY_AT_LOCATION",

  InventoryItemNotFound = "INVENTORY_ITEM_NOT_FOUND",

  InventoryManagedBy_3RdParty = "INVENTORY_MANAGED_BY_3RD_PARTY",

  InventoryManagedByShopify = "INVENTORY_MANAGED_BY_SHOPIFY",

  LocationNotFound = "LOCATION_NOT_FOUND",

  MissingSku = "MISSING_SKU",

  ReservedInventoryAtLocation = "RESERVED_INVENTORY_AT_LOCATION",
}

export type InventoryChange = {
  __typename?: "InventoryChange"

  delta: Scalars["Int"]["output"]

  item?: Maybe<InventoryItem>

  ledgerDocumentUri?: Maybe<Scalars["String"]["output"]>

  location?: Maybe<Location>

  name: Scalars["String"]["output"]

  quantityAfterChange?: Maybe<Scalars["Int"]["output"]>
}

export type InventoryChangeInput = {
  delta: Scalars["Int"]["input"]

  inventoryItemId: Scalars["ID"]["input"]

  ledgerDocumentUri?: InputMaybe<Scalars["String"]["input"]>

  locationId: Scalars["ID"]["input"]
}

export type InventoryDeactivatePayload = {
  __typename?: "InventoryDeactivatePayload"

  userErrors: Array<UserError>
}

export type InventoryItem = LegacyInteroperability &
  Node & {
    __typename?: "InventoryItem"

    countryCodeOfOrigin?: Maybe<CountryCode>

    countryHarmonizedSystemCodes: CountryHarmonizedSystemCodeConnection

    createdAt: Scalars["DateTime"]["output"]

    duplicateSkuCount: Scalars["Int"]["output"]

    harmonizedSystemCode?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    inventoryHistoryUrl?: Maybe<Scalars["URL"]["output"]>

    inventoryLevel?: Maybe<InventoryLevel>

    inventoryLevels: InventoryLevelConnection

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    locationsCount: Scalars["Int"]["output"]

    provinceCodeOfOrigin?: Maybe<Scalars["String"]["output"]>

    requiresShipping: Scalars["Boolean"]["output"]

    sku?: Maybe<Scalars["String"]["output"]>

    tracked: Scalars["Boolean"]["output"]

    trackedEditable: EditableProperty

    unitCost?: Maybe<MoneyV2>

    updatedAt: Scalars["DateTime"]["output"]

    variant: ProductVariant
  }

export type InventoryItemCountryHarmonizedSystemCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type InventoryItemInventoryLevelArgs = {
  locationId: Scalars["ID"]["input"]
}

export type InventoryItemInventoryLevelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type InventoryItemConnection = {
  __typename?: "InventoryItemConnection"

  edges: Array<InventoryItemEdge>

  nodes: Array<InventoryItem>

  pageInfo: PageInfo
}

export type InventoryItemEdge = {
  __typename?: "InventoryItemEdge"

  cursor: Scalars["String"]["output"]

  node: InventoryItem
}

export type InventoryItemInput = {
  cost?: InputMaybe<Scalars["Decimal"]["input"]>

  tracked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type InventoryItemUpdateInput = {
  cost?: InputMaybe<Scalars["Decimal"]["input"]>

  countryCodeOfOrigin?: InputMaybe<CountryCode>

  countryHarmonizedSystemCodes?: InputMaybe<Array<CountryHarmonizedSystemCodeInput>>

  harmonizedSystemCode?: InputMaybe<Scalars["String"]["input"]>

  provinceCodeOfOrigin?: InputMaybe<Scalars["String"]["input"]>

  tracked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type InventoryItemUpdatePayload = {
  __typename?: "InventoryItemUpdatePayload"

  inventoryItem?: Maybe<InventoryItem>

  userErrors: Array<UserError>
}

export type InventoryLevel = Node & {
  __typename?: "InventoryLevel"
  /**
   * The quantity of inventory items that are available at the inventory level's associated location.
   * @deprecated Use the `quantities` field instead and specify available for names. Example: `quantities(names:["available"]){name quantity}`.
   *
   */
  available: Scalars["Int"]["output"]

  canDeactivate: Scalars["Boolean"]["output"]

  createdAt: Scalars["DateTime"]["output"]

  deactivationAlert?: Maybe<Scalars["String"]["output"]>
  /**
   * Describes, in HTML with embedded URLs, either the impact of deactivating the inventory level or why the inventory level can't be deactivated.
   * @deprecated Use `deactivationAlert` instead.
   */
  deactivationAlertHtml?: Maybe<Scalars["FormattedString"]["output"]>

  id: Scalars["ID"]["output"]
  /**
   * The quantity of inventory items that are going to the inventory level's associated location.
   * @deprecated Use the `quantities` field instead and specify incoming for names. Example: `quantities(names:["incoming"]){name quantity}`.
   *
   */
  incoming: Scalars["Int"]["output"]

  item: InventoryItem

  location: Location

  quantities: Array<InventoryQuantity>

  scheduledChanges: InventoryScheduledChangeConnection

  updatedAt: Scalars["DateTime"]["output"]
}

export type InventoryLevelQuantitiesArgs = {
  names: Array<Scalars["String"]["input"]>
}

export type InventoryLevelScheduledChangesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ScheduledChangeSortKeys>
}

export type InventoryLevelConnection = {
  __typename?: "InventoryLevelConnection"

  edges: Array<InventoryLevelEdge>

  nodes: Array<InventoryLevel>

  pageInfo: PageInfo
}

export type InventoryLevelEdge = {
  __typename?: "InventoryLevelEdge"

  cursor: Scalars["String"]["output"]

  node: InventoryLevel
}

export type InventoryLevelInput = {
  availableQuantity: Scalars["Int"]["input"]

  locationId: Scalars["ID"]["input"]
}

export type InventoryMoveQuantitiesInput = {
  changes: Array<InventoryMoveQuantityChange>

  reason: Scalars["String"]["input"]

  referenceDocumentUri: Scalars["String"]["input"]
}

export type InventoryMoveQuantitiesPayload = {
  __typename?: "InventoryMoveQuantitiesPayload"

  inventoryAdjustmentGroup?: Maybe<InventoryAdjustmentGroup>

  userErrors: Array<InventoryMoveQuantitiesUserError>
}

export type InventoryMoveQuantitiesUserError = DisplayableError & {
  __typename?: "InventoryMoveQuantitiesUserError"

  code?: Maybe<InventoryMoveQuantitiesUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum InventoryMoveQuantitiesUserErrorCode {
  DifferentLocations = "DIFFERENT_LOCATIONS",

  InternalLedgerDocument = "INTERNAL_LEDGER_DOCUMENT",

  InvalidAvailableDocument = "INVALID_AVAILABLE_DOCUMENT",

  InvalidInventoryItem = "INVALID_INVENTORY_ITEM",

  InvalidLedgerDocument = "INVALID_LEDGER_DOCUMENT",

  InvalidLocation = "INVALID_LOCATION",

  InvalidQuantityDocument = "INVALID_QUANTITY_DOCUMENT",

  InvalidQuantityName = "INVALID_QUANTITY_NAME",

  InvalidQuantityNegative = "INVALID_QUANTITY_NEGATIVE",

  InvalidQuantityTooHigh = "INVALID_QUANTITY_TOO_HIGH",

  InvalidReason = "INVALID_REASON",

  InvalidReferenceDocument = "INVALID_REFERENCE_DOCUMENT",

  ItemNotStockedAtLocation = "ITEM_NOT_STOCKED_AT_LOCATION",

  MaximumLedgerDocumentUris = "MAXIMUM_LEDGER_DOCUMENT_URIS",

  MoveQuantitiesFailed = "MOVE_QUANTITIES_FAILED",

  NonMutableInventoryItem = "NON_MUTABLE_INVENTORY_ITEM",

  SameQuantityName = "SAME_QUANTITY_NAME",
}

export type InventoryMoveQuantityChange = {
  from: InventoryMoveQuantityTerminalInput

  inventoryItemId: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]

  to: InventoryMoveQuantityTerminalInput
}

export type InventoryMoveQuantityTerminalInput = {
  ledgerDocumentUri?: InputMaybe<Scalars["String"]["input"]>

  locationId: Scalars["ID"]["input"]

  name: Scalars["String"]["input"]
}

export type InventoryProperties = {
  __typename?: "InventoryProperties"

  quantityNames: Array<InventoryQuantityName>
}

export type InventoryQuantity = Node & {
  __typename?: "InventoryQuantity"

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  quantity: Scalars["Int"]["output"]

  updatedAt?: Maybe<Scalars["DateTime"]["output"]>
}

export type InventoryQuantityName = {
  __typename?: "InventoryQuantityName"

  belongsTo: Array<Scalars["String"]["output"]>

  comprises: Array<Scalars["String"]["output"]>

  displayName?: Maybe<Scalars["String"]["output"]>

  isInUse: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]
}

export type InventoryScheduledChange = {
  __typename?: "InventoryScheduledChange"

  expectedAt: Scalars["DateTime"]["output"]

  fromName: Scalars["String"]["output"]

  inventoryLevel: InventoryLevel

  ledgerDocumentUri: Scalars["URL"]["output"]

  quantity: Scalars["Int"]["output"]

  toName: Scalars["String"]["output"]
}

export type InventoryScheduledChangeConnection = {
  __typename?: "InventoryScheduledChangeConnection"

  edges: Array<InventoryScheduledChangeEdge>

  nodes: Array<InventoryScheduledChange>

  pageInfo: PageInfo
}

export type InventoryScheduledChangeEdge = {
  __typename?: "InventoryScheduledChangeEdge"

  cursor: Scalars["String"]["output"]

  node: InventoryScheduledChange
}

export type InventoryScheduledChangeInput = {
  expectedAt: Scalars["DateTime"]["input"]

  fromName: Scalars["String"]["input"]

  toName: Scalars["String"]["input"]
}

export type InventoryScheduledChangeItemInput = {
  inventoryItemId: Scalars["ID"]["input"]

  ledgerDocumentUri: Scalars["URL"]["input"]

  locationId: Scalars["ID"]["input"]

  scheduledChanges: Array<InventoryScheduledChangeInput>
}

export type InventorySetOnHandQuantitiesInput = {
  reason: Scalars["String"]["input"]

  referenceDocumentUri?: InputMaybe<Scalars["String"]["input"]>

  setQuantities: Array<InventorySetQuantityInput>
}

export type InventorySetOnHandQuantitiesPayload = {
  __typename?: "InventorySetOnHandQuantitiesPayload"

  inventoryAdjustmentGroup?: Maybe<InventoryAdjustmentGroup>

  userErrors: Array<InventorySetOnHandQuantitiesUserError>
}

export type InventorySetOnHandQuantitiesUserError = DisplayableError & {
  __typename?: "InventorySetOnHandQuantitiesUserError"

  code?: Maybe<InventorySetOnHandQuantitiesUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum InventorySetOnHandQuantitiesUserErrorCode {
  InvalidInventoryItem = "INVALID_INVENTORY_ITEM",

  InvalidLocation = "INVALID_LOCATION",

  InvalidQuantityNegative = "INVALID_QUANTITY_NEGATIVE",

  InvalidQuantityTooHigh = "INVALID_QUANTITY_TOO_HIGH",

  InvalidReason = "INVALID_REASON",

  InvalidReferenceDocument = "INVALID_REFERENCE_DOCUMENT",

  ItemNotStockedAtLocation = "ITEM_NOT_STOCKED_AT_LOCATION",

  NonMutableInventoryItem = "NON_MUTABLE_INVENTORY_ITEM",

  SetOnHandQuantitiesFailed = "SET_ON_HAND_QUANTITIES_FAILED",
}

export type InventorySetQuantityInput = {
  inventoryItemId: Scalars["ID"]["input"]

  locationId: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]
}

export type InventorySetScheduledChangesInput = {
  items: Array<InventoryScheduledChangeItemInput>

  reason: Scalars["String"]["input"]

  referenceDocumentUri: Scalars["URL"]["input"]
}

export type InventorySetScheduledChangesPayload = {
  __typename?: "InventorySetScheduledChangesPayload"

  scheduledChanges?: Maybe<Array<InventoryScheduledChange>>

  userErrors: Array<InventorySetScheduledChangesUserError>
}

export type InventorySetScheduledChangesUserError = DisplayableError & {
  __typename?: "InventorySetScheduledChangesUserError"

  code?: Maybe<InventorySetScheduledChangesUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum InventorySetScheduledChangesUserErrorCode {
  DuplicateFromName = "DUPLICATE_FROM_NAME",

  DuplicateToName = "DUPLICATE_TO_NAME",

  ErrorUpdatingScheduled = "ERROR_UPDATING_SCHEDULED",

  Inclusion = "INCLUSION",

  InvalidFromName = "INVALID_FROM_NAME",

  InvalidReason = "INVALID_REASON",

  InvalidToName = "INVALID_TO_NAME",

  InventoryItemNotFound = "INVENTORY_ITEM_NOT_FOUND",

  InventoryStateNotFound = "INVENTORY_STATE_NOT_FOUND",

  ItemsEmpty = "ITEMS_EMPTY",

  LocationNotFound = "LOCATION_NOT_FOUND",

  SameFromToNames = "SAME_FROM_TO_NAMES",
}

export type Job = {
  __typename?: "Job"

  done: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  query?: Maybe<QueryRoot>
}

export type JobResult = {
  done: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]
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

  Sd = "SD",

  Se = "SE",

  Sg = "SG",

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

export type LegacyInteroperability = {
  legacyResourceId: Scalars["UnsignedInt64"]["output"]
}

export enum LengthUnit {
  Centimeters = "CENTIMETERS",

  Feet = "FEET",

  Inches = "INCHES",

  Meters = "METERS",

  Millimeters = "MILLIMETERS",

  Yards = "YARDS",
}

export type LimitedPendingOrderCount = {
  __typename?: "LimitedPendingOrderCount"

  atMax: Scalars["Boolean"]["output"]

  count: Scalars["Int"]["output"]
}

export type LineItem = Node & {
  __typename?: "LineItem"
  /**
   * Whether the line item can be restocked.
   * @deprecated Use `restockable` instead.
   */
  canRestock: Scalars["Boolean"]["output"]

  contract?: Maybe<SubscriptionContract>

  currentQuantity: Scalars["Int"]["output"]

  customAttributes: Array<Attribute>

  discountAllocations: Array<DiscountAllocation>
  /**
   * The total line price after discounts are applied, in shop currency.
   * @deprecated Use `discountedTotalSet` instead.
   */
  discountedTotal: Scalars["Money"]["output"]

  discountedTotalSet: MoneyBag
  /**
   * The approximate split price of a line item unit, in shop currency. This value doesn't include discounts applied to the entire order.
   * @deprecated Use `discountedUnitPriceSet` instead.
   */
  discountedUnitPrice: Scalars["Money"]["output"]

  discountedUnitPriceAfterAllDiscountsSet: MoneyBag

  discountedUnitPriceSet: MoneyBag

  duties: Array<Duty>
  /**
   * The total number of units to fulfill.
   * @deprecated Use [FulfillmentOrderLineItem#remainingQuantity](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentOrderLineItem#field-fulfillmentorderlineitem-remainingquantity) instead.
   */
  fulfillableQuantity: Scalars["Int"]["output"]
  /**
   * The fulfillment service that stocks the product variant belonging to a line item.
   *
   * This is a third-party fulfillment service in the following scenarios:
   *
   * **Scenario 1**
   * - The product variant is stocked by a single fulfillment service.
   * - The [FulfillmentService](/api/admin-graphql/latest/objects/FulfillmentService) is a third-party fulfillment service. Third-party fulfillment services don't have a handle with the value `manual`.
   *
   * **Scenario 2**
   * - Multiple fulfillment services stock the product variant.
   * - The last time that the line item was unfulfilled, it was awaiting fulfillment by a third-party fulfillment service. Third-party fulfillment services don't have a handle with the value `manual`.
   *
   * If none of the above conditions are met, then the fulfillment service has the `manual` handle.
   *
   * @deprecated
   * The [relationship between a product variant and a fulfillment service was changed in the `2022-07` API version](/changelog/fulfillment-service-sku-sharing). A [ProductVariant](/api/admin-graphql/latest/objects/ProductVariant) can be stocked by multiple fulfillment services. As a result, we recommend that you use the [inventoryItem field](/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-inventoryitem) if you need to determine where a product variant is stocked.
   *
   * If you need to determine whether a product is a gift card, then you should continue to use this field until an alternative is available.
   *
   * Altering the locations which stock a product variant won't change the value of this field for existing orders.
   *
   * Learn about [managing inventory quantities and states](/apps/fulfillment/inventory-management-apps/quantities-states).
   *
   */
  fulfillmentService?: Maybe<FulfillmentService>
  /**
   * The line item's fulfillment status. Returns 'fulfilled' if fulfillableQuantity >= quantity,
   * 'partial' if  fulfillableQuantity > 0, and 'unfulfilled' otherwise.
   *
   * @deprecated Use [FulfillmentOrderLineItem#remainingQuantity](https://shopify.dev/api/admin-graphql/latest/objects/FulfillmentOrderLineItem#field-fulfillmentorderlineitem-remainingquantity) instead
   */
  fulfillmentStatus: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  lineItemGroup?: Maybe<LineItemGroup>

  merchantEditable: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]

  nonFulfillableQuantity: Scalars["Int"]["output"]
  /**
   * The total price without discounts applied, in shop currency.
   * This value is based on the unit price of the variant x quantity.
   *
   * @deprecated Use `originalTotalSet` instead.
   */
  originalTotal: Scalars["Money"]["output"]

  originalTotalSet: MoneyBag
  /**
   * The variant unit price without discounts applied, in shop currency.
   * @deprecated Use `originalUnitPriceSet` instead.
   */
  originalUnitPrice: Scalars["Money"]["output"]

  originalUnitPriceSet: MoneyBag

  product?: Maybe<Product>

  quantity: Scalars["Int"]["output"]

  refundableQuantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  restockable: Scalars["Boolean"]["output"]

  sellingPlan?: Maybe<LineItemSellingPlan>

  sku?: Maybe<Scalars["String"]["output"]>

  staffMember?: Maybe<StaffMember>

  taxLines: Array<TaxLine>

  taxable: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]
  /**
   * The total amount of the discount allocated to the line item in the shop currency.
   * @deprecated Use `totalDiscountSet` instead.
   */
  totalDiscount: Scalars["Money"]["output"]

  totalDiscountSet: MoneyBag
  /**
   * The total discounted value of unfulfilled units, in shop currency.
   * @deprecated Use `unfulfilledDiscountedTotalSet` instead.
   */
  unfulfilledDiscountedTotal: Scalars["Money"]["output"]

  unfulfilledDiscountedTotalSet: MoneyBag
  /**
   * The total price, without any discounts applied. This value is based on the unit price of the variant x quantity of all unfulfilled units, in shop currency.
   * @deprecated Use `unfulfilledOriginalTotalSet` instead.
   */
  unfulfilledOriginalTotal: Scalars["Money"]["output"]

  unfulfilledOriginalTotalSet: MoneyBag

  unfulfilledQuantity: Scalars["Int"]["output"]

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>

  vendor?: Maybe<Scalars["String"]["output"]>
}

export type LineItemTaxLinesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type LineItemConnection = {
  __typename?: "LineItemConnection"

  edges: Array<LineItemEdge>

  nodes: Array<LineItem>

  pageInfo: PageInfo
}

export type LineItemEdge = {
  __typename?: "LineItemEdge"

  cursor: Scalars["String"]["output"]

  node: LineItem
}

export type LineItemGroup = {
  __typename?: "LineItemGroup"

  id: Scalars["ID"]["output"]

  quantity: Scalars["Int"]["output"]

  title: Scalars["String"]["output"]

  variantId?: Maybe<Scalars["ID"]["output"]>

  variantSku?: Maybe<Scalars["String"]["output"]>
}

export type LineItemMutable = Node & {
  __typename?: "LineItemMutable"
  /**
   * Whether the line item can be restocked.
   * @deprecated Use `restockable` instead.
   */
  canRestock: Scalars["Boolean"]["output"]

  customAttributes: Array<Attribute>

  discountAllocations: Array<DiscountAllocation>
  /**
   * The total line price after discounts are applied, in shop currency.
   * @deprecated Use `discountedTotalSet` instead.
   */
  discountedTotal: Scalars["Money"]["output"]

  discountedTotalSet: MoneyBag
  /**
   * The approximate split price of a line item unit, in shop currency. This value doesn't include discounts applied to the entire order.
   * @deprecated Use `discountedUnitPriceSet` instead.
   */
  discountedUnitPrice: Scalars["Money"]["output"]

  discountedUnitPriceSet: MoneyBag

  fulfillableQuantity: Scalars["Int"]["output"]

  fulfillmentService?: Maybe<FulfillmentService>

  fulfillmentStatus: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  image?: Maybe<Image>

  merchantEditable: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]

  nonFulfillableQuantity: Scalars["Int"]["output"]
  /**
   * The total price without any discounts applied, in shop currency. ""This value is based on the unit price of the variant x quantity.
   *
   * @deprecated Use `originalTotalSet` instead.
   */
  originalTotal: Scalars["Money"]["output"]

  originalTotalSet: MoneyBag
  /**
   * The variant unit price without discounts applied, in shop currency.
   * @deprecated Use `originalUnitPriceSet` instead.
   */
  originalUnitPrice: Scalars["Money"]["output"]

  originalUnitPriceSet: MoneyBag

  product?: Maybe<Product>

  quantity: Scalars["Int"]["output"]

  refundableQuantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  restockable: Scalars["Boolean"]["output"]

  sku?: Maybe<Scalars["String"]["output"]>

  staffMember?: Maybe<StaffMember>

  taxLines: Array<TaxLine>

  taxable: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]
  /**
   * The total amount of the discount allocated to the line item in the shop currency. This field must be explicitly set using draft orders, Shopify scripts, or the API. Instead of using this field, Shopify recommends using `discountAllocations`, which provides the same information.
   * @deprecated Use `totalDiscountSet` instead.
   */
  totalDiscount: Scalars["Money"]["output"]

  totalDiscountSet: MoneyBag
  /**
   * The total discounted value of unfulfilled units, in shop currency.
   * @deprecated Use `unfulfilledDiscountedTotalSet` instead.
   */
  unfulfilledDiscountedTotal: Scalars["Money"]["output"]

  unfulfilledDiscountedTotalSet: MoneyBag
  /**
   * The total price without any discounts applied. This value is based on the unit price of the variant x quantity of all unfulfilled units, in shop currency.
   * @deprecated Use `unfulfilledOriginalTotalSet` instead.
   */
  unfulfilledOriginalTotal: Scalars["Money"]["output"]

  unfulfilledOriginalTotalSet: MoneyBag

  unfulfilledQuantity: Scalars["Int"]["output"]

  variant?: Maybe<ProductVariant>

  variantTitle?: Maybe<Scalars["String"]["output"]>

  vendor?: Maybe<Scalars["String"]["output"]>
}

export type LineItemMutableTaxLinesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type LineItemMutableConnection = {
  __typename?: "LineItemMutableConnection"

  edges: Array<LineItemMutableEdge>

  nodes: Array<LineItemMutable>

  pageInfo: PageInfo
}

export type LineItemMutableEdge = {
  __typename?: "LineItemMutableEdge"

  cursor: Scalars["String"]["output"]

  node: LineItemMutable
}

export type LineItemSellingPlan = {
  __typename?: "LineItemSellingPlan"

  name: Scalars["String"]["output"]

  sellingPlanId?: Maybe<Scalars["ID"]["output"]>
}

export type Link = HasPublishedTranslations & {
  __typename?: "Link"

  label: Scalars["String"]["output"]

  translations: Array<Translation>

  url: Scalars["URL"]["output"]
}

export type LinkTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type Locale = {
  __typename?: "Locale"

  isoCode: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export enum LocalizableContentType {
  FileReference = "FILE_REFERENCE",

  Html = "HTML",

  InlineRichText = "INLINE_RICH_TEXT",

  Json = "JSON",

  JsonString = "JSON_STRING",

  ListFileReference = "LIST_FILE_REFERENCE",

  ListMultiLineTextField = "LIST_MULTI_LINE_TEXT_FIELD",

  ListSingleLineTextField = "LIST_SINGLE_LINE_TEXT_FIELD",

  ListUrl = "LIST_URL",

  MultiLineTextField = "MULTI_LINE_TEXT_FIELD",

  RichTextField = "RICH_TEXT_FIELD",

  SingleLineTextField = "SINGLE_LINE_TEXT_FIELD",

  String = "STRING",

  Uri = "URI",

  Url = "URL",
}

export type LocalizationExtension = {
  __typename?: "LocalizationExtension"

  countryCode: CountryCode

  key: LocalizationExtensionKey

  purpose: LocalizationExtensionPurpose

  title: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type LocalizationExtensionConnection = {
  __typename?: "LocalizationExtensionConnection"

  edges: Array<LocalizationExtensionEdge>

  nodes: Array<LocalizationExtension>

  pageInfo: PageInfo
}

export type LocalizationExtensionEdge = {
  __typename?: "LocalizationExtensionEdge"

  cursor: Scalars["String"]["output"]

  node: LocalizationExtension
}

export type LocalizationExtensionInput = {
  key: LocalizationExtensionKey

  value: Scalars["String"]["input"]
}

export enum LocalizationExtensionKey {
  ShippingCredentialBr = "SHIPPING_CREDENTIAL_BR",

  ShippingCredentialCn = "SHIPPING_CREDENTIAL_CN",

  ShippingCredentialKr = "SHIPPING_CREDENTIAL_KR",

  TaxCredentialBr = "TAX_CREDENTIAL_BR",

  TaxCredentialIt = "TAX_CREDENTIAL_IT",

  TaxEmailIt = "TAX_EMAIL_IT",
}

export enum LocalizationExtensionPurpose {
  Shipping = "SHIPPING",

  Tax = "TAX",
}

export type Location = HasMetafieldDefinitions &
  HasMetafields &
  LegacyInteroperability &
  Node & {
    __typename?: "Location"

    activatable: Scalars["Boolean"]["output"]

    address: LocationAddress

    addressVerified: Scalars["Boolean"]["output"]

    deactivatable: Scalars["Boolean"]["output"]

    deactivatedAt?: Maybe<Scalars["String"]["output"]>

    deletable: Scalars["Boolean"]["output"]

    fulfillmentService?: Maybe<FulfillmentService>

    fulfillsOnlineOrders: Scalars["Boolean"]["output"]

    hasActiveInventory: Scalars["Boolean"]["output"]

    hasUnfulfilledOrders: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    inventoryLevel?: Maybe<InventoryLevel>

    inventoryLevels: InventoryLevelConnection

    isActive: Scalars["Boolean"]["output"]
    /**
     * Whether the location is your primary location for shipping inventory.
     * @deprecated The concept of a primary location is deprecated, shipsInventory can be used to get a fallback location
     */
    isPrimary: Scalars["Boolean"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    localPickupSettingsV2?: Maybe<DeliveryLocalPickupSettings>

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    name: Scalars["String"]["output"]
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    shipsInventory: Scalars["Boolean"]["output"]

    suggestedAddresses: Array<LocationSuggestedAddress>
  }

export type LocationInventoryLevelArgs = {
  inventoryItemId: Scalars["ID"]["input"]
}

export type LocationInventoryLevelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type LocationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type LocationMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type LocationMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type LocationPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type LocationPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type LocationActivatePayload = {
  __typename?: "LocationActivatePayload"

  location?: Maybe<Location>

  locationActivateUserErrors: Array<LocationActivateUserError>
}

export type LocationActivateUserError = DisplayableError & {
  __typename?: "LocationActivateUserError"

  code?: Maybe<LocationActivateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum LocationActivateUserErrorCode {
  GenericError = "GENERIC_ERROR",

  HasNonUniqueName = "HAS_NON_UNIQUE_NAME",

  HasOngoingRelocation = "HAS_ONGOING_RELOCATION",

  LocationLimit = "LOCATION_LIMIT",

  LocationNotFound = "LOCATION_NOT_FOUND",
}

export type LocationAddAddressInput = {
  address1?: InputMaybe<Scalars["String"]["input"]>

  address2?: InputMaybe<Scalars["String"]["input"]>

  city?: InputMaybe<Scalars["String"]["input"]>

  countryCode: CountryCode

  phone?: InputMaybe<Scalars["String"]["input"]>

  provinceCode?: InputMaybe<Scalars["String"]["input"]>

  zip?: InputMaybe<Scalars["String"]["input"]>
}

export type LocationAddInput = {
  address: LocationAddAddressInput

  fulfillsOnlineOrders?: InputMaybe<Scalars["Boolean"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  name: Scalars["String"]["input"]
}

export type LocationAddPayload = {
  __typename?: "LocationAddPayload"

  location?: Maybe<Location>

  userErrors: Array<LocationAddUserError>
}

export type LocationAddUserError = DisplayableError & {
  __typename?: "LocationAddUserError"

  code?: Maybe<LocationAddUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum LocationAddUserErrorCode {
  AppNotAuthorized = "APP_NOT_AUTHORIZED",

  Blank = "BLANK",

  DisallowedOwnerType = "DISALLOWED_OWNER_TYPE",

  GenericError = "GENERIC_ERROR",

  Inclusion = "INCLUSION",

  Invalid = "INVALID",

  InvalidType = "INVALID_TYPE",

  InvalidUsZipcode = "INVALID_US_ZIPCODE",

  InvalidValue = "INVALID_VALUE",

  Present = "PRESENT",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnstructuredReservedNamespace = "UNSTRUCTURED_RESERVED_NAMESPACE",
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

export type LocationDeactivatePayload = {
  __typename?: "LocationDeactivatePayload"

  location?: Maybe<Location>

  locationDeactivateUserErrors: Array<LocationDeactivateUserError>
}

export type LocationDeactivateUserError = DisplayableError & {
  __typename?: "LocationDeactivateUserError"

  code?: Maybe<LocationDeactivateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum LocationDeactivateUserErrorCode {
  CannotDisableOnlineOrderFulfillment = "CANNOT_DISABLE_ONLINE_ORDER_FULFILLMENT",

  DestinationLocationIsTheSameLocation = "DESTINATION_LOCATION_IS_THE_SAME_LOCATION",

  DestinationLocationNotFoundOrInactive = "DESTINATION_LOCATION_NOT_FOUND_OR_INACTIVE",

  FailedToRelocateActiveInventories = "FAILED_TO_RELOCATE_ACTIVE_INVENTORIES",

  FailedToRelocateIncomingMovements = "FAILED_TO_RELOCATE_INCOMING_MOVEMENTS",

  FailedToRelocateOpenPurchaseOrders = "FAILED_TO_RELOCATE_OPEN_PURCHASE_ORDERS",

  FailedToRelocateOpenTransfers = "FAILED_TO_RELOCATE_OPEN_TRANSFERS",

  HasActiveInventoryError = "HAS_ACTIVE_INVENTORY_ERROR",

  HasActiveRetailSubscriptions = "HAS_ACTIVE_RETAIL_SUBSCRIPTIONS",

  HasFulfillmentOrdersError = "HAS_FULFILLMENT_ORDERS_ERROR",

  HasIncomingMovementsError = "HAS_INCOMING_MOVEMENTS_ERROR",

  HasOpenPurchaseOrdersError = "HAS_OPEN_PURCHASE_ORDERS_ERROR",

  HasOpenTransfersError = "HAS_OPEN_TRANSFERS_ERROR",

  LocationNotFound = "LOCATION_NOT_FOUND",

  PermanentlyBlockedFromDeactivationError = "PERMANENTLY_BLOCKED_FROM_DEACTIVATION_ERROR",

  TemporarilyBlockedFromDeactivationError = "TEMPORARILY_BLOCKED_FROM_DEACTIVATION_ERROR",
}

export type LocationDeletePayload = {
  __typename?: "LocationDeletePayload"

  deletedLocationId?: Maybe<Scalars["ID"]["output"]>

  locationDeleteUserErrors: Array<LocationDeleteUserError>
}

export type LocationDeleteUserError = DisplayableError & {
  __typename?: "LocationDeleteUserError"

  code?: Maybe<LocationDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum LocationDeleteUserErrorCode {
  GenericError = "GENERIC_ERROR",

  LocationHasActiveRetailSubscription = "LOCATION_HAS_ACTIVE_RETAIL_SUBSCRIPTION",

  LocationHasInventory = "LOCATION_HAS_INVENTORY",

  LocationHasPendingOrders = "LOCATION_HAS_PENDING_ORDERS",

  LocationIsActive = "LOCATION_IS_ACTIVE",

  LocationNotFound = "LOCATION_NOT_FOUND",
}

export type LocationEdge = {
  __typename?: "LocationEdge"

  cursor: Scalars["String"]["output"]

  node: Location
}

export type LocationEditAddressInput = {
  address1?: InputMaybe<Scalars["String"]["input"]>

  address2?: InputMaybe<Scalars["String"]["input"]>

  city?: InputMaybe<Scalars["String"]["input"]>

  countryCode?: InputMaybe<CountryCode>

  phone?: InputMaybe<Scalars["String"]["input"]>

  provinceCode?: InputMaybe<Scalars["String"]["input"]>

  zip?: InputMaybe<Scalars["String"]["input"]>
}

export type LocationEditInput = {
  address?: InputMaybe<LocationEditAddressInput>

  fulfillsOnlineOrders?: InputMaybe<Scalars["Boolean"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  name?: InputMaybe<Scalars["String"]["input"]>
}

export type LocationEditPayload = {
  __typename?: "LocationEditPayload"

  location?: Maybe<Location>

  userErrors: Array<LocationEditUserError>
}

export type LocationEditUserError = DisplayableError & {
  __typename?: "LocationEditUserError"

  code?: Maybe<LocationEditUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum LocationEditUserErrorCode {
  AppNotAuthorized = "APP_NOT_AUTHORIZED",

  Blank = "BLANK",

  CannotDisableOnlineOrderFulfillment = "CANNOT_DISABLE_ONLINE_ORDER_FULFILLMENT",

  CannotModifyOnlineOrderFulfillmentForFsLocation = "CANNOT_MODIFY_ONLINE_ORDER_FULFILLMENT_FOR_FS_LOCATION",

  DisallowedOwnerType = "DISALLOWED_OWNER_TYPE",

  GenericError = "GENERIC_ERROR",

  Inclusion = "INCLUSION",

  Invalid = "INVALID",

  InvalidType = "INVALID_TYPE",

  InvalidUsZipcode = "INVALID_US_ZIPCODE",

  InvalidValue = "INVALID_VALUE",

  NotFound = "NOT_FOUND",

  Present = "PRESENT",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnstructuredReservedNamespace = "UNSTRUCTURED_RESERVED_NAMESPACE",
}

export type LocationLocalPickupDisablePayload = {
  __typename?: "LocationLocalPickupDisablePayload"

  locationId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<DeliveryLocationLocalPickupSettingsError>
}

export type LocationLocalPickupEnablePayload = {
  __typename?: "LocationLocalPickupEnablePayload"

  localPickupSettings?: Maybe<DeliveryLocalPickupSettings>

  userErrors: Array<DeliveryLocationLocalPickupSettingsError>
}

export enum LocationSortKeys {
  Id = "ID",

  Name = "NAME",

  Relevance = "RELEVANCE",
}

export type LocationSuggestedAddress = {
  __typename?: "LocationSuggestedAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  countryCode?: Maybe<CountryCode>

  formatted: Array<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type MailingAddress = Node & {
  __typename?: "MailingAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  company?: Maybe<Scalars["String"]["output"]>

  coordinatesValidated: Scalars["Boolean"]["output"]

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

  timeZone?: Maybe<Scalars["String"]["output"]>

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

  countryCode?: InputMaybe<CountryCode>

  firstName?: InputMaybe<Scalars["String"]["input"]>

  lastName?: InputMaybe<Scalars["String"]["input"]>

  phone?: InputMaybe<Scalars["String"]["input"]>

  provinceCode?: InputMaybe<Scalars["String"]["input"]>

  zip?: InputMaybe<Scalars["String"]["input"]>
}

export type ManualDiscountApplication = DiscountApplication & {
  __typename?: "ManualDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod

  description?: Maybe<Scalars["String"]["output"]>

  index: Scalars["Int"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]

  value: PricingValue
}

export type Market = HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "Market"

    catalogs: MarketCatalogConnection

    currencySettings: MarketCurrencySettings

    enabled: Scalars["Boolean"]["output"]

    handle: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    name: Scalars["String"]["output"]

    priceList?: Maybe<PriceList>

    primary: Scalars["Boolean"]["output"]
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    regions: MarketRegionConnection

    webPresence?: Maybe<MarketWebPresence>

    webPresences: MarketWebPresenceConnection
  }

export type MarketCatalogsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type MarketMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type MarketMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type MarketPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketRegionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketWebPresencesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketCatalog = Catalog &
  Node & {
    __typename?: "MarketCatalog"

    id: Scalars["ID"]["output"]

    markets: MarketConnection

    operations: Array<ResourceOperation>

    priceList?: Maybe<PriceList>

    publication?: Maybe<Publication>

    status: CatalogStatus

    title: Scalars["String"]["output"]
  }

export type MarketCatalogMarketsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketCatalogConnection = {
  __typename?: "MarketCatalogConnection"

  edges: Array<MarketCatalogEdge>

  nodes: Array<MarketCatalog>

  pageInfo: PageInfo
}

export type MarketCatalogEdge = {
  __typename?: "MarketCatalogEdge"

  cursor: Scalars["String"]["output"]

  node: MarketCatalog
}

export type MarketConnection = {
  __typename?: "MarketConnection"

  edges: Array<MarketEdge>

  nodes: Array<Market>

  pageInfo: PageInfo
}

export type MarketCreateInput = {
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>

  handle?: InputMaybe<Scalars["String"]["input"]>

  name: Scalars["String"]["input"]

  regions: Array<MarketRegionCreateInput>
}

export type MarketCreatePayload = {
  __typename?: "MarketCreatePayload"

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketCurrencySettings = {
  __typename?: "MarketCurrencySettings"

  baseCurrency: CurrencySetting

  localCurrencies: Scalars["Boolean"]["output"]
}

export type MarketCurrencySettingsUpdateInput = {
  baseCurrency?: InputMaybe<CurrencyCode>

  localCurrencies?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MarketCurrencySettingsUpdatePayload = {
  __typename?: "MarketCurrencySettingsUpdatePayload"

  market?: Maybe<Market>

  userErrors: Array<MarketCurrencySettingsUserError>
}

export type MarketCurrencySettingsUserError = DisplayableError & {
  __typename?: "MarketCurrencySettingsUserError"

  code?: Maybe<MarketCurrencySettingsUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MarketCurrencySettingsUserErrorCode {
  ManagedMarket = "MANAGED_MARKET",

  MarketNotFound = "MARKET_NOT_FOUND",

  MultipleCurrenciesNotSupported = "MULTIPLE_CURRENCIES_NOT_SUPPORTED",

  NoLocalCurrenciesOnSingleCountryMarket = "NO_LOCAL_CURRENCIES_ON_SINGLE_COUNTRY_MARKET",

  PrimaryMarketUsesShopCurrency = "PRIMARY_MARKET_USES_SHOP_CURRENCY",

  UnsupportedCurrency = "UNSUPPORTED_CURRENCY",
}

export type MarketDeletePayload = {
  __typename?: "MarketDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<MarketUserError>
}

export type MarketEdge = {
  __typename?: "MarketEdge"

  cursor: Scalars["String"]["output"]

  node: Market
}

export type MarketLocalizableContent = {
  __typename?: "MarketLocalizableContent"

  digest?: Maybe<Scalars["String"]["output"]>

  key: Scalars["String"]["output"]

  value?: Maybe<Scalars["String"]["output"]>
}

export type MarketLocalizableResource = {
  __typename?: "MarketLocalizableResource"

  marketLocalizableContent: Array<MarketLocalizableContent>

  marketLocalizations: Array<MarketLocalization>

  resourceId: Scalars["ID"]["output"]
}

export type MarketLocalizableResourceMarketLocalizationsArgs = {
  marketId: Scalars["ID"]["input"]
}

export type MarketLocalizableResourceConnection = {
  __typename?: "MarketLocalizableResourceConnection"

  edges: Array<MarketLocalizableResourceEdge>

  nodes: Array<MarketLocalizableResource>

  pageInfo: PageInfo
}

export type MarketLocalizableResourceEdge = {
  __typename?: "MarketLocalizableResourceEdge"

  cursor: Scalars["String"]["output"]

  node: MarketLocalizableResource
}

export enum MarketLocalizableResourceType {
  Metafield = "METAFIELD",

  Metaobject = "METAOBJECT",
}

export type MarketLocalization = {
  __typename?: "MarketLocalization"

  key: Scalars["String"]["output"]

  market: Market

  outdated: Scalars["Boolean"]["output"]

  updatedAt?: Maybe<Scalars["DateTime"]["output"]>

  value?: Maybe<Scalars["String"]["output"]>
}

export type MarketLocalizationRegisterInput = {
  key: Scalars["String"]["input"]

  marketId: Scalars["ID"]["input"]

  marketLocalizableContentDigest: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type MarketLocalizationsRegisterPayload = {
  __typename?: "MarketLocalizationsRegisterPayload"

  marketLocalizations?: Maybe<Array<MarketLocalization>>

  userErrors: Array<TranslationUserError>
}

export type MarketLocalizationsRemovePayload = {
  __typename?: "MarketLocalizationsRemovePayload"

  marketLocalizations?: Maybe<Array<MarketLocalization>>

  userErrors: Array<TranslationUserError>
}

export type MarketRegion = {
  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]
}

export type MarketRegionConnection = {
  __typename?: "MarketRegionConnection"

  edges: Array<MarketRegionEdge>

  nodes: Array<MarketRegion>

  pageInfo: PageInfo
}

export type MarketRegionCountry = MarketRegion &
  Node & {
    __typename?: "MarketRegionCountry"

    code: CountryCode

    currency: CurrencySetting

    id: Scalars["ID"]["output"]

    name: Scalars["String"]["output"]
  }

export type MarketRegionCreateInput = {
  countryCode: CountryCode
}

export type MarketRegionDeletePayload = {
  __typename?: "MarketRegionDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketRegionEdge = {
  __typename?: "MarketRegionEdge"

  cursor: Scalars["String"]["output"]

  node: MarketRegion
}

export type MarketRegionsCreatePayload = {
  __typename?: "MarketRegionsCreatePayload"

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketRegionsDeletePayload = {
  __typename?: "MarketRegionsDeletePayload"

  deletedIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<MarketUserError>
}

export type MarketUpdateInput = {
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>

  handle?: InputMaybe<Scalars["String"]["input"]>

  name?: InputMaybe<Scalars["String"]["input"]>
}

export type MarketUpdatePayload = {
  __typename?: "MarketUpdatePayload"

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketUserError = DisplayableError & {
  __typename?: "MarketUserError"

  code?: Maybe<MarketUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MarketUserErrorCode {
  Blank = "BLANK",

  CannotAddCustomerDomain = "CANNOT_ADD_CUSTOMER_DOMAIN",

  CannotAddRegionsToPrimaryMarket = "CANNOT_ADD_REGIONS_TO_PRIMARY_MARKET",

  CannotAddWebPresenceToPrimaryMarket = "CANNOT_ADD_WEB_PRESENCE_TO_PRIMARY_MARKET",

  CannotDeleteOnlyRegion = "CANNOT_DELETE_ONLY_REGION",

  CannotDeletePrimaryMarket = "CANNOT_DELETE_PRIMARY_MARKET",

  CannotDeletePrimaryMarketWebPresence = "CANNOT_DELETE_PRIMARY_MARKET_WEB_PRESENCE",

  CannotDisablePrimaryMarket = "CANNOT_DISABLE_PRIMARY_MARKET",

  CannotHaveBothSubfolderAndDomainWebPresences = "CANNOT_HAVE_BOTH_SUBFOLDER_AND_DOMAIN_WEB_PRESENCES",

  CannotHaveMultipleSubfoldersPerMarket = "CANNOT_HAVE_MULTIPLE_SUBFOLDERS_PER_MARKET",

  CannotHaveSubfolderAndDomain = "CANNOT_HAVE_SUBFOLDER_AND_DOMAIN",

  CannotSetDefaultLocaleToNull = "CANNOT_SET_DEFAULT_LOCALE_TO_NULL",

  DisabledLanguage = "DISABLED_LANGUAGE",

  DomainNotFound = "DOMAIN_NOT_FOUND",

  DuplicateLanguages = "DUPLICATE_LANGUAGES",

  Invalid = "INVALID",

  MarketNotFound = "MARKET_NOT_FOUND",

  MarketReachedWebPresenceLimit = "MARKET_REACHED_WEB_PRESENCE_LIMIT",

  NoLanguages = "NO_LANGUAGES",

  PrimaryMarketMustUsePrimaryDomain = "PRIMARY_MARKET_MUST_USE_PRIMARY_DOMAIN",

  RegionNotFound = "REGION_NOT_FOUND",

  RegionSpecificLanguage = "REGION_SPECIFIC_LANGUAGE",

  RequiresDomainOrSubfolder = "REQUIRES_DOMAIN_OR_SUBFOLDER",

  RequiresExactlyOneOption = "REQUIRES_EXACTLY_ONE_OPTION",

  ShopReachedMarketsLimit = "SHOP_REACHED_MARKETS_LIMIT",

  SubfolderSuffixCannotBeScriptCode = "SUBFOLDER_SUFFIX_CANNOT_BE_SCRIPT_CODE",

  SubfolderSuffixMustContainOnlyLetters = "SUBFOLDER_SUFFIX_MUST_CONTAIN_ONLY_LETTERS",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnpublishedLanguage = "UNPUBLISHED_LANGUAGE",

  UnsupportedCountryRegion = "UNSUPPORTED_COUNTRY_REGION",

  WebPresenceNotFound = "WEB_PRESENCE_NOT_FOUND",
}

export type MarketWebPresence = Node & {
  __typename?: "MarketWebPresence"

  alternateLocales: Array<Scalars["String"]["output"]>

  defaultLocale: Scalars["String"]["output"]

  domain?: Maybe<Domain>

  id: Scalars["ID"]["output"]

  market: Market

  rootUrls: Array<MarketWebPresenceRootUrl>

  subfolderSuffix?: Maybe<Scalars["String"]["output"]>
}

export type MarketWebPresenceConnection = {
  __typename?: "MarketWebPresenceConnection"

  edges: Array<MarketWebPresenceEdge>

  nodes: Array<MarketWebPresence>

  pageInfo: PageInfo
}

export type MarketWebPresenceCreateInput = {
  alternateLocales?: InputMaybe<Array<Scalars["String"]["input"]>>

  defaultLocale: Scalars["String"]["input"]

  domainId?: InputMaybe<Scalars["ID"]["input"]>

  subfolderSuffix?: InputMaybe<Scalars["String"]["input"]>
}

export type MarketWebPresenceCreatePayload = {
  __typename?: "MarketWebPresenceCreatePayload"

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketWebPresenceDeletePayload = {
  __typename?: "MarketWebPresenceDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketWebPresenceEdge = {
  __typename?: "MarketWebPresenceEdge"

  cursor: Scalars["String"]["output"]

  node: MarketWebPresence
}

export type MarketWebPresenceRootUrl = {
  __typename?: "MarketWebPresenceRootUrl"

  locale: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export type MarketWebPresenceUpdateInput = {
  alternateLocales?: InputMaybe<Array<Scalars["String"]["input"]>>

  defaultLocale?: InputMaybe<Scalars["String"]["input"]>

  domainId?: InputMaybe<Scalars["ID"]["input"]>

  subfolderSuffix?: InputMaybe<Scalars["String"]["input"]>
}

export type MarketWebPresenceUpdatePayload = {
  __typename?: "MarketWebPresenceUpdatePayload"

  market?: Maybe<Market>

  userErrors: Array<MarketUserError>
}

export type MarketingActivitiesDeleteAllExternalPayload = {
  __typename?: "MarketingActivitiesDeleteAllExternalPayload"

  job?: Maybe<Job>

  userErrors: Array<MarketingActivityUserError>
}

export type MarketingActivity = Node & {
  __typename?: "MarketingActivity"

  activityListUrl?: Maybe<Scalars["URL"]["output"]>

  adSpend?: Maybe<MoneyV2>

  app: App

  appErrors?: Maybe<MarketingActivityExtensionAppErrors>

  budget?: Maybe<MarketingBudget>

  createdAt: Scalars["DateTime"]["output"]

  formData?: Maybe<Scalars["String"]["output"]>

  hierarchyLevel?: Maybe<MarketingActivityHierarchyLevel>

  id: Scalars["ID"]["output"]

  inMainWorkflowVersion: Scalars["Boolean"]["output"]
  /**
   * The medium through which the marketing activity and event reached consumers. This is used for reporting aggregation.
   * @deprecated Use `marketingChannelType` instead.
   */
  marketingChannel: MarketingChannel

  marketingChannelType: MarketingChannel

  marketingEvent?: Maybe<MarketingEvent>

  parentActivityId?: Maybe<Scalars["ID"]["output"]>

  parentRemoteId?: Maybe<Scalars["String"]["output"]>

  sourceAndMedium: Scalars["String"]["output"]

  status: MarketingActivityStatus
  /**
   * The severity of the marketing activity's status.
   * @deprecated Use `statusBadgeTypeV2` instead.
   */
  statusBadgeType?: Maybe<MarketingActivityStatusBadgeType>

  statusBadgeTypeV2?: Maybe<BadgeType>

  statusLabel: Scalars["String"]["output"]

  statusTransitionedAt?: Maybe<Scalars["DateTime"]["output"]>

  tactic: MarketingTactic

  targetStatus?: Maybe<MarketingActivityStatus>

  title: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]

  urlParameterValue?: Maybe<Scalars["String"]["output"]>

  utmParameters?: Maybe<UtmParameters>
}

export type MarketingActivityBudgetInput = {
  budgetType?: InputMaybe<MarketingBudgetBudgetType>

  total?: InputMaybe<MoneyInput>
}

export type MarketingActivityConnection = {
  __typename?: "MarketingActivityConnection"

  edges: Array<MarketingActivityEdge>

  nodes: Array<MarketingActivity>

  pageInfo: PageInfo
}

export type MarketingActivityCreateExternalInput = {
  adSpend?: InputMaybe<MoneyInput>

  budget?: InputMaybe<MarketingActivityBudgetInput>

  channelHandle?: InputMaybe<Scalars["String"]["input"]>

  end?: InputMaybe<Scalars["DateTime"]["input"]>

  hierarchyLevel?: InputMaybe<MarketingActivityHierarchyLevel>

  marketingChannelType: MarketingChannel

  parentActivityId?: InputMaybe<Scalars["ID"]["input"]>

  parentRemoteId?: InputMaybe<Scalars["String"]["input"]>

  referringDomain?: InputMaybe<Scalars["String"]["input"]>

  remoteId?: InputMaybe<Scalars["String"]["input"]>

  remotePreviewImageUrl?: InputMaybe<Scalars["URL"]["input"]>

  remoteUrl: Scalars["URL"]["input"]

  scheduledEnd?: InputMaybe<Scalars["DateTime"]["input"]>

  scheduledStart?: InputMaybe<Scalars["DateTime"]["input"]>

  start?: InputMaybe<Scalars["DateTime"]["input"]>

  status?: InputMaybe<MarketingActivityExternalStatus>

  tactic: MarketingTactic

  title: Scalars["String"]["input"]

  urlParameterValue?: InputMaybe<Scalars["String"]["input"]>

  utm?: InputMaybe<UtmInput>
}

export type MarketingActivityCreateExternalPayload = {
  __typename?: "MarketingActivityCreateExternalPayload"

  marketingActivity?: Maybe<MarketingActivity>

  userErrors: Array<MarketingActivityUserError>
}

export type MarketingActivityCreateInput = {
  budget?: InputMaybe<MarketingActivityBudgetInput>

  context?: InputMaybe<Scalars["String"]["input"]>

  formData?: InputMaybe<Scalars["String"]["input"]>

  marketingActivityExtensionId: Scalars["ID"]["input"]

  marketingActivityTitle?: InputMaybe<Scalars["String"]["input"]>

  status: MarketingActivityStatus

  utm?: InputMaybe<UtmInput>
}

export type MarketingActivityCreatePayload = {
  __typename?: "MarketingActivityCreatePayload"

  marketingActivity?: Maybe<MarketingActivity>

  redirectPath?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<UserError>
}

export type MarketingActivityDeleteExternalPayload = {
  __typename?: "MarketingActivityDeleteExternalPayload"

  deletedMarketingActivityId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<MarketingActivityUserError>
}

export type MarketingActivityEdge = {
  __typename?: "MarketingActivityEdge"

  cursor: Scalars["String"]["output"]

  node: MarketingActivity
}

export enum MarketingActivityExtensionAppErrorCode {
  ApiError = "API_ERROR",

  InstallRequiredError = "INSTALL_REQUIRED_ERROR",

  NotOnboardedError = "NOT_ONBOARDED_ERROR",

  PlatformError = "PLATFORM_ERROR",

  ValidationError = "VALIDATION_ERROR",
}

export type MarketingActivityExtensionAppErrors = {
  __typename?: "MarketingActivityExtensionAppErrors"

  code: MarketingActivityExtensionAppErrorCode

  userErrors: Array<UserError>
}

export enum MarketingActivityExternalStatus {
  Active = "ACTIVE",

  DeletedExternally = "DELETED_EXTERNALLY",

  Inactive = "INACTIVE",

  Paused = "PAUSED",

  Scheduled = "SCHEDULED",

  Undefined = "UNDEFINED",
}

export enum MarketingActivityHierarchyLevel {
  Ad = "AD",

  AdGroup = "AD_GROUP",

  Campaign = "CAMPAIGN",
}

export enum MarketingActivitySortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",

  Title = "TITLE",
}

export enum MarketingActivityStatus {
  Active = "ACTIVE",

  Deleted = "DELETED",

  DeletedExternally = "DELETED_EXTERNALLY",

  Disconnected = "DISCONNECTED",

  Draft = "DRAFT",

  Failed = "FAILED",

  Inactive = "INACTIVE",

  Paused = "PAUSED",

  Pending = "PENDING",

  Scheduled = "SCHEDULED",

  Undefined = "UNDEFINED",
}

export enum MarketingActivityStatusBadgeType {
  Attention = "ATTENTION",

  Default = "DEFAULT",

  Info = "INFO",

  Success = "SUCCESS",

  Warning = "WARNING",
}

export type MarketingActivityUpdateExternalInput = {
  adSpend?: InputMaybe<MoneyInput>

  budget?: InputMaybe<MarketingActivityBudgetInput>

  end?: InputMaybe<Scalars["DateTime"]["input"]>

  marketingChannelType?: InputMaybe<MarketingChannel>

  referringDomain?: InputMaybe<Scalars["String"]["input"]>

  remotePreviewImageUrl?: InputMaybe<Scalars["URL"]["input"]>

  remoteUrl?: InputMaybe<Scalars["URL"]["input"]>

  scheduledEnd?: InputMaybe<Scalars["DateTime"]["input"]>

  scheduledStart?: InputMaybe<Scalars["DateTime"]["input"]>

  start?: InputMaybe<Scalars["DateTime"]["input"]>

  status?: InputMaybe<MarketingActivityExternalStatus>

  tactic?: InputMaybe<MarketingTactic>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type MarketingActivityUpdateExternalPayload = {
  __typename?: "MarketingActivityUpdateExternalPayload"

  marketingActivity?: Maybe<MarketingActivity>

  userErrors: Array<MarketingActivityUserError>
}

export type MarketingActivityUpdateInput = {
  budget?: InputMaybe<MarketingActivityBudgetInput>

  errors?: InputMaybe<Scalars["JSON"]["input"]>

  formData?: InputMaybe<Scalars["String"]["input"]>

  id: Scalars["ID"]["input"]

  marketedResources?: InputMaybe<Array<Scalars["ID"]["input"]>>

  marketingRecommendationId?: InputMaybe<Scalars["ID"]["input"]>

  status?: InputMaybe<MarketingActivityStatus>

  targetStatus?: InputMaybe<MarketingActivityStatus>

  title?: InputMaybe<Scalars["String"]["input"]>

  utm?: InputMaybe<UtmInput>
}

export type MarketingActivityUpdatePayload = {
  __typename?: "MarketingActivityUpdatePayload"

  marketingActivity?: Maybe<MarketingActivity>

  redirectPath?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<UserError>
}

export type MarketingActivityUpsertExternalInput = {
  adSpend?: InputMaybe<MoneyInput>

  budget?: InputMaybe<MarketingActivityBudgetInput>

  channelHandle?: InputMaybe<Scalars["String"]["input"]>

  end?: InputMaybe<Scalars["DateTime"]["input"]>

  hierarchyLevel?: InputMaybe<MarketingActivityHierarchyLevel>

  marketingChannelType: MarketingChannel

  parentRemoteId?: InputMaybe<Scalars["String"]["input"]>

  referringDomain?: InputMaybe<Scalars["String"]["input"]>

  remoteId: Scalars["String"]["input"]

  remotePreviewImageUrl?: InputMaybe<Scalars["URL"]["input"]>

  remoteUrl: Scalars["URL"]["input"]

  scheduledEnd?: InputMaybe<Scalars["DateTime"]["input"]>

  scheduledStart?: InputMaybe<Scalars["DateTime"]["input"]>

  start?: InputMaybe<Scalars["DateTime"]["input"]>

  status: MarketingActivityExternalStatus

  tactic: MarketingTactic

  title: Scalars["String"]["input"]

  urlParameterValue?: InputMaybe<Scalars["String"]["input"]>

  utm?: InputMaybe<UtmInput>
}

export type MarketingActivityUpsertExternalPayload = {
  __typename?: "MarketingActivityUpsertExternalPayload"

  marketingActivity?: Maybe<MarketingActivity>

  userErrors: Array<MarketingActivityUserError>
}

export type MarketingActivityUserError = DisplayableError & {
  __typename?: "MarketingActivityUserError"

  code?: Maybe<MarketingActivityUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MarketingActivityUserErrorCode {
  Invalid = "INVALID",

  Taken = "TAKEN",
}

export type MarketingBudget = {
  __typename?: "MarketingBudget"

  budgetType: MarketingBudgetBudgetType

  total: MoneyV2
}

export enum MarketingBudgetBudgetType {
  Daily = "DAILY",

  Lifetime = "LIFETIME",
}

export enum MarketingChannel {
  Display = "DISPLAY",

  Email = "EMAIL",

  Referral = "REFERRAL",

  Search = "SEARCH",

  Social = "SOCIAL",
}

export type MarketingEngagement = {
  __typename?: "MarketingEngagement"

  adSpend?: Maybe<MoneyV2>

  channelHandle?: Maybe<Scalars["String"]["output"]>

  clicksCount?: Maybe<Scalars["Int"]["output"]>

  commentsCount?: Maybe<Scalars["Int"]["output"]>

  complaintsCount?: Maybe<Scalars["Int"]["output"]>

  failsCount?: Maybe<Scalars["Int"]["output"]>

  favoritesCount?: Maybe<Scalars["Int"]["output"]>

  firstTimeCustomers?: Maybe<Scalars["Decimal"]["output"]>

  impressionsCount?: Maybe<Scalars["Int"]["output"]>

  isCumulative: Scalars["Boolean"]["output"]

  marketingActivity?: Maybe<MarketingActivity>

  occurredOn: Scalars["Date"]["output"]

  orders?: Maybe<Scalars["Decimal"]["output"]>

  returningCustomers?: Maybe<Scalars["Decimal"]["output"]>

  sales?: Maybe<MoneyV2>

  sendsCount?: Maybe<Scalars["Int"]["output"]>

  sessionsCount?: Maybe<Scalars["Int"]["output"]>

  sharesCount?: Maybe<Scalars["Int"]["output"]>

  uniqueClicksCount?: Maybe<Scalars["Int"]["output"]>

  uniqueViewsCount?: Maybe<Scalars["Int"]["output"]>

  unsubscribesCount?: Maybe<Scalars["Int"]["output"]>

  utcOffset: Scalars["UtcOffset"]["output"]

  viewsCount?: Maybe<Scalars["Int"]["output"]>
}

export type MarketingEngagementCreatePayload = {
  __typename?: "MarketingEngagementCreatePayload"

  marketingEngagement?: Maybe<MarketingEngagement>

  userErrors: Array<UserError>
}

export type MarketingEngagementInput = {
  adSpend?: InputMaybe<MoneyInput>

  clicksCount?: InputMaybe<Scalars["Int"]["input"]>

  commentsCount?: InputMaybe<Scalars["Int"]["input"]>

  complaintsCount?: InputMaybe<Scalars["Int"]["input"]>

  failsCount?: InputMaybe<Scalars["Int"]["input"]>

  favoritesCount?: InputMaybe<Scalars["Int"]["input"]>

  firstTimeCustomers?: InputMaybe<Scalars["Decimal"]["input"]>

  impressionsCount?: InputMaybe<Scalars["Int"]["input"]>

  isCumulative: Scalars["Boolean"]["input"]

  occurredOn: Scalars["Date"]["input"]

  orders?: InputMaybe<Scalars["Decimal"]["input"]>

  returningCustomers?: InputMaybe<Scalars["Decimal"]["input"]>

  sales?: InputMaybe<MoneyInput>

  sendsCount?: InputMaybe<Scalars["Int"]["input"]>

  sessionsCount?: InputMaybe<Scalars["Int"]["input"]>

  sharesCount?: InputMaybe<Scalars["Int"]["input"]>

  uniqueClicksCount?: InputMaybe<Scalars["Int"]["input"]>

  uniqueViewsCount?: InputMaybe<Scalars["Int"]["input"]>

  unsubscribesCount?: InputMaybe<Scalars["Int"]["input"]>

  utcOffset: Scalars["UtcOffset"]["input"]

  viewsCount?: InputMaybe<Scalars["Int"]["input"]>
}

export type MarketingEngagementsDeletePayload = {
  __typename?: "MarketingEngagementsDeletePayload"

  result?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<MarketingActivityUserError>
}

export type MarketingEvent = LegacyInteroperability &
  Node & {
    __typename?: "MarketingEvent"

    app: App
    /**
     * The medium through which the marketing activity and event reached consumers. This is used for reporting aggregation.
     * @deprecated Use `marketingChannelType` instead.
     */
    channel?: Maybe<MarketingChannel>

    channelHandle?: Maybe<Scalars["String"]["output"]>

    description?: Maybe<Scalars["String"]["output"]>

    endedAt?: Maybe<Scalars["DateTime"]["output"]>

    id: Scalars["ID"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    manageUrl?: Maybe<Scalars["URL"]["output"]>

    marketingChannelType?: Maybe<MarketingChannel>

    previewUrl?: Maybe<Scalars["URL"]["output"]>

    remoteId?: Maybe<Scalars["String"]["output"]>

    scheduledToEndAt?: Maybe<Scalars["DateTime"]["output"]>

    sourceAndMedium: Scalars["String"]["output"]

    startedAt: Scalars["DateTime"]["output"]
    /**
     * The display text for the marketing event type.
     * @deprecated Use `sourceAndMedium` instead.
     */
    targetTypeDisplayText: Scalars["String"]["output"]

    type: MarketingTactic

    utmCampaign?: Maybe<Scalars["String"]["output"]>

    utmMedium?: Maybe<Scalars["String"]["output"]>

    utmSource?: Maybe<Scalars["String"]["output"]>
  }

export type MarketingEventConnection = {
  __typename?: "MarketingEventConnection"

  edges: Array<MarketingEventEdge>

  nodes: Array<MarketingEvent>

  pageInfo: PageInfo
}

export type MarketingEventEdge = {
  __typename?: "MarketingEventEdge"

  cursor: Scalars["String"]["output"]

  node: MarketingEvent
}

export enum MarketingEventSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",

  StartedAt = "STARTED_AT",
}

export enum MarketingTactic {
  AbandonedCart = "ABANDONED_CART",

  Ad = "AD",

  Affiliate = "AFFILIATE",

  Direct = "DIRECT",
  /**
   * A display ad.
   * @deprecated `DISPLAY` is deprecated. Use `AD` instead.
   */
  Display = "DISPLAY",
  /**
   * A follow-up email.
   * @deprecated 'FOLLOW_UP' is deprecated. Use 'TRANSACTIONAL' instead.
   */
  FollowUp = "FOLLOW_UP",

  Link = "LINK",

  Loyalty = "LOYALTY",

  Message = "MESSAGE",

  Newsletter = "NEWSLETTER",

  Notification = "NOTIFICATION",

  Post = "POST",
  /**
   * A promotional receipt.
   * @deprecated 'RECEIPT' is deprecated. Use 'TRANSACTIONAL' instead.
   */
  Receipt = "RECEIPT",

  Retargeting = "RETARGETING",
  /**
   * Paid search.
   * @deprecated `SEARCH` is deprecated. Use `AD` instead.
   */
  Search = "SEARCH",

  Seo = "SEO",

  StorefrontApp = "STOREFRONT_APP",

  Transactional = "TRANSACTIONAL",
}

export type Media = {
  alt?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  mediaContentType: MediaContentType

  mediaErrors: Array<MediaError>

  mediaWarnings: Array<MediaWarning>

  preview?: Maybe<MediaPreviewImage>

  status: MediaStatus
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

export type MediaError = {
  __typename?: "MediaError"

  code: MediaErrorCode

  details?: Maybe<Scalars["String"]["output"]>

  message: Scalars["String"]["output"]
}

export enum MediaErrorCode {
  DuplicateFilenameError = "DUPLICATE_FILENAME_ERROR",

  ExternalVideoEmbedDisabled = "EXTERNAL_VIDEO_EMBED_DISABLED",

  ExternalVideoEmbedNotFoundOrTranscoding = "EXTERNAL_VIDEO_EMBED_NOT_FOUND_OR_TRANSCODING",

  ExternalVideoInvalidAspectRatio = "EXTERNAL_VIDEO_INVALID_ASPECT_RATIO",

  ExternalVideoNotFound = "EXTERNAL_VIDEO_NOT_FOUND",

  ExternalVideoUnlisted = "EXTERNAL_VIDEO_UNLISTED",

  FileStorageLimitExceeded = "FILE_STORAGE_LIMIT_EXCEEDED",

  GenericFileDownloadFailure = "GENERIC_FILE_DOWNLOAD_FAILURE",

  GenericFileInvalidSize = "GENERIC_FILE_INVALID_SIZE",

  ImageDownloadFailure = "IMAGE_DOWNLOAD_FAILURE",

  ImageProcessingFailure = "IMAGE_PROCESSING_FAILURE",

  InvalidImageAspectRatio = "INVALID_IMAGE_ASPECT_RATIO",

  InvalidImageFileSize = "INVALID_IMAGE_FILE_SIZE",

  InvalidImageResolution = "INVALID_IMAGE_RESOLUTION",

  InvalidSignedUrl = "INVALID_SIGNED_URL",

  MediaTimeoutError = "MEDIA_TIMEOUT_ERROR",

  Model3DGlbOutputCreationError = "MODEL3D_GLB_OUTPUT_CREATION_ERROR",

  Model3DGlbToUsdzConversionError = "MODEL3D_GLB_TO_USDZ_CONVERSION_ERROR",

  Model3DProcessingFailure = "MODEL3D_PROCESSING_FAILURE",

  Model3DThumbnailGenerationError = "MODEL3D_THUMBNAIL_GENERATION_ERROR",

  Model3DThumbnailRegenerationError = "MODEL3D_THUMBNAIL_REGENERATION_ERROR",

  Model3DValidationError = "MODEL3D_VALIDATION_ERROR",

  Unknown = "UNKNOWN",

  UnsupportedImageFileType = "UNSUPPORTED_IMAGE_FILE_TYPE",

  VideoInvalidFiletypeError = "VIDEO_INVALID_FILETYPE_ERROR",

  VideoMaxDurationError = "VIDEO_MAX_DURATION_ERROR",

  VideoMaxHeightError = "VIDEO_MAX_HEIGHT_ERROR",

  VideoMaxWidthError = "VIDEO_MAX_WIDTH_ERROR",

  VideoMetadataReadError = "VIDEO_METADATA_READ_ERROR",

  VideoMinDurationError = "VIDEO_MIN_DURATION_ERROR",

  VideoMinHeightError = "VIDEO_MIN_HEIGHT_ERROR",

  VideoMinWidthError = "VIDEO_MIN_WIDTH_ERROR",

  VideoValidationError = "VIDEO_VALIDATION_ERROR",
}

export enum MediaHost {
  Vimeo = "VIMEO",

  Youtube = "YOUTUBE",
}

export type MediaImage = File &
  HasMetafields &
  Media &
  Node & {
    __typename?: "MediaImage"

    alt?: Maybe<Scalars["String"]["output"]>

    createdAt: Scalars["DateTime"]["output"]

    fileErrors: Array<FileError>

    fileStatus: FileStatus

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    mediaContentType: MediaContentType

    mediaErrors: Array<MediaError>

    mediaWarnings: Array<MediaWarning>

    metafield?: Maybe<Metafield>

    metafields: MetafieldConnection

    mimeType?: Maybe<Scalars["String"]["output"]>

    originalSource?: Maybe<MediaImageOriginalSource>

    preview?: Maybe<MediaPreviewImage>
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    status: MediaStatus

    updatedAt: Scalars["DateTime"]["output"]
  }

export type MediaImageMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type MediaImageMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MediaImagePrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type MediaImagePrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MediaImageOriginalSource = {
  __typename?: "MediaImageOriginalSource"

  fileSize?: Maybe<Scalars["Int"]["output"]>

  url?: Maybe<Scalars["URL"]["output"]>
}

export type MediaPreviewImage = {
  __typename?: "MediaPreviewImage"

  image?: Maybe<Image>

  status: MediaPreviewImageStatus
}

export enum MediaPreviewImageStatus {
  Failed = "FAILED",

  Processing = "PROCESSING",

  Ready = "READY",

  Uploaded = "UPLOADED",
}

export enum MediaStatus {
  Failed = "FAILED",

  Processing = "PROCESSING",

  Ready = "READY",

  Uploaded = "UPLOADED",
}

export type MediaUserError = DisplayableError & {
  __typename?: "MediaUserError"

  code?: Maybe<MediaUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MediaUserErrorCode {
  Blank = "BLANK",

  Invalid = "INVALID",

  InvalidMediaType = "INVALID_MEDIA_TYPE",

  MaximumVariantMediaPairsExceeded = "MAXIMUM_VARIANT_MEDIA_PAIRS_EXCEEDED",

  MediaCannotBeModified = "MEDIA_CANNOT_BE_MODIFIED",

  MediaDoesNotExist = "MEDIA_DOES_NOT_EXIST",

  MediaDoesNotExistOnProduct = "MEDIA_DOES_NOT_EXIST_ON_PRODUCT",

  MediaIsNotAttachedToVariant = "MEDIA_IS_NOT_ATTACHED_TO_VARIANT",

  Model3DThrottleExceeded = "MODEL3D_THROTTLE_EXCEEDED",

  Model3DValidationError = "MODEL3D_VALIDATION_ERROR",

  NonReadyMedia = "NON_READY_MEDIA",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",

  ProductMediaLimitExceeded = "PRODUCT_MEDIA_LIMIT_EXCEEDED",

  ProductVariantAlreadyHasMedia = "PRODUCT_VARIANT_ALREADY_HAS_MEDIA",

  ProductVariantDoesNotExistOnProduct = "PRODUCT_VARIANT_DOES_NOT_EXIST_ON_PRODUCT",

  ProductVariantSpecifiedMultipleTimes = "PRODUCT_VARIANT_SPECIFIED_MULTIPLE_TIMES",

  ShopMediaLimitExceeded = "SHOP_MEDIA_LIMIT_EXCEEDED",

  TooManyMediaPerInputPair = "TOO_MANY_MEDIA_PER_INPUT_PAIR",

  VideoThrottleExceeded = "VIDEO_THROTTLE_EXCEEDED",

  VideoValidationError = "VIDEO_VALIDATION_ERROR",
}

export type MediaWarning = {
  __typename?: "MediaWarning"

  code: MediaWarningCode

  message?: Maybe<Scalars["String"]["output"]>
}

/** Warning types for media. */
export enum MediaWarningCode {
  ModelLargePhysicalSize = "MODEL_LARGE_PHYSICAL_SIZE",

  ModelSmallPhysicalSize = "MODEL_SMALL_PHYSICAL_SIZE",
}

export enum MerchandiseDiscountClass {
  Order = "ORDER",

  Product = "PRODUCT",
}

export type MerchantApprovalSignals = {
  __typename?: "MerchantApprovalSignals"

  identityVerified: Scalars["Boolean"]["output"]

  verifiedByShopify: Scalars["Boolean"]["output"]

  verifiedByShopifyTier: Scalars["String"]["output"]
}

export type Metafield = LegacyInteroperability &
  Node & {
    __typename?: "Metafield"

    createdAt: Scalars["DateTime"]["output"]

    definition?: Maybe<MetafieldDefinition>

    description?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    key: Scalars["String"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    namespace: Scalars["String"]["output"]

    owner: HasMetafields

    ownerType: MetafieldOwnerType

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

export type MetafieldAccess = {
  __typename?: "MetafieldAccess"

  admin?: Maybe<MetafieldAdminAccess>

  grants: Array<MetafieldAccessGrant>

  storefront?: Maybe<MetafieldStorefrontAccess>
}

export type MetafieldAccessGrant = {
  __typename?: "MetafieldAccessGrant"

  access: MetafieldGrantAccessLevel

  grantee: Scalars["String"]["output"]
}

export type MetafieldAccessGrantDeleteInput = {
  grantee: Scalars["String"]["input"]
}

export type MetafieldAccessGrantInput = {
  access: MetafieldGrantAccessLevel

  grantee: Scalars["String"]["input"]
}

export type MetafieldAccessGrantOperationInput = {
  create?: InputMaybe<MetafieldAccessGrantInput>

  delete?: InputMaybe<MetafieldAccessGrantDeleteInput>

  update?: InputMaybe<MetafieldAccessGrantInput>
}

export type MetafieldAccessInput = {
  admin: MetafieldAdminAccess

  grants?: InputMaybe<Array<MetafieldAccessGrantInput>>

  storefront?: InputMaybe<MetafieldStorefrontAccess>
}

export type MetafieldAccessUpdateInput = {
  admin: MetafieldAdminAccess

  grants?: InputMaybe<Array<MetafieldAccessGrantOperationInput>>

  storefront?: InputMaybe<MetafieldStorefrontAccess>
}

export enum MetafieldAdminAccess {
  MerchantRead = "MERCHANT_READ",

  MerchantReadWrite = "MERCHANT_READ_WRITE",

  Private = "PRIVATE",

  PublicRead = "PUBLIC_READ",
}

export type MetafieldConnection = {
  __typename?: "MetafieldConnection"

  edges: Array<MetafieldEdge>

  nodes: Array<Metafield>

  pageInfo: PageInfo
}

export type MetafieldDefinition = Node & {
  __typename?: "MetafieldDefinition"

  access: MetafieldAccess

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  key: Scalars["String"]["output"]

  metafields: MetafieldConnection

  metafieldsCount: Scalars["Int"]["output"]

  name: Scalars["String"]["output"]

  namespace: Scalars["String"]["output"]

  ownerType: MetafieldOwnerType

  pinnedPosition?: Maybe<Scalars["Int"]["output"]>

  standardTemplate?: Maybe<StandardMetafieldDefinitionTemplate>

  type: MetafieldDefinitionType

  useAsCollectionCondition: Scalars["Boolean"]["output"]

  validationStatus: MetafieldDefinitionValidationStatus

  validations: Array<MetafieldDefinitionValidation>
  /**
   * Whether each of the metafields that belong to the metafield definition are visible from the Storefront API.
   *
   * @deprecated Use `access.storefront` instead.
   */
  visibleToStorefrontApi: Scalars["Boolean"]["output"]
}

export type MetafieldDefinitionMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  validationStatus?: InputMaybe<MetafieldValidationStatus>
}

export type MetafieldDefinitionMetafieldsCountArgs = {
  validationStatus?: InputMaybe<MetafieldValidationStatus>
}

export type MetafieldDefinitionConnection = {
  __typename?: "MetafieldDefinitionConnection"

  edges: Array<MetafieldDefinitionEdge>

  nodes: Array<MetafieldDefinition>

  pageInfo: PageInfo
}

export type MetafieldDefinitionCreatePayload = {
  __typename?: "MetafieldDefinitionCreatePayload"

  createdDefinition?: Maybe<MetafieldDefinition>

  userErrors: Array<MetafieldDefinitionCreateUserError>
}

export type MetafieldDefinitionCreateUserError = DisplayableError & {
  __typename?: "MetafieldDefinitionCreateUserError"

  code?: Maybe<MetafieldDefinitionCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldDefinitionCreateUserErrorCode {
  DuplicateOption = "DUPLICATE_OPTION",

  GrantLimitExceeded = "GRANT_LIMIT_EXCEEDED",

  Inclusion = "INCLUSION",

  Invalid = "INVALID",

  InvalidCharacter = "INVALID_CHARACTER",

  InvalidInputCombination = "INVALID_INPUT_COMBINATION",

  InvalidOption = "INVALID_OPTION",

  LimitExceeded = "LIMIT_EXCEEDED",

  OwnerTypeLimitExceededForAutomatedCollections = "OWNER_TYPE_LIMIT_EXCEEDED_FOR_AUTOMATED_COLLECTIONS",

  PinnedLimitReached = "PINNED_LIMIT_REACHED",

  Present = "PRESENT",

  ReservedNamespaceKey = "RESERVED_NAMESPACE_KEY",

  ResourceTypeLimitExceeded = "RESOURCE_TYPE_LIMIT_EXCEEDED",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  TypeNotAllowedForConditions = "TYPE_NOT_ALLOWED_FOR_CONDITIONS",

  UnstructuredAlreadyExists = "UNSTRUCTURED_ALREADY_EXISTS",
}

export type MetafieldDefinitionDeletePayload = {
  __typename?: "MetafieldDefinitionDeletePayload"

  deletedDefinitionId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<MetafieldDefinitionDeleteUserError>
}

export type MetafieldDefinitionDeleteUserError = DisplayableError & {
  __typename?: "MetafieldDefinitionDeleteUserError"

  code?: Maybe<MetafieldDefinitionDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldDefinitionDeleteUserErrorCode {
  DisallowedOwnerType = "DISALLOWED_OWNER_TYPE",

  InternalError = "INTERNAL_ERROR",

  MetafieldDefinitionInUse = "METAFIELD_DEFINITION_IN_USE",

  NotFound = "NOT_FOUND",

  Present = "PRESENT",

  ReferenceTypeDeletionError = "REFERENCE_TYPE_DELETION_ERROR",
}

export type MetafieldDefinitionEdge = {
  __typename?: "MetafieldDefinitionEdge"

  cursor: Scalars["String"]["output"]

  node: MetafieldDefinition
}

export type MetafieldDefinitionInput = {
  access?: InputMaybe<MetafieldAccessInput>

  description?: InputMaybe<Scalars["String"]["input"]>

  key: Scalars["String"]["input"]

  name: Scalars["String"]["input"]

  namespace?: InputMaybe<Scalars["String"]["input"]>

  ownerType: MetafieldOwnerType

  pin?: InputMaybe<Scalars["Boolean"]["input"]>

  type: Scalars["String"]["input"]

  useAsCollectionCondition?: InputMaybe<Scalars["Boolean"]["input"]>

  validations?: InputMaybe<Array<MetafieldDefinitionValidationInput>>
}

export type MetafieldDefinitionPinPayload = {
  __typename?: "MetafieldDefinitionPinPayload"

  pinnedDefinition?: Maybe<MetafieldDefinition>

  userErrors: Array<MetafieldDefinitionPinUserError>
}

export type MetafieldDefinitionPinUserError = DisplayableError & {
  __typename?: "MetafieldDefinitionPinUserError"

  code?: Maybe<MetafieldDefinitionPinUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldDefinitionPinUserErrorCode {
  AlreadyPinned = "ALREADY_PINNED",

  DisallowedOwnerType = "DISALLOWED_OWNER_TYPE",

  InternalError = "INTERNAL_ERROR",

  NotFound = "NOT_FOUND",

  PinnedLimitReached = "PINNED_LIMIT_REACHED",
}

export enum MetafieldDefinitionPinnedStatus {
  Any = "ANY",

  Pinned = "PINNED",

  Unpinned = "UNPINNED",
}

export enum MetafieldDefinitionSortKeys {
  Id = "ID",

  Name = "NAME",

  PinnedPosition = "PINNED_POSITION",

  Relevance = "RELEVANCE",
}

export type MetafieldDefinitionSupportedValidation = {
  __typename?: "MetafieldDefinitionSupportedValidation"

  name: Scalars["String"]["output"]

  type: Scalars["String"]["output"]
}

export type MetafieldDefinitionType = {
  __typename?: "MetafieldDefinitionType"

  category: Scalars["String"]["output"]

  name: Scalars["String"]["output"]

  supportedValidations: Array<MetafieldDefinitionSupportedValidation>

  supportsDefinitionMigrations: Scalars["Boolean"]["output"]
  /**
   * The value type for a metafield created with this definition type.
   * @deprecated `valueType` is deprecated and `name` should be used for type information.
   */
  valueType: MetafieldValueType
}

export type MetafieldDefinitionUnpinPayload = {
  __typename?: "MetafieldDefinitionUnpinPayload"

  unpinnedDefinition?: Maybe<MetafieldDefinition>

  userErrors: Array<MetafieldDefinitionUnpinUserError>
}

export type MetafieldDefinitionUnpinUserError = DisplayableError & {
  __typename?: "MetafieldDefinitionUnpinUserError"

  code?: Maybe<MetafieldDefinitionUnpinUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldDefinitionUnpinUserErrorCode {
  DisallowedOwnerType = "DISALLOWED_OWNER_TYPE",

  InternalError = "INTERNAL_ERROR",

  NotFound = "NOT_FOUND",

  NotPinned = "NOT_PINNED",
}

export type MetafieldDefinitionUpdateInput = {
  access?: InputMaybe<MetafieldAccessUpdateInput>

  description?: InputMaybe<Scalars["String"]["input"]>

  key: Scalars["String"]["input"]

  name?: InputMaybe<Scalars["String"]["input"]>

  namespace?: InputMaybe<Scalars["String"]["input"]>

  ownerType: MetafieldOwnerType

  pin?: InputMaybe<Scalars["Boolean"]["input"]>

  useAsCollectionCondition?: InputMaybe<Scalars["Boolean"]["input"]>

  validations?: InputMaybe<Array<MetafieldDefinitionValidationInput>>
}

export type MetafieldDefinitionUpdatePayload = {
  __typename?: "MetafieldDefinitionUpdatePayload"

  updatedDefinition?: Maybe<MetafieldDefinition>

  userErrors: Array<MetafieldDefinitionUpdateUserError>

  validationJob?: Maybe<Job>
}

export type MetafieldDefinitionUpdateUserError = DisplayableError & {
  __typename?: "MetafieldDefinitionUpdateUserError"

  code?: Maybe<MetafieldDefinitionUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldDefinitionUpdateUserErrorCode {
  GrantLimitExceeded = "GRANT_LIMIT_EXCEEDED",

  InternalError = "INTERNAL_ERROR",

  InvalidInput = "INVALID_INPUT",

  InvalidInputCombination = "INVALID_INPUT_COMBINATION",

  MetafieldDefinitionInUse = "METAFIELD_DEFINITION_IN_USE",

  MetaobjectDefinitionChanged = "METAOBJECT_DEFINITION_CHANGED",

  NotFound = "NOT_FOUND",

  OwnerTypeLimitExceededForAutomatedCollections = "OWNER_TYPE_LIMIT_EXCEEDED_FOR_AUTOMATED_COLLECTIONS",

  PinnedLimitReached = "PINNED_LIMIT_REACHED",

  Present = "PRESENT",

  TooLong = "TOO_LONG",

  TypeNotAllowedForConditions = "TYPE_NOT_ALLOWED_FOR_CONDITIONS",
}

export type MetafieldDefinitionValidation = {
  __typename?: "MetafieldDefinitionValidation"

  name: Scalars["String"]["output"]

  type: Scalars["String"]["output"]

  value?: Maybe<Scalars["String"]["output"]>
}

export type MetafieldDefinitionValidationInput = {
  name: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export enum MetafieldDefinitionValidationStatus {
  AllValid = "ALL_VALID",

  InProgress = "IN_PROGRESS",

  SomeInvalid = "SOME_INVALID",
}

export type MetafieldDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type MetafieldDeletePayload = {
  __typename?: "MetafieldDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type MetafieldEdge = {
  __typename?: "MetafieldEdge"

  cursor: Scalars["String"]["output"]

  node: Metafield
}

export enum MetafieldGrantAccessLevel {
  Read = "READ",

  ReadWrite = "READ_WRITE",
}

export type MetafieldInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>

  key?: InputMaybe<Scalars["String"]["input"]>

  namespace?: InputMaybe<Scalars["String"]["input"]>

  type?: InputMaybe<Scalars["String"]["input"]>

  value?: InputMaybe<Scalars["String"]["input"]>
}

export enum MetafieldOwnerType {
  ApiPermission = "API_PERMISSION",

  Article = "ARTICLE",

  Blog = "BLOG",

  Carttransform = "CARTTRANSFORM",

  Collection = "COLLECTION",

  Company = "COMPANY",

  CompanyLocation = "COMPANY_LOCATION",

  Customer = "CUSTOMER",

  DeliveryCustomization = "DELIVERY_CUSTOMIZATION",

  Discount = "DISCOUNT",

  Draftorder = "DRAFTORDER",

  FulfillmentConstraintRule = "FULFILLMENT_CONSTRAINT_RULE",

  Location = "LOCATION",

  Market = "MARKET",

  MediaImage = "MEDIA_IMAGE",

  Order = "ORDER",

  OrderRoutingLocationRule = "ORDER_ROUTING_LOCATION_RULE",

  Page = "PAGE",

  PaymentCustomization = "PAYMENT_CUSTOMIZATION",

  Product = "PRODUCT",
  /**
   * The Product Image metafield owner type.
   * @deprecated `PRODUCTIMAGE` is deprecated. Use `MEDIA_IMAGE` instead.
   */
  Productimage = "PRODUCTIMAGE",

  Productvariant = "PRODUCTVARIANT",

  Shop = "SHOP",

  Validation = "VALIDATION",
}

export type MetafieldReference =
  | Collection
  | GenericFile
  | MediaImage
  | Metaobject
  | OnlineStorePage
  | Product
  | ProductVariant
  | Video

export type MetafieldReferenceConnection = {
  __typename?: "MetafieldReferenceConnection"

  edges: Array<MetafieldReferenceEdge>

  nodes: Array<Maybe<MetafieldReference>>

  pageInfo: PageInfo
}

export type MetafieldReferenceEdge = {
  __typename?: "MetafieldReferenceEdge"

  cursor: Scalars["String"]["output"]

  node?: Maybe<MetafieldReference>
}

export type MetafieldReferencer =
  | AppInstallation
  | Collection
  | Customer
  | DeliveryCustomization
  | DiscountAutomaticNode
  | DiscountCodeNode
  | DiscountNode
  | DraftOrder
  | FulfillmentOrder
  | Location
  | Market
  | Metaobject
  | OnlineStoreArticle
  | OnlineStoreBlog
  | OnlineStorePage
  | Order
  | PaymentCustomization
  | Product
  | ProductVariant
  | Shop

export type MetafieldRelation = {
  __typename?: "MetafieldRelation"

  key: Scalars["String"]["output"]

  name: Scalars["String"]["output"]

  namespace: Scalars["String"]["output"]

  referencer: MetafieldReferencer

  target: MetafieldReference
}

export type MetafieldRelationConnection = {
  __typename?: "MetafieldRelationConnection"

  edges: Array<MetafieldRelationEdge>

  nodes: Array<MetafieldRelation>

  pageInfo: PageInfo
}

export type MetafieldRelationEdge = {
  __typename?: "MetafieldRelationEdge"

  cursor: Scalars["String"]["output"]

  node: MetafieldRelation
}

export enum MetafieldStorefrontAccess {
  None = "NONE",

  PublicRead = "PUBLIC_READ",
}

export type MetafieldStorefrontVisibility = LegacyInteroperability &
  Node & {
    __typename?: "MetafieldStorefrontVisibility"

    createdAt: Scalars["DateTime"]["output"]

    id: Scalars["ID"]["output"]

    key: Scalars["String"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    namespace: Scalars["String"]["output"]

    ownerType: MetafieldOwnerType

    updatedAt: Scalars["DateTime"]["output"]
  }

export type MetafieldStorefrontVisibilityConnection = {
  __typename?: "MetafieldStorefrontVisibilityConnection"

  edges: Array<MetafieldStorefrontVisibilityEdge>

  nodes: Array<MetafieldStorefrontVisibility>

  pageInfo: PageInfo
}

export type MetafieldStorefrontVisibilityCreatePayload = {
  __typename?: "MetafieldStorefrontVisibilityCreatePayload"

  metafieldStorefrontVisibility?: Maybe<MetafieldStorefrontVisibility>

  userErrors: Array<UserError>
}

export type MetafieldStorefrontVisibilityDeletePayload = {
  __typename?: "MetafieldStorefrontVisibilityDeletePayload"

  deletedMetafieldStorefrontVisibilityId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type MetafieldStorefrontVisibilityEdge = {
  __typename?: "MetafieldStorefrontVisibilityEdge"

  cursor: Scalars["String"]["output"]

  node: MetafieldStorefrontVisibility
}

export type MetafieldStorefrontVisibilityInput = {
  key: Scalars["String"]["input"]

  namespace?: InputMaybe<Scalars["String"]["input"]>

  ownerType: MetafieldOwnerType
}

export enum MetafieldValidationStatus {
  Any = "ANY",

  Invalid = "INVALID",

  Valid = "VALID",
}

export enum MetafieldValueType {
  Boolean = "BOOLEAN",

  Integer = "INTEGER",

  JsonString = "JSON_STRING",

  String = "STRING",
}

export type MetafieldsSetInput = {
  key: Scalars["String"]["input"]

  namespace?: InputMaybe<Scalars["String"]["input"]>

  ownerId: Scalars["ID"]["input"]

  type?: InputMaybe<Scalars["String"]["input"]>

  value: Scalars["String"]["input"]
}

export type MetafieldsSetPayload = {
  __typename?: "MetafieldsSetPayload"

  metafields?: Maybe<Array<Metafield>>

  userErrors: Array<MetafieldsSetUserError>
}

export type MetafieldsSetUserError = DisplayableError & {
  __typename?: "MetafieldsSetUserError"

  code?: Maybe<MetafieldsSetUserErrorCode>

  elementIndex?: Maybe<Scalars["Int"]["output"]>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetafieldsSetUserErrorCode {
  AppNotAuthorized = "APP_NOT_AUTHORIZED",

  Blank = "BLANK",

  CapabilityViolation = "CAPABILITY_VIOLATION",

  Inclusion = "INCLUSION",

  InvalidType = "INVALID_TYPE",

  InvalidValue = "INVALID_VALUE",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  Present = "PRESENT",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",
}

export type Metaobject = Node & {
  __typename?: "Metaobject"

  capabilities: MetaobjectCapabilityData

  createdBy: App

  createdByApp: App

  createdByStaff?: Maybe<StaffMember>

  definition: MetaobjectDefinition

  displayName: Scalars["String"]["output"]

  field?: Maybe<MetaobjectField>

  fields: Array<MetaobjectField>

  handle: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  referencedBy: MetafieldRelationConnection
  /**
   * The staff member who created the metaobject.
   * @deprecated Use `createdByStaff` instead.
   */
  staffMember?: Maybe<StaffMember>

  thumbnailField?: Maybe<MetaobjectField>

  type: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]
}

export type MetaobjectFieldArgs = {
  key: Scalars["String"]["input"]
}

export type MetaobjectReferencedByArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MetaobjectAccess = {
  __typename?: "MetaobjectAccess"

  admin: MetaobjectAdminAccess

  storefront: MetaobjectStorefrontAccess
}

export type MetaobjectAccessInput = {
  admin?: InputMaybe<MetaobjectAdminAccess>

  storefront?: InputMaybe<MetaobjectStorefrontAccess>
}

export enum MetaobjectAdminAccess {
  MerchantRead = "MERCHANT_READ",

  MerchantReadWrite = "MERCHANT_READ_WRITE",

  Private = "PRIVATE",

  PublicRead = "PUBLIC_READ",

  PublicReadWrite = "PUBLIC_READ_WRITE",
}

export type MetaobjectBulkDeletePayload = {
  __typename?: "MetaobjectBulkDeletePayload"

  job?: Maybe<Job>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectBulkDeleteWhereCondition = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>

  type?: InputMaybe<Scalars["String"]["input"]>
}

export type MetaobjectCapabilities = {
  __typename?: "MetaobjectCapabilities"

  onlineStore?: Maybe<MetaobjectCapabilitiesOnlineStore>

  publishable: MetaobjectCapabilitiesPublishable

  renderable?: Maybe<MetaobjectCapabilitiesRenderable>

  translatable: MetaobjectCapabilitiesTranslatable
}

export type MetaobjectCapabilitiesOnlineStore = {
  __typename?: "MetaobjectCapabilitiesOnlineStore"

  data?: Maybe<MetaobjectCapabilityDefinitionDataOnlineStore>

  enabled: Scalars["Boolean"]["output"]
}

export type MetaobjectCapabilitiesPublishable = {
  __typename?: "MetaobjectCapabilitiesPublishable"

  enabled: Scalars["Boolean"]["output"]
}

export type MetaobjectCapabilitiesRenderable = {
  __typename?: "MetaobjectCapabilitiesRenderable"

  data?: Maybe<MetaobjectCapabilityDefinitionDataRenderable>

  enabled: Scalars["Boolean"]["output"]
}

export type MetaobjectCapabilitiesTranslatable = {
  __typename?: "MetaobjectCapabilitiesTranslatable"

  enabled: Scalars["Boolean"]["output"]
}

export type MetaobjectCapabilityCreateInput = {
  onlineStore?: InputMaybe<MetaobjectCapabilityOnlineStoreInput>

  publishable?: InputMaybe<MetaobjectCapabilityPublishableInput>

  renderable?: InputMaybe<MetaobjectCapabilityRenderableInput>

  translatable?: InputMaybe<MetaobjectCapabilityTranslatableInput>
}

export type MetaobjectCapabilityData = {
  __typename?: "MetaobjectCapabilityData"

  onlineStore?: Maybe<MetaobjectCapabilityDataOnlineStore>

  publishable?: Maybe<MetaobjectCapabilityDataPublishable>
}

export type MetaobjectCapabilityDataInput = {
  onlineStore?: InputMaybe<MetaobjectCapabilityDataOnlineStoreInput>

  publishable?: InputMaybe<MetaobjectCapabilityDataPublishableInput>
}

export type MetaobjectCapabilityDataOnlineStore = {
  __typename?: "MetaobjectCapabilityDataOnlineStore"

  templateSuffix?: Maybe<Scalars["String"]["output"]>
}

export type MetaobjectCapabilityDataOnlineStoreInput = {
  templateSuffix?: InputMaybe<Scalars["String"]["input"]>
}

export type MetaobjectCapabilityDataPublishable = {
  __typename?: "MetaobjectCapabilityDataPublishable"

  status: MetaobjectStatus
}

export type MetaobjectCapabilityDataPublishableInput = {
  status: MetaobjectStatus
}

export type MetaobjectCapabilityDefinitionDataOnlineStore = {
  __typename?: "MetaobjectCapabilityDefinitionDataOnlineStore"

  canCreateRedirects: Scalars["Boolean"]["output"]

  urlHandle: Scalars["String"]["output"]
}

export type MetaobjectCapabilityDefinitionDataOnlineStoreInput = {
  createRedirects?: InputMaybe<Scalars["Boolean"]["input"]>

  urlHandle: Scalars["String"]["input"]
}

export type MetaobjectCapabilityDefinitionDataRenderable = {
  __typename?: "MetaobjectCapabilityDefinitionDataRenderable"

  metaDescriptionKey?: Maybe<Scalars["String"]["output"]>

  metaTitleKey?: Maybe<Scalars["String"]["output"]>
}

export type MetaobjectCapabilityDefinitionDataRenderableInput = {
  metaDescriptionKey?: InputMaybe<Scalars["String"]["input"]>

  metaTitleKey?: InputMaybe<Scalars["String"]["input"]>
}

export type MetaobjectCapabilityOnlineStoreInput = {
  data?: InputMaybe<MetaobjectCapabilityDefinitionDataOnlineStoreInput>

  enabled: Scalars["Boolean"]["input"]
}

export type MetaobjectCapabilityPublishableInput = {
  enabled: Scalars["Boolean"]["input"]
}

export type MetaobjectCapabilityRenderableInput = {
  data?: InputMaybe<MetaobjectCapabilityDefinitionDataRenderableInput>

  enabled: Scalars["Boolean"]["input"]
}

export type MetaobjectCapabilityTranslatableInput = {
  enabled: Scalars["Boolean"]["input"]
}

export type MetaobjectCapabilityUpdateInput = {
  onlineStore?: InputMaybe<MetaobjectCapabilityOnlineStoreInput>

  publishable?: InputMaybe<MetaobjectCapabilityPublishableInput>

  renderable?: InputMaybe<MetaobjectCapabilityRenderableInput>

  translatable?: InputMaybe<MetaobjectCapabilityTranslatableInput>
}

export type MetaobjectConnection = {
  __typename?: "MetaobjectConnection"

  edges: Array<MetaobjectEdge>

  nodes: Array<Metaobject>

  pageInfo: PageInfo
}

export type MetaobjectCreateInput = {
  capabilities?: InputMaybe<MetaobjectCapabilityDataInput>

  fields?: InputMaybe<Array<MetaobjectFieldInput>>

  handle?: InputMaybe<Scalars["String"]["input"]>

  type: Scalars["String"]["input"]
}

export type MetaobjectCreatePayload = {
  __typename?: "MetaobjectCreatePayload"

  metaobject?: Maybe<Metaobject>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectDefinition = Node & {
  __typename?: "MetaobjectDefinition"

  access: MetaobjectAccess

  capabilities: MetaobjectCapabilities

  createdByApp: App

  createdByStaff?: Maybe<StaffMember>

  description?: Maybe<Scalars["String"]["output"]>

  displayNameKey?: Maybe<Scalars["String"]["output"]>

  fieldDefinitions: Array<MetaobjectFieldDefinition>

  hasThumbnailField: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]

  metaobjects: MetaobjectConnection

  metaobjectsCount: Scalars["Int"]["output"]

  name: Scalars["String"]["output"]

  type: Scalars["String"]["output"]
}

export type MetaobjectDefinitionMetaobjectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MetaobjectDefinitionConnection = {
  __typename?: "MetaobjectDefinitionConnection"

  edges: Array<MetaobjectDefinitionEdge>

  nodes: Array<MetaobjectDefinition>

  pageInfo: PageInfo
}

export type MetaobjectDefinitionCreateInput = {
  access?: InputMaybe<MetaobjectAccessInput>

  capabilities?: InputMaybe<MetaobjectCapabilityCreateInput>

  description?: InputMaybe<Scalars["String"]["input"]>

  displayNameKey?: InputMaybe<Scalars["String"]["input"]>

  fieldDefinitions: Array<MetaobjectFieldDefinitionCreateInput>

  name?: InputMaybe<Scalars["String"]["input"]>

  type: Scalars["String"]["input"]
}

export type MetaobjectDefinitionCreatePayload = {
  __typename?: "MetaobjectDefinitionCreatePayload"

  metaobjectDefinition?: Maybe<MetaobjectDefinition>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectDefinitionDeletePayload = {
  __typename?: "MetaobjectDefinitionDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectDefinitionEdge = {
  __typename?: "MetaobjectDefinitionEdge"

  cursor: Scalars["String"]["output"]

  node: MetaobjectDefinition
}

export type MetaobjectDefinitionUpdateInput = {
  access?: InputMaybe<MetaobjectAccessInput>

  capabilities?: InputMaybe<MetaobjectCapabilityUpdateInput>

  description?: InputMaybe<Scalars["String"]["input"]>

  displayNameKey?: InputMaybe<Scalars["String"]["input"]>

  fieldDefinitions?: InputMaybe<Array<MetaobjectFieldDefinitionOperationInput>>

  name?: InputMaybe<Scalars["String"]["input"]>

  resetFieldOrder?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MetaobjectDefinitionUpdatePayload = {
  __typename?: "MetaobjectDefinitionUpdatePayload"

  metaobjectDefinition?: Maybe<MetaobjectDefinition>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectDeletePayload = {
  __typename?: "MetaobjectDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectEdge = {
  __typename?: "MetaobjectEdge"

  cursor: Scalars["String"]["output"]

  node: Metaobject
}

export type MetaobjectField = {
  __typename?: "MetaobjectField"

  definition: MetaobjectFieldDefinition

  key: Scalars["String"]["output"]

  reference?: Maybe<MetafieldReference>

  references?: Maybe<MetafieldReferenceConnection>

  thumbnail?: Maybe<MetaobjectThumbnail>

  type: Scalars["String"]["output"]

  value?: Maybe<Scalars["String"]["output"]>
}

export type MetaobjectFieldReferencesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
}

export type MetaobjectFieldDefinition = {
  __typename?: "MetaobjectFieldDefinition"

  description?: Maybe<Scalars["String"]["output"]>

  key: Scalars["String"]["output"]

  name: Scalars["String"]["output"]

  required: Scalars["Boolean"]["output"]

  type: MetafieldDefinitionType

  validations: Array<MetafieldDefinitionValidation>
}

export type MetaobjectFieldDefinitionCreateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>

  key: Scalars["String"]["input"]

  name?: InputMaybe<Scalars["String"]["input"]>

  required?: InputMaybe<Scalars["Boolean"]["input"]>

  type: Scalars["String"]["input"]

  validations?: InputMaybe<Array<MetafieldDefinitionValidationInput>>
}

export type MetaobjectFieldDefinitionDeleteInput = {
  key: Scalars["String"]["input"]
}

export type MetaobjectFieldDefinitionOperationInput = {
  create?: InputMaybe<MetaobjectFieldDefinitionCreateInput>

  delete?: InputMaybe<MetaobjectFieldDefinitionDeleteInput>

  update?: InputMaybe<MetaobjectFieldDefinitionUpdateInput>
}

export type MetaobjectFieldDefinitionUpdateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>

  key: Scalars["String"]["input"]

  name?: InputMaybe<Scalars["String"]["input"]>

  required?: InputMaybe<Scalars["Boolean"]["input"]>

  validations?: InputMaybe<Array<MetafieldDefinitionValidationInput>>
}

export type MetaobjectFieldInput = {
  key: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type MetaobjectHandleInput = {
  handle: Scalars["String"]["input"]

  type: Scalars["String"]["input"]
}

export enum MetaobjectStatus {
  Active = "ACTIVE",

  Draft = "DRAFT",
}

export enum MetaobjectStorefrontAccess {
  None = "NONE",

  PublicRead = "PUBLIC_READ",
}

export type MetaobjectThumbnail = {
  __typename?: "MetaobjectThumbnail"

  file?: Maybe<File>

  hex?: Maybe<Scalars["String"]["output"]>
}

export type MetaobjectUpdateInput = {
  capabilities?: InputMaybe<MetaobjectCapabilityDataInput>

  fields?: InputMaybe<Array<MetaobjectFieldInput>>

  handle?: InputMaybe<Scalars["String"]["input"]>

  redirectNewHandle?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MetaobjectUpdatePayload = {
  __typename?: "MetaobjectUpdatePayload"

  metaobject?: Maybe<Metaobject>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectUpsertInput = {
  capabilities?: InputMaybe<MetaobjectCapabilityDataInput>

  fields?: InputMaybe<Array<MetaobjectFieldInput>>

  handle?: InputMaybe<Scalars["String"]["input"]>
}

export type MetaobjectUpsertPayload = {
  __typename?: "MetaobjectUpsertPayload"

  metaobject?: Maybe<Metaobject>

  userErrors: Array<MetaobjectUserError>
}

export type MetaobjectUserError = DisplayableError & {
  __typename?: "MetaobjectUserError"

  code?: Maybe<MetaobjectUserErrorCode>

  elementIndex?: Maybe<Scalars["Int"]["output"]>

  elementKey?: Maybe<Scalars["String"]["output"]>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum MetaobjectUserErrorCode {
  Blank = "BLANK",

  CapabilityNotEnabled = "CAPABILITY_NOT_ENABLED",

  DuplicateFieldInput = "DUPLICATE_FIELD_INPUT",

  FieldTypeInvalid = "FIELD_TYPE_INVALID",

  Immutable = "IMMUTABLE",

  Inclusion = "INCLUSION",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  InvalidOption = "INVALID_OPTION",

  InvalidType = "INVALID_TYPE",

  InvalidValue = "INVALID_VALUE",

  MaxDefinitionsExceeded = "MAX_DEFINITIONS_EXCEEDED",

  MaxObjectsExceeded = "MAX_OBJECTS_EXCEEDED",

  MissingRequiredKeys = "MISSING_REQUIRED_KEYS",

  NotAuthorized = "NOT_AUTHORIZED",

  ObjectFieldRequired = "OBJECT_FIELD_REQUIRED",

  ObjectFieldTaken = "OBJECT_FIELD_TAKEN",

  Present = "PRESENT",

  RecordNotFound = "RECORD_NOT_FOUND",

  ReservedName = "RESERVED_NAME",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UndefinedObjectField = "UNDEFINED_OBJECT_FIELD",

  UndefinedObjectType = "UNDEFINED_OBJECT_TYPE",

  UrlHandleBlank = "URL_HANDLE_BLANK",

  UrlHandleInvalid = "URL_HANDLE_INVALID",

  UrlHandleTaken = "URL_HANDLE_TAKEN",
}

export enum MethodDefinitionSortKeys {
  Id = "ID",

  RateProviderType = "RATE_PROVIDER_TYPE",

  Relevance = "RELEVANCE",
}

export type Model3d = Media &
  Node & {
    __typename?: "Model3d"

    alt?: Maybe<Scalars["String"]["output"]>

    boundingBox?: Maybe<Model3dBoundingBox>

    filename: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    mediaContentType: MediaContentType

    mediaErrors: Array<MediaError>

    mediaWarnings: Array<MediaWarning>

    originalSource?: Maybe<Model3dSource>

    preview?: Maybe<MediaPreviewImage>

    sources: Array<Model3dSource>

    status: MediaStatus
  }

export type Model3dBoundingBox = {
  __typename?: "Model3dBoundingBox"

  size: Vector3
}

export type Model3dSource = {
  __typename?: "Model3dSource"

  filesize: Scalars["Int"]["output"]

  format: Scalars["String"]["output"]

  mimeType: Scalars["String"]["output"]

  url: Scalars["String"]["output"]
}

export type MoneyBag = {
  __typename?: "MoneyBag"

  presentmentMoney: MoneyV2

  shopMoney: MoneyV2
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

export type MoveInput = {
  id: Scalars["ID"]["input"]

  newPosition: Scalars["UnsignedInt64"]["input"]
}

export type Mutation = {
  __typename?: "Mutation"
  /**
   * Updates the email state value for an abandonment.
   * @deprecated Use `abandonmentUpdateActivitiesDeliveryStatuses` instead.
   */
  abandonmentEmailStateUpdate?: Maybe<AbandonmentEmailStateUpdatePayload>

  abandonmentUpdateActivitiesDeliveryStatuses?: Maybe<AbandonmentUpdateActivitiesDeliveryStatusesPayload>

  appPurchaseOneTimeCreate?: Maybe<AppPurchaseOneTimeCreatePayload>

  appSubscriptionCancel?: Maybe<AppSubscriptionCancelPayload>

  appSubscriptionCreate?: Maybe<AppSubscriptionCreatePayload>

  appSubscriptionLineItemUpdate?: Maybe<AppSubscriptionLineItemUpdatePayload>

  appSubscriptionTrialExtend?: Maybe<AppSubscriptionTrialExtendPayload>

  appUsageRecordCreate?: Maybe<AppUsageRecordCreatePayload>

  bulkOperationCancel?: Maybe<BulkOperationCancelPayload>

  bulkOperationRunMutation?: Maybe<BulkOperationRunMutationPayload>

  bulkOperationRunQuery?: Maybe<BulkOperationRunQueryPayload>

  bulkProductResourceFeedbackCreate?: Maybe<BulkProductResourceFeedbackCreatePayload>

  cartTransformCreate?: Maybe<CartTransformCreatePayload>

  cartTransformDelete?: Maybe<CartTransformDeletePayload>

  catalogContextUpdate?: Maybe<CatalogContextUpdatePayload>

  catalogCreate?: Maybe<CatalogCreatePayload>

  catalogDelete?: Maybe<CatalogDeletePayload>

  catalogUpdate?: Maybe<CatalogUpdatePayload>

  checkoutBrandingUpsert?: Maybe<CheckoutBrandingUpsertPayload>

  collectionAddProducts?: Maybe<CollectionAddProductsPayload>

  collectionAddProductsV2?: Maybe<CollectionAddProductsV2Payload>

  collectionCreate?: Maybe<CollectionCreatePayload>

  collectionDelete?: Maybe<CollectionDeletePayload>
  /**
   * Publishes a collection to a channel.
   * @deprecated Use `publishablePublish` instead.
   */
  collectionPublish?: Maybe<CollectionPublishPayload>

  collectionRemoveProducts?: Maybe<CollectionRemoveProductsPayload>

  collectionReorderProducts?: Maybe<CollectionReorderProductsPayload>
  /**
   * Unpublishes a collection.
   * @deprecated Use `publishableUnpublish` instead.
   */
  collectionUnpublish?: Maybe<CollectionUnpublishPayload>

  collectionUpdate?: Maybe<CollectionUpdatePayload>

  companiesDelete?: Maybe<CompaniesDeletePayload>

  companyAddressDelete?: Maybe<CompanyAddressDeletePayload>

  companyAssignCustomerAsContact?: Maybe<CompanyAssignCustomerAsContactPayload>

  companyAssignMainContact?: Maybe<CompanyAssignMainContactPayload>

  companyContactAssignRole?: Maybe<CompanyContactAssignRolePayload>

  companyContactAssignRoles?: Maybe<CompanyContactAssignRolesPayload>

  companyContactCreate?: Maybe<CompanyContactCreatePayload>

  companyContactDelete?: Maybe<CompanyContactDeletePayload>

  companyContactRemoveFromCompany?: Maybe<CompanyContactRemoveFromCompanyPayload>

  companyContactRevokeRole?: Maybe<CompanyContactRevokeRolePayload>

  companyContactRevokeRoles?: Maybe<CompanyContactRevokeRolesPayload>

  companyContactSendWelcomeEmail?: Maybe<CompanyContactSendWelcomeEmailPayload>

  companyContactUpdate?: Maybe<CompanyContactUpdatePayload>

  companyContactsDelete?: Maybe<CompanyContactsDeletePayload>

  companyCreate?: Maybe<CompanyCreatePayload>

  companyDelete?: Maybe<CompanyDeletePayload>

  companyLocationAssignAddress?: Maybe<CompanyLocationAssignAddressPayload>

  companyLocationAssignRoles?: Maybe<CompanyLocationAssignRolesPayload>

  companyLocationAssignTaxExemptions?: Maybe<CompanyLocationAssignTaxExemptionsPayload>

  companyLocationCreate?: Maybe<CompanyLocationCreatePayload>

  companyLocationCreateTaxRegistration?: Maybe<CompanyLocationCreateTaxRegistrationPayload>

  companyLocationDelete?: Maybe<CompanyLocationDeletePayload>

  companyLocationRevokeRoles?: Maybe<CompanyLocationRevokeRolesPayload>

  companyLocationRevokeTaxExemptions?: Maybe<CompanyLocationRevokeTaxExemptionsPayload>

  companyLocationRevokeTaxRegistration?: Maybe<CompanyLocationRevokeTaxRegistrationPayload>

  companyLocationUpdate?: Maybe<CompanyLocationUpdatePayload>

  companyLocationsDelete?: Maybe<CompanyLocationsDeletePayload>

  companyRevokeMainContact?: Maybe<CompanyRevokeMainContactPayload>

  companyUpdate?: Maybe<CompanyUpdatePayload>

  customerAddTaxExemptions?: Maybe<CustomerAddTaxExemptionsPayload>

  customerCancelDataErasure?: Maybe<CustomerCancelDataErasurePayload>

  customerCreate?: Maybe<CustomerCreatePayload>

  customerDelete?: Maybe<CustomerDeletePayload>

  customerEmailMarketingConsentUpdate?: Maybe<CustomerEmailMarketingConsentUpdatePayload>

  customerGenerateAccountActivationUrl?: Maybe<CustomerGenerateAccountActivationUrlPayload>

  customerMerge?: Maybe<CustomerMergePayload>

  customerPaymentMethodCreateFromDuplicationData?: Maybe<CustomerPaymentMethodCreateFromDuplicationDataPayload>

  customerPaymentMethodCreditCardCreate?: Maybe<CustomerPaymentMethodCreditCardCreatePayload>

  customerPaymentMethodCreditCardUpdate?: Maybe<CustomerPaymentMethodCreditCardUpdatePayload>

  customerPaymentMethodGetDuplicationData?: Maybe<CustomerPaymentMethodGetDuplicationDataPayload>

  customerPaymentMethodGetUpdateUrl?: Maybe<CustomerPaymentMethodGetUpdateUrlPayload>

  customerPaymentMethodPaypalBillingAgreementCreate?: Maybe<CustomerPaymentMethodPaypalBillingAgreementCreatePayload>

  customerPaymentMethodPaypalBillingAgreementUpdate?: Maybe<CustomerPaymentMethodPaypalBillingAgreementUpdatePayload>

  customerPaymentMethodRemoteCreate?: Maybe<CustomerPaymentMethodRemoteCreatePayload>
  /**
   * Create a payment method from a credit card stored by Stripe.
   * @deprecated Use `customerPaymentMethodRemoteCreate` instead.
   */
  customerPaymentMethodRemoteCreditCardCreate?: Maybe<CustomerPaymentMethodRemoteCreditCardCreatePayload>

  customerPaymentMethodRevoke?: Maybe<CustomerPaymentMethodRevokePayload>

  customerPaymentMethodSendUpdateEmail?: Maybe<CustomerPaymentMethodSendUpdateEmailPayload>

  customerRemoveTaxExemptions?: Maybe<CustomerRemoveTaxExemptionsPayload>

  customerReplaceTaxExemptions?: Maybe<CustomerReplaceTaxExemptionsPayload>

  customerRequestDataErasure?: Maybe<CustomerRequestDataErasurePayload>

  customerSegmentMembersQueryCreate?: Maybe<CustomerSegmentMembersQueryCreatePayload>

  customerSmsMarketingConsentUpdate?: Maybe<CustomerSmsMarketingConsentUpdatePayload>

  customerUpdate?: Maybe<CustomerUpdatePayload>

  customerUpdateDefaultAddress?: Maybe<CustomerUpdateDefaultAddressPayload>

  delegateAccessTokenCreate?: Maybe<DelegateAccessTokenCreatePayload>

  delegateAccessTokenDestroy?: Maybe<DelegateAccessTokenDestroyPayload>

  deliveryCustomizationActivation?: Maybe<DeliveryCustomizationActivationPayload>

  deliveryCustomizationCreate?: Maybe<DeliveryCustomizationCreatePayload>

  deliveryCustomizationDelete?: Maybe<DeliveryCustomizationDeletePayload>

  deliveryCustomizationUpdate?: Maybe<DeliveryCustomizationUpdatePayload>

  deliveryProfileCreate?: Maybe<DeliveryProfileCreatePayload>

  deliveryProfileRemove?: Maybe<DeliveryProfileRemovePayload>

  deliveryProfileUpdate?: Maybe<DeliveryProfileUpdatePayload>

  deliverySettingUpdate?: Maybe<DeliverySettingUpdatePayload>

  deliveryShippingOriginAssign?: Maybe<DeliveryShippingOriginAssignPayload>

  discountAutomaticActivate?: Maybe<DiscountAutomaticActivatePayload>

  discountAutomaticAppCreate?: Maybe<DiscountAutomaticAppCreatePayload>

  discountAutomaticAppUpdate?: Maybe<DiscountAutomaticAppUpdatePayload>

  discountAutomaticBasicCreate?: Maybe<DiscountAutomaticBasicCreatePayload>

  discountAutomaticBasicUpdate?: Maybe<DiscountAutomaticBasicUpdatePayload>

  discountAutomaticBulkDelete?: Maybe<DiscountAutomaticBulkDeletePayload>

  discountAutomaticBxgyCreate?: Maybe<DiscountAutomaticBxgyCreatePayload>

  discountAutomaticBxgyUpdate?: Maybe<DiscountAutomaticBxgyUpdatePayload>

  discountAutomaticDeactivate?: Maybe<DiscountAutomaticDeactivatePayload>

  discountAutomaticDelete?: Maybe<DiscountAutomaticDeletePayload>

  discountAutomaticFreeShippingCreate?: Maybe<DiscountAutomaticFreeShippingCreatePayload>

  discountAutomaticFreeShippingUpdate?: Maybe<DiscountAutomaticFreeShippingUpdatePayload>

  discountCodeActivate?: Maybe<DiscountCodeActivatePayload>

  discountCodeAppCreate?: Maybe<DiscountCodeAppCreatePayload>

  discountCodeAppUpdate?: Maybe<DiscountCodeAppUpdatePayload>

  discountCodeBasicCreate?: Maybe<DiscountCodeBasicCreatePayload>

  discountCodeBasicUpdate?: Maybe<DiscountCodeBasicUpdatePayload>

  discountCodeBulkActivate?: Maybe<DiscountCodeBulkActivatePayload>

  discountCodeBulkDeactivate?: Maybe<DiscountCodeBulkDeactivatePayload>

  discountCodeBulkDelete?: Maybe<DiscountCodeBulkDeletePayload>

  discountCodeBxgyCreate?: Maybe<DiscountCodeBxgyCreatePayload>

  discountCodeBxgyUpdate?: Maybe<DiscountCodeBxgyUpdatePayload>

  discountCodeDeactivate?: Maybe<DiscountCodeDeactivatePayload>

  discountCodeDelete?: Maybe<DiscountCodeDeletePayload>

  discountCodeFreeShippingCreate?: Maybe<DiscountCodeFreeShippingCreatePayload>

  discountCodeFreeShippingUpdate?: Maybe<DiscountCodeFreeShippingUpdatePayload>

  discountCodeRedeemCodeBulkDelete?: Maybe<DiscountCodeRedeemCodeBulkDeletePayload>

  discountRedeemCodeBulkAdd?: Maybe<DiscountRedeemCodeBulkAddPayload>

  disputeEvidenceUpdate?: Maybe<DisputeEvidenceUpdatePayload>

  draftOrderBulkAddTags?: Maybe<DraftOrderBulkAddTagsPayload>

  draftOrderBulkDelete?: Maybe<DraftOrderBulkDeletePayload>

  draftOrderBulkRemoveTags?: Maybe<DraftOrderBulkRemoveTagsPayload>

  draftOrderCalculate?: Maybe<DraftOrderCalculatePayload>

  draftOrderComplete?: Maybe<DraftOrderCompletePayload>

  draftOrderCreate?: Maybe<DraftOrderCreatePayload>

  draftOrderCreateFromOrder?: Maybe<DraftOrderCreateFromOrderPayload>

  draftOrderCreateMerchantCheckout?: Maybe<DraftOrderCreateMerchantCheckoutPayload>

  draftOrderDelete?: Maybe<DraftOrderDeletePayload>

  draftOrderDuplicate?: Maybe<DraftOrderDuplicatePayload>

  draftOrderInvoicePreview?: Maybe<DraftOrderInvoicePreviewPayload>

  draftOrderInvoiceSend?: Maybe<DraftOrderInvoiceSendPayload>

  draftOrderUpdate?: Maybe<DraftOrderUpdatePayload>

  eventBridgeServerPixelUpdate?: Maybe<EventBridgeServerPixelUpdatePayload>

  eventBridgeWebhookSubscriptionCreate?: Maybe<EventBridgeWebhookSubscriptionCreatePayload>

  eventBridgeWebhookSubscriptionUpdate?: Maybe<EventBridgeWebhookSubscriptionUpdatePayload>

  fileAcknowledgeUpdateFailed?: Maybe<FileAcknowledgeUpdateFailedPayload>

  fileCreate?: Maybe<FileCreatePayload>

  fileDelete?: Maybe<FileDeletePayload>

  fileUpdate?: Maybe<FileUpdatePayload>

  flowGenerateSignature?: Maybe<FlowGenerateSignaturePayload>

  flowTriggerReceive?: Maybe<FlowTriggerReceivePayload>

  fulfillmentCancel?: Maybe<FulfillmentCancelPayload>

  fulfillmentConstraintRuleCreate?: Maybe<FulfillmentConstraintRuleCreatePayload>

  fulfillmentConstraintRuleDelete?: Maybe<FulfillmentConstraintRuleDeletePayload>

  fulfillmentCreateV2?: Maybe<FulfillmentCreateV2Payload>

  fulfillmentEventCreate?: Maybe<FulfillmentEventCreatePayload>

  fulfillmentOrderAcceptCancellationRequest?: Maybe<FulfillmentOrderAcceptCancellationRequestPayload>

  fulfillmentOrderAcceptFulfillmentRequest?: Maybe<FulfillmentOrderAcceptFulfillmentRequestPayload>

  fulfillmentOrderCancel?: Maybe<FulfillmentOrderCancelPayload>

  fulfillmentOrderClose?: Maybe<FulfillmentOrderClosePayload>

  fulfillmentOrderHold?: Maybe<FulfillmentOrderHoldPayload>

  fulfillmentOrderLineItemsPreparedForPickup?: Maybe<FulfillmentOrderLineItemsPreparedForPickupPayload>

  fulfillmentOrderMerge?: Maybe<FulfillmentOrderMergePayload>

  fulfillmentOrderMove?: Maybe<FulfillmentOrderMovePayload>

  fulfillmentOrderOpen?: Maybe<FulfillmentOrderOpenPayload>

  fulfillmentOrderRejectCancellationRequest?: Maybe<FulfillmentOrderRejectCancellationRequestPayload>

  fulfillmentOrderRejectFulfillmentRequest?: Maybe<FulfillmentOrderRejectFulfillmentRequestPayload>

  fulfillmentOrderReleaseHold?: Maybe<FulfillmentOrderReleaseHoldPayload>

  fulfillmentOrderReschedule?: Maybe<FulfillmentOrderReschedulePayload>

  fulfillmentOrderSplit?: Maybe<FulfillmentOrderSplitPayload>

  fulfillmentOrderSubmitCancellationRequest?: Maybe<FulfillmentOrderSubmitCancellationRequestPayload>

  fulfillmentOrderSubmitFulfillmentRequest?: Maybe<FulfillmentOrderSubmitFulfillmentRequestPayload>

  fulfillmentOrdersReleaseHolds?: Maybe<FulfillmentOrdersReleaseHoldsPayload>

  fulfillmentOrdersSetFulfillmentDeadline?: Maybe<FulfillmentOrdersSetFulfillmentDeadlinePayload>

  fulfillmentServiceCreate?: Maybe<FulfillmentServiceCreatePayload>

  fulfillmentServiceDelete?: Maybe<FulfillmentServiceDeletePayload>

  fulfillmentServiceUpdate?: Maybe<FulfillmentServiceUpdatePayload>

  fulfillmentTrackingInfoUpdateV2?: Maybe<FulfillmentTrackingInfoUpdateV2Payload>

  giftCardCreate?: Maybe<GiftCardCreatePayload>

  giftCardDisable?: Maybe<GiftCardDisablePayload>

  giftCardUpdate?: Maybe<GiftCardUpdatePayload>

  inventoryActivate?: Maybe<InventoryActivatePayload>

  inventoryAdjustQuantities?: Maybe<InventoryAdjustQuantitiesPayload>
  /**
   * Adjusts the inventory by a certain quantity.
   * @deprecated Use `inventoryAdjustQuantities` instead.
   */
  inventoryAdjustQuantity?: Maybe<InventoryAdjustQuantityPayload>
  /**
   * Adjusts the inventory at a location for multiple inventory items.
   * @deprecated Use `inventoryAdjustQuantities` instead.
   */
  inventoryBulkAdjustQuantityAtLocation?: Maybe<InventoryBulkAdjustQuantityAtLocationPayload>

  inventoryBulkToggleActivation?: Maybe<InventoryBulkToggleActivationPayload>

  inventoryDeactivate?: Maybe<InventoryDeactivatePayload>

  inventoryItemUpdate?: Maybe<InventoryItemUpdatePayload>

  inventoryMoveQuantities?: Maybe<InventoryMoveQuantitiesPayload>

  inventorySetOnHandQuantities?: Maybe<InventorySetOnHandQuantitiesPayload>

  inventorySetScheduledChanges?: Maybe<InventorySetScheduledChangesPayload>

  locationActivate?: Maybe<LocationActivatePayload>

  locationAdd?: Maybe<LocationAddPayload>

  locationDeactivate?: Maybe<LocationDeactivatePayload>

  locationDelete?: Maybe<LocationDeletePayload>

  locationEdit?: Maybe<LocationEditPayload>

  locationLocalPickupDisable?: Maybe<LocationLocalPickupDisablePayload>

  locationLocalPickupEnable?: Maybe<LocationLocalPickupEnablePayload>

  marketCreate?: Maybe<MarketCreatePayload>

  marketCurrencySettingsUpdate?: Maybe<MarketCurrencySettingsUpdatePayload>

  marketDelete?: Maybe<MarketDeletePayload>

  marketLocalizationsRegister?: Maybe<MarketLocalizationsRegisterPayload>

  marketLocalizationsRemove?: Maybe<MarketLocalizationsRemovePayload>

  marketRegionDelete?: Maybe<MarketRegionDeletePayload>

  marketRegionsCreate?: Maybe<MarketRegionsCreatePayload>

  marketRegionsDelete?: Maybe<MarketRegionsDeletePayload>

  marketUpdate?: Maybe<MarketUpdatePayload>

  marketWebPresenceCreate?: Maybe<MarketWebPresenceCreatePayload>

  marketWebPresenceDelete?: Maybe<MarketWebPresenceDeletePayload>

  marketWebPresenceUpdate?: Maybe<MarketWebPresenceUpdatePayload>

  marketingActivitiesDeleteAllExternal?: Maybe<MarketingActivitiesDeleteAllExternalPayload>

  marketingActivityCreate?: Maybe<MarketingActivityCreatePayload>

  marketingActivityCreateExternal?: Maybe<MarketingActivityCreateExternalPayload>

  marketingActivityDeleteExternal?: Maybe<MarketingActivityDeleteExternalPayload>

  marketingActivityUpdate?: Maybe<MarketingActivityUpdatePayload>

  marketingActivityUpdateExternal?: Maybe<MarketingActivityUpdateExternalPayload>

  marketingActivityUpsertExternal?: Maybe<MarketingActivityUpsertExternalPayload>

  marketingEngagementCreate?: Maybe<MarketingEngagementCreatePayload>

  marketingEngagementsDelete?: Maybe<MarketingEngagementsDeletePayload>

  metafieldDefinitionCreate?: Maybe<MetafieldDefinitionCreatePayload>

  metafieldDefinitionDelete?: Maybe<MetafieldDefinitionDeletePayload>

  metafieldDefinitionPin?: Maybe<MetafieldDefinitionPinPayload>

  metafieldDefinitionUnpin?: Maybe<MetafieldDefinitionUnpinPayload>

  metafieldDefinitionUpdate?: Maybe<MetafieldDefinitionUpdatePayload>

  metafieldDelete?: Maybe<MetafieldDeletePayload>
  /**
   * Creates a `MetafieldStorefrontVisibility` record to make all metafields that belong to the specified resource
   * and have the established `namespace` and `key` combination visible in the Storefront API.
   *
   * @deprecated This mutation will be removed in a future version. Use the `metafieldDefinitionCreate` or `metafieldDefinitionUpdate` mutations with `access.storefront` set instead.
   *
   */
  metafieldStorefrontVisibilityCreate?: Maybe<MetafieldStorefrontVisibilityCreatePayload>
  /**
   * Deletes a `MetafieldStorefrontVisibility` record. All metafields that belongs to the specified record will no
   * longer be visible in the Storefront API.
   *
   * @deprecated This mutation will be removed in a future version. Use the `metafieldDefinitionUpdate` mutation with `access.storefront` set instead.
   *
   */
  metafieldStorefrontVisibilityDelete?: Maybe<MetafieldStorefrontVisibilityDeletePayload>

  metafieldsSet?: Maybe<MetafieldsSetPayload>

  metaobjectBulkDelete?: Maybe<MetaobjectBulkDeletePayload>

  metaobjectCreate?: Maybe<MetaobjectCreatePayload>

  metaobjectDefinitionCreate?: Maybe<MetaobjectDefinitionCreatePayload>

  metaobjectDefinitionDelete?: Maybe<MetaobjectDefinitionDeletePayload>

  metaobjectDefinitionUpdate?: Maybe<MetaobjectDefinitionUpdatePayload>

  metaobjectDelete?: Maybe<MetaobjectDeletePayload>

  metaobjectUpdate?: Maybe<MetaobjectUpdatePayload>

  metaobjectUpsert?: Maybe<MetaobjectUpsertPayload>

  orderCancel?: Maybe<OrderCancelPayload>

  orderCapture?: Maybe<OrderCapturePayload>

  orderClose?: Maybe<OrderClosePayload>

  orderCreateMandatePayment?: Maybe<OrderCreateMandatePaymentPayload>

  orderEditAddCustomItem?: Maybe<OrderEditAddCustomItemPayload>

  orderEditAddLineItemDiscount?: Maybe<OrderEditAddLineItemDiscountPayload>

  orderEditAddVariant?: Maybe<OrderEditAddVariantPayload>

  orderEditBegin?: Maybe<OrderEditBeginPayload>

  orderEditCommit?: Maybe<OrderEditCommitPayload>

  orderEditRemoveDiscount?: Maybe<OrderEditRemoveDiscountPayload>
  /**
   * Removes a line item discount that was applied as part of an order edit.
   * @deprecated Use generic OrderEditRemoveDiscount mutation instead.
   */
  orderEditRemoveLineItemDiscount?: Maybe<OrderEditRemoveLineItemDiscountPayload>

  orderEditSetQuantity?: Maybe<OrderEditSetQuantityPayload>

  orderEditUpdateDiscount?: Maybe<OrderEditUpdateDiscountPayload>

  orderInvoiceSend?: Maybe<OrderInvoiceSendPayload>

  orderMarkAsPaid?: Maybe<OrderMarkAsPaidPayload>

  orderOpen?: Maybe<OrderOpenPayload>

  orderUpdate?: Maybe<OrderUpdatePayload>

  paymentCustomizationActivation?: Maybe<PaymentCustomizationActivationPayload>

  paymentCustomizationCreate?: Maybe<PaymentCustomizationCreatePayload>

  paymentCustomizationDelete?: Maybe<PaymentCustomizationDeletePayload>

  paymentCustomizationUpdate?: Maybe<PaymentCustomizationUpdatePayload>

  paymentReminderSend?: Maybe<PaymentReminderSendPayload>

  paymentTermsCreate?: Maybe<PaymentTermsCreatePayload>

  paymentTermsDelete?: Maybe<PaymentTermsDeletePayload>

  paymentTermsUpdate?: Maybe<PaymentTermsUpdatePayload>

  priceListCreate?: Maybe<PriceListCreatePayload>

  priceListDelete?: Maybe<PriceListDeletePayload>

  priceListFixedPricesAdd?: Maybe<PriceListFixedPricesAddPayload>

  priceListFixedPricesByProductUpdate?: Maybe<PriceListFixedPricesByProductUpdatePayload>

  priceListFixedPricesDelete?: Maybe<PriceListFixedPricesDeletePayload>

  priceListFixedPricesUpdate?: Maybe<PriceListFixedPricesUpdatePayload>

  priceListUpdate?: Maybe<PriceListUpdatePayload>
  /**
   * Activate a price rule.
   * @deprecated Use `discountCodeActivate` instead.
   */
  priceRuleActivate?: Maybe<PriceRuleActivatePayload>
  /**
   * Create a price rule using the input.
   * @deprecated Use `discountCodeBasicCreate` instead.
   */
  priceRuleCreate?: Maybe<PriceRuleCreatePayload>
  /**
   * Deactivate a price rule.
   * @deprecated Use `discountCodeDeactivate` instead.
   */
  priceRuleDeactivate?: Maybe<PriceRuleDeactivatePayload>
  /**
   * Delete a price rule.
   * @deprecated Use `discountCodeDelete` instead.
   */
  priceRuleDelete?: Maybe<PriceRuleDeletePayload>
  /**
   * Create a discount code for a price rule.
   * @deprecated Use `discountRedeemCodeBulkAdd` instead.
   */
  priceRuleDiscountCodeCreate?: Maybe<PriceRuleDiscountCodeCreatePayload>
  /**
   * Update a discount code for a price rule.
   * @deprecated Use `discountCodeBasicUpdate` instead.
   */
  priceRuleDiscountCodeUpdate?: Maybe<PriceRuleDiscountCodeUpdatePayload>
  /**
   * Updates a price rule using its ID and an input.
   * @deprecated Use `discountCodeBasicUpdate` instead.
   */
  priceRuleUpdate?: Maybe<PriceRuleUpdatePayload>
  /**
   * Deletes a private metafield.
   * Private metafields are automatically deleted when the app that created them is uninstalled.
   *
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafieldDelete?: Maybe<PrivateMetafieldDeletePayload>
  /**
   * Creates or updates a private metafield. Use private metafields when you don't want the metafield data to be accessible by merchants or other apps.
   * Private metafields are accessible only by the application that created them and only from the GraphQL Admin API.
   *
   * An application can create a maximum of 10 private metafields per shop resource.
   *
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafieldUpsert?: Maybe<PrivateMetafieldUpsertPayload>
  /**
   * Appends images to a product.
   * @deprecated Use `productCreateMedia` instead.
   */
  productAppendImages?: Maybe<ProductAppendImagesPayload>

  productChangeStatus?: Maybe<ProductChangeStatusPayload>

  productCreate?: Maybe<ProductCreatePayload>

  productCreateMedia?: Maybe<ProductCreateMediaPayload>

  productDelete?: Maybe<ProductDeletePayload>

  productDeleteAsync?: Maybe<ProductDeleteAsyncPayload>
  /**
   * Removes product images from the product.
   * @deprecated Use `productDeleteMedia` instead.
   */
  productDeleteImages?: Maybe<ProductDeleteImagesPayload>

  productDeleteMedia?: Maybe<ProductDeleteMediaPayload>

  productDuplicate?: Maybe<ProductDuplicatePayload>
  /**
   * Asynchronously duplicate a single product.
   *
   * @deprecated Use `productDuplicateAsyncV2` instead.
   */
  productDuplicateAsync?: Maybe<ProductDuplicateAsyncPayload>

  productDuplicateAsyncV2?: Maybe<ProductDuplicateAsyncV2Payload>

  productFeedCreate?: Maybe<ProductFeedCreatePayload>

  productFeedDelete?: Maybe<ProductFeedDeletePayload>

  productFullSync?: Maybe<ProductFullSyncPayload>
  /**
   * Updates an image of a product.
   * @deprecated Use `productUpdateMedia` instead.
   */
  productImageUpdate?: Maybe<ProductImageUpdatePayload>

  productJoinSellingPlanGroups?: Maybe<ProductJoinSellingPlanGroupsPayload>

  productLeaveSellingPlanGroups?: Maybe<ProductLeaveSellingPlanGroupsPayload>
  /**
   * Publishes a product. Products that are sold exclusively on subscription (`requiresSellingPlan: true`) can only be published on online stores.
   * @deprecated Use `publishablePublish` instead.
   */
  productPublish?: Maybe<ProductPublishPayload>
  /**
   * Asynchronously reorders a set of images for a given product.
   * @deprecated Use `productReorderMedia` instead.
   */
  productReorderImages?: Maybe<ProductReorderImagesPayload>

  productReorderMedia?: Maybe<ProductReorderMediaPayload>
  /**
   * Unpublishes a product.
   * @deprecated Use `publishableUnpublish` instead.
   */
  productUnpublish?: Maybe<ProductUnpublishPayload>

  productUpdate?: Maybe<ProductUpdatePayload>

  productUpdateMedia?: Maybe<ProductUpdateMediaPayload>

  productVariantAppendMedia?: Maybe<ProductVariantAppendMediaPayload>

  productVariantCreate?: Maybe<ProductVariantCreatePayload>

  productVariantDelete?: Maybe<ProductVariantDeletePayload>

  productVariantDetachMedia?: Maybe<ProductVariantDetachMediaPayload>

  productVariantJoinSellingPlanGroups?: Maybe<ProductVariantJoinSellingPlanGroupsPayload>

  productVariantLeaveSellingPlanGroups?: Maybe<ProductVariantLeaveSellingPlanGroupsPayload>

  productVariantRelationshipBulkUpdate?: Maybe<ProductVariantRelationshipBulkUpdatePayload>

  productVariantUpdate?: Maybe<ProductVariantUpdatePayload>

  productVariantsBulkCreate?: Maybe<ProductVariantsBulkCreatePayload>

  productVariantsBulkDelete?: Maybe<ProductVariantsBulkDeletePayload>

  productVariantsBulkReorder?: Maybe<ProductVariantsBulkReorderPayload>

  productVariantsBulkUpdate?: Maybe<ProductVariantsBulkUpdatePayload>

  pubSubServerPixelUpdate?: Maybe<PubSubServerPixelUpdatePayload>

  pubSubWebhookSubscriptionCreate?: Maybe<PubSubWebhookSubscriptionCreatePayload>

  pubSubWebhookSubscriptionUpdate?: Maybe<PubSubWebhookSubscriptionUpdatePayload>

  publicationCreate?: Maybe<PublicationCreatePayload>

  publicationDelete?: Maybe<PublicationDeletePayload>

  publicationUpdate?: Maybe<PublicationUpdatePayload>

  publishablePublish?: Maybe<PublishablePublishPayload>

  publishablePublishToCurrentChannel?: Maybe<PublishablePublishToCurrentChannelPayload>

  publishableUnpublish?: Maybe<PublishableUnpublishPayload>

  publishableUnpublishToCurrentChannel?: Maybe<PublishableUnpublishToCurrentChannelPayload>

  quantityPricingByVariantUpdate?: Maybe<QuantityPricingByVariantUpdatePayload>

  quantityRulesAdd?: Maybe<QuantityRulesAddPayload>

  quantityRulesDelete?: Maybe<QuantityRulesDeletePayload>

  refundCreate?: Maybe<RefundCreatePayload>

  returnApproveRequest?: Maybe<ReturnApproveRequestPayload>

  returnCancel?: Maybe<ReturnCancelPayload>

  returnClose?: Maybe<ReturnClosePayload>

  returnCreate?: Maybe<ReturnCreatePayload>

  returnDeclineRequest?: Maybe<ReturnDeclineRequestPayload>

  returnRefund?: Maybe<ReturnRefundPayload>

  returnReopen?: Maybe<ReturnReopenPayload>

  returnRequest?: Maybe<ReturnRequestPayload>

  reverseDeliveryCreateWithShipping?: Maybe<ReverseDeliveryCreateWithShippingPayload>
  /**
   * Disposes reverse delivery line items for a reverse delivery on the same shop.
   *
   * @deprecated `reverseDeliveryDispose` will be removed in API version 2025-01. Use `reverseFulfillmentOrderDispose` instead.
   */
  reverseDeliveryDispose?: Maybe<ReverseDeliveryDisposePayload>

  reverseDeliveryShippingUpdate?: Maybe<ReverseDeliveryShippingUpdatePayload>

  reverseFulfillmentOrderDispose?: Maybe<ReverseFulfillmentOrderDisposePayload>

  savedSearchCreate?: Maybe<SavedSearchCreatePayload>

  savedSearchDelete?: Maybe<SavedSearchDeletePayload>

  savedSearchUpdate?: Maybe<SavedSearchUpdatePayload>

  scriptTagCreate?: Maybe<ScriptTagCreatePayload>

  scriptTagDelete?: Maybe<ScriptTagDeletePayload>

  scriptTagUpdate?: Maybe<ScriptTagUpdatePayload>

  segmentCreate?: Maybe<SegmentCreatePayload>

  segmentDelete?: Maybe<SegmentDeletePayload>

  segmentUpdate?: Maybe<SegmentUpdatePayload>

  sellingPlanGroupAddProductVariants?: Maybe<SellingPlanGroupAddProductVariantsPayload>

  sellingPlanGroupAddProducts?: Maybe<SellingPlanGroupAddProductsPayload>

  sellingPlanGroupCreate?: Maybe<SellingPlanGroupCreatePayload>

  sellingPlanGroupDelete?: Maybe<SellingPlanGroupDeletePayload>

  sellingPlanGroupRemoveProductVariants?: Maybe<SellingPlanGroupRemoveProductVariantsPayload>

  sellingPlanGroupRemoveProducts?: Maybe<SellingPlanGroupRemoveProductsPayload>

  sellingPlanGroupUpdate?: Maybe<SellingPlanGroupUpdatePayload>

  serverPixelCreate?: Maybe<ServerPixelCreatePayload>

  serverPixelDelete?: Maybe<ServerPixelDeletePayload>

  shippingPackageDelete?: Maybe<ShippingPackageDeletePayload>

  shippingPackageMakeDefault?: Maybe<ShippingPackageMakeDefaultPayload>

  shippingPackageUpdate?: Maybe<ShippingPackageUpdatePayload>

  shopLocaleDisable?: Maybe<ShopLocaleDisablePayload>

  shopLocaleEnable?: Maybe<ShopLocaleEnablePayload>

  shopLocaleUpdate?: Maybe<ShopLocaleUpdatePayload>

  shopPolicyUpdate?: Maybe<ShopPolicyUpdatePayload>

  shopResourceFeedbackCreate?: Maybe<ShopResourceFeedbackCreatePayload>
  /**
   * Generates the URL and signed paramaters needed to upload an asset to Shopify.
   * @deprecated Use `stagedUploadsCreate` instead.
   */
  stagedUploadTargetGenerate?: Maybe<StagedUploadTargetGeneratePayload>
  /**
   * Uploads multiple images.
   * @deprecated Use `stagedUploadsCreate` instead.
   */
  stagedUploadTargetsGenerate?: Maybe<StagedUploadTargetsGeneratePayload>

  stagedUploadsCreate?: Maybe<StagedUploadsCreatePayload>

  standardMetafieldDefinitionEnable?: Maybe<StandardMetafieldDefinitionEnablePayload>

  standardMetaobjectDefinitionEnable?: Maybe<StandardMetaobjectDefinitionEnablePayload>

  storefrontAccessTokenCreate?: Maybe<StorefrontAccessTokenCreatePayload>

  storefrontAccessTokenDelete?: Maybe<StorefrontAccessTokenDeletePayload>

  subscriptionBillingAttemptCreate?: Maybe<SubscriptionBillingAttemptCreatePayload>

  subscriptionBillingCycleContractDraftCommit?: Maybe<SubscriptionBillingCycleContractDraftCommitPayload>

  subscriptionBillingCycleContractDraftConcatenate?: Maybe<SubscriptionBillingCycleContractDraftConcatenatePayload>

  subscriptionBillingCycleContractEdit?: Maybe<SubscriptionBillingCycleContractEditPayload>

  subscriptionBillingCycleEditDelete?: Maybe<SubscriptionBillingCycleEditDeletePayload>

  subscriptionBillingCycleEditsDelete?: Maybe<SubscriptionBillingCycleEditsDeletePayload>

  subscriptionBillingCycleScheduleEdit?: Maybe<SubscriptionBillingCycleScheduleEditPayload>

  subscriptionBillingCycleSkip?: Maybe<SubscriptionBillingCycleSkipPayload>

  subscriptionBillingCycleUnskip?: Maybe<SubscriptionBillingCycleUnskipPayload>

  subscriptionContractActivate?: Maybe<SubscriptionContractActivatePayload>

  subscriptionContractAtomicCreate?: Maybe<SubscriptionContractAtomicCreatePayload>

  subscriptionContractCancel?: Maybe<SubscriptionContractCancelPayload>

  subscriptionContractCreate?: Maybe<SubscriptionContractCreatePayload>

  subscriptionContractExpire?: Maybe<SubscriptionContractExpirePayload>

  subscriptionContractFail?: Maybe<SubscriptionContractFailPayload>

  subscriptionContractPause?: Maybe<SubscriptionContractPausePayload>

  subscriptionContractProductChange?: Maybe<SubscriptionContractProductChangePayload>

  subscriptionContractSetNextBillingDate?: Maybe<SubscriptionContractSetNextBillingDatePayload>

  subscriptionContractUpdate?: Maybe<SubscriptionContractUpdatePayload>

  subscriptionDraftCommit?: Maybe<SubscriptionDraftCommitPayload>

  subscriptionDraftDiscountAdd?: Maybe<SubscriptionDraftDiscountAddPayload>

  subscriptionDraftDiscountCodeApply?: Maybe<SubscriptionDraftDiscountCodeApplyPayload>

  subscriptionDraftDiscountRemove?: Maybe<SubscriptionDraftDiscountRemovePayload>

  subscriptionDraftDiscountUpdate?: Maybe<SubscriptionDraftDiscountUpdatePayload>

  subscriptionDraftFreeShippingDiscountAdd?: Maybe<SubscriptionDraftFreeShippingDiscountAddPayload>

  subscriptionDraftFreeShippingDiscountUpdate?: Maybe<SubscriptionDraftFreeShippingDiscountUpdatePayload>

  subscriptionDraftLineAdd?: Maybe<SubscriptionDraftLineAddPayload>

  subscriptionDraftLineRemove?: Maybe<SubscriptionDraftLineRemovePayload>

  subscriptionDraftLineUpdate?: Maybe<SubscriptionDraftLineUpdatePayload>

  subscriptionDraftUpdate?: Maybe<SubscriptionDraftUpdatePayload>

  tagsAdd?: Maybe<TagsAddPayload>

  tagsRemove?: Maybe<TagsRemovePayload>

  taxAppConfigure?: Maybe<TaxAppConfigurePayload>

  translationsRegister?: Maybe<TranslationsRegisterPayload>

  translationsRemove?: Maybe<TranslationsRemovePayload>

  urlRedirectBulkDeleteAll?: Maybe<UrlRedirectBulkDeleteAllPayload>

  urlRedirectBulkDeleteByIds?: Maybe<UrlRedirectBulkDeleteByIdsPayload>

  urlRedirectBulkDeleteBySavedSearch?: Maybe<UrlRedirectBulkDeleteBySavedSearchPayload>

  urlRedirectBulkDeleteBySearch?: Maybe<UrlRedirectBulkDeleteBySearchPayload>

  urlRedirectCreate?: Maybe<UrlRedirectCreatePayload>

  urlRedirectDelete?: Maybe<UrlRedirectDeletePayload>

  urlRedirectImportCreate?: Maybe<UrlRedirectImportCreatePayload>

  urlRedirectImportSubmit?: Maybe<UrlRedirectImportSubmitPayload>

  urlRedirectUpdate?: Maybe<UrlRedirectUpdatePayload>

  validationCreate?: Maybe<ValidationCreatePayload>

  validationDelete?: Maybe<ValidationDeletePayload>

  validationUpdate?: Maybe<ValidationUpdatePayload>

  webPixelCreate?: Maybe<WebPixelCreatePayload>

  webPixelDelete?: Maybe<WebPixelDeletePayload>

  webPixelUpdate?: Maybe<WebPixelUpdatePayload>

  webhookSubscriptionCreate?: Maybe<WebhookSubscriptionCreatePayload>

  webhookSubscriptionDelete?: Maybe<WebhookSubscriptionDeletePayload>

  webhookSubscriptionUpdate?: Maybe<WebhookSubscriptionUpdatePayload>
}

export type MutationAbandonmentEmailStateUpdateArgs = {
  emailSentAt?: InputMaybe<Scalars["DateTime"]["input"]>
  emailState: AbandonmentEmailState
  emailStateChangeReason?: InputMaybe<Scalars["String"]["input"]>
  id: Scalars["ID"]["input"]
}

export type MutationAbandonmentUpdateActivitiesDeliveryStatusesArgs = {
  abandonmentId: Scalars["ID"]["input"]
  deliveredAt?: InputMaybe<Scalars["DateTime"]["input"]>
  deliveryStatus: AbandonmentDeliveryState
  deliveryStatusChangeReason?: InputMaybe<Scalars["String"]["input"]>
  marketingActivityId: Scalars["ID"]["input"]
}

export type MutationAppPurchaseOneTimeCreateArgs = {
  name: Scalars["String"]["input"]
  price: MoneyInput
  returnUrl: Scalars["URL"]["input"]
  test?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationAppSubscriptionCancelArgs = {
  id: Scalars["ID"]["input"]
  prorate?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationAppSubscriptionCreateArgs = {
  lineItems: Array<AppSubscriptionLineItemInput>
  name: Scalars["String"]["input"]
  replacementBehavior?: InputMaybe<AppSubscriptionReplacementBehavior>
  returnUrl: Scalars["URL"]["input"]
  test?: InputMaybe<Scalars["Boolean"]["input"]>
  trialDays?: InputMaybe<Scalars["Int"]["input"]>
}

export type MutationAppSubscriptionLineItemUpdateArgs = {
  cappedAmount: MoneyInput
  id: Scalars["ID"]["input"]
}

export type MutationAppSubscriptionTrialExtendArgs = {
  days: Scalars["Int"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationAppUsageRecordCreateArgs = {
  description: Scalars["String"]["input"]
  idempotencyKey?: InputMaybe<Scalars["String"]["input"]>
  price: MoneyInput
  subscriptionLineItemId: Scalars["ID"]["input"]
}

export type MutationBulkOperationCancelArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationBulkOperationRunMutationArgs = {
  clientIdentifier?: InputMaybe<Scalars["String"]["input"]>
  mutation: Scalars["String"]["input"]
  stagedUploadPath: Scalars["String"]["input"]
}

export type MutationBulkOperationRunQueryArgs = {
  query: Scalars["String"]["input"]
}

export type MutationBulkProductResourceFeedbackCreateArgs = {
  feedbackInput: Array<ProductResourceFeedbackInput>
}

export type MutationCartTransformCreateArgs = {
  blockOnFailure?: InputMaybe<Scalars["Boolean"]["input"]>
  functionId: Scalars["String"]["input"]
}

export type MutationCartTransformDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationCatalogContextUpdateArgs = {
  catalogId: Scalars["ID"]["input"]
  contextsToAdd?: InputMaybe<CatalogContextInput>
  contextsToRemove?: InputMaybe<CatalogContextInput>
}

export type MutationCatalogCreateArgs = {
  input: CatalogCreateInput
}

export type MutationCatalogDeleteArgs = {
  deleteDependentResources?: InputMaybe<Scalars["Boolean"]["input"]>
  id: Scalars["ID"]["input"]
}

export type MutationCatalogUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: CatalogUpdateInput
}

export type MutationCheckoutBrandingUpsertArgs = {
  checkoutBrandingInput?: InputMaybe<CheckoutBrandingInput>
  checkoutProfileId: Scalars["ID"]["input"]
}

export type MutationCollectionAddProductsArgs = {
  id: Scalars["ID"]["input"]
  productIds: Array<Scalars["ID"]["input"]>
}

export type MutationCollectionAddProductsV2Args = {
  id: Scalars["ID"]["input"]
  productIds: Array<Scalars["ID"]["input"]>
}

export type MutationCollectionCreateArgs = {
  input: CollectionInput
}

export type MutationCollectionDeleteArgs = {
  input: CollectionDeleteInput
}

export type MutationCollectionPublishArgs = {
  input: CollectionPublishInput
}

export type MutationCollectionRemoveProductsArgs = {
  id: Scalars["ID"]["input"]
  productIds: Array<Scalars["ID"]["input"]>
}

export type MutationCollectionReorderProductsArgs = {
  id: Scalars["ID"]["input"]
  moves: Array<MoveInput>
}

export type MutationCollectionUnpublishArgs = {
  input: CollectionUnpublishInput
}

export type MutationCollectionUpdateArgs = {
  input: CollectionInput
}

export type MutationCompaniesDeleteArgs = {
  companyIds: Array<Scalars["ID"]["input"]>
}

export type MutationCompanyAddressDeleteArgs = {
  addressId: Scalars["ID"]["input"]
}

export type MutationCompanyAssignCustomerAsContactArgs = {
  companyId: Scalars["ID"]["input"]
  customerId: Scalars["ID"]["input"]
}

export type MutationCompanyAssignMainContactArgs = {
  companyContactId: Scalars["ID"]["input"]
  companyId: Scalars["ID"]["input"]
}

export type MutationCompanyContactAssignRoleArgs = {
  companyContactId: Scalars["ID"]["input"]
  companyContactRoleId: Scalars["ID"]["input"]
  companyLocationId: Scalars["ID"]["input"]
}

export type MutationCompanyContactAssignRolesArgs = {
  companyContactId: Scalars["ID"]["input"]
  rolesToAssign: Array<CompanyContactRoleAssign>
}

export type MutationCompanyContactCreateArgs = {
  companyId: Scalars["ID"]["input"]
  input: CompanyContactInput
}

export type MutationCompanyContactDeleteArgs = {
  companyContactId: Scalars["ID"]["input"]
}

export type MutationCompanyContactRemoveFromCompanyArgs = {
  companyContactId: Scalars["ID"]["input"]
}

export type MutationCompanyContactRevokeRoleArgs = {
  companyContactId: Scalars["ID"]["input"]
  companyContactRoleAssignmentId: Scalars["ID"]["input"]
}

export type MutationCompanyContactRevokeRolesArgs = {
  companyContactId: Scalars["ID"]["input"]
  revokeAll?: InputMaybe<Scalars["Boolean"]["input"]>
  roleAssignmentIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type MutationCompanyContactSendWelcomeEmailArgs = {
  companyContactId: Scalars["ID"]["input"]
  email?: InputMaybe<EmailInput>
}

export type MutationCompanyContactUpdateArgs = {
  companyContactId: Scalars["ID"]["input"]
  input: CompanyContactInput
}

export type MutationCompanyContactsDeleteArgs = {
  companyContactIds: Array<Scalars["ID"]["input"]>
}

export type MutationCompanyCreateArgs = {
  input: CompanyCreateInput
}

export type MutationCompanyDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationCompanyLocationAssignAddressArgs = {
  address: CompanyAddressInput
  addressTypes: Array<CompanyAddressType>
  locationId: Scalars["ID"]["input"]
}

export type MutationCompanyLocationAssignRolesArgs = {
  companyLocationId: Scalars["ID"]["input"]
  rolesToAssign: Array<CompanyLocationRoleAssign>
}

export type MutationCompanyLocationAssignTaxExemptionsArgs = {
  companyLocationId: Scalars["ID"]["input"]
  taxExemptions: Array<TaxExemption>
}

export type MutationCompanyLocationCreateArgs = {
  companyId: Scalars["ID"]["input"]
  input: CompanyLocationInput
}

export type MutationCompanyLocationCreateTaxRegistrationArgs = {
  locationId: Scalars["ID"]["input"]
  taxId: Scalars["String"]["input"]
}

export type MutationCompanyLocationDeleteArgs = {
  companyLocationId: Scalars["ID"]["input"]
}

export type MutationCompanyLocationRevokeRolesArgs = {
  companyLocationId: Scalars["ID"]["input"]
  rolesToRevoke: Array<Scalars["ID"]["input"]>
}

export type MutationCompanyLocationRevokeTaxExemptionsArgs = {
  companyLocationId: Scalars["ID"]["input"]
  taxExemptions: Array<TaxExemption>
}

export type MutationCompanyLocationRevokeTaxRegistrationArgs = {
  companyLocationId: Scalars["ID"]["input"]
}

export type MutationCompanyLocationUpdateArgs = {
  companyLocationId: Scalars["ID"]["input"]
  input: CompanyLocationUpdateInput
}

export type MutationCompanyLocationsDeleteArgs = {
  companyLocationIds: Array<Scalars["ID"]["input"]>
}

export type MutationCompanyRevokeMainContactArgs = {
  companyId: Scalars["ID"]["input"]
}

export type MutationCompanyUpdateArgs = {
  companyId: Scalars["ID"]["input"]
  input: CompanyInput
}

export type MutationCustomerAddTaxExemptionsArgs = {
  customerId: Scalars["ID"]["input"]
  taxExemptions: Array<TaxExemption>
}

export type MutationCustomerCancelDataErasureArgs = {
  customerId: Scalars["ID"]["input"]
}

export type MutationCustomerCreateArgs = {
  input: CustomerInput
}

export type MutationCustomerDeleteArgs = {
  input: CustomerDeleteInput
}

export type MutationCustomerEmailMarketingConsentUpdateArgs = {
  input: CustomerEmailMarketingConsentUpdateInput
}

export type MutationCustomerGenerateAccountActivationUrlArgs = {
  customerId: Scalars["ID"]["input"]
}

export type MutationCustomerMergeArgs = {
  customerOneId: Scalars["ID"]["input"]
  customerTwoId: Scalars["ID"]["input"]
  overrideFields?: InputMaybe<CustomerMergeOverrideFields>
}

export type MutationCustomerPaymentMethodCreateFromDuplicationDataArgs = {
  billingAddress: MailingAddressInput
  customerId: Scalars["ID"]["input"]
  encryptedDuplicationData: Scalars["String"]["input"]
}

export type MutationCustomerPaymentMethodCreditCardCreateArgs = {
  billingAddress: MailingAddressInput
  customerId: Scalars["ID"]["input"]
  sessionId: Scalars["String"]["input"]
}

export type MutationCustomerPaymentMethodCreditCardUpdateArgs = {
  billingAddress: MailingAddressInput
  id: Scalars["ID"]["input"]
  sessionId: Scalars["String"]["input"]
}

export type MutationCustomerPaymentMethodGetDuplicationDataArgs = {
  customerPaymentMethodId: Scalars["ID"]["input"]
  targetCustomerId: Scalars["ID"]["input"]
  targetShopId: Scalars["ID"]["input"]
}

export type MutationCustomerPaymentMethodGetUpdateUrlArgs = {
  customerPaymentMethodId: Scalars["ID"]["input"]
}

export type MutationCustomerPaymentMethodPaypalBillingAgreementCreateArgs = {
  billingAddress?: InputMaybe<MailingAddressInput>
  billingAgreementId: Scalars["String"]["input"]
  customerId: Scalars["ID"]["input"]
  inactive?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationCustomerPaymentMethodPaypalBillingAgreementUpdateArgs = {
  billingAddress: MailingAddressInput
  id: Scalars["ID"]["input"]
}

export type MutationCustomerPaymentMethodRemoteCreateArgs = {
  customerId: Scalars["ID"]["input"]
  remoteReference: CustomerPaymentMethodRemoteInput
}

export type MutationCustomerPaymentMethodRemoteCreditCardCreateArgs = {
  customerId: Scalars["ID"]["input"]
  stripeCustomerId: Scalars["String"]["input"]
  stripePaymentMethodId?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationCustomerPaymentMethodRevokeArgs = {
  customerPaymentMethodId: Scalars["ID"]["input"]
}

export type MutationCustomerPaymentMethodSendUpdateEmailArgs = {
  customerPaymentMethodId: Scalars["ID"]["input"]
  email?: InputMaybe<EmailInput>
}

export type MutationCustomerRemoveTaxExemptionsArgs = {
  customerId: Scalars["ID"]["input"]
  taxExemptions: Array<TaxExemption>
}

export type MutationCustomerReplaceTaxExemptionsArgs = {
  customerId: Scalars["ID"]["input"]
  taxExemptions: Array<TaxExemption>
}

export type MutationCustomerRequestDataErasureArgs = {
  customerId: Scalars["ID"]["input"]
}

export type MutationCustomerSegmentMembersQueryCreateArgs = {
  input: CustomerSegmentMembersQueryInput
}

export type MutationCustomerSmsMarketingConsentUpdateArgs = {
  input: CustomerSmsMarketingConsentUpdateInput
}

export type MutationCustomerUpdateArgs = {
  input: CustomerInput
}

export type MutationCustomerUpdateDefaultAddressArgs = {
  addressId: Scalars["ID"]["input"]
  customerId: Scalars["ID"]["input"]
}

export type MutationDelegateAccessTokenCreateArgs = {
  input: DelegateAccessTokenInput
}

export type MutationDelegateAccessTokenDestroyArgs = {
  accessToken: Scalars["String"]["input"]
}

export type MutationDeliveryCustomizationActivationArgs = {
  enabled: Scalars["Boolean"]["input"]
  ids: Array<Scalars["ID"]["input"]>
}

export type MutationDeliveryCustomizationCreateArgs = {
  deliveryCustomization: DeliveryCustomizationInput
}

export type MutationDeliveryCustomizationDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDeliveryCustomizationUpdateArgs = {
  deliveryCustomization: DeliveryCustomizationInput
  id: Scalars["ID"]["input"]
}

export type MutationDeliveryProfileCreateArgs = {
  profile: DeliveryProfileInput
}

export type MutationDeliveryProfileRemoveArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDeliveryProfileUpdateArgs = {
  id: Scalars["ID"]["input"]
  leaveLegacyModeProfiles?: InputMaybe<Scalars["Boolean"]["input"]>
  profile: DeliveryProfileInput
}

export type MutationDeliverySettingUpdateArgs = {
  setting: DeliverySettingInput
}

export type MutationDeliveryShippingOriginAssignArgs = {
  locationId: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticActivateArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticAppCreateArgs = {
  automaticAppDiscount: DiscountAutomaticAppInput
}

export type MutationDiscountAutomaticAppUpdateArgs = {
  automaticAppDiscount: DiscountAutomaticAppInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticBasicCreateArgs = {
  automaticBasicDiscount: DiscountAutomaticBasicInput
}

export type MutationDiscountAutomaticBasicUpdateArgs = {
  automaticBasicDiscount: DiscountAutomaticBasicInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticBulkDeleteArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDiscountAutomaticBxgyCreateArgs = {
  automaticBxgyDiscount: DiscountAutomaticBxgyInput
}

export type MutationDiscountAutomaticBxgyUpdateArgs = {
  automaticBxgyDiscount: DiscountAutomaticBxgyInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticDeactivateArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDiscountAutomaticFreeShippingCreateArgs = {
  freeShippingAutomaticDiscount: DiscountAutomaticFreeShippingInput
}

export type MutationDiscountAutomaticFreeShippingUpdateArgs = {
  freeShippingAutomaticDiscount: DiscountAutomaticFreeShippingInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeActivateArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeAppCreateArgs = {
  codeAppDiscount: DiscountCodeAppInput
}

export type MutationDiscountCodeAppUpdateArgs = {
  codeAppDiscount: DiscountCodeAppInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeBasicCreateArgs = {
  basicCodeDiscount: DiscountCodeBasicInput
}

export type MutationDiscountCodeBasicUpdateArgs = {
  basicCodeDiscount: DiscountCodeBasicInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeBulkActivateArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDiscountCodeBulkDeactivateArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDiscountCodeBulkDeleteArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDiscountCodeBxgyCreateArgs = {
  bxgyCodeDiscount: DiscountCodeBxgyInput
}

export type MutationDiscountCodeBxgyUpdateArgs = {
  bxgyCodeDiscount: DiscountCodeBxgyInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeDeactivateArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeFreeShippingCreateArgs = {
  freeShippingCodeDiscount: DiscountCodeFreeShippingInput
}

export type MutationDiscountCodeFreeShippingUpdateArgs = {
  freeShippingCodeDiscount: DiscountCodeFreeShippingInput
  id: Scalars["ID"]["input"]
}

export type MutationDiscountCodeRedeemCodeBulkDeleteArgs = {
  discountId: Scalars["ID"]["input"]
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDiscountRedeemCodeBulkAddArgs = {
  codes: Array<DiscountRedeemCodeInput>
  discountId: Scalars["ID"]["input"]
}

export type MutationDisputeEvidenceUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: ShopifyPaymentsDisputeEvidenceUpdateInput
}

export type MutationDraftOrderBulkAddTagsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
  tags: Array<Scalars["String"]["input"]>
}

export type MutationDraftOrderBulkDeleteArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDraftOrderBulkRemoveTagsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  search?: InputMaybe<Scalars["String"]["input"]>
  tags: Array<Scalars["String"]["input"]>
}

export type MutationDraftOrderCalculateArgs = {
  input: DraftOrderInput
}

export type MutationDraftOrderCompleteArgs = {
  id: Scalars["ID"]["input"]
  paymentGatewayId?: InputMaybe<Scalars["ID"]["input"]>
  paymentPending?: InputMaybe<Scalars["Boolean"]["input"]>
  sourceName?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationDraftOrderCreateArgs = {
  input: DraftOrderInput
}

export type MutationDraftOrderCreateFromOrderArgs = {
  orderId: Scalars["ID"]["input"]
}

export type MutationDraftOrderCreateMerchantCheckoutArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationDraftOrderDeleteArgs = {
  input: DraftOrderDeleteInput
}

export type MutationDraftOrderDuplicateArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type MutationDraftOrderInvoicePreviewArgs = {
  email?: InputMaybe<EmailInput>
  id: Scalars["ID"]["input"]
}

export type MutationDraftOrderInvoiceSendArgs = {
  email?: InputMaybe<EmailInput>
  id: Scalars["ID"]["input"]
}

export type MutationDraftOrderUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: DraftOrderInput
}

export type MutationEventBridgeServerPixelUpdateArgs = {
  arn: Scalars["ARN"]["input"]
}

export type MutationEventBridgeWebhookSubscriptionCreateArgs = {
  subTopic?: InputMaybe<Scalars["String"]["input"]>
  topic: WebhookSubscriptionTopic
  webhookSubscription: EventBridgeWebhookSubscriptionInput
}

export type MutationEventBridgeWebhookSubscriptionUpdateArgs = {
  id: Scalars["ID"]["input"]
  webhookSubscription: EventBridgeWebhookSubscriptionInput
}

export type MutationFileAcknowledgeUpdateFailedArgs = {
  fileIds: Array<Scalars["ID"]["input"]>
}

export type MutationFileCreateArgs = {
  files: Array<FileCreateInput>
}

export type MutationFileDeleteArgs = {
  fileIds: Array<Scalars["ID"]["input"]>
}

export type MutationFileUpdateArgs = {
  files: Array<FileUpdateInput>
}

export type MutationFlowGenerateSignatureArgs = {
  id: Scalars["ID"]["input"]
  payload: Scalars["String"]["input"]
}

export type MutationFlowTriggerReceiveArgs = {
  handle?: InputMaybe<Scalars["String"]["input"]>
  payload?: InputMaybe<Scalars["JSON"]["input"]>
}

export type MutationFulfillmentCancelArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentConstraintRuleCreateArgs = {
  functionId: Scalars["String"]["input"]
  metafields?: InputMaybe<Array<MetafieldInput>>
}

export type MutationFulfillmentConstraintRuleDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentCreateV2Args = {
  fulfillment: FulfillmentV2Input
  message?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentEventCreateArgs = {
  fulfillmentEvent: FulfillmentEventInput
}

export type MutationFulfillmentOrderAcceptCancellationRequestArgs = {
  id: Scalars["ID"]["input"]
  message?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentOrderAcceptFulfillmentRequestArgs = {
  id: Scalars["ID"]["input"]
  message?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentOrderCancelArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentOrderCloseArgs = {
  id: Scalars["ID"]["input"]
  message?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentOrderHoldArgs = {
  fulfillmentHold: FulfillmentOrderHoldInput
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentOrderLineItemsPreparedForPickupArgs = {
  input: FulfillmentOrderLineItemsPreparedForPickupInput
}

export type MutationFulfillmentOrderMergeArgs = {
  fulfillmentOrderMergeInputs: Array<FulfillmentOrderMergeInput>
}

export type MutationFulfillmentOrderMoveArgs = {
  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>
  id: Scalars["ID"]["input"]
  newLocationId: Scalars["ID"]["input"]
}

export type MutationFulfillmentOrderOpenArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentOrderRejectCancellationRequestArgs = {
  id: Scalars["ID"]["input"]
  message?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentOrderRejectFulfillmentRequestArgs = {
  id: Scalars["ID"]["input"]
  lineItems?: InputMaybe<Array<IncomingRequestLineItemInput>>
  message?: InputMaybe<Scalars["String"]["input"]>
  reason?: InputMaybe<FulfillmentOrderRejectionReason>
}

export type MutationFulfillmentOrderReleaseHoldArgs = {
  externalId?: InputMaybe<Scalars["String"]["input"]>
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentOrderRescheduleArgs = {
  fulfillAt: Scalars["DateTime"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentOrderSplitArgs = {
  fulfillmentOrderSplits: Array<FulfillmentOrderSplitInput>
}

export type MutationFulfillmentOrderSubmitCancellationRequestArgs = {
  id: Scalars["ID"]["input"]
  message?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentOrderSubmitFulfillmentRequestArgs = {
  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>
  id: Scalars["ID"]["input"]
  message?: InputMaybe<Scalars["String"]["input"]>
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
  shippingMethod?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationFulfillmentOrdersReleaseHoldsArgs = {
  externalId?: InputMaybe<Scalars["String"]["input"]>
  ids: Array<Scalars["ID"]["input"]>
}

export type MutationFulfillmentOrdersSetFulfillmentDeadlineArgs = {
  fulfillmentDeadline: Scalars["DateTime"]["input"]
  fulfillmentOrderIds: Array<Scalars["ID"]["input"]>
}

export type MutationFulfillmentServiceCreateArgs = {
  callbackUrl: Scalars["URL"]["input"]
  fulfillmentOrdersOptIn: Scalars["Boolean"]["input"]
  inventoryManagement?: InputMaybe<Scalars["Boolean"]["input"]>
  name: Scalars["String"]["input"]
  permitsSkuSharing?: InputMaybe<Scalars["Boolean"]["input"]>
  trackingSupport?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationFulfillmentServiceDeleteArgs = {
  destinationLocationId?: InputMaybe<Scalars["ID"]["input"]>
  id: Scalars["ID"]["input"]
}

export type MutationFulfillmentServiceUpdateArgs = {
  callbackUrl?: InputMaybe<Scalars["URL"]["input"]>
  id: Scalars["ID"]["input"]
  name?: InputMaybe<Scalars["String"]["input"]>
  permitsSkuSharing?: InputMaybe<Scalars["Boolean"]["input"]>
  trackingSupport?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationFulfillmentTrackingInfoUpdateV2Args = {
  fulfillmentId: Scalars["ID"]["input"]
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
  trackingInfoInput: FulfillmentTrackingInput
}

export type MutationGiftCardCreateArgs = {
  input: GiftCardCreateInput
}

export type MutationGiftCardDisableArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationGiftCardUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: GiftCardUpdateInput
}

export type MutationInventoryActivateArgs = {
  available?: InputMaybe<Scalars["Int"]["input"]>
  inventoryItemId: Scalars["ID"]["input"]
  locationId: Scalars["ID"]["input"]
  onHand?: InputMaybe<Scalars["Int"]["input"]>
}

export type MutationInventoryAdjustQuantitiesArgs = {
  input: InventoryAdjustQuantitiesInput
}

export type MutationInventoryAdjustQuantityArgs = {
  input: InventoryAdjustQuantityInput
}

export type MutationInventoryBulkAdjustQuantityAtLocationArgs = {
  inventoryItemAdjustments: Array<InventoryAdjustItemInput>
  locationId: Scalars["ID"]["input"]
}

export type MutationInventoryBulkToggleActivationArgs = {
  inventoryItemId: Scalars["ID"]["input"]
  inventoryItemUpdates: Array<InventoryBulkToggleActivationInput>
}

export type MutationInventoryDeactivateArgs = {
  inventoryLevelId: Scalars["ID"]["input"]
}

export type MutationInventoryItemUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: InventoryItemUpdateInput
}

export type MutationInventoryMoveQuantitiesArgs = {
  input: InventoryMoveQuantitiesInput
}

export type MutationInventorySetOnHandQuantitiesArgs = {
  input: InventorySetOnHandQuantitiesInput
}

export type MutationInventorySetScheduledChangesArgs = {
  input: InventorySetScheduledChangesInput
}

export type MutationLocationActivateArgs = {
  locationId: Scalars["ID"]["input"]
}

export type MutationLocationAddArgs = {
  input: LocationAddInput
}

export type MutationLocationDeactivateArgs = {
  destinationLocationId?: InputMaybe<Scalars["ID"]["input"]>
  locationId: Scalars["ID"]["input"]
}

export type MutationLocationDeleteArgs = {
  locationId: Scalars["ID"]["input"]
}

export type MutationLocationEditArgs = {
  id: Scalars["ID"]["input"]
  input: LocationEditInput
}

export type MutationLocationLocalPickupDisableArgs = {
  locationId: Scalars["ID"]["input"]
}

export type MutationLocationLocalPickupEnableArgs = {
  localPickupSettings: DeliveryLocationLocalPickupEnableInput
}

export type MutationMarketCreateArgs = {
  input: MarketCreateInput
}

export type MutationMarketCurrencySettingsUpdateArgs = {
  input: MarketCurrencySettingsUpdateInput
  marketId: Scalars["ID"]["input"]
}

export type MutationMarketDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationMarketLocalizationsRegisterArgs = {
  marketLocalizations: Array<MarketLocalizationRegisterInput>
  resourceId: Scalars["ID"]["input"]
}

export type MutationMarketLocalizationsRemoveArgs = {
  marketIds: Array<Scalars["ID"]["input"]>
  marketLocalizationKeys: Array<Scalars["String"]["input"]>
  resourceId: Scalars["ID"]["input"]
}

export type MutationMarketRegionDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationMarketRegionsCreateArgs = {
  marketId: Scalars["ID"]["input"]
  regions: Array<MarketRegionCreateInput>
}

export type MutationMarketRegionsDeleteArgs = {
  ids: Array<Scalars["ID"]["input"]>
}

export type MutationMarketUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: MarketUpdateInput
}

export type MutationMarketWebPresenceCreateArgs = {
  marketId: Scalars["ID"]["input"]
  webPresence: MarketWebPresenceCreateInput
}

export type MutationMarketWebPresenceDeleteArgs = {
  webPresenceId: Scalars["ID"]["input"]
}

export type MutationMarketWebPresenceUpdateArgs = {
  webPresence: MarketWebPresenceUpdateInput
  webPresenceId: Scalars["ID"]["input"]
}

export type MutationMarketingActivityCreateArgs = {
  input: MarketingActivityCreateInput
}

export type MutationMarketingActivityCreateExternalArgs = {
  input: MarketingActivityCreateExternalInput
}

export type MutationMarketingActivityDeleteExternalArgs = {
  marketingActivityId?: InputMaybe<Scalars["ID"]["input"]>
  remoteId?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationMarketingActivityUpdateArgs = {
  input: MarketingActivityUpdateInput
}

export type MutationMarketingActivityUpdateExternalArgs = {
  input: MarketingActivityUpdateExternalInput
  marketingActivityId?: InputMaybe<Scalars["ID"]["input"]>
  remoteId?: InputMaybe<Scalars["String"]["input"]>
  utm?: InputMaybe<UtmInput>
}

export type MutationMarketingActivityUpsertExternalArgs = {
  input: MarketingActivityUpsertExternalInput
}

export type MutationMarketingEngagementCreateArgs = {
  channelHandle?: InputMaybe<Scalars["String"]["input"]>
  marketingActivityId?: InputMaybe<Scalars["ID"]["input"]>
  marketingEngagement: MarketingEngagementInput
  remoteId?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationMarketingEngagementsDeleteArgs = {
  channelHandle?: InputMaybe<Scalars["String"]["input"]>
  deleteEngagementsForAllChannels?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationMetafieldDefinitionCreateArgs = {
  definition: MetafieldDefinitionInput
}

export type MutationMetafieldDefinitionDeleteArgs = {
  deleteAllAssociatedMetafields?: InputMaybe<Scalars["Boolean"]["input"]>
  id: Scalars["ID"]["input"]
}

export type MutationMetafieldDefinitionPinArgs = {
  definitionId: Scalars["ID"]["input"]
}

export type MutationMetafieldDefinitionUnpinArgs = {
  definitionId: Scalars["ID"]["input"]
}

export type MutationMetafieldDefinitionUpdateArgs = {
  definition: MetafieldDefinitionUpdateInput
}

export type MutationMetafieldDeleteArgs = {
  input: MetafieldDeleteInput
}

export type MutationMetafieldStorefrontVisibilityCreateArgs = {
  input: MetafieldStorefrontVisibilityInput
}

export type MutationMetafieldStorefrontVisibilityDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationMetafieldsSetArgs = {
  metafields: Array<MetafieldsSetInput>
}

export type MutationMetaobjectBulkDeleteArgs = {
  where: MetaobjectBulkDeleteWhereCondition
}

export type MutationMetaobjectCreateArgs = {
  metaobject: MetaobjectCreateInput
}

export type MutationMetaobjectDefinitionCreateArgs = {
  definition: MetaobjectDefinitionCreateInput
}

export type MutationMetaobjectDefinitionDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationMetaobjectDefinitionUpdateArgs = {
  definition: MetaobjectDefinitionUpdateInput
  id: Scalars["ID"]["input"]
}

export type MutationMetaobjectDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationMetaobjectUpdateArgs = {
  id: Scalars["ID"]["input"]
  metaobject: MetaobjectUpdateInput
}

export type MutationMetaobjectUpsertArgs = {
  handle: MetaobjectHandleInput
  metaobject: MetaobjectUpsertInput
}

export type MutationOrderCancelArgs = {
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
  orderId: Scalars["ID"]["input"]
  reason: OrderCancelReason
  refund: Scalars["Boolean"]["input"]
  restock: Scalars["Boolean"]["input"]
  staffNote?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationOrderCaptureArgs = {
  input: OrderCaptureInput
}

export type MutationOrderCloseArgs = {
  input: OrderCloseInput
}

export type MutationOrderCreateMandatePaymentArgs = {
  autoCapture?: InputMaybe<Scalars["Boolean"]["input"]>
  id: Scalars["ID"]["input"]
  idempotencyKey: Scalars["String"]["input"]
  mandateId: Scalars["ID"]["input"]
  paymentScheduleId?: InputMaybe<Scalars["ID"]["input"]>
}

export type MutationOrderEditAddCustomItemArgs = {
  id: Scalars["ID"]["input"]
  locationId?: InputMaybe<Scalars["ID"]["input"]>
  price: MoneyInput
  quantity: Scalars["Int"]["input"]
  requiresShipping?: InputMaybe<Scalars["Boolean"]["input"]>
  taxable?: InputMaybe<Scalars["Boolean"]["input"]>
  title: Scalars["String"]["input"]
}

export type MutationOrderEditAddLineItemDiscountArgs = {
  discount: OrderEditAppliedDiscountInput
  id: Scalars["ID"]["input"]
  lineItemId: Scalars["ID"]["input"]
}

export type MutationOrderEditAddVariantArgs = {
  allowDuplicates?: InputMaybe<Scalars["Boolean"]["input"]>
  id: Scalars["ID"]["input"]
  locationId?: InputMaybe<Scalars["ID"]["input"]>
  quantity: Scalars["Int"]["input"]
  variantId: Scalars["ID"]["input"]
}

export type MutationOrderEditBeginArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationOrderEditCommitArgs = {
  id: Scalars["ID"]["input"]
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
  staffNote?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationOrderEditRemoveDiscountArgs = {
  discountApplicationId: Scalars["ID"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationOrderEditRemoveLineItemDiscountArgs = {
  discountApplicationId: Scalars["ID"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationOrderEditSetQuantityArgs = {
  id: Scalars["ID"]["input"]
  lineItemId: Scalars["ID"]["input"]
  quantity: Scalars["Int"]["input"]
  restock?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationOrderEditUpdateDiscountArgs = {
  discount: OrderEditAppliedDiscountInput
  discountApplicationId: Scalars["ID"]["input"]
  id: Scalars["ID"]["input"]
}

export type MutationOrderInvoiceSendArgs = {
  email?: InputMaybe<EmailInput>
  id: Scalars["ID"]["input"]
}

export type MutationOrderMarkAsPaidArgs = {
  input: OrderMarkAsPaidInput
}

export type MutationOrderOpenArgs = {
  input: OrderOpenInput
}

export type MutationOrderUpdateArgs = {
  input: OrderInput
}

export type MutationPaymentCustomizationActivationArgs = {
  enabled: Scalars["Boolean"]["input"]
  ids: Array<Scalars["ID"]["input"]>
}

export type MutationPaymentCustomizationCreateArgs = {
  paymentCustomization: PaymentCustomizationInput
}

export type MutationPaymentCustomizationDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPaymentCustomizationUpdateArgs = {
  id: Scalars["ID"]["input"]
  paymentCustomization: PaymentCustomizationInput
}

export type MutationPaymentReminderSendArgs = {
  paymentScheduleId: Scalars["ID"]["input"]
}

export type MutationPaymentTermsCreateArgs = {
  paymentTermsAttributes: PaymentTermsCreateInput
  referenceId: Scalars["ID"]["input"]
}

export type MutationPaymentTermsDeleteArgs = {
  input: PaymentTermsDeleteInput
}

export type MutationPaymentTermsUpdateArgs = {
  input: PaymentTermsUpdateInput
}

export type MutationPriceListCreateArgs = {
  input: PriceListCreateInput
}

export type MutationPriceListDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPriceListFixedPricesAddArgs = {
  priceListId: Scalars["ID"]["input"]
  prices: Array<PriceListPriceInput>
}

export type MutationPriceListFixedPricesByProductUpdateArgs = {
  priceListId: Scalars["ID"]["input"]
  pricesToAdd?: InputMaybe<Array<PriceListProductPriceInput>>
  pricesToDeleteByProductIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type MutationPriceListFixedPricesDeleteArgs = {
  priceListId: Scalars["ID"]["input"]
  variantIds: Array<Scalars["ID"]["input"]>
}

export type MutationPriceListFixedPricesUpdateArgs = {
  priceListId: Scalars["ID"]["input"]
  pricesToAdd: Array<PriceListPriceInput>
  variantIdsToDelete: Array<Scalars["ID"]["input"]>
}

export type MutationPriceListUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: PriceListUpdateInput
}

export type MutationPriceRuleActivateArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPriceRuleCreateArgs = {
  priceRule: PriceRuleInput
  priceRuleDiscountCode?: InputMaybe<PriceRuleDiscountCodeInput>
}

export type MutationPriceRuleDeactivateArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPriceRuleDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPriceRuleDiscountCodeCreateArgs = {
  code: Scalars["String"]["input"]
  priceRuleId: Scalars["ID"]["input"]
}

export type MutationPriceRuleDiscountCodeUpdateArgs = {
  code: Scalars["String"]["input"]
  priceRuleId: Scalars["ID"]["input"]
}

export type MutationPriceRuleUpdateArgs = {
  id: Scalars["ID"]["input"]
  priceRule: PriceRuleInput
  priceRuleDiscountCode?: InputMaybe<PriceRuleDiscountCodeInput>
}

export type MutationPrivateMetafieldDeleteArgs = {
  input: PrivateMetafieldDeleteInput
}

export type MutationPrivateMetafieldUpsertArgs = {
  input: PrivateMetafieldInput
}

export type MutationProductAppendImagesArgs = {
  input: ProductAppendImagesInput
}

export type MutationProductChangeStatusArgs = {
  productId: Scalars["ID"]["input"]
  status: ProductStatus
}

export type MutationProductCreateArgs = {
  input: ProductInput
  media?: InputMaybe<Array<CreateMediaInput>>
}

export type MutationProductCreateMediaArgs = {
  media: Array<CreateMediaInput>
  productId: Scalars["ID"]["input"]
}

export type MutationProductDeleteArgs = {
  input: ProductDeleteInput
}

export type MutationProductDeleteAsyncArgs = {
  productId: Scalars["ID"]["input"]
}

export type MutationProductDeleteImagesArgs = {
  id: Scalars["ID"]["input"]
  imageIds: Array<Scalars["ID"]["input"]>
}

export type MutationProductDeleteMediaArgs = {
  mediaIds: Array<Scalars["ID"]["input"]>
  productId: Scalars["ID"]["input"]
}

export type MutationProductDuplicateArgs = {
  includeImages?: InputMaybe<Scalars["Boolean"]["input"]>
  includeTranslations?: InputMaybe<Scalars["Boolean"]["input"]>
  newStatus?: InputMaybe<ProductStatus>
  newTitle: Scalars["String"]["input"]
  productId: Scalars["ID"]["input"]
}

export type MutationProductDuplicateAsyncArgs = {
  input: ProductDuplicateAsyncInput
}

export type MutationProductDuplicateAsyncV2Args = {
  input: ProductDuplicateAsyncInput
}

export type MutationProductFeedCreateArgs = {
  input?: InputMaybe<ProductFeedInput>
}

export type MutationProductFeedDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationProductFullSyncArgs = {
  beforeUpdatedAt?: InputMaybe<Scalars["DateTime"]["input"]>
  id: Scalars["ID"]["input"]
  updatedAtSince?: InputMaybe<Scalars["DateTime"]["input"]>
}

export type MutationProductImageUpdateArgs = {
  image: ImageInput
  productId: Scalars["ID"]["input"]
}

export type MutationProductJoinSellingPlanGroupsArgs = {
  id: Scalars["ID"]["input"]
  sellingPlanGroupIds: Array<Scalars["ID"]["input"]>
}

export type MutationProductLeaveSellingPlanGroupsArgs = {
  id: Scalars["ID"]["input"]
  sellingPlanGroupIds: Array<Scalars["ID"]["input"]>
}

export type MutationProductPublishArgs = {
  input: ProductPublishInput
}

export type MutationProductReorderImagesArgs = {
  id: Scalars["ID"]["input"]
  moves: Array<MoveInput>
}

export type MutationProductReorderMediaArgs = {
  id: Scalars["ID"]["input"]
  moves: Array<MoveInput>
}

export type MutationProductUnpublishArgs = {
  input: ProductUnpublishInput
}

export type MutationProductUpdateArgs = {
  input: ProductInput
  media?: InputMaybe<Array<CreateMediaInput>>
}

export type MutationProductUpdateMediaArgs = {
  media: Array<UpdateMediaInput>
  productId: Scalars["ID"]["input"]
}

export type MutationProductVariantAppendMediaArgs = {
  productId: Scalars["ID"]["input"]
  variantMedia: Array<ProductVariantAppendMediaInput>
}

export type MutationProductVariantCreateArgs = {
  input: ProductVariantInput
}

export type MutationProductVariantDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationProductVariantDetachMediaArgs = {
  productId: Scalars["ID"]["input"]
  variantMedia: Array<ProductVariantDetachMediaInput>
}

export type MutationProductVariantJoinSellingPlanGroupsArgs = {
  id: Scalars["ID"]["input"]
  sellingPlanGroupIds: Array<Scalars["ID"]["input"]>
}

export type MutationProductVariantLeaveSellingPlanGroupsArgs = {
  id: Scalars["ID"]["input"]
  sellingPlanGroupIds: Array<Scalars["ID"]["input"]>
}

export type MutationProductVariantRelationshipBulkUpdateArgs = {
  input: Array<ProductVariantRelationshipUpdateInput>
}

export type MutationProductVariantUpdateArgs = {
  input: ProductVariantInput
}

export type MutationProductVariantsBulkCreateArgs = {
  media?: InputMaybe<Array<CreateMediaInput>>
  productId: Scalars["ID"]["input"]
  variants: Array<ProductVariantsBulkInput>
}

export type MutationProductVariantsBulkDeleteArgs = {
  productId: Scalars["ID"]["input"]
  variantsIds: Array<Scalars["ID"]["input"]>
}

export type MutationProductVariantsBulkReorderArgs = {
  positions: Array<ProductVariantPositionInput>
  productId: Scalars["ID"]["input"]
}

export type MutationProductVariantsBulkUpdateArgs = {
  allowPartialUpdates?: InputMaybe<Scalars["Boolean"]["input"]>
  media?: InputMaybe<Array<CreateMediaInput>>
  productId: Scalars["ID"]["input"]
  variants: Array<ProductVariantsBulkInput>
}

export type MutationPubSubServerPixelUpdateArgs = {
  pubSubProject: Scalars["String"]["input"]
  pubSubTopic: Scalars["String"]["input"]
}

export type MutationPubSubWebhookSubscriptionCreateArgs = {
  subTopic?: InputMaybe<Scalars["String"]["input"]>
  topic: WebhookSubscriptionTopic
  webhookSubscription: PubSubWebhookSubscriptionInput
}

export type MutationPubSubWebhookSubscriptionUpdateArgs = {
  id: Scalars["ID"]["input"]
  webhookSubscription?: InputMaybe<PubSubWebhookSubscriptionInput>
}

export type MutationPublicationCreateArgs = {
  input: PublicationCreateInput
}

export type MutationPublicationDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPublicationUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: PublicationUpdateInput
}

export type MutationPublishablePublishArgs = {
  id: Scalars["ID"]["input"]
  input: Array<PublicationInput>
}

export type MutationPublishablePublishToCurrentChannelArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPublishableUnpublishArgs = {
  id: Scalars["ID"]["input"]
  input: Array<PublicationInput>
}

export type MutationPublishableUnpublishToCurrentChannelArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationQuantityPricingByVariantUpdateArgs = {
  input: QuantityPricingByVariantUpdateInput
  priceListId: Scalars["ID"]["input"]
}

export type MutationQuantityRulesAddArgs = {
  priceListId: Scalars["ID"]["input"]
  quantityRules: Array<QuantityRuleInput>
}

export type MutationQuantityRulesDeleteArgs = {
  priceListId: Scalars["ID"]["input"]
  variantIds: Array<Scalars["ID"]["input"]>
}

export type MutationRefundCreateArgs = {
  input: RefundInput
}

export type MutationReturnApproveRequestArgs = {
  input: ReturnApproveRequestInput
}

export type MutationReturnCancelArgs = {
  id: Scalars["ID"]["input"]
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationReturnCloseArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationReturnCreateArgs = {
  returnInput: ReturnInput
}

export type MutationReturnDeclineRequestArgs = {
  input: ReturnDeclineRequestInput
}

export type MutationReturnRefundArgs = {
  returnRefundInput: ReturnRefundInput
}

export type MutationReturnReopenArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationReturnRequestArgs = {
  input: ReturnRequestInput
}

export type MutationReverseDeliveryCreateWithShippingArgs = {
  labelInput?: InputMaybe<ReverseDeliveryLabelInput>
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
  reverseDeliveryLineItems: Array<ReverseDeliveryLineItemInput>
  reverseFulfillmentOrderId: Scalars["ID"]["input"]
  trackingInput?: InputMaybe<ReverseDeliveryTrackingInput>
}

export type MutationReverseDeliveryDisposeArgs = {
  dispositionInputs: Array<ReverseDeliveryDisposeInput>
}

export type MutationReverseDeliveryShippingUpdateArgs = {
  labelInput?: InputMaybe<ReverseDeliveryLabelInput>
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>
  reverseDeliveryId: Scalars["ID"]["input"]
  trackingInput?: InputMaybe<ReverseDeliveryTrackingInput>
}

export type MutationReverseFulfillmentOrderDisposeArgs = {
  dispositionInputs: Array<ReverseFulfillmentOrderDisposeInput>
}

export type MutationSavedSearchCreateArgs = {
  input: SavedSearchCreateInput
}

export type MutationSavedSearchDeleteArgs = {
  input: SavedSearchDeleteInput
}

export type MutationSavedSearchUpdateArgs = {
  input: SavedSearchUpdateInput
}

export type MutationScriptTagCreateArgs = {
  input: ScriptTagInput
}

export type MutationScriptTagDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationScriptTagUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: ScriptTagInput
}

export type MutationSegmentCreateArgs = {
  name: Scalars["String"]["input"]
  query: Scalars["String"]["input"]
}

export type MutationSegmentDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationSegmentUpdateArgs = {
  id: Scalars["ID"]["input"]
  name?: InputMaybe<Scalars["String"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
}

export type MutationSellingPlanGroupAddProductVariantsArgs = {
  id: Scalars["ID"]["input"]
  productVariantIds: Array<Scalars["ID"]["input"]>
}

export type MutationSellingPlanGroupAddProductsArgs = {
  id: Scalars["ID"]["input"]
  productIds: Array<Scalars["ID"]["input"]>
}

export type MutationSellingPlanGroupCreateArgs = {
  input: SellingPlanGroupInput
  resources?: InputMaybe<SellingPlanGroupResourceInput>
}

export type MutationSellingPlanGroupDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationSellingPlanGroupRemoveProductVariantsArgs = {
  id: Scalars["ID"]["input"]
  productVariantIds: Array<Scalars["ID"]["input"]>
}

export type MutationSellingPlanGroupRemoveProductsArgs = {
  id: Scalars["ID"]["input"]
  productIds: Array<Scalars["ID"]["input"]>
}

export type MutationSellingPlanGroupUpdateArgs = {
  id: Scalars["ID"]["input"]
  input: SellingPlanGroupInput
}

export type MutationShippingPackageDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationShippingPackageMakeDefaultArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationShippingPackageUpdateArgs = {
  id: Scalars["ID"]["input"]
  shippingPackage: CustomShippingPackageInput
}

export type MutationShopLocaleDisableArgs = {
  locale: Scalars["String"]["input"]
}

export type MutationShopLocaleEnableArgs = {
  locale: Scalars["String"]["input"]
  marketWebPresenceIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type MutationShopLocaleUpdateArgs = {
  locale: Scalars["String"]["input"]
  shopLocale: ShopLocaleInput
}

export type MutationShopPolicyUpdateArgs = {
  shopPolicy: ShopPolicyInput
}

export type MutationShopResourceFeedbackCreateArgs = {
  input: ResourceFeedbackCreateInput
}

export type MutationStagedUploadTargetGenerateArgs = {
  input: StagedUploadTargetGenerateInput
}

export type MutationStagedUploadTargetsGenerateArgs = {
  input: Array<StageImageInput>
}

export type MutationStagedUploadsCreateArgs = {
  input: Array<StagedUploadInput>
}

export type MutationStandardMetafieldDefinitionEnableArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
  key?: InputMaybe<Scalars["String"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  ownerType: MetafieldOwnerType
  pin?: Scalars["Boolean"]["input"]
  useAsCollectionCondition?: InputMaybe<Scalars["Boolean"]["input"]>
  visibleToStorefrontApi?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationStandardMetaobjectDefinitionEnableArgs = {
  type: Scalars["String"]["input"]
}

export type MutationStorefrontAccessTokenCreateArgs = {
  input: StorefrontAccessTokenInput
}

export type MutationStorefrontAccessTokenDeleteArgs = {
  input: StorefrontAccessTokenDeleteInput
}

export type MutationSubscriptionBillingAttemptCreateArgs = {
  subscriptionBillingAttemptInput: SubscriptionBillingAttemptInput
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionBillingCycleContractDraftCommitArgs = {
  draftId: Scalars["ID"]["input"]
}

export type MutationSubscriptionBillingCycleContractDraftConcatenateArgs = {
  concatenatedBillingCycleContracts: Array<SubscriptionBillingCycleInput>
  draftId: Scalars["ID"]["input"]
}

export type MutationSubscriptionBillingCycleContractEditArgs = {
  billingCycleInput: SubscriptionBillingCycleInput
}

export type MutationSubscriptionBillingCycleEditDeleteArgs = {
  billingCycleInput: SubscriptionBillingCycleInput
}

export type MutationSubscriptionBillingCycleEditsDeleteArgs = {
  contractId: Scalars["ID"]["input"]
  targetSelection: SubscriptionBillingCyclesTargetSelection
}

export type MutationSubscriptionBillingCycleScheduleEditArgs = {
  billingCycleInput: SubscriptionBillingCycleInput
  input: SubscriptionBillingCycleScheduleEditInput
}

export type MutationSubscriptionBillingCycleSkipArgs = {
  billingCycleInput: SubscriptionBillingCycleInput
}

export type MutationSubscriptionBillingCycleUnskipArgs = {
  billingCycleInput: SubscriptionBillingCycleInput
}

export type MutationSubscriptionContractActivateArgs = {
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionContractAtomicCreateArgs = {
  input: SubscriptionContractAtomicCreateInput
}

export type MutationSubscriptionContractCancelArgs = {
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionContractCreateArgs = {
  input: SubscriptionContractCreateInput
}

export type MutationSubscriptionContractExpireArgs = {
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionContractFailArgs = {
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionContractPauseArgs = {
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionContractProductChangeArgs = {
  input: SubscriptionContractProductChangeInput
  lineId: Scalars["ID"]["input"]
  subscriptionContractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionContractSetNextBillingDateArgs = {
  contractId: Scalars["ID"]["input"]
  date: Scalars["DateTime"]["input"]
}

export type MutationSubscriptionContractUpdateArgs = {
  contractId: Scalars["ID"]["input"]
}

export type MutationSubscriptionDraftCommitArgs = {
  draftId: Scalars["ID"]["input"]
}

export type MutationSubscriptionDraftDiscountAddArgs = {
  draftId: Scalars["ID"]["input"]
  input: SubscriptionManualDiscountInput
}

export type MutationSubscriptionDraftDiscountCodeApplyArgs = {
  draftId: Scalars["ID"]["input"]
  redeemCode: Scalars["String"]["input"]
}

export type MutationSubscriptionDraftDiscountRemoveArgs = {
  discountId: Scalars["ID"]["input"]
  draftId: Scalars["ID"]["input"]
}

export type MutationSubscriptionDraftDiscountUpdateArgs = {
  discountId: Scalars["ID"]["input"]
  draftId: Scalars["ID"]["input"]
  input: SubscriptionManualDiscountInput
}

export type MutationSubscriptionDraftFreeShippingDiscountAddArgs = {
  draftId: Scalars["ID"]["input"]
  input: SubscriptionFreeShippingDiscountInput
}

export type MutationSubscriptionDraftFreeShippingDiscountUpdateArgs = {
  discountId: Scalars["ID"]["input"]
  draftId: Scalars["ID"]["input"]
  input: SubscriptionFreeShippingDiscountInput
}

export type MutationSubscriptionDraftLineAddArgs = {
  draftId: Scalars["ID"]["input"]
  input: SubscriptionLineInput
}

export type MutationSubscriptionDraftLineRemoveArgs = {
  draftId: Scalars["ID"]["input"]
  lineId: Scalars["ID"]["input"]
}

export type MutationSubscriptionDraftLineUpdateArgs = {
  draftId: Scalars["ID"]["input"]
  input: SubscriptionLineUpdateInput
  lineId: Scalars["ID"]["input"]
}

export type MutationSubscriptionDraftUpdateArgs = {
  draftId: Scalars["ID"]["input"]
  input: SubscriptionDraftInput
}

export type MutationTagsAddArgs = {
  id: Scalars["ID"]["input"]
  tags: Array<Scalars["String"]["input"]>
}

export type MutationTagsRemoveArgs = {
  id: Scalars["ID"]["input"]
  tags: Array<Scalars["String"]["input"]>
}

export type MutationTaxAppConfigureArgs = {
  ready: Scalars["Boolean"]["input"]
}

export type MutationTranslationsRegisterArgs = {
  resourceId: Scalars["ID"]["input"]
  translations: Array<TranslationInput>
}

export type MutationTranslationsRemoveArgs = {
  locales: Array<Scalars["String"]["input"]>
  marketIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  resourceId: Scalars["ID"]["input"]
  translationKeys: Array<Scalars["String"]["input"]>
}

export type MutationUrlRedirectBulkDeleteByIdsArgs = {
  ids: Array<Scalars["ID"]["input"]>
}

export type MutationUrlRedirectBulkDeleteBySavedSearchArgs = {
  savedSearchId: Scalars["ID"]["input"]
}

export type MutationUrlRedirectBulkDeleteBySearchArgs = {
  search: Scalars["String"]["input"]
}

export type MutationUrlRedirectCreateArgs = {
  urlRedirect: UrlRedirectInput
}

export type MutationUrlRedirectDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationUrlRedirectImportCreateArgs = {
  url: Scalars["URL"]["input"]
}

export type MutationUrlRedirectImportSubmitArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationUrlRedirectUpdateArgs = {
  id: Scalars["ID"]["input"]
  urlRedirect: UrlRedirectInput
}

export type MutationValidationCreateArgs = {
  validation: ValidationCreateInput
}

export type MutationValidationDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationValidationUpdateArgs = {
  id: Scalars["ID"]["input"]
  validation: ValidationUpdateInput
}

export type MutationWebPixelCreateArgs = {
  webPixel: WebPixelInput
}

export type MutationWebPixelDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationWebPixelUpdateArgs = {
  id: Scalars["ID"]["input"]
  webPixel: WebPixelInput
}

export type MutationWebhookSubscriptionCreateArgs = {
  subTopic?: InputMaybe<Scalars["String"]["input"]>
  topic: WebhookSubscriptionTopic
  webhookSubscription: WebhookSubscriptionInput
}

export type MutationWebhookSubscriptionDeleteArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationWebhookSubscriptionUpdateArgs = {
  id: Scalars["ID"]["input"]
  webhookSubscription: WebhookSubscriptionInput
}

/**
 * A signed upload parameter for uploading an asset to Shopify.
 *
 * Deprecated in favor of
 * [StagedUploadParameter](https://shopify.dev/api/admin-graphql/latest/objects/StagedUploadParameter),
 * which is used in
 * [StagedMediaUploadTarget](https://shopify.dev/api/admin-graphql/latest/objects/StagedMediaUploadTarget)
 * and returned by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type MutationsStagedUploadTargetGenerateUploadParameter = {
  __typename?: "MutationsStagedUploadTargetGenerateUploadParameter"

  name: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type Navigable = {
  defaultCursor: Scalars["String"]["output"]
}

export type NavigationItem = {
  __typename?: "NavigationItem"

  id: Scalars["String"]["output"]

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export type Node = {
  id: Scalars["ID"]["output"]
}

export type ObjectDimensionsInput = {
  height: Scalars["Float"]["input"]

  length: Scalars["Float"]["input"]

  unit: LengthUnit

  width: Scalars["Float"]["input"]
}

export type OnlineStoreArticle = HasPublishedTranslations &
  Navigable &
  Node & {
    __typename?: "OnlineStoreArticle"

    defaultCursor: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    translations: Array<Translation>
  }

export type OnlineStoreArticleTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type OnlineStoreBlog = HasPublishedTranslations &
  Node & {
    __typename?: "OnlineStoreBlog"

    id: Scalars["ID"]["output"]

    translations: Array<Translation>
  }

export type OnlineStoreBlogTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type OnlineStorePage = HasPublishedTranslations &
  Navigable &
  Node & {
    __typename?: "OnlineStorePage"

    defaultCursor: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    translations: Array<Translation>
  }

export type OnlineStorePageTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type OnlineStorePreviewable = {
  onlineStorePreviewUrl?: Maybe<Scalars["URL"]["output"]>
}

export type Order = CommentEventSubject &
  HasEvents &
  HasLocalizationExtensions &
  HasMetafieldDefinitions &
  HasMetafields &
  LegacyInteroperability &
  Node & {
    __typename?: "Order"

    additionalFees: Array<AdditionalFee>

    agreements: SalesAgreementConnection

    alerts: Array<ResourceAlert>

    app?: Maybe<OrderApp>

    billingAddress?: Maybe<MailingAddress>

    billingAddressMatchesShippingAddress: Scalars["Boolean"]["output"]

    canMarkAsPaid: Scalars["Boolean"]["output"]

    canNotifyCustomer: Scalars["Boolean"]["output"]

    cancelReason?: Maybe<OrderCancelReason>

    cancellation?: Maybe<OrderCancellation>

    cancelledAt?: Maybe<Scalars["DateTime"]["output"]>

    capturable: Scalars["Boolean"]["output"]
    /**
     * The total order-level discount amount, before returns, in shop currency.
     * @deprecated Use `cartDiscountAmountSet` instead.
     */
    cartDiscountAmount?: Maybe<Scalars["Money"]["output"]>

    cartDiscountAmountSet?: Maybe<MoneyBag>
    /**
     * The channel that created the order.
     * @deprecated Use `publication` instead.
     */
    channel?: Maybe<Channel>

    channelInformation?: Maybe<ChannelInformation>

    clientIp?: Maybe<Scalars["String"]["output"]>

    closed: Scalars["Boolean"]["output"]

    closedAt?: Maybe<Scalars["DateTime"]["output"]>

    confirmationNumber?: Maybe<Scalars["String"]["output"]>

    confirmed: Scalars["Boolean"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    currencyCode: CurrencyCode

    currentCartDiscountAmountSet: MoneyBag

    currentSubtotalLineItemsQuantity: Scalars["Int"]["output"]

    currentSubtotalPriceSet: MoneyBag

    currentTaxLines: Array<TaxLine>

    currentTotalAdditionalFeesSet?: Maybe<MoneyBag>

    currentTotalDiscountsSet: MoneyBag

    currentTotalDutiesSet?: Maybe<MoneyBag>

    currentTotalPriceSet: MoneyBag

    currentTotalTaxSet: MoneyBag

    currentTotalWeight: Scalars["UnsignedInt64"]["output"]

    customAttributes: Array<Attribute>

    customer?: Maybe<Customer>

    customerAcceptsMarketing: Scalars["Boolean"]["output"]
    /**
     * The customer's visits and interactions with the online store before placing the order.
     *
     * @deprecated Use `customerJourneySummary` instead.
     */
    customerJourney?: Maybe<CustomerJourney>

    customerJourneySummary?: Maybe<CustomerJourneySummary>

    customerLocale?: Maybe<Scalars["String"]["output"]>

    discountApplications: DiscountApplicationConnection

    discountCode?: Maybe<Scalars["String"]["output"]>

    discountCodes: Array<Scalars["String"]["output"]>

    displayAddress?: Maybe<MailingAddress>

    displayFinancialStatus?: Maybe<OrderDisplayFinancialStatus>

    displayFulfillmentStatus: OrderDisplayFulfillmentStatus

    disputes: Array<OrderDisputeSummary>

    edited: Scalars["Boolean"]["output"]

    email?: Maybe<Scalars["String"]["output"]>

    estimatedTaxes: Scalars["Boolean"]["output"]

    events: EventConnection

    exchangeV2s: ExchangeV2Connection

    fulfillable: Scalars["Boolean"]["output"]

    fulfillmentOrders: FulfillmentOrderConnection

    fulfillments: Array<Fulfillment>

    fullyPaid: Scalars["Boolean"]["output"]

    hasTimelineComment: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]
    /**
     * The URL of the first page of the online store that the customer visited before they submitted the order.
     * @deprecated Use `customerJourneySummary.lastVisit.landingPageHtml` instead
     */
    landingPageDisplayText?: Maybe<Scalars["String"]["output"]>
    /**
     * The first page of the online store that the customer visited before they submitted the order.
     * @deprecated Use `customerJourneySummary.lastVisit.landingPage` instead
     */
    landingPageUrl?: Maybe<Scalars["URL"]["output"]>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    lineItems: LineItemConnection
    /**
     * A list of the order's line items.
     * @deprecated Use `lineItems` instead.
     */
    lineItemsMutable: LineItemMutableConnection

    localizationExtensions: LocalizationExtensionConnection
    /**
     * The fulfillment location that was assigned when the order was created.
     * Orders can have multiple fulfillment orders. These fulfillment orders can each be assigned to a different location which is responsible for fulfilling a subset of the items in an order. The `Order.location` field will only point to one of these locations.
     * Use the [`FulfillmentOrder`](https://shopify.dev/api/admin-graphql/latest/objects/fulfillmentorder)
     * object for up-to-date fulfillment location information.
     *
     * @deprecated Use `physicalLocation` instead.
     */
    location?: Maybe<Scalars["String"]["output"]>

    merchantEditable: Scalars["Boolean"]["output"]

    merchantEditableErrors: Array<Scalars["String"]["output"]>

    merchantOfRecordApp?: Maybe<OrderApp>

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    name: Scalars["String"]["output"]
    /**
     * The net payment for the order, based on the total amount received minus the total amount refunded, in shop currency.
     *
     * @deprecated Use `netPaymentSet` instead.
     */
    netPayment: Scalars["Money"]["output"]

    netPaymentSet: MoneyBag

    nonFulfillableLineItems: LineItemConnection

    note?: Maybe<Scalars["String"]["output"]>

    originalTotalAdditionalFeesSet?: Maybe<MoneyBag>

    originalTotalDutiesSet?: Maybe<MoneyBag>

    originalTotalPriceSet: MoneyBag

    paymentCollectionDetails: OrderPaymentCollectionDetails

    paymentGatewayNames: Array<Scalars["String"]["output"]>

    paymentTerms?: Maybe<PaymentTerms>

    phone?: Maybe<Scalars["String"]["output"]>
    /**
     * The fulfillment location that was assigned when the order was created.
     * Orders can have multiple fulfillment orders. These fulfillment orders can each be assigned to a different location which is responsible for fulfilling a subset of the items in an order. The `Order.physicalLocation` field will only point to one of these locations.
     * Use the [`FulfillmentOrder`](https://shopify.dev/api/admin-graphql/latest/objects/fulfillmentorder)
     * object for up to date fulfillment location information.
     *
     * @deprecated Use `fulfillmentOrders` to get the fulfillment location for the order
     */
    physicalLocation?: Maybe<Location>

    poNumber?: Maybe<Scalars["String"]["output"]>

    presentmentCurrencyCode: CurrencyCode
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    processedAt: Scalars["DateTime"]["output"]

    publication?: Maybe<Publication>

    purchasingEntity?: Maybe<PurchasingEntity>
    /**
     * The marketing referral code from the link that the customer clicked to visit the store.
     * Supports the following URL attributes: "ref", "source", or "r".
     * For example, if the URL is `{shop}.myshopify.com/products/slide?ref=j2tj1tn2`, then this value is `j2tj1tn2`.
     *
     * @deprecated Use `customerJourneySummary.lastVisit.referralCode` instead
     */
    referralCode?: Maybe<Scalars["String"]["output"]>
    /**
     * A web domain or short description of the source that sent the customer to your online store. For example, "shopify.com" or "email".
     *
     * @deprecated Use `customerJourneySummary.lastVisit.referralInfoHtml` instead
     */
    referrerDisplayText?: Maybe<Scalars["String"]["output"]>
    /**
     * The URL of the webpage where the customer clicked a link that sent them to your online store.
     *
     * @deprecated Use `customerJourneySummary.lastVisit.referrerUrl` instead
     */
    referrerUrl?: Maybe<Scalars["URL"]["output"]>

    refundDiscrepancySet: MoneyBag

    refundable: Scalars["Boolean"]["output"]

    refunds: Array<Refund>

    registeredSourceUrl?: Maybe<Scalars["URL"]["output"]>

    requiresShipping: Scalars["Boolean"]["output"]

    restockable: Scalars["Boolean"]["output"]

    returnStatus: OrderReturnStatus

    returns: ReturnConnection
    /**
     * The fraud risk level of the order.
     * @deprecated This field is deprecated in version 2024-04. Please use OrderRiskAssessment.riskLevel
     */
    riskLevel: OrderRiskLevel
    /**
     * A list of risks associated with the order.
     * @deprecated This field is deprecated in version 2024-04. Please use OrderRiskAssessment
     */
    risks: Array<OrderRisk>

    shippingAddress?: Maybe<MailingAddress>

    shippingLine?: Maybe<ShippingLine>

    shippingLines: ShippingLineConnection

    shopifyProtect?: Maybe<ShopifyProtectOrderSummary>

    sourceIdentifier?: Maybe<Scalars["String"]["output"]>

    subtotalLineItemsQuantity: Scalars["Int"]["output"]
    /**
     * The sum of the prices for all line items after discounts and before returns, in shop currency.
     * If `taxesIncluded` is `true`, then the subtotal also includes tax.
     *
     * @deprecated Use `subtotalPriceSet` instead.
     */
    subtotalPrice?: Maybe<Scalars["Money"]["output"]>

    subtotalPriceSet?: Maybe<MoneyBag>

    suggestedRefund?: Maybe<SuggestedRefund>

    tags: Array<Scalars["String"]["output"]>

    taxExempt: Scalars["Boolean"]["output"]

    taxLines: Array<TaxLine>

    taxesIncluded: Scalars["Boolean"]["output"]

    test: Scalars["Boolean"]["output"]
    /**
     * The authorized amount that's uncaptured or undercaptured, in shop currency.
     * This amount isn't adjusted for returns.
     *
     * @deprecated Use `totalCapturableSet` instead.
     */
    totalCapturable: Scalars["Money"]["output"]

    totalCapturableSet: MoneyBag
    /**
     * The total amount discounted on the order before returns, in shop currency.
     * This includes both order and line level discounts.
     *
     * @deprecated Use `totalDiscountsSet` instead.
     */
    totalDiscounts?: Maybe<Scalars["Money"]["output"]>

    totalDiscountsSet?: Maybe<MoneyBag>

    totalOutstandingSet: MoneyBag
    /**
     * The total price of the order, before returns, in shop currency.
     * This includes taxes and discounts.
     *
     * @deprecated Use `totalPriceSet` instead.
     */
    totalPrice: Scalars["Money"]["output"]

    totalPriceSet: MoneyBag
    /**
     * The total amount received from the customer before returns, in shop currency.
     * @deprecated Use `totalReceivedSet` instead.
     */
    totalReceived: Scalars["Money"]["output"]

    totalReceivedSet: MoneyBag
    /**
     * The total amount that was refunded, in shop currency.
     * @deprecated Use `totalRefundedSet` instead.
     */
    totalRefunded: Scalars["Money"]["output"]

    totalRefundedSet: MoneyBag

    totalRefundedShippingSet: MoneyBag
    /**
     * The total shipping amount before discounts and returns, in shop currency.
     * @deprecated Use `totalShippingPriceSet` instead.
     */
    totalShippingPrice: Scalars["Money"]["output"]

    totalShippingPriceSet: MoneyBag
    /**
     * The total tax amount before returns, in shop currency.
     * @deprecated Use `totalTaxSet` instead.
     */
    totalTax?: Maybe<Scalars["Money"]["output"]>

    totalTaxSet?: Maybe<MoneyBag>
    /**
     * The sum of all tip amounts for the order, in shop currency.
     * @deprecated Use `totalTipReceivedSet` instead.
     */
    totalTipReceived: MoneyV2

    totalTipReceivedSet: MoneyBag

    totalWeight?: Maybe<Scalars["UnsignedInt64"]["output"]>

    transactions: Array<OrderTransaction>

    unpaid: Scalars["Boolean"]["output"]

    updatedAt: Scalars["DateTime"]["output"]
  }

export type OrderAgreementsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type OrderExchangeV2sArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  displayable?: InputMaybe<Scalars["Boolean"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderFulfillmentsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type OrderLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderLineItemsMutableArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderLocalizationExtensionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  countryCodes?: InputMaybe<Array<CountryCode>>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  purposes?: InputMaybe<Array<LocalizationExtensionPurpose>>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type OrderMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type OrderMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderNonFulfillableLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type OrderPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderRefundsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type OrderReturnsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderRisksArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type OrderShippingLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderSuggestedRefundArgs = {
  refundDuties?: InputMaybe<Array<RefundDutyInput>>
  refundLineItems?: InputMaybe<Array<RefundLineItemInput>>
  refundShipping?: InputMaybe<Scalars["Boolean"]["input"]>
  shippingAmount?: InputMaybe<Scalars["Money"]["input"]>
  suggestFullRefund?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderTransactionsArgs = {
  capturable?: InputMaybe<Scalars["Boolean"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  manuallyResolvable?: InputMaybe<Scalars["Boolean"]["input"]>
}

export enum OrderActionType {
  Order = "ORDER",

  OrderEdit = "ORDER_EDIT",

  Refund = "REFUND",

  Unknown = "UNKNOWN",
}

export type OrderAgreement = SalesAgreement & {
  __typename?: "OrderAgreement"

  app?: Maybe<App>

  happenedAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  order: Order

  reason: OrderActionType

  sales: SaleConnection

  user?: Maybe<StaffMember>
}

export type OrderAgreementSalesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderApp = {
  __typename?: "OrderApp"

  icon: Image

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]
}

export type OrderCancelPayload = {
  __typename?: "OrderCancelPayload"

  job?: Maybe<Job>

  orderCancelUserErrors: Array<OrderCancelUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `orderCancelUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export enum OrderCancelReason {
  Customer = "CUSTOMER",

  Declined = "DECLINED",

  Fraud = "FRAUD",

  Inventory = "INVENTORY",

  Other = "OTHER",

  Staff = "STAFF",
}

export type OrderCancelUserError = DisplayableError & {
  __typename?: "OrderCancelUserError"

  code?: Maybe<OrderCancelUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum OrderCancelUserErrorCode {
  Invalid = "INVALID",

  NotFound = "NOT_FOUND",

  NoRefundPermission = "NO_REFUND_PERMISSION",
}

export type OrderCancellation = {
  __typename?: "OrderCancellation"

  staffNote?: Maybe<Scalars["String"]["output"]>
}

export type OrderCaptureInput = {
  amount: Scalars["Money"]["input"]

  currency?: InputMaybe<CurrencyCode>

  id: Scalars["ID"]["input"]

  parentTransactionId: Scalars["ID"]["input"]
}

export type OrderCapturePayload = {
  __typename?: "OrderCapturePayload"

  transaction?: Maybe<OrderTransaction>

  userErrors: Array<UserError>
}

export type OrderCloseInput = {
  id: Scalars["ID"]["input"]
}

export type OrderClosePayload = {
  __typename?: "OrderClosePayload"

  order?: Maybe<Order>

  userErrors: Array<UserError>
}

export type OrderConnection = {
  __typename?: "OrderConnection"

  edges: Array<OrderEdge>

  nodes: Array<Order>

  pageInfo: PageInfo
}

export type OrderCreateMandatePaymentPayload = {
  __typename?: "OrderCreateMandatePaymentPayload"

  job?: Maybe<Job>

  paymentReferenceId?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<OrderCreateMandatePaymentUserError>
}

export type OrderCreateMandatePaymentUserError = DisplayableError & {
  __typename?: "OrderCreateMandatePaymentUserError"

  code?: Maybe<OrderCreateMandatePaymentUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum OrderCreateMandatePaymentUserErrorCode {
  OrderMandatePaymentErrorCode = "ORDER_MANDATE_PAYMENT_ERROR_CODE",
}

export enum OrderDisplayFinancialStatus {
  Authorized = "AUTHORIZED",

  Expired = "EXPIRED",

  Paid = "PAID",

  PartiallyPaid = "PARTIALLY_PAID",

  PartiallyRefunded = "PARTIALLY_REFUNDED",

  Pending = "PENDING",

  Refunded = "REFUNDED",

  Voided = "VOIDED",
}

export enum OrderDisplayFulfillmentStatus {
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

export type OrderDisputeSummary = Node & {
  __typename?: "OrderDisputeSummary"

  id: Scalars["ID"]["output"]

  initiatedAs: DisputeType

  status: DisputeStatus
}

export type OrderEdge = {
  __typename?: "OrderEdge"

  cursor: Scalars["String"]["output"]

  node: Order
}

export type OrderEditAddCustomItemPayload = {
  __typename?: "OrderEditAddCustomItemPayload"

  calculatedLineItem?: Maybe<CalculatedLineItem>

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<UserError>
}

export type OrderEditAddLineItemDiscountPayload = {
  __typename?: "OrderEditAddLineItemDiscountPayload"

  addedDiscountStagedChange?: Maybe<OrderStagedChangeAddLineItemDiscount>

  calculatedLineItem?: Maybe<CalculatedLineItem>

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<UserError>
}

export type OrderEditAddVariantPayload = {
  __typename?: "OrderEditAddVariantPayload"

  calculatedLineItem?: Maybe<CalculatedLineItem>

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<UserError>
}

export type OrderEditAgreement = SalesAgreement & {
  __typename?: "OrderEditAgreement"

  app?: Maybe<App>

  happenedAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  reason: OrderActionType

  sales: SaleConnection

  user?: Maybe<StaffMember>
}

export type OrderEditAgreementSalesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type OrderEditAppliedDiscountInput = {
  description?: InputMaybe<Scalars["String"]["input"]>

  fixedValue?: InputMaybe<MoneyInput>

  percentValue?: InputMaybe<Scalars["Float"]["input"]>
}

export type OrderEditBeginPayload = {
  __typename?: "OrderEditBeginPayload"

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<UserError>
}

export type OrderEditCommitPayload = {
  __typename?: "OrderEditCommitPayload"

  order?: Maybe<Order>

  userErrors: Array<UserError>
}

export type OrderEditRemoveDiscountPayload = {
  __typename?: "OrderEditRemoveDiscountPayload"

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<OrderEditRemoveDiscountUserError>
}

export type OrderEditRemoveDiscountUserError = DisplayableError & {
  __typename?: "OrderEditRemoveDiscountUserError"

  code?: Maybe<OrderEditRemoveDiscountUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum OrderEditRemoveDiscountUserErrorCode {
  Invalid = "INVALID",
}

export type OrderEditRemoveLineItemDiscountPayload = {
  __typename?: "OrderEditRemoveLineItemDiscountPayload"

  calculatedLineItem?: Maybe<CalculatedLineItem>

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<UserError>
}

export type OrderEditSetQuantityPayload = {
  __typename?: "OrderEditSetQuantityPayload"

  calculatedLineItem?: Maybe<CalculatedLineItem>

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<UserError>
}

export type OrderEditUpdateDiscountPayload = {
  __typename?: "OrderEditUpdateDiscountPayload"

  calculatedOrder?: Maybe<CalculatedOrder>

  userErrors: Array<OrderEditUpdateDiscountUserError>
}

export type OrderEditUpdateDiscountUserError = DisplayableError & {
  __typename?: "OrderEditUpdateDiscountUserError"

  code?: Maybe<OrderEditUpdateDiscountUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum OrderEditUpdateDiscountUserErrorCode {
  Invalid = "INVALID",
}

export type OrderInput = {
  customAttributes?: InputMaybe<Array<AttributeInput>>

  email?: InputMaybe<Scalars["String"]["input"]>

  id: Scalars["ID"]["input"]

  localizationExtensions?: InputMaybe<Array<LocalizationExtensionInput>>

  metafields?: InputMaybe<Array<MetafieldInput>>

  note?: InputMaybe<Scalars["String"]["input"]>

  poNumber?: InputMaybe<Scalars["String"]["input"]>

  shippingAddress?: InputMaybe<MailingAddressInput>

  tags?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type OrderInvoiceSendPayload = {
  __typename?: "OrderInvoiceSendPayload"

  order?: Maybe<Order>

  userErrors: Array<OrderInvoiceSendUserError>
}

export type OrderInvoiceSendUserError = DisplayableError & {
  __typename?: "OrderInvoiceSendUserError"

  code?: Maybe<OrderInvoiceSendUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum OrderInvoiceSendUserErrorCode {
  OrderInvoiceSendUnsuccessful = "ORDER_INVOICE_SEND_UNSUCCESSFUL",
}

export type OrderMarkAsPaidInput = {
  id: Scalars["ID"]["input"]
}

export type OrderMarkAsPaidPayload = {
  __typename?: "OrderMarkAsPaidPayload"

  order?: Maybe<Order>

  userErrors: Array<UserError>
}

export type OrderOpenInput = {
  id: Scalars["ID"]["input"]
}

export type OrderOpenPayload = {
  __typename?: "OrderOpenPayload"

  order?: Maybe<Order>

  userErrors: Array<UserError>
}

export type OrderPaymentCollectionDetails = {
  __typename?: "OrderPaymentCollectionDetails"

  additionalPaymentCollectionUrl?: Maybe<Scalars["URL"]["output"]>

  vaultedPaymentMethods?: Maybe<Array<PaymentMandate>>
}

export type OrderPaymentStatus = {
  __typename?: "OrderPaymentStatus"

  errorMessage?: Maybe<Scalars["String"]["output"]>

  paymentReferenceId: Scalars["String"]["output"]

  status: OrderPaymentStatusResult

  translatedErrorMessage?: Maybe<Scalars["String"]["output"]>
}

export enum OrderPaymentStatusResult {
  Authorized = "AUTHORIZED",

  Captured = "CAPTURED",

  Error = "ERROR",

  Initiated = "INITIATED",

  Pending = "PENDING",

  Processing = "PROCESSING",

  Purchased = "PURCHASED",

  RedirectRequired = "REDIRECT_REQUIRED",

  Refunded = "REFUNDED",

  Retryable = "RETRYABLE",

  Success = "SUCCESS",

  Unknown = "UNKNOWN",

  Voided = "VOIDED",
}

export enum OrderReturnStatus {
  InspectionComplete = "INSPECTION_COMPLETE",

  InProgress = "IN_PROGRESS",

  NoReturn = "NO_RETURN",

  Returned = "RETURNED",

  ReturnFailed = "RETURN_FAILED",

  ReturnRequested = "RETURN_REQUESTED",
}

export type OrderRisk = {
  __typename?: "OrderRisk"
  /**
   * Whether the risk level is shown in the Shopify admin. If false, then this order risk is ignored when Shopify determines the overall risk level for the order.
   * @deprecated This field is deprecated in version 2024-04
   */
  display: Scalars["Boolean"]["output"]
  /**
   * The likelihood that an order is fraudulent, based on this order risk.
   *
   * The level can be set by Shopify risk analysis or by an app.
   *
   * @deprecated This field is deprecated in version 2024-04. Please use OrderRiskAssessment.riskLevel
   */
  level?: Maybe<OrderRiskLevel>
  /**
   * The risk message that's shown to the merchant in the Shopify admin.
   * @deprecated This field is deprecated in version 2024-04
   */
  message?: Maybe<Scalars["String"]["output"]>
}

export enum OrderRiskLevel {
  High = "HIGH",

  Low = "LOW",

  Medium = "MEDIUM",
}

export enum OrderSortKeys {
  CreatedAt = "CREATED_AT",

  CustomerName = "CUSTOMER_NAME",

  Destination = "DESTINATION",

  FinancialStatus = "FINANCIAL_STATUS",

  FulfillmentStatus = "FULFILLMENT_STATUS",

  Id = "ID",

  OrderNumber = "ORDER_NUMBER",

  PoNumber = "PO_NUMBER",

  ProcessedAt = "PROCESSED_AT",

  Relevance = "RELEVANCE",

  TotalItemsQuantity = "TOTAL_ITEMS_QUANTITY",

  TotalPrice = "TOTAL_PRICE",

  UpdatedAt = "UPDATED_AT",
}

export type OrderStagedChange =
  | OrderStagedChangeAddCustomItem
  | OrderStagedChangeAddLineItemDiscount
  | OrderStagedChangeAddShippingLine
  | OrderStagedChangeAddVariant
  | OrderStagedChangeDecrementItem
  | OrderStagedChangeIncrementItem

export type OrderStagedChangeAddCustomItem = {
  __typename?: "OrderStagedChangeAddCustomItem"

  originalUnitPrice: MoneyV2

  quantity: Scalars["Int"]["output"]

  title: Scalars["String"]["output"]
}

export type OrderStagedChangeAddLineItemDiscount = {
  __typename?: "OrderStagedChangeAddLineItemDiscount"

  description: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  value: PricingValue
}

export type OrderStagedChangeAddShippingLine = {
  __typename?: "OrderStagedChangeAddShippingLine"

  phone?: Maybe<Scalars["String"]["output"]>

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  price: MoneyV2

  title?: Maybe<Scalars["String"]["output"]>
}

export type OrderStagedChangeAddVariant = {
  __typename?: "OrderStagedChangeAddVariant"

  quantity: Scalars["Int"]["output"]

  variant: ProductVariant
}

export type OrderStagedChangeConnection = {
  __typename?: "OrderStagedChangeConnection"

  edges: Array<OrderStagedChangeEdge>

  nodes: Array<OrderStagedChange>

  pageInfo: PageInfo
}

export type OrderStagedChangeDecrementItem = {
  __typename?: "OrderStagedChangeDecrementItem"

  delta: Scalars["Int"]["output"]

  lineItem: LineItem

  restock: Scalars["Boolean"]["output"]
}

export type OrderStagedChangeEdge = {
  __typename?: "OrderStagedChangeEdge"

  cursor: Scalars["String"]["output"]

  node: OrderStagedChange
}

export type OrderStagedChangeIncrementItem = {
  __typename?: "OrderStagedChangeIncrementItem"

  delta: Scalars["Int"]["output"]

  lineItem: LineItem
}

export type OrderTransaction = Node & {
  __typename?: "OrderTransaction"

  accountNumber?: Maybe<Scalars["String"]["output"]>
  /**
   * The amount of money.
   * @deprecated Use `amountSet` instead.
   */
  amount: Scalars["Money"]["output"]

  amountSet: MoneyBag
  /**
   * The amount and currency of the transaction.
   * @deprecated Use `amountSet` instead.
   */
  amountV2: MoneyV2

  authorizationCode?: Maybe<Scalars["String"]["output"]>

  authorizationExpiresAt?: Maybe<Scalars["DateTime"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  errorCode?: Maybe<OrderTransactionErrorCode>

  fees: Array<TransactionFee>

  formattedGateway?: Maybe<Scalars["String"]["output"]>

  gateway?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  kind: OrderTransactionKind

  manuallyCapturable: Scalars["Boolean"]["output"]
  /**
   * Specifies the available amount to refund on the gateway.
   * This value is only available for transactions of type `SuggestedRefund`.
   *
   * @deprecated Use `maximumRefundableV2` instead.
   */
  maximumRefundable?: Maybe<Scalars["Money"]["output"]>

  maximumRefundableV2?: Maybe<MoneyV2>

  multiCapturable: Scalars["Boolean"]["output"]

  order?: Maybe<Order>

  parentTransaction?: Maybe<OrderTransaction>

  paymentDetails?: Maybe<PaymentDetails>

  paymentIcon?: Maybe<Image>

  paymentId?: Maybe<Scalars["String"]["output"]>
  /**
   * The payment method used for the transaction. This value is `null` if the payment method is unknown.
   * @deprecated Use `paymentIcon` instead.
   */
  paymentMethod?: Maybe<PaymentMethods>

  processedAt?: Maybe<Scalars["DateTime"]["output"]>
  /**
   * The transaction receipt that the payment gateway attaches to the transaction.
   * The value of this field depends on which payment gateway processed the transaction.
   *
   * @deprecated Use `receiptJson` instead.
   */
  receipt?: Maybe<Scalars["String"]["output"]>

  receiptJson?: Maybe<Scalars["JSON"]["output"]>

  settlementCurrency?: Maybe<CurrencyCode>

  settlementCurrencyRate?: Maybe<Scalars["Decimal"]["output"]>

  shopifyPaymentsSet?: Maybe<ShopifyPaymentsTransactionSet>

  status: OrderTransactionStatus

  test: Scalars["Boolean"]["output"]
  /**
   * Specifies the available amount to capture on the gateway.
   * Only available when an amount is capturable or manually mark as paid.
   *
   * @deprecated Use `totalUnsettledSet` instead.
   */
  totalUnsettled?: Maybe<Scalars["Money"]["output"]>

  totalUnsettledSet?: Maybe<MoneyBag>
  /**
   * Specifies the available amount with currency to capture on the gateway.
   * Only available when an amount is capturable or manually mark as paid.
   *
   * @deprecated Use `totalUnsettledSet` instead.
   */
  totalUnsettledV2?: Maybe<MoneyV2>

  user?: Maybe<StaffMember>
}

export type OrderTransactionConnection = {
  __typename?: "OrderTransactionConnection"

  edges: Array<OrderTransactionEdge>

  nodes: Array<OrderTransaction>

  pageInfo: PageInfo
}

export type OrderTransactionEdge = {
  __typename?: "OrderTransactionEdge"

  cursor: Scalars["String"]["output"]

  node: OrderTransaction
}

export enum OrderTransactionErrorCode {
  AmazonPaymentsInvalidPaymentMethod = "AMAZON_PAYMENTS_INVALID_PAYMENT_METHOD",

  AmazonPaymentsMaxAmountCharged = "AMAZON_PAYMENTS_MAX_AMOUNT_CHARGED",

  AmazonPaymentsMaxAmountRefunded = "AMAZON_PAYMENTS_MAX_AMOUNT_REFUNDED",

  AmazonPaymentsMaxAuthorizationsCaptured = "AMAZON_PAYMENTS_MAX_AUTHORIZATIONS_CAPTURED",

  AmazonPaymentsMaxRefundsProcessed = "AMAZON_PAYMENTS_MAX_REFUNDS_PROCESSED",

  AmazonPaymentsOrderReferenceCanceled = "AMAZON_PAYMENTS_ORDER_REFERENCE_CANCELED",

  AmazonPaymentsStale = "AMAZON_PAYMENTS_STALE",

  CallIssuer = "CALL_ISSUER",

  CardDeclined = "CARD_DECLINED",

  ConfigError = "CONFIG_ERROR",

  ExpiredCard = "EXPIRED_CARD",

  GenericError = "GENERIC_ERROR",

  IncorrectAddress = "INCORRECT_ADDRESS",

  IncorrectCvc = "INCORRECT_CVC",

  IncorrectNumber = "INCORRECT_NUMBER",

  IncorrectPin = "INCORRECT_PIN",

  IncorrectZip = "INCORRECT_ZIP",

  InvalidAmount = "INVALID_AMOUNT",

  InvalidCountry = "INVALID_COUNTRY",

  InvalidCvc = "INVALID_CVC",

  InvalidExpiryDate = "INVALID_EXPIRY_DATE",

  InvalidNumber = "INVALID_NUMBER",

  PaymentMethodUnavailable = "PAYMENT_METHOD_UNAVAILABLE",

  PickUpCard = "PICK_UP_CARD",

  ProcessingError = "PROCESSING_ERROR",

  TestModeLiveCard = "TEST_MODE_LIVE_CARD",

  UnsupportedFeature = "UNSUPPORTED_FEATURE",
}

export type OrderTransactionInput = {
  amount: Scalars["Money"]["input"]

  gateway: Scalars["String"]["input"]

  kind: OrderTransactionKind

  orderId: Scalars["ID"]["input"]

  parentId?: InputMaybe<Scalars["ID"]["input"]>
}

export enum OrderTransactionKind {
  Authorization = "AUTHORIZATION",

  Capture = "CAPTURE",

  Change = "CHANGE",

  EmvAuthorization = "EMV_AUTHORIZATION",

  Refund = "REFUND",

  Sale = "SALE",

  SuggestedRefund = "SUGGESTED_REFUND",

  Void = "VOID",
}

export enum OrderTransactionStatus {
  AwaitingResponse = "AWAITING_RESPONSE",

  Error = "ERROR",

  Failure = "FAILURE",

  Pending = "PENDING",

  Success = "SUCCESS",

  Unknown = "UNKNOWN",
}

export type OrderUpdatePayload = {
  __typename?: "OrderUpdatePayload"

  order?: Maybe<Order>

  userErrors: Array<UserError>
}

export type PageInfo = {
  __typename?: "PageInfo"

  endCursor?: Maybe<Scalars["String"]["output"]>

  hasNextPage: Scalars["Boolean"]["output"]

  hasPreviousPage: Scalars["Boolean"]["output"]

  startCursor?: Maybe<Scalars["String"]["output"]>
}

export type ParseError = {
  __typename?: "ParseError"

  code: ParseErrorCode

  message: Scalars["String"]["output"]

  range?: Maybe<ParseErrorRange>
}

export enum ParseErrorCode {
  BackfillDateRangeNotFound = "BACKFILL_DATE_RANGE_NOT_FOUND",

  ColumnNotFound = "COLUMN_NOT_FOUND",

  CompareToIncompatiblePeriod = "COMPARE_TO_INCOMPATIBLE_PERIOD",

  CompareToInvalidPeriod = "COMPARE_TO_INVALID_PERIOD",

  CompareToMissingPeriod = "COMPARE_TO_MISSING_PERIOD",

  ComparisonWithNonAggregateFields = "COMPARISON_WITH_NON_AGGREGATE_FIELDS",

  DateIntervalNotFound = "DATE_INTERVAL_NOT_FOUND",

  DateNotParsable = "DATE_NOT_PARSABLE",

  DateTimeNotParsable = "DATE_TIME_NOT_PARSABLE",

  ExcessBackfillDimensions = "EXCESS_BACKFILL_DIMENSIONS",

  ExcessDimensions = "EXCESS_DIMENSIONS",

  ExcessPeriods = "EXCESS_PERIODS",

  ExcessPresentments = "EXCESS_PRESENTMENTS",

  FromNotFound = "FROM_NOT_FOUND",

  FunctionArgumentsNotFound = "FUNCTION_ARGUMENTS_NOT_FOUND",

  FunctionExcessArguments = "FUNCTION_EXCESS_ARGUMENTS",

  FunctionIncompatibleTypes = "FUNCTION_INCOMPATIBLE_TYPES",

  FunctionModifierNotFound = "FUNCTION_MODIFIER_NOT_FOUND",

  FunctionNestedAggregate = "FUNCTION_NESTED_AGGREGATE",

  FunctionNotFound = "FUNCTION_NOT_FOUND",

  InvalidDateRange = "INVALID_DATE_RANGE",

  LimitInvalid = "LIMIT_INVALID",

  ListMixedArgumentTypes = "LIST_MIXED_ARGUMENT_TYPES",

  MixedAggregateAndNonAggregate = "MIXED_AGGREGATE_AND_NON_AGGREGATE",

  NamedDateNotFound = "NAMED_DATE_NOT_FOUND",

  OperatorIncompatibleTypes = "OPERATOR_INCOMPATIBLE_TYPES",

  PresentmentNotFound = "PRESENTMENT_NOT_FOUND",

  RequiredGroupByNotFound = "REQUIRED_GROUP_BY_NOT_FOUND",

  SemanticallyInvalid = "SEMANTICALLY_INVALID",

  SortFieldNotFound = "SORT_FIELD_NOT_FOUND",

  SyntaxFailedPredicate = "SYNTAX_FAILED_PREDICATE",

  SyntaxInputMismatch = "SYNTAX_INPUT_MISMATCH",

  SyntaxInvalidToken = "SYNTAX_INVALID_TOKEN",

  SyntaxMissingToken = "SYNTAX_MISSING_TOKEN",

  SyntaxNotRecognized = "SYNTAX_NOT_RECOGNIZED",

  SyntaxNoViableAlternative = "SYNTAX_NO_VIABLE_ALTERNATIVE",

  SyntaxUnwantedToken = "SYNTAX_UNWANTED_TOKEN",

  TableNotFound = "TABLE_NOT_FOUND",

  TimeFunctionNotFound = "TIME_FUNCTION_NOT_FOUND",

  UnbackfilledTimeGroupByComparison = "UNBACKFILLED_TIME_GROUP_BY_COMPARISON",

  Unknown = "UNKNOWN",

  ValueNotParsable = "VALUE_NOT_PARSABLE",

  VisualizeChartTypeNotFound = "VISUALIZE_CHART_TYPE_NOT_FOUND",

  VisualizeExcessProjections = "VISUALIZE_EXCESS_PROJECTIONS",

  VisualizeGroupByMixedBackfill = "VISUALIZE_GROUP_BY_MIXED_BACKFILL",

  VisualizeGroupByNotFound = "VISUALIZE_GROUP_BY_NOT_FOUND",

  VisualizeIncompatibleTypes = "VISUALIZE_INCOMPATIBLE_TYPES",
}

export type ParseErrorRange = {
  __typename?: "ParseErrorRange"

  end: ErrorPosition

  start: ErrorPosition
}

export type PaymentCustomization = HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "PaymentCustomization"

    enabled: Scalars["Boolean"]["output"]

    errorHistory?: Maybe<FunctionsErrorHistory>

    functionId: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    shopifyFunction: ShopifyFunction

    title: Scalars["String"]["output"]
  }

export type PaymentCustomizationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type PaymentCustomizationMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type PaymentCustomizationMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PaymentCustomizationPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type PaymentCustomizationPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PaymentCustomizationActivationPayload = {
  __typename?: "PaymentCustomizationActivationPayload"

  ids?: Maybe<Array<Scalars["String"]["output"]>>

  userErrors: Array<PaymentCustomizationError>
}

export type PaymentCustomizationConnection = {
  __typename?: "PaymentCustomizationConnection"

  edges: Array<PaymentCustomizationEdge>

  nodes: Array<PaymentCustomization>

  pageInfo: PageInfo
}

export type PaymentCustomizationCreatePayload = {
  __typename?: "PaymentCustomizationCreatePayload"

  paymentCustomization?: Maybe<PaymentCustomization>

  userErrors: Array<PaymentCustomizationError>
}

export type PaymentCustomizationDeletePayload = {
  __typename?: "PaymentCustomizationDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<PaymentCustomizationError>
}

export type PaymentCustomizationEdge = {
  __typename?: "PaymentCustomizationEdge"

  cursor: Scalars["String"]["output"]

  node: PaymentCustomization
}

export type PaymentCustomizationError = DisplayableError & {
  __typename?: "PaymentCustomizationError"

  code?: Maybe<PaymentCustomizationErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PaymentCustomizationErrorCode {
  CustomAppFunctionNotEligible = "CUSTOM_APP_FUNCTION_NOT_ELIGIBLE",

  FunctionDoesNotImplement = "FUNCTION_DOES_NOT_IMPLEMENT",

  FunctionIdCannotBeChanged = "FUNCTION_ID_CANNOT_BE_CHANGED",

  FunctionNotFound = "FUNCTION_NOT_FOUND",

  FunctionPendingDeletion = "FUNCTION_PENDING_DELETION",

  Invalid = "INVALID",

  InvalidMetafields = "INVALID_METAFIELDS",

  MaximumActivePaymentCustomizations = "MAXIMUM_ACTIVE_PAYMENT_CUSTOMIZATIONS",

  PaymentCustomizationFunctionNotEligible = "PAYMENT_CUSTOMIZATION_FUNCTION_NOT_ELIGIBLE",

  PaymentCustomizationNotFound = "PAYMENT_CUSTOMIZATION_NOT_FOUND",

  RequiredInputField = "REQUIRED_INPUT_FIELD",
}

export type PaymentCustomizationInput = {
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>

  functionId?: InputMaybe<Scalars["String"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type PaymentCustomizationUpdatePayload = {
  __typename?: "PaymentCustomizationUpdatePayload"

  paymentCustomization?: Maybe<PaymentCustomization>

  userErrors: Array<PaymentCustomizationError>
}

export type PaymentDetails = CardPaymentDetails | ShopPayInstallmentsPaymentDetails

export type PaymentInstrument = VaultCreditCard | VaultPaypalBillingAgreement

export type PaymentMandate = Node & {
  __typename?: "PaymentMandate"

  id: Scalars["ID"]["output"]

  paymentInstrument: PaymentInstrument
}

export enum PaymentMethods {
  AmericanExpress = "AMERICAN_EXPRESS",
  Bitcoin = "BITCOIN",
  Bogus = "BOGUS",
  Dankort = "DANKORT",
  DinersClub = "DINERS_CLUB",
  Discover = "DISCOVER",
  Dogecoin = "DOGECOIN",

  Eftpos = "EFTPOS",

  Elo = "ELO",
  Forbrugsforeningen = "FORBRUGSFORENINGEN",

  Interac = "INTERAC",
  Jcb = "JCB",
  Litecoin = "LITECOIN",
  Maestro = "MAESTRO",
  Mastercard = "MASTERCARD",
  Paypal = "PAYPAL",

  Unionpay = "UNIONPAY",
  Visa = "VISA",
}

export type PaymentReminderSendPayload = {
  __typename?: "PaymentReminderSendPayload"

  success?: Maybe<Scalars["Boolean"]["output"]>

  userErrors: Array<PaymentReminderSendUserError>
}

export type PaymentReminderSendUserError = DisplayableError & {
  __typename?: "PaymentReminderSendUserError"

  code?: Maybe<PaymentReminderSendUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PaymentReminderSendUserErrorCode {
  PaymentReminderSendUnsuccessful = "PAYMENT_REMINDER_SEND_UNSUCCESSFUL",
}

export type PaymentSchedule = Node & {
  __typename?: "PaymentSchedule"

  amount: MoneyV2

  completedAt?: Maybe<Scalars["DateTime"]["output"]>

  dueAt?: Maybe<Scalars["DateTime"]["output"]>

  id: Scalars["ID"]["output"]

  issuedAt?: Maybe<Scalars["DateTime"]["output"]>

  paymentTerms: PaymentTerms
}

export type PaymentScheduleConnection = {
  __typename?: "PaymentScheduleConnection"

  edges: Array<PaymentScheduleEdge>

  nodes: Array<PaymentSchedule>

  pageInfo: PageInfo
}

export type PaymentScheduleEdge = {
  __typename?: "PaymentScheduleEdge"

  cursor: Scalars["String"]["output"]

  node: PaymentSchedule
}

export type PaymentScheduleInput = {
  dueAt?: InputMaybe<Scalars["DateTime"]["input"]>

  issuedAt?: InputMaybe<Scalars["DateTime"]["input"]>
}

export type PaymentSettings = {
  __typename?: "PaymentSettings"

  supportedDigitalWallets: Array<DigitalWallet>
}

export type PaymentTerms = Node & {
  __typename?: "PaymentTerms"

  draftOrder?: Maybe<DraftOrder>

  dueInDays?: Maybe<Scalars["Int"]["output"]>

  id: Scalars["ID"]["output"]

  order?: Maybe<Order>

  overdue: Scalars["Boolean"]["output"]

  paymentSchedules: PaymentScheduleConnection

  paymentTermsName: Scalars["String"]["output"]

  paymentTermsType: PaymentTermsType

  translatedName: Scalars["String"]["output"]
}

export type PaymentTermsPaymentSchedulesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PaymentTermsCreateInput = {
  paymentSchedules?: InputMaybe<Array<PaymentScheduleInput>>

  paymentTermsTemplateId: Scalars["ID"]["input"]
}

export type PaymentTermsCreatePayload = {
  __typename?: "PaymentTermsCreatePayload"

  paymentTerms?: Maybe<PaymentTerms>

  userErrors: Array<PaymentTermsCreateUserError>
}

export type PaymentTermsCreateUserError = DisplayableError & {
  __typename?: "PaymentTermsCreateUserError"

  code?: Maybe<PaymentTermsCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PaymentTermsCreateUserErrorCode {
  PaymentTermsCreationUnsuccessful = "PAYMENT_TERMS_CREATION_UNSUCCESSFUL",
}

export type PaymentTermsDeleteInput = {
  paymentTermsId: Scalars["ID"]["input"]
}

export type PaymentTermsDeletePayload = {
  __typename?: "PaymentTermsDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<PaymentTermsDeleteUserError>
}

export type PaymentTermsDeleteUserError = DisplayableError & {
  __typename?: "PaymentTermsDeleteUserError"

  code?: Maybe<PaymentTermsDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PaymentTermsDeleteUserErrorCode {
  PaymentTermsDeleteUnsuccessful = "PAYMENT_TERMS_DELETE_UNSUCCESSFUL",
}

export type PaymentTermsInput = {
  paymentSchedules?: InputMaybe<Array<PaymentScheduleInput>>

  paymentTermsTemplateId?: InputMaybe<Scalars["ID"]["input"]>
}

export type PaymentTermsTemplate = Node & {
  __typename?: "PaymentTermsTemplate"

  description: Scalars["String"]["output"]

  dueInDays?: Maybe<Scalars["Int"]["output"]>

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  paymentTermsType: PaymentTermsType

  translatedName: Scalars["String"]["output"]
}

export enum PaymentTermsType {
  Fixed = "FIXED",

  Fulfillment = "FULFILLMENT",

  Net = "NET",

  Receipt = "RECEIPT",

  Unknown = "UNKNOWN",
}

export type PaymentTermsUpdateInput = {
  paymentTermsAttributes: PaymentTermsInput

  paymentTermsId: Scalars["ID"]["input"]
}

export type PaymentTermsUpdatePayload = {
  __typename?: "PaymentTermsUpdatePayload"

  paymentTerms?: Maybe<PaymentTerms>

  userErrors: Array<PaymentTermsUpdateUserError>
}

export type PaymentTermsUpdateUserError = DisplayableError & {
  __typename?: "PaymentTermsUpdateUserError"

  code?: Maybe<PaymentTermsUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PaymentTermsUpdateUserErrorCode {
  PaymentTermsUpdateUnsuccessful = "PAYMENT_TERMS_UPDATE_UNSUCCESSFUL",
}

export enum PaypalExpressSubscriptionsGatewayStatus {
  Disabled = "DISABLED",

  Enabled = "ENABLED",

  Pending = "PENDING",
}

export type PolarisVizDataPoint = {
  __typename?: "PolarisVizDataPoint"

  key: Scalars["String"]["output"]

  value?: Maybe<Scalars["String"]["output"]>
}

export type PolarisVizDataSeries = {
  __typename?: "PolarisVizDataSeries"

  data: Array<PolarisVizDataPoint>

  isComparison: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]
}

export type PolarisVizResponse = ShopifyqlResponse & {
  __typename?: "PolarisVizResponse"

  data: Array<PolarisVizDataSeries>

  parseErrors?: Maybe<Array<ParseError>>

  tableData?: Maybe<TableData>

  vizType: VisualizationType
}

export type PreparedFulfillmentOrderLineItemsInput = {
  fulfillmentOrderId: Scalars["ID"]["input"]
}

export enum PriceCalculationType {
  ComponentsSum = "COMPONENTS_SUM",

  Fixed = "FIXED",

  None = "NONE",
}

export type PriceInput = {
  calculation?: InputMaybe<PriceCalculationType>

  price?: InputMaybe<Scalars["Money"]["input"]>
}

export type PriceList = Node & {
  __typename?: "PriceList"

  catalog?: Maybe<Catalog>

  currency: CurrencyCode

  fixedPricesCount: Scalars["Int"]["output"]

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  parent?: Maybe<PriceListParent>

  prices: PriceListPriceConnection

  quantityRules: QuantityRuleConnection
}

export type PriceListPricesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  originType?: InputMaybe<PriceListPriceOriginType>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceListQuantityRulesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  originType?: InputMaybe<QuantityRuleOriginType>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceListAdjustment = {
  __typename?: "PriceListAdjustment"

  type: PriceListAdjustmentType

  value: Scalars["Float"]["output"]
}

export type PriceListAdjustmentInput = {
  type: PriceListAdjustmentType

  value: Scalars["Float"]["input"]
}

export type PriceListAdjustmentSettings = {
  __typename?: "PriceListAdjustmentSettings"

  compareAtMode: PriceListCompareAtMode
}

export type PriceListAdjustmentSettingsInput = {
  compareAtMode?: PriceListCompareAtMode
}

export enum PriceListAdjustmentType {
  PercentageDecrease = "PERCENTAGE_DECREASE",

  PercentageIncrease = "PERCENTAGE_INCREASE",
}

export enum PriceListCompareAtMode {
  Adjusted = "ADJUSTED",

  Nullify = "NULLIFY",
}

export type PriceListConnection = {
  __typename?: "PriceListConnection"

  edges: Array<PriceListEdge>

  nodes: Array<PriceList>

  pageInfo: PageInfo
}

export type PriceListCreateInput = {
  catalogId?: InputMaybe<Scalars["ID"]["input"]>

  currency: CurrencyCode

  name: Scalars["String"]["input"]

  parent: PriceListParentCreateInput
}

export type PriceListCreatePayload = {
  __typename?: "PriceListCreatePayload"

  priceList?: Maybe<PriceList>

  userErrors: Array<PriceListUserError>
}

export type PriceListDeletePayload = {
  __typename?: "PriceListDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<PriceListUserError>
}

export type PriceListEdge = {
  __typename?: "PriceListEdge"

  cursor: Scalars["String"]["output"]

  node: PriceList
}

export type PriceListFixedPricesAddPayload = {
  __typename?: "PriceListFixedPricesAddPayload"

  prices?: Maybe<Array<PriceListPrice>>

  userErrors: Array<PriceListPriceUserError>
}

export type PriceListFixedPricesByProductBulkUpdateUserError = DisplayableError & {
  __typename?: "PriceListFixedPricesByProductBulkUpdateUserError"

  code?: Maybe<PriceListFixedPricesByProductBulkUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PriceListFixedPricesByProductBulkUpdateUserErrorCode {
  DuplicateIdInInput = "DUPLICATE_ID_IN_INPUT",

  IdMustBeMutuallyExclusive = "ID_MUST_BE_MUTUALLY_EXCLUSIVE",

  NoUpdateOperationsSpecified = "NO_UPDATE_OPERATIONS_SPECIFIED",

  PricesToAddCurrencyMismatch = "PRICES_TO_ADD_CURRENCY_MISMATCH",

  PriceLimitExceeded = "PRICE_LIMIT_EXCEEDED",

  PriceListDoesNotExist = "PRICE_LIST_DOES_NOT_EXIST",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",
}

export type PriceListFixedPricesByProductUpdatePayload = {
  __typename?: "PriceListFixedPricesByProductUpdatePayload"

  priceList?: Maybe<PriceList>

  pricesToAddProducts?: Maybe<Array<Product>>

  pricesToDeleteProducts?: Maybe<Array<Product>>

  userErrors: Array<PriceListFixedPricesByProductBulkUpdateUserError>
}

export type PriceListFixedPricesDeletePayload = {
  __typename?: "PriceListFixedPricesDeletePayload"

  deletedFixedPriceVariantIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<PriceListPriceUserError>
}

export type PriceListFixedPricesUpdatePayload = {
  __typename?: "PriceListFixedPricesUpdatePayload"

  deletedFixedPriceVariantIds?: Maybe<Array<Scalars["ID"]["output"]>>

  priceList?: Maybe<PriceList>

  pricesAdded?: Maybe<Array<PriceListPrice>>

  userErrors: Array<PriceListPriceUserError>
}

export type PriceListParent = {
  __typename?: "PriceListParent"

  adjustment: PriceListAdjustment

  settings: PriceListAdjustmentSettings
}

export type PriceListParentCreateInput = {
  adjustment: PriceListAdjustmentInput

  settings?: InputMaybe<PriceListAdjustmentSettingsInput>
}

export type PriceListParentUpdateInput = {
  adjustment: PriceListAdjustmentInput

  settings?: InputMaybe<PriceListAdjustmentSettingsInput>
}

export type PriceListPrice = {
  __typename?: "PriceListPrice"

  compareAtPrice?: Maybe<MoneyV2>

  originType: PriceListPriceOriginType

  price: MoneyV2

  quantityPriceBreaks: QuantityPriceBreakConnection

  variant: ProductVariant
}

export type PriceListPriceQuantityPriceBreaksArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<QuantityPriceBreakSortKeys>
}

export type PriceListPriceConnection = {
  __typename?: "PriceListPriceConnection"

  edges: Array<PriceListPriceEdge>

  nodes: Array<PriceListPrice>

  pageInfo: PageInfo
}

export type PriceListPriceEdge = {
  __typename?: "PriceListPriceEdge"

  cursor: Scalars["String"]["output"]

  node: PriceListPrice
}

export type PriceListPriceInput = {
  compareAtPrice?: InputMaybe<MoneyInput>

  price: MoneyInput

  variantId: Scalars["ID"]["input"]
}

export enum PriceListPriceOriginType {
  Fixed = "FIXED",

  Relative = "RELATIVE",
}

export type PriceListPriceUserError = DisplayableError & {
  __typename?: "PriceListPriceUserError"

  code?: Maybe<PriceListPriceUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PriceListPriceUserErrorCode {
  Blank = "BLANK",

  PriceListCurrencyMismatch = "PRICE_LIST_CURRENCY_MISMATCH",

  PriceListNotFound = "PRICE_LIST_NOT_FOUND",

  PriceNotFixed = "PRICE_NOT_FIXED",

  VariantNotFound = "VARIANT_NOT_FOUND",
}

export type PriceListProductPriceInput = {
  price: MoneyInput

  productId: Scalars["ID"]["input"]
}

export enum PriceListSortKeys {
  Id = "ID",

  Name = "NAME",

  Relevance = "RELEVANCE",
}

export type PriceListUpdateInput = {
  catalogId?: InputMaybe<Scalars["ID"]["input"]>

  currency?: InputMaybe<CurrencyCode>

  name?: InputMaybe<Scalars["String"]["input"]>

  parent?: InputMaybe<PriceListParentUpdateInput>
}

export type PriceListUpdatePayload = {
  __typename?: "PriceListUpdatePayload"

  priceList?: Maybe<PriceList>

  userErrors: Array<PriceListUserError>
}

export type PriceListUserError = DisplayableError & {
  __typename?: "PriceListUserError"

  code?: Maybe<PriceListUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PriceListUserErrorCode {
  AppCatalogPriceListAssignment = "APP_CATALOG_PRICE_LIST_ASSIGNMENT",

  Blank = "BLANK",

  CatalogAssignmentNotAllowed = "CATALOG_ASSIGNMENT_NOT_ALLOWED",

  CatalogCannotChangeContextType = "CATALOG_CANNOT_CHANGE_CONTEXT_TYPE",

  CatalogContextDoesNotSupportQuantityPriceBreaks = "CATALOG_CONTEXT_DOES_NOT_SUPPORT_QUANTITY_PRICE_BREAKS",

  CatalogContextDoesNotSupportQuantityRules = "CATALOG_CONTEXT_DOES_NOT_SUPPORT_QUANTITY_RULES",

  CatalogDoesNotExist = "CATALOG_DOES_NOT_EXIST",

  CatalogMarketAndPriceListCurrencyMismatch = "CATALOG_MARKET_AND_PRICE_LIST_CURRENCY_MISMATCH",

  CatalogTaken = "CATALOG_TAKEN",

  ContextRuleCountriesLimit = "CONTEXT_RULE_COUNTRIES_LIMIT",

  ContextRuleCountryTaken = "CONTEXT_RULE_COUNTRY_TAKEN",

  ContextRuleLimitOneOption = "CONTEXT_RULE_LIMIT_ONE_OPTION",
  /**
   * Cannot save the price list with context rule because the limit of context rules per shop was reached.
   * @deprecated The limit is removed.
   */
  ContextRuleLimitReached = "CONTEXT_RULE_LIMIT_REACHED",

  ContextRuleMarketNotFound = "CONTEXT_RULE_MARKET_NOT_FOUND",

  ContextRuleMarketTaken = "CONTEXT_RULE_MARKET_TAKEN",

  CountryCurrencyMismatch = "COUNTRY_CURRENCY_MISMATCH",

  CountryPriceListAssignment = "COUNTRY_PRICE_LIST_ASSIGNMENT",

  CurrencyCountryMismatch = "CURRENCY_COUNTRY_MISMATCH",

  CurrencyMarketMismatch = "CURRENCY_MARKET_MISMATCH",

  CurrencyNotSupported = "CURRENCY_NOT_SUPPORTED",

  GenericError = "GENERIC_ERROR",

  Inclusion = "INCLUSION",

  InvalidAdjustmentMaxValue = "INVALID_ADJUSTMENT_MAX_VALUE",

  InvalidAdjustmentMinValue = "INVALID_ADJUSTMENT_MIN_VALUE",

  InvalidAdjustmentValue = "INVALID_ADJUSTMENT_VALUE",

  MarketCurrencyMismatch = "MARKET_CURRENCY_MISMATCH",

  PriceListLocked = "PRICE_LIST_LOCKED",

  PriceListNotAllowedForPrimaryMarket = "PRICE_LIST_NOT_ALLOWED_FOR_PRIMARY_MARKET",

  PriceListNotFound = "PRICE_LIST_NOT_FOUND",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",
}

export type PriceRule = CommentEventSubject &
  HasEvents &
  LegacyInteroperability &
  Node & {
    __typename?: "PriceRule"

    allocationLimit?: Maybe<Scalars["Int"]["output"]>

    allocationMethod: PriceRuleAllocationMethod

    app?: Maybe<App>

    combinesWith: DiscountCombinesWith

    createdAt: Scalars["DateTime"]["output"]

    customerSelection: PriceRuleCustomerSelection

    discountClass: DiscountClass

    discountCodes: PriceRuleDiscountCodeConnection

    discountCodesCount: Scalars["Int"]["output"]

    endsAt?: Maybe<Scalars["DateTime"]["output"]>
    /**
     * Quantity of prerequisite items required for the price rule to be applicable,  compared to quantity of entitled items.
     * @deprecated Use `prerequisiteToEntitlementQuantityRatio` instead.
     */
    entitlementToPrerequisiteQuantityRatio?: Maybe<PriceRuleEntitlementToPrerequisiteQuantityRatio>

    events: EventConnection

    features: Array<PriceRuleFeature>

    hasTimelineComment: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    itemEntitlements: PriceRuleItemEntitlements

    itemPrerequisites: PriceRuleLineItemPrerequisites

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    oncePerCustomer: Scalars["Boolean"]["output"]

    prerequisiteQuantityRange?: Maybe<PriceRuleQuantityRange>

    prerequisiteShippingPriceRange?: Maybe<PriceRuleMoneyRange>

    prerequisiteSubtotalRange?: Maybe<PriceRuleMoneyRange>

    prerequisiteToEntitlementQuantityRatio?: Maybe<PriceRulePrerequisiteToEntitlementQuantityRatio>

    shareableUrls: Array<PriceRuleShareableUrl>

    shippingEntitlements: PriceRuleShippingLineEntitlements

    startsAt: Scalars["DateTime"]["output"]

    status: PriceRuleStatus

    summary?: Maybe<Scalars["String"]["output"]>

    target: PriceRuleTarget

    title: Scalars["String"]["output"]

    totalSales?: Maybe<MoneyV2>
    /**
     * A list of the price rule's features.
     * @deprecated Use `features` instead.
     */
    traits: Array<PriceRuleTrait>

    usageCount: Scalars["Int"]["output"]

    usageLimit?: Maybe<Scalars["Int"]["output"]>

    validityPeriod: PriceRuleValidityPeriod
    /**
     * The value of the price rule.
     * @deprecated Use `valueV2` instead.
     */
    value: PriceRuleValue

    valueV2: PricingValue
  }

export type PriceRuleDiscountCodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DiscountCodeSortKeys>
}

export type PriceRuleEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<EventSortKeys>
}

export type PriceRuleActivatePayload = {
  __typename?: "PriceRuleActivatePayload"

  priceRule?: Maybe<PriceRule>

  priceRuleUserErrors: Array<PriceRuleUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export enum PriceRuleAllocationMethod {
  Across = "ACROSS",

  Each = "EACH",
}

export type PriceRuleConnection = {
  __typename?: "PriceRuleConnection"

  edges: Array<PriceRuleEdge>

  nodes: Array<PriceRule>

  pageInfo: PageInfo
}

export type PriceRuleCreatePayload = {
  __typename?: "PriceRuleCreatePayload"

  priceRule?: Maybe<PriceRule>

  priceRuleDiscountCode?: Maybe<PriceRuleDiscountCode>

  priceRuleUserErrors: Array<PriceRuleUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type PriceRuleCustomerSelection = {
  __typename?: "PriceRuleCustomerSelection"

  customers: CustomerConnection

  forAllCustomers: Scalars["Boolean"]["output"]

  segments: Array<Segment>
}

export type PriceRuleCustomerSelectionCustomersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<CustomerSortKeys>
}

export type PriceRuleCustomerSelectionInput = {
  customerIdsToAdd?: InputMaybe<Array<Scalars["ID"]["input"]>>

  customerIdsToRemove?: InputMaybe<Array<Scalars["ID"]["input"]>>

  forAllCustomers?: InputMaybe<Scalars["Boolean"]["input"]>

  segmentIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type PriceRuleDeactivatePayload = {
  __typename?: "PriceRuleDeactivatePayload"

  priceRule?: Maybe<PriceRule>

  priceRuleUserErrors: Array<PriceRuleUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type PriceRuleDeletePayload = {
  __typename?: "PriceRuleDeletePayload"

  deletedPriceRuleId?: Maybe<Scalars["ID"]["output"]>

  priceRuleUserErrors: Array<PriceRuleUserError>

  shop: Shop
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type PriceRuleDiscountCode = Node & {
  __typename?: "PriceRuleDiscountCode"

  app?: Maybe<App>

  code: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  usageCount: Scalars["Int"]["output"]
}

export type PriceRuleDiscountCodeConnection = {
  __typename?: "PriceRuleDiscountCodeConnection"

  edges: Array<PriceRuleDiscountCodeEdge>

  nodes: Array<PriceRuleDiscountCode>

  pageInfo: PageInfo
}

export type PriceRuleDiscountCodeCreatePayload = {
  __typename?: "PriceRuleDiscountCodeCreatePayload"

  priceRule?: Maybe<PriceRule>

  priceRuleDiscountCode?: Maybe<PriceRuleDiscountCode>

  priceRuleUserErrors: Array<PriceRuleUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type PriceRuleDiscountCodeEdge = {
  __typename?: "PriceRuleDiscountCodeEdge"

  cursor: Scalars["String"]["output"]

  node: PriceRuleDiscountCode
}

export type PriceRuleDiscountCodeInput = {
  code?: InputMaybe<Scalars["String"]["input"]>
}

export type PriceRuleDiscountCodeUpdatePayload = {
  __typename?: "PriceRuleDiscountCodeUpdatePayload"

  priceRule?: Maybe<PriceRule>

  priceRuleDiscountCode?: Maybe<PriceRuleDiscountCode>

  priceRuleUserErrors: Array<PriceRuleUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type PriceRuleEdge = {
  __typename?: "PriceRuleEdge"

  cursor: Scalars["String"]["output"]

  node: PriceRule
}

export type PriceRuleEntitlementToPrerequisiteQuantityRatio = {
  __typename?: "PriceRuleEntitlementToPrerequisiteQuantityRatio"

  entitlementQuantity: Scalars["Int"]["output"]

  prerequisiteQuantity: Scalars["Int"]["output"]
}

export type PriceRuleEntitlementToPrerequisiteQuantityRatioInput = {
  entitlementQuantity?: InputMaybe<Scalars["Int"]["input"]>

  prerequisiteQuantity?: InputMaybe<Scalars["Int"]["input"]>
}

export enum PriceRuleErrorCode {
  AllocationMethodMustBeAcrossForGivenTargetSelection = "ALLOCATION_METHOD_MUST_BE_ACROSS_FOR_GIVEN_TARGET_SELECTION",

  AppliesOnNothing = "APPLIES_ON_NOTHING",

  Blank = "BLANK",

  BogoInvalidTargetSelection = "BOGO_INVALID_TARGET_SELECTION",

  BogoInvalidTargetType = "BOGO_INVALID_TARGET_TYPE",

  BogoInvalidValueType = "BOGO_INVALID_VALUE_TYPE",

  BothCustomerAndSavedSearchPrerequisitesSelected = "BOTH_CUSTOMER_AND_SAVED_SEARCH_PREREQUISITES_SELECTED",

  BothCustomerAndSegmentPrerequisitesSelected = "BOTH_CUSTOMER_AND_SEGMENT_PREREQUISITES_SELECTED",

  BothSavedSearchAndSegmentPrerequisitesSelected = "BOTH_SAVED_SEARCH_AND_SEGMENT_PREREQUISITES_SELECTED",

  CannotEntitleCollectionsWithProductsOrVariants = "CANNOT_ENTITLE_COLLECTIONS_WITH_PRODUCTS_OR_VARIANTS",

  CannotPrerequisiteCollectionWithProductOrVariants = "CANNOT_PREREQUISITE_COLLECTION_WITH_PRODUCT_OR_VARIANTS",

  CustomerPrerequisitesExceededMax = "CUSTOMER_PREREQUISITES_EXCEEDED_MAX",

  CustomerPrerequisitesInvalidSelection = "CUSTOMER_PREREQUISITES_INVALID_SELECTION",

  CustomerPrerequisitesMissing = "CUSTOMER_PREREQUISITES_MISSING",

  CustomerPrerequisiteDuplicate = "CUSTOMER_PREREQUISITE_DUPLICATE",

  CustomerSavedSearchDuplicate = "CUSTOMER_SAVED_SEARCH_DUPLICATE",

  CustomerSavedSearchExceededMax = "CUSTOMER_SAVED_SEARCH_EXCEEDED_MAX",

  CustomerSavedSearchInvalid = "CUSTOMER_SAVED_SEARCH_INVALID",

  CustomerSegmentExceededMax = "CUSTOMER_SEGMENT_EXCEEDED_MAX",

  CustomerSegmentInvalid = "CUSTOMER_SEGMENT_INVALID",

  CustomerSegmentPrerequisiteDuplicate = "CUSTOMER_SEGMENT_PREREQUISITE_DUPLICATE",

  DiscountCodeDuplicate = "DISCOUNT_CODE_DUPLICATE",

  EndDateBeforeStartDate = "END_DATE_BEFORE_START_DATE",

  EqualTo = "EQUAL_TO",

  ExceededMax = "EXCEEDED_MAX",

  GreaterThan = "GREATER_THAN",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  InvalidCombinesWithForDiscountClass = "INVALID_COMBINES_WITH_FOR_DISCOUNT_CLASS",

  InvalidDiscountClassForPriceRule = "INVALID_DISCOUNT_CLASS_FOR_PRICE_RULE",

  InvalidTargetTypePrerequisiteShippingPriceRange = "INVALID_TARGET_TYPE_PREREQUISITE_SHIPPING_PRICE_RANGE",

  ItemEntitlementsDuplicateCollection = "ITEM_ENTITLEMENTS_DUPLICATE_COLLECTION",

  ItemEntitlementsDuplicateProduct = "ITEM_ENTITLEMENTS_DUPLICATE_PRODUCT",

  ItemEntitlementsDuplicateVariant = "ITEM_ENTITLEMENTS_DUPLICATE_VARIANT",

  ItemEntitlementsExceededMaxCollection = "ITEM_ENTITLEMENTS_EXCEEDED_MAX_COLLECTION",

  ItemEntitlementsExceededMaxProduct = "ITEM_ENTITLEMENTS_EXCEEDED_MAX_PRODUCT",

  ItemEntitlementsExceededMaxVariant = "ITEM_ENTITLEMENTS_EXCEEDED_MAX_VARIANT",

  ItemEntitlementsInvalidCollection = "ITEM_ENTITLEMENTS_INVALID_COLLECTION",

  ItemEntitlementsInvalidProduct = "ITEM_ENTITLEMENTS_INVALID_PRODUCT",

  ItemEntitlementsInvalidTargetTypeOrSelection = "ITEM_ENTITLEMENTS_INVALID_TARGET_TYPE_OR_SELECTION",

  ItemEntitlementsInvalidVariant = "ITEM_ENTITLEMENTS_INVALID_VARIANT",

  ItemEntitlementsMissing = "ITEM_ENTITLEMENTS_MISSING",

  ItemEntitlementInvalidType = "ITEM_ENTITLEMENT_INVALID_TYPE",

  ItemPrerequisitesDuplicateCollection = "ITEM_PREREQUISITES_DUPLICATE_COLLECTION",

  ItemPrerequisitesDuplicateProduct = "ITEM_PREREQUISITES_DUPLICATE_PRODUCT",

  ItemPrerequisitesDuplicateVariant = "ITEM_PREREQUISITES_DUPLICATE_VARIANT",

  ItemPrerequisitesExceededMax = "ITEM_PREREQUISITES_EXCEEDED_MAX",

  ItemPrerequisitesInvalidCollection = "ITEM_PREREQUISITES_INVALID_COLLECTION",

  ItemPrerequisitesInvalidProduct = "ITEM_PREREQUISITES_INVALID_PRODUCT",

  ItemPrerequisitesInvalidType = "ITEM_PREREQUISITES_INVALID_TYPE",

  ItemPrerequisitesInvalidVariant = "ITEM_PREREQUISITES_INVALID_VARIANT",

  ItemPrerequisitesMissing = "ITEM_PREREQUISITES_MISSING",

  ItemPrerequisitesMustBeEmpty = "ITEM_PREREQUISITES_MUST_BE_EMPTY",

  LessThan = "LESS_THAN",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  MissingArgument = "MISSING_ARGUMENT",

  MultipleRecurringCycleLimitForNonSubscriptionItems = "MULTIPLE_RECURRING_CYCLE_LIMIT_FOR_NON_SUBSCRIPTION_ITEMS",

  PrerequisiteSubtotalAndQuantityRangeBothPresent = "PREREQUISITE_SUBTOTAL_AND_QUANTITY_RANGE_BOTH_PRESENT",

  PriceRuleAllocationLimitIsZero = "PRICE_RULE_ALLOCATION_LIMIT_IS_ZERO",

  PriceRuleAllocationLimitOnNonBogo = "PRICE_RULE_ALLOCATION_LIMIT_ON_NON_BOGO",

  PriceRuleExceededMaxDiscountCode = "PRICE_RULE_EXCEEDED_MAX_DISCOUNT_CODE",

  PriceRulePercentageValueOutsideRange = "PRICE_RULE_PERCENTAGE_VALUE_OUTSIDE_RANGE",

  ShippingEntitlementsDuplicateCountry = "SHIPPING_ENTITLEMENTS_DUPLICATE_COUNTRY",

  ShippingEntitlementsExceededMax = "SHIPPING_ENTITLEMENTS_EXCEEDED_MAX",

  ShippingEntitlementsInvalidCountry = "SHIPPING_ENTITLEMENTS_INVALID_COUNTRY",

  ShippingEntitlementsInvalidTargetTypeOrSelection = "SHIPPING_ENTITLEMENTS_INVALID_TARGET_TYPE_OR_SELECTION",

  ShippingEntitlementsMissing = "SHIPPING_ENTITLEMENTS_MISSING",

  ShippingEntitlementsUnsupportedDestinationType = "SHIPPING_ENTITLEMENTS_UNSUPPORTED_DESTINATION_TYPE",

  ShopExceededMaxPriceRules = "SHOP_EXCEEDED_MAX_PRICE_RULES",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooManyArguments = "TOO_MANY_ARGUMENTS",

  TooShort = "TOO_SHORT",

  VariantAlreadyEntitledThroughProduct = "VARIANT_ALREADY_ENTITLED_THROUGH_PRODUCT",
}

export enum PriceRuleFeature {
  Bulk = "BULK",

  BuyOneGetOne = "BUY_ONE_GET_ONE",

  BuyOneGetOneWithAllocationLimit = "BUY_ONE_GET_ONE_WITH_ALLOCATION_LIMIT",

  QuantityDiscounts = "QUANTITY_DISCOUNTS",

  SpecificCustomers = "SPECIFIC_CUSTOMERS",
}

export type PriceRuleFixedAmountValue = {
  __typename?: "PriceRuleFixedAmountValue"

  amount: Scalars["Money"]["output"]
}

export type PriceRuleInput = {
  allocationLimit?: InputMaybe<Scalars["Int"]["input"]>

  allocationMethod?: InputMaybe<PriceRuleAllocationMethod>

  combinesWith?: InputMaybe<DiscountCombinesWithInput>

  customerSelection?: InputMaybe<PriceRuleCustomerSelectionInput>

  itemEntitlements?: InputMaybe<PriceRuleItemEntitlementsInput>

  itemPrerequisites?: InputMaybe<PriceRuleItemPrerequisitesInput>

  oncePerCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  prerequisiteQuantityRange?: InputMaybe<PriceRuleQuantityRangeInput>

  prerequisiteShippingPriceRange?: InputMaybe<PriceRuleMoneyRangeInput>

  prerequisiteSubtotalRange?: InputMaybe<PriceRuleMoneyRangeInput>

  prerequisiteToEntitlementQuantityRatio?: InputMaybe<PriceRulePrerequisiteToEntitlementQuantityRatioInput>

  shippingEntitlements?: InputMaybe<PriceRuleShippingEntitlementsInput>

  target?: InputMaybe<PriceRuleTarget>

  title?: InputMaybe<Scalars["String"]["input"]>

  usageLimit?: InputMaybe<Scalars["Int"]["input"]>

  validityPeriod?: InputMaybe<PriceRuleValidityPeriodInput>

  value?: InputMaybe<PriceRuleValueInput>
}

export type PriceRuleItemEntitlements = {
  __typename?: "PriceRuleItemEntitlements"

  collections: CollectionConnection

  productVariants: ProductVariantConnection

  products: ProductConnection

  targetAllLineItems: Scalars["Boolean"]["output"]
}

export type PriceRuleItemEntitlementsCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleItemEntitlementsProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleItemEntitlementsProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleItemEntitlementsInput = {
  collectionIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productVariantIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  targetAllLineItems?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleItemPrerequisitesInput = {
  collectionIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productVariantIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type PriceRuleLineItemPrerequisites = {
  __typename?: "PriceRuleLineItemPrerequisites"

  collections: CollectionConnection

  productVariants: ProductVariantConnection

  products: ProductConnection
}

export type PriceRuleLineItemPrerequisitesCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleLineItemPrerequisitesProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleLineItemPrerequisitesProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleMoneyRange = {
  __typename?: "PriceRuleMoneyRange"

  greaterThan?: Maybe<Scalars["Money"]["output"]>

  greaterThanOrEqualTo?: Maybe<Scalars["Money"]["output"]>

  lessThan?: Maybe<Scalars["Money"]["output"]>

  lessThanOrEqualTo?: Maybe<Scalars["Money"]["output"]>
}

export type PriceRuleMoneyRangeInput = {
  greaterThan?: InputMaybe<Scalars["Money"]["input"]>

  greaterThanOrEqualTo?: InputMaybe<Scalars["Money"]["input"]>

  lessThan?: InputMaybe<Scalars["Money"]["input"]>

  lessThanOrEqualTo?: InputMaybe<Scalars["Money"]["input"]>
}

export type PriceRulePercentValue = {
  __typename?: "PriceRulePercentValue"

  percentage: Scalars["Float"]["output"]
}

export type PriceRulePrerequisiteToEntitlementQuantityRatio = {
  __typename?: "PriceRulePrerequisiteToEntitlementQuantityRatio"

  entitlementQuantity: Scalars["Int"]["output"]

  prerequisiteQuantity: Scalars["Int"]["output"]
}

export type PriceRulePrerequisiteToEntitlementQuantityRatioInput = {
  entitlementQuantity?: InputMaybe<Scalars["Int"]["input"]>

  prerequisiteQuantity?: InputMaybe<Scalars["Int"]["input"]>
}

export type PriceRuleQuantityRange = {
  __typename?: "PriceRuleQuantityRange"

  greaterThan?: Maybe<Scalars["Int"]["output"]>

  greaterThanOrEqualTo?: Maybe<Scalars["Int"]["output"]>

  lessThan?: Maybe<Scalars["Int"]["output"]>

  lessThanOrEqualTo?: Maybe<Scalars["Int"]["output"]>
}

export type PriceRuleQuantityRangeInput = {
  greaterThan?: InputMaybe<Scalars["Int"]["input"]>

  greaterThanOrEqualTo?: InputMaybe<Scalars["Int"]["input"]>

  lessThan?: InputMaybe<Scalars["Int"]["input"]>

  lessThanOrEqualTo?: InputMaybe<Scalars["Int"]["input"]>
}

export type PriceRuleShareableUrl = {
  __typename?: "PriceRuleShareableUrl"

  targetItemImage?: Maybe<Image>

  targetType: PriceRuleShareableUrlTargetType

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export enum PriceRuleShareableUrlTargetType {
  Collection = "COLLECTION",

  Home = "HOME",

  Product = "PRODUCT",
}

export type PriceRuleShippingEntitlementsInput = {
  countryCodes?: InputMaybe<Array<CountryCode>>

  includeRestOfWorld?: InputMaybe<Scalars["Boolean"]["input"]>

  targetAllShippingLines?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PriceRuleShippingLineEntitlements = {
  __typename?: "PriceRuleShippingLineEntitlements"

  countryCodes: Array<CountryCode>

  includeRestOfWorld: Scalars["Boolean"]["output"]

  targetAllShippingLines: Scalars["Boolean"]["output"]
}

export enum PriceRuleSortKeys {
  CreatedAt = "CREATED_AT",

  EndsAt = "ENDS_AT",

  Id = "ID",

  Relevance = "RELEVANCE",

  StartsAt = "STARTS_AT",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",
}

export enum PriceRuleStatus {
  Active = "ACTIVE",

  Expired = "EXPIRED",

  Scheduled = "SCHEDULED",
}

export enum PriceRuleTarget {
  LineItem = "LINE_ITEM",

  ShippingLine = "SHIPPING_LINE",
}

export enum PriceRuleTrait {
  Bulk = "BULK",

  BuyOneGetOne = "BUY_ONE_GET_ONE",

  BuyOneGetOneWithAllocationLimit = "BUY_ONE_GET_ONE_WITH_ALLOCATION_LIMIT",

  QuantityDiscounts = "QUANTITY_DISCOUNTS",

  SpecificCustomers = "SPECIFIC_CUSTOMERS",
}

export type PriceRuleUpdatePayload = {
  __typename?: "PriceRuleUpdatePayload"

  priceRule?: Maybe<PriceRule>

  priceRuleDiscountCode?: Maybe<PriceRuleDiscountCode>

  priceRuleUserErrors: Array<PriceRuleUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `priceRuleUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type PriceRuleUserError = DisplayableError & {
  __typename?: "PriceRuleUserError"

  code?: Maybe<PriceRuleErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type PriceRuleValidityPeriod = {
  __typename?: "PriceRuleValidityPeriod"

  end?: Maybe<Scalars["DateTime"]["output"]>

  start: Scalars["DateTime"]["output"]
}

export type PriceRuleValidityPeriodInput = {
  end?: InputMaybe<Scalars["DateTime"]["input"]>

  start: Scalars["DateTime"]["input"]
}

export type PriceRuleValue = PriceRuleFixedAmountValue | PriceRulePercentValue

export type PriceRuleValueInput = {
  fixedAmountValue?: InputMaybe<Scalars["Money"]["input"]>

  percentageValue?: InputMaybe<Scalars["Float"]["input"]>
}

export type PricingPercentageValue = {
  __typename?: "PricingPercentageValue"

  percentage: Scalars["Float"]["output"]
}

export type PricingValue = MoneyV2 | PricingPercentageValue

export type PrivateMetafield = Node & {
  __typename?: "PrivateMetafield"

  createdAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  key: Scalars["String"]["output"]

  namespace: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]

  value: Scalars["String"]["output"]

  valueType: PrivateMetafieldValueType
}

export type PrivateMetafieldConnection = {
  __typename?: "PrivateMetafieldConnection"

  edges: Array<PrivateMetafieldEdge>

  nodes: Array<PrivateMetafield>

  pageInfo: PageInfo
}

export type PrivateMetafieldDeleteInput = {
  key: Scalars["String"]["input"]

  namespace: Scalars["String"]["input"]

  owner?: InputMaybe<Scalars["ID"]["input"]>
}

export type PrivateMetafieldDeletePayload = {
  __typename?: "PrivateMetafieldDeletePayload"

  deletedPrivateMetafieldId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type PrivateMetafieldEdge = {
  __typename?: "PrivateMetafieldEdge"

  cursor: Scalars["String"]["output"]

  node: PrivateMetafield
}

export type PrivateMetafieldInput = {
  key: Scalars["String"]["input"]

  namespace: Scalars["String"]["input"]

  owner?: InputMaybe<Scalars["ID"]["input"]>

  valueInput: PrivateMetafieldValueInput
}

export type PrivateMetafieldUpsertPayload = {
  __typename?: "PrivateMetafieldUpsertPayload"

  privateMetafield?: Maybe<PrivateMetafield>

  userErrors: Array<UserError>
}

export type PrivateMetafieldValueInput = {
  value: Scalars["String"]["input"]

  valueType: PrivateMetafieldValueType
}

export enum PrivateMetafieldValueType {
  Integer = "INTEGER",

  JsonString = "JSON_STRING",

  String = "STRING",
}

export type Product = HasMetafieldDefinitions &
  HasMetafields &
  HasPublishedTranslations &
  LegacyInteroperability &
  Navigable &
  Node &
  OnlineStorePreviewable &
  Publishable & {
    __typename?: "Product"

    availablePublicationCount: Scalars["Int"]["output"]
    /**
     * The description of the product, complete with HTML formatting.
     * @deprecated Use `descriptionHtml` instead.
     */
    bodyHtml?: Maybe<Scalars["String"]["output"]>

    collections: CollectionConnection

    compareAtPriceRange?: Maybe<ProductCompareAtPriceRange>

    contextualPricing: ProductContextualPricing

    createdAt: Scalars["DateTime"]["output"]
    /**
     * The custom product type specified by the merchant.
     * @deprecated Deprecated in API version 2022-10. Use `productType` instead.
     */
    customProductType?: Maybe<Scalars["String"]["output"]>

    defaultCursor: Scalars["String"]["output"]

    description: Scalars["String"]["output"]

    descriptionHtml: Scalars["HTML"]["output"]
    /**
     * Stripped description of the product, single line with HTML tags removed.
     * Truncated to 60 characters.
     *
     * @deprecated Use `description` instead.
     */
    descriptionPlainSummary: Scalars["String"]["output"]

    featuredImage?: Maybe<Image>

    featuredMedia?: Maybe<Media>

    feedback?: Maybe<ResourceFeedback>

    giftCardTemplateSuffix?: Maybe<Scalars["String"]["output"]>

    handle: Scalars["String"]["output"]

    hasOnlyDefaultVariant: Scalars["Boolean"]["output"]

    hasOutOfStockVariants: Scalars["Boolean"]["output"]

    hasVariantsThatRequiresComponents: Scalars["Boolean"]["output"]

    id: Scalars["ID"]["output"]

    images: ImageConnection

    inCollection: Scalars["Boolean"]["output"]

    isGiftCard: Scalars["Boolean"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    media: MediaConnection

    mediaCount: Scalars["Int"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    onlineStorePreviewUrl?: Maybe<Scalars["URL"]["output"]>

    onlineStoreUrl?: Maybe<Scalars["URL"]["output"]>

    options: Array<ProductOption>
    /**
     * The price range of the product.
     * @deprecated Deprecated in API version 2020-10. Use `priceRangeV2` instead.
     */
    priceRange: ProductPriceRange

    priceRangeV2: ProductPriceRangeV2
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    productCategory?: Maybe<ProductCategory>
    /**
     * A list of the channels where the product is published.
     * @deprecated Use `resourcePublications` instead.
     */
    productPublications: ProductPublicationConnection

    productType: Scalars["String"]["output"]

    publicationCount: Scalars["Int"]["output"]
    /**
     * A list of the channels where the product is published.
     * @deprecated Use `resourcePublications` instead.
     */
    publications: ProductPublicationConnection

    publishedAt?: Maybe<Scalars["DateTime"]["output"]>

    publishedInContext: Scalars["Boolean"]["output"]
    /**
     * Check to see whether the resource is published to a given channel.
     * @deprecated Use `publishedOnPublication` instead.
     */
    publishedOnChannel: Scalars["Boolean"]["output"]
    /**
     * Check to see whether the resource is published to the calling app's channel.
     * @deprecated Use `publishedOnCurrentPublication` instead.
     */
    publishedOnCurrentChannel: Scalars["Boolean"]["output"]

    publishedOnCurrentPublication: Scalars["Boolean"]["output"]

    publishedOnPublication: Scalars["Boolean"]["output"]

    requiresSellingPlan: Scalars["Boolean"]["output"]

    resourcePublicationOnCurrentPublication?: Maybe<ResourcePublicationV2>

    resourcePublications: ResourcePublicationConnection

    resourcePublicationsV2: ResourcePublicationV2Connection

    sellingPlanGroupCount: Scalars["Int"]["output"]

    sellingPlanGroups: SellingPlanGroupConnection

    seo: Seo
    /**
     * The standardized product type in the Shopify product taxonomy.
     * @deprecated Deprecated in API version 2022-10. Use `productCategory` instead.
     */
    standardizedProductType?: Maybe<StandardizedProductType>

    status: ProductStatus
    /**
     * The Storefront GraphQL API ID of the `Product`.
     *
     * As of the `2022-04` version release, the Storefront GraphQL API will no longer return Base64 encoded IDs to match the behavior of the Admin GraphQL API. Therefore, you can safely use the `id` field's value instead.
     *
     * @deprecated Use `id` instead.
     */
    storefrontId: Scalars["StorefrontID"]["output"]

    tags: Array<Scalars["String"]["output"]>

    templateSuffix?: Maybe<Scalars["String"]["output"]>

    title: Scalars["String"]["output"]

    totalInventory: Scalars["Int"]["output"]

    totalVariants: Scalars["Int"]["output"]

    tracksInventory: Scalars["Boolean"]["output"]

    translations: Array<Translation>
    /**
     * The list of channels that the resource is not published to.
     * @deprecated Use `unpublishedPublications` instead.
     */
    unpublishedChannels: ChannelConnection

    unpublishedPublications: PublicationConnection

    updatedAt: Scalars["DateTime"]["output"]

    variants: ProductVariantConnection

    vendor: Scalars["String"]["output"]
  }

export type ProductCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CollectionSortKeys>
}

export type ProductContextualPricingArgs = {
  context: ContextualPricingContext
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

export type ProductInCollectionArgs = {
  id: Scalars["ID"]["input"]
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

export type ProductMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type ProductMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductOptionsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type ProductPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type ProductPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductProductPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductPublicationCountArgs = {
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductPublishedInContextArgs = {
  context: ContextualPublicationContext
}

export type ProductPublishedOnChannelArgs = {
  channelId: Scalars["ID"]["input"]
}

export type ProductPublishedOnPublicationArgs = {
  publicationId: Scalars["ID"]["input"]
}

export type ProductResourcePublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductResourcePublicationsV2Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  catalogType?: InputMaybe<CatalogType>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type ProductUnpublishedChannelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductUnpublishedPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductVariantSortKeys>
}

export type ProductAppendImagesInput = {
  id: Scalars["ID"]["input"]

  images: Array<ImageInput>
}

export type ProductAppendImagesPayload = {
  __typename?: "ProductAppendImagesPayload"

  newImages?: Maybe<Array<Image>>

  product?: Maybe<Product>

  userErrors: Array<UserError>
}

export type ProductCategory = {
  __typename?: "ProductCategory"

  productTaxonomyNode?: Maybe<ProductTaxonomyNode>
}

export type ProductCategoryInput = {
  productTaxonomyNodeId: Scalars["ID"]["input"]
}

export type ProductChangeStatusPayload = {
  __typename?: "ProductChangeStatusPayload"

  product?: Maybe<Product>

  userErrors: Array<ProductChangeStatusUserError>
}

export type ProductChangeStatusUserError = DisplayableError & {
  __typename?: "ProductChangeStatusUserError"

  code?: Maybe<ProductChangeStatusUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductChangeStatusUserErrorCode {
  ProductNotFound = "PRODUCT_NOT_FOUND",
}

export type ProductClaimOwnershipInput = {
  bundles?: InputMaybe<Scalars["Boolean"]["input"]>
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

export type ProductCompareAtPriceRange = {
  __typename?: "ProductCompareAtPriceRange"

  maxVariantCompareAtPrice: MoneyV2

  minVariantCompareAtPrice: MoneyV2
}

export type ProductConnection = {
  __typename?: "ProductConnection"

  edges: Array<ProductEdge>

  nodes: Array<Product>

  pageInfo: PageInfo
}

export type ProductContextualPricing = {
  __typename?: "ProductContextualPricing"

  fixedQuantityRulesCount: Scalars["Int"]["output"]

  maxVariantPricing?: Maybe<ProductVariantContextualPricing>

  minVariantPricing?: Maybe<ProductVariantContextualPricing>

  priceRange: ProductPriceRangeV2
}

export type ProductCreateMediaPayload = {
  __typename?: "ProductCreateMediaPayload"

  media?: Maybe<Array<Media>>

  mediaUserErrors: Array<MediaUserError>

  product?: Maybe<Product>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `mediaUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type ProductCreatePayload = {
  __typename?: "ProductCreatePayload"

  product?: Maybe<Product>

  shop: Shop

  userErrors: Array<UserError>
}

export type ProductDeleteAsyncPayload = {
  __typename?: "ProductDeleteAsyncPayload"

  deleteProductId?: Maybe<Scalars["ID"]["output"]>

  job?: Maybe<Job>

  userErrors: Array<ProductDeleteUserError>
}

export type ProductDeleteImagesPayload = {
  __typename?: "ProductDeleteImagesPayload"

  deletedImageIds: Array<Scalars["ID"]["output"]>

  product?: Maybe<Product>

  userErrors: Array<UserError>
}

export type ProductDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type ProductDeleteMediaPayload = {
  __typename?: "ProductDeleteMediaPayload"

  deletedMediaIds?: Maybe<Array<Scalars["ID"]["output"]>>

  deletedProductImageIds?: Maybe<Array<Scalars["ID"]["output"]>>

  mediaUserErrors: Array<MediaUserError>

  product?: Maybe<Product>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `mediaUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type ProductDeletePayload = {
  __typename?: "ProductDeletePayload"

  deletedProductId?: Maybe<Scalars["ID"]["output"]>

  shop: Shop

  userErrors: Array<UserError>
}

export type ProductDeleteUserError = DisplayableError & {
  __typename?: "ProductDeleteUserError"

  code?: Maybe<ProductDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductDeleteUserErrorCode {
  GenericError = "GENERIC_ERROR",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",
}

export type ProductDuplicateAsyncInput = {
  includeImages?: InputMaybe<Scalars["Boolean"]["input"]>

  newStatus?: InputMaybe<ProductStatus>

  newTitle: Scalars["String"]["input"]

  productId: Scalars["ID"]["input"]
}

export type ProductDuplicateAsyncPayload = {
  __typename?: "ProductDuplicateAsyncPayload"

  duplicatedProductId?: Maybe<Scalars["ID"]["output"]>

  job?: Maybe<Job>

  userErrors: Array<ProductDuplicateUserError>
}

export type ProductDuplicateAsyncV2Payload = {
  __typename?: "ProductDuplicateAsyncV2Payload"

  duplicatedProductId?: Maybe<Scalars["ID"]["output"]>

  productDuplicateJobId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<ProductDuplicateUserError>
}

export type ProductDuplicateJob = {
  __typename?: "ProductDuplicateJob"

  done: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]
}

export type ProductDuplicatePayload = {
  __typename?: "ProductDuplicatePayload"

  imageJob?: Maybe<Job>

  newProduct?: Maybe<Product>

  shop: Shop

  userErrors: Array<UserError>
}

export type ProductDuplicateUserError = DisplayableError & {
  __typename?: "ProductDuplicateUserError"

  code?: Maybe<ProductDuplicateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductDuplicateUserErrorCode {
  BundlesError = "BUNDLES_ERROR",

  EmptyTitle = "EMPTY_TITLE",

  EmptyVariant = "EMPTY_VARIANT",

  FailedToSave = "FAILED_TO_SAVE",

  GenericError = "GENERIC_ERROR",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",
}

export type ProductEdge = {
  __typename?: "ProductEdge"

  cursor: Scalars["String"]["output"]

  node: Product
}

export type ProductFeed = Node & {
  __typename?: "ProductFeed"

  country?: Maybe<CountryCode>

  id: Scalars["ID"]["output"]

  language?: Maybe<LanguageCode>

  status: ProductFeedStatus
}

export type ProductFeedConnection = {
  __typename?: "ProductFeedConnection"

  edges: Array<ProductFeedEdge>

  nodes: Array<ProductFeed>

  pageInfo: PageInfo
}

export type ProductFeedCreatePayload = {
  __typename?: "ProductFeedCreatePayload"

  productFeed?: Maybe<ProductFeed>

  userErrors: Array<ProductFeedCreateUserError>
}

export type ProductFeedCreateUserError = DisplayableError & {
  __typename?: "ProductFeedCreateUserError"

  code?: Maybe<ProductFeedCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductFeedCreateUserErrorCode {
  Invalid = "INVALID",

  Taken = "TAKEN",
}

export type ProductFeedDeletePayload = {
  __typename?: "ProductFeedDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<ProductFeedDeleteUserError>
}

export type ProductFeedDeleteUserError = DisplayableError & {
  __typename?: "ProductFeedDeleteUserError"

  code?: Maybe<ProductFeedDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductFeedDeleteUserErrorCode {
  Invalid = "INVALID",
}

export type ProductFeedEdge = {
  __typename?: "ProductFeedEdge"

  cursor: Scalars["String"]["output"]

  node: ProductFeed
}

export type ProductFeedInput = {
  country: CountryCode

  language: LanguageCode
}

export enum ProductFeedStatus {
  Active = "ACTIVE",

  Inactive = "INACTIVE",
}

export type ProductFullSyncPayload = {
  __typename?: "ProductFullSyncPayload"

  userErrors: Array<ProductFullSyncUserError>
}

export type ProductFullSyncUserError = DisplayableError & {
  __typename?: "ProductFullSyncUserError"

  code?: Maybe<ProductFullSyncUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductFullSyncUserErrorCode {
  Invalid = "INVALID",
}

export enum ProductImageSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Position = "POSITION",

  Relevance = "RELEVANCE",
}

export type ProductImageUpdatePayload = {
  __typename?: "ProductImageUpdatePayload"

  image?: Maybe<Image>

  userErrors: Array<UserError>
}

export type ProductInput = {
  claimOwnership?: InputMaybe<ProductClaimOwnershipInput>

  collectionsToJoin?: InputMaybe<Array<Scalars["ID"]["input"]>>

  collectionsToLeave?: InputMaybe<Array<Scalars["ID"]["input"]>>

  customProductType?: InputMaybe<Scalars["String"]["input"]>

  descriptionHtml?: InputMaybe<Scalars["String"]["input"]>

  giftCard?: InputMaybe<Scalars["Boolean"]["input"]>

  giftCardTemplateSuffix?: InputMaybe<Scalars["String"]["input"]>

  handle?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>

  options?: InputMaybe<Array<Scalars["String"]["input"]>>

  productCategory?: InputMaybe<ProductCategoryInput>

  productType?: InputMaybe<Scalars["String"]["input"]>

  redirectNewHandle?: InputMaybe<Scalars["Boolean"]["input"]>

  requiresSellingPlan?: InputMaybe<Scalars["Boolean"]["input"]>

  seo?: InputMaybe<SeoInput>

  standardizedProductType?: InputMaybe<StandardizedProductTypeInput>

  status?: InputMaybe<ProductStatus>

  tags?: InputMaybe<Array<Scalars["String"]["input"]>>

  templateSuffix?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  variants?: InputMaybe<Array<ProductVariantInput>>

  vendor?: InputMaybe<Scalars["String"]["input"]>
}

export type ProductJoinSellingPlanGroupsPayload = {
  __typename?: "ProductJoinSellingPlanGroupsPayload"

  product?: Maybe<Product>

  userErrors: Array<SellingPlanGroupUserError>
}

export type ProductLeaveSellingPlanGroupsPayload = {
  __typename?: "ProductLeaveSellingPlanGroupsPayload"

  product?: Maybe<Product>

  userErrors: Array<SellingPlanGroupUserError>
}

export enum ProductMediaSortKeys {
  Id = "ID",

  Position = "POSITION",

  Relevance = "RELEVANCE",
}

export type ProductOption = HasPublishedTranslations &
  Node & {
    __typename?: "ProductOption"

    id: Scalars["ID"]["output"]

    name: Scalars["String"]["output"]

    position: Scalars["Int"]["output"]

    translations: Array<Translation>

    values: Array<Scalars["String"]["output"]>
  }

export type ProductOptionTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type ProductPriceRange = {
  __typename?: "ProductPriceRange"

  maxVariantPrice: MoneyV2

  minVariantPrice: MoneyV2
}

export type ProductPriceRangeV2 = {
  __typename?: "ProductPriceRangeV2"

  maxVariantPrice: MoneyV2

  minVariantPrice: MoneyV2
}

export type ProductPublication = {
  __typename?: "ProductPublication"

  channel: Channel

  isPublished: Scalars["Boolean"]["output"]

  product: Product

  publishDate?: Maybe<Scalars["DateTime"]["output"]>
}

export type ProductPublicationConnection = {
  __typename?: "ProductPublicationConnection"

  edges: Array<ProductPublicationEdge>

  nodes: Array<ProductPublication>

  pageInfo: PageInfo
}

export type ProductPublicationEdge = {
  __typename?: "ProductPublicationEdge"

  cursor: Scalars["String"]["output"]

  node: ProductPublication
}

export type ProductPublicationInput = {
  publicationId?: InputMaybe<Scalars["ID"]["input"]>

  publishDate?: InputMaybe<Scalars["DateTime"]["input"]>
}

export type ProductPublishInput = {
  id: Scalars["ID"]["input"]

  productPublications: Array<ProductPublicationInput>
}

export type ProductPublishPayload = {
  __typename?: "ProductPublishPayload"

  product?: Maybe<Product>
  /**
   * The channels where the product is published.
   * @deprecated Use Product.publications instead.
   */
  productPublications?: Maybe<Array<ProductPublication>>

  shop: Shop

  userErrors: Array<UserError>
}

export type ProductReorderImagesPayload = {
  __typename?: "ProductReorderImagesPayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type ProductReorderMediaPayload = {
  __typename?: "ProductReorderMediaPayload"

  job?: Maybe<Job>

  mediaUserErrors: Array<MediaUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `mediaUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type ProductResourceFeedback = {
  __typename?: "ProductResourceFeedback"

  feedbackGeneratedAt: Scalars["DateTime"]["output"]

  messages: Array<Scalars["String"]["output"]>

  productId: Scalars["ID"]["output"]

  productUpdatedAt: Scalars["DateTime"]["output"]

  state: ResourceFeedbackState
}

export type ProductResourceFeedbackInput = {
  feedbackGeneratedAt: Scalars["DateTime"]["input"]

  messages?: InputMaybe<Array<Scalars["String"]["input"]>>

  productId: Scalars["ID"]["input"]

  productUpdatedAt: Scalars["DateTime"]["input"]

  state: ResourceFeedbackState
}

export type ProductSale = Sale & {
  __typename?: "ProductSale"

  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineItem: LineItem

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export enum ProductSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  InventoryTotal = "INVENTORY_TOTAL",

  ProductType = "PRODUCT_TYPE",

  PublishedAt = "PUBLISHED_AT",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",

  Vendor = "VENDOR",
}

export enum ProductStatus {
  Active = "ACTIVE",

  Archived = "ARCHIVED",

  Draft = "DRAFT",
}

export type ProductTaxonomyNode = Node & {
  __typename?: "ProductTaxonomyNode"

  fullName: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  isLeaf: Scalars["Boolean"]["output"]

  isRoot: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]
}

export type ProductUnpublishInput = {
  id: Scalars["ID"]["input"]

  productPublications: Array<ProductPublicationInput>
}

export type ProductUnpublishPayload = {
  __typename?: "ProductUnpublishPayload"

  product?: Maybe<Product>

  shop: Shop

  userErrors: Array<UserError>
}

export type ProductUpdateMediaPayload = {
  __typename?: "ProductUpdateMediaPayload"

  media?: Maybe<Array<Media>>

  mediaUserErrors: Array<MediaUserError>

  product?: Maybe<Product>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `mediaUserErrors` instead.
   */
  userErrors: Array<UserError>
}

export type ProductUpdatePayload = {
  __typename?: "ProductUpdatePayload"

  product?: Maybe<Product>

  userErrors: Array<UserError>
}

export type ProductVariant = HasMetafieldDefinitions &
  HasMetafields &
  HasPublishedTranslations &
  LegacyInteroperability &
  Navigable &
  Node & {
    __typename?: "ProductVariant"

    availableForSale: Scalars["Boolean"]["output"]

    barcode?: Maybe<Scalars["String"]["output"]>

    compareAtPrice?: Maybe<Scalars["Money"]["output"]>

    contextualPricing: ProductVariantContextualPricing

    createdAt: Scalars["DateTime"]["output"]

    defaultCursor: Scalars["String"]["output"]

    deliveryProfile?: Maybe<DeliveryProfile>

    displayName: Scalars["String"]["output"]
    /**
     * The fulfillment service that stocks a product variant.
     *
     * This is a third-party fulfillment service if the following conditions are met:
     * - The product variant is stocked by a single fulfillment service.
     * - The [FulfillmentService](/api/admin-graphql/latest/objects/FulfillmentService) is a third-party fulfillment service. Third-party fulfillment services don't have a handle with the value `manual`.
     * - The fulfillment service hasn't [opted into SKU sharing](/api/admin-graphql/latest/objects/FulfillmentService#field-fulfillmentservice-permitsskusharing).
     *
     * If the conditions aren't met, then the fulfillment service has the `manual` handle.
     *
     * @deprecated
     * The [relationship between a product variant and a fulfillment service was changed in the `2022-07` API version](/changelog/fulfillment-service-sku-sharing). A [ProductVariant](/api/admin-graphql/latest/objects/ProductVariant) can be stocked by multiple fulfillment services. As a result, we recommend that you use the [inventoryItem field](/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-inventoryitem) if you need to determine where a product variant is stocked.
     *
     * If you need to determine whether a product is a gift card, then you should continue to use this field until an alternative is available.
     *
     * Learn more about [managing inventory quantities and states](/apps/fulfillment/inventory-management-apps/quantities-states).
     *
     */
    fulfillmentService?: Maybe<FulfillmentService>

    fulfillmentServiceEditable: EditableProperty
    /**
     * The Harmonized System Code (or HS Tariff Code) for the variant.
     * @deprecated Use `InventoryItem.harmonizedSystemCode` instead.
     */
    harmonizedSystemCode?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    image?: Maybe<Image>

    inventoryItem: InventoryItem
    /**
     * The fulfillment service that tracks the number of items in stock for the product variant.
     * @deprecated Use tracked attribute on `inventoryItem` instead.
     */
    inventoryManagement: ProductVariantInventoryManagement

    inventoryPolicy: ProductVariantInventoryPolicy

    inventoryQuantity?: Maybe<Scalars["Int"]["output"]>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    media: MediaConnection

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection

    position: Scalars["Int"]["output"]
    /**
     * List of prices and compare-at prices in the presentment currencies for this shop.
     * @deprecated Use `contextualPricing` instead.
     */
    presentmentPrices: ProductVariantPricePairConnection

    price: Scalars["Money"]["output"]
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    product: Product

    productVariantComponents: ProductVariantComponentConnection

    requiresComponents: Scalars["Boolean"]["output"]
    /**
     * Whether a customer needs to provide a shipping address when placing an order for the product variant.
     *
     * @deprecated Use `InventoryItem.requiresShipping` instead.
     */
    requiresShipping: Scalars["Boolean"]["output"]

    selectedOptions: Array<SelectedOption>

    sellableOnlineQuantity: Scalars["Int"]["output"]

    sellingPlanGroupCount: Scalars["Int"]["output"]

    sellingPlanGroups: SellingPlanGroupConnection

    sku?: Maybe<Scalars["String"]["output"]>
    /**
     * The Storefront GraphQL API ID of the `ProductVariant`.
     *
     * As of the `2022-04` version release, the Storefront GraphQL API will no longer return Base64 encoded IDs to match the behavior of the Admin GraphQL API. Therefore, you can safely use the `id` field's value instead.
     *
     * @deprecated Use `id` instead.
     */
    storefrontId: Scalars["StorefrontID"]["output"]

    taxCode?: Maybe<Scalars["String"]["output"]>

    taxable: Scalars["Boolean"]["output"]

    title: Scalars["String"]["output"]

    translations: Array<Translation>

    updatedAt: Scalars["DateTime"]["output"]

    weight?: Maybe<Scalars["Float"]["output"]>

    weightUnit: WeightUnit
  }

export type ProductVariantContextualPricingArgs = {
  context: ContextualPricingContext
}

export type ProductVariantMediaArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ProductVariantMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type ProductVariantMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantPresentmentPricesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  presentmentCurrencies?: InputMaybe<Array<CurrencyCode>>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type ProductVariantPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantProductVariantComponentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ProductVariantTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type ProductVariantAppendMediaInput = {
  mediaIds: Array<Scalars["ID"]["input"]>

  variantId: Scalars["ID"]["input"]
}

export type ProductVariantAppendMediaPayload = {
  __typename?: "ProductVariantAppendMediaPayload"

  product?: Maybe<Product>

  productVariants?: Maybe<Array<ProductVariant>>

  userErrors: Array<MediaUserError>
}

export type ProductVariantComponent = Node & {
  __typename?: "ProductVariantComponent"

  id: Scalars["ID"]["output"]

  productVariant: ProductVariant

  quantity: Scalars["Int"]["output"]
}

export type ProductVariantComponentConnection = {
  __typename?: "ProductVariantComponentConnection"

  edges: Array<ProductVariantComponentEdge>

  nodes: Array<ProductVariantComponent>

  pageInfo: PageInfo
}

export type ProductVariantComponentEdge = {
  __typename?: "ProductVariantComponentEdge"

  cursor: Scalars["String"]["output"]

  node: ProductVariantComponent
}

export type ProductVariantConnection = {
  __typename?: "ProductVariantConnection"

  edges: Array<ProductVariantEdge>

  nodes: Array<ProductVariant>

  pageInfo: PageInfo
}

export type ProductVariantContextualPricing = {
  __typename?: "ProductVariantContextualPricing"

  compareAtPrice?: Maybe<MoneyV2>

  price: MoneyV2

  quantityPriceBreaks: QuantityPriceBreakConnection

  quantityRule: QuantityRule
}

export type ProductVariantContextualPricingQuantityPriceBreaksArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<QuantityPriceBreakSortKeys>
}

export type ProductVariantCreatePayload = {
  __typename?: "ProductVariantCreatePayload"

  product?: Maybe<Product>

  productVariant?: Maybe<ProductVariant>

  userErrors: Array<UserError>
}

export type ProductVariantDeletePayload = {
  __typename?: "ProductVariantDeletePayload"

  deletedProductVariantId?: Maybe<Scalars["ID"]["output"]>

  product?: Maybe<Product>

  userErrors: Array<UserError>
}

export type ProductVariantDetachMediaInput = {
  mediaIds: Array<Scalars["ID"]["input"]>

  variantId: Scalars["ID"]["input"]
}

export type ProductVariantDetachMediaPayload = {
  __typename?: "ProductVariantDetachMediaPayload"

  product?: Maybe<Product>

  productVariants?: Maybe<Array<ProductVariant>>

  userErrors: Array<MediaUserError>
}

export type ProductVariantEdge = {
  __typename?: "ProductVariantEdge"

  cursor: Scalars["String"]["output"]

  node: ProductVariant
}

export type ProductVariantGroupRelationshipInput = {
  id: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]
}

export type ProductVariantInput = {
  barcode?: InputMaybe<Scalars["String"]["input"]>

  compareAtPrice?: InputMaybe<Scalars["Money"]["input"]>

  harmonizedSystemCode?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  inventoryItem?: InputMaybe<InventoryItemInput>

  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>

  inventoryQuantities?: InputMaybe<Array<InventoryLevelInput>>

  mediaId?: InputMaybe<Scalars["ID"]["input"]>

  mediaSrc?: InputMaybe<Array<Scalars["String"]["input"]>>

  metafields?: InputMaybe<Array<MetafieldInput>>

  options?: InputMaybe<Array<Scalars["String"]["input"]>>

  position?: InputMaybe<Scalars["Int"]["input"]>

  price?: InputMaybe<Scalars["Money"]["input"]>

  productId?: InputMaybe<Scalars["ID"]["input"]>

  requiresComponents?: InputMaybe<Scalars["Boolean"]["input"]>

  requiresShipping?: InputMaybe<Scalars["Boolean"]["input"]>

  sku?: InputMaybe<Scalars["String"]["input"]>

  taxCode?: InputMaybe<Scalars["String"]["input"]>

  taxable?: InputMaybe<Scalars["Boolean"]["input"]>

  weight?: InputMaybe<Scalars["Float"]["input"]>

  weightUnit?: InputMaybe<WeightUnit>
}

export enum ProductVariantInventoryManagement {
  FulfillmentService = "FULFILLMENT_SERVICE",

  NotManaged = "NOT_MANAGED",

  Shopify = "SHOPIFY",
}

export enum ProductVariantInventoryPolicy {
  Continue = "CONTINUE",

  Deny = "DENY",
}

export type ProductVariantJoinSellingPlanGroupsPayload = {
  __typename?: "ProductVariantJoinSellingPlanGroupsPayload"

  productVariant?: Maybe<ProductVariant>

  userErrors: Array<SellingPlanGroupUserError>
}

export type ProductVariantLeaveSellingPlanGroupsPayload = {
  __typename?: "ProductVariantLeaveSellingPlanGroupsPayload"

  productVariant?: Maybe<ProductVariant>

  userErrors: Array<SellingPlanGroupUserError>
}

export type ProductVariantPositionInput = {
  id: Scalars["ID"]["input"]

  position: Scalars["Int"]["input"]
}

export type ProductVariantPricePair = {
  __typename?: "ProductVariantPricePair"

  compareAtPrice?: Maybe<MoneyV2>

  price: MoneyV2
}

export type ProductVariantPricePairConnection = {
  __typename?: "ProductVariantPricePairConnection"

  edges: Array<ProductVariantPricePairEdge>

  nodes: Array<ProductVariantPricePair>

  pageInfo: PageInfo
}

export type ProductVariantPricePairEdge = {
  __typename?: "ProductVariantPricePairEdge"

  cursor: Scalars["String"]["output"]

  node: ProductVariantPricePair
}

export type ProductVariantRelationshipBulkUpdatePayload = {
  __typename?: "ProductVariantRelationshipBulkUpdatePayload"

  parentProductVariants?: Maybe<Array<ProductVariant>>

  userErrors: Array<ProductVariantRelationshipBulkUpdateUserError>
}

export type ProductVariantRelationshipBulkUpdateUserError = DisplayableError & {
  __typename?: "ProductVariantRelationshipBulkUpdateUserError"

  code?: Maybe<ProductVariantRelationshipBulkUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductVariantRelationshipBulkUpdateUserErrorCode {
  CircularReference = "CIRCULAR_REFERENCE",

  DuplicateProductVariantRelationship = "DUPLICATE_PRODUCT_VARIANT_RELATIONSHIP",

  ExceededProductVariantRelationshipLimit = "EXCEEDED_PRODUCT_VARIANT_RELATIONSHIP_LIMIT",

  FailedToCreate = "FAILED_TO_CREATE",

  FailedToRemove = "FAILED_TO_REMOVE",

  FailedToUpdate = "FAILED_TO_UPDATE",

  FailedToUpdateParentProductVariantPrice = "FAILED_TO_UPDATE_PARENT_PRODUCT_VARIANT_PRICE",

  InvalidQuantity = "INVALID_QUANTITY",

  MustSpecifyComponents = "MUST_SPECIFY_COMPONENTS",

  NestedParentProductVariant = "NESTED_PARENT_PRODUCT_VARIANT",

  ParentProductVariantCannotBeGiftCard = "PARENT_PRODUCT_VARIANT_CANNOT_BE_GIFT_CARD",

  ParentProductVariantCannotRequireSellingPlan = "PARENT_PRODUCT_VARIANT_CANNOT_REQUIRE_SELLING_PLAN",

  ParentRequired = "PARENT_REQUIRED",

  ProductExpanderAppOwnershipAlreadyExists = "PRODUCT_EXPANDER_APP_OWNERSHIP_ALREADY_EXISTS",

  ProductVariantsNotComponents = "PRODUCT_VARIANTS_NOT_COMPONENTS",

  ProductVariantsNotFound = "PRODUCT_VARIANTS_NOT_FOUND",

  ProductVariantRelationshipTypeConflict = "PRODUCT_VARIANT_RELATIONSHIP_TYPE_CONFLICT",

  UnexpectedError = "UNEXPECTED_ERROR",

  UnsupportedMultipackRelationship = "UNSUPPORTED_MULTIPACK_RELATIONSHIP",

  UpdateParentVariantPriceRequired = "UPDATE_PARENT_VARIANT_PRICE_REQUIRED",
}

export type ProductVariantRelationshipUpdateInput = {
  parentProductId?: InputMaybe<Scalars["ID"]["input"]>

  parentProductVariantId?: InputMaybe<Scalars["ID"]["input"]>

  priceInput?: InputMaybe<PriceInput>

  productVariantRelationshipsToCreate?: InputMaybe<Array<ProductVariantGroupRelationshipInput>>

  productVariantRelationshipsToRemove?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productVariantRelationshipsToUpdate?: InputMaybe<Array<ProductVariantGroupRelationshipInput>>

  removeAllProductVariantRelationships?: InputMaybe<Scalars["Boolean"]["input"]>
}

export enum ProductVariantSortKeys {
  FullTitle = "FULL_TITLE",

  Id = "ID",

  InventoryLevelsAvailable = "INVENTORY_LEVELS_AVAILABLE",

  InventoryManagement = "INVENTORY_MANAGEMENT",

  InventoryPolicy = "INVENTORY_POLICY",

  InventoryQuantity = "INVENTORY_QUANTITY",

  Name = "NAME",

  Popular = "POPULAR",

  Position = "POSITION",

  Relevance = "RELEVANCE",

  Sku = "SKU",

  Title = "TITLE",
}

export type ProductVariantUpdatePayload = {
  __typename?: "ProductVariantUpdatePayload"

  product?: Maybe<Product>

  productVariant?: Maybe<ProductVariant>

  userErrors: Array<UserError>
}

export type ProductVariantsBulkCreatePayload = {
  __typename?: "ProductVariantsBulkCreatePayload"

  product?: Maybe<Product>

  productVariants?: Maybe<Array<ProductVariant>>

  userErrors: Array<ProductVariantsBulkCreateUserError>
}

export type ProductVariantsBulkCreateUserError = DisplayableError & {
  __typename?: "ProductVariantsBulkCreateUserError"

  code?: Maybe<ProductVariantsBulkCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductVariantsBulkCreateUserErrorCode {
  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  Invalid = "INVALID",

  MustBeForThisProduct = "MUST_BE_FOR_THIS_PRODUCT",

  NeedToAddOptionValues = "NEED_TO_ADD_OPTION_VALUES",

  NegativePriceValue = "NEGATIVE_PRICE_VALUE",

  NotDefinedForShop = "NOT_DEFINED_FOR_SHOP",

  NoKeyOnCreate = "NO_KEY_ON_CREATE",

  OptionValuesForNumberOfUnknownOptions = "OPTION_VALUES_FOR_NUMBER_OF_UNKNOWN_OPTIONS",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",

  SubscriptionViolation = "SUBSCRIPTION_VIOLATION",

  TooManyInventoryLocations = "TOO_MANY_INVENTORY_LOCATIONS",

  TrackedVariantLocationNotFound = "TRACKED_VARIANT_LOCATION_NOT_FOUND",

  VariantAlreadyExists = "VARIANT_ALREADY_EXISTS",

  VariantAlreadyExistsChangeOptionValue = "VARIANT_ALREADY_EXISTS_CHANGE_OPTION_VALUE",
}

export type ProductVariantsBulkDeletePayload = {
  __typename?: "ProductVariantsBulkDeletePayload"

  product?: Maybe<Product>

  userErrors: Array<ProductVariantsBulkDeleteUserError>
}

export type ProductVariantsBulkDeleteUserError = DisplayableError & {
  __typename?: "ProductVariantsBulkDeleteUserError"

  code?: Maybe<ProductVariantsBulkDeleteUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductVariantsBulkDeleteUserErrorCode {
  AtLeastOneVariantDoesNotBelongToTheProduct = "AT_LEAST_ONE_VARIANT_DOES_NOT_BELONG_TO_THE_PRODUCT",

  CannotDeleteLastVariant = "CANNOT_DELETE_LAST_VARIANT",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",
}

export type ProductVariantsBulkInput = {
  barcode?: InputMaybe<Scalars["String"]["input"]>

  compareAtPrice?: InputMaybe<Scalars["Money"]["input"]>

  harmonizedSystemCode?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  inventoryItem?: InputMaybe<InventoryItemInput>

  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>

  inventoryQuantities?: InputMaybe<Array<InventoryLevelInput>>

  mediaId?: InputMaybe<Scalars["ID"]["input"]>

  mediaSrc?: InputMaybe<Array<Scalars["String"]["input"]>>

  metafields?: InputMaybe<Array<MetafieldInput>>

  options?: InputMaybe<Array<Scalars["String"]["input"]>>

  price?: InputMaybe<Scalars["Money"]["input"]>

  requiresShipping?: InputMaybe<Scalars["Boolean"]["input"]>

  sku?: InputMaybe<Scalars["String"]["input"]>

  taxCode?: InputMaybe<Scalars["String"]["input"]>

  taxable?: InputMaybe<Scalars["Boolean"]["input"]>

  weight?: InputMaybe<Scalars["Float"]["input"]>

  weightUnit?: InputMaybe<WeightUnit>
}

export type ProductVariantsBulkReorderPayload = {
  __typename?: "ProductVariantsBulkReorderPayload"

  product?: Maybe<Product>

  userErrors: Array<ProductVariantsBulkReorderUserError>
}

export type ProductVariantsBulkReorderUserError = DisplayableError & {
  __typename?: "ProductVariantsBulkReorderUserError"

  code?: Maybe<ProductVariantsBulkReorderUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductVariantsBulkReorderUserErrorCode {
  DuplicatedVariantId = "DUPLICATED_VARIANT_ID",

  InvalidPosition = "INVALID_POSITION",

  MissingVariant = "MISSING_VARIANT",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",
}

export type ProductVariantsBulkUpdatePayload = {
  __typename?: "ProductVariantsBulkUpdatePayload"

  product?: Maybe<Product>

  productVariants?: Maybe<Array<ProductVariant>>

  userErrors: Array<ProductVariantsBulkUpdateUserError>
}

export type ProductVariantsBulkUpdateUserError = DisplayableError & {
  __typename?: "ProductVariantsBulkUpdateUserError"

  code?: Maybe<ProductVariantsBulkUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ProductVariantsBulkUpdateUserErrorCode {
  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  NeedToAddOptionValues = "NEED_TO_ADD_OPTION_VALUES",

  NegativePriceValue = "NEGATIVE_PRICE_VALUE",

  NoInventoryQuantitesDuringUpdate = "NO_INVENTORY_QUANTITES_DURING_UPDATE",

  NoInventoryQuantitiesOnVariantsUpdate = "NO_INVENTORY_QUANTITIES_ON_VARIANTS_UPDATE",

  OptionValuesForNumberOfUnknownOptions = "OPTION_VALUES_FOR_NUMBER_OF_UNKNOWN_OPTIONS",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",

  ProductVariantDoesNotExist = "PRODUCT_VARIANT_DOES_NOT_EXIST",

  ProductVariantIdMissing = "PRODUCT_VARIANT_ID_MISSING",

  SubscriptionViolation = "SUBSCRIPTION_VIOLATION",

  VariantAlreadyExists = "VARIANT_ALREADY_EXISTS",
}

export enum ProfileItemSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  InventoryTotal = "INVENTORY_TOTAL",

  ProductType = "PRODUCT_TYPE",

  PublishedAt = "PUBLISHED_AT",

  Relevance = "RELEVANCE",

  Title = "TITLE",

  UpdatedAt = "UPDATED_AT",

  Vendor = "VENDOR",
}

export type PubSubServerPixelUpdatePayload = {
  __typename?: "PubSubServerPixelUpdatePayload"

  serverPixel?: Maybe<ServerPixel>

  userErrors: Array<ErrorsServerPixelUserError>
}

export type PubSubWebhookSubscriptionCreatePayload = {
  __typename?: "PubSubWebhookSubscriptionCreatePayload"

  userErrors: Array<PubSubWebhookSubscriptionCreateUserError>

  webhookSubscription?: Maybe<WebhookSubscription>
}

export type PubSubWebhookSubscriptionCreateUserError = DisplayableError & {
  __typename?: "PubSubWebhookSubscriptionCreateUserError"

  code?: Maybe<PubSubWebhookSubscriptionCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PubSubWebhookSubscriptionCreateUserErrorCode {
  InvalidParameters = "INVALID_PARAMETERS",
}

export type PubSubWebhookSubscriptionInput = {
  format?: InputMaybe<WebhookSubscriptionFormat>

  includeFields?: InputMaybe<Array<Scalars["String"]["input"]>>

  metafieldNamespaces?: InputMaybe<Array<Scalars["String"]["input"]>>

  pubSubProject: Scalars["String"]["input"]

  pubSubTopic: Scalars["String"]["input"]
}

export type PubSubWebhookSubscriptionUpdatePayload = {
  __typename?: "PubSubWebhookSubscriptionUpdatePayload"

  userErrors: Array<PubSubWebhookSubscriptionUpdateUserError>

  webhookSubscription?: Maybe<WebhookSubscription>
}

export type PubSubWebhookSubscriptionUpdateUserError = DisplayableError & {
  __typename?: "PubSubWebhookSubscriptionUpdateUserError"

  code?: Maybe<PubSubWebhookSubscriptionUpdateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PubSubWebhookSubscriptionUpdateUserErrorCode {
  InvalidParameters = "INVALID_PARAMETERS",
}

export type Publication = Node & {
  __typename?: "Publication"
  /**
   * The app associated with the publication.
   * @deprecated Use [AppCatalog.apps](https://shopify.dev/api/admin-graphql/unstable/objects/AppCatalog#connection-appcatalog-apps) instead.
   */
  app: App

  autoPublish: Scalars["Boolean"]["output"]

  catalog?: Maybe<Catalog>

  collectionPublicationsV3: ResourcePublicationConnection

  collections: CollectionConnection

  hasCollection: Scalars["Boolean"]["output"]

  id: Scalars["ID"]["output"]
  /**
   * Name of the publication.
   * @deprecated Use [Catalog.title](https://shopify.dev/api/admin-graphql/unstable/interfaces/Catalog#field-catalog-title) instead.
   */
  name: Scalars["String"]["output"]

  operation?: Maybe<PublicationOperation>

  productPublicationsV3: ResourcePublicationConnection

  products: ProductConnection

  supportsFuturePublishing: Scalars["Boolean"]["output"]
}

export type PublicationCollectionPublicationsV3Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublicationCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublicationHasCollectionArgs = {
  id: Scalars["ID"]["input"]
}

export type PublicationProductPublicationsV3Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublicationProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublicationConnection = {
  __typename?: "PublicationConnection"

  edges: Array<PublicationEdge>

  nodes: Array<Publication>

  pageInfo: PageInfo
}

export type PublicationCreateInput = {
  autoPublish?: InputMaybe<Scalars["Boolean"]["input"]>

  catalogId?: InputMaybe<Scalars["ID"]["input"]>

  defaultState?: InputMaybe<PublicationCreateInputPublicationDefaultState>
}

export enum PublicationCreateInputPublicationDefaultState {
  AllProducts = "ALL_PRODUCTS",

  Empty = "EMPTY",
}

export type PublicationCreatePayload = {
  __typename?: "PublicationCreatePayload"

  publication?: Maybe<Publication>

  userErrors: Array<PublicationUserError>
}

export type PublicationDeletePayload = {
  __typename?: "PublicationDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<PublicationUserError>
}

export type PublicationEdge = {
  __typename?: "PublicationEdge"

  cursor: Scalars["String"]["output"]

  node: Publication
}

export type PublicationInput = {
  publicationId?: InputMaybe<Scalars["ID"]["input"]>

  publishDate?: InputMaybe<Scalars["DateTime"]["input"]>
}

export type PublicationOperation = AddAllProductsOperation | CatalogCsvOperation | PublicationResourceOperation

export type PublicationResourceOperation = Node &
  ResourceOperation & {
    __typename?: "PublicationResourceOperation"

    id: Scalars["ID"]["output"]

    processedRowCount?: Maybe<Scalars["Int"]["output"]>

    rowCount?: Maybe<RowCount>

    status: ResourceOperationStatus
  }

export type PublicationUpdateInput = {
  autoPublish?: InputMaybe<Scalars["Boolean"]["input"]>

  publishablesToAdd?: InputMaybe<Array<Scalars["ID"]["input"]>>

  publishablesToRemove?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type PublicationUpdatePayload = {
  __typename?: "PublicationUpdatePayload"

  publication?: Maybe<Publication>

  userErrors: Array<PublicationUserError>
}

export type PublicationUserError = DisplayableError & {
  __typename?: "PublicationUserError"

  code?: Maybe<PublicationUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum PublicationUserErrorCode {
  Blank = "BLANK",

  CannotModifyAppCatalog = "CANNOT_MODIFY_APP_CATALOG",

  CannotModifyAppCatalogPublication = "CANNOT_MODIFY_APP_CATALOG_PUBLICATION",

  CannotModifyMarketCatalog = "CANNOT_MODIFY_MARKET_CATALOG",

  CannotModifyMarketCatalogPublication = "CANNOT_MODIFY_MARKET_CATALOG_PUBLICATION",

  CatalogNotFound = "CATALOG_NOT_FOUND",

  Invalid = "INVALID",

  InvalidPublishableId = "INVALID_PUBLISHABLE_ID",

  MarketNotFound = "MARKET_NOT_FOUND",

  ProductTypeIncompatibleWithCatalogType = "PRODUCT_TYPE_INCOMPATIBLE_WITH_CATALOG_TYPE",

  PublicationLocked = "PUBLICATION_LOCKED",

  PublicationNotFound = "PUBLICATION_NOT_FOUND",

  PublicationUpdateLimitExceeded = "PUBLICATION_UPDATE_LIMIT_EXCEEDED",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnsupportedPublicationAction = "UNSUPPORTED_PUBLICATION_ACTION",

  UnsupportedPublishableType = "UNSUPPORTED_PUBLISHABLE_TYPE",
}

export type Publishable = {
  availablePublicationCount: Scalars["Int"]["output"]

  publicationCount: Scalars["Int"]["output"]
  /**
   * Check to see whether the resource is published to a given channel.
   * @deprecated Use `publishedOnPublication` instead.
   */
  publishedOnChannel: Scalars["Boolean"]["output"]
  /**
   * Check to see whether the resource is published to the calling app's channel.
   * @deprecated Use `publishedOnCurrentPublication` instead.
   */
  publishedOnCurrentChannel: Scalars["Boolean"]["output"]

  publishedOnCurrentPublication: Scalars["Boolean"]["output"]

  publishedOnPublication: Scalars["Boolean"]["output"]

  resourcePublications: ResourcePublicationConnection

  resourcePublicationsV2: ResourcePublicationV2Connection
  /**
   * The list of channels that the resource is not published to.
   * @deprecated Use `unpublishedPublications` instead.
   */
  unpublishedChannels: ChannelConnection

  unpublishedPublications: PublicationConnection
}

export type PublishablePublicationCountArgs = {
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublishablePublishedOnChannelArgs = {
  channelId: Scalars["ID"]["input"]
}

export type PublishablePublishedOnPublicationArgs = {
  publicationId: Scalars["ID"]["input"]
}

export type PublishableResourcePublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublishableResourcePublicationsV2Args = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  catalogType?: InputMaybe<CatalogType>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  onlyPublished?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublishableUnpublishedChannelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublishableUnpublishedPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type PublishablePublishPayload = {
  __typename?: "PublishablePublishPayload"

  publishable?: Maybe<Publishable>

  shop: Shop

  userErrors: Array<UserError>
}

export type PublishablePublishToCurrentChannelPayload = {
  __typename?: "PublishablePublishToCurrentChannelPayload"

  publishable?: Maybe<Publishable>

  shop: Shop

  userErrors: Array<UserError>
}

export type PublishableUnpublishPayload = {
  __typename?: "PublishableUnpublishPayload"

  publishable?: Maybe<Publishable>

  shop: Shop

  userErrors: Array<UserError>
}

export type PublishableUnpublishToCurrentChannelPayload = {
  __typename?: "PublishableUnpublishToCurrentChannelPayload"

  publishable?: Maybe<Publishable>

  shop: Shop

  userErrors: Array<UserError>
}

export type PurchasingCompany = {
  __typename?: "PurchasingCompany"

  company: Company

  contact?: Maybe<CompanyContact>

  location: CompanyLocation
}

export type PurchasingCompanyInput = {
  companyContactId: Scalars["ID"]["input"]

  companyId: Scalars["ID"]["input"]

  companyLocationId: Scalars["ID"]["input"]
}

export type PurchasingEntity = Customer | PurchasingCompany

export type PurchasingEntityInput = {
  customerId?: InputMaybe<Scalars["ID"]["input"]>

  purchasingCompany?: InputMaybe<PurchasingCompanyInput>
}

export type QuantityPriceBreak = Node & {
  __typename?: "QuantityPriceBreak"

  id: Scalars["ID"]["output"]

  minimumQuantity: Scalars["Int"]["output"]

  price: MoneyV2

  priceList: PriceList

  variant: ProductVariant
}

export type QuantityPriceBreakConnection = {
  __typename?: "QuantityPriceBreakConnection"

  edges: Array<QuantityPriceBreakEdge>

  nodes: Array<QuantityPriceBreak>

  pageInfo: PageInfo

  totalCount: Scalars["UnsignedInt64"]["output"]
}

export type QuantityPriceBreakEdge = {
  __typename?: "QuantityPriceBreakEdge"

  cursor: Scalars["String"]["output"]

  node: QuantityPriceBreak
}

export type QuantityPriceBreakInput = {
  minimumQuantity: Scalars["Int"]["input"]

  price: MoneyInput

  variantId: Scalars["ID"]["input"]
}

export enum QuantityPriceBreakSortKeys {
  Id = "ID",

  MinimumQuantity = "MINIMUM_QUANTITY",

  Relevance = "RELEVANCE",
}

export type QuantityPricingByVariantUpdateInput = {
  pricesToAdd: Array<PriceListPriceInput>

  pricesToDeleteByVariantId: Array<Scalars["ID"]["input"]>

  quantityPriceBreaksToAdd: Array<QuantityPriceBreakInput>

  quantityPriceBreaksToDelete: Array<Scalars["ID"]["input"]>

  quantityRulesToAdd: Array<QuantityRuleInput>

  quantityRulesToDeleteByVariantId: Array<Scalars["ID"]["input"]>
}

export type QuantityPricingByVariantUpdatePayload = {
  __typename?: "QuantityPricingByVariantUpdatePayload"

  productVariants?: Maybe<Array<ProductVariant>>

  userErrors: Array<QuantityPricingByVariantUserError>
}

export type QuantityPricingByVariantUserError = DisplayableError & {
  __typename?: "QuantityPricingByVariantUserError"

  code?: Maybe<QuantityPricingByVariantUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum QuantityPricingByVariantUserErrorCode {
  Blank = "BLANK",

  GenericError = "GENERIC_ERROR",

  PriceAddCurrencyMismatch = "PRICE_ADD_CURRENCY_MISMATCH",

  PriceAddDuplicateInputForVariant = "PRICE_ADD_DUPLICATE_INPUT_FOR_VARIANT",

  PriceAddVariantNotFound = "PRICE_ADD_VARIANT_NOT_FOUND",

  PriceDeletePriceNotFixed = "PRICE_DELETE_PRICE_NOT_FIXED",

  PriceDeleteVariantNotFound = "PRICE_DELETE_VARIANT_NOT_FOUND",

  PriceListNotFound = "PRICE_LIST_NOT_FOUND",

  QuantityPriceBreakAddCurrencyMismatch = "QUANTITY_PRICE_BREAK_ADD_CURRENCY_MISMATCH",

  QuantityPriceBreakAddDuplicateInputForVariantAndMin = "QUANTITY_PRICE_BREAK_ADD_DUPLICATE_INPUT_FOR_VARIANT_AND_MIN",

  QuantityPriceBreakAddFailedToSave = "QUANTITY_PRICE_BREAK_ADD_FAILED_TO_SAVE",

  QuantityPriceBreakAddInvalid = "QUANTITY_PRICE_BREAK_ADD_INVALID",

  QuantityPriceBreakAddLimitExceeded = "QUANTITY_PRICE_BREAK_ADD_LIMIT_EXCEEDED",

  QuantityPriceBreakAddMinHigherThanQuantityRulesMax = "QUANTITY_PRICE_BREAK_ADD_MIN_HIGHER_THAN_QUANTITY_RULES_MAX",

  QuantityPriceBreakAddMinLowerThanQuantityRulesMin = "QUANTITY_PRICE_BREAK_ADD_MIN_LOWER_THAN_QUANTITY_RULES_MIN",

  QuantityPriceBreakAddMinNotAMultipleOfQuantityRulesIncrement = "QUANTITY_PRICE_BREAK_ADD_MIN_NOT_A_MULTIPLE_OF_QUANTITY_RULES_INCREMENT",

  QuantityPriceBreakAddPriceListPriceNotFound = "QUANTITY_PRICE_BREAK_ADD_PRICE_LIST_PRICE_NOT_FOUND",

  QuantityPriceBreakAddVariantNotFound = "QUANTITY_PRICE_BREAK_ADD_VARIANT_NOT_FOUND",

  QuantityPriceBreakDeleteFailed = "QUANTITY_PRICE_BREAK_DELETE_FAILED",

  QuantityPriceBreakDeleteNotFound = "QUANTITY_PRICE_BREAK_DELETE_NOT_FOUND",

  QuantityRuleAddCatalogContextNotSupported = "QUANTITY_RULE_ADD_CATALOG_CONTEXT_NOT_SUPPORTED",

  QuantityRuleAddDuplicateInputForVariant = "QUANTITY_RULE_ADD_DUPLICATE_INPUT_FOR_VARIANT",

  QuantityRuleAddIncrementIsGreaterThanMinimum = "QUANTITY_RULE_ADD_INCREMENT_IS_GREATER_THAN_MINIMUM",

  QuantityRuleAddIncrementIsLessThanOne = "QUANTITY_RULE_ADD_INCREMENT_IS_LESS_THAN_ONE",

  QuantityRuleAddIncrementNotAMultipleOfQuantityPriceBreakMin = "QUANTITY_RULE_ADD_INCREMENT_NOT_A_MULTIPLE_OF_QUANTITY_PRICE_BREAK_MIN",

  QuantityRuleAddMaximumIsLessThanOne = "QUANTITY_RULE_ADD_MAXIMUM_IS_LESS_THAN_ONE",

  QuantityRuleAddMaximumNotAMultipleOfIncrement = "QUANTITY_RULE_ADD_MAXIMUM_NOT_A_MULTIPLE_OF_INCREMENT",

  QuantityRuleAddMaxLowerThanQuantityPriceBreakMin = "QUANTITY_RULE_ADD_MAX_LOWER_THAN_QUANTITY_PRICE_BREAK_MIN",

  QuantityRuleAddMinimumGreaterThanMaximum = "QUANTITY_RULE_ADD_MINIMUM_GREATER_THAN_MAXIMUM",

  QuantityRuleAddMinimumIsLessThanOne = "QUANTITY_RULE_ADD_MINIMUM_IS_LESS_THAN_ONE",

  QuantityRuleAddMinimumNotAMultipleOfIncrement = "QUANTITY_RULE_ADD_MINIMUM_NOT_A_MULTIPLE_OF_INCREMENT",

  QuantityRuleAddMinHigherThanQuantityPriceBreakMin = "QUANTITY_RULE_ADD_MIN_HIGHER_THAN_QUANTITY_PRICE_BREAK_MIN",

  QuantityRuleAddVariantNotFound = "QUANTITY_RULE_ADD_VARIANT_NOT_FOUND",

  QuantityRuleDeleteRuleNotFound = "QUANTITY_RULE_DELETE_RULE_NOT_FOUND",

  QuantityRuleDeleteVariantNotFound = "QUANTITY_RULE_DELETE_VARIANT_NOT_FOUND",
}

export type QuantityRule = {
  __typename?: "QuantityRule"

  increment: Scalars["Int"]["output"]

  isDefault: Scalars["Boolean"]["output"]

  maximum?: Maybe<Scalars["Int"]["output"]>

  minimum: Scalars["Int"]["output"]

  originType: QuantityRuleOriginType

  productVariant: ProductVariant
}

export type QuantityRuleConnection = {
  __typename?: "QuantityRuleConnection"

  edges: Array<QuantityRuleEdge>

  nodes: Array<QuantityRule>

  pageInfo: PageInfo

  totalCount: Scalars["UnsignedInt64"]["output"]
}

export type QuantityRuleEdge = {
  __typename?: "QuantityRuleEdge"

  cursor: Scalars["String"]["output"]

  node: QuantityRule
}

export type QuantityRuleInput = {
  increment: Scalars["Int"]["input"]

  maximum?: InputMaybe<Scalars["Int"]["input"]>

  minimum: Scalars["Int"]["input"]

  variantId: Scalars["ID"]["input"]
}

export enum QuantityRuleOriginType {
  Fixed = "FIXED",

  Relative = "RELATIVE",
}

export type QuantityRuleUserError = DisplayableError & {
  __typename?: "QuantityRuleUserError"

  code?: Maybe<QuantityRuleUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum QuantityRuleUserErrorCode {
  Blank = "BLANK",

  CatalogContextDoesNotSupportQuantityRules = "CATALOG_CONTEXT_DOES_NOT_SUPPORT_QUANTITY_RULES",

  DuplicateInputForVariant = "DUPLICATE_INPUT_FOR_VARIANT",

  GenericError = "GENERIC_ERROR",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  IncrementIsGreaterThanMinimum = "INCREMENT_IS_GREATER_THAN_MINIMUM",

  IncrementNotAMultipleOfQuantityPriceBreakMinimum = "INCREMENT_NOT_A_MULTIPLE_OF_QUANTITY_PRICE_BREAK_MINIMUM",

  MaximumIsLowerThanQuantityPriceBreakMinimum = "MAXIMUM_IS_LOWER_THAN_QUANTITY_PRICE_BREAK_MINIMUM",

  MaximumNotMultipleOfIncrement = "MAXIMUM_NOT_MULTIPLE_OF_INCREMENT",

  MinimumIsGreaterThanMaximum = "MINIMUM_IS_GREATER_THAN_MAXIMUM",

  MinimumIsHigherThanQuantityPriceBreakMinimum = "MINIMUM_IS_HIGHER_THAN_QUANTITY_PRICE_BREAK_MINIMUM",

  MinimumNotMultipleOfIncrement = "MINIMUM_NOT_MULTIPLE_OF_INCREMENT",

  PriceListDoesNotExist = "PRICE_LIST_DOES_NOT_EXIST",

  ProductVariantDoesNotExist = "PRODUCT_VARIANT_DOES_NOT_EXIST",

  VariantQuantityRuleDoesNotExist = "VARIANT_QUANTITY_RULE_DOES_NOT_EXIST",
}

export type QuantityRulesAddPayload = {
  __typename?: "QuantityRulesAddPayload"

  quantityRules?: Maybe<Array<QuantityRule>>

  userErrors: Array<QuantityRuleUserError>
}

export type QuantityRulesDeletePayload = {
  __typename?: "QuantityRulesDeletePayload"

  deletedQuantityRulesVariantIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<QuantityRuleUserError>
}

export type QueryRoot = {
  __typename?: "QueryRoot"

  abandonment?: Maybe<Abandonment>

  abandonmentByAbandonedCheckoutId?: Maybe<Abandonment>

  app?: Maybe<App>

  appByHandle?: Maybe<App>

  appByKey?: Maybe<App>

  appDiscountType?: Maybe<AppDiscountType>

  appDiscountTypes: Array<AppDiscountType>

  appInstallation?: Maybe<AppInstallation>

  appInstallations: AppInstallationConnection
  /**
   * Returns an automatic discount resource by ID.
   * @deprecated Use `automaticDiscountNode` instead.
   */
  automaticDiscount?: Maybe<DiscountAutomatic>

  automaticDiscountNode?: Maybe<DiscountAutomaticNode>

  automaticDiscountNodes: DiscountAutomaticNodeConnection

  automaticDiscountSavedSearches: SavedSearchConnection
  /**
   * List of automatic discounts.
   * @deprecated Use `automaticDiscountNodes` instead.
   */
  automaticDiscounts: DiscountAutomaticConnection

  availableCarrierServices: Array<DeliveryCarrierServiceAndLocations>

  availableLocales: Array<Locale>

  carrierService?: Maybe<DeliveryCarrierService>

  cartTransforms: CartTransformConnection

  catalog?: Maybe<Catalog>

  catalogOperations: Array<ResourceOperation>

  catalogs: CatalogConnection
  /**
   * Lookup a channel by ID.
   * @deprecated Use `publication` instead.
   */
  channel?: Maybe<Channel>
  /**
   * List of the active sales channels.
   * @deprecated Use `publications` instead.
   */
  channels: ChannelConnection

  checkoutBranding?: Maybe<CheckoutBranding>

  checkoutProfile?: Maybe<CheckoutProfile>

  checkoutProfiles: CheckoutProfileConnection

  codeDiscountNode?: Maybe<DiscountCodeNode>

  codeDiscountNodeByCode?: Maybe<DiscountCodeNode>

  codeDiscountNodes: DiscountCodeNodeConnection

  codeDiscountSavedSearches: SavedSearchConnection

  collection?: Maybe<Collection>

  collectionByHandle?: Maybe<Collection>

  collectionRulesConditions: Array<CollectionRuleConditions>

  collectionSavedSearches: SavedSearchConnection

  collections: CollectionConnection

  companies: CompanyConnection

  company?: Maybe<Company>

  companyContact?: Maybe<CompanyContact>

  companyContactRole?: Maybe<CompanyContactRole>

  companyCount: Scalars["Int"]["output"]

  companyLocation?: Maybe<CompanyLocation>

  companyLocations: CompanyLocationConnection

  currentAppInstallation: AppInstallation

  currentBulkOperation?: Maybe<BulkOperation>

  customer?: Maybe<Customer>

  customerMergeJobStatus?: Maybe<CustomerMergeRequest>

  customerMergePreview: CustomerMergePreview

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  customerSegmentMembers: CustomerSegmentMemberConnection

  customerSegmentMembersQuery?: Maybe<CustomerSegmentMembersQuery>

  customerSegmentMembership: SegmentMembershipResponse

  customers: CustomerConnection

  deletionEvents: DeletionEventConnection

  deliveryCustomization?: Maybe<DeliveryCustomization>

  deliveryCustomizations: DeliveryCustomizationConnection

  deliveryProfile?: Maybe<DeliveryProfile>

  deliveryProfiles: DeliveryProfileConnection

  deliverySettings?: Maybe<DeliverySetting>

  discountCodeCount: Scalars["Int"]["output"]

  discountNode?: Maybe<DiscountNode>

  discountNodes: DiscountNodeConnection

  discountRedeemCodeBulkCreation?: Maybe<DiscountRedeemCodeBulkCreation>

  discountRedeemCodeSavedSearches: SavedSearchConnection

  dispute?: Maybe<ShopifyPaymentsDispute>

  disputeEvidence?: Maybe<ShopifyPaymentsDisputeEvidence>

  domain?: Maybe<Domain>

  draftOrder?: Maybe<DraftOrder>

  draftOrderSavedSearches: SavedSearchConnection

  draftOrderTag?: Maybe<DraftOrderTag>

  draftOrders: DraftOrderConnection

  fileSavedSearches: SavedSearchConnection

  files: FileConnection

  fulfillment?: Maybe<Fulfillment>

  fulfillmentConstraintRules: Array<FulfillmentConstraintRule>

  fulfillmentOrder?: Maybe<FulfillmentOrder>

  fulfillmentOrders: FulfillmentOrderConnection

  fulfillmentService?: Maybe<FulfillmentService>

  giftCard?: Maybe<GiftCard>

  giftCards: GiftCardConnection

  giftCardsCount: Scalars["UnsignedInt64"]["output"]

  inventoryItem?: Maybe<InventoryItem>

  inventoryItems: InventoryItemConnection

  inventoryLevel?: Maybe<InventoryLevel>

  inventoryProperties: InventoryProperties

  job?: Maybe<Job>

  location?: Maybe<Location>

  locations: LocationConnection
  /**
   * Returns a list of all origin locations available for a delivery profile.
   * @deprecated Use `locationsAvailableForDeliveryProfilesConnection` instead.
   */
  locationsAvailableForDeliveryProfiles?: Maybe<Array<Location>>

  locationsAvailableForDeliveryProfilesConnection: LocationConnection

  manualHoldsFulfillmentOrders: FulfillmentOrderConnection

  market?: Maybe<Market>

  marketByGeography?: Maybe<Market>

  marketLocalizableResource?: Maybe<MarketLocalizableResource>

  marketLocalizableResources: MarketLocalizableResourceConnection

  marketLocalizableResourcesByIds: MarketLocalizableResourceConnection

  marketingActivities: MarketingActivityConnection

  marketingActivity?: Maybe<MarketingActivity>

  marketingEvent?: Maybe<MarketingEvent>

  marketingEvents: MarketingEventConnection

  markets: MarketConnection

  metafieldDefinition?: Maybe<MetafieldDefinition>

  metafieldDefinitionTypes: Array<MetafieldDefinitionType>

  metafieldDefinitions: MetafieldDefinitionConnection
  /**
   * List of the `MetafieldStorefrontVisibility` records.
   * @deprecated This query will be removed in a future version. Use the `access.storefront` field for nodes inside the `metafieldDefinitions` query instead.
   *
   */
  metafieldStorefrontVisibilities: MetafieldStorefrontVisibilityConnection
  /**
   * Returns a `MetafieldStorefrontVisibility` record by ID. A `MetafieldStorefrontVisibility` record lists the
   * metafields to make visible in the Storefront API.
   *
   * @deprecated This query will be removed in a future version. Use the `access.storefront` field inside the `metafieldDefinition` query instead.
   *
   */
  metafieldStorefrontVisibility?: Maybe<MetafieldStorefrontVisibility>

  metaobject?: Maybe<Metaobject>

  metaobjectByHandle?: Maybe<Metaobject>

  metaobjectDefinition?: Maybe<MetaobjectDefinition>

  metaobjectDefinitionByType?: Maybe<MetaobjectDefinition>

  metaobjectDefinitions: MetaobjectDefinitionConnection

  metaobjects: MetaobjectConnection

  node?: Maybe<Node>

  nodes: Array<Maybe<Node>>

  order?: Maybe<Order>

  orderPaymentStatus?: Maybe<OrderPaymentStatus>

  orderSavedSearches: SavedSearchConnection

  orders: OrderConnection

  paymentCustomization?: Maybe<PaymentCustomization>

  paymentCustomizations: PaymentCustomizationConnection

  paymentTermsTemplates: Array<PaymentTermsTemplate>

  priceList?: Maybe<PriceList>

  priceLists: PriceListConnection
  /**
   * Returns a code price rule resource by ID.
   * @deprecated Use `codeDiscountNode` instead.
   */
  priceRule?: Maybe<PriceRule>

  priceRuleSavedSearches: SavedSearchConnection
  /**
   * Returns a list of price rule resources that have at least one associated discount code.
   * @deprecated Use `codeDiscountNodes` instead.
   */
  priceRules: PriceRuleConnection

  primaryMarket: Market
  /**
   * Returns a private metafield by ID.
   * Private metafields are accessible only by the application that created them.
   *
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafield?: Maybe<PrivateMetafield>
  /**
   * Returns a list of private metafields associated to a resource.
   *
   * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
   * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
   *
   */
  privateMetafields: PrivateMetafieldConnection

  product?: Maybe<Product>

  productByHandle?: Maybe<Product>

  productDuplicateJob: ProductDuplicateJob

  productFeed?: Maybe<ProductFeed>

  productFeeds: ProductFeedConnection

  productResourceFeedback?: Maybe<ProductResourceFeedback>

  productSavedSearches: SavedSearchConnection

  productVariant?: Maybe<ProductVariant>

  productVariants: ProductVariantConnection

  products: ProductConnection

  publicApiVersions: Array<ApiVersion>

  publication?: Maybe<Publication>

  publications: PublicationConnection

  refund?: Maybe<Refund>

  return?: Maybe<Return>

  returnableFulfillment?: Maybe<ReturnableFulfillment>

  returnableFulfillments: ReturnableFulfillmentConnection

  reverseDelivery?: Maybe<ReverseDelivery>

  reverseFulfillmentOrder?: Maybe<ReverseFulfillmentOrder>

  scriptTag?: Maybe<ScriptTag>

  scriptTags: ScriptTagConnection

  segment?: Maybe<Segment>

  segmentCount: Scalars["Int"]["output"]

  segmentFilterSuggestions: SegmentFilterConnection

  segmentFilters: SegmentFilterConnection

  segmentMigrations: SegmentMigrationConnection

  segmentValueSuggestions: SegmentValueConnection

  segments: SegmentConnection

  sellingPlanGroup?: Maybe<SellingPlanGroup>

  sellingPlanGroups: SellingPlanGroupConnection

  serverPixel?: Maybe<ServerPixel>

  shop: Shop

  shopBillingPreferences: ShopBillingPreferences

  shopLocales: Array<ShopLocale>

  shopifyFunction?: Maybe<ShopifyFunction>

  shopifyFunctions: ShopifyFunctionConnection

  shopifyPaymentsAccount?: Maybe<ShopifyPaymentsAccount>

  shopifyqlQuery?: Maybe<ShopifyqlResponse>

  staffMember?: Maybe<StaffMember>

  standardMetafieldDefinitionTemplates: StandardMetafieldDefinitionTemplateConnection

  subscriptionBillingAttempt?: Maybe<SubscriptionBillingAttempt>

  subscriptionBillingAttempts: SubscriptionBillingAttemptConnection

  subscriptionBillingCycle?: Maybe<SubscriptionBillingCycle>

  subscriptionBillingCycles: SubscriptionBillingCycleConnection

  subscriptionContract?: Maybe<SubscriptionContract>

  subscriptionContracts: SubscriptionContractConnection

  subscriptionDraft?: Maybe<SubscriptionDraft>

  tenderTransactions: TenderTransactionConnection

  translatableResource?: Maybe<TranslatableResource>

  translatableResources: TranslatableResourceConnection

  translatableResourcesByIds: TranslatableResourceConnection

  urlRedirect?: Maybe<UrlRedirect>

  urlRedirectImport?: Maybe<UrlRedirectImport>

  urlRedirectSavedSearches: SavedSearchConnection

  urlRedirects: UrlRedirectConnection

  validation?: Maybe<Validation>

  validations: ValidationConnection

  webPixel?: Maybe<WebPixel>

  webhookSubscription?: Maybe<WebhookSubscription>

  webhookSubscriptions: WebhookSubscriptionConnection
}

export type QueryRootAbandonmentArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootAbandonmentByAbandonedCheckoutIdArgs = {
  abandonedCheckoutId: Scalars["ID"]["input"]
}

export type QueryRootAppArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootAppByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootAppByKeyArgs = {
  apiKey: Scalars["String"]["input"]
}

export type QueryRootAppDiscountTypeArgs = {
  functionId: Scalars["String"]["input"]
}

export type QueryRootAppInstallationArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootAppInstallationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  category?: InputMaybe<AppInstallationCategory>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  privacy?: InputMaybe<AppInstallationPrivacy>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<AppInstallationSortKeys>
}

export type QueryRootAutomaticDiscountArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootAutomaticDiscountNodeArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootAutomaticDiscountNodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<AutomaticDiscountSortKeys>
}

export type QueryRootAutomaticDiscountSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootAutomaticDiscountsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<AutomaticDiscountSortKeys>
}

export type QueryRootCarrierServiceArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCartTransformsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootCatalogArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCatalogsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CatalogSortKeys>
  type?: InputMaybe<CatalogType>
}

export type QueryRootChannelArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootChannelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootCheckoutBrandingArgs = {
  checkoutProfileId: Scalars["ID"]["input"]
}

export type QueryRootCheckoutProfileArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCheckoutProfilesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CheckoutProfileSortKeys>
}

export type QueryRootCodeDiscountNodeArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCodeDiscountNodeByCodeArgs = {
  code: Scalars["String"]["input"]
}

export type QueryRootCodeDiscountNodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<CodeDiscountSortKeys>
}

export type QueryRootCodeDiscountSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootCollectionArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCollectionByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootCollectionSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<CollectionSortKeys>
}

export type QueryRootCompaniesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanySortKeys>
}

export type QueryRootCompanyArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCompanyContactArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCompanyContactRoleArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCompanyLocationArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCompanyLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CompanyLocationSortKeys>
}

export type QueryRootCurrentBulkOperationArgs = {
  type?: InputMaybe<BulkOperationType>
}

export type QueryRootCustomerArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCustomerMergeJobStatusArgs = {
  jobId: Scalars["ID"]["input"]
}

export type QueryRootCustomerMergePreviewArgs = {
  customerOneId: Scalars["ID"]["input"]
  customerTwoId: Scalars["ID"]["input"]
  overrideFields?: InputMaybe<CustomerMergeOverrideFields>
}

export type QueryRootCustomerPaymentMethodArgs = {
  id: Scalars["ID"]["input"]
  showRevoked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootCustomerSegmentMembersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  queryId?: InputMaybe<Scalars["ID"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  segmentId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<Scalars["String"]["input"]>
  timezone?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryRootCustomerSegmentMembersQueryArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootCustomerSegmentMembershipArgs = {
  customerId: Scalars["ID"]["input"]
  segmentIds: Array<Scalars["ID"]["input"]>
}

export type QueryRootCustomersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CustomerSortKeys>
}

export type QueryRootDeletionEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DeletionEventSortKeys>
  subjectTypes?: InputMaybe<Array<DeletionEventSubjectType>>
}

export type QueryRootDeliveryCustomizationArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDeliveryCustomizationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootDeliveryProfileArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDeliveryProfilesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  merchantOwnedOnly?: InputMaybe<Scalars["Boolean"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootDiscountCodeCountArgs = {
  query?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryRootDiscountNodeArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDiscountNodesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DiscountSortKeys>
}

export type QueryRootDiscountRedeemCodeBulkCreationArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDiscountRedeemCodeSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DiscountCodeSortKeys>
}

export type QueryRootDisputeArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDisputeEvidenceArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDomainArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDraftOrderArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDraftOrderSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootDraftOrderTagArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootDraftOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<DraftOrderSortKeys>
}

export type QueryRootFileSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootFilesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<FileSortKeys>
}

export type QueryRootFulfillmentArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootFulfillmentOrderArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  includeClosed?: InputMaybe<Scalars["Boolean"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<FulfillmentOrderSortKeys>
}

export type QueryRootFulfillmentServiceArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootGiftCardArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootGiftCardsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<GiftCardSortKeys>
}

export type QueryRootGiftCardsCountArgs = {
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootInventoryItemArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootInventoryItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootInventoryLevelArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootJobArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootLocationArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  includeInactive?: InputMaybe<Scalars["Boolean"]["input"]>
  includeLegacy?: InputMaybe<Scalars["Boolean"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<LocationSortKeys>
}

export type QueryRootLocationsAvailableForDeliveryProfilesConnectionArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootManualHoldsFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootMarketArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMarketByGeographyArgs = {
  countryCode: CountryCode
}

export type QueryRootMarketLocalizableResourceArgs = {
  resourceId: Scalars["ID"]["input"]
}

export type QueryRootMarketLocalizableResourcesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  resourceType: MarketLocalizableResourceType
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootMarketLocalizableResourcesByIdsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  resourceIds: Array<Scalars["ID"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootMarketingActivitiesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  marketingActivityIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  query?: InputMaybe<Scalars["String"]["input"]>
  remoteIds?: InputMaybe<Array<Scalars["String"]["input"]>>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<MarketingActivitySortKeys>
  utm?: InputMaybe<UtmInput>
}

export type QueryRootMarketingActivityArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMarketingEventArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMarketingEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MarketingEventSortKeys>
}

export type QueryRootMarketsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootMetafieldDefinitionArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  key?: InputMaybe<Scalars["String"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  ownerType: MetafieldOwnerType
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type QueryRootMetafieldStorefrontVisibilitiesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootMetafieldStorefrontVisibilityArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMetaobjectArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMetaobjectByHandleArgs = {
  handle: MetaobjectHandleInput
}

export type QueryRootMetaobjectDefinitionArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootMetaobjectDefinitionByTypeArgs = {
  type: Scalars["String"]["input"]
}

export type QueryRootMetaobjectDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootMetaobjectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
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

export type QueryRootOrderArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootOrderPaymentStatusArgs = {
  orderId: Scalars["ID"]["input"]
  paymentReferenceId: Scalars["String"]["input"]
}

export type QueryRootOrderSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type QueryRootPaymentCustomizationArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootPaymentCustomizationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootPaymentTermsTemplatesArgs = {
  paymentTermsType?: InputMaybe<PaymentTermsType>
}

export type QueryRootPriceListArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootPriceListsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<PriceListSortKeys>
}

export type QueryRootPriceRuleArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootPriceRuleSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootPriceRulesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<PriceRuleSortKeys>
}

export type QueryRootPrivateMetafieldArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  owner: Scalars["ID"]["input"]
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootProductArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootProductByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type QueryRootProductDuplicateJobArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootProductFeedArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootProductFeedsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootProductResourceFeedbackArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootProductSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootProductVariantArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<ProductVariantSortKeys>
}

export type QueryRootProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<ProductSortKeys>
}

export type QueryRootPublicationArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootPublicationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  catalogType?: InputMaybe<CatalogType>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootRefundArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootReturnArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootReturnableFulfillmentArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootReturnableFulfillmentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  orderId: Scalars["ID"]["input"]
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootReverseDeliveryArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootReverseFulfillmentOrderArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootScriptTagArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootScriptTagsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  src?: InputMaybe<Scalars["URL"]["input"]>
}

export type QueryRootSegmentArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootSegmentFilterSuggestionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  first: Scalars["Int"]["input"]
  search: Scalars["String"]["input"]
}

export type QueryRootSegmentFiltersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
}

export type QueryRootSegmentMigrationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootSegmentValueSuggestionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  filterQueryName?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  functionParameterQueryName?: InputMaybe<Scalars["String"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  search: Scalars["String"]["input"]
}

export type QueryRootSegmentsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SegmentSortKeys>
}

export type QueryRootSellingPlanGroupArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SellingPlanGroupSortKeys>
}

export type QueryRootShopLocalesArgs = {
  published?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootShopifyFunctionArgs = {
  id: Scalars["String"]["input"]
}

export type QueryRootShopifyFunctionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  apiType?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  useCreationUi?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootShopifyqlQueryArgs = {
  query: Scalars["String"]["input"]
}

export type QueryRootStaffMemberArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootStandardMetafieldDefinitionTemplatesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootSubscriptionBillingAttemptArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootSubscriptionBillingAttemptsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SubscriptionBillingAttemptsSortKeys>
}

export type QueryRootSubscriptionBillingCycleArgs = {
  billingCycleInput: SubscriptionBillingCycleInput
}

export type QueryRootSubscriptionBillingCyclesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  billingCyclesDateRangeSelector?: InputMaybe<SubscriptionBillingCyclesDateRangeSelector>
  billingCyclesIndexRangeSelector?: InputMaybe<SubscriptionBillingCyclesIndexRangeSelector>
  contractId: Scalars["ID"]["input"]
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SubscriptionBillingCyclesSortKeys>
}

export type QueryRootSubscriptionContractArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootSubscriptionContractsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootSubscriptionDraftArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootTenderTransactionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootTranslatableResourceArgs = {
  resourceId: Scalars["ID"]["input"]
}

export type QueryRootTranslatableResourcesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  resourceType: TranslatableResourceType
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootTranslatableResourcesByIdsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  resourceIds: Array<Scalars["ID"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootUrlRedirectArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootUrlRedirectImportArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootUrlRedirectSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRootUrlRedirectsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<UrlRedirectSortKeys>
}

export type QueryRootValidationArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootValidationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ValidationSortKeys>
}

export type QueryRootWebPixelArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryRootWebhookSubscriptionArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryRootWebhookSubscriptionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  callbackUrl?: InputMaybe<Scalars["URL"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  format?: InputMaybe<WebhookSubscriptionFormat>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<WebhookSubscriptionSortKeys>
  topics?: InputMaybe<Array<WebhookSubscriptionTopic>>
}

export type Refund = LegacyInteroperability &
  Node & {
    __typename?: "Refund"

    createdAt?: Maybe<Scalars["DateTime"]["output"]>

    duties?: Maybe<Array<RefundDuty>>

    id: Scalars["ID"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    note?: Maybe<Scalars["String"]["output"]>

    order: Order

    refundLineItems: RefundLineItemConnection

    return?: Maybe<Return>

    staffMember?: Maybe<StaffMember>
    /**
     * The total amount across all transactions for the refund.
     * @deprecated Use `totalRefundedSet` instead.
     */
    totalRefunded: MoneyV2

    totalRefundedSet: MoneyBag

    transactions: OrderTransactionConnection

    updatedAt: Scalars["DateTime"]["output"]
  }

export type RefundRefundLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RefundTransactionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RefundAgreement = SalesAgreement & {
  __typename?: "RefundAgreement"

  app?: Maybe<App>

  happenedAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  reason: OrderActionType

  refund: Refund

  sales: SaleConnection

  user?: Maybe<StaffMember>
}

export type RefundAgreementSalesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RefundConnection = {
  __typename?: "RefundConnection"

  edges: Array<RefundEdge>

  nodes: Array<Refund>

  pageInfo: PageInfo
}

export type RefundCreatePayload = {
  __typename?: "RefundCreatePayload"

  order?: Maybe<Order>

  refund?: Maybe<Refund>

  userErrors: Array<UserError>
}

export type RefundDuty = {
  __typename?: "RefundDuty"

  amountSet: MoneyBag

  originalDuty?: Maybe<Duty>
}

export type RefundDutyInput = {
  dutyId: Scalars["ID"]["input"]

  refundType?: InputMaybe<RefundDutyRefundType>
}

export enum RefundDutyRefundType {
  Full = "FULL",

  Proportional = "PROPORTIONAL",
}

export type RefundEdge = {
  __typename?: "RefundEdge"

  cursor: Scalars["String"]["output"]

  node: Refund
}

export type RefundInput = {
  currency?: InputMaybe<CurrencyCode>

  note?: InputMaybe<Scalars["String"]["input"]>

  notify?: InputMaybe<Scalars["Boolean"]["input"]>

  orderId: Scalars["ID"]["input"]

  refundDuties?: InputMaybe<Array<RefundDutyInput>>

  refundLineItems?: InputMaybe<Array<RefundLineItemInput>>

  shipping?: InputMaybe<ShippingRefundInput>

  transactions?: InputMaybe<Array<OrderTransactionInput>>
}

export type RefundLineItem = {
  __typename?: "RefundLineItem"

  lineItem: LineItem

  location?: Maybe<Location>
  /**
   * The price of a refunded line item.
   * @deprecated Use `priceSet` instead.
   */
  price: Scalars["Money"]["output"]

  priceSet: MoneyBag

  quantity: Scalars["Int"]["output"]

  restockType: RefundLineItemRestockType

  restocked: Scalars["Boolean"]["output"]
  /**
   * The subtotal price of a refunded line item.
   * @deprecated Use `subtotalSet` instead.
   */
  subtotal: Scalars["Money"]["output"]

  subtotalSet: MoneyBag
  /**
   * The total tax charged on a refunded line item.
   * @deprecated Use `totalTaxSet` instead.
   */
  totalTax: Scalars["Money"]["output"]

  totalTaxSet: MoneyBag
}

export type RefundLineItemConnection = {
  __typename?: "RefundLineItemConnection"

  edges: Array<RefundLineItemEdge>

  nodes: Array<RefundLineItem>

  pageInfo: PageInfo
}

export type RefundLineItemEdge = {
  __typename?: "RefundLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: RefundLineItem
}

export type RefundLineItemInput = {
  lineItemId: Scalars["ID"]["input"]

  locationId?: InputMaybe<Scalars["ID"]["input"]>

  quantity: Scalars["Int"]["input"]

  restockType?: InputMaybe<RefundLineItemRestockType>
}

export enum RefundLineItemRestockType {
  Cancel = "CANCEL",

  LegacyRestock = "LEGACY_RESTOCK",

  NoRestock = "NO_RESTOCK",

  Return = "RETURN",
}

export type RefundShippingInput = {
  fullRefund?: InputMaybe<Scalars["Boolean"]["input"]>

  shippingRefundAmount?: InputMaybe<MoneyInput>
}

export type RemoteAuthorizeNetCustomerPaymentProfileInput = {
  customerPaymentProfileId?: InputMaybe<Scalars["String"]["input"]>

  customerProfileId: Scalars["String"]["input"]
}

export type RemoteBraintreePaymentMethodInput = {
  customerId: Scalars["String"]["input"]

  paymentMethodToken?: InputMaybe<Scalars["String"]["input"]>
}

export type RemoteStripePaymentMethodInput = {
  customerId: Scalars["String"]["input"]

  paymentMethodId?: InputMaybe<Scalars["String"]["input"]>
}

export type ResourceAlert = {
  __typename?: "ResourceAlert"

  actions: Array<ResourceAlertAction>

  content: Scalars["HTML"]["output"]

  dismissibleHandle?: Maybe<Scalars["String"]["output"]>

  icon?: Maybe<ResourceAlertIcon>

  severity: ResourceAlertSeverity

  title: Scalars["String"]["output"]
}

export type ResourceAlertAction = {
  __typename?: "ResourceAlertAction"

  primary: Scalars["Boolean"]["output"]

  show?: Maybe<Scalars["String"]["output"]>

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export enum ResourceAlertIcon {
  CheckmarkCircle = "CHECKMARK_CIRCLE",

  InformationCircle = "INFORMATION_CIRCLE",
}

export enum ResourceAlertSeverity {
  Critical = "CRITICAL",

  Default = "DEFAULT",
  /** @deprecated `ERROR` severity is being deprecated in favour of `WARNING` or `CRITICAL` instead. */
  Error = "ERROR",

  Info = "INFO",

  Success = "SUCCESS",

  Warning = "WARNING",
}

export type ResourceFeedback = {
  __typename?: "ResourceFeedback"
  /**
   * Feedback from an app about the steps a merchant needs to take to set up the app on their store.
   * @deprecated Use `details` instead.
   */
  appFeedback: Array<AppFeedback>

  details: Array<AppFeedback>

  summary: Scalars["String"]["output"]
}

export type ResourceFeedbackCreateInput = {
  feedbackGeneratedAt: Scalars["DateTime"]["input"]

  messages?: InputMaybe<Array<Scalars["String"]["input"]>>

  state: ResourceFeedbackState
}

export enum ResourceFeedbackState {
  Accepted = "ACCEPTED",

  RequiresAction = "REQUIRES_ACTION",
}

export type ResourceOperation = {
  id: Scalars["ID"]["output"]

  processedRowCount?: Maybe<Scalars["Int"]["output"]>

  rowCount?: Maybe<RowCount>

  status: ResourceOperationStatus
}

export enum ResourceOperationStatus {
  Active = "ACTIVE",

  Complete = "COMPLETE",

  Created = "CREATED",
}

export type ResourcePublication = {
  __typename?: "ResourcePublication"
  /**
   * The channel the resource publication is published to.
   * @deprecated Use `publication` instead.
   */
  channel: Channel

  isPublished: Scalars["Boolean"]["output"]

  publication: Publication

  publishDate: Scalars["DateTime"]["output"]

  publishable: Publishable
}

export type ResourcePublicationConnection = {
  __typename?: "ResourcePublicationConnection"

  edges: Array<ResourcePublicationEdge>

  nodes: Array<ResourcePublication>

  pageInfo: PageInfo
}

export type ResourcePublicationEdge = {
  __typename?: "ResourcePublicationEdge"

  cursor: Scalars["String"]["output"]

  node: ResourcePublication
}

export type ResourcePublicationV2 = {
  __typename?: "ResourcePublicationV2"

  isPublished: Scalars["Boolean"]["output"]

  publication: Publication

  publishDate?: Maybe<Scalars["DateTime"]["output"]>

  publishable: Publishable
}

export type ResourcePublicationV2Connection = {
  __typename?: "ResourcePublicationV2Connection"

  edges: Array<ResourcePublicationV2Edge>

  nodes: Array<ResourcePublicationV2>

  pageInfo: PageInfo
}

export type ResourcePublicationV2Edge = {
  __typename?: "ResourcePublicationV2Edge"

  cursor: Scalars["String"]["output"]

  node: ResourcePublicationV2
}

export type Return = Node & {
  __typename?: "Return"

  decline?: Maybe<ReturnDecline>

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  order: Order

  refunds: RefundConnection

  returnLineItems: ReturnLineItemConnection

  reverseFulfillmentOrders: ReverseFulfillmentOrderConnection

  status: ReturnStatus

  suggestedRefund?: Maybe<SuggestedReturnRefund>

  totalQuantity: Scalars["Int"]["output"]
}

export type ReturnRefundsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReturnReturnLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReturnReverseFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReturnSuggestedRefundArgs = {
  refundDuties?: InputMaybe<Array<RefundDutyInput>>
  refundShipping?: InputMaybe<RefundShippingInput>
  returnRefundLineItems: Array<ReturnRefundLineItemInput>
}

export type ReturnApproveRequestInput = {
  id: Scalars["ID"]["input"]
}

export type ReturnApproveRequestPayload = {
  __typename?: "ReturnApproveRequestPayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export type ReturnCancelPayload = {
  __typename?: "ReturnCancelPayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export type ReturnClosePayload = {
  __typename?: "ReturnClosePayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export type ReturnConnection = {
  __typename?: "ReturnConnection"

  edges: Array<ReturnEdge>

  nodes: Array<Return>

  pageInfo: PageInfo
}

export type ReturnCreatePayload = {
  __typename?: "ReturnCreatePayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export type ReturnDecline = {
  __typename?: "ReturnDecline"

  note?: Maybe<Scalars["String"]["output"]>

  reason: ReturnDeclineReason
}

export enum ReturnDeclineReason {
  FinalSale = "FINAL_SALE",

  Other = "OTHER",

  ReturnPeriodEnded = "RETURN_PERIOD_ENDED",
}

export type ReturnDeclineRequestInput = {
  declineReason: ReturnDeclineReason

  id: Scalars["ID"]["input"]
}

export type ReturnDeclineRequestPayload = {
  __typename?: "ReturnDeclineRequestPayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export type ReturnEdge = {
  __typename?: "ReturnEdge"

  cursor: Scalars["String"]["output"]

  node: Return
}

export enum ReturnErrorCode {
  AlreadyExists = "ALREADY_EXISTS",

  Blank = "BLANK",

  CreationFailed = "CREATION_FAILED",

  EqualTo = "EQUAL_TO",

  FeatureNotEnabled = "FEATURE_NOT_ENABLED",

  GreaterThan = "GREATER_THAN",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  Inclusion = "INCLUSION",

  InternalError = "INTERNAL_ERROR",

  Invalid = "INVALID",

  InvalidState = "INVALID_STATE",

  LessThan = "LESS_THAN",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  NotificationFailed = "NOTIFICATION_FAILED",

  NotANumber = "NOT_A_NUMBER",

  NotEditable = "NOT_EDITABLE",

  NotFound = "NOT_FOUND",

  Present = "PRESENT",

  Taken = "TAKEN",

  TooBig = "TOO_BIG",

  TooLong = "TOO_LONG",

  TooManyArguments = "TOO_MANY_ARGUMENTS",

  TooShort = "TOO_SHORT",

  WrongLength = "WRONG_LENGTH",
}

export type ReturnInput = {
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  orderId: Scalars["ID"]["input"]

  requestedAt?: InputMaybe<Scalars["DateTime"]["input"]>

  returnLineItems: Array<ReturnLineItemInput>
}

export type ReturnLineItem = Node & {
  __typename?: "ReturnLineItem"

  customerNote?: Maybe<Scalars["String"]["output"]>

  fulfillmentLineItem: FulfillmentLineItem

  id: Scalars["ID"]["output"]

  quantity: Scalars["Int"]["output"]

  refundableQuantity: Scalars["Int"]["output"]

  refundedQuantity: Scalars["Int"]["output"]

  returnReason: ReturnReason

  returnReasonNote: Scalars["String"]["output"]

  totalWeight?: Maybe<Weight>

  withCodeDiscountedTotalPriceSet: MoneyBag
}

export type ReturnLineItemConnection = {
  __typename?: "ReturnLineItemConnection"

  edges: Array<ReturnLineItemEdge>

  nodes: Array<ReturnLineItem>

  pageInfo: PageInfo
}

export type ReturnLineItemEdge = {
  __typename?: "ReturnLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: ReturnLineItem
}

export type ReturnLineItemInput = {
  fulfillmentLineItemId: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]

  returnReason: ReturnReason

  returnReasonNote?: InputMaybe<Scalars["String"]["input"]>
}

export enum ReturnReason {
  Color = "COLOR",

  Defective = "DEFECTIVE",

  NotAsDescribed = "NOT_AS_DESCRIBED",

  Other = "OTHER",

  SizeTooLarge = "SIZE_TOO_LARGE",

  SizeTooSmall = "SIZE_TOO_SMALL",

  Style = "STYLE",

  Unknown = "UNKNOWN",

  Unwanted = "UNWANTED",

  WrongItem = "WRONG_ITEM",
}

export type ReturnRefundInput = {
  notifyCustomer?: InputMaybe<Scalars["Boolean"]["input"]>

  orderTransactions?: InputMaybe<Array<ReturnRefundOrderTransactionInput>>

  refundDuties?: InputMaybe<Array<RefundDutyInput>>

  refundShipping?: InputMaybe<RefundShippingInput>

  returnId: Scalars["ID"]["input"]

  returnRefundLineItems: Array<ReturnRefundLineItemInput>
}

export type ReturnRefundLineItemInput = {
  quantity: Scalars["Int"]["input"]

  returnLineItemId: Scalars["ID"]["input"]
}

export type ReturnRefundOrderTransactionInput = {
  parentId: Scalars["ID"]["input"]

  transactionAmount: MoneyInput
}

export type ReturnRefundPayload = {
  __typename?: "ReturnRefundPayload"

  refund?: Maybe<Refund>

  userErrors: Array<ReturnUserError>
}

export type ReturnReopenPayload = {
  __typename?: "ReturnReopenPayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export type ReturnRequestInput = {
  orderId: Scalars["ID"]["input"]

  returnLineItems: Array<ReturnRequestLineItemInput>
}

export type ReturnRequestLineItemInput = {
  customerNote?: InputMaybe<Scalars["String"]["input"]>

  fulfillmentLineItemId: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]

  returnReason: ReturnReason
}

export type ReturnRequestPayload = {
  __typename?: "ReturnRequestPayload"

  return?: Maybe<Return>

  userErrors: Array<ReturnUserError>
}

export enum ReturnStatus {
  Canceled = "CANCELED",

  Closed = "CLOSED",

  Declined = "DECLINED",

  Open = "OPEN",

  Requested = "REQUESTED",
}

export type ReturnUserError = DisplayableError & {
  __typename?: "ReturnUserError"

  code?: Maybe<ReturnErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type ReturnableFulfillment = Node & {
  __typename?: "ReturnableFulfillment"

  fulfillment: Fulfillment

  id: Scalars["ID"]["output"]

  returnableFulfillmentLineItems: ReturnableFulfillmentLineItemConnection
}

export type ReturnableFulfillmentReturnableFulfillmentLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReturnableFulfillmentConnection = {
  __typename?: "ReturnableFulfillmentConnection"

  edges: Array<ReturnableFulfillmentEdge>

  nodes: Array<ReturnableFulfillment>

  pageInfo: PageInfo
}

export type ReturnableFulfillmentEdge = {
  __typename?: "ReturnableFulfillmentEdge"

  cursor: Scalars["String"]["output"]

  node: ReturnableFulfillment
}

export type ReturnableFulfillmentLineItem = {
  __typename?: "ReturnableFulfillmentLineItem"

  fulfillmentLineItem: FulfillmentLineItem

  quantity: Scalars["Int"]["output"]
}

export type ReturnableFulfillmentLineItemConnection = {
  __typename?: "ReturnableFulfillmentLineItemConnection"

  edges: Array<ReturnableFulfillmentLineItemEdge>

  nodes: Array<ReturnableFulfillmentLineItem>

  pageInfo: PageInfo
}

export type ReturnableFulfillmentLineItemEdge = {
  __typename?: "ReturnableFulfillmentLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: ReturnableFulfillmentLineItem
}

export type ReverseDelivery = Node & {
  __typename?: "ReverseDelivery"

  deliverable?: Maybe<ReverseDeliveryDeliverable>

  id: Scalars["ID"]["output"]

  reverseDeliveryLineItems: ReverseDeliveryLineItemConnection

  reverseFulfillmentOrder: ReverseFulfillmentOrder
}

export type ReverseDeliveryReverseDeliveryLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReverseDeliveryConnection = {
  __typename?: "ReverseDeliveryConnection"

  edges: Array<ReverseDeliveryEdge>

  nodes: Array<ReverseDelivery>

  pageInfo: PageInfo
}

export type ReverseDeliveryCreateWithShippingPayload = {
  __typename?: "ReverseDeliveryCreateWithShippingPayload"

  reverseDelivery?: Maybe<ReverseDelivery>

  userErrors: Array<ReturnUserError>
}

export type ReverseDeliveryDeliverable = ReverseDeliveryShippingDeliverable

export type ReverseDeliveryDisposeInput = {
  dispositionType: ReverseFulfillmentOrderDispositionType

  locationId?: InputMaybe<Scalars["ID"]["input"]>

  quantity: Scalars["Int"]["input"]

  reverseDeliveryLineItemId: Scalars["ID"]["input"]
}

export type ReverseDeliveryDisposePayload = {
  __typename?: "ReverseDeliveryDisposePayload"

  reverseDeliveryLineItems?: Maybe<Array<ReverseDeliveryLineItem>>

  userErrors: Array<ReturnUserError>
}

export type ReverseDeliveryEdge = {
  __typename?: "ReverseDeliveryEdge"

  cursor: Scalars["String"]["output"]

  node: ReverseDelivery
}

export type ReverseDeliveryLabelInput = {
  fileUrl: Scalars["URL"]["input"]
}

export type ReverseDeliveryLabelV2 = {
  __typename?: "ReverseDeliveryLabelV2"

  createdAt: Scalars["DateTime"]["output"]

  publicFileUrl?: Maybe<Scalars["URL"]["output"]>

  updatedAt: Scalars["DateTime"]["output"]
}

export type ReverseDeliveryLineItem = Node & {
  __typename?: "ReverseDeliveryLineItem"

  dispositions: Array<ReverseFulfillmentOrderDisposition>

  id: Scalars["ID"]["output"]

  quantity: Scalars["Int"]["output"]

  reverseFulfillmentOrderLineItem: ReverseFulfillmentOrderLineItem
}

export type ReverseDeliveryLineItemConnection = {
  __typename?: "ReverseDeliveryLineItemConnection"

  edges: Array<ReverseDeliveryLineItemEdge>

  nodes: Array<ReverseDeliveryLineItem>

  pageInfo: PageInfo
}

export type ReverseDeliveryLineItemEdge = {
  __typename?: "ReverseDeliveryLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: ReverseDeliveryLineItem
}

export type ReverseDeliveryLineItemInput = {
  quantity: Scalars["Int"]["input"]

  reverseFulfillmentOrderLineItemId: Scalars["ID"]["input"]
}

export type ReverseDeliveryShippingDeliverable = {
  __typename?: "ReverseDeliveryShippingDeliverable"

  label?: Maybe<ReverseDeliveryLabelV2>

  tracking?: Maybe<ReverseDeliveryTrackingV2>
}

export type ReverseDeliveryShippingUpdatePayload = {
  __typename?: "ReverseDeliveryShippingUpdatePayload"

  reverseDelivery?: Maybe<ReverseDelivery>

  userErrors: Array<ReturnUserError>
}

export type ReverseDeliveryTrackingInput = {
  number?: InputMaybe<Scalars["String"]["input"]>

  url?: InputMaybe<Scalars["URL"]["input"]>
}

export type ReverseDeliveryTrackingV2 = {
  __typename?: "ReverseDeliveryTrackingV2"

  carrierName?: Maybe<Scalars["String"]["output"]>

  number?: Maybe<Scalars["String"]["output"]>

  url?: Maybe<Scalars["URL"]["output"]>
}

export type ReverseFulfillmentOrder = Node & {
  __typename?: "ReverseFulfillmentOrder"

  id: Scalars["ID"]["output"]

  lineItems: ReverseFulfillmentOrderLineItemConnection

  order: Order

  reverseDeliveries: ReverseDeliveryConnection

  status: ReverseFulfillmentOrderStatus

  thirdPartyConfirmation?: Maybe<ReverseFulfillmentOrderThirdPartyConfirmation>
}

export type ReverseFulfillmentOrderLineItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReverseFulfillmentOrderReverseDeliveriesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ReverseFulfillmentOrderConnection = {
  __typename?: "ReverseFulfillmentOrderConnection"

  edges: Array<ReverseFulfillmentOrderEdge>

  nodes: Array<ReverseFulfillmentOrder>

  pageInfo: PageInfo
}

export type ReverseFulfillmentOrderDisposeInput = {
  dispositionType: ReverseFulfillmentOrderDispositionType

  locationId?: InputMaybe<Scalars["ID"]["input"]>

  quantity: Scalars["Int"]["input"]

  reverseFulfillmentOrderLineItemId: Scalars["ID"]["input"]
}

export type ReverseFulfillmentOrderDisposePayload = {
  __typename?: "ReverseFulfillmentOrderDisposePayload"

  reverseFulfillmentOrderLineItems?: Maybe<Array<ReverseFulfillmentOrderLineItem>>

  userErrors: Array<ReturnUserError>
}

export type ReverseFulfillmentOrderDisposition = Node & {
  __typename?: "ReverseFulfillmentOrderDisposition"

  id: Scalars["ID"]["output"]

  location?: Maybe<Location>

  quantity: Scalars["Int"]["output"]

  type: ReverseFulfillmentOrderDispositionType
}

export enum ReverseFulfillmentOrderDispositionType {
  Missing = "MISSING",

  NotRestocked = "NOT_RESTOCKED",

  ProcessingRequired = "PROCESSING_REQUIRED",

  Restocked = "RESTOCKED",
}

export type ReverseFulfillmentOrderEdge = {
  __typename?: "ReverseFulfillmentOrderEdge"

  cursor: Scalars["String"]["output"]

  node: ReverseFulfillmentOrder
}

export type ReverseFulfillmentOrderLineItem = Node & {
  __typename?: "ReverseFulfillmentOrderLineItem"

  dispositions: Array<ReverseFulfillmentOrderDisposition>

  fulfillmentLineItem: FulfillmentLineItem

  id: Scalars["ID"]["output"]

  totalQuantity: Scalars["Int"]["output"]
}

export type ReverseFulfillmentOrderLineItemConnection = {
  __typename?: "ReverseFulfillmentOrderLineItemConnection"

  edges: Array<ReverseFulfillmentOrderLineItemEdge>

  nodes: Array<ReverseFulfillmentOrderLineItem>

  pageInfo: PageInfo
}

export type ReverseFulfillmentOrderLineItemEdge = {
  __typename?: "ReverseFulfillmentOrderLineItemEdge"

  cursor: Scalars["String"]["output"]

  node: ReverseFulfillmentOrderLineItem
}

export enum ReverseFulfillmentOrderStatus {
  Canceled = "CANCELED",

  Closed = "CLOSED",

  Open = "OPEN",
}

export type ReverseFulfillmentOrderThirdPartyConfirmation = {
  __typename?: "ReverseFulfillmentOrderThirdPartyConfirmation"

  status: ReverseFulfillmentOrderThirdPartyConfirmationStatus
}

export enum ReverseFulfillmentOrderThirdPartyConfirmationStatus {
  Accepted = "ACCEPTED",

  CancelAccepted = "CANCEL_ACCEPTED",

  CancelRejected = "CANCEL_REJECTED",

  PendingAcceptance = "PENDING_ACCEPTANCE",

  PendingCancelation = "PENDING_CANCELATION",

  Rejected = "REJECTED",
}

export type RowCount = {
  __typename?: "RowCount"

  count: Scalars["Int"]["output"]

  exceedsMax: Scalars["Boolean"]["output"]
}

export type Seo = {
  __typename?: "SEO"

  description?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>
}

export type SeoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type Sale = {
  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export enum SaleActionType {
  Order = "ORDER",

  Return = "RETURN",

  Unknown = "UNKNOWN",

  Update = "UPDATE",
}

export type SaleAdditionalFee = Node & {
  __typename?: "SaleAdditionalFee"

  id: Scalars["ID"]["output"]

  name: Scalars["String"]["output"]

  price: MoneyBag

  taxLines: Array<TaxLine>
}

export type SaleConnection = {
  __typename?: "SaleConnection"

  edges: Array<SaleEdge>

  nodes: Array<Sale>

  pageInfo: PageInfo
}

export type SaleEdge = {
  __typename?: "SaleEdge"

  cursor: Scalars["String"]["output"]

  node: Sale
}

export enum SaleLineType {
  AdditionalFee = "ADDITIONAL_FEE",

  Adjustment = "ADJUSTMENT",

  Duty = "DUTY",

  GiftCard = "GIFT_CARD",

  Product = "PRODUCT",

  Shipping = "SHIPPING",

  Tip = "TIP",

  Unknown = "UNKNOWN",
}

export type SaleTax = {
  __typename?: "SaleTax"

  amount: MoneyBag

  id: Scalars["ID"]["output"]

  taxLine: TaxLine
}

export type SalesAgreement = {
  app?: Maybe<App>

  happenedAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  reason: OrderActionType

  sales: SaleConnection

  user?: Maybe<StaffMember>
}

export type SalesAgreementSalesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SalesAgreementConnection = {
  __typename?: "SalesAgreementConnection"

  edges: Array<SalesAgreementEdge>

  nodes: Array<SalesAgreement>

  pageInfo: PageInfo
}

export type SalesAgreementEdge = {
  __typename?: "SalesAgreementEdge"

  cursor: Scalars["String"]["output"]

  node: SalesAgreement
}

export type SavedSearch = LegacyInteroperability &
  Node & {
    __typename?: "SavedSearch"

    filters: Array<SearchFilter>

    id: Scalars["ID"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    name: Scalars["String"]["output"]

    query: Scalars["String"]["output"]

    resourceType: SearchResultType

    searchTerms: Scalars["String"]["output"]
  }

export type SavedSearchConnection = {
  __typename?: "SavedSearchConnection"

  edges: Array<SavedSearchEdge>

  nodes: Array<SavedSearch>

  pageInfo: PageInfo
}

export type SavedSearchCreateInput = {
  name: Scalars["String"]["input"]

  query: Scalars["String"]["input"]

  resourceType: SearchResultType
}

export type SavedSearchCreatePayload = {
  __typename?: "SavedSearchCreatePayload"

  savedSearch?: Maybe<SavedSearch>

  userErrors: Array<UserError>
}

export type SavedSearchDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type SavedSearchDeletePayload = {
  __typename?: "SavedSearchDeletePayload"

  deletedSavedSearchId?: Maybe<Scalars["ID"]["output"]>

  shop: Shop

  userErrors: Array<UserError>
}

export type SavedSearchEdge = {
  __typename?: "SavedSearchEdge"

  cursor: Scalars["String"]["output"]

  node: SavedSearch
}

export type SavedSearchUpdateInput = {
  id: Scalars["ID"]["input"]

  name?: InputMaybe<Scalars["String"]["input"]>

  query?: InputMaybe<Scalars["String"]["input"]>
}

export type SavedSearchUpdatePayload = {
  __typename?: "SavedSearchUpdatePayload"

  savedSearch?: Maybe<SavedSearch>

  userErrors: Array<UserError>
}

export enum ScheduledChangeSortKeys {
  ExpectedAt = "EXPECTED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export type ScriptDiscountApplication = DiscountApplication & {
  __typename?: "ScriptDiscountApplication"

  allocationMethod: DiscountApplicationAllocationMethod
  /**
   * The description of the application as defined by the Script.
   * @deprecated Use `title` instead.
   */
  description: Scalars["String"]["output"]

  index: Scalars["Int"]["output"]

  targetSelection: DiscountApplicationTargetSelection

  targetType: DiscountApplicationTargetType

  title: Scalars["String"]["output"]

  value: PricingValue
}

export type ScriptTag = LegacyInteroperability &
  Node & {
    __typename?: "ScriptTag"

    cache: Scalars["Boolean"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    displayScope: ScriptTagDisplayScope

    id: Scalars["ID"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    src: Scalars["URL"]["output"]

    updatedAt: Scalars["DateTime"]["output"]
  }

export type ScriptTagConnection = {
  __typename?: "ScriptTagConnection"

  edges: Array<ScriptTagEdge>

  nodes: Array<ScriptTag>

  pageInfo: PageInfo
}

export type ScriptTagCreatePayload = {
  __typename?: "ScriptTagCreatePayload"

  scriptTag?: Maybe<ScriptTag>

  userErrors: Array<UserError>
}

export type ScriptTagDeletePayload = {
  __typename?: "ScriptTagDeletePayload"

  deletedScriptTagId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export enum ScriptTagDisplayScope {
  All = "ALL",

  OnlineStore = "ONLINE_STORE",

  OrderStatus = "ORDER_STATUS",
}

export type ScriptTagEdge = {
  __typename?: "ScriptTagEdge"

  cursor: Scalars["String"]["output"]

  node: ScriptTag
}

export type ScriptTagInput = {
  cache?: InputMaybe<Scalars["Boolean"]["input"]>

  displayScope?: InputMaybe<ScriptTagDisplayScope>

  src?: InputMaybe<Scalars["URL"]["input"]>
}

export type ScriptTagUpdatePayload = {
  __typename?: "ScriptTagUpdatePayload"

  scriptTag?: Maybe<ScriptTag>

  userErrors: Array<UserError>
}

export type SearchFilter = {
  __typename?: "SearchFilter"

  key: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type SearchFilterOptions = {
  __typename?: "SearchFilterOptions"

  productAvailability: Array<FilterOption>
}

export type SearchResult = {
  __typename?: "SearchResult"

  description?: Maybe<Scalars["String"]["output"]>

  image?: Maybe<Image>

  reference: Node

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export type SearchResultConnection = {
  __typename?: "SearchResultConnection"

  edges: Array<SearchResultEdge>

  pageInfo: PageInfo
  /**
   * Information to aid in pagination.
   * @deprecated The provided information is not accurate.
   */
  resultsAfterCount: Scalars["Int"]["output"]
}

export type SearchResultEdge = {
  __typename?: "SearchResultEdge"

  cursor: Scalars["String"]["output"]

  node: SearchResult
}

export enum SearchResultType {
  BalanceTransaction = "BALANCE_TRANSACTION",
  Collection = "COLLECTION",
  Customer = "CUSTOMER",

  DiscountRedeemCode = "DISCOUNT_REDEEM_CODE",
  DraftOrder = "DRAFT_ORDER",

  File = "FILE",
  OnlineStoreArticle = "ONLINE_STORE_ARTICLE",
  OnlineStoreBlog = "ONLINE_STORE_BLOG",
  OnlineStorePage = "ONLINE_STORE_PAGE",
  Order = "ORDER",
  PriceRule = "PRICE_RULE",
  Product = "PRODUCT",

  UrlRedirect = "URL_REDIRECT",
}

export type Segment = Node & {
  __typename?: "Segment"

  creationDate: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  lastEditDate: Scalars["DateTime"]["output"]

  name: Scalars["String"]["output"]

  query: Scalars["String"]["output"]
}

export type SegmentAssociationFilter = SegmentFilter & {
  __typename?: "SegmentAssociationFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentAttributeStatistics = {
  __typename?: "SegmentAttributeStatistics"

  average: Scalars["Float"]["output"]

  sum: Scalars["Float"]["output"]
}

export type SegmentBooleanFilter = SegmentFilter & {
  __typename?: "SegmentBooleanFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentConnection = {
  __typename?: "SegmentConnection"

  edges: Array<SegmentEdge>

  nodes: Array<Segment>

  pageInfo: PageInfo
}

export type SegmentCreatePayload = {
  __typename?: "SegmentCreatePayload"

  segment?: Maybe<Segment>

  userErrors: Array<UserError>
}

export type SegmentDateFilter = SegmentFilter & {
  __typename?: "SegmentDateFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentDeletePayload = {
  __typename?: "SegmentDeletePayload"

  deletedSegmentId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type SegmentEdge = {
  __typename?: "SegmentEdge"

  cursor: Scalars["String"]["output"]

  node: Segment
}

export type SegmentEnumFilter = SegmentFilter & {
  __typename?: "SegmentEnumFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentEventFilter = SegmentFilter & {
  __typename?: "SegmentEventFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  parameters: Array<SegmentEventFilterParameter>

  queryName: Scalars["String"]["output"]

  returnValueType: Scalars["String"]["output"]
}

export type SegmentEventFilterParameter = {
  __typename?: "SegmentEventFilterParameter"

  acceptsMultipleValues: Scalars["Boolean"]["output"]

  localizedDescription: Scalars["String"]["output"]

  localizedName: Scalars["String"]["output"]

  optional: Scalars["Boolean"]["output"]

  parameterType: Scalars["String"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentFilter = {
  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentFilterConnection = {
  __typename?: "SegmentFilterConnection"

  edges: Array<SegmentFilterEdge>

  nodes: Array<SegmentFilter>

  pageInfo: PageInfo
}

export type SegmentFilterEdge = {
  __typename?: "SegmentFilterEdge"

  cursor: Scalars["String"]["output"]

  node: SegmentFilter
}

export type SegmentFloatFilter = SegmentFilter & {
  __typename?: "SegmentFloatFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentIntegerFilter = SegmentFilter & {
  __typename?: "SegmentIntegerFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentMembership = {
  __typename?: "SegmentMembership"

  isMember: Scalars["Boolean"]["output"]

  segmentId: Scalars["ID"]["output"]
}

export type SegmentMembershipResponse = {
  __typename?: "SegmentMembershipResponse"

  memberships: Array<SegmentMembership>
}

export type SegmentMigration = {
  __typename?: "SegmentMigration"

  id: Scalars["ID"]["output"]

  savedSearchId: Scalars["ID"]["output"]

  segmentId?: Maybe<Scalars["ID"]["output"]>
}

export type SegmentMigrationConnection = {
  __typename?: "SegmentMigrationConnection"

  edges: Array<SegmentMigrationEdge>

  nodes: Array<SegmentMigration>

  pageInfo: PageInfo
}

export type SegmentMigrationEdge = {
  __typename?: "SegmentMigrationEdge"

  cursor: Scalars["String"]["output"]

  node: SegmentMigration
}

export enum SegmentSortKeys {
  CreationDate = "CREATION_DATE",

  Id = "ID",

  LastEditDate = "LAST_EDIT_DATE",

  Relevance = "RELEVANCE",
}

export type SegmentStatistics = {
  __typename?: "SegmentStatistics"

  attributeStatistics: SegmentAttributeStatistics
}

export type SegmentStatisticsAttributeStatisticsArgs = {
  attributeName: Scalars["String"]["input"]
}

export type SegmentStringFilter = SegmentFilter & {
  __typename?: "SegmentStringFilter"

  localizedName: Scalars["String"]["output"]

  multiValue: Scalars["Boolean"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentUpdatePayload = {
  __typename?: "SegmentUpdatePayload"

  segment?: Maybe<Segment>

  userErrors: Array<UserError>
}

export type SegmentValue = {
  __typename?: "SegmentValue"

  localizedValue: Scalars["String"]["output"]

  queryName: Scalars["String"]["output"]
}

export type SegmentValueConnection = {
  __typename?: "SegmentValueConnection"

  edges: Array<SegmentValueEdge>

  nodes: Array<SegmentValue>

  pageInfo: PageInfo
}

export type SegmentValueEdge = {
  __typename?: "SegmentValueEdge"

  cursor: Scalars["String"]["output"]

  node: SegmentValue
}

export type SelectedOption = {
  __typename?: "SelectedOption"

  name: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type SellingPlan = HasPublishedTranslations &
  Node & {
    __typename?: "SellingPlan"

    billingPolicy: SellingPlanBillingPolicy

    category?: Maybe<SellingPlanCategory>

    createdAt: Scalars["DateTime"]["output"]

    deliveryPolicy: SellingPlanDeliveryPolicy

    description?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    inventoryPolicy?: Maybe<SellingPlanInventoryPolicy>

    name: Scalars["String"]["output"]

    options: Array<Scalars["String"]["output"]>

    position?: Maybe<Scalars["Int"]["output"]>

    pricingPolicies: Array<SellingPlanPricingPolicy>

    translations: Array<Translation>
  }

export type SellingPlanTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type SellingPlanAnchor = {
  __typename?: "SellingPlanAnchor"

  cutoffDay?: Maybe<Scalars["Int"]["output"]>

  day: Scalars["Int"]["output"]

  month?: Maybe<Scalars["Int"]["output"]>

  type: SellingPlanAnchorType
}

export type SellingPlanAnchorInput = {
  cutoffDay?: InputMaybe<Scalars["Int"]["input"]>

  day?: InputMaybe<Scalars["Int"]["input"]>

  month?: InputMaybe<Scalars["Int"]["input"]>

  type?: InputMaybe<SellingPlanAnchorType>
}

export enum SellingPlanAnchorType {
  Monthday = "MONTHDAY",

  Weekday = "WEEKDAY",

  Yearday = "YEARDAY",
}

export type SellingPlanBillingPolicy = SellingPlanFixedBillingPolicy | SellingPlanRecurringBillingPolicy

export type SellingPlanBillingPolicyInput = {
  fixed?: InputMaybe<SellingPlanFixedBillingPolicyInput>

  recurring?: InputMaybe<SellingPlanRecurringBillingPolicyInput>
}

export enum SellingPlanCategory {
  Other = "OTHER",

  PreOrder = "PRE_ORDER",

  Subscription = "SUBSCRIPTION",

  TryBeforeYouBuy = "TRY_BEFORE_YOU_BUY",
}

export type SellingPlanCheckoutCharge = {
  __typename?: "SellingPlanCheckoutCharge"

  type: SellingPlanCheckoutChargeType

  value: SellingPlanCheckoutChargeValue
}

export type SellingPlanCheckoutChargeInput = {
  type?: InputMaybe<SellingPlanCheckoutChargeType>

  value?: InputMaybe<SellingPlanCheckoutChargeValueInput>
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

export type SellingPlanCheckoutChargeValueInput = {
  fixedValue?: InputMaybe<Scalars["Decimal"]["input"]>

  percentage?: InputMaybe<Scalars["Float"]["input"]>
}

export type SellingPlanConnection = {
  __typename?: "SellingPlanConnection"

  edges: Array<SellingPlanEdge>

  nodes: Array<SellingPlan>

  pageInfo: PageInfo
}

export type SellingPlanDeliveryPolicy = SellingPlanFixedDeliveryPolicy | SellingPlanRecurringDeliveryPolicy

export type SellingPlanDeliveryPolicyInput = {
  fixed?: InputMaybe<SellingPlanFixedDeliveryPolicyInput>

  recurring?: InputMaybe<SellingPlanRecurringDeliveryPolicyInput>
}

export type SellingPlanEdge = {
  __typename?: "SellingPlanEdge"

  cursor: Scalars["String"]["output"]

  node: SellingPlan
}

export type SellingPlanFixedBillingPolicy = {
  __typename?: "SellingPlanFixedBillingPolicy"

  checkoutCharge: SellingPlanCheckoutCharge

  remainingBalanceChargeExactTime?: Maybe<Scalars["DateTime"]["output"]>

  remainingBalanceChargeTimeAfterCheckout?: Maybe<Scalars["String"]["output"]>

  remainingBalanceChargeTrigger: SellingPlanRemainingBalanceChargeTrigger
}

export type SellingPlanFixedBillingPolicyInput = {
  checkoutCharge?: InputMaybe<SellingPlanCheckoutChargeInput>

  remainingBalanceChargeExactTime?: InputMaybe<Scalars["DateTime"]["input"]>

  remainingBalanceChargeTimeAfterCheckout?: InputMaybe<Scalars["String"]["input"]>

  remainingBalanceChargeTrigger?: InputMaybe<SellingPlanRemainingBalanceChargeTrigger>
}

export type SellingPlanFixedDeliveryPolicy = {
  __typename?: "SellingPlanFixedDeliveryPolicy"

  anchors: Array<SellingPlanAnchor>

  cutoff?: Maybe<Scalars["Int"]["output"]>

  fulfillmentExactTime?: Maybe<Scalars["DateTime"]["output"]>

  fulfillmentTrigger: SellingPlanFulfillmentTrigger

  intent: SellingPlanFixedDeliveryPolicyIntent

  preAnchorBehavior: SellingPlanFixedDeliveryPolicyPreAnchorBehavior
}

export type SellingPlanFixedDeliveryPolicyInput = {
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>

  cutoff?: InputMaybe<Scalars["Int"]["input"]>

  fulfillmentExactTime?: InputMaybe<Scalars["DateTime"]["input"]>

  fulfillmentTrigger?: InputMaybe<SellingPlanFulfillmentTrigger>

  intent?: InputMaybe<SellingPlanFixedDeliveryPolicyIntent>

  preAnchorBehavior?: InputMaybe<SellingPlanFixedDeliveryPolicyPreAnchorBehavior>
}

export enum SellingPlanFixedDeliveryPolicyIntent {
  FulfillmentBegin = "FULFILLMENT_BEGIN",
}

export enum SellingPlanFixedDeliveryPolicyPreAnchorBehavior {
  Asap = "ASAP",

  Next = "NEXT",
}

export type SellingPlanFixedPricingPolicy = SellingPlanPricingPolicyBase & {
  __typename?: "SellingPlanFixedPricingPolicy"

  adjustmentType: SellingPlanPricingPolicyAdjustmentType

  adjustmentValue: SellingPlanPricingPolicyAdjustmentValue

  createdAt: Scalars["DateTime"]["output"]
}

export type SellingPlanFixedPricingPolicyInput = {
  adjustmentType?: InputMaybe<SellingPlanPricingPolicyAdjustmentType>

  adjustmentValue?: InputMaybe<SellingPlanPricingPolicyValueInput>

  id?: InputMaybe<Scalars["ID"]["input"]>
}

export enum SellingPlanFulfillmentTrigger {
  Anchor = "ANCHOR",

  Asap = "ASAP",

  ExactTime = "EXACT_TIME",

  Unknown = "UNKNOWN",
}

export type SellingPlanGroup = HasPublishedTranslations &
  Node & {
    __typename?: "SellingPlanGroup"

    appId?: Maybe<Scalars["String"]["output"]>

    appliesToProduct: Scalars["Boolean"]["output"]

    appliesToProductVariant: Scalars["Boolean"]["output"]

    appliesToProductVariants: Scalars["Boolean"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    description?: Maybe<Scalars["String"]["output"]>

    id: Scalars["ID"]["output"]

    merchantCode: Scalars["String"]["output"]

    name: Scalars["String"]["output"]

    options: Array<Scalars["String"]["output"]>

    position?: Maybe<Scalars["Int"]["output"]>

    productCount: Scalars["Int"]["output"]

    productVariantCount: Scalars["Int"]["output"]

    productVariants: ProductVariantConnection

    products: ProductConnection

    sellingPlans: SellingPlanConnection

    summary?: Maybe<Scalars["String"]["output"]>

    translations: Array<Translation>
  }

export type SellingPlanGroupAppliesToProductArgs = {
  productId: Scalars["ID"]["input"]
}

export type SellingPlanGroupAppliesToProductVariantArgs = {
  productVariantId: Scalars["ID"]["input"]
}

export type SellingPlanGroupAppliesToProductVariantsArgs = {
  productId: Scalars["ID"]["input"]
}

export type SellingPlanGroupProductVariantCountArgs = {
  productId?: InputMaybe<Scalars["ID"]["input"]>
}

export type SellingPlanGroupProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  productId?: InputMaybe<Scalars["ID"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SellingPlanGroupProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SellingPlanGroupSellingPlansArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SellingPlanGroupTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type SellingPlanGroupAddProductVariantsPayload = {
  __typename?: "SellingPlanGroupAddProductVariantsPayload"

  sellingPlanGroup?: Maybe<SellingPlanGroup>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupAddProductsPayload = {
  __typename?: "SellingPlanGroupAddProductsPayload"

  sellingPlanGroup?: Maybe<SellingPlanGroup>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupConnection = {
  __typename?: "SellingPlanGroupConnection"

  edges: Array<SellingPlanGroupEdge>

  nodes: Array<SellingPlanGroup>

  pageInfo: PageInfo
}

export type SellingPlanGroupCreatePayload = {
  __typename?: "SellingPlanGroupCreatePayload"

  sellingPlanGroup?: Maybe<SellingPlanGroup>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupDeletePayload = {
  __typename?: "SellingPlanGroupDeletePayload"

  deletedSellingPlanGroupId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupEdge = {
  __typename?: "SellingPlanGroupEdge"

  cursor: Scalars["String"]["output"]

  node: SellingPlanGroup
}

export type SellingPlanGroupInput = {
  appId?: InputMaybe<Scalars["String"]["input"]>

  description?: InputMaybe<Scalars["String"]["input"]>

  merchantCode?: InputMaybe<Scalars["String"]["input"]>

  name?: InputMaybe<Scalars["String"]["input"]>

  options?: InputMaybe<Array<Scalars["String"]["input"]>>

  position?: InputMaybe<Scalars["Int"]["input"]>

  sellingPlansToCreate?: InputMaybe<Array<SellingPlanInput>>

  sellingPlansToDelete?: InputMaybe<Array<Scalars["ID"]["input"]>>

  sellingPlansToUpdate?: InputMaybe<Array<SellingPlanInput>>
}

export type SellingPlanGroupRemoveProductVariantsPayload = {
  __typename?: "SellingPlanGroupRemoveProductVariantsPayload"

  removedProductVariantIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupRemoveProductsPayload = {
  __typename?: "SellingPlanGroupRemoveProductsPayload"

  removedProductIds?: Maybe<Array<Scalars["ID"]["output"]>>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupResourceInput = {
  productIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  productVariantIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export enum SellingPlanGroupSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Name = "NAME",

  Relevance = "RELEVANCE",

  UpdatedAt = "UPDATED_AT",
}

export type SellingPlanGroupUpdatePayload = {
  __typename?: "SellingPlanGroupUpdatePayload"

  deletedSellingPlanIds?: Maybe<Array<Scalars["ID"]["output"]>>

  sellingPlanGroup?: Maybe<SellingPlanGroup>

  userErrors: Array<SellingPlanGroupUserError>
}

export type SellingPlanGroupUserError = DisplayableError & {
  __typename?: "SellingPlanGroupUserError"

  code?: Maybe<SellingPlanGroupUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum SellingPlanGroupUserErrorCode {
  BillingAndDeliveryPolicyTypesMustBeTheSame = "BILLING_AND_DELIVERY_POLICY_TYPES_MUST_BE_THE_SAME",

  BillingPolicyIntervalTooLarge = "BILLING_POLICY_INTERVAL_TOO_LARGE",

  Blank = "BLANK",

  CheckoutChargeValueAndTypeMustMatch = "CHECKOUT_CHARGE_VALUE_AND_TYPE_MUST_MATCH",

  DeliveryPolicyIntervalTooLarge = "DELIVERY_POLICY_INTERVAL_TOO_LARGE",

  EqualTo = "EQUAL_TO",

  ErrorAddingResourceToGroup = "ERROR_ADDING_RESOURCE_TO_GROUP",

  FulfillmentExactTimeNotAllowed = "FULFILLMENT_EXACT_TIME_NOT_ALLOWED",

  FulfillmentExactTimeRequired = "FULFILLMENT_EXACT_TIME_REQUIRED",

  GreaterThan = "GREATER_THAN",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  GroupCouldNotBeDeleted = "GROUP_COULD_NOT_BE_DELETED",

  GroupDoesNotExist = "GROUP_DOES_NOT_EXIST",

  Inclusion = "INCLUSION",

  Invalid = "INVALID",

  LessThan = "LESS_THAN",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  NotANumber = "NOT_A_NUMBER",

  NotFound = "NOT_FOUND",

  OnlyNeedOneBillingPolicyType = "ONLY_NEED_ONE_BILLING_POLICY_TYPE",

  OnlyNeedOneCheckoutChargeValue = "ONLY_NEED_ONE_CHECKOUT_CHARGE_VALUE",

  OnlyNeedOneDeliveryPolicyType = "ONLY_NEED_ONE_DELIVERY_POLICY_TYPE",

  OnlyNeedOnePricingPolicyType = "ONLY_NEED_ONE_PRICING_POLICY_TYPE",

  OnlyNeedOnePricingPolicyValue = "ONLY_NEED_ONE_PRICING_POLICY_VALUE",

  OnlyOneOfFixedOrRecurringBilling = "ONLY_ONE_OF_FIXED_OR_RECURRING_BILLING",

  OnlyOneOfFixedOrRecurringDelivery = "ONLY_ONE_OF_FIXED_OR_RECURRING_DELIVERY",

  PlanDoesNotExist = "PLAN_DOES_NOT_EXIST",

  PlanIdMustBeSpecifiedToUpdate = "PLAN_ID_MUST_BE_SPECIFIED_TO_UPDATE",

  Present = "PRESENT",

  PricingPolicyAdjustmentValueAndTypeMustMatch = "PRICING_POLICY_ADJUSTMENT_VALUE_AND_TYPE_MUST_MATCH",

  ProductDoesNotExist = "PRODUCT_DOES_NOT_EXIST",

  ProductVariantDoesNotExist = "PRODUCT_VARIANT_DOES_NOT_EXIST",

  RemainingBalanceChargeExactTimeNotAllowed = "REMAINING_BALANCE_CHARGE_EXACT_TIME_NOT_ALLOWED",

  RemainingBalanceChargeExactTimeRequired = "REMAINING_BALANCE_CHARGE_EXACT_TIME_REQUIRED",

  RemainingBalanceChargeTimeAfterCheckoutMustBeGreaterThanZero = "REMAINING_BALANCE_CHARGE_TIME_AFTER_CHECKOUT_MUST_BE_GREATER_THAN_ZERO",

  RemainingBalanceChargeTriggerNoRemainingBalanceOnPartialPercentageCheckoutCharge = "REMAINING_BALANCE_CHARGE_TRIGGER_NO_REMAINING_BALANCE_ON_PARTIAL_PERCENTAGE_CHECKOUT_CHARGE",

  RemainingBalanceChargeTriggerNoRemainingBalanceOnPriceCheckoutCharge = "REMAINING_BALANCE_CHARGE_TRIGGER_NO_REMAINING_BALANCE_ON_PRICE_CHECKOUT_CHARGE",

  RemainingBalanceChargeTriggerOnFullCheckout = "REMAINING_BALANCE_CHARGE_TRIGGER_ON_FULL_CHECKOUT",

  ResourceListContainsInvalidIds = "RESOURCE_LIST_CONTAINS_INVALID_IDS",

  SellingPlanAnchorsNotAllowed = "SELLING_PLAN_ANCHORS_NOT_ALLOWED",

  SellingPlanAnchorsRequired = "SELLING_PLAN_ANCHORS_REQUIRED",

  SellingPlanBillingAndDeliveryPolicyAnchorsMustBeEqual = "SELLING_PLAN_BILLING_AND_DELIVERY_POLICY_ANCHORS_MUST_BE_EQUAL",

  SellingPlanBillingCycleMustBeAMultipleOfDeliveryCycle = "SELLING_PLAN_BILLING_CYCLE_MUST_BE_A_MULTIPLE_OF_DELIVERY_CYCLE",

  SellingPlanBillingPolicyMissing = "SELLING_PLAN_BILLING_POLICY_MISSING",

  SellingPlanCountLowerBound = "SELLING_PLAN_COUNT_LOWER_BOUND",

  SellingPlanCountUpperBound = "SELLING_PLAN_COUNT_UPPER_BOUND",

  SellingPlanDeliveryPolicyMissing = "SELLING_PLAN_DELIVERY_POLICY_MISSING",

  SellingPlanDuplicateName = "SELLING_PLAN_DUPLICATE_NAME",

  SellingPlanDuplicateOptions = "SELLING_PLAN_DUPLICATE_OPTIONS",

  SellingPlanFixedPricingPoliciesLimit = "SELLING_PLAN_FIXED_PRICING_POLICIES_LIMIT",

  SellingPlanMaxCyclesMustBeGreaterThanMinCycles = "SELLING_PLAN_MAX_CYCLES_MUST_BE_GREATER_THAN_MIN_CYCLES",

  SellingPlanMissingOption2LabelOnParentGroup = "SELLING_PLAN_MISSING_OPTION2_LABEL_ON_PARENT_GROUP",

  SellingPlanMissingOption3LabelOnParentGroup = "SELLING_PLAN_MISSING_OPTION3_LABEL_ON_PARENT_GROUP",

  SellingPlanOption2RequiredAsDefinedOnParentGroup = "SELLING_PLAN_OPTION2_REQUIRED_AS_DEFINED_ON_PARENT_GROUP",

  SellingPlanOption3RequiredAsDefinedOnParentGroup = "SELLING_PLAN_OPTION3_REQUIRED_AS_DEFINED_ON_PARENT_GROUP",

  SellingPlanPricingPoliciesLimit = "SELLING_PLAN_PRICING_POLICIES_LIMIT",

  SellingPlanPricingPoliciesMustContainAFixedPricingPolicy = "SELLING_PLAN_PRICING_POLICIES_MUST_CONTAIN_A_FIXED_PRICING_POLICY",

  Taken = "TAKEN",

  TooBig = "TOO_BIG",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  WrongLength = "WRONG_LENGTH",
}

export type SellingPlanInput = {
  billingPolicy?: InputMaybe<SellingPlanBillingPolicyInput>

  category?: InputMaybe<SellingPlanCategory>

  deliveryPolicy?: InputMaybe<SellingPlanDeliveryPolicyInput>

  description?: InputMaybe<Scalars["String"]["input"]>

  id?: InputMaybe<Scalars["ID"]["input"]>

  inventoryPolicy?: InputMaybe<SellingPlanInventoryPolicyInput>

  name?: InputMaybe<Scalars["String"]["input"]>

  options?: InputMaybe<Array<Scalars["String"]["input"]>>

  position?: InputMaybe<Scalars["Int"]["input"]>

  pricingPolicies?: InputMaybe<Array<SellingPlanPricingPolicyInput>>
}

export enum SellingPlanInterval {
  Day = "DAY",

  Month = "MONTH",

  Week = "WEEK",

  Year = "YEAR",
}

export type SellingPlanInventoryPolicy = {
  __typename?: "SellingPlanInventoryPolicy"

  reserve: SellingPlanReserve
}

export type SellingPlanInventoryPolicyInput = {
  reserve?: InputMaybe<SellingPlanReserve>
}

export type SellingPlanPricingPolicy = SellingPlanFixedPricingPolicy | SellingPlanRecurringPricingPolicy

export enum SellingPlanPricingPolicyAdjustmentType {
  FixedAmount = "FIXED_AMOUNT",

  Percentage = "PERCENTAGE",

  Price = "PRICE",
}

export type SellingPlanPricingPolicyAdjustmentValue = MoneyV2 | SellingPlanPricingPolicyPercentageValue

export type SellingPlanPricingPolicyBase = {
  adjustmentType: SellingPlanPricingPolicyAdjustmentType

  adjustmentValue: SellingPlanPricingPolicyAdjustmentValue
}

export type SellingPlanPricingPolicyInput = {
  fixed?: InputMaybe<SellingPlanFixedPricingPolicyInput>

  recurring?: InputMaybe<SellingPlanRecurringPricingPolicyInput>
}

export type SellingPlanPricingPolicyPercentageValue = {
  __typename?: "SellingPlanPricingPolicyPercentageValue"

  percentage: Scalars["Float"]["output"]
}

export type SellingPlanPricingPolicyValueInput = {
  fixedValue?: InputMaybe<Scalars["Decimal"]["input"]>

  percentage?: InputMaybe<Scalars["Float"]["input"]>
}

export type SellingPlanRecurringBillingPolicy = {
  __typename?: "SellingPlanRecurringBillingPolicy"

  anchors: Array<SellingPlanAnchor>

  createdAt: Scalars["DateTime"]["output"]

  interval: SellingPlanInterval

  intervalCount: Scalars["Int"]["output"]

  maxCycles?: Maybe<Scalars["Int"]["output"]>

  minCycles?: Maybe<Scalars["Int"]["output"]>
}

export type SellingPlanRecurringBillingPolicyInput = {
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>

  interval?: InputMaybe<SellingPlanInterval>

  intervalCount?: InputMaybe<Scalars["Int"]["input"]>

  maxCycles?: InputMaybe<Scalars["Int"]["input"]>

  minCycles?: InputMaybe<Scalars["Int"]["input"]>
}

export type SellingPlanRecurringDeliveryPolicy = {
  __typename?: "SellingPlanRecurringDeliveryPolicy"

  anchors: Array<SellingPlanAnchor>

  createdAt: Scalars["DateTime"]["output"]

  cutoff?: Maybe<Scalars["Int"]["output"]>

  intent: SellingPlanRecurringDeliveryPolicyIntent

  interval: SellingPlanInterval

  intervalCount: Scalars["Int"]["output"]

  preAnchorBehavior: SellingPlanRecurringDeliveryPolicyPreAnchorBehavior
}

export type SellingPlanRecurringDeliveryPolicyInput = {
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>

  cutoff?: InputMaybe<Scalars["Int"]["input"]>

  intent?: InputMaybe<SellingPlanRecurringDeliveryPolicyIntent>

  interval?: InputMaybe<SellingPlanInterval>

  intervalCount?: InputMaybe<Scalars["Int"]["input"]>

  preAnchorBehavior?: InputMaybe<SellingPlanRecurringDeliveryPolicyPreAnchorBehavior>
}

export enum SellingPlanRecurringDeliveryPolicyIntent {
  FulfillmentBegin = "FULFILLMENT_BEGIN",
}

export enum SellingPlanRecurringDeliveryPolicyPreAnchorBehavior {
  Asap = "ASAP",

  Next = "NEXT",
}

export type SellingPlanRecurringPricingPolicy = SellingPlanPricingPolicyBase & {
  __typename?: "SellingPlanRecurringPricingPolicy"

  adjustmentType: SellingPlanPricingPolicyAdjustmentType

  adjustmentValue: SellingPlanPricingPolicyAdjustmentValue

  afterCycle?: Maybe<Scalars["Int"]["output"]>

  createdAt: Scalars["DateTime"]["output"]
}

export type SellingPlanRecurringPricingPolicyInput = {
  adjustmentType?: InputMaybe<SellingPlanPricingPolicyAdjustmentType>

  adjustmentValue?: InputMaybe<SellingPlanPricingPolicyValueInput>

  afterCycle: Scalars["Int"]["input"]

  id?: InputMaybe<Scalars["ID"]["input"]>
}

export enum SellingPlanRemainingBalanceChargeTrigger {
  ExactTime = "EXACT_TIME",

  NoRemainingBalance = "NO_REMAINING_BALANCE",

  TimeAfterCheckout = "TIME_AFTER_CHECKOUT",
}

export enum SellingPlanReserve {
  OnFulfillment = "ON_FULFILLMENT",

  OnSale = "ON_SALE",
}

export type ServerPixel = Node & {
  __typename?: "ServerPixel"

  id: Scalars["ID"]["output"]

  status?: Maybe<ServerPixelStatus>

  webhookEndpointAddress?: Maybe<Scalars["String"]["output"]>
}

export type ServerPixelCreatePayload = {
  __typename?: "ServerPixelCreatePayload"

  serverPixel?: Maybe<ServerPixel>

  userErrors: Array<ErrorsServerPixelUserError>
}

export type ServerPixelDeletePayload = {
  __typename?: "ServerPixelDeletePayload"

  deletedServerPixelId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<ErrorsServerPixelUserError>
}

export enum ServerPixelStatus {
  Connected = "CONNECTED",

  DisconnectedConfigured = "DISCONNECTED_CONFIGURED",

  DisconnectedUnconfigured = "DISCONNECTED_UNCONFIGURED",
}

export enum ShippingDiscountClass {
  Shipping = "SHIPPING",
}

export type ShippingLine = {
  __typename?: "ShippingLine"

  carrierIdentifier?: Maybe<Scalars["String"]["output"]>

  code?: Maybe<Scalars["String"]["output"]>

  custom: Scalars["Boolean"]["output"]

  deliveryCategory?: Maybe<Scalars["String"]["output"]>

  discountAllocations: Array<DiscountAllocation>
  /**
   * The pre-tax shipping price with discounts applied.
   * @deprecated Use `discountedPriceSet` instead.
   */
  discountedPrice: MoneyV2

  discountedPriceSet: MoneyBag

  id?: Maybe<Scalars["ID"]["output"]>
  /**
   * The pre-tax shipping price without any discounts applied.
   * @deprecated Use `originalPriceSet` instead.
   */
  originalPrice: MoneyV2

  originalPriceSet: MoneyBag

  phone?: Maybe<Scalars["String"]["output"]>
  /**
   * Returns the price of the shipping line.
   * @deprecated Use `originalPriceSet` instead.
   */
  price: Scalars["Money"]["output"]

  requestedFulfillmentService?: Maybe<FulfillmentService>

  shippingRateHandle?: Maybe<Scalars["String"]["output"]>

  source?: Maybe<Scalars["String"]["output"]>

  taxLines: Array<TaxLine>

  title: Scalars["String"]["output"]
}

export type ShippingLineConnection = {
  __typename?: "ShippingLineConnection"

  edges: Array<ShippingLineEdge>

  nodes: Array<ShippingLine>

  pageInfo: PageInfo
}

export type ShippingLineEdge = {
  __typename?: "ShippingLineEdge"

  cursor: Scalars["String"]["output"]

  node: ShippingLine
}

export type ShippingLineInput = {
  price?: InputMaybe<Scalars["Money"]["input"]>

  shippingRateHandle?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type ShippingLineSale = Sale & {
  __typename?: "ShippingLineSale"

  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  shippingLine?: Maybe<ShippingLine>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export type ShippingMethod = {
  __typename?: "ShippingMethod"

  code: Scalars["String"]["output"]

  label: Scalars["String"]["output"]
}

export type ShippingPackageDeletePayload = {
  __typename?: "ShippingPackageDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type ShippingPackageMakeDefaultPayload = {
  __typename?: "ShippingPackageMakeDefaultPayload"

  userErrors: Array<UserError>
}

export enum ShippingPackageType {
  Box = "BOX",

  Envelope = "ENVELOPE",

  FlatRate = "FLAT_RATE",

  SoftPack = "SOFT_PACK",
}

export type ShippingPackageUpdatePayload = {
  __typename?: "ShippingPackageUpdatePayload"

  userErrors: Array<UserError>
}

export type ShippingRate = {
  __typename?: "ShippingRate"

  handle: Scalars["String"]["output"]

  price: MoneyV2

  title: Scalars["String"]["output"]
}

export type ShippingRefund = {
  __typename?: "ShippingRefund"
  /**
   * The monetary value of the shipping fees to be refunded.
   * @deprecated Use `amountSet` instead.
   */
  amount: Scalars["Money"]["output"]

  amountSet: MoneyBag
  /**
   * The maximum amount of shipping fees currently refundable.
   * @deprecated Use `maximumRefundableSet` instead.
   */
  maximumRefundable: Scalars["Money"]["output"]

  maximumRefundableSet: MoneyBag
  /**
   * The monetary value of the tax allocated to shipping fees to be refunded.
   * @deprecated Use `taxSet` instead.
   */
  tax: Scalars["Money"]["output"]

  taxSet: MoneyBag
}

export type ShippingRefundInput = {
  amount?: InputMaybe<Scalars["Money"]["input"]>

  fullRefund?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type Shop = HasMetafields &
  HasPublishedTranslations &
  Node & {
    __typename?: "Shop"

    alerts: Array<ShopAlert>

    allProductCategories: Array<ProductCategory>
    /**
     * The token required to query the shop's reports or dashboards.
     * @deprecated Not supported anymore.
     */
    analyticsToken: Scalars["String"]["output"]

    assignedFulfillmentOrders: FulfillmentOrderConnection

    availableChannelApps: AppConnection

    billingAddress: ShopAddress
    /**
     * Exposes the number of channels.
     * @deprecated Use `publicationCount` instead.
     */
    channelCount: Scalars["Int"]["output"]

    channelDefinitionsForInstalledChannels: Array<AvailableChannelDefinitionsByChannel>
    /**
     * List of the shop's active sales channels.
     * @deprecated Use `QueryRoot.channels` instead.
     */
    channels: ChannelConnection

    checkoutApiSupported: Scalars["Boolean"]["output"]
    /**
     * Return a collection by its handle.
     * @deprecated Use `QueryRoot.collectionByHandle` instead.
     */
    collectionByHandle?: Maybe<Collection>
    /**
     * List of the shop's collection saved searches.
     * @deprecated Use `QueryRoot.collectionSavedSearches` instead.
     */
    collectionSavedSearches: SavedSearchConnection
    /**
     * List of the shop's collections.
     * @deprecated Use `QueryRoot.collections` instead.
     */
    collections: CollectionConnection

    contactEmail: Scalars["String"]["output"]

    countriesInShippingZones: CountriesInShippingZones

    currencyCode: CurrencyCode

    currencyFormats: CurrencyFormats

    currencySettings: CurrencySettingConnection

    customerAccounts: ShopCustomerAccountsSetting

    customerAccountsV2: CustomerAccountsV2
    /**
     * List of the shop's customer saved searches.
     * @deprecated Use `QueryRoot.customerSavedSearches` instead.
     */
    customerSavedSearches: SavedSearchConnection

    customerTags: StringConnection
    /**
     * Customer accounts associated to the shop.
     * @deprecated Use `QueryRoot.customers` instead.
     */
    customers: CustomerConnection

    description?: Maybe<Scalars["String"]["output"]>
    /**
     * The domains configured for the shop.
     * @deprecated Use `domainsPaginated` instead.
     */
    domains: Array<Domain>
    /**
     * List of the shop's draft order saved searches.
     * @deprecated Use `QueryRoot.draftOrderSavedSearches` instead.
     */
    draftOrderSavedSearches: SavedSearchConnection

    draftOrderTags: StringConnection
    /**
     * List of saved draft orders on the shop.
     * @deprecated Use `QueryRoot.draftOrders` instead.
     */
    draftOrders: DraftOrderConnection

    email: Scalars["String"]["output"]

    enabledPresentmentCurrencies: Array<CurrencyCode>

    features: ShopFeatures
    /**
     * The paginated list of merchant-managed and third-party fulfillment orders.
     * @deprecated Use `QueryRoot.fulfillmentOrders` instead.
     */
    fulfillmentOrders: FulfillmentOrderConnection

    fulfillmentServices: Array<FulfillmentService>

    ianaTimezone: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]
    /**
     * List of the shop's inventory items.
     * @deprecated Use `QueryRoot.inventoryItems` instead.
     */
    inventoryItems: InventoryItemConnection

    limitedPendingOrderCount: LimitedPendingOrderCount
    /**
     * List of active locations of the shop.
     * @deprecated Use `QueryRoot.locations` instead.
     */
    locations: LocationConnection
    /**
     * List of a shop's marketing events.
     * @deprecated Use `QueryRoot.marketingEvents` instead.
     */
    marketingEvents: MarketingEventConnection

    merchantApprovalSignals?: Maybe<MerchantApprovalSignals>

    metafield?: Maybe<Metafield>

    metafields: MetafieldConnection

    myshopifyDomain: Scalars["String"]["output"]

    name: Scalars["String"]["output"]

    navigationSettings: Array<NavigationItem>

    orderNumberFormatPrefix: Scalars["String"]["output"]

    orderNumberFormatSuffix: Scalars["String"]["output"]
    /**
     * List of the shop's order saved searches.
     * @deprecated Use `QueryRoot.orderSavedSearches` instead.
     */
    orderSavedSearches: SavedSearchConnection

    orderTags: StringConnection
    /**
     * A list of the shop's orders.
     * @deprecated Use `QueryRoot.orders` instead.
     */
    orders: OrderConnection

    paymentSettings: PaymentSettings
    /**
     * Number of pending orders on the shop.
     * @deprecated Use `limitedPendingOrderCount` instead.
     */
    pendingOrderCount: Scalars["Int"]["output"]

    plan: ShopPlan
    /**
     * List of the shop's price rule saved searches.
     * @deprecated Use `QueryRoot.priceRuleSavedSearches` instead.
     */
    priceRuleSavedSearches: SavedSearchConnection
    /**
     * List of the shop’s price rules.
     * @deprecated Use `QueryRoot.priceRules` instead.
     */
    priceRules: PriceRuleConnection

    primaryDomain: Domain
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection
    /**
     * Return a product by its handle.
     * @deprecated Use `QueryRoot.productByHandle` instead.
     */
    productByHandle?: Maybe<Product>

    productImages: ImageConnection
    /**
     * List of the shop's product saved searches.
     * @deprecated Use `QueryRoot.productSavedSearches` instead.
     */
    productSavedSearches: SavedSearchConnection

    productTags: StringConnection

    productTypes: StringConnection
    /**
     * List of the shop's product variants.
     * @deprecated Use `QueryRoot.productVariants` instead.
     */
    productVariants: ProductVariantConnection

    productVendors: StringConnection
    /**
     * List of the shop's products.
     * @deprecated Use `QueryRoot.products`.
     */
    products: ProductConnection

    publicationCount: Scalars["Int"]["output"]

    resourceLimits: ShopResourceLimits

    richTextEditorUrl: Scalars["URL"]["output"]

    search: SearchResultConnection

    searchFilters: SearchFilterOptions

    setupRequired: Scalars["Boolean"]["output"]

    shipsToCountries: Array<CountryCode>

    shopPolicies: Array<ShopPolicy>

    staffMembers: StaffMemberConnection

    storefrontAccessTokens: StorefrontAccessTokenConnection
    /**
     * The URL of the shop's storefront.
     * @deprecated Use `url` instead.
     */
    storefrontUrl: Scalars["URL"]["output"]

    taxShipping: Scalars["Boolean"]["output"]

    taxesIncluded: Scalars["Boolean"]["output"]

    timezoneAbbreviation: Scalars["String"]["output"]

    timezoneOffset: Scalars["String"]["output"]

    timezoneOffsetMinutes: Scalars["Int"]["output"]

    transactionalSmsDisabled: Scalars["Boolean"]["output"]

    translations: Array<Translation>

    unitSystem: UnitSystem

    uploadedImagesByIds: Array<Image>

    url: Scalars["URL"]["output"]

    weightUnit: WeightUnit
  }

export type ShopAssignedFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  assignmentStatus?: InputMaybe<FulfillmentOrderAssignmentStatus>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  locationIds?: InputMaybe<Array<Scalars["ID"]["input"]>>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<FulfillmentOrderSortKeys>
}

export type ShopAvailableChannelAppsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopChannelsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopCollectionByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type ShopCollectionSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<CollectionSortKeys>
}

export type ShopCurrencySettingsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopCustomerSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CustomerSavedSearchSortKeys>
}

export type ShopCustomerTagsArgs = {
  first: Scalars["Int"]["input"]
}

export type ShopCustomersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<CustomerSortKeys>
}

export type ShopDraftOrderSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopDraftOrderTagsArgs = {
  first: Scalars["Int"]["input"]
}

export type ShopDraftOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<DraftOrderSortKeys>
}

export type ShopFulfillmentOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  includeClosed?: InputMaybe<Scalars["Boolean"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<FulfillmentOrderSortKeys>
}

export type ShopInventoryItemsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopLocationsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  includeInactive?: InputMaybe<Scalars["Boolean"]["input"]>
  includeLegacy?: InputMaybe<Scalars["Boolean"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<LocationSortKeys>
}

export type ShopMarketingEventsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MarketingEventSortKeys>
}

export type ShopMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ShopMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopOrderSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopOrderTagsArgs = {
  first: Scalars["Int"]["input"]
  sort?: InputMaybe<ShopTagSort>
}

export type ShopOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<OrderSortKeys>
}

export type ShopPriceRuleSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopPriceRulesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<PriceRuleSortKeys>
}

export type ShopPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type ShopPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopProductByHandleArgs = {
  handle: Scalars["String"]["input"]
}

export type ShopProductImagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductImageSortKeys>
}

export type ShopProductSavedSearchesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopProductTagsArgs = {
  first: Scalars["Int"]["input"]
}

export type ShopProductTypesArgs = {
  first: Scalars["Int"]["input"]
}

export type ShopProductVariantsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<ProductVariantSortKeys>
}

export type ShopProductVendorsArgs = {
  first: Scalars["Int"]["input"]
}

export type ShopProductsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<ProductSortKeys>
}

export type ShopSearchArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  first: Scalars["Int"]["input"]
  query: Scalars["String"]["input"]
  types?: InputMaybe<Array<SearchResultType>>
}

export type ShopStaffMembersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopStorefrontAccessTokensArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export type ShopUploadedImagesByIdsArgs = {
  imageIds: Array<Scalars["ID"]["input"]>
}

export type ShopAddress = Node & {
  __typename?: "ShopAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  company?: Maybe<Scalars["String"]["output"]>

  coordinatesValidated: Scalars["Boolean"]["output"]

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
  /**
   * The first name.
   * @deprecated Always null in this context.
   */
  firstName?: Maybe<Scalars["String"]["output"]>

  formatted: Array<Scalars["String"]["output"]>

  formattedArea?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]
  /**
   * The last name.
   * @deprecated Always null in this context.
   */
  lastName?: Maybe<Scalars["String"]["output"]>

  latitude?: Maybe<Scalars["Float"]["output"]>

  longitude?: Maybe<Scalars["Float"]["output"]>
  /**
   * The full name, based on firstName and lastName.
   *
   * @deprecated Always null in this context.
   */
  name?: Maybe<Scalars["String"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type ShopAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopAlert = {
  __typename?: "ShopAlert"

  action: ShopAlertAction

  description: Scalars["String"]["output"]
}

export type ShopAlertAction = {
  __typename?: "ShopAlertAction"

  title: Scalars["String"]["output"]

  url: Scalars["URL"]["output"]
}

export type ShopBillingPreferences = {
  __typename?: "ShopBillingPreferences"

  currency: CurrencyCode
}

export enum ShopBranding {
  Rogers = "ROGERS",

  Shopify = "SHOPIFY",

  ShopifyGold = "SHOPIFY_GOLD",

  ShopifyPlus = "SHOPIFY_PLUS",
}

export enum ShopCustomerAccountsSetting {
  Disabled = "DISABLED",
  Optional = "OPTIONAL",
  Required = "REQUIRED",
}

export type ShopFeatures = {
  __typename?: "ShopFeatures"

  avalaraAvatax: Scalars["Boolean"]["output"]

  branding: ShopBranding

  bundles: BundlesFeature

  captcha: Scalars["Boolean"]["output"]

  captchaExternalDomains: Scalars["Boolean"]["output"]

  cartTransform: CartTransformFeature
  /**
   * Whether the delivery profiles functionality is enabled for this shop.
   * @deprecated Delivery profiles are now 100% enabled across Shopify.
   */
  deliveryProfiles: Scalars["Boolean"]["output"]

  dynamicRemarketing: Scalars["Boolean"]["output"]

  eligibleForSubscriptionMigration: Scalars["Boolean"]["output"]

  eligibleForSubscriptions: Scalars["Boolean"]["output"]

  giftCards: Scalars["Boolean"]["output"]

  harmonizedSystemCode: Scalars["Boolean"]["output"]
  /**
   * Whether a shop can enable international domains.
   * @deprecated All shops have international domains through Shopify Markets.
   */
  internationalDomains: Scalars["Boolean"]["output"]

  internationalPriceOverrides: Scalars["Boolean"]["output"]

  internationalPriceRules: Scalars["Boolean"]["output"]

  legacySubscriptionGatewayEnabled: Scalars["Boolean"]["output"]

  liveView: Scalars["Boolean"]["output"]
  /**
   * Whether a shop has multi-location functionality.
   * @deprecated All shops support multi-location inventory. Use `QueryRoot.locations` to determine whether shop has more than one location.
   *
   */
  multiLocation: Scalars["Boolean"]["output"]

  onboardingVisual: Scalars["Boolean"]["output"]

  paypalExpressSubscriptionGatewayStatus: PaypalExpressSubscriptionsGatewayStatus

  reports: Scalars["Boolean"]["output"]

  sellsSubscriptions: Scalars["Boolean"]["output"]
  /**
   * Whether the shop has a Shopify Plus subscription.
   * @deprecated Use Shop.plan.shopifyPlus instead.
   */
  shopifyPlus: Scalars["Boolean"]["output"]

  showMetrics: Scalars["Boolean"]["output"]

  storefront: Scalars["Boolean"]["output"]

  usingShopifyBalance: Scalars["Boolean"]["output"]
}

export type ShopLocale = {
  __typename?: "ShopLocale"

  locale: Scalars["String"]["output"]

  marketWebPresences: Array<MarketWebPresence>

  name: Scalars["String"]["output"]

  primary: Scalars["Boolean"]["output"]

  published: Scalars["Boolean"]["output"]
}

export type ShopLocaleDisablePayload = {
  __typename?: "ShopLocaleDisablePayload"

  locale?: Maybe<Scalars["String"]["output"]>

  userErrors: Array<UserError>
}

export type ShopLocaleEnablePayload = {
  __typename?: "ShopLocaleEnablePayload"

  shopLocale?: Maybe<ShopLocale>

  userErrors: Array<UserError>
}

export type ShopLocaleInput = {
  marketWebPresenceIds?: InputMaybe<Array<Scalars["ID"]["input"]>>

  published?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopLocaleUpdatePayload = {
  __typename?: "ShopLocaleUpdatePayload"

  shopLocale?: Maybe<ShopLocale>

  userErrors: Array<UserError>
}

export type ShopPayInstallmentsPaymentDetails = BasePaymentDetails & {
  __typename?: "ShopPayInstallmentsPaymentDetails"

  paymentMethodName?: Maybe<Scalars["String"]["output"]>
}

export type ShopPlan = {
  __typename?: "ShopPlan"

  displayName: Scalars["String"]["output"]

  partnerDevelopment: Scalars["Boolean"]["output"]

  shopifyPlus: Scalars["Boolean"]["output"]
}

export type ShopPolicy = HasPublishedTranslations &
  Node & {
    __typename?: "ShopPolicy"

    body: Scalars["HTML"]["output"]

    id: Scalars["ID"]["output"]

    translations: Array<Translation>

    type: ShopPolicyType

    url: Scalars["URL"]["output"]
  }

export type ShopPolicyTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
}

export enum ShopPolicyErrorCode {
  TooBig = "TOO_BIG",
}

export type ShopPolicyInput = {
  body: Scalars["String"]["input"]

  type: ShopPolicyType
}

export enum ShopPolicyType {
  ContactInformation = "CONTACT_INFORMATION",

  LegalNotice = "LEGAL_NOTICE",

  PrivacyPolicy = "PRIVACY_POLICY",

  RefundPolicy = "REFUND_POLICY",

  ShippingPolicy = "SHIPPING_POLICY",

  SubscriptionPolicy = "SUBSCRIPTION_POLICY",

  TermsOfSale = "TERMS_OF_SALE",

  TermsOfService = "TERMS_OF_SERVICE",
}

export type ShopPolicyUpdatePayload = {
  __typename?: "ShopPolicyUpdatePayload"

  shopPolicy?: Maybe<ShopPolicy>

  userErrors: Array<ShopPolicyUserError>
}

export type ShopPolicyUserError = DisplayableError & {
  __typename?: "ShopPolicyUserError"

  code?: Maybe<ShopPolicyErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type ShopResourceFeedbackCreatePayload = {
  __typename?: "ShopResourceFeedbackCreatePayload"

  feedback?: Maybe<AppFeedback>

  userErrors: Array<ShopResourceFeedbackCreateUserError>
}

export type ShopResourceFeedbackCreateUserError = DisplayableError & {
  __typename?: "ShopResourceFeedbackCreateUserError"

  code?: Maybe<ShopResourceFeedbackCreateUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ShopResourceFeedbackCreateUserErrorCode {
  Blank = "BLANK",

  Invalid = "INVALID",

  OutdatedFeedback = "OUTDATED_FEEDBACK",

  Present = "PRESENT",
}

export type ShopResourceLimits = {
  __typename?: "ShopResourceLimits"

  locationLimit: Scalars["Int"]["output"]

  maxProductOptions: Scalars["Int"]["output"]

  maxProductVariants: Scalars["Int"]["output"]

  redirectLimitReached: Scalars["Boolean"]["output"]
}

export enum ShopTagSort {
  Alphabetical = "ALPHABETICAL",

  Popular = "POPULAR",
}

export type ShopifyFunction = {
  __typename?: "ShopifyFunction"

  apiType: Scalars["String"]["output"]

  apiVersion: Scalars["String"]["output"]

  app: App

  appBridge: FunctionsAppBridge

  appKey: Scalars["String"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["String"]["output"]

  inputQuery?: Maybe<Scalars["String"]["output"]>

  title: Scalars["String"]["output"]

  useCreationUi: Scalars["Boolean"]["output"]
}

export type ShopifyFunctionConnection = {
  __typename?: "ShopifyFunctionConnection"

  edges: Array<ShopifyFunctionEdge>

  nodes: Array<ShopifyFunction>

  pageInfo: PageInfo
}

export type ShopifyFunctionEdge = {
  __typename?: "ShopifyFunctionEdge"

  cursor: Scalars["String"]["output"]

  node: ShopifyFunction
}

export type ShopifyPaymentsAccount = Node & {
  __typename?: "ShopifyPaymentsAccount"

  activated: Scalars["Boolean"]["output"]

  balance: Array<MoneyV2>

  balanceTransactions: ShopifyPaymentsBalanceTransactionConnection

  bankAccounts: ShopifyPaymentsBankAccountConnection
  /**
   * The statement descriptor used for charges.
   *
   * The statement descriptor appears on a customer's credit card or bank statement when they make a purchase.
   *
   * @deprecated Use `chargeStatementDescriptors` instead.
   */
  chargeStatementDescriptor?: Maybe<Scalars["String"]["output"]>

  chargeStatementDescriptors?: Maybe<ShopifyPaymentsChargeStatementDescriptor>

  country: Scalars["String"]["output"]

  defaultCurrency: CurrencyCode

  disputes: ShopifyPaymentsDisputeConnection

  fraudSettings: ShopifyPaymentsFraudSettings

  id: Scalars["ID"]["output"]

  notificationSettings: ShopifyPaymentsNotificationSettings

  onboardable: Scalars["Boolean"]["output"]

  payoutSchedule: ShopifyPaymentsPayoutSchedule

  payoutStatementDescriptor?: Maybe<Scalars["String"]["output"]>

  payouts: ShopifyPaymentsPayoutConnection

  permittedVerificationDocuments: Array<ShopifyPaymentsVerificationDocument>

  verifications: Array<ShopifyPaymentsVerification>
}

export type ShopifyPaymentsAccountBalanceTransactionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  hideTransfers?: InputMaybe<Scalars["Boolean"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  savedSearchId?: InputMaybe<Scalars["ID"]["input"]>
  sortKey?: InputMaybe<BalanceTransactionSortKeys>
}

export type ShopifyPaymentsAccountBankAccountsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopifyPaymentsAccountDisputesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ShopifyPaymentsAccountPayoutsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  transactionType?: InputMaybe<ShopifyPaymentsPayoutTransactionType>
}

export type ShopifyPaymentsAdjustmentOrder = {
  __typename?: "ShopifyPaymentsAdjustmentOrder"

  amount: MoneyV2

  link: Scalars["URL"]["output"]

  name: Scalars["String"]["output"]
}

export type ShopifyPaymentsBalanceTransaction = Node & {
  __typename?: "ShopifyPaymentsBalanceTransaction"

  adjustmentsOrders: Array<ShopifyPaymentsAdjustmentOrder>

  id: Scalars["ID"]["output"]

  net: MoneyV2

  transactionDate: Scalars["DateTime"]["output"]
}

export type ShopifyPaymentsBalanceTransactionConnection = {
  __typename?: "ShopifyPaymentsBalanceTransactionConnection"

  edges: Array<ShopifyPaymentsBalanceTransactionEdge>

  nodes: Array<ShopifyPaymentsBalanceTransaction>

  pageInfo: PageInfo
}

export type ShopifyPaymentsBalanceTransactionEdge = {
  __typename?: "ShopifyPaymentsBalanceTransactionEdge"

  cursor: Scalars["String"]["output"]

  node: ShopifyPaymentsBalanceTransaction
}

export type ShopifyPaymentsBankAccount = Node & {
  __typename?: "ShopifyPaymentsBankAccount"

  accountNumber: Scalars["String"]["output"]

  accountNumberLastDigits: Scalars["String"]["output"]

  bankName?: Maybe<Scalars["String"]["output"]>

  country: CountryCode

  createdAt: Scalars["DateTime"]["output"]

  currency: CurrencyCode

  id: Scalars["ID"]["output"]

  payouts: ShopifyPaymentsPayoutConnection

  routingNumber: Scalars["String"]["output"]

  status: ShopifyPaymentsBankAccountStatus
}

export type ShopifyPaymentsBankAccountPayoutsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  transactionType?: InputMaybe<ShopifyPaymentsPayoutTransactionType>
}

export type ShopifyPaymentsBankAccountConnection = {
  __typename?: "ShopifyPaymentsBankAccountConnection"

  edges: Array<ShopifyPaymentsBankAccountEdge>

  nodes: Array<ShopifyPaymentsBankAccount>

  pageInfo: PageInfo
}

export type ShopifyPaymentsBankAccountEdge = {
  __typename?: "ShopifyPaymentsBankAccountEdge"

  cursor: Scalars["String"]["output"]

  node: ShopifyPaymentsBankAccount
}

export enum ShopifyPaymentsBankAccountStatus {
  Errored = "ERRORED",

  New = "NEW",

  Validated = "VALIDATED",

  Verified = "VERIFIED",
}

export type ShopifyPaymentsChargeStatementDescriptor = {
  default?: Maybe<Scalars["String"]["output"]>

  prefix: Scalars["String"]["output"]
}

export type ShopifyPaymentsDefaultChargeStatementDescriptor = ShopifyPaymentsChargeStatementDescriptor & {
  __typename?: "ShopifyPaymentsDefaultChargeStatementDescriptor"

  default?: Maybe<Scalars["String"]["output"]>

  prefix: Scalars["String"]["output"]
}

export type ShopifyPaymentsDispute = LegacyInteroperability &
  Node & {
    __typename?: "ShopifyPaymentsDispute"

    amount: MoneyV2

    evidenceDueBy?: Maybe<Scalars["Date"]["output"]>

    evidenceSentOn?: Maybe<Scalars["Date"]["output"]>

    finalizedOn?: Maybe<Scalars["Date"]["output"]>

    id: Scalars["ID"]["output"]

    initiatedAt: Scalars["DateTime"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    order?: Maybe<Order>

    reasonDetails: ShopifyPaymentsDisputeReasonDetails

    status: DisputeStatus

    type: DisputeType
  }

export type ShopifyPaymentsDisputeConnection = {
  __typename?: "ShopifyPaymentsDisputeConnection"

  edges: Array<ShopifyPaymentsDisputeEdge>

  nodes: Array<ShopifyPaymentsDispute>

  pageInfo: PageInfo
}

export type ShopifyPaymentsDisputeEdge = {
  __typename?: "ShopifyPaymentsDisputeEdge"

  cursor: Scalars["String"]["output"]

  node: ShopifyPaymentsDispute
}

export type ShopifyPaymentsDisputeEvidence = Node & {
  __typename?: "ShopifyPaymentsDisputeEvidence"

  accessActivityLog?: Maybe<Scalars["String"]["output"]>

  billingAddress?: Maybe<MailingAddress>

  cancellationPolicyDisclosure?: Maybe<Scalars["String"]["output"]>

  cancellationPolicyFile?: Maybe<ShopifyPaymentsDisputeFileUpload>

  cancellationRebuttal?: Maybe<Scalars["String"]["output"]>

  customerCommunicationFile?: Maybe<ShopifyPaymentsDisputeFileUpload>

  customerEmailAddress?: Maybe<Scalars["String"]["output"]>

  customerFirstName?: Maybe<Scalars["String"]["output"]>

  customerLastName?: Maybe<Scalars["String"]["output"]>

  customerPurchaseIp?: Maybe<Scalars["String"]["output"]>

  dispute: ShopifyPaymentsDispute

  disputeFileUploads: Array<ShopifyPaymentsDisputeFileUpload>

  fulfillments: Array<ShopifyPaymentsDisputeFulfillment>

  id: Scalars["ID"]["output"]

  productDescription?: Maybe<Scalars["String"]["output"]>

  refundPolicyDisclosure?: Maybe<Scalars["String"]["output"]>

  refundPolicyFile?: Maybe<ShopifyPaymentsDisputeFileUpload>

  refundRefusalExplanation?: Maybe<Scalars["String"]["output"]>

  serviceDocumentationFile?: Maybe<ShopifyPaymentsDisputeFileUpload>

  shippingAddress?: Maybe<MailingAddress>

  shippingDocumentationFile?: Maybe<ShopifyPaymentsDisputeFileUpload>

  submitted: Scalars["Boolean"]["output"]

  uncategorizedFile?: Maybe<ShopifyPaymentsDisputeFileUpload>

  uncategorizedText?: Maybe<Scalars["String"]["output"]>
}

export enum ShopifyPaymentsDisputeEvidenceFileType {
  CancellationPolicyFile = "CANCELLATION_POLICY_FILE",

  CustomerCommunicationFile = "CUSTOMER_COMMUNICATION_FILE",

  RefundPolicyFile = "REFUND_POLICY_FILE",

  ServiceDocumentationFile = "SERVICE_DOCUMENTATION_FILE",

  ShippingDocumentationFile = "SHIPPING_DOCUMENTATION_FILE",

  UncategorizedFile = "UNCATEGORIZED_FILE",
}

export type ShopifyPaymentsDisputeEvidenceUpdateInput = {
  accessActivityLog?: InputMaybe<Scalars["String"]["input"]>

  cancellationPolicyDisclosure?: InputMaybe<Scalars["String"]["input"]>

  cancellationPolicyFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>

  cancellationRebuttal?: InputMaybe<Scalars["String"]["input"]>

  customerCommunicationFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>

  customerEmailAddress?: InputMaybe<Scalars["String"]["input"]>

  customerFirstName?: InputMaybe<Scalars["String"]["input"]>

  customerLastName?: InputMaybe<Scalars["String"]["input"]>

  refundPolicyDisclosure?: InputMaybe<Scalars["String"]["input"]>

  refundPolicyFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>

  refundRefusalExplanation?: InputMaybe<Scalars["String"]["input"]>

  serviceDocumentationFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>

  shippingAddress?: InputMaybe<MailingAddressInput>

  shippingDocumentationFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>

  submitEvidence?: InputMaybe<Scalars["Boolean"]["input"]>

  uncategorizedFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>

  uncategorizedText?: InputMaybe<Scalars["String"]["input"]>
}

export type ShopifyPaymentsDisputeFileUpload = Node & {
  __typename?: "ShopifyPaymentsDisputeFileUpload"

  disputeEvidenceType?: Maybe<ShopifyPaymentsDisputeEvidenceFileType>

  fileSize: Scalars["Int"]["output"]

  fileType: Scalars["String"]["output"]

  id: Scalars["ID"]["output"]

  originalFileName?: Maybe<Scalars["String"]["output"]>

  url: Scalars["URL"]["output"]
}

export type ShopifyPaymentsDisputeFileUploadUpdateInput = {
  destroy?: InputMaybe<Scalars["Boolean"]["input"]>

  id: Scalars["ID"]["input"]
}

export type ShopifyPaymentsDisputeFulfillment = Node & {
  __typename?: "ShopifyPaymentsDisputeFulfillment"

  id: Scalars["ID"]["output"]

  shippingCarrier?: Maybe<Scalars["String"]["output"]>

  shippingDate?: Maybe<Scalars["Date"]["output"]>

  shippingTrackingNumber?: Maybe<Scalars["String"]["output"]>
}

export enum ShopifyPaymentsDisputeReason {
  BankCannotProcess = "BANK_CANNOT_PROCESS",

  CreditNotProcessed = "CREDIT_NOT_PROCESSED",

  CustomerInitiated = "CUSTOMER_INITIATED",

  DebitNotAuthorized = "DEBIT_NOT_AUTHORIZED",

  Duplicate = "DUPLICATE",

  Fraudulent = "FRAUDULENT",

  General = "GENERAL",

  IncorrectAccountDetails = "INCORRECT_ACCOUNT_DETAILS",

  InsufficientFunds = "INSUFFICIENT_FUNDS",

  ProductNotReceived = "PRODUCT_NOT_RECEIVED",

  ProductUnacceptable = "PRODUCT_UNACCEPTABLE",

  SubscriptionCancelled = "SUBSCRIPTION_CANCELLED",

  Unrecognized = "UNRECOGNIZED",
}

export type ShopifyPaymentsDisputeReasonDetails = {
  __typename?: "ShopifyPaymentsDisputeReasonDetails"

  networkReasonCode?: Maybe<Scalars["String"]["output"]>

  reason: ShopifyPaymentsDisputeReason
}

export type ShopifyPaymentsExtendedAuthorization = {
  __typename?: "ShopifyPaymentsExtendedAuthorization"

  extendedAuthorizationExpiresAt: Scalars["DateTime"]["output"]

  standardAuthorizationExpiresAt: Scalars["DateTime"]["output"]
}

export type ShopifyPaymentsFraudSettings = {
  __typename?: "ShopifyPaymentsFraudSettings"

  declineChargeOnAvsFailure: Scalars["Boolean"]["output"]

  declineChargeOnCvcFailure: Scalars["Boolean"]["output"]
}

export type ShopifyPaymentsJpChargeStatementDescriptor = ShopifyPaymentsChargeStatementDescriptor & {
  __typename?: "ShopifyPaymentsJpChargeStatementDescriptor"

  default?: Maybe<Scalars["String"]["output"]>

  kana?: Maybe<Scalars["String"]["output"]>

  kanji?: Maybe<Scalars["String"]["output"]>

  prefix: Scalars["String"]["output"]
}

export type ShopifyPaymentsNotificationSettings = {
  __typename?: "ShopifyPaymentsNotificationSettings"

  payouts: Scalars["Boolean"]["output"]
}

export type ShopifyPaymentsPayout = LegacyInteroperability &
  Node & {
    __typename?: "ShopifyPaymentsPayout"

    bankAccount?: Maybe<ShopifyPaymentsBankAccount>
    /**
     * The total amount and currency of the payout.
     * @deprecated Use `net` instead.
     */
    gross: MoneyV2

    id: Scalars["ID"]["output"]

    issuedAt: Scalars["DateTime"]["output"]

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    net: MoneyV2

    status: ShopifyPaymentsPayoutStatus

    summary: ShopifyPaymentsPayoutSummary

    transactionType: ShopifyPaymentsPayoutTransactionType
  }

export type ShopifyPaymentsPayoutConnection = {
  __typename?: "ShopifyPaymentsPayoutConnection"

  edges: Array<ShopifyPaymentsPayoutEdge>

  nodes: Array<ShopifyPaymentsPayout>

  pageInfo: PageInfo
}

export type ShopifyPaymentsPayoutEdge = {
  __typename?: "ShopifyPaymentsPayoutEdge"

  cursor: Scalars["String"]["output"]

  node: ShopifyPaymentsPayout
}

export enum ShopifyPaymentsPayoutInterval {
  Daily = "DAILY",

  Manual = "MANUAL",

  Monthly = "MONTHLY",

  Weekly = "WEEKLY",
}

export type ShopifyPaymentsPayoutSchedule = {
  __typename?: "ShopifyPaymentsPayoutSchedule"

  interval: ShopifyPaymentsPayoutInterval

  monthlyAnchor?: Maybe<Scalars["Int"]["output"]>

  weeklyAnchor?: Maybe<DayOfTheWeek>
}

export enum ShopifyPaymentsPayoutStatus {
  Canceled = "CANCELED",

  Failed = "FAILED",

  InTransit = "IN_TRANSIT",

  Paid = "PAID",

  Scheduled = "SCHEDULED",
}

export type ShopifyPaymentsPayoutSummary = {
  __typename?: "ShopifyPaymentsPayoutSummary"

  adjustmentsFee: MoneyV2

  adjustmentsGross: MoneyV2

  chargesFee: MoneyV2

  chargesGross: MoneyV2

  refundsFee: MoneyV2

  refundsFeeGross: MoneyV2

  reservedFundsFee: MoneyV2

  reservedFundsGross: MoneyV2

  retriedPayoutsFee: MoneyV2

  retriedPayoutsGross: MoneyV2
}

export enum ShopifyPaymentsPayoutTransactionType {
  Deposit = "DEPOSIT",

  Withdrawal = "WITHDRAWAL",
}

export type ShopifyPaymentsRefundSet = {
  __typename?: "ShopifyPaymentsRefundSet"

  acquirerReferenceNumber?: Maybe<Scalars["String"]["output"]>
}

export type ShopifyPaymentsTransactionSet = {
  __typename?: "ShopifyPaymentsTransactionSet"

  extendedAuthorizationSet?: Maybe<ShopifyPaymentsExtendedAuthorization>

  refundSet?: Maybe<ShopifyPaymentsRefundSet>
}

export type ShopifyPaymentsVerification = Node & {
  __typename?: "ShopifyPaymentsVerification"

  id: Scalars["ID"]["output"]

  status: ShopifyPaymentsVerificationStatus

  subject: ShopifyPaymentsVerificationSubject
}

export type ShopifyPaymentsVerificationDocument = {
  __typename?: "ShopifyPaymentsVerificationDocument"

  backRequired: Scalars["Boolean"]["output"]

  frontRequired: Scalars["Boolean"]["output"]

  type: ShopifyPaymentsVerificationDocumentType
}

export enum ShopifyPaymentsVerificationDocumentType {
  DriversLicense = "DRIVERS_LICENSE",

  GovernmentIdentification = "GOVERNMENT_IDENTIFICATION",

  Passport = "PASSPORT",
}

export enum ShopifyPaymentsVerificationStatus {
  Pending = "PENDING",

  Unverified = "UNVERIFIED",

  Verified = "VERIFIED",
}

export type ShopifyPaymentsVerificationSubject = {
  __typename?: "ShopifyPaymentsVerificationSubject"

  familyName: Scalars["String"]["output"]

  givenName: Scalars["String"]["output"]
}

export enum ShopifyProtectEligibilityStatus {
  Eligible = "ELIGIBLE",

  NotEligible = "NOT_ELIGIBLE",

  Pending = "PENDING",
}

export type ShopifyProtectOrderEligibility = {
  __typename?: "ShopifyProtectOrderEligibility"

  status: ShopifyProtectEligibilityStatus
}

export type ShopifyProtectOrderSummary = {
  __typename?: "ShopifyProtectOrderSummary"

  eligibility: ShopifyProtectOrderEligibility

  status: ShopifyProtectStatus
}

export enum ShopifyProtectStatus {
  Active = "ACTIVE",

  Inactive = "INACTIVE",

  NotProtected = "NOT_PROTECTED",

  Pending = "PENDING",

  Protected = "PROTECTED",
}

export type ShopifyqlResponse = {
  parseErrors?: Maybe<Array<ParseError>>

  tableData?: Maybe<TableData>
}

export type StaffMember = Node & {
  __typename?: "StaffMember"

  active: Scalars["Boolean"]["output"]

  avatar: Image

  email: Scalars["String"]["output"]

  exists: Scalars["Boolean"]["output"]

  firstName?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  initials?: Maybe<Array<Scalars["String"]["output"]>>

  isShopOwner: Scalars["Boolean"]["output"]

  lastName?: Maybe<Scalars["String"]["output"]>

  locale: Scalars["String"]["output"]

  name: Scalars["String"]["output"]

  phone?: Maybe<Scalars["String"]["output"]>

  privateData: StaffMemberPrivateData
}

export type StaffMemberAvatarArgs = {
  fallback?: InputMaybe<StaffMemberDefaultImage>
}

export type StaffMemberConnection = {
  __typename?: "StaffMemberConnection"

  edges: Array<StaffMemberEdge>

  nodes: Array<StaffMember>

  pageInfo: PageInfo
}

export enum StaffMemberDefaultImage {
  Default = "DEFAULT",

  NotFound = "NOT_FOUND",

  Transparent = "TRANSPARENT",
}

export type StaffMemberEdge = {
  __typename?: "StaffMemberEdge"

  cursor: Scalars["String"]["output"]

  node: StaffMember
}

export enum StaffMemberPermission {
  Applications = "APPLICATIONS",

  Channels = "CHANNELS",

  Customers = "CUSTOMERS",

  Dashboard = "DASHBOARD",

  Domains = "DOMAINS",

  DraftOrders = "DRAFT_ORDERS",

  EditOrders = "EDIT_ORDERS",
  /**
   * The staff has the same permissions as the [store owner](https://shopify.dev/en/manual/your-account/staff-accounts/staff-permissions#store-owner-permissions) with some exceptions, such as modifying the account billing or deleting staff accounts.
   * @deprecated Use the list of the staff member's explicit permissions returned in the `StaffMember.permissions.userPermissions` field instead of `full` permission.
   */
  Full = "FULL",

  GiftCards = "GIFT_CARDS",

  Links = "LINKS",

  Locations = "LOCATIONS",

  Marketing = "MARKETING",

  MarketingSection = "MARKETING_SECTION",

  Orders = "ORDERS",

  Overviews = "OVERVIEWS",

  Pages = "PAGES",

  PayOrdersByVaultedCard = "PAY_ORDERS_BY_VAULTED_CARD",

  Preferences = "PREFERENCES",

  Products = "PRODUCTS",

  Reports = "REPORTS",

  Themes = "THEMES",
  /**
   * The staff member can view and create translations.
   * @deprecated Unused.
   */
  Translations = "TRANSLATIONS",
}

export type StaffMemberPrivateData = {
  __typename?: "StaffMemberPrivateData"

  accountSettingsUrl: Scalars["URL"]["output"]

  createdAt: Scalars["DateTime"]["output"]
  /**
   * Access permissions for the staff member.
   * @deprecated Use StaffMember.permissions.userPermissions instead
   */
  permissions: Array<StaffMemberPermission>
}

/**
 * An image to be uploaded.
 *
 * Deprecated in favor of
 * [StagedUploadInput](https://shopify.dev/api/admin-graphql/latest/objects/StagedUploadInput),
 * which is used by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type StageImageInput = {
  filename: Scalars["String"]["input"]

  httpMethod?: InputMaybe<StagedUploadHttpMethodType>

  mimeType: Scalars["String"]["input"]

  resource: StagedUploadTargetGenerateUploadResource
}

export type StagedMediaUploadTarget = {
  __typename?: "StagedMediaUploadTarget"

  parameters: Array<StagedUploadParameter>

  resourceUrl?: Maybe<Scalars["URL"]["output"]>

  url?: Maybe<Scalars["URL"]["output"]>
}

export enum StagedUploadHttpMethodType {
  Post = "POST",

  Put = "PUT",
}

export type StagedUploadInput = {
  fileSize?: InputMaybe<Scalars["UnsignedInt64"]["input"]>

  filename: Scalars["String"]["input"]

  httpMethod?: InputMaybe<StagedUploadHttpMethodType>

  mimeType: Scalars["String"]["input"]

  resource: StagedUploadTargetGenerateUploadResource
}

export type StagedUploadParameter = {
  __typename?: "StagedUploadParameter"

  name: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

/**
 * Information about the staged target.
 *
 * Deprecated in favor of
 * [StagedMediaUploadTarget](https://shopify.dev/api/admin-graphql/latest/objects/StagedMediaUploadTarget),
 * which is returned by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type StagedUploadTarget = {
  __typename?: "StagedUploadTarget"

  parameters: Array<ImageUploadParameter>

  url: Scalars["String"]["output"]
}

/**
 * The required fields and parameters to generate the URL upload an"
 * asset to Shopify.
 *
 * Deprecated in favor of
 * [StagedUploadInput](https://shopify.dev/api/admin-graphql/latest/objects/StagedUploadInput),
 * which is used by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type StagedUploadTargetGenerateInput = {
  fileSize?: InputMaybe<Scalars["UnsignedInt64"]["input"]>

  filename: Scalars["String"]["input"]

  httpMethod?: InputMaybe<StagedUploadHttpMethodType>

  mimeType: Scalars["String"]["input"]

  resource: StagedUploadTargetGenerateUploadResource
}

export type StagedUploadTargetGeneratePayload = {
  __typename?: "StagedUploadTargetGeneratePayload"

  parameters: Array<MutationsStagedUploadTargetGenerateUploadParameter>

  url: Scalars["String"]["output"]

  userErrors: Array<UserError>
}

export enum StagedUploadTargetGenerateUploadResource {
  BulkMutationVariables = "BULK_MUTATION_VARIABLES",

  CollectionImage = "COLLECTION_IMAGE",

  File = "FILE",

  Image = "IMAGE",

  Model_3D = "MODEL_3D",

  ProductImage = "PRODUCT_IMAGE",

  ReturnLabel = "RETURN_LABEL",

  ShopImage = "SHOP_IMAGE",

  UrlRedirectImport = "URL_REDIRECT_IMPORT",

  Video = "VIDEO",
}

export type StagedUploadTargetsGeneratePayload = {
  __typename?: "StagedUploadTargetsGeneratePayload"

  urls?: Maybe<Array<StagedUploadTarget>>

  userErrors: Array<UserError>
}

export type StagedUploadsCreatePayload = {
  __typename?: "StagedUploadsCreatePayload"

  stagedTargets?: Maybe<Array<StagedMediaUploadTarget>>

  userErrors: Array<UserError>
}

export type StandardMetafieldDefinitionEnablePayload = {
  __typename?: "StandardMetafieldDefinitionEnablePayload"

  createdDefinition?: Maybe<MetafieldDefinition>

  userErrors: Array<StandardMetafieldDefinitionEnableUserError>
}

export type StandardMetafieldDefinitionEnableUserError = DisplayableError & {
  __typename?: "StandardMetafieldDefinitionEnableUserError"

  code?: Maybe<StandardMetafieldDefinitionEnableUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum StandardMetafieldDefinitionEnableUserErrorCode {
  Invalid = "INVALID",

  LimitExceeded = "LIMIT_EXCEEDED",

  Taken = "TAKEN",

  TemplateNotFound = "TEMPLATE_NOT_FOUND",

  TypeNotAllowedForConditions = "TYPE_NOT_ALLOWED_FOR_CONDITIONS",

  UnstructuredAlreadyExists = "UNSTRUCTURED_ALREADY_EXISTS",
}

export type StandardMetafieldDefinitionTemplate = Node & {
  __typename?: "StandardMetafieldDefinitionTemplate"

  description?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  key: Scalars["String"]["output"]

  name: Scalars["String"]["output"]

  namespace: Scalars["String"]["output"]

  ownerTypes: Array<MetafieldOwnerType>

  type: MetafieldDefinitionType

  validations: Array<MetafieldDefinitionValidation>

  visibleToStorefrontApi: Scalars["Boolean"]["output"]
}

export type StandardMetafieldDefinitionTemplateConnection = {
  __typename?: "StandardMetafieldDefinitionTemplateConnection"

  edges: Array<StandardMetafieldDefinitionTemplateEdge>

  nodes: Array<StandardMetafieldDefinitionTemplate>

  pageInfo: PageInfo
}

export type StandardMetafieldDefinitionTemplateEdge = {
  __typename?: "StandardMetafieldDefinitionTemplateEdge"

  cursor: Scalars["String"]["output"]

  node: StandardMetafieldDefinitionTemplate
}

export type StandardMetaobjectDefinitionEnablePayload = {
  __typename?: "StandardMetaobjectDefinitionEnablePayload"

  metaobjectDefinition?: Maybe<MetaobjectDefinition>

  userErrors: Array<MetaobjectUserError>
}

export type StandardizedProductType = {
  __typename?: "StandardizedProductType"

  productTaxonomyNode?: Maybe<ProductTaxonomyNode>
}

export type StandardizedProductTypeInput = {
  productTaxonomyNodeId: Scalars["ID"]["input"]
}

export type StorefrontAccessToken = Node & {
  __typename?: "StorefrontAccessToken"

  accessScopes: Array<AccessScope>

  accessToken: Scalars["String"]["output"]

  createdAt: Scalars["DateTime"]["output"]

  id: Scalars["ID"]["output"]

  title: Scalars["String"]["output"]

  updatedAt: Scalars["DateTime"]["output"]
}

export type StorefrontAccessTokenConnection = {
  __typename?: "StorefrontAccessTokenConnection"

  edges: Array<StorefrontAccessTokenEdge>

  nodes: Array<StorefrontAccessToken>

  pageInfo: PageInfo
}

export type StorefrontAccessTokenCreatePayload = {
  __typename?: "StorefrontAccessTokenCreatePayload"

  shop: Shop

  storefrontAccessToken?: Maybe<StorefrontAccessToken>

  userErrors: Array<UserError>
}

export type StorefrontAccessTokenDeleteInput = {
  id: Scalars["ID"]["input"]
}

export type StorefrontAccessTokenDeletePayload = {
  __typename?: "StorefrontAccessTokenDeletePayload"

  deletedStorefrontAccessTokenId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type StorefrontAccessTokenEdge = {
  __typename?: "StorefrontAccessTokenEdge"

  cursor: Scalars["String"]["output"]

  node: StorefrontAccessToken
}

export type StorefrontAccessTokenInput = {
  title: Scalars["String"]["input"]
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

export type SubscriptionAppliedCodeDiscount = {
  __typename?: "SubscriptionAppliedCodeDiscount"

  id: Scalars["ID"]["output"]

  redeemCode: Scalars["String"]["output"]

  rejectionReason?: Maybe<SubscriptionDiscountRejectionReason>
}

export type SubscriptionAtomicLineInput = {
  discounts?: InputMaybe<Array<SubscriptionAtomicManualDiscountInput>>

  line: SubscriptionLineInput
}

export type SubscriptionAtomicManualDiscountInput = {
  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  value?: InputMaybe<SubscriptionManualDiscountValueInput>
}

export type SubscriptionBillingAttempt = Node & {
  __typename?: "SubscriptionBillingAttempt"

  completedAt?: Maybe<Scalars["DateTime"]["output"]>

  createdAt: Scalars["DateTime"]["output"]

  errorCode?: Maybe<SubscriptionBillingAttemptErrorCode>

  errorMessage?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  idempotencyKey: Scalars["String"]["output"]

  nextActionUrl?: Maybe<Scalars["URL"]["output"]>

  order?: Maybe<Order>

  originTime?: Maybe<Scalars["DateTime"]["output"]>

  ready: Scalars["Boolean"]["output"]

  subscriptionContract: SubscriptionContract
}

export type SubscriptionBillingAttemptConnection = {
  __typename?: "SubscriptionBillingAttemptConnection"

  edges: Array<SubscriptionBillingAttemptEdge>

  nodes: Array<SubscriptionBillingAttempt>

  pageInfo: PageInfo
}

export type SubscriptionBillingAttemptCreatePayload = {
  __typename?: "SubscriptionBillingAttemptCreatePayload"

  subscriptionBillingAttempt?: Maybe<SubscriptionBillingAttempt>

  userErrors: Array<BillingAttemptUserError>
}

export type SubscriptionBillingAttemptEdge = {
  __typename?: "SubscriptionBillingAttemptEdge"

  cursor: Scalars["String"]["output"]

  node: SubscriptionBillingAttempt
}

export enum SubscriptionBillingAttemptErrorCode {
  AmountTooSmall = "AMOUNT_TOO_SMALL",

  AuthenticationError = "AUTHENTICATION_ERROR",

  BuyerCanceledPaymentMethod = "BUYER_CANCELED_PAYMENT_METHOD",

  CustomerInvalid = "CUSTOMER_INVALID",

  CustomerNotFound = "CUSTOMER_NOT_FOUND",

  ExpiredPaymentMethod = "EXPIRED_PAYMENT_METHOD",

  InvalidCustomerBillingAgreement = "INVALID_CUSTOMER_BILLING_AGREEMENT",

  InvalidPaymentMethod = "INVALID_PAYMENT_METHOD",

  InvalidShippingAddress = "INVALID_SHIPPING_ADDRESS",

  InventoryAllocationsNotFound = "INVENTORY_ALLOCATIONS_NOT_FOUND",

  InvoiceAlreadyPaid = "INVOICE_ALREADY_PAID",

  PaymentMethodDeclined = "PAYMENT_METHOD_DECLINED",

  PaymentMethodIncompatibleWithGatewayConfig = "PAYMENT_METHOD_INCOMPATIBLE_WITH_GATEWAY_CONFIG",

  PaymentMethodNotFound = "PAYMENT_METHOD_NOT_FOUND",

  PaymentProviderIsNotEnabled = "PAYMENT_PROVIDER_IS_NOT_ENABLED",

  TestMode = "TEST_MODE",

  TransientError = "TRANSIENT_ERROR",

  UnexpectedError = "UNEXPECTED_ERROR",
}

export type SubscriptionBillingAttemptInput = {
  billingCycleSelector?: InputMaybe<SubscriptionBillingCycleSelector>

  idempotencyKey: Scalars["String"]["input"]

  originTime?: InputMaybe<Scalars["DateTime"]["input"]>
}

export enum SubscriptionBillingAttemptsSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export type SubscriptionBillingCycle = {
  __typename?: "SubscriptionBillingCycle"

  billingAttemptExpectedDate: Scalars["DateTime"]["output"]

  billingAttempts: SubscriptionBillingAttemptConnection

  cycleEndAt: Scalars["DateTime"]["output"]

  cycleIndex: Scalars["Int"]["output"]

  cycleStartAt: Scalars["DateTime"]["output"]

  edited: Scalars["Boolean"]["output"]

  editedContract?: Maybe<SubscriptionBillingCycleEditedContract>

  skipped: Scalars["Boolean"]["output"]

  sourceContract: SubscriptionContract

  status: SubscriptionBillingCycleBillingCycleStatus
}

export type SubscriptionBillingCycleBillingAttemptsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export enum SubscriptionBillingCycleBillingCycleStatus {
  Billed = "BILLED",

  Unbilled = "UNBILLED",
}

export type SubscriptionBillingCycleConnection = {
  __typename?: "SubscriptionBillingCycleConnection"

  edges: Array<SubscriptionBillingCycleEdge>

  nodes: Array<SubscriptionBillingCycle>

  pageInfo: PageInfo
}

export type SubscriptionBillingCycleContractDraftCommitPayload = {
  __typename?: "SubscriptionBillingCycleContractDraftCommitPayload"

  contract?: Maybe<SubscriptionBillingCycleEditedContract>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionBillingCycleContractDraftConcatenatePayload = {
  __typename?: "SubscriptionBillingCycleContractDraftConcatenatePayload"

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionBillingCycleContractEditPayload = {
  __typename?: "SubscriptionBillingCycleContractEditPayload"

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionBillingCycleEdge = {
  __typename?: "SubscriptionBillingCycleEdge"

  cursor: Scalars["String"]["output"]

  node: SubscriptionBillingCycle
}

export type SubscriptionBillingCycleEditDeletePayload = {
  __typename?: "SubscriptionBillingCycleEditDeletePayload"

  billingCycles?: Maybe<Array<SubscriptionBillingCycle>>

  userErrors: Array<SubscriptionBillingCycleUserError>
}

export type SubscriptionBillingCycleEditedContract = SubscriptionContractBase & {
  __typename?: "SubscriptionBillingCycleEditedContract"

  app?: Maybe<App>

  appAdminUrl?: Maybe<Scalars["URL"]["output"]>

  billingCycles: SubscriptionBillingCycleConnection

  createdAt: Scalars["DateTime"]["output"]

  currencyCode: CurrencyCode

  customAttributes: Array<Attribute>

  customer?: Maybe<Customer>

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  deliveryMethod?: Maybe<SubscriptionDeliveryMethod>

  deliveryPrice: MoneyV2

  discounts: SubscriptionManualDiscountConnection

  lineCount: Scalars["Int"]["output"]

  lines: SubscriptionLineConnection

  note?: Maybe<Scalars["String"]["output"]>

  orders: OrderConnection

  updatedAt: Scalars["DateTime"]["output"]
}

export type SubscriptionBillingCycleEditedContractBillingCyclesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SubscriptionBillingCyclesSortKeys>
}

export type SubscriptionBillingCycleEditedContractCustomerPaymentMethodArgs = {
  showRevoked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionBillingCycleEditedContractDiscountsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionBillingCycleEditedContractLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionBillingCycleEditedContractOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionBillingCycleEditsDeletePayload = {
  __typename?: "SubscriptionBillingCycleEditsDeletePayload"

  billingCycles?: Maybe<Array<SubscriptionBillingCycle>>

  userErrors: Array<SubscriptionBillingCycleUserError>
}

export enum SubscriptionBillingCycleErrorCode {
  BillingDateSetOnSkipped = "BILLING_DATE_SET_ON_SKIPPED",

  CycleIndexOutOfRange = "CYCLE_INDEX_OUT_OF_RANGE",

  CycleNotFound = "CYCLE_NOT_FOUND",

  CycleStartDateOutOfRange = "CYCLE_START_DATE_OUT_OF_RANGE",

  EmptyBillingCycleEditScheduleInput = "EMPTY_BILLING_CYCLE_EDIT_SCHEDULE_INPUT",

  IncompleteBillingAttempts = "INCOMPLETE_BILLING_ATTEMPTS",

  Invalid = "INVALID",

  InvalidCycleIndex = "INVALID_CYCLE_INDEX",

  InvalidDate = "INVALID_DATE",

  NoCycleEdits = "NO_CYCLE_EDITS",

  OutOfBounds = "OUT_OF_BOUNDS",

  UpcomingCycleLimitExceeded = "UPCOMING_CYCLE_LIMIT_EXCEEDED",
}

export type SubscriptionBillingCycleInput = {
  contractId: Scalars["ID"]["input"]

  selector: SubscriptionBillingCycleSelector
}

export type SubscriptionBillingCycleScheduleEditInput = {
  billingDate?: InputMaybe<Scalars["DateTime"]["input"]>

  reason: SubscriptionBillingCycleScheduleEditInputScheduleEditReason

  skip?: InputMaybe<Scalars["Boolean"]["input"]>
}

export enum SubscriptionBillingCycleScheduleEditInputScheduleEditReason {
  BuyerInitiated = "BUYER_INITIATED",

  DevInitiated = "DEV_INITIATED",

  MerchantInitiated = "MERCHANT_INITIATED",
}

export type SubscriptionBillingCycleScheduleEditPayload = {
  __typename?: "SubscriptionBillingCycleScheduleEditPayload"

  billingCycle?: Maybe<SubscriptionBillingCycle>

  userErrors: Array<SubscriptionBillingCycleUserError>
}

export type SubscriptionBillingCycleSelector = {
  date?: InputMaybe<Scalars["DateTime"]["input"]>

  index?: InputMaybe<Scalars["Int"]["input"]>
}

export type SubscriptionBillingCycleSkipPayload = {
  __typename?: "SubscriptionBillingCycleSkipPayload"

  billingCycle?: Maybe<SubscriptionBillingCycle>

  userErrors: Array<SubscriptionBillingCycleSkipUserError>
}

export type SubscriptionBillingCycleSkipUserError = DisplayableError & {
  __typename?: "SubscriptionBillingCycleSkipUserError"

  code?: Maybe<SubscriptionBillingCycleSkipUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum SubscriptionBillingCycleSkipUserErrorCode {
  Invalid = "INVALID",
}

export type SubscriptionBillingCycleUnskipPayload = {
  __typename?: "SubscriptionBillingCycleUnskipPayload"

  billingCycle?: Maybe<SubscriptionBillingCycle>

  userErrors: Array<SubscriptionBillingCycleUnskipUserError>
}

export type SubscriptionBillingCycleUnskipUserError = DisplayableError & {
  __typename?: "SubscriptionBillingCycleUnskipUserError"

  code?: Maybe<SubscriptionBillingCycleUnskipUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum SubscriptionBillingCycleUnskipUserErrorCode {
  Invalid = "INVALID",
}

export type SubscriptionBillingCycleUserError = DisplayableError & {
  __typename?: "SubscriptionBillingCycleUserError"

  code?: Maybe<SubscriptionBillingCycleErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type SubscriptionBillingCyclesDateRangeSelector = {
  endDate: Scalars["DateTime"]["input"]

  startDate: Scalars["DateTime"]["input"]
}

export type SubscriptionBillingCyclesIndexRangeSelector = {
  endIndex: Scalars["Int"]["input"]

  startIndex: Scalars["Int"]["input"]
}

export enum SubscriptionBillingCyclesSortKeys {
  CycleIndex = "CYCLE_INDEX",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export enum SubscriptionBillingCyclesTargetSelection {
  All = "ALL",
}

export type SubscriptionBillingPolicy = {
  __typename?: "SubscriptionBillingPolicy"

  anchors: Array<SellingPlanAnchor>

  interval: SellingPlanInterval

  intervalCount: Scalars["Int"]["output"]

  maxCycles?: Maybe<Scalars["Int"]["output"]>

  minCycles?: Maybe<Scalars["Int"]["output"]>
}

export type SubscriptionBillingPolicyInput = {
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>

  interval: SellingPlanInterval

  intervalCount: Scalars["Int"]["input"]

  maxCycles?: InputMaybe<Scalars["Int"]["input"]>

  minCycles?: InputMaybe<Scalars["Int"]["input"]>
}

export type SubscriptionContract = Node &
  SubscriptionContractBase & {
    __typename?: "SubscriptionContract"

    app?: Maybe<App>

    appAdminUrl?: Maybe<Scalars["URL"]["output"]>

    billingAttempts: SubscriptionBillingAttemptConnection

    billingPolicy: SubscriptionBillingPolicy

    createdAt: Scalars["DateTime"]["output"]

    currencyCode: CurrencyCode

    customAttributes: Array<Attribute>

    customer?: Maybe<Customer>

    customerPaymentMethod?: Maybe<CustomerPaymentMethod>

    deliveryMethod?: Maybe<SubscriptionDeliveryMethod>

    deliveryPolicy: SubscriptionDeliveryPolicy

    deliveryPrice: MoneyV2

    discounts: SubscriptionManualDiscountConnection

    id: Scalars["ID"]["output"]

    lastPaymentStatus?: Maybe<SubscriptionContractLastPaymentStatus>

    lineCount: Scalars["Int"]["output"]

    lines: SubscriptionLineConnection

    nextBillingDate?: Maybe<Scalars["DateTime"]["output"]>

    note?: Maybe<Scalars["String"]["output"]>

    orders: OrderConnection

    originOrder?: Maybe<Order>

    revisionId: Scalars["UnsignedInt64"]["output"]

    status: SubscriptionContractSubscriptionStatus

    updatedAt: Scalars["DateTime"]["output"]
  }

export type SubscriptionContractBillingAttemptsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractCustomerPaymentMethodArgs = {
  showRevoked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractDiscountsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractActivatePayload = {
  __typename?: "SubscriptionContractActivatePayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionContractStatusUpdateUserError>
}

export type SubscriptionContractAtomicCreateInput = {
  contract: SubscriptionDraftInput

  currencyCode: CurrencyCode

  customerId: Scalars["ID"]["input"]

  discountCodes?: InputMaybe<Array<Scalars["String"]["input"]>>

  lines: Array<SubscriptionAtomicLineInput>

  nextBillingDate: Scalars["DateTime"]["input"]
}

export type SubscriptionContractAtomicCreatePayload = {
  __typename?: "SubscriptionContractAtomicCreatePayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionContractBase = {
  app?: Maybe<App>

  appAdminUrl?: Maybe<Scalars["URL"]["output"]>

  currencyCode: CurrencyCode

  customAttributes: Array<Attribute>

  customer?: Maybe<Customer>

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  deliveryMethod?: Maybe<SubscriptionDeliveryMethod>

  deliveryPrice: MoneyV2

  discounts: SubscriptionManualDiscountConnection

  lineCount: Scalars["Int"]["output"]

  lines: SubscriptionLineConnection

  note?: Maybe<Scalars["String"]["output"]>

  orders: OrderConnection

  updatedAt: Scalars["DateTime"]["output"]
}

export type SubscriptionContractBaseCustomerPaymentMethodArgs = {
  showRevoked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractBaseDiscountsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractBaseLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractBaseOrdersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionContractCancelPayload = {
  __typename?: "SubscriptionContractCancelPayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionContractStatusUpdateUserError>
}

export type SubscriptionContractConnection = {
  __typename?: "SubscriptionContractConnection"

  edges: Array<SubscriptionContractEdge>

  nodes: Array<SubscriptionContract>

  pageInfo: PageInfo
}

export type SubscriptionContractCreateInput = {
  contract: SubscriptionDraftInput

  currencyCode: CurrencyCode

  customerId: Scalars["ID"]["input"]

  nextBillingDate: Scalars["DateTime"]["input"]
}

export type SubscriptionContractCreatePayload = {
  __typename?: "SubscriptionContractCreatePayload"

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionContractEdge = {
  __typename?: "SubscriptionContractEdge"

  cursor: Scalars["String"]["output"]

  node: SubscriptionContract
}

export enum SubscriptionContractErrorCode {
  Invalid = "INVALID",
}

export type SubscriptionContractExpirePayload = {
  __typename?: "SubscriptionContractExpirePayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionContractStatusUpdateUserError>
}

export type SubscriptionContractFailPayload = {
  __typename?: "SubscriptionContractFailPayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionContractStatusUpdateUserError>
}

export enum SubscriptionContractLastPaymentStatus {
  Failed = "FAILED",

  Succeeded = "SUCCEEDED",
}

export type SubscriptionContractPausePayload = {
  __typename?: "SubscriptionContractPausePayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionContractStatusUpdateUserError>
}

export type SubscriptionContractProductChangeInput = {
  currentPrice?: InputMaybe<Scalars["Decimal"]["input"]>

  productVariantId?: InputMaybe<Scalars["ID"]["input"]>
}

export type SubscriptionContractProductChangePayload = {
  __typename?: "SubscriptionContractProductChangePayload"

  contract?: Maybe<SubscriptionContract>

  lineUpdated?: Maybe<SubscriptionLine>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionContractSetNextBillingDatePayload = {
  __typename?: "SubscriptionContractSetNextBillingDatePayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionContractUserError>
}

export enum SubscriptionContractStatusUpdateErrorCode {
  ContractTerminated = "CONTRACT_TERMINATED",

  Invalid = "INVALID",
}

export type SubscriptionContractStatusUpdateUserError = DisplayableError & {
  __typename?: "SubscriptionContractStatusUpdateUserError"

  code?: Maybe<SubscriptionContractStatusUpdateErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum SubscriptionContractSubscriptionStatus {
  Active = "ACTIVE",

  Cancelled = "CANCELLED",

  Expired = "EXPIRED",

  Failed = "FAILED",

  Paused = "PAUSED",
}

export type SubscriptionContractUpdatePayload = {
  __typename?: "SubscriptionContractUpdatePayload"

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionContractUserError = DisplayableError & {
  __typename?: "SubscriptionContractUserError"

  code?: Maybe<SubscriptionContractErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type SubscriptionCyclePriceAdjustment = {
  __typename?: "SubscriptionCyclePriceAdjustment"

  adjustmentType: SellingPlanPricingPolicyAdjustmentType

  adjustmentValue: SellingPlanPricingPolicyAdjustmentValue

  afterCycle: Scalars["Int"]["output"]

  computedPrice: MoneyV2
}

export type SubscriptionDeliveryMethod =
  | SubscriptionDeliveryMethodLocalDelivery
  | SubscriptionDeliveryMethodPickup
  | SubscriptionDeliveryMethodShipping

export type SubscriptionDeliveryMethodInput = {
  localDelivery?: InputMaybe<SubscriptionDeliveryMethodLocalDeliveryInput>

  pickup?: InputMaybe<SubscriptionDeliveryMethodPickupInput>

  shipping?: InputMaybe<SubscriptionDeliveryMethodShippingInput>
}

export type SubscriptionDeliveryMethodLocalDelivery = {
  __typename?: "SubscriptionDeliveryMethodLocalDelivery"

  address: SubscriptionMailingAddress

  localDeliveryOption: SubscriptionDeliveryMethodLocalDeliveryOption
}

export type SubscriptionDeliveryMethodLocalDeliveryInput = {
  address?: InputMaybe<MailingAddressInput>

  localDeliveryOption?: InputMaybe<SubscriptionDeliveryMethodLocalDeliveryOptionInput>
}

export type SubscriptionDeliveryMethodLocalDeliveryOption = {
  __typename?: "SubscriptionDeliveryMethodLocalDeliveryOption"

  code?: Maybe<Scalars["String"]["output"]>

  description?: Maybe<Scalars["String"]["output"]>

  instructions?: Maybe<Scalars["String"]["output"]>

  phone: Scalars["String"]["output"]

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionDeliveryMethodLocalDeliveryOptionInput = {
  code?: InputMaybe<Scalars["String"]["input"]>

  description?: InputMaybe<Scalars["String"]["input"]>

  instructions?: InputMaybe<Scalars["String"]["input"]>

  phone: Scalars["String"]["input"]

  presentmentTitle?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type SubscriptionDeliveryMethodPickup = {
  __typename?: "SubscriptionDeliveryMethodPickup"

  pickupOption: SubscriptionDeliveryMethodPickupOption
}

export type SubscriptionDeliveryMethodPickupInput = {
  pickupOption?: InputMaybe<SubscriptionDeliveryMethodPickupOptionInput>
}

export type SubscriptionDeliveryMethodPickupOption = {
  __typename?: "SubscriptionDeliveryMethodPickupOption"

  code?: Maybe<Scalars["String"]["output"]>

  description?: Maybe<Scalars["String"]["output"]>

  location: Location

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionDeliveryMethodPickupOptionInput = {
  code?: InputMaybe<Scalars["String"]["input"]>

  description?: InputMaybe<Scalars["String"]["input"]>

  locationId: Scalars["ID"]["input"]

  presentmentTitle?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type SubscriptionDeliveryMethodShipping = {
  __typename?: "SubscriptionDeliveryMethodShipping"

  address: SubscriptionMailingAddress

  shippingOption: SubscriptionDeliveryMethodShippingOption
}

export type SubscriptionDeliveryMethodShippingInput = {
  address?: InputMaybe<MailingAddressInput>

  shippingOption?: InputMaybe<SubscriptionDeliveryMethodShippingOptionInput>
}

export type SubscriptionDeliveryMethodShippingOption = {
  __typename?: "SubscriptionDeliveryMethodShippingOption"
  /**
   * The carrier service that's providing this shipping option.
   * This field isn't currently supported and returns null.
   *
   * @deprecated This field has never been implemented.
   */
  carrierService?: Maybe<DeliveryCarrierService>

  code?: Maybe<Scalars["String"]["output"]>

  description?: Maybe<Scalars["String"]["output"]>

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  title?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionDeliveryMethodShippingOptionInput = {
  carrierServiceId?: InputMaybe<Scalars["ID"]["input"]>

  code?: InputMaybe<Scalars["String"]["input"]>

  description?: InputMaybe<Scalars["String"]["input"]>

  presentmentTitle?: InputMaybe<Scalars["String"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type SubscriptionDeliveryOption =
  | SubscriptionLocalDeliveryOption
  | SubscriptionPickupOption
  | SubscriptionShippingOption

export type SubscriptionDeliveryOptionResult =
  | SubscriptionDeliveryOptionResultFailure
  | SubscriptionDeliveryOptionResultSuccess

export type SubscriptionDeliveryOptionResultFailure = {
  __typename?: "SubscriptionDeliveryOptionResultFailure"

  message?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionDeliveryOptionResultSuccess = {
  __typename?: "SubscriptionDeliveryOptionResultSuccess"

  deliveryOptions: Array<SubscriptionDeliveryOption>
}

export type SubscriptionDeliveryPolicy = {
  __typename?: "SubscriptionDeliveryPolicy"

  anchors: Array<SellingPlanAnchor>

  interval: SellingPlanInterval

  intervalCount: Scalars["Int"]["output"]
}

export type SubscriptionDeliveryPolicyInput = {
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>

  interval: SellingPlanInterval

  intervalCount: Scalars["Int"]["input"]
}

export type SubscriptionDiscount = SubscriptionAppliedCodeDiscount | SubscriptionManualDiscount

export type SubscriptionDiscountAllocation = {
  __typename?: "SubscriptionDiscountAllocation"

  amount: MoneyV2

  discount: SubscriptionDiscount
}

export type SubscriptionDiscountConnection = {
  __typename?: "SubscriptionDiscountConnection"

  edges: Array<SubscriptionDiscountEdge>

  nodes: Array<SubscriptionDiscount>

  pageInfo: PageInfo
}

export type SubscriptionDiscountEdge = {
  __typename?: "SubscriptionDiscountEdge"

  cursor: Scalars["String"]["output"]

  node: SubscriptionDiscount
}

export type SubscriptionDiscountEntitledLines = {
  __typename?: "SubscriptionDiscountEntitledLines"

  all: Scalars["Boolean"]["output"]

  lines: SubscriptionLineConnection
}

export type SubscriptionDiscountEntitledLinesLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDiscountFixedAmountValue = {
  __typename?: "SubscriptionDiscountFixedAmountValue"

  amount: MoneyV2

  appliesOnEachItem: Scalars["Boolean"]["output"]
}

export type SubscriptionDiscountPercentageValue = {
  __typename?: "SubscriptionDiscountPercentageValue"

  percentage: Scalars["Int"]["output"]
}

export enum SubscriptionDiscountRejectionReason {
  CurrentlyInactive = "CURRENTLY_INACTIVE",

  CustomerNotEligible = "CUSTOMER_NOT_ELIGIBLE",

  CustomerUsageLimitReached = "CUSTOMER_USAGE_LIMIT_REACHED",

  IncompatiblePurchaseType = "INCOMPATIBLE_PURCHASE_TYPE",

  InternalError = "INTERNAL_ERROR",

  NotFound = "NOT_FOUND",

  NoEntitledLineItems = "NO_ENTITLED_LINE_ITEMS",

  NoEntitledShippingLines = "NO_ENTITLED_SHIPPING_LINES",

  PurchaseNotInRange = "PURCHASE_NOT_IN_RANGE",

  QuantityNotInRange = "QUANTITY_NOT_IN_RANGE",

  UsageLimitReached = "USAGE_LIMIT_REACHED",
}

export type SubscriptionDiscountValue = SubscriptionDiscountFixedAmountValue | SubscriptionDiscountPercentageValue

export type SubscriptionDraft = Node & {
  __typename?: "SubscriptionDraft"

  billingCycle?: Maybe<SubscriptionBillingCycle>

  billingPolicy: SubscriptionBillingPolicy

  concatenatedBillingCycles: SubscriptionBillingCycleConnection

  currencyCode: CurrencyCode

  customAttributes: Array<Attribute>

  customer: Customer

  customerPaymentMethod?: Maybe<CustomerPaymentMethod>

  deliveryMethod?: Maybe<SubscriptionDeliveryMethod>

  deliveryOptions?: Maybe<SubscriptionDeliveryOptionResult>

  deliveryPolicy: SubscriptionDeliveryPolicy

  deliveryPrice?: Maybe<MoneyV2>

  discounts: SubscriptionDiscountConnection

  discountsAdded: SubscriptionDiscountConnection

  discountsRemoved: SubscriptionDiscountConnection

  discountsUpdated: SubscriptionDiscountConnection

  id: Scalars["ID"]["output"]

  lines: SubscriptionLineConnection

  linesAdded: SubscriptionLineConnection

  linesRemoved: SubscriptionLineConnection

  nextBillingDate?: Maybe<Scalars["DateTime"]["output"]>

  note?: Maybe<Scalars["String"]["output"]>

  originalContract?: Maybe<SubscriptionContract>
  /**
   * Available Shipping Options for a given delivery address. Returns NULL for pending requests.
   *
   * @deprecated Use `deliveryOptions` instead.
   */
  shippingOptions?: Maybe<SubscriptionShippingOptionResult>

  status?: Maybe<SubscriptionContractSubscriptionStatus>
}

export type SubscriptionDraftConcatenatedBillingCyclesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<SubscriptionBillingCyclesSortKeys>
}

export type SubscriptionDraftCustomerPaymentMethodArgs = {
  showRevoked?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftDeliveryOptionsArgs = {
  deliveryAddress?: InputMaybe<MailingAddressInput>
}

export type SubscriptionDraftDiscountsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftDiscountsAddedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftDiscountsRemovedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftDiscountsUpdatedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftLinesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftLinesAddedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftLinesRemovedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionDraftShippingOptionsArgs = {
  deliveryAddress?: InputMaybe<MailingAddressInput>
}

export type SubscriptionDraftCommitPayload = {
  __typename?: "SubscriptionDraftCommitPayload"

  contract?: Maybe<SubscriptionContract>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftDiscountAddPayload = {
  __typename?: "SubscriptionDraftDiscountAddPayload"

  discountAdded?: Maybe<SubscriptionManualDiscount>

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftDiscountCodeApplyPayload = {
  __typename?: "SubscriptionDraftDiscountCodeApplyPayload"

  appliedDiscount?: Maybe<SubscriptionAppliedCodeDiscount>

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftDiscountRemovePayload = {
  __typename?: "SubscriptionDraftDiscountRemovePayload"

  discountRemoved?: Maybe<SubscriptionDiscount>

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftDiscountUpdatePayload = {
  __typename?: "SubscriptionDraftDiscountUpdatePayload"

  discountUpdated?: Maybe<SubscriptionManualDiscount>

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export enum SubscriptionDraftErrorCode {
  AlreadyRemoved = "ALREADY_REMOVED",

  BillingCycleAbsent = "BILLING_CYCLE_ABSENT",

  BillingCycleContractDraftBillingPolicyInvalid = "BILLING_CYCLE_CONTRACT_DRAFT_BILLING_POLICY_INVALID",

  BillingCycleContractDraftDeliveryPolicyInvalid = "BILLING_CYCLE_CONTRACT_DRAFT_DELIVERY_POLICY_INVALID",

  BillingCyclePresent = "BILLING_CYCLE_PRESENT",

  Blank = "BLANK",

  Committed = "COMMITTED",

  ConcatenationBillingCycleContractDraftRequired = "CONCATENATION_BILLING_CYCLE_CONTRACT_DRAFT_REQUIRED",

  CurrencyNotEnabled = "CURRENCY_NOT_ENABLED",

  CustomerDoesNotExist = "CUSTOMER_DOES_NOT_EXIST",

  CustomerMismatch = "CUSTOMER_MISMATCH",

  CycleDiscountsUniqueAfterCycle = "CYCLE_DISCOUNTS_UNIQUE_AFTER_CYCLE",

  CycleIndexOutOfRange = "CYCLE_INDEX_OUT_OF_RANGE",

  CycleSelectorValidateOneOf = "CYCLE_SELECTOR_VALIDATE_ONE_OF",

  CycleStartDateOutOfRange = "CYCLE_START_DATE_OUT_OF_RANGE",

  DeliveryMethodRequired = "DELIVERY_METHOD_REQUIRED",

  DeliveryMustBeMultipleOfBilling = "DELIVERY_MUST_BE_MULTIPLE_OF_BILLING",

  DuplicateConcatenatedContracts = "DUPLICATE_CONCATENATED_CONTRACTS",

  ExceededMaxConcatenatedContracts = "EXCEEDED_MAX_CONCATENATED_CONTRACTS",

  GreaterThan = "GREATER_THAN",

  GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",

  HasFutureEdits = "HAS_FUTURE_EDITS",

  Invalid = "INVALID",

  InvalidAdjustmentType = "INVALID_ADJUSTMENT_TYPE",

  InvalidAdjustmentValue = "INVALID_ADJUSTMENT_VALUE",

  InvalidBillingDate = "INVALID_BILLING_DATE",

  InvalidLines = "INVALID_LINES",

  InvalidNoteLength = "INVALID_NOTE_LENGTH",

  LessThan = "LESS_THAN",

  LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",

  MissingLocalDeliveryOptions = "MISSING_LOCAL_DELIVERY_OPTIONS",

  NotAnInteger = "NOT_AN_INTEGER",

  NotInRange = "NOT_IN_RANGE",

  NoEntitledLines = "NO_ENTITLED_LINES",

  Presence = "PRESENCE",

  SellingPlanMaxCyclesMustBeGreaterThanMinCycles = "SELLING_PLAN_MAX_CYCLES_MUST_BE_GREATER_THAN_MIN_CYCLES",

  StaleContract = "STALE_CONTRACT",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UpcomingCycleLimitExceeded = "UPCOMING_CYCLE_LIMIT_EXCEEDED",
}

export type SubscriptionDraftFreeShippingDiscountAddPayload = {
  __typename?: "SubscriptionDraftFreeShippingDiscountAddPayload"

  discountAdded?: Maybe<SubscriptionManualDiscount>

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftFreeShippingDiscountUpdatePayload = {
  __typename?: "SubscriptionDraftFreeShippingDiscountUpdatePayload"

  discountUpdated?: Maybe<SubscriptionManualDiscount>

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftInput = {
  billingPolicy?: InputMaybe<SubscriptionBillingPolicyInput>

  customAttributes?: InputMaybe<Array<AttributeInput>>

  deliveryMethod?: InputMaybe<SubscriptionDeliveryMethodInput>

  deliveryPolicy?: InputMaybe<SubscriptionDeliveryPolicyInput>

  deliveryPrice?: InputMaybe<Scalars["Decimal"]["input"]>

  nextBillingDate?: InputMaybe<Scalars["DateTime"]["input"]>

  note?: InputMaybe<Scalars["String"]["input"]>

  paymentMethodId?: InputMaybe<Scalars["ID"]["input"]>

  status?: InputMaybe<SubscriptionContractSubscriptionStatus>
}

export type SubscriptionDraftLineAddPayload = {
  __typename?: "SubscriptionDraftLineAddPayload"

  draft?: Maybe<SubscriptionDraft>

  lineAdded?: Maybe<SubscriptionLine>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftLineRemovePayload = {
  __typename?: "SubscriptionDraftLineRemovePayload"

  discountsUpdated?: Maybe<Array<SubscriptionManualDiscount>>

  draft?: Maybe<SubscriptionDraft>

  lineRemoved?: Maybe<SubscriptionLine>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftLineUpdatePayload = {
  __typename?: "SubscriptionDraftLineUpdatePayload"

  draft?: Maybe<SubscriptionDraft>

  lineUpdated?: Maybe<SubscriptionLine>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftUpdatePayload = {
  __typename?: "SubscriptionDraftUpdatePayload"

  draft?: Maybe<SubscriptionDraft>

  userErrors: Array<SubscriptionDraftUserError>
}

export type SubscriptionDraftUserError = DisplayableError & {
  __typename?: "SubscriptionDraftUserError"

  code?: Maybe<SubscriptionDraftErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type SubscriptionFreeShippingDiscountInput = {
  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>
}

export type SubscriptionLine = {
  __typename?: "SubscriptionLine"

  currentPrice: MoneyV2

  customAttributes: Array<Attribute>

  discountAllocations: Array<SubscriptionDiscountAllocation>

  id: Scalars["ID"]["output"]

  lineDiscountedPrice: MoneyV2

  pricingPolicy?: Maybe<SubscriptionPricingPolicy>

  productId?: Maybe<Scalars["ID"]["output"]>

  quantity: Scalars["Int"]["output"]

  requiresShipping: Scalars["Boolean"]["output"]

  sellingPlanId?: Maybe<Scalars["ID"]["output"]>

  sellingPlanName?: Maybe<Scalars["String"]["output"]>

  sku?: Maybe<Scalars["String"]["output"]>

  taxable: Scalars["Boolean"]["output"]

  title: Scalars["String"]["output"]

  variantId?: Maybe<Scalars["ID"]["output"]>

  variantImage?: Maybe<Image>

  variantTitle?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionLineConnection = {
  __typename?: "SubscriptionLineConnection"

  edges: Array<SubscriptionLineEdge>

  nodes: Array<SubscriptionLine>

  pageInfo: PageInfo
}

export type SubscriptionLineEdge = {
  __typename?: "SubscriptionLineEdge"

  cursor: Scalars["String"]["output"]

  node: SubscriptionLine
}

export type SubscriptionLineInput = {
  currentPrice: Scalars["Decimal"]["input"]

  customAttributes?: InputMaybe<Array<AttributeInput>>

  pricingPolicy?: InputMaybe<SubscriptionPricingPolicyInput>

  productVariantId: Scalars["ID"]["input"]

  quantity: Scalars["Int"]["input"]

  sellingPlanId?: InputMaybe<Scalars["ID"]["input"]>

  sellingPlanName?: InputMaybe<Scalars["String"]["input"]>
}

export type SubscriptionLineUpdateInput = {
  currentPrice?: InputMaybe<Scalars["Decimal"]["input"]>

  customAttributes?: InputMaybe<Array<AttributeInput>>

  pricingPolicy?: InputMaybe<SubscriptionPricingPolicyInput>

  productVariantId?: InputMaybe<Scalars["ID"]["input"]>

  quantity?: InputMaybe<Scalars["Int"]["input"]>

  sellingPlanId?: InputMaybe<Scalars["ID"]["input"]>

  sellingPlanName?: InputMaybe<Scalars["String"]["input"]>
}

export type SubscriptionLocalDeliveryOption = {
  __typename?: "SubscriptionLocalDeliveryOption"

  code: Scalars["String"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  phoneRequired: Scalars["Boolean"]["output"]

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  price?: Maybe<MoneyV2>

  title: Scalars["String"]["output"]
}

export type SubscriptionMailingAddress = {
  __typename?: "SubscriptionMailingAddress"

  address1?: Maybe<Scalars["String"]["output"]>

  address2?: Maybe<Scalars["String"]["output"]>

  city?: Maybe<Scalars["String"]["output"]>

  company?: Maybe<Scalars["String"]["output"]>

  country?: Maybe<Scalars["String"]["output"]>

  countryCode?: Maybe<CountryCode>

  firstName?: Maybe<Scalars["String"]["output"]>

  lastName?: Maybe<Scalars["String"]["output"]>

  name?: Maybe<Scalars["String"]["output"]>

  phone?: Maybe<Scalars["String"]["output"]>

  province?: Maybe<Scalars["String"]["output"]>

  provinceCode?: Maybe<Scalars["String"]["output"]>

  zip?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionManualDiscount = {
  __typename?: "SubscriptionManualDiscount"

  entitledLines: SubscriptionDiscountEntitledLines

  id: Scalars["ID"]["output"]

  recurringCycleLimit?: Maybe<Scalars["Int"]["output"]>

  rejectionReason?: Maybe<SubscriptionDiscountRejectionReason>

  targetType: DiscountTargetType

  title?: Maybe<Scalars["String"]["output"]>

  type: DiscountType

  usageCount: Scalars["Int"]["output"]

  value: SubscriptionDiscountValue
}

export type SubscriptionManualDiscountConnection = {
  __typename?: "SubscriptionManualDiscountConnection"

  edges: Array<SubscriptionManualDiscountEdge>

  nodes: Array<SubscriptionManualDiscount>

  pageInfo: PageInfo
}

export type SubscriptionManualDiscountEdge = {
  __typename?: "SubscriptionManualDiscountEdge"

  cursor: Scalars["String"]["output"]

  node: SubscriptionManualDiscount
}

export type SubscriptionManualDiscountEntitledLinesInput = {
  all?: InputMaybe<Scalars["Boolean"]["input"]>

  lines?: InputMaybe<SubscriptionManualDiscountLinesInput>
}

export type SubscriptionManualDiscountFixedAmountInput = {
  amount?: InputMaybe<Scalars["Float"]["input"]>

  appliesOnEachItem?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type SubscriptionManualDiscountInput = {
  entitledLines?: InputMaybe<SubscriptionManualDiscountEntitledLinesInput>

  recurringCycleLimit?: InputMaybe<Scalars["Int"]["input"]>

  title?: InputMaybe<Scalars["String"]["input"]>

  value?: InputMaybe<SubscriptionManualDiscountValueInput>
}

export type SubscriptionManualDiscountLinesInput = {
  add?: InputMaybe<Array<Scalars["ID"]["input"]>>

  remove?: InputMaybe<Array<Scalars["ID"]["input"]>>
}

export type SubscriptionManualDiscountValueInput = {
  fixedAmount?: InputMaybe<SubscriptionManualDiscountFixedAmountInput>

  percentage?: InputMaybe<Scalars["Int"]["input"]>
}

export type SubscriptionPickupOption = {
  __typename?: "SubscriptionPickupOption"

  code: Scalars["String"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  location: Location

  phoneRequired: Scalars["Boolean"]["output"]

  pickupTime: Scalars["String"]["output"]

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  price?: Maybe<MoneyV2>

  title: Scalars["String"]["output"]
}

export type SubscriptionPricingPolicy = {
  __typename?: "SubscriptionPricingPolicy"

  basePrice: MoneyV2

  cycleDiscounts: Array<SubscriptionCyclePriceAdjustment>
}

export type SubscriptionPricingPolicyCycleDiscountsInput = {
  adjustmentType: SellingPlanPricingPolicyAdjustmentType

  adjustmentValue: SellingPlanPricingPolicyValueInput

  afterCycle: Scalars["Int"]["input"]

  computedPrice: Scalars["Decimal"]["input"]
}

export type SubscriptionPricingPolicyInput = {
  basePrice: Scalars["Decimal"]["input"]

  cycleDiscounts: Array<SubscriptionPricingPolicyCycleDiscountsInput>
}

export type SubscriptionShippingOption = {
  __typename?: "SubscriptionShippingOption"
  /**
   * The carrier service that's providing this shipping option.
   * This field isn't currently supported and returns null.
   *
   * @deprecated This field has never been implemented.
   */
  carrierService?: Maybe<DeliveryCarrierService>

  code: Scalars["String"]["output"]

  description?: Maybe<Scalars["String"]["output"]>

  phoneRequired?: Maybe<Scalars["Boolean"]["output"]>

  presentmentTitle?: Maybe<Scalars["String"]["output"]>

  price?: Maybe<MoneyV2>

  title: Scalars["String"]["output"]
}

export type SubscriptionShippingOptionResult =
  | SubscriptionShippingOptionResultFailure
  | SubscriptionShippingOptionResultSuccess

export type SubscriptionShippingOptionResultFailure = {
  __typename?: "SubscriptionShippingOptionResultFailure"

  message?: Maybe<Scalars["String"]["output"]>
}

export type SubscriptionShippingOptionResultSuccess = {
  __typename?: "SubscriptionShippingOptionResultSuccess"

  shippingOptions: Array<SubscriptionShippingOption>
}

export type SuggestedOrderTransaction = {
  __typename?: "SuggestedOrderTransaction"

  accountNumber?: Maybe<Scalars["String"]["output"]>
  /**
   * The amount of the transaction.
   * @deprecated Use `amountSet` instead.
   */
  amount: Scalars["Money"]["output"]

  amountSet: MoneyBag

  formattedGateway?: Maybe<Scalars["String"]["output"]>

  gateway?: Maybe<Scalars["String"]["output"]>

  kind: SuggestedOrderTransactionKind
  /**
   * Specifies the available amount to refund on the gateway. Only available within SuggestedRefund.
   * @deprecated Use `maximumRefundableSet` instead.
   */
  maximumRefundable?: Maybe<Scalars["Money"]["output"]>

  maximumRefundableSet?: Maybe<MoneyBag>

  parentTransaction?: Maybe<OrderTransaction>

  paymentDetails?: Maybe<PaymentDetails>
}

export enum SuggestedOrderTransactionKind {
  SuggestedRefund = "SUGGESTED_REFUND",
}

export type SuggestedRefund = {
  __typename?: "SuggestedRefund"
  /**
   * The total monetary value to be refunded.
   * @deprecated Use `amountSet` instead.
   */
  amount: Scalars["Money"]["output"]

  amountSet: MoneyBag

  discountedSubtotalSet: MoneyBag
  /**
   * The total monetary value available to refund.
   * @deprecated Use `maximumRefundableSet` instead.
   */
  maximumRefundable: Scalars["Money"]["output"]

  maximumRefundableSet: MoneyBag

  refundDuties: Array<RefundDuty>

  refundLineItems: Array<RefundLineItem>

  shipping: ShippingRefund
  /**
   * The sum of all the prices of the line items being refunded.
   * @deprecated Use `subtotalSet` instead.
   */
  subtotal: Scalars["Money"]["output"]

  subtotalSet: MoneyBag

  suggestedTransactions: Array<SuggestedOrderTransaction>

  totalCartDiscountAmountSet: MoneyBag

  totalDutiesSet: MoneyBag

  totalTaxSet: MoneyBag
  /**
   * The sum of the taxes being refunded from the order. The value must be positive.
   * @deprecated Use `totalTaxSet` instead.
   */
  totalTaxes: Scalars["Money"]["output"]
}

export type SuggestedReturnRefund = {
  __typename?: "SuggestedReturnRefund"

  amount: MoneyBag

  discountedSubtotal: MoneyBag

  maximumRefundable: MoneyBag

  refundDuties: Array<RefundDuty>

  shipping: ShippingRefund

  subtotal: MoneyBag

  suggestedTransactions: Array<SuggestedOrderTransaction>

  totalCartDiscountAmount: MoneyBag

  totalDuties: MoneyBag

  totalTax: MoneyBag
}

export type TableData = {
  __typename?: "TableData"

  columns: Array<TableDataColumn>

  rowData: Array<Array<Scalars["String"]["output"]>>

  unformattedData: Scalars["JSON"]["output"]
}

export type TableDataColumn = {
  __typename?: "TableDataColumn"

  comparedTo: Scalars["String"]["output"]

  dataType: Scalars["String"]["output"]

  displayName: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export type TableResponse = ShopifyqlResponse & {
  __typename?: "TableResponse"

  parseErrors?: Maybe<Array<ParseError>>

  tableData?: Maybe<TableData>
}

export type TagsAddPayload = {
  __typename?: "TagsAddPayload"

  node?: Maybe<Node>

  userErrors: Array<UserError>
}

export type TagsRemovePayload = {
  __typename?: "TagsRemovePayload"

  node?: Maybe<Node>

  userErrors: Array<UserError>
}

export type TaxAppConfiguration = {
  __typename?: "TaxAppConfiguration"

  state: TaxPartnerState
}

export type TaxAppConfigurePayload = {
  __typename?: "TaxAppConfigurePayload"

  taxAppConfiguration?: Maybe<TaxAppConfiguration>

  userErrors: Array<TaxAppConfigureUserError>
}

export type TaxAppConfigureUserError = DisplayableError & {
  __typename?: "TaxAppConfigureUserError"

  code?: Maybe<TaxAppConfigureUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum TaxAppConfigureUserErrorCode {
  TaxPartnerAlreadyActive = "TAX_PARTNER_ALREADY_ACTIVE",

  TaxPartnerNotFound = "TAX_PARTNER_NOT_FOUND",

  TaxPartnerStateUpdateFailed = "TAX_PARTNER_STATE_UPDATE_FAILED",
}

export enum TaxExemption {
  CaBcCommercialFisheryExemption = "CA_BC_COMMERCIAL_FISHERY_EXEMPTION",

  CaBcContractorExemption = "CA_BC_CONTRACTOR_EXEMPTION",

  CaBcProductionAndMachineryExemption = "CA_BC_PRODUCTION_AND_MACHINERY_EXEMPTION",

  CaBcResellerExemption = "CA_BC_RESELLER_EXEMPTION",

  CaBcSubContractorExemption = "CA_BC_SUB_CONTRACTOR_EXEMPTION",

  CaDiplomatExemption = "CA_DIPLOMAT_EXEMPTION",

  CaMbCommercialFisheryExemption = "CA_MB_COMMERCIAL_FISHERY_EXEMPTION",

  CaMbFarmerExemption = "CA_MB_FARMER_EXEMPTION",

  CaMbResellerExemption = "CA_MB_RESELLER_EXEMPTION",

  CaNsCommercialFisheryExemption = "CA_NS_COMMERCIAL_FISHERY_EXEMPTION",

  CaNsFarmerExemption = "CA_NS_FARMER_EXEMPTION",

  CaOnPurchaseExemption = "CA_ON_PURCHASE_EXEMPTION",

  CaPeCommercialFisheryExemption = "CA_PE_COMMERCIAL_FISHERY_EXEMPTION",

  CaSkCommercialFisheryExemption = "CA_SK_COMMERCIAL_FISHERY_EXEMPTION",

  CaSkContractorExemption = "CA_SK_CONTRACTOR_EXEMPTION",

  CaSkFarmerExemption = "CA_SK_FARMER_EXEMPTION",

  CaSkProductionAndMachineryExemption = "CA_SK_PRODUCTION_AND_MACHINERY_EXEMPTION",

  CaSkResellerExemption = "CA_SK_RESELLER_EXEMPTION",

  CaSkSubContractorExemption = "CA_SK_SUB_CONTRACTOR_EXEMPTION",

  CaStatusCardExemption = "CA_STATUS_CARD_EXEMPTION",

  EuReverseChargeExemptionRule = "EU_REVERSE_CHARGE_EXEMPTION_RULE",

  UsAkResellerExemption = "US_AK_RESELLER_EXEMPTION",

  UsAlResellerExemption = "US_AL_RESELLER_EXEMPTION",

  UsArResellerExemption = "US_AR_RESELLER_EXEMPTION",

  UsAzResellerExemption = "US_AZ_RESELLER_EXEMPTION",

  UsCaResellerExemption = "US_CA_RESELLER_EXEMPTION",

  UsCoResellerExemption = "US_CO_RESELLER_EXEMPTION",

  UsCtResellerExemption = "US_CT_RESELLER_EXEMPTION",

  UsDcResellerExemption = "US_DC_RESELLER_EXEMPTION",

  UsDeResellerExemption = "US_DE_RESELLER_EXEMPTION",

  UsFlResellerExemption = "US_FL_RESELLER_EXEMPTION",

  UsGaResellerExemption = "US_GA_RESELLER_EXEMPTION",

  UsHiResellerExemption = "US_HI_RESELLER_EXEMPTION",

  UsIaResellerExemption = "US_IA_RESELLER_EXEMPTION",

  UsIdResellerExemption = "US_ID_RESELLER_EXEMPTION",

  UsIlResellerExemption = "US_IL_RESELLER_EXEMPTION",

  UsInResellerExemption = "US_IN_RESELLER_EXEMPTION",

  UsKsResellerExemption = "US_KS_RESELLER_EXEMPTION",

  UsKyResellerExemption = "US_KY_RESELLER_EXEMPTION",

  UsLaResellerExemption = "US_LA_RESELLER_EXEMPTION",

  UsMaResellerExemption = "US_MA_RESELLER_EXEMPTION",

  UsMdResellerExemption = "US_MD_RESELLER_EXEMPTION",

  UsMeResellerExemption = "US_ME_RESELLER_EXEMPTION",

  UsMiResellerExemption = "US_MI_RESELLER_EXEMPTION",

  UsMnResellerExemption = "US_MN_RESELLER_EXEMPTION",

  UsMoResellerExemption = "US_MO_RESELLER_EXEMPTION",

  UsMsResellerExemption = "US_MS_RESELLER_EXEMPTION",

  UsMtResellerExemption = "US_MT_RESELLER_EXEMPTION",

  UsNcResellerExemption = "US_NC_RESELLER_EXEMPTION",

  UsNdResellerExemption = "US_ND_RESELLER_EXEMPTION",

  UsNeResellerExemption = "US_NE_RESELLER_EXEMPTION",

  UsNhResellerExemption = "US_NH_RESELLER_EXEMPTION",

  UsNjResellerExemption = "US_NJ_RESELLER_EXEMPTION",

  UsNmResellerExemption = "US_NM_RESELLER_EXEMPTION",

  UsNvResellerExemption = "US_NV_RESELLER_EXEMPTION",

  UsNyResellerExemption = "US_NY_RESELLER_EXEMPTION",

  UsOhResellerExemption = "US_OH_RESELLER_EXEMPTION",

  UsOkResellerExemption = "US_OK_RESELLER_EXEMPTION",

  UsOrResellerExemption = "US_OR_RESELLER_EXEMPTION",

  UsPaResellerExemption = "US_PA_RESELLER_EXEMPTION",

  UsRiResellerExemption = "US_RI_RESELLER_EXEMPTION",

  UsScResellerExemption = "US_SC_RESELLER_EXEMPTION",

  UsSdResellerExemption = "US_SD_RESELLER_EXEMPTION",

  UsTnResellerExemption = "US_TN_RESELLER_EXEMPTION",

  UsTxResellerExemption = "US_TX_RESELLER_EXEMPTION",

  UsUtResellerExemption = "US_UT_RESELLER_EXEMPTION",

  UsVaResellerExemption = "US_VA_RESELLER_EXEMPTION",

  UsVtResellerExemption = "US_VT_RESELLER_EXEMPTION",

  UsWaResellerExemption = "US_WA_RESELLER_EXEMPTION",

  UsWiResellerExemption = "US_WI_RESELLER_EXEMPTION",

  UsWvResellerExemption = "US_WV_RESELLER_EXEMPTION",

  UsWyResellerExemption = "US_WY_RESELLER_EXEMPTION",
}

export type TaxLine = {
  __typename?: "TaxLine"

  channelLiable?: Maybe<Scalars["Boolean"]["output"]>
  /**
   * The amount of tax, in shop currency, after discounts and before returns.
   * @deprecated Use `priceSet` instead.
   */
  price: Scalars["Money"]["output"]

  priceSet: MoneyBag

  rate?: Maybe<Scalars["Float"]["output"]>

  ratePercentage?: Maybe<Scalars["Float"]["output"]>

  title: Scalars["String"]["output"]
}

export enum TaxPartnerState {
  Active = "ACTIVE",

  Pending = "PENDING",

  Ready = "READY",
}

export type TenderTransaction = Node & {
  __typename?: "TenderTransaction"

  amount: MoneyV2

  id: Scalars["ID"]["output"]

  paymentMethod?: Maybe<Scalars["String"]["output"]>

  processedAt?: Maybe<Scalars["DateTime"]["output"]>

  remoteReference?: Maybe<Scalars["String"]["output"]>

  test: Scalars["Boolean"]["output"]

  transactionDetails?: Maybe<TenderTransactionDetails>

  user?: Maybe<StaffMember>
}

export type TenderTransactionConnection = {
  __typename?: "TenderTransactionConnection"

  edges: Array<TenderTransactionEdge>

  nodes: Array<TenderTransaction>

  pageInfo: PageInfo
}

export type TenderTransactionCreditCardDetails = {
  __typename?: "TenderTransactionCreditCardDetails"

  creditCardCompany?: Maybe<Scalars["String"]["output"]>

  creditCardNumber?: Maybe<Scalars["String"]["output"]>
}

export type TenderTransactionDetails = TenderTransactionCreditCardDetails

export type TenderTransactionEdge = {
  __typename?: "TenderTransactionEdge"

  cursor: Scalars["String"]["output"]

  node: TenderTransaction
}

export type TipSale = Sale & {
  __typename?: "TipSale"

  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineItem: LineItem

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export type TransactionFee = Node & {
  __typename?: "TransactionFee"

  amount: MoneyV2

  flatFee: MoneyV2

  flatFeeName?: Maybe<Scalars["String"]["output"]>

  id: Scalars["ID"]["output"]

  rate: Scalars["Decimal"]["output"]

  rateName?: Maybe<Scalars["String"]["output"]>

  taxAmount: MoneyV2

  type: Scalars["String"]["output"]
}

export type TranslatableContent = {
  __typename?: "TranslatableContent"

  digest?: Maybe<Scalars["String"]["output"]>

  key: Scalars["String"]["output"]

  locale: Scalars["String"]["output"]

  type: LocalizableContentType

  value?: Maybe<Scalars["String"]["output"]>
}

export type TranslatableResource = {
  __typename?: "TranslatableResource"

  resourceId: Scalars["ID"]["output"]

  translatableContent: Array<TranslatableContent>

  translations: Array<Translation>
}

export type TranslatableResourceTranslationsArgs = {
  locale: Scalars["String"]["input"]
  marketId?: InputMaybe<Scalars["ID"]["input"]>
  outdated?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type TranslatableResourceConnection = {
  __typename?: "TranslatableResourceConnection"

  edges: Array<TranslatableResourceEdge>

  nodes: Array<TranslatableResource>

  pageInfo: PageInfo
}

export type TranslatableResourceEdge = {
  __typename?: "TranslatableResourceEdge"

  cursor: Scalars["String"]["output"]

  node: TranslatableResource
}

export enum TranslatableResourceType {
  Collection = "COLLECTION",

  DeliveryMethodDefinition = "DELIVERY_METHOD_DEFINITION",

  EmailTemplate = "EMAIL_TEMPLATE",

  Filter = "FILTER",

  Link = "LINK",

  Metafield = "METAFIELD",

  Metaobject = "METAOBJECT",

  OnlineStoreArticle = "ONLINE_STORE_ARTICLE",

  OnlineStoreBlog = "ONLINE_STORE_BLOG",

  OnlineStoreMenu = "ONLINE_STORE_MENU",

  OnlineStorePage = "ONLINE_STORE_PAGE",

  OnlineStoreTheme = "ONLINE_STORE_THEME",

  PackingSlipTemplate = "PACKING_SLIP_TEMPLATE",

  PaymentGateway = "PAYMENT_GATEWAY",

  Product = "PRODUCT",

  ProductOption = "PRODUCT_OPTION",

  ProductVariant = "PRODUCT_VARIANT",

  SellingPlan = "SELLING_PLAN",

  SellingPlanGroup = "SELLING_PLAN_GROUP",

  Shop = "SHOP",

  ShopPolicy = "SHOP_POLICY",
}

export type Translation = {
  __typename?: "Translation"

  key: Scalars["String"]["output"]

  locale: Scalars["String"]["output"]

  market?: Maybe<Market>

  outdated: Scalars["Boolean"]["output"]

  updatedAt?: Maybe<Scalars["DateTime"]["output"]>

  value?: Maybe<Scalars["String"]["output"]>
}

export enum TranslationErrorCode {
  Blank = "BLANK",

  FailsResourceValidation = "FAILS_RESOURCE_VALIDATION",

  Invalid = "INVALID",

  InvalidCode = "INVALID_CODE",

  InvalidFormat = "INVALID_FORMAT",

  InvalidKeyForModel = "INVALID_KEY_FOR_MODEL",

  InvalidLocaleForMarket = "INVALID_LOCALE_FOR_MARKET",

  InvalidLocaleForShop = "INVALID_LOCALE_FOR_SHOP",

  InvalidMarketLocalizableContent = "INVALID_MARKET_LOCALIZABLE_CONTENT",

  InvalidTranslatableContent = "INVALID_TRANSLATABLE_CONTENT",

  InvalidValueForHandleTranslation = "INVALID_VALUE_FOR_HANDLE_TRANSLATION",

  MarketCustomContentNotAllowed = "MARKET_CUSTOM_CONTENT_NOT_ALLOWED",

  MarketDoesNotExist = "MARKET_DOES_NOT_EXIST",

  MarketLocaleCreationFailed = "MARKET_LOCALE_CREATION_FAILED",

  ResourceNotFound = "RESOURCE_NOT_FOUND",

  ResourceNotMarketCustomizable = "RESOURCE_NOT_MARKET_CUSTOMIZABLE",

  ResourceNotTranslatable = "RESOURCE_NOT_TRANSLATABLE",

  TooManyKeysForResource = "TOO_MANY_KEYS_FOR_RESOURCE",
}

export type TranslationInput = {
  key: Scalars["String"]["input"]

  locale: Scalars["String"]["input"]

  marketId?: InputMaybe<Scalars["ID"]["input"]>

  translatableContentDigest: Scalars["String"]["input"]

  value: Scalars["String"]["input"]
}

export type TranslationUserError = DisplayableError & {
  __typename?: "TranslationUserError"

  code?: Maybe<TranslationErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type TranslationsRegisterPayload = {
  __typename?: "TranslationsRegisterPayload"

  translations?: Maybe<Array<Translation>>

  userErrors: Array<TranslationUserError>
}

export type TranslationsRemovePayload = {
  __typename?: "TranslationsRemovePayload"

  translations?: Maybe<Array<Translation>>

  userErrors: Array<TranslationUserError>
}

export type TypedAttribute = {
  __typename?: "TypedAttribute"

  key: Scalars["String"]["output"]

  value: Scalars["String"]["output"]
}

export type UtmInput = {
  campaign: Scalars["String"]["input"]

  medium: Scalars["String"]["input"]

  source: Scalars["String"]["input"]
}

export type UtmParameters = {
  __typename?: "UTMParameters"

  campaign?: Maybe<Scalars["String"]["output"]>

  content?: Maybe<Scalars["String"]["output"]>

  medium?: Maybe<Scalars["String"]["output"]>

  source?: Maybe<Scalars["String"]["output"]>

  term?: Maybe<Scalars["String"]["output"]>
}

export enum UnitSystem {
  ImperialSystem = "IMPERIAL_SYSTEM",

  MetricSystem = "METRIC_SYSTEM",
}

export type UnknownSale = Sale & {
  __typename?: "UnknownSale"

  actionType: SaleActionType

  id: Scalars["ID"]["output"]

  lineType: SaleLineType

  quantity?: Maybe<Scalars["Int"]["output"]>

  taxes: Array<SaleTax>

  totalAmount: MoneyBag

  totalDiscountAmountAfterTaxes: MoneyBag

  totalDiscountAmountBeforeTaxes: MoneyBag

  totalTaxAmount: MoneyBag
}

export type UpdateMediaInput = {
  alt?: InputMaybe<Scalars["String"]["input"]>

  id: Scalars["ID"]["input"]

  previewImageSource?: InputMaybe<Scalars["String"]["input"]>
}

export type UrlRedirect = Node & {
  __typename?: "UrlRedirect"

  id: Scalars["ID"]["output"]

  path: Scalars["String"]["output"]

  target: Scalars["String"]["output"]
}

export type UrlRedirectBulkDeleteAllPayload = {
  __typename?: "UrlRedirectBulkDeleteAllPayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type UrlRedirectBulkDeleteByIdsPayload = {
  __typename?: "UrlRedirectBulkDeleteByIdsPayload"

  job?: Maybe<Job>

  userErrors: Array<UrlRedirectBulkDeleteByIdsUserError>
}

export type UrlRedirectBulkDeleteByIdsUserError = DisplayableError & {
  __typename?: "UrlRedirectBulkDeleteByIdsUserError"

  code?: Maybe<UrlRedirectBulkDeleteByIdsUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum UrlRedirectBulkDeleteByIdsUserErrorCode {
  IdsEmpty = "IDS_EMPTY",
}

export type UrlRedirectBulkDeleteBySavedSearchPayload = {
  __typename?: "UrlRedirectBulkDeleteBySavedSearchPayload"

  job?: Maybe<Job>

  userErrors: Array<UrlRedirectBulkDeleteBySavedSearchUserError>
}

export type UrlRedirectBulkDeleteBySavedSearchUserError = DisplayableError & {
  __typename?: "UrlRedirectBulkDeleteBySavedSearchUserError"

  code?: Maybe<UrlRedirectBulkDeleteBySavedSearchUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum UrlRedirectBulkDeleteBySavedSearchUserErrorCode {
  InvalidSavedSearchQuery = "INVALID_SAVED_SEARCH_QUERY",

  SavedSearchNotFound = "SAVED_SEARCH_NOT_FOUND",
}

export type UrlRedirectBulkDeleteBySearchPayload = {
  __typename?: "UrlRedirectBulkDeleteBySearchPayload"

  job?: Maybe<Job>

  userErrors: Array<UrlRedirectBulkDeleteBySearchUserError>
}

export type UrlRedirectBulkDeleteBySearchUserError = DisplayableError & {
  __typename?: "UrlRedirectBulkDeleteBySearchUserError"

  code?: Maybe<UrlRedirectBulkDeleteBySearchUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum UrlRedirectBulkDeleteBySearchUserErrorCode {
  InvalidSearchArgument = "INVALID_SEARCH_ARGUMENT",
}

export type UrlRedirectConnection = {
  __typename?: "UrlRedirectConnection"

  edges: Array<UrlRedirectEdge>

  nodes: Array<UrlRedirect>

  pageInfo: PageInfo
}

export type UrlRedirectCreatePayload = {
  __typename?: "UrlRedirectCreatePayload"

  urlRedirect?: Maybe<UrlRedirect>

  userErrors: Array<UrlRedirectUserError>
}

export type UrlRedirectDeletePayload = {
  __typename?: "UrlRedirectDeletePayload"

  deletedUrlRedirectId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UrlRedirectUserError>
}

export type UrlRedirectEdge = {
  __typename?: "UrlRedirectEdge"

  cursor: Scalars["String"]["output"]

  node: UrlRedirect
}

export enum UrlRedirectErrorCode {
  CreateFailed = "CREATE_FAILED",

  DeleteFailed = "DELETE_FAILED",

  DoesNotExist = "DOES_NOT_EXIST",

  UpdateFailed = "UPDATE_FAILED",
}

export type UrlRedirectImport = Node & {
  __typename?: "UrlRedirectImport"

  count?: Maybe<Scalars["Int"]["output"]>

  createdCount?: Maybe<Scalars["Int"]["output"]>

  failedCount?: Maybe<Scalars["Int"]["output"]>

  finished: Scalars["Boolean"]["output"]

  finishedAt?: Maybe<Scalars["DateTime"]["output"]>

  id: Scalars["ID"]["output"]

  previewRedirects: Array<UrlRedirectImportPreview>

  updatedCount?: Maybe<Scalars["Int"]["output"]>
}

export type UrlRedirectImportCreatePayload = {
  __typename?: "UrlRedirectImportCreatePayload"

  urlRedirectImport?: Maybe<UrlRedirectImport>

  userErrors: Array<UrlRedirectImportUserError>
}

export enum UrlRedirectImportErrorCode {
  AlreadyImported = "ALREADY_IMPORTED",
  /**
   * CSV file does not exist at given URL.
   * @deprecated This error code is never returned
   */
  FileDoesNotExist = "FILE_DOES_NOT_EXIST",

  InProgress = "IN_PROGRESS",

  NotFound = "NOT_FOUND",
}

export type UrlRedirectImportPreview = {
  __typename?: "UrlRedirectImportPreview"

  path: Scalars["String"]["output"]

  target: Scalars["String"]["output"]
}

export type UrlRedirectImportSubmitPayload = {
  __typename?: "UrlRedirectImportSubmitPayload"

  job?: Maybe<Job>

  userErrors: Array<UrlRedirectImportUserError>
}

export type UrlRedirectImportUserError = DisplayableError & {
  __typename?: "UrlRedirectImportUserError"

  code?: Maybe<UrlRedirectImportErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type UrlRedirectInput = {
  path?: InputMaybe<Scalars["String"]["input"]>

  target?: InputMaybe<Scalars["String"]["input"]>
}

export enum UrlRedirectSortKeys {
  Id = "ID",

  Path = "PATH",

  Relevance = "RELEVANCE",
}

export type UrlRedirectUpdatePayload = {
  __typename?: "UrlRedirectUpdatePayload"

  urlRedirect?: Maybe<UrlRedirect>

  userErrors: Array<UrlRedirectUserError>
}

export type UrlRedirectUserError = DisplayableError & {
  __typename?: "UrlRedirectUserError"

  code?: Maybe<UrlRedirectErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type UserError = DisplayableError & {
  __typename?: "UserError"

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export type Validation = HasMetafieldDefinitions &
  HasMetafields &
  Node & {
    __typename?: "Validation"

    blockOnFailure: Scalars["Boolean"]["output"]

    enabled: Scalars["Boolean"]["output"]

    errorHistory?: Maybe<FunctionsErrorHistory>

    id: Scalars["ID"]["output"]

    metafield?: Maybe<Metafield>

    metafieldDefinitions: MetafieldDefinitionConnection

    metafields: MetafieldConnection
    /**
     * Returns a private metafield by namespace and key that belongs to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafield?: Maybe<PrivateMetafield>
    /**
     * List of private metafields that belong to the resource.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafields: PrivateMetafieldConnection

    shopifyFunction: ShopifyFunction

    title: Scalars["String"]["output"]
  }

export type ValidationMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace?: InputMaybe<Scalars["String"]["input"]>
}

export type ValidationMetafieldDefinitionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  pinnedStatus?: InputMaybe<MetafieldDefinitionPinnedStatus>
  query?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
  sortKey?: InputMaybe<MetafieldDefinitionSortKeys>
}

export type ValidationMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  keys?: InputMaybe<Array<Scalars["String"]["input"]>>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ValidationPrivateMetafieldArgs = {
  key: Scalars["String"]["input"]
  namespace: Scalars["String"]["input"]
}

export type ValidationPrivateMetafieldsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>
  before?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
  last?: InputMaybe<Scalars["Int"]["input"]>
  namespace?: InputMaybe<Scalars["String"]["input"]>
  reverse?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type ValidationConnection = {
  __typename?: "ValidationConnection"

  edges: Array<ValidationEdge>

  nodes: Array<Validation>

  pageInfo: PageInfo
}

export type ValidationCreateInput = {
  blockOnFailure?: InputMaybe<Scalars["Boolean"]["input"]>

  enable?: InputMaybe<Scalars["Boolean"]["input"]>

  functionId: Scalars["String"]["input"]

  metafields?: InputMaybe<Array<MetafieldInput>>
}

export type ValidationCreatePayload = {
  __typename?: "ValidationCreatePayload"

  userErrors: Array<ValidationUserError>

  validation?: Maybe<Validation>
}

export type ValidationDeletePayload = {
  __typename?: "ValidationDeletePayload"

  deletedId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<ValidationUserError>
}

export type ValidationEdge = {
  __typename?: "ValidationEdge"

  cursor: Scalars["String"]["output"]

  node: Validation
}

export enum ValidationSortKeys {
  Id = "ID",

  Relevance = "RELEVANCE",
}

export type ValidationUpdateInput = {
  blockOnFailure?: InputMaybe<Scalars["Boolean"]["input"]>

  enable?: InputMaybe<Scalars["Boolean"]["input"]>

  metafields?: InputMaybe<Array<MetafieldInput>>
}

export type ValidationUpdatePayload = {
  __typename?: "ValidationUpdatePayload"

  userErrors: Array<ValidationUserError>

  validation?: Maybe<Validation>
}

export type ValidationUserError = DisplayableError & {
  __typename?: "ValidationUserError"

  code?: Maybe<ValidationUserErrorCode>

  field?: Maybe<Array<Scalars["String"]["output"]>>

  message: Scalars["String"]["output"]
}

export enum ValidationUserErrorCode {
  AppNotAuthorized = "APP_NOT_AUTHORIZED",

  Blank = "BLANK",

  CustomAppFunctionNotEligible = "CUSTOM_APP_FUNCTION_NOT_ELIGIBLE",

  DisallowedOwnerType = "DISALLOWED_OWNER_TYPE",

  FunctionDoesNotImplement = "FUNCTION_DOES_NOT_IMPLEMENT",

  FunctionNotFound = "FUNCTION_NOT_FOUND",

  FunctionPendingDeletion = "FUNCTION_PENDING_DELETION",

  Inclusion = "INCLUSION",

  InvalidType = "INVALID_TYPE",

  InvalidValue = "INVALID_VALUE",

  NotFound = "NOT_FOUND",

  Present = "PRESENT",

  PublicAppNotAllowed = "PUBLIC_APP_NOT_ALLOWED",

  Taken = "TAKEN",

  TooLong = "TOO_LONG",

  TooShort = "TOO_SHORT",

  UnstructuredReservedNamespace = "UNSTRUCTURED_RESERVED_NAMESPACE",
}

export type VaultCreditCard = {
  __typename?: "VaultCreditCard"

  billingAddress?: Maybe<CustomerCreditCardBillingAddress>

  brand: Scalars["String"]["output"]

  expired: Scalars["Boolean"]["output"]

  expiryMonth: Scalars["Int"]["output"]

  expiryYear: Scalars["Int"]["output"]

  lastDigits: Scalars["String"]["output"]

  name: Scalars["String"]["output"]
}

export type VaultPaypalBillingAgreement = {
  __typename?: "VaultPaypalBillingAgreement"

  inactive: Scalars["Boolean"]["output"]

  name: Scalars["String"]["output"]

  paypalAccountEmail: Scalars["String"]["output"]
}

export type Vector3 = {
  __typename?: "Vector3"

  x: Scalars["Float"]["output"]

  y: Scalars["Float"]["output"]

  z: Scalars["Float"]["output"]
}

export type Video = File &
  Media &
  Node & {
    __typename?: "Video"

    alt?: Maybe<Scalars["String"]["output"]>

    createdAt: Scalars["DateTime"]["output"]

    duration?: Maybe<Scalars["Int"]["output"]>

    fileErrors: Array<FileError>

    fileStatus: FileStatus

    filename: Scalars["String"]["output"]

    id: Scalars["ID"]["output"]

    mediaContentType: MediaContentType

    mediaErrors: Array<MediaError>

    mediaWarnings: Array<MediaWarning>

    originalSource?: Maybe<VideoSource>

    preview?: Maybe<MediaPreviewImage>

    sources: Array<VideoSource>

    status: MediaStatus

    updatedAt: Scalars["DateTime"]["output"]
  }

export type VideoSource = {
  __typename?: "VideoSource"

  fileSize?: Maybe<Scalars["Int"]["output"]>

  format: Scalars["String"]["output"]

  height: Scalars["Int"]["output"]

  mimeType: Scalars["String"]["output"]

  url: Scalars["String"]["output"]

  width: Scalars["Int"]["output"]
}

export enum VisualizationType {
  Bar = "BAR",

  Line = "LINE",
}

export type WebPixel = Node & {
  __typename?: "WebPixel"

  id: Scalars["ID"]["output"]

  settings: Scalars["JSON"]["output"]
}

export type WebPixelCreatePayload = {
  __typename?: "WebPixelCreatePayload"

  userErrors: Array<ErrorsWebPixelUserError>

  webPixel?: Maybe<WebPixel>
}

export type WebPixelDeletePayload = {
  __typename?: "WebPixelDeletePayload"

  deletedWebPixelId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<ErrorsWebPixelUserError>
}

export type WebPixelInput = {
  settings: Scalars["JSON"]["input"]
}

export type WebPixelUpdatePayload = {
  __typename?: "WebPixelUpdatePayload"

  userErrors: Array<ErrorsWebPixelUserError>

  webPixel?: Maybe<WebPixel>
}

export type WebhookEventBridgeEndpoint = {
  __typename?: "WebhookEventBridgeEndpoint"

  arn: Scalars["ARN"]["output"]
}

export type WebhookHttpEndpoint = {
  __typename?: "WebhookHttpEndpoint"

  callbackUrl: Scalars["URL"]["output"]
}

export type WebhookPubSubEndpoint = {
  __typename?: "WebhookPubSubEndpoint"

  pubSubProject: Scalars["String"]["output"]

  pubSubTopic: Scalars["String"]["output"]
}

export type WebhookSubscription = LegacyInteroperability &
  Node & {
    __typename?: "WebhookSubscription"

    apiVersion: ApiVersion
    /**
     * The destination URI to which the webhook subscription will send a message when an event occurs.
     * @deprecated Use `endpoint` instead.
     */
    callbackUrl: Scalars["URL"]["output"]

    createdAt: Scalars["DateTime"]["output"]

    endpoint: WebhookSubscriptionEndpoint

    format: WebhookSubscriptionFormat

    id: Scalars["ID"]["output"]

    includeFields: Array<Scalars["String"]["output"]>

    legacyResourceId: Scalars["UnsignedInt64"]["output"]

    metafieldNamespaces: Array<Scalars["String"]["output"]>
    /**
     * The list of namespaces for private metafields that should be included in the webhook subscription.
     * @deprecated Metafields created using a reserved namespace are private by default. See our guide for
     * [migrating private metafields](https://shopify.dev/docs/apps/custom-data/metafields/migrate-private-metafields).
     *
     */
    privateMetafieldNamespaces: Array<Scalars["String"]["output"]>

    subTopic?: Maybe<Scalars["String"]["output"]>

    topic: WebhookSubscriptionTopic

    updatedAt: Scalars["DateTime"]["output"]
  }

export type WebhookSubscriptionConnection = {
  __typename?: "WebhookSubscriptionConnection"

  edges: Array<WebhookSubscriptionEdge>

  nodes: Array<WebhookSubscription>

  pageInfo: PageInfo
}

export type WebhookSubscriptionCreatePayload = {
  __typename?: "WebhookSubscriptionCreatePayload"

  userErrors: Array<UserError>

  webhookSubscription?: Maybe<WebhookSubscription>
}

export type WebhookSubscriptionDeletePayload = {
  __typename?: "WebhookSubscriptionDeletePayload"

  deletedWebhookSubscriptionId?: Maybe<Scalars["ID"]["output"]>

  userErrors: Array<UserError>
}

export type WebhookSubscriptionEdge = {
  __typename?: "WebhookSubscriptionEdge"

  cursor: Scalars["String"]["output"]

  node: WebhookSubscription
}

export type WebhookSubscriptionEndpoint = WebhookEventBridgeEndpoint | WebhookHttpEndpoint | WebhookPubSubEndpoint

export enum WebhookSubscriptionFormat {
  Json = "JSON",
  Xml = "XML",
}

export type WebhookSubscriptionInput = {
  callbackUrl?: InputMaybe<Scalars["URL"]["input"]>

  format?: InputMaybe<WebhookSubscriptionFormat>

  includeFields?: InputMaybe<Array<Scalars["String"]["input"]>>

  metafieldNamespaces?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export enum WebhookSubscriptionSortKeys {
  CreatedAt = "CREATED_AT",

  Id = "ID",

  Relevance = "RELEVANCE",
}

export enum WebhookSubscriptionTopic {
  AppPurchasesOneTimeUpdate = "APP_PURCHASES_ONE_TIME_UPDATE",

  AppSubscriptionsApproachingCappedAmount = "APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT",

  AppSubscriptionsUpdate = "APP_SUBSCRIPTIONS_UPDATE",

  AppUninstalled = "APP_UNINSTALLED",

  AttributedSessionsFirst = "ATTRIBUTED_SESSIONS_FIRST",

  AttributedSessionsLast = "ATTRIBUTED_SESSIONS_LAST",

  AuditEventsAdminApiActivity = "AUDIT_EVENTS_ADMIN_API_ACTIVITY",

  BulkOperationsFinish = "BULK_OPERATIONS_FINISH",

  CartsCreate = "CARTS_CREATE",

  CartsUpdate = "CARTS_UPDATE",

  ChannelsDelete = "CHANNELS_DELETE",

  CheckoutsCreate = "CHECKOUTS_CREATE",

  CheckoutsDelete = "CHECKOUTS_DELETE",

  CheckoutsUpdate = "CHECKOUTS_UPDATE",

  CollectionsCreate = "COLLECTIONS_CREATE",

  CollectionsDelete = "COLLECTIONS_DELETE",

  CollectionsUpdate = "COLLECTIONS_UPDATE",

  CollectionListingsAdd = "COLLECTION_LISTINGS_ADD",

  CollectionListingsRemove = "COLLECTION_LISTINGS_REMOVE",

  CollectionListingsUpdate = "COLLECTION_LISTINGS_UPDATE",

  CollectionPublicationsCreate = "COLLECTION_PUBLICATIONS_CREATE",

  CollectionPublicationsDelete = "COLLECTION_PUBLICATIONS_DELETE",

  CollectionPublicationsUpdate = "COLLECTION_PUBLICATIONS_UPDATE",

  CompaniesCreate = "COMPANIES_CREATE",

  CompaniesDelete = "COMPANIES_DELETE",

  CompaniesUpdate = "COMPANIES_UPDATE",

  CompanyContactsCreate = "COMPANY_CONTACTS_CREATE",

  CompanyContactsDelete = "COMPANY_CONTACTS_DELETE",

  CompanyContactsUpdate = "COMPANY_CONTACTS_UPDATE",

  CompanyContactRolesAssign = "COMPANY_CONTACT_ROLES_ASSIGN",

  CompanyContactRolesRevoke = "COMPANY_CONTACT_ROLES_REVOKE",

  CompanyLocationsCreate = "COMPANY_LOCATIONS_CREATE",

  CompanyLocationsDelete = "COMPANY_LOCATIONS_DELETE",

  CompanyLocationsUpdate = "COMPANY_LOCATIONS_UPDATE",

  CustomersCreate = "CUSTOMERS_CREATE",

  CustomersDelete = "CUSTOMERS_DELETE",

  CustomersDisable = "CUSTOMERS_DISABLE",

  CustomersEmailMarketingConsentUpdate = "CUSTOMERS_EMAIL_MARKETING_CONSENT_UPDATE",

  CustomersEnable = "CUSTOMERS_ENABLE",

  CustomersMarketingConsentUpdate = "CUSTOMERS_MARKETING_CONSENT_UPDATE",

  CustomersMerge = "CUSTOMERS_MERGE",

  CustomersUpdate = "CUSTOMERS_UPDATE",

  CustomerGroupsCreate = "CUSTOMER_GROUPS_CREATE",

  CustomerGroupsDelete = "CUSTOMER_GROUPS_DELETE",

  CustomerGroupsUpdate = "CUSTOMER_GROUPS_UPDATE",

  CustomerPaymentMethodsCreate = "CUSTOMER_PAYMENT_METHODS_CREATE",

  CustomerPaymentMethodsRevoke = "CUSTOMER_PAYMENT_METHODS_REVOKE",

  CustomerPaymentMethodsUpdate = "CUSTOMER_PAYMENT_METHODS_UPDATE",

  CustomerTagsAdded = "CUSTOMER_TAGS_ADDED",

  CustomerTagsRemoved = "CUSTOMER_TAGS_REMOVED",

  DiscountsCreate = "DISCOUNTS_CREATE",

  DiscountsDelete = "DISCOUNTS_DELETE",

  DiscountsRedeemcodeAdded = "DISCOUNTS_REDEEMCODE_ADDED",

  DiscountsRedeemcodeRemoved = "DISCOUNTS_REDEEMCODE_REMOVED",

  DiscountsUpdate = "DISCOUNTS_UPDATE",

  DisputesCreate = "DISPUTES_CREATE",

  DisputesUpdate = "DISPUTES_UPDATE",

  DomainsCreate = "DOMAINS_CREATE",

  DomainsDestroy = "DOMAINS_DESTROY",

  DomainsUpdate = "DOMAINS_UPDATE",

  DraftOrdersCreate = "DRAFT_ORDERS_CREATE",

  DraftOrdersDelete = "DRAFT_ORDERS_DELETE",

  DraftOrdersUpdate = "DRAFT_ORDERS_UPDATE",

  FulfillmentsCreate = "FULFILLMENTS_CREATE",

  FulfillmentsUpdate = "FULFILLMENTS_UPDATE",

  FulfillmentEventsCreate = "FULFILLMENT_EVENTS_CREATE",

  FulfillmentEventsDelete = "FULFILLMENT_EVENTS_DELETE",

  FulfillmentOrdersCancellationRequestAccepted = "FULFILLMENT_ORDERS_CANCELLATION_REQUEST_ACCEPTED",

  FulfillmentOrdersCancellationRequestRejected = "FULFILLMENT_ORDERS_CANCELLATION_REQUEST_REJECTED",

  FulfillmentOrdersCancellationRequestSubmitted = "FULFILLMENT_ORDERS_CANCELLATION_REQUEST_SUBMITTED",

  FulfillmentOrdersCancelled = "FULFILLMENT_ORDERS_CANCELLED",

  FulfillmentOrdersFulfillmentRequestAccepted = "FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_ACCEPTED",

  FulfillmentOrdersFulfillmentRequestRejected = "FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_REJECTED",

  FulfillmentOrdersFulfillmentRequestSubmitted = "FULFILLMENT_ORDERS_FULFILLMENT_REQUEST_SUBMITTED",

  FulfillmentOrdersFulfillmentServiceFailedToComplete = "FULFILLMENT_ORDERS_FULFILLMENT_SERVICE_FAILED_TO_COMPLETE",

  FulfillmentOrdersHoldReleased = "FULFILLMENT_ORDERS_HOLD_RELEASED",

  FulfillmentOrdersLineItemsPreparedForLocalDelivery = "FULFILLMENT_ORDERS_LINE_ITEMS_PREPARED_FOR_LOCAL_DELIVERY",

  FulfillmentOrdersLineItemsPreparedForPickup = "FULFILLMENT_ORDERS_LINE_ITEMS_PREPARED_FOR_PICKUP",

  FulfillmentOrdersMerged = "FULFILLMENT_ORDERS_MERGED",

  FulfillmentOrdersMoved = "FULFILLMENT_ORDERS_MOVED",

  FulfillmentOrdersOrderRoutingComplete = "FULFILLMENT_ORDERS_ORDER_ROUTING_COMPLETE",

  FulfillmentOrdersPlacedOnHold = "FULFILLMENT_ORDERS_PLACED_ON_HOLD",

  FulfillmentOrdersRescheduled = "FULFILLMENT_ORDERS_RESCHEDULED",

  FulfillmentOrdersScheduledFulfillmentOrderReady = "FULFILLMENT_ORDERS_SCHEDULED_FULFILLMENT_ORDER_READY",

  FulfillmentOrdersSplit = "FULFILLMENT_ORDERS_SPLIT",

  InventoryItemsCreate = "INVENTORY_ITEMS_CREATE",

  InventoryItemsDelete = "INVENTORY_ITEMS_DELETE",

  InventoryItemsUpdate = "INVENTORY_ITEMS_UPDATE",

  InventoryLevelsConnect = "INVENTORY_LEVELS_CONNECT",

  InventoryLevelsDisconnect = "INVENTORY_LEVELS_DISCONNECT",

  InventoryLevelsUpdate = "INVENTORY_LEVELS_UPDATE",

  LocalesCreate = "LOCALES_CREATE",

  LocalesUpdate = "LOCALES_UPDATE",

  LocationsActivate = "LOCATIONS_ACTIVATE",

  LocationsCreate = "LOCATIONS_CREATE",

  LocationsDeactivate = "LOCATIONS_DEACTIVATE",

  LocationsDelete = "LOCATIONS_DELETE",

  LocationsUpdate = "LOCATIONS_UPDATE",

  MarketsCreate = "MARKETS_CREATE",

  MarketsDelete = "MARKETS_DELETE",

  MarketsUpdate = "MARKETS_UPDATE",

  MetaobjectsCreate = "METAOBJECTS_CREATE",

  MetaobjectsDelete = "METAOBJECTS_DELETE",

  MetaobjectsUpdate = "METAOBJECTS_UPDATE",

  OrdersCancelled = "ORDERS_CANCELLED",

  OrdersCreate = "ORDERS_CREATE",

  OrdersDelete = "ORDERS_DELETE",

  OrdersEdited = "ORDERS_EDITED",

  OrdersFulfilled = "ORDERS_FULFILLED",

  OrdersPaid = "ORDERS_PAID",

  OrdersPartiallyFulfilled = "ORDERS_PARTIALLY_FULFILLED",

  OrdersShopifyProtectEligibilityChanged = "ORDERS_SHOPIFY_PROTECT_ELIGIBILITY_CHANGED",

  OrdersUpdated = "ORDERS_UPDATED",

  OrderTransactionsCreate = "ORDER_TRANSACTIONS_CREATE",

  PaymentSchedulesDue = "PAYMENT_SCHEDULES_DUE",

  PaymentTermsCreate = "PAYMENT_TERMS_CREATE",

  PaymentTermsDelete = "PAYMENT_TERMS_DELETE",

  PaymentTermsUpdate = "PAYMENT_TERMS_UPDATE",

  ProductsCreate = "PRODUCTS_CREATE",

  ProductsDelete = "PRODUCTS_DELETE",

  ProductsUpdate = "PRODUCTS_UPDATE",

  ProductFeedsCreate = "PRODUCT_FEEDS_CREATE",

  ProductFeedsFullSync = "PRODUCT_FEEDS_FULL_SYNC",

  ProductFeedsIncrementalSync = "PRODUCT_FEEDS_INCREMENTAL_SYNC",

  ProductFeedsUpdate = "PRODUCT_FEEDS_UPDATE",

  ProductListingsAdd = "PRODUCT_LISTINGS_ADD",

  ProductListingsRemove = "PRODUCT_LISTINGS_REMOVE",

  ProductListingsUpdate = "PRODUCT_LISTINGS_UPDATE",

  ProductPublicationsCreate = "PRODUCT_PUBLICATIONS_CREATE",

  ProductPublicationsDelete = "PRODUCT_PUBLICATIONS_DELETE",

  ProductPublicationsUpdate = "PRODUCT_PUBLICATIONS_UPDATE",

  ProfilesCreate = "PROFILES_CREATE",

  ProfilesDelete = "PROFILES_DELETE",

  ProfilesUpdate = "PROFILES_UPDATE",

  PublicationsDelete = "PUBLICATIONS_DELETE",

  RefundsCreate = "REFUNDS_CREATE",

  ReturnsApprove = "RETURNS_APPROVE",

  ReturnsCancel = "RETURNS_CANCEL",

  ReturnsClose = "RETURNS_CLOSE",

  ReturnsDecline = "RETURNS_DECLINE",

  ReturnsReopen = "RETURNS_REOPEN",

  ReturnsRequest = "RETURNS_REQUEST",

  ReverseDeliveriesAttachDeliverable = "REVERSE_DELIVERIES_ATTACH_DELIVERABLE",

  ReverseFulfillmentOrdersDispose = "REVERSE_FULFILLMENT_ORDERS_DISPOSE",

  ScheduledProductListingsAdd = "SCHEDULED_PRODUCT_LISTINGS_ADD",

  ScheduledProductListingsRemove = "SCHEDULED_PRODUCT_LISTINGS_REMOVE",

  ScheduledProductListingsUpdate = "SCHEDULED_PRODUCT_LISTINGS_UPDATE",

  SegmentsCreate = "SEGMENTS_CREATE",

  SegmentsDelete = "SEGMENTS_DELETE",

  SegmentsUpdate = "SEGMENTS_UPDATE",

  SellingPlanGroupsCreate = "SELLING_PLAN_GROUPS_CREATE",

  SellingPlanGroupsDelete = "SELLING_PLAN_GROUPS_DELETE",

  SellingPlanGroupsUpdate = "SELLING_PLAN_GROUPS_UPDATE",

  ShippingAddressesCreate = "SHIPPING_ADDRESSES_CREATE",

  ShippingAddressesUpdate = "SHIPPING_ADDRESSES_UPDATE",

  ShopUpdate = "SHOP_UPDATE",

  SubscriptionBillingAttemptsChallenged = "SUBSCRIPTION_BILLING_ATTEMPTS_CHALLENGED",

  SubscriptionBillingAttemptsFailure = "SUBSCRIPTION_BILLING_ATTEMPTS_FAILURE",

  SubscriptionBillingAttemptsSuccess = "SUBSCRIPTION_BILLING_ATTEMPTS_SUCCESS",

  SubscriptionBillingCyclesSkip = "SUBSCRIPTION_BILLING_CYCLES_SKIP",

  SubscriptionBillingCyclesUnskip = "SUBSCRIPTION_BILLING_CYCLES_UNSKIP",

  SubscriptionBillingCycleEditsCreate = "SUBSCRIPTION_BILLING_CYCLE_EDITS_CREATE",

  SubscriptionBillingCycleEditsDelete = "SUBSCRIPTION_BILLING_CYCLE_EDITS_DELETE",

  SubscriptionBillingCycleEditsUpdate = "SUBSCRIPTION_BILLING_CYCLE_EDITS_UPDATE",

  SubscriptionContractsActivate = "SUBSCRIPTION_CONTRACTS_ACTIVATE",

  SubscriptionContractsCancel = "SUBSCRIPTION_CONTRACTS_CANCEL",

  SubscriptionContractsCreate = "SUBSCRIPTION_CONTRACTS_CREATE",

  SubscriptionContractsExpire = "SUBSCRIPTION_CONTRACTS_EXPIRE",

  SubscriptionContractsFail = "SUBSCRIPTION_CONTRACTS_FAIL",

  SubscriptionContractsPause = "SUBSCRIPTION_CONTRACTS_PAUSE",

  SubscriptionContractsUpdate = "SUBSCRIPTION_CONTRACTS_UPDATE",

  TaxPartnersUpdate = "TAX_PARTNERS_UPDATE",

  TaxServicesCreate = "TAX_SERVICES_CREATE",

  TaxServicesUpdate = "TAX_SERVICES_UPDATE",

  TenderTransactionsCreate = "TENDER_TRANSACTIONS_CREATE",

  ThemesCreate = "THEMES_CREATE",

  ThemesDelete = "THEMES_DELETE",

  ThemesPublish = "THEMES_PUBLISH",

  ThemesUpdate = "THEMES_UPDATE",

  VariantsInStock = "VARIANTS_IN_STOCK",

  VariantsOutOfStock = "VARIANTS_OUT_OF_STOCK",
}

export type WebhookSubscriptionUpdatePayload = {
  __typename?: "WebhookSubscriptionUpdatePayload"

  userErrors: Array<UserError>

  webhookSubscription?: Maybe<WebhookSubscription>
}

export type Weight = {
  __typename?: "Weight"

  unit: WeightUnit

  value: Scalars["Float"]["output"]
}

export type WeightInput = {
  unit: WeightUnit

  value: Scalars["Float"]["input"]
}

export enum WeightUnit {
  Grams = "GRAMS",

  Kilograms = "KILOGRAMS",

  Ounces = "OUNCES",

  Pounds = "POUNDS",
}

export type DeliveryProfileCreatePayload = {
  __typename?: "deliveryProfileCreatePayload"

  profile?: Maybe<DeliveryProfile>

  userErrors: Array<UserError>
}

export type DeliveryProfileRemovePayload = {
  __typename?: "deliveryProfileRemovePayload"

  job?: Maybe<Job>

  userErrors: Array<UserError>
}

export type DeliveryProfileUpdatePayload = {
  __typename?: "deliveryProfileUpdatePayload"

  profile?: Maybe<DeliveryProfile>

  userErrors: Array<UserError>
}
