import { expect, test } from "@playwright/test"

test('Check header elements exist', async ({ page }) => {
    await page.goto("http://localhost:3000/")

  // Check for the existence of the header
  const header = page.locator('header.hidden.bg-white.py-4.md\\:block');
  await expect(header).toBeVisible();

  // Check for the existence of the logo link
  const logoLink = header.locator('a.text-3xl.font-bold');
  await expect(logoLink).toBeVisible();

  // Check for the existence of the "Log In" button
  const loginButton = header.locator('button:has-text("Log In")');
  await expect(loginButton).toBeVisible();

  // Check for the existence of the "Sign Up" button
  const signUpButton = header.locator('button:has-text("Sign Up")');
  await expect(signUpButton).toBeVisible();
});

test('Check that clicking Log In button opens the login menu', async ({ page }) => {
    await page.goto("http://localhost:3000/")
  
    // Click the "Log In" button
    await page.getByRole('button', { name: 'Log In' }).click();
  
    // Check the form title
    const loginTitle = "Login";
    const loginMenu = page.getByText(loginTitle);
    await expect(loginMenu).toBeVisible();

   // Check the form element
  const form = page.locator('form#loginForm');
  await expect(form).toBeVisible();

  // Check the email label by its text
  const emailLabel = form.locator('label:has-text("Email")');
  await expect(emailLabel).toBeVisible();

  // Check the email input by its placeholder
  const emailInput = form.locator('input[placeholder="Enter email..."]');
  await expect(emailInput).toBeVisible();

  // Check the password label by its text
  const passwordLabel = form.locator('label:has-text("Password")');
  await expect(passwordLabel).toBeVisible();

  // Check the password input by its placeholder
  const passwordInput = form.locator('input[placeholder="Enter password..."]');
  await expect(passwordInput).toBeVisible();
  });

  test('Check that clicking Log In button opens the Signup menu', async ({ page }) => {
    await page.goto("http://localhost:3000/")
  
    // Click the Sign up button
    await page.getByRole('button', { name: 'Sign up' }).click();
  
    // Check the form title
    const loginTitle = "Signup";
    const loginMenu = page.getByText(loginTitle);
    await expect(loginMenu).toBeVisible();

   // Check the form element
  const form = page.locator('form#loginForm');
  await expect(form).toBeVisible();

  // Check the email label by its text
  const emailLabel = form.locator('label:has-text("Email")');
  await expect(emailLabel).toBeVisible();

  // Check the email input by its placeholder
  const emailInput = form.locator('input[placeholder="Enter email..."]');
  await expect(emailInput).toBeVisible();

  // Check the password label by its text
  const passwordLabel = form.locator('label:has-text("Password")');
  await expect(passwordLabel).toBeVisible();

  // Check the password input by its placeholder
  const passwordInput = form.locator('input[placeholder="Enter password..."]');
  await expect(passwordInput).toBeVisible();
  });



test('should check if the image exists', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // image element
  const imageLocator = page.locator('div.shrink-1.flex.basis-1\\/2.items-center.justify-center.bg-neutral-100.p-36 img');

  await expect(imageLocator).toBeVisible();
  
  // 'src' attribute
  await expect(imageLocator).toHaveAttribute('src', '/default-product-image.svg');
});

test('should check if the heading and button exist', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // heading element 
  const headingLocator = page.locator('text=Your daily trendsetting deals');

  await expect(headingLocator).toBeVisible();

  // button 
  const buttonLocator = page.locator('div.flex.basis-1\\/2.flex-col.items-center.justify-start.gap-16.px-4.py-20.md\\:items-start.md\\:p-36 button');

  // Assert that the button exists
  await expect(buttonLocator).toBeVisible();
  await expect(buttonLocator).toHaveText('See on GitHub');

  // check the button's link
  const linkLocator = page.locator('div.flex.basis-1\\/2.flex-col.items-center.justify-start.gap-16.px-4.py-20.md\\:items-start.md\\:p-36 a');
  await expect(linkLocator).toHaveAttribute('href', 'https://git.new/commerce');
});

