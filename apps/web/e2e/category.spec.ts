import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto('http://localhost:3000/category/beauty');

  await expect(page).toHaveTitle("beauty | Enterprise Commerce")
})

test('should check the existence of breadcrumb elements', async ({ page }) => {
    await page.goto('http://localhost:3000/category/beauty');
  
    const breadcrumbNav = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbNav).toBeVisible();
  
    // Locate the ordered list within the breadcrumb
    const breadcrumbList = breadcrumbNav.locator('ol.no-scrollbar.flex.items-center.gap-1\\.5.overflow-x-scroll.whitespace-nowrap.text-xs.md\\:text-base\\/\\[18px\\]');
    await expect(breadcrumbList).toBeVisible();
  
    //  "Home" 
    const homeLink = breadcrumbList.locator('li a[href="/"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText('Home');
  
    // separator SVG exists and is visible
    const separatorSVG = breadcrumbList.locator('li svg.-rotate-90');
    await expect(separatorSVG).toBeVisible();
  
    // "Beauty" 
    const beautyLink = breadcrumbList.locator('li a[href="/category/beauty"].font-medium.underline');
    await expect(beautyLink).toBeVisible();
    await expect(beautyLink).toHaveText('Beauty');

    const locator = page.locator('h1.mt-4.text-3xl.font-extrabold.tracking-tight.text-gray-900.sm\\:text-4xl');
    await expect(locator).toHaveText('Beauty');
  });
  

  test('Check existence of div element with class and text', async ({ page }) => {
    await page.goto('http://localhost:3000/category/beauty');
  
    // Check if the div element with the specified class and text is present
    const locator = page.locator('div.mt-2.text-lg.text-gray-500.transition-all');
    await expect(locator).toHaveText(
      'The beauty category in our store is an expansive and carefully selected collection that caters to your every beauty need, embracing all aspects of skincare, makeup, haircare, and fragrance. This selection is crafted to inspire and empower, featuring the latest innovations and timeless essentials from leading brands and niche labels alike. Dive into our skincare range to find solutions for every sk...'
    );
  });


test('Check elements in header section', async ({ page }) => {
  await page.goto('http://localhost:3000/category/beauty');

  //  '24 results found' text
  const resultsText = page.locator('div.flex.items-center.justify-between.pb-8 > div:nth-child(2) > span');
  await expect(resultsText).toBeVisible();
  await expect(resultsText).toHaveText(/24 results found/);

  //  'Sort by: Relevancy' dropdown
  const sortByDropdown = page.locator('div.flex.items-center.justify-between.pb-8 > div.hidden.lg\\:block div.cursor-pointer');
  await expect(sortByDropdown).toBeVisible();
  await expect(sortByDropdown).toHaveText(/Sort by: Relevancy/);

  // dropdown icon is present
  const dropdownIcon = page.locator('div.flex.items-center.justify-between.pb-8 > div.hidden.lg\\:block svg');
  await expect(dropdownIcon).toBeVisible();
});


test('check elements exist by text', async ({ page }) => {
  await page.goto('http://localhost:3000/category/beauty');

  // Check for "Sort by: Relevancy"
  const sortByRelevancy = page.locator('div:has-text("Sort by: Relevancy")').first();
  await expect(sortByRelevancy).toBeVisible();

  // Check for "No categories found"
  const noCategoriesFound = page.locator('text=No categories found');
  await expect(noCategoriesFound).toBeVisible();

  // Check for "Vendors"
  const vendors = page.locator('text=Vendors');
  await expect(vendors).toBeVisible();

  // Check for "Colors"
  const colors = page.locator('text=Colors');
  await expect(colors).toBeVisible();

  // Check for "Rating"
  const rating = page.locator('text=Rating');
  await expect(rating).toBeVisible();

  // Check for "Price Range"
  const priceRange = page.locator('text=Price Range');
  await expect(priceRange).toBeVisible();

  const searchInput = page.getByRole('searchbox', { name: 'Search...' });
  await expect(searchInput).toBeVisible();
});

test('check container visibility', async ({ page }) => {
await page.goto('http://localhost:3000/category/beauty');

  // Locate the container element
  const container = page.locator('.flex > div:nth-child(2) > .grid > div').first();

  await expect(container).toBeVisible();
});

