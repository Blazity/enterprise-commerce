## Next.js Enterprise Commerce

### Project Setup

To streamline the setup process, we will first list all necessary environment variables required for configuration. Subsequently, we'll provide detailed instructions on how to obtain each of these variables.

Below is the list of environment variables that you'll need to configure in your `.env` file for the proper setup of your enterprise commerce system:

```plaintext
SHOPIFY_STORE_DOMAIN=your_store_domain.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token
SHOPIFY_APP_API_SECRET_KEY=your_app_api_key
MEILISEARCH_MASTER_KEY=master_key
MEILISEARCH_HOST=https://something.meilisearch.io
```

Replace `your_store_domain.myshopify.com`, `your_storefront_access_token`, `your_admin_access_token`, and `your_app_api_key` with the actual values that you will obtain through the setup process described below.

## Configuration Steps

### 1. Shopify Store Domain

- **Variable Required:** `SHOPIFY_STORE_DOMAIN`
- **How to Obtain:**
  - Your Shopify store domain is the URL of your Shopify store. You can obtain it in shopify dashboard, it should be without `https` and `/` at the end of the string. Example: `cool-socks.myshopify.com`

### 2. Headless App

- **Variable Required:** `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- **Installation and Configuration:**
  1. Visit the Shopify Marketplace and search for the Headless commerce application or navigate directly to [https://apps.shopify.com/headless](https://apps.shopify.com/headless).
  2. Install the application, open it, and create a new Storefront within the app.
  3. In the "Manage API Access" section, click on the `Manage` button next to **Storefront API**.
  4. Make sure you have enabled `unauthenticated_read_product_inventory` and `unauthenticated_read_customer_tags` scopes
  5. Copy the **Private access token** displayed and place it in your `.env` file under `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

### 3. Private Admin App

- **Variables Required:** `SHOPIFY_ADMIN_ACCESS_TOKEN`, `SHOPIFY_APP_API_SECRET_KEY`
- **Application Setup and Scopes Configuration:**
  1. Go to the Shopify admin dashboard, navigate to Settings > `Apps and sales channels` > `Develop Apps`, and click on `Create app`.
  2. After naming and creating your app, move to the `Configuration` tab.
  3. In the "Admin API access scopes" section, click `Edit` and select the following scopes:
     - `write_product_listings`
     - `read_product_listings`
     - `read_products`
     - `write_products`
  4. Under **Webhook subscriptions**, choose the `2024-01` API version.
  5. In the `Storefront API Integration` section, enable the listed unauthenticated scopes.
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_pickup_locations`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_read_selling_plans`
     - `unauthenticated_read_bulk_operations`
  6. Lastly, navigate to the `API Credentials` section.
     - Copy the **Admin API access token** and place it in your `.env` file under `SHOPIFY_ADMIN_ACCESS_TOKEN`
     - Also, copy the `SHOPIFY_APP_API_SECRET_KEY` and place it in your `.env` file under `SHOPIFY_APP_API_SECRET_KEY`

### 4. Setting Up Meilisearch

Meilisearch is a powerful, fast, open-source search engine. There are two main ways to host Meilisearch: on-premise (self-hosting on dedicated servers or cloud providers) and using Meilisearch Cloud. For the purposes of this guide, we will focus on the recommended approach, which is using Meilisearch Cloud.

To get started with Meilisearch Cloud, navigate to the Meilisearch Cloud platform and [log in](https://cloud.meilisearch.com/).

- Create a new project within the platform.
- Create an index called `products`. If you wish to use different index name you will also have to make a change in the codebase.
- After your project is set up, proceed to the "Settings" tab of your Meilisearch Cloud project.
- Locate and copy the `Master key`. This key should be securely stored in your .env file under the `MEILISEARCH_MASTER_KEY` variable.
- Copy the Meilisearch URL and place it in your .env file under `MEILISEARCH_HOST`. **Ensure you do not include a trailing slash at the end of the URL.**