test('should check if the sale banner and link exist and verify link redirection', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  //  banner text
  const bannerLocator = page.locator('text=Sale 50% OFF');

  await expect(bannerLocator).toBeVisible();

  // "Shop Now" link
  const linkLocator = page.locator('text=Shop Now');

  await expect(linkLocator).toBeVisible();

  // "Shop Now" link and verify the redirection
  await linkLocator.click();

  await expect(page).toHaveURL('http://localhost:3000/');
});

test('should check if the "Shop by Category" section exists', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  //  "Shop by Category" heading
  const headingLocator = page.locator('div.basis-1\\/3.text-center.text-5xl.font-normal.tracking-tighter.sm\\:min-w-\\[280px\\].md\\:text-left.md\\:text-6xl h2');

  await expect(headingLocator).toBeVisible();
  await expect(headingLocator).toHaveText('Shop by Category');
});


test('should check if all category sections exist', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  //  "Beauty" category
  const beautyCategory = page.locator('h3:has-text("Beauty")');
  await expect(beautyCategory).toBeVisible();

  // "Electronics" category
  const electronicsCategory = page.locator('h3:has-text("Electronics")');
  await expect(electronicsCategory).toBeVisible();

  // "Fashion" category
  const fashionCategory = page.locator('h3:has-text("Fashion")');
  await expect(fashionCategory).toBeVisible();

  // "Furniture" category
  const furnitureCategory = page.locator('h3:has-text("Furniture")');
  await expect(furnitureCategory).toBeVisible();

  // "Home" category
  const homeCategory = page.locator('h3:has-text("Home")');
  await expect(homeCategory).toBeVisible();

  // "Retro" category
  const retroCategory = page.locator('h3:has-text("Retro")');
  await expect(retroCategory).toBeVisible();
});



test('check for the existence of specific elements', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Check if the container div exists
  const container = page.getByText('Best OffersPrevious slideNext');
  await expect(container).toBeVisible();

  //  heading element exists
  const heading = container.locator('h2');
  await expect(heading).toHaveText('Best Offers');

  // Check if the buttons within the div are visible
  const buttons = container.locator('div.hidden.gap-4.md\\:flex button');
  await expect(buttons).toHaveCount(2);

  // first button has the correct attributes and content
  const firstButton = buttons.first();
  await expect(firstButton).toHaveAttribute('disabled', '');
  await expect(firstButton.locator('span > svg')).toBeVisible();
  await expect(firstButton.locator('span > svg > path')).toHaveAttribute('d', 'M0.999876 1.03964L4.89244 4.89256L8.74536 1');
  await expect(firstButton.locator('span > span.sr-only')).toHaveText('Previous slide');

  //  second button has the correct attributes and content
  const secondButton = buttons.nth(1);
  await expect(secondButton).toHaveAttribute('disabled', '');
  await expect(secondButton.locator('span > svg')).toBeVisible();
  await expect(secondButton.locator('span > svg > path')).toHaveAttribute('d', 'M0.999876 1.03964L4.89244 4.89256L8.74536 1');
  await expect(secondButton.locator('span > span.sr-only')).toHaveText('Next slide');
});



test('check for the existence of specific elements in the second HTML snippet', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Check if the container div exists
  const container = page.getByText('Everything under $50Previous')
  await expect(container).toBeVisible();

  // Check if the heading <h2> element exists
  const heading = container.locator('h2');
  await expect(heading).toHaveText('Everything under $50');

  // Check if the buttons within the div are visible
  const buttons = container.locator('div.hidden.gap-4.md\\:flex button');
  await expect(buttons).toHaveCount(2);

  // Check if the first button has the correct attributes and content
  const firstButton = buttons.first();
  await expect(firstButton).toHaveAttribute('disabled', '');
  await expect(firstButton.locator('span > svg')).toBeVisible();
  await expect(firstButton.locator('span > svg > path')).toHaveAttribute('d', 'M0.999876 1.03964L4.89244 4.89256L8.74536 1');
  await expect(firstButton.locator('span > span.sr-only')).toHaveText('Previous slide');

  // Check if the second button has the correct attributes and content
  const secondButton = buttons.nth(1);
  await expect(secondButton).toHaveAttribute('disabled', '');
  await expect(secondButton.locator('span > svg')).toBeVisible();
  await expect(secondButton.locator('span > svg > path')).toHaveAttribute('d', 'M0.999876 1.03964L4.89244 4.89256L8.74536 1');
  await expect(secondButton.locator('span > span.sr-only')).toHaveText('Next slide');
});