test('check social media links in header', async ({ page }) => {
  await page.goto('http://localhost:3000/category/beauty');

  // Facebook link exists
  const facebookLink = page.locator('a[aria-label="Facebook link"][href="https://www.facebook.com/blazity/"]');
  await expect(facebookLink).toBeVisible();

  // Twitter link exists
  const twitterLink = page.locator('a[aria-label="Twitter link"][href="https://twitter.com/blazity"]');
  await expect(twitterLink).toBeVisible();

  // Instagram link exists
  const instagramLink = page.locator('a[aria-label="Instagram link"][href="https://www.instagram.com/blazitysoftware/"]');
  await expect(instagramLink).toBeVisible();

  // LinkedIn link exists
  const linkedinLink = page.locator('a[aria-label="Linkedin link"][href="https://www.linkedin.com/company/blazity"]');
  await expect(linkedinLink).toBeVisible();

  // YouTube link exists
  const youtubeLink = page.locator('a[aria-label="Youtube link"][href="https://www.youtube.com/channel/UCYDeWaSWiOHn_lUHY-u1VYw/videos"]');
  await expect(youtubeLink).toBeVisible();
});

test('check elements in main section', async ({ page }) => {
  await page.goto('http://localhost:3000/category/beauty');

  // "Designed by v0" link exists
  const designedByLink = page.locator('a[href="https://v0.dev/"] span:text("Designed by v0")');
  await expect(designedByLink).toBeVisible();

  //  "Missing feature?" text exists
  const missingFeatureText = page.locator('p:text("Missing feature?")');
  await expect(missingFeatureText).toBeVisible();

  //  "Let us know, we'll build it!" link exists
  const letUsKnowLink = page.locator('a[href="mailto:contact@blazity.com"]');
  await expect(letUsKnowLink).toBeVisible();
});


test('check product card elements and interactions', async ({ page }) => {
  await page.goto('http://localhost:3000/category/beauty');

  // Check that the main product container is visible
  const productContainer = page.locator('.flex > div:nth-child(2) > .grid > div').first();
  await expect(productContainer).toBeVisible();

  //\ "Quick add" section \\
  const quickAddSection = productContainer.locator('div.group-hover\\:h-\\[90px\\]');
  await productContainer.hover();
  await expect(quickAddSection).toBeVisible();

  // Check that all quick add buttons are present and have the correct text
  const quickAddButtons = quickAddSection.locator('button');
  const buttonTexts = ['White670.00$', 'Dark420.00$', 'Darker720.00$', 'Even Darker460.00$', 'The Darkest960.00$'];
  for (let i = 0; i < buttonTexts.length; i++) {
    const button = quickAddButtons.nth(i);
    await expect(button).toHaveText(buttonTexts[i]);
  }

  // Check that the product title is correct
  const productTitle = productContainer.locator('div.line-clamp-2.text-base.tracking-tight.md\\:text-xl');
  await expect(productTitle).toHaveText('Floral Elegance Tote Bag');

  // Check that the product rating and review count are correct
  const rating = productContainer.locator('span.text-sm');
  await expect(rating).toHaveText('4.85');
  const reviews = productContainer.locator('span.text-xs');
  await expect(reviews).toHaveText('(15 reviews)');

  // Check that the product price is correct
  const price = productContainer.locator('p.text-base.font-semibold.tracking-tight.text-black.md\\:text-lg');
  await expect(price).toHaveText('From 420.00$');

  await quickAddButtons.first().click();
});


test('Check Home elemet exist', async ({ page }) => {
  await page.goto('http://localhost:3000/category/home'); 

  // ol element
  const olLocator = page.locator('ol.no-scrollbar.flex.items-center.gap-1\\.5.overflow-x-scroll.whitespace-nowrap.text-xs.md\\:text-base\\/\\[18px\\]');

  // ol element exists
  await expect(olLocator).toBeVisible();

  // li containing the <a> link with specific text
  const linkLocator = olLocator.locator('li > a', { hasText: 'Home' });

  await expect(linkLocator).toBeVisible();
});

