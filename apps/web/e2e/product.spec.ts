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


test('should check if the specific div element exists with correct content', async ({ page }) => {
  await page.goto('http://localhost:3000/product/example_bags2');

  // Locator for the div element
  const targetText = page.getByText("Customers are enamored with its vibrant botanical print and sophisticated design, which effortlessly elevates any outfit. The spacious interior accommodates all essentials, while the luxurious hardware accents add a polished touch. Reviewers also appreciate its durable construction, ensuring it remains a staple accessory for years to come. Perfect for anyone looking to embrace timeless style with a chic and practical handbag.");

  await expect(targetText).toBeVisible();

  // Locator for the div
  const targetTextSelect = page.getByText("Select variant");
  await expect(targetTextSelect).toBeVisible();
});


test('should check if the specific div and its child elements exist with correct attributes', async ({ page }) => {
  await page.goto('http://localhost:3000/product/example_bags2');

  //locator for the parent div element
  const parentDiv = page.locator('div.relative.flex.w-full.flex-wrap.gap-2');

  //  a element exists with the correct href attribute
  const whiteLink = parentDiv.locator('a[href="example_bags2-color_white"]');
  await expect(whiteLink).toHaveText('White');
  
  //  a element exists with the correct href attribute
  const darkLink = parentDiv.locator('a[href="example_bags2-color_dark"]');
  await expect(darkLink).toHaveText('Dark');
  
 //  a element exists with the correct href attribute
  const darkerLink = parentDiv.locator('a[href="example_bags2-color_darker"]');
  await expect(darkerLink).toHaveText('Darker');
  
 //  a element exists with the correct href attribute
  const evenDarkerLink = parentDiv.locator('a[href="example_bags2-color_even darker"]');
  await expect(evenDarkerLink).toHaveText('Even Darker');
  
 //  a element exists with the correct href attribute
  const darkestLink = parentDiv.locator('a[href="example_bags2-color_the darkest"]');
  await expect(darkestLink).toHaveText('The Darkest');
});

test('should check if the specific div element exists with corrects content', async ({ page }) => {
  // examples of color selection products

  await page.goto('http://localhost:3000/product/example_bags2-color_white');

  const priceDiv = page.getByText("670.00 USD");
  await expect(priceDiv).toBeVisible();

  await page.goto('http://localhost:3000/product/example_bags2-color_dark');

  const priceDivDark = page.getByText("420.00 USD");
  await expect(priceDivDark).toBeVisible();

  await page.goto('http://localhost:3000/product/example_bags2-color_darker');

  const priceDivDarker = page.getByText("720.00 USD");
  await expect(priceDivDarker).toBeVisible();


  await page.goto('http://localhost:3000/product/example_bags2-color_even%20darker');

  const priceDivEven = page.getByText("460.00 USD");
  await expect(priceDivEven).toBeVisible();


  await page.goto('http://localhost:3000/product/example_bags2-color_the%20darkest');

  const priceDivDarkest = page.getByText("960.00 USD");
  await expect(priceDivDarkest).toBeVisible();
});



test.describe('Image Carousel Tests', () => {
  test('should have correct number of images in the carousel', async ({ page }) => {
    await page.goto('http://localhost:3000/product/example_bags2-color_white');

    // Select all image elements within the carousel
    const images = await page.locator('div[role="region"][aria-roledescription="carousel"] img');
    
    // Check the number of images
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0); 
    
    // Check for specific image attributes
    for (let i = 0; i < imageCount; i++) {
      const imgLocator = images.nth(i);

      // Check that each image has a src attribute
      const src = await imgLocator.getAttribute('src');
      expect(src).not.toBeNull();
      
      // Check that each image has an alt attribute
      const alt = await imgLocator.getAttribute('alt');
      expect(alt).not.toBeNull();
      
      // Check that each image has a width and height
      // const width = await imgLocator.getAttribute('width');
      // const height = await imgLocator.getAttribute('height');
      // expect(width).not.toBeNull();
      // expect(height).not.toBeNull();
    }
  });

  test('should scroll images correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/product/example_bags2-color_white');

    // carousel container has a class or ID for easy selection
    const carouselLocator = page.getByRole('region').first();
    const carouselElementHandle = await carouselLocator.elementHandle();

    // carousel element is found
    if (!carouselElementHandle) {
      throw new Error('Carousel element not found');
    }

    // Scroll to the next image 
    await page.evaluate((carousel) => {
      if (carousel) {
        carousel.scrollBy({ left: 500, behavior: 'smooth' });
      }
    }, carouselElementHandle);

    // Wait for some time for the scroll animation
    await page.waitForTimeout(1000);

    // Check if the new image is in view
    const firstImage = carouselLocator.locator('img').first();
    const firstImageSrc = await firstImage.getAttribute('src');

    // Validate that the first image source changed after scrolling
    expect(firstImageSrc).toContain('example_bags2_3de05386-bb42-4d9e-879e-a33ef2bad59a.png');
  });
});