test('check for the existence of specific elements in the form', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Check if the container div exists
  const container = page.locator('div.max-w-container-md.mx-auto.my-0.w-full.px-4.py-16.xl\\:px-0');
  await expect(container).toBeVisible();

  // grid container
  const gridContainer = container.locator('div.grid.grid-cols-1.items-center.gap-8.md\\:grid-cols-2');
  await expect(gridContainer).toBeVisible();

  // text element
  const textElement = gridContainer.locator('div:first-of-type p');
  await expect(textElement).toHaveText('Become a member and receive our special discounts.');

  // form exists
  const form = gridContainer.locator('div:nth-of-type(2) > form');
  await expect(form).toBeVisible();

  //  Name input field 
  const nameInput = form.locator('label:first-of-type input');
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toHaveAttribute('placeholder', 'Name');

  // Email input field
  const emailInput = form.locator('label:nth-of-type(2) input');
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toHaveAttribute('placeholder', 'Email');
  await expect(emailInput).toHaveAttribute('type', 'email');

  // button exists 
  const button = form.locator('button');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Become a Member');
});



test('should check for social media links in the header', async ({ page }) => {
  await page.goto("http://localhost:3000/")

  // Locate the header element
  const header = page.locator('header.flex.justify-end.gap-4.pt-8');
  await expect(header).toBeVisible();

  // Check if each social media link exists and has the correct aria-label and href
  const facebookLink = header.locator('a[aria-label="Facebook link"]');
  await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/blazity/');
  await expect(facebookLink).toBeVisible();

  const twitterLink = header.locator('a[aria-label="Twitter link"]');
  await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/blazity');
  await expect(twitterLink).toBeVisible();

  const instagramLink = header.locator('a[aria-label="Instagram link"]');
  await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/blazitysoftware/');
  await expect(instagramLink).toBeVisible();

  const linkedinLink = header.locator('a[aria-label="Linkedin link"]');
  await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/blazity');
  await expect(linkedinLink).toBeVisible();

  const youtubeLink = header.locator('a[aria-label="Youtube link"]');
  await expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/channel/UCYDeWaSWiOHn_lUHY-u1VYw/videos');
  await expect(youtubeLink).toBeVisible();
});


test('should check the existence of elements within the main section', async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const main = page.locator('main.py-32');
  await expect(main).toBeVisible();

  // Check if the "Designed by v0" link exists
  const designedByLink = main.locator('a[target="_blank"][href="https://v0.dev/"]');
  await expect(designedByLink).toBeVisible();

  // "Designed by v0" 
  const designedBySpan = designedByLink.locator('span.focus\\:ring-ring.mb-4.inline-flex.w-fit.items-center.whitespace-nowrap.rounded-full.border.border-transparent.bg-white.px-2\\.5.py-0\\.5.text-xs.font-semibold.text-black.transition-colors.focus\\:outline-none.focus\\:ring-2.focus\\:ring-offset-2');
  await expect(designedBySpan).toBeVisible();
  await expect(designedBySpan).toHaveText('Designed by v0');

  // Check if the "Missing feature?" paragraph exists
  const missingFeatureText = main.locator('p.text-3xl.font-bold');
  await expect(missingFeatureText).toBeVisible();
  await expect(missingFeatureText).toHaveText('Missing feature?');

  // Check if the "Let us know" link exists within the following paragraph
  const letUsKnowLink = main.locator('p.mt-1.text-xl a[href="mailto:contact@blazity.com"]');
  await expect(letUsKnowLink).toBeVisible();
  await expect(letUsKnowLink).toHaveText("Let us know");
});