test('Check if specific elements exist inside the header', async ({ page }) => {
  await page.goto('http://localhost:3000/category/home'); 
  
  // header element
  const headerLocator = page.locator('header.mt-2');

  // Check if the <header> element exists
  await expect(headerLocator).toBeVisible();

  // h1 element inside the <header>
  const h1Locator = headerLocator.locator('h1.mt-4.text-3xl.font-extrabold.tracking-tight.text-gray-900.sm\\:text-4xl');

  //<h1> element exists
  await expect(h1Locator).toBeVisible();

  // <div> element inside the <header>
  const divLocator = headerLocator.locator('div.mt-2.text-lg.text-gray-500.transition-all');

  // <div> element exists
  await expect(divLocator).toBeVisible();

  //<button> element inside the <header>
  const buttonLocator = headerLocator.locator('button.mt-3.inline-block.bg-transparent.font-bold');

  await expect(buttonLocator).toBeVisible();
});


test('Check if specific elements exist inside the ordered list', async ({ page }) => {
  await page.goto('http://localhost:3000/category/electronics'); 

  const olLocator = page.locator('ol.no-scrollbar.flex.items-center.gap-1\\.5.overflow-x-scroll.whitespace-nowrap.text-xs.md\\:text-base\\/\\[18px\\]');

  // <ol> element exists
  await expect(olLocator).toBeVisible();

  // Define the locator for the first <li> containing the <a> link with the text "Home"
  const homeLinkLocator = olLocator.locator('li > a.text-neutral-500.hover\\:underline[href="/"]');

  //  <a> link element with text "Home" exists
  await expect(homeLinkLocator).toBeVisible();

  //  <li> containing the <svg> element
  const svgLocator = olLocator.locator('li > svg.-rotate-90');

  //  <svg> element exists
  await expect(svgLocator).toBeVisible();

  // Define the locator for the third <li> containing the <a> link
  const electronicsLinkLocator = olLocator.locator('li > a.text-neutral-500.hover\\:underline.font-medium.underline[href="/category/electronics"]');

  await expect(electronicsLinkLocator).toBeVisible();
});


test('Check if specific elements exist inside the header for electronics', async ({ page }) => {
  await page.goto('http://localhost:3000/category/electronics'); 

  // Define the locator for the <header> element
  const headerLocator = page.locator('header.mt-2');

  // <header> element exists
  await expect(headerLocator).toBeVisible();

  //  <h1> element within the <header>
  const h1Locator = headerLocator.locator('h1.mt-4.text-3xl.font-extrabold.tracking-tight.text-gray-900.sm\\:text-4xl');

  // Check if the <h1> element
  await expect(h1Locator).toBeVisible();
  await expect(h1Locator).toHaveText('Electronics');

  // Define the locator for the <div> element within the <header>
  const divLocator = headerLocator.locator('div.mt-2.text-lg.text-gray-500.transition-all');

  // Check if the <div> element exists 
  await expect(divLocator).toBeVisible();
  await expect(divLocator).toContainText('The electronics category in our store');

  //<button> element within the <header>
  const buttonLocator = headerLocator.locator('button.mt-3.inline-block.bg-transparent.font-bold');

  // Check if the <button> element exists
  await expect(buttonLocator).toBeVisible();
  await expect(buttonLocator).toHaveText('Read More');
});


test('should check the existence of specific elements on the page', async ({ page }) => {

  await page.goto('http://localhost:3000/product/example_electronics_4', { waitUntil: 'networkidle' });
 
  const slider = page.locator('.overflow-hidden .flex');

  // Locate the button that controls the slider
  const nextButton = page.locator('button.your-next-button-class');

  // Check the initial position or the first image
  let firstImageSrc = await slider.locator('img').nth(0).getAttribute('src');
  console.log('First Image Source:', firstImageSrc);

  await nextButton.click();

  // Wait for the slider
  await page.waitForTimeout(1000);

  // new position or the next image
  let secondImageSrc = await slider.locator('img').nth(0).getAttribute('src');
  console.log('Second Image Source:', secondImageSrc);

  // image source has changed
  expect(secondImageSrc).not.toBe(firstImageSrc);

  // again to go to the next slide
  await nextButton.click();
  
  // for the next transition
  await page.waitForTimeout(1000);

  // third image or position
  let thirdImageSrc = await slider.locator('img').nth(0).getAttribute('src');
  console.log('Third Image Source:', thirdImageSrc);

  // the image source has changed again
  expect(thirdImageSrc).not.toBe(secondImageSrc);
});