import { expect, test } from "@playwright/test"

test('should check if the header and buttons exist', async ({ page }) => {
    await page.goto('http://localhost:3000/product/example_bags2');
  
    // Check if the header exists
    const header = page.locator('header.hidden.bg-white.py-4.md\\:block');
    await expect(header).toBeVisible();
  
    // Check if the "Log In" button exists within the header
    const loginButton = header.locator('button:has-text("Log In")');
    await expect(loginButton).toBeVisible();
  
    // Check if the "Sign Up" button exists within the header
    const signUpButton = header.locator('button:has-text("Sign Up")');
    await expect(signUpButton).toBeVisible();
  });


test('Check existence of menu items and submenus', async ({ page }) => {
    await page.goto('http://localhost:3000/product/example_bags2');
  
    // Check existence of the main menu items
    await expect(page.locator('a.menu__link[href="/category/fashion"]')).toBeVisible();
    await expect(page.locator('a.menu__link[href="/category/electronics"]')).toBeVisible();
    await expect(page.locator('a.menu__link[href="/category/sports-and-outdoors"]')).toBeVisible();
    await expect(page.locator('a.menu__link[href="/category/beauty"]')).toBeVisible();
  
    // Check existence of submenus under "Fashion"
    await page.hover('a.menu__link[href="/category/fashion"]');
    await expect(page.locator('a[href="/category/women"]')).toBeVisible();
    await expect(page.locator('a[href="/category/men"]')).toBeVisible();
    await expect(page.locator('a[href="/category/kids"]')).toBeVisible();
  
    // Check existence of submenus under "Electronics"
    await page.hover('a.menu__link[href="/category/electronics"]');
    await expect(page.locator('a[href="/category/audio-devices"]')).toBeVisible();
    await expect(page.locator('a[href="/category/cameras"]')).toBeVisible();
    await expect(page.locator('a[href="/category/smartphones"]')).toBeVisible();
    await expect(page.locator('a[href="/category/laptops"]')).toBeVisible();
    await expect(page.locator('a[href="/category/screens"]')).toBeVisible();
  
    // Check existence of submenus under "Sports & Outdoors"
    await page.hover('a.menu__link[href="/category/sports-and-outdoors"]');
    await expect(page.locator('a[href="/category/exercise-equipment"]')).toBeVisible();
    await expect(page.locator('a[href="/category/outdoor-gear"]')).toBeVisible();
    await expect(page.locator('a[href="/category/sportswear"]')).toBeVisible();
    await expect(page.locator('a[href="/category/athletic-footwear"]')).toBeVisible();
  
    // Check existence of submenus under "Beauty"
    await page.hover('a.menu__link[href="/category/beauty"]');
    await expect(page.locator('a[href="/category/skin-care"]')).toBeVisible();
    await expect(page.locator('a[href="/category/makeup"]')).toBeVisible();
    await expect(page.locator('a[href="/category/haircare"]')).toBeVisible();
    await expect(page.locator('a[href="/category/fragrances"]')).toBeVisible();
  });


  test('should check breadcrumb elements', async ({ page }) => {
    await page.goto('http://localhost:3000/product/example_bags2');

    // Locate the breadcrumb navigation
    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible();
  
    // Check the first breadcrumb item (Home link)
    const homeLink = breadcrumbNav.locator('a:text("Home")');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '/');
  
    // Check the second breadcrumb separator (SVG)
    const firstSeparator = breadcrumbNav.locator('svg').nth(0);
    await expect(firstSeparator).toBeVisible();
  
    // Check the second breadcrumb item (Products link)
    const productsLink = breadcrumbNav.locator('a:text("Products")');
    await expect(productsLink).toBeVisible();
    await expect(productsLink).toHaveAttribute('href', '/search');
  
    // Check the third breadcrumb separator (SVG)
    const secondSeparator = breadcrumbNav.locator('svg').nth(1);
    await expect(secondSeparator).toBeVisible();
  
    // Check the third breadcrumb item (current page link)
    const currentPageLink = breadcrumbNav.locator('a[aria-current="page"]');
    await expect(currentPageLink).toBeVisible();
    await expect(currentPageLink).toHaveText('Floral Elegance Tote Bag');
    await expect(currentPageLink).toHaveClass(/font-medium underline/);
  });


test('should check product title and rating elements', async ({ page }) => {
    await page.goto('http://localhost:3000/product/example_bags2');
    
  // title 
  const title = page.getByRole('link', { name: 'Floral Elegance Tote Bag', exact: true });
  await expect(title).toBeVisible();

  const container = page.locator('div').filter({ hasText: /^\(4\.85\) based on 15 reviews$/ });
  await expect(container).toBeVisible();

  // SVG 
  const stars = container.locator('div.flex.items-center.gap-1 > svg');
  await expect(stars).toHaveCount(5);

  // review text is present and correct
  const reviewText = container.locator('span.text-xs.text-gray-400');
  await expect(reviewText).toBeVisible();
  await expect(reviewText).toHaveText('(4.85) based on 15 reviews');
  });