test('should check the existence of elements within the footer section', async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const footer = page.locator('footer.mt-auto.flex.flex-col.items-center.justify-between.pb-8.text-neutral-300.md\\:flex-row');
  await expect(footer).toBeVisible();

  // Check if the copyright text exists
  const copyrightText = footer.locator('span.text-sm');
  await expect(copyrightText).toBeVisible();
  await expect(copyrightText).toHaveText('2024 © Lorem Ipsum. All Rights Reserved.');

  // Locate the div containing the links
  const linkContainer = footer.locator('div.mt-4.flex.space-x-4.md\\:mt-0');
  await expect(linkContainer).toBeVisible();

  // Check if the "Privacy and Cookie Policy" link exists
  const privacyLink = linkContainer.locator('a[href="/privacy-policy"]');
  await expect(privacyLink).toBeVisible();
  await expect(privacyLink).toHaveText('Privacy and Cookie Policy');

  // Check if the "Terms & Conditions" link exists
  const termsLink = linkContainer.locator('a[href="/terms-conditions"]');
  await expect(termsLink).toBeVisible();
  await expect(termsLink).toHaveText('Terms & Conditions');
});


test('check found results elements', async ({ page }) => {
  await page.goto('http://localhost:3000/category/home');

  // Locate the element
  const targetElement = "Triple Wick Amber Glass";
  const element = page.locator('a').filter({ hasText: targetElement });

  // Wait for the element to be visible
  await expect(element).toBeVisible();

  // Scroll the element into view
  await element.scrollIntoViewIfNeeded();

  
  const targetElementFloral = "Floral Elegance Tote Bag";
  const elementFloral = page.locator('a').filter({ hasText: targetElementFloral });

  await expect(elementFloral).toBeVisible();
  await elementFloral.scrollIntoViewIfNeeded();
  await elementFloral.click();

  const targetElementSoothing = "Soothing Lavender Shower Gel";
  const elementSoothing = page.locator('a').filter({ hasText: targetElementSoothing });

  await expect(elementSoothing).toBeVisible();
  await elementSoothing.scrollIntoViewIfNeeded();
  await elementSoothing.click();

  const targetElementPortable = "Portable Round Mesh Bluetooth Speaker";
  const elementPortable = page.locator('a').filter({ hasText: targetElementPortable });

  await expect(elementPortable).toBeVisible();
  await elementPortable.scrollIntoViewIfNeeded();
  await elementPortable.click();


  const targetElementOrbital = "Orbital Harmony Hanging Bluetooth Speaker";
  const elementOrbital = page.locator('a').filter({ hasText: targetElementOrbital });

  await expect(elementOrbital).toBeVisible();
  await elementOrbital.scrollIntoViewIfNeeded();
  await elementOrbital.click();

  const targetElementChair = "Modern Comfort Dining Chair";
  const elementChair = page.locator('a').filter({ hasText: targetElementChair });

  await expect(elementChair).toBeVisible();
  await elementChair.scrollIntoViewIfNeeded();
  await elementChair.click();


  const targetElementCologne = "Summer Orchard Eau de Cologne";
  const elementCologne = page.locator('a').filter({ hasText: targetElementCologne });

  await expect(elementCologne).toBeVisible();
  await elementCologne.scrollIntoViewIfNeeded();
  await elementCologne.click();
});

test('check *you might also like* section exist', async ({ page }) => {
  await page.goto('http://localhost:3000/product/example_bags2');

  const targetElementFloral = "Floral Elegance Tote Bag";
  const elementFloral = page.getByRole('link', { name: targetElementFloral, exact: true });

  await expect(elementFloral).toBeVisible();
  await elementFloral.scrollIntoViewIfNeeded();
  await elementFloral.click(); 

  const targetElementSoothing = "Soothing Lavender Shower Gel";
  const elementSoothing = page.locator('a').filter({ hasText: targetElementSoothing });

  await expect(elementSoothing).toBeVisible();
  await elementSoothing.scrollIntoViewIfNeeded();
  await elementSoothing.click(); 
  
  const targetElementSpeaker = "Portable Round Mesh Bluetooth Speaker";
  const elementSpeaker = page.locator('a').filter({ hasText: targetElementSpeaker });

  await expect(elementSpeaker).toBeVisible();
  await elementSpeaker.scrollIntoViewIfNeeded();
  await elementSpeaker.click(); 
  
  const targetElementOrbital = "Orbital Harmony Hanging Bluetooth Speaker";
  const elementOrbital = page.locator('a').filter({ hasText: targetElementOrbital });

  await expect(elementOrbital).toBeVisible();
  await elementOrbital.scrollIntoViewIfNeeded();
  await elementOrbital.click(); 